import Building from './building';
import BuildingType from './building_type';
import BuildingRecipe from './building_recipe';
import Timer from './timer';
import Leader from './leader';
import Equipment from './equipment';
import EquipmentEffect from './equipment_effect';
import Vault from './vault';
import Rates from './rates';
import Resource from './resource';
import { buildingTypes } from '../instances/building_types';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { LEADER_QUALITIES } from '../enums/leader_qualities';
const LQ = LEADER_QUALITIES;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const MS_IN_MIN = 60000;

export default class Hourglass {
  // Take a set of resource gain/loss rates, a starting timestamp, and an ending
  // timestamp, and calculate the resulting resource production and consumption
  calculate(rates: Rates, startingTimestamp: number,
    endingTimestamp: number = new Date(Date.now()).valueOf()) {
    let timeMult = (endingTimestamp - startingTimestamp) / MS_IN_MIN;
    let productionSum: { [typeQuality: string] : number } = {};
    let consumptionSum: { [typeQuality: string] : number } = {};
    if (timeMult > 1 || timeMult < 0) {
      console.log('timeMult > 1 || timeMult < 0');
      console.log(timeMult);
      console.log(`timeMult: ${timeMult}, calculate called with duration: ${utils.formatDuration(endingTimestamp - startingTimestamp)}`);
    }
    if (timeMult > 0) {
      Object.keys(rates.netRates).map((typeQuality) => {
        if (rates.netRates[typeQuality] > 0) {
          if (!productionSum[typeQuality]) {
            productionSum[typeQuality] = 0;
          }
          productionSum[typeQuality] += (rates.netRates[typeQuality] * timeMult);
        }
        else if (rates.netRates[typeQuality] < 0) {
          if (!consumptionSum[typeQuality]) {
            consumptionSum[typeQuality] = 0;
          }
          consumptionSum[typeQuality] += ((-1 * rates.netRates[typeQuality]) * timeMult);
        }
      });
    }

    return {productionSum, consumptionSum};
  }

  // Set the progress and text labels for each timer, check whether a timer has
  // finished, and return an array of all finished timers
  timerTick(timers: { [name: string] : Timer }) {
    let resolvedTimers: Timer[] = [];
    Object.keys(timers).map((timerName) => {
      let timer = timers[timerName];
      if (timer.endsAt <= new Date(Date.now()).valueOf()) {
        resolvedTimers.push(timer);
      }
      else {
        timer.setProgress();
        timer.setRemainingLabel();
      }
    });
    return resolvedTimers;
  }

  // Call the calculate function and return the result. If one or more resources will
  // be exhausted, call the calculation function for the subset of time until the
  // resource is exhausted, recalculate the rates to exclude the building with
  // the exhausted resource, then recursively call the callCalcs function for the
  // new subset of time until all exhausted resources are accounted for
  callCalcs(rates: Rates, vault: Vault,
    buildings: { [id: string] : Building }, leaders: { [id: string] : Leader },
    startingTimestamp: number = vault.lastTimestamp,
    resourcesToCheck: { [specType: string] : boolean } = {},
    productionSum: { [typeQuality: string] : number } = {},
    consumptionSum: { [typeQuality: string] : number } = {},
    questResourceChecks: { [specType: string] : number } = {},
    buildingsToRest: string[] = []) :
    { productionSum: { [typeQuality: string] : number },
    consumptionSum: { [typeQuality: string] : number },
    questResourceChecks: { [specType: string] : number },
    buildingsToRest: string[]
  } {
    const timestamp = new Date(Date.now()).valueOf();
    const soonestExhaustionDiff = rates.soonestExhaustion ?
      timestamp - rates.soonestExhaustion : null;
    if (soonestExhaustionDiff !== null && soonestExhaustionDiff > 1000) {
      const results = this.calculate(rates, startingTimestamp,
        (rates?.soonestExhaustion || undefined));
      const newPSum = utils.mapsCombine(productionSum, results.productionSum);
      const newCSum = utils.mapsCombine(consumptionSum, results.consumptionSum);
      const newQRChecks = utils.mapsCombine(questResourceChecks,
        this.formQuestResourceChecks(resourcesToCheck, results.productionSum));
      const pResources = utils.sumToResources(vault, newPSum);
      const cResources = utils.sumToResources(vault, newCSum);
      const newVault = new Vault({
        lastTimestamp: rates.soonestExhaustion || timestamp,
        resources: vault.resources });
      pResources.map((resource) => newVault.increaseResource(resource));
      cResources.map((resource) => newVault.consumeResource(resource));
      const newBuildings = {...buildings};
      rates.buildingsToRest?.forEach((id) => {
        newBuildings[id].recipeSelected = -1;
      });
      const newRates = this.calcRates(newBuildings, leaders, newVault);
      const newBuildingsToRest = utils.arraysCombine(buildingsToRest,
        utils.arraysCombine(rates.buildingsToRest,
          newRates.buildingsToRest));
      return this.callCalcs(newRates, vault, buildings, leaders,
        (rates?.soonestExhaustion || timestamp), resourcesToCheck, newPSum, newCSum,
        newQRChecks, newBuildingsToRest);
    }
    const results = this.calculate(rates, startingTimestamp);
    const newPSum = utils.mapsCombine(productionSum, results.productionSum);
    const newCSum = utils.mapsCombine(consumptionSum, results.consumptionSum);
    const newQRChecks = utils.mapsCombine(questResourceChecks,
      this.formQuestResourceChecks(resourcesToCheck, results.productionSum));
    const newBuildingsToRest = utils.arraysCombine(buildingsToRest,
      rates.buildingsToRest);

    return { productionSum: newPSum, consumptionSum: newCSum,
      questResourceChecks: newQRChecks, buildingsToRest: newBuildingsToRest };
  }

  formQuestResourceChecks(resourcesToCheck: { [specType: string] : boolean },
    productionSum: { [typeQuality: string] : number }) {
    const exactMap: { [typeName: string] : number } = {};
    const tagMap: { [tagName: string] : number } = {};
    const subcategoryMap: { [subcategoryName: string] : number } = {};
    const categoryMap: { [categoryName: string] : number } = {};
    Object.keys(productionSum).forEach((typeQuality) => {
      const typeName = typeQuality.split('|')[0];
      const production = productionSum[typeQuality];
      const resourceType = resourceTypes[typeName];
      utils.mapAdd(exactMap, typeName, production);
      resourceType?.tags.forEach((tagName) => {
        utils.mapAdd(tagMap, tagName, production);
      });
      if (resourceType?.subcategory) {
        utils.mapAdd(subcategoryMap, resourceType.subcategory, production);
      }
      utils.mapAdd(categoryMap, resourceType?.category, production);
    });

    const questResourceChecks: { [specType: string] : number } = {};
    Object.keys(resourcesToCheck).forEach((specType) => {
      const [specificity, type] = specType.split('|');
      switch(specificity) {
        case RESOURCE_SPECIFICITY.EXACT:
        if (exactMap[type]) {
          questResourceChecks[specType] = exactMap[type];
        } break;
        case RESOURCE_SPECIFICITY.TAG:
        if (tagMap[type]) {
          questResourceChecks[specType] = tagMap[type];
        } break;
        case RESOURCE_SPECIFICITY.SUBCATEGORY:
        if (subcategoryMap[type]) {
          questResourceChecks[specType] = subcategoryMap[type];
        }
        case RESOURCE_SPECIFICITY.CATEGORY:
        if (categoryMap[type]) {
          questResourceChecks[specType] = categoryMap[type];
        }
      }
    });
    return questResourceChecks;
  }

  calcRates(buildings: { [id: string] : Building },
    leaders: { [id: string] : Leader }, vault: Vault = new Vault({
      lastTimestamp: new Date(Date.now()).valueOf(),
      resources: {}
    })): Rates {
    let r = new Rates(null);

    const multiBT = getMultiBT(buildings);
    const buildingLeaders = getBuildingLeaders(buildings, leaders);

    // Add each building's recipe to the rate maps
    Object.keys(buildings).map((id) => {
      let building = buildings[id];
      if (r.recipesRates[id] == undefined) {
        r.recipesRates[id] = [];
        r.buildingRates[id] = {};
        r.problems[id] = [];
      }
      if (multiBT[building.buildingType] == true
        && r.bGroupRates[building.buildingType] == undefined) {
        r.bGroupRates[building.buildingType] = {};
      }
      let buildingType = buildingTypes[building.buildingType];
      let missingLeader = false;
      if (buildingType.requiresLeader && buildingLeaders[id] == undefined) {
        missingLeader = true;
        r.problems[id].push('Leader required');
      }
      if (buildingType.recipes || building.recipe) {
        let recipes: BuildingRecipe[] = [];
        if (building.recipe) { recipes = [building.recipe]; }
        else if (buildingType.recipes) { recipes = buildingType.recipes; }

        recipes.map((recipe, index) => {
          r.recipesRates[id][index] = {};
          if (recipe.produces) {
            recipe.produces.map((production) => {
              let prod0Quantity = production.quantity;
              let qualityChance = 0;
              if (buildingLeaders[building.id]) {
                const leaderSMod = findLeaderMod(buildingLeaders[building.id],
                  (production.type + '|0'), LQ.SPEED);
                prod0Quantity *= (1 + (leaderSMod / 100));
                const leaderQMod =  findLeaderMod(buildingLeaders[building.id],
                  (production.type + '|0'), LQ.QUALITY);
                qualityChance = leaderQMod/100;
              }
              if (qualityChance > 0) {
                let prod1Quantity = (prod0Quantity * qualityChance);
                utils.mapAdd(r.recipesRates[id][index], (production.specificity
                  + '|' + production.type + '|1'), prod1Quantity);
                prod0Quantity -= prod1Quantity;
              }
              utils.mapAdd(r.recipesRates[id][index], (production.specificity
                + '|' + production.type + '|0'), prod0Quantity);
            })
          }
          if (recipe.consumes) {
            recipe.consumes.map((consumption) => {
              let consQuantity = consumption.quantity;
              if (buildingLeaders[building.id]) {
                const leaderMod = findLeaderMod(buildingLeaders[building.id],
                  (consumption.type + '|0'), LQ.SPEED);
                consQuantity *= (1 + (leaderMod / 100));
                const leaderNegMod = findLeaderMod(buildingLeaders[building.id],
                  (consumption.type + '|0'), LQ.EFFICIENCY);
                consQuantity *= (1 - (leaderNegMod / 100));
              }
              utils.mapAdd(r.recipesRates[id][index], (consumption.specificity
                + '|' + consumption.type + '|0'), (consQuantity * -1));
            });
          }
        });
      }
      if ((buildingType.recipes || building.recipe) && !missingLeader) {
        let recipeSelected = building.recipeSelected || 0;
        let recipe = new BuildingRecipe({index: -1, produces: [], consumes: []});
        if (buildingType.recipes) {
          if (buildingType.recipes[recipeSelected]) {
            recipe = buildingType.recipes[recipeSelected];
          }
        }
        if (building.recipe) { recipe = building.recipe; }

        let missingConsumption = false;
        if (recipe.consumes) {
          recipe.consumes.map((consumption) => {
            let cResource: Resource|null = new Resource({...consumption, quality: 0});
            if (consumption.specificity != RESOURCE_SPECIFICITY.EXACT) {
              const specType = consumption.specificity + '|' + consumption.type;
              if (building.resourcesSelected[specType]) {
                cResource = new Resource(building.resourcesSelected[specType]);
              }
              else {
                cResource = null;
              }
            }

            if (cResource) {
              if (vault.resources[cResource.type + '|0']) {
                if (vault.resources[cResource.type + '|0'].quantity
                  < (consumption.quantity / 60)) {
                  console.log('missingConsumption for: ' + cResource.type);
                  r.problems[id].push(cResource.type + ' missing');
                  missingConsumption = true;
                }
              }
              else {
                r.problems[id].push(consumption.type + ' missing');
                missingConsumption = true;
              }
            }
            else {
              r.problems[id].push('A ' + consumption.type + ' must be selected');
              missingConsumption = true;
            }
          });
        }

        if (recipe.produces && !missingConsumption) {
          recipe.produces.map((production) => {
            let prod0Quantity = production.quantity;
            let qualityChance = 0;
            if (buildingLeaders[building.id]) {
              const leaderSMod = findLeaderMod(buildingLeaders[building.id],
                (production.type + '|0'), LQ.SPEED);
              prod0Quantity *= (1 + (leaderSMod / 100));
              const leaderQMod =  findLeaderMod(buildingLeaders[building.id],
                (production.type + '|0'), LQ.QUALITY);
              qualityChance = leaderQMod/100;
            }
            if (qualityChance > 0) {
              let prod1Quantity = (prod0Quantity * qualityChance);
              utils.mapAdd(r.productionRates, (production.type + '|1'), prod1Quantity);
              utils.mapAdd(r.buildingRates[id], (production.type + '|1'), prod1Quantity);
              utils.mapAdd(r.bGroupRates[building.buildingType],
                (production.type + '|1'), prod1Quantity);
              utils.mapAdd(r.netRates, (production.type + '|1'), prod1Quantity);
              prod0Quantity -= prod1Quantity;
            }
            utils.mapAdd(r.productionRates, (production.type + '|0'), prod0Quantity);
            utils.mapAdd(r.buildingRates[id], (production.type + '|0'), prod0Quantity);
            utils.mapAdd(r.bGroupRates[building.buildingType], (production.type + '|0'),
              prod0Quantity);
            utils.mapAdd(r.netRates, (production.type + '|0'), prod0Quantity);
          });
        }
        if (recipe.consumes && !missingConsumption) {
          recipe.consumes.map((rawConsumption) => {
            let consumption = rawConsumption;
            if (rawConsumption.specificity != RESOURCE_SPECIFICITY.EXACT) {
              const specType = rawConsumption.specificity + '|' + rawConsumption.type;
              const resource = building.resourcesSelected[specType];
              const resourceType = resourceTypes[resource.type];
              consumption = {
                specificity: RESOURCE_SPECIFICITY.EXACT,
                type: resource.type,
                quantity: (rawConsumption.quantity / resourceType.value) };
            }
            let consQuantity = consumption.quantity;
            if (buildingLeaders[building.id]) {
              const leaderMod = findLeaderMod(buildingLeaders[building.id],
                (consumption.type + '|0'), LQ.SPEED);
              consQuantity *= (1 + (leaderMod / 100));
              const leaderNegMod = findLeaderMod(buildingLeaders[building.id],
                (consumption.type + '|0'), LQ.EFFICIENCY);
              consQuantity *= (1 - (leaderNegMod / 100));
            }
            utils.mapAdd(r.consumptionRates, (consumption.type + '|0'), consQuantity);
            utils.mapAdd(r.buildingRates[id], (consumption.type + '|0'),
              (consQuantity * -1));
            utils.mapAdd(r.bGroupRates[building.buildingType], (consumption.type + '|0'),
              (consQuantity * -1));
            utils.mapAdd(r.netRates, (consumption.type + '|0'), (consQuantity * -1));
          });
        }
        if (missingConsumption) {
          r.buildingsToRest.push(id);
        }
      }
    });

    // Add the resources each leader is eating and drinking to the rate maps
    Object.keys(leaders).map((id) => {
      const leader = leaders[id];
      if (leader.eating) {
        utils.mapAdd(r.consumptionRates, leader.eating, 10);
        utils.mapAdd(r.leaderRates[id], leader.eating, -10);
        utils.mapAdd(r.netRates, leader.eating, -10);
      }
      if (leader.drinking) {
        utils.mapAdd(r.consumptionRates, leader.drinking, 10);
        utils.mapAdd(r.leaderRates[id], leader.drinking, -10);
        utils.mapAdd(r.netRates, leader.drinking, -10);
      }
    });

    // Check for resources that have a negative rate, and determine when they will
    //  be exhausted
    Object.keys(r.netRates).map((typeQuality) => {
      const rate = r.netRates[typeQuality];
      if (rate < 0 && vault) {
        if (vault.resources[typeQuality]) {
          const quantity = vault.resources[typeQuality].quantity;
          const exhaustion = vault.lastTimestamp + ((quantity / (-1 * rate)) * 60000);
          r.exhaustions[typeQuality] = exhaustion;
          if (r.soonestExhaustion == null || r.soonestExhaustion > exhaustion) {
            r.soonestExhaustion = exhaustion;
          }
        }
      }
    });

    return new Rates(r);

    function getMultiBT(buildings: { [id: string] : Building }) {
      let multiBT: { [typeName: string] : boolean } = {};
      let alreadyFound: { [typeName: string] : boolean } = {};
      Object.keys(buildings).map((id) => {
        let building = buildings[id];
        if (alreadyFound[building.buildingType]) {
          multiBT[building.buildingType] = true;
        }
        alreadyFound[building.buildingType] = true;
      });
      return multiBT;
    }

    function getBuildingLeaders(buildings: { [id: string] : Building },
      leaders: { [id: string] : Leader }) {
      let buildingLeaders: { [buildingId: string] : Leader } = {};
      if (leaders) {

      }
      Object.keys(leaders).map((leaderId) => {
        let leader = leaders[leaderId];
        if (leader.assignedTo && leader.eating && leader.drinking && leader.livingAt) {
          buildingLeaders[leader.assignedTo] = leader;
        }
      });
      return buildingLeaders;
    }

    function findLeaderMod(leader: Leader, prodResource: string, quality: string) {
      let leaderMod = 0;
      leader.effects.map((anEffect) => {
        const resourceName = prodResource.split('|')[0].split('-')[0];
        if (anEffect.quality == quality && doesResourceMatch(resourceName,
          anEffect) && anEffect.change > leaderMod) {
          leaderMod = anEffect.change;
        }
      });
      return leaderMod;
    }

    function doesResourceMatch(prodResource: string, effect: EquipmentEffect) {
      const resourceType = resourceTypes[prodResource];
      if (resourceType) {
        switch(effect.specificity) {
          case RESOURCE_SPECIFICITY.EXACT:
          return (resourceType.name == effect.type);

          case RESOURCE_SPECIFICITY.TAG:
          for (let index = 0; index < resourceType.tags.length; index++) {
            if (resourceType.tags[index] == effect.type) {
              return true;
            }
          }
          return false;

          case RESOURCE_SPECIFICITY.SUBCATEGORY:
          return (resourceType.subcategory == effect.type);

          case RESOURCE_SPECIFICITY.CATEGORY:
          return (resourceType.category == effect.type);

          case undefined:
          return true;
        }
      }
      return false;
    }
  }
}

interface Rate { [typeQuality: string] : number };
