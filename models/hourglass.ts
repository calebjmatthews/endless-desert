import Building from './building';
import BuildingType from './building_type';
import BuildingRecipe from './building_recipe';
import Timer from './timer';
import Leader from './leader';
import Equipment from './equipment';
import EquipmentEffect from './equipment_effect';
import Vault from './vault';
import Rates from './rates';
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
  calculate(rates: Rates, vault: Vault, startingTimestamp: number,
    endingTimestamp: number = new Date(Date.now()).valueOf()) {
    let timeMult = (endingTimestamp - startingTimestamp) / MS_IN_MIN;
    let productionSum: { [typeQuality: string] : number } = {};
    let consumptionSum: { [typeQuality: string] : number } = {};
    if (timeMult > 1 || timeMult < 0) {
      console.log('timeMult > 1 || timeMult < 0');
      console.log(timeMult);
      console.log('startingTimestamp');
      console.log(startingTimestamp);
      console.log('endingTimestamp');
      console.log(endingTimestamp);
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
    productionSum: { [typeQuality: string] : number } = {},
    consumptionSum: { [typeQuality: string] : number } = {}) :
    { productionSum: { [typeQuality: string] : number },
    consumptionSum: { [typeQuality: string] : number } } {

    if (rates.soonestExhaustion) {
      if (rates.soonestExhaustion < new Date(Date.now()).valueOf()) {
        const results = this.calculate(rates, vault, startingTimestamp,
          rates.soonestExhaustion);
        const newPSum = utils.mapsCombine(productionSum, results.productionSum);
        const newCSum = utils.mapsCombine(consumptionSum, results.consumptionSum);
        const pResources = utils.sumToResources(vault, newPSum);
        const cResources = utils.sumToResources(vault, newCSum);
        const newVault = new Vault(vault);
        pResources.map((resource) => newVault.increaseResource(resource));
        cResources.map((resource) => newVault.consumeResource(resource));
        const newRates = this.calcRates(buildings, leaders, newVault);
        return this.callCalcs(newRates, vault, buildings, leaders,
          rates.soonestExhaustion, newPSum, newCSum);
      }
    }
    const results = this.calculate(rates, vault, startingTimestamp);
    const newPSum = utils.mapsCombine(productionSum, results.productionSum);
    const newCSum = utils.mapsCombine(consumptionSum, results.consumptionSum);
    return { productionSum: newPSum, consumptionSum: newCSum };
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
        r.problems[id].push('Missing leader');
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
                utils.mapAdd(r.recipesRates[id][index], (production.type + '|1'), prod1Quantity);
                prod0Quantity -= prod1Quantity;
              }
              utils.mapAdd(r.recipesRates[id][index], (production.type + '|0'), prod0Quantity);
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
              utils.mapAdd(r.recipesRates[id][index], (consumption.type + '|0'),
                (consQuantity * -1));
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
            if (vault.resources[consumption.type + '|0']) {
              if (vault.resources[consumption.type + '|0'].quantity < 1) {
                console.log('missingConsumption for: ' + consumption.type);
                r.problems[id].push(consumption.type + ' missing');
                missingConsumption = true;
              }
            }
            else {
              r.problems[id].push(consumption.type + ' missing');
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
            utils.mapAdd(r.consumptionRates, (consumption.type + '|0'), consQuantity);
            utils.mapAdd(r.buildingRates[id], (consumption.type + '|0'),
              (consQuantity * -1));
            utils.mapAdd(r.bGroupRates[building.buildingType], (consumption.type + '|0'),
              (consQuantity * -1));
            utils.mapAdd(r.netRates, (consumption.type + '|0'), (consQuantity * -1));
          });
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
          if (quantity > Math.abs(rate)) {
            const exhaustion = Date.now() + ((quantity / (-1 * rate)) * 60000);
            if (r.soonestExhaustion == null || r.soonestExhaustion > exhaustion) {
              r.soonestExhaustion = exhaustion;
            }
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
        const resourceName = prodResource.split('|')[0];
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
