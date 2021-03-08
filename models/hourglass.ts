import Building from './building';
import BuildingType from './building_type';
import Timer from './timer';
import Leader from './leader';
import Equipment from './equipment';
import EquipmentEffect from './equipment_effect';
import { buildingTypes } from '../instances/building_types';
import { resourceTypes } from '../instances/resource_types';
import { LEADER_QUALITIES } from '../enums/leader_qualities';
const LQ = LEADER_QUALITIES;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const MS_IN_MIN = 60000;

export default class Hourglass {
  calculate(rates: { productionRates: Rate, consumptionRates: Rate,
    netRates: Rate }, lastTimestamp: number) {
    let timeMult = (new Date(Date.now()).valueOf() - lastTimestamp) / MS_IN_MIN;
    let productionSum: { [resourceName: string] : number } = {};
    let consumptionSum: { [resourceName: string] : number } = {};
    Object.keys(rates.netRates).map((resourceName) => {
      if (rates.netRates[resourceName] > 0) {
        if (!productionSum[resourceName]) {
          productionSum[resourceName] = 0;
        }
        productionSum[resourceName] += (rates.netRates[resourceName] * timeMult);
      }
      else if (rates.netRates[resourceName] < 0) {
        if (!consumptionSum[resourceName]) {
          consumptionSum[resourceName] = 0;
        }
        consumptionSum[resourceName] += (rates.netRates[resourceName] * timeMult);
      }
    })

    return {productionSum, consumptionSum};
  }

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

  calcRates(buildings: { [id: string] : Building },
    leaders: { [id: string] : Leader }) {
    let productionRates: { [resourceName: string] : number } = {};
    let consumptionRates: { [resourceName: string] : number } = {};
    let netRates: { [resourceName: string] : number } = {};
    let buildingRates: { [buildingId: string] :
      { [resourceName: string] : number } } = {};
    let bGroupRates: { [typeName: string] :
      { [resourceName: string] : number } } = {};
    let leaderRates: { [leaderId: string] :
      { [resourceName: string] : number } } = {};

    const multiBT = getMultiBT(buildings);
    const buildingLeaders = getBuildingLeaders(buildings, leaders);

    Object.keys(buildings).map((id) => {
      let building = buildings[id];
      if (buildingRates[id] == undefined) {
        buildingRates[id] = {};
      }
      if (multiBT[building.buildingType] == true
        && bGroupRates[building.buildingType] == undefined) {
        bGroupRates[building.buildingType] = {};
      }
      let buildingType = buildingTypes[building.buildingType];
      let missingLeader = false;
      if (buildingType.requiresLeader && buildingLeaders[id] == undefined) {
        missingLeader = true;
      }
      if (buildingType.recipes && !missingLeader) {
        let recipeSelected = building.recipeSelected || 0;
        let recipe = buildingType.recipes[recipeSelected];
        if (recipe.produces) {
          recipe.produces.map((production) => {
            let prodQuantity = production.quantity;
            if (buildingLeaders[building.id]) {
              const leaderMod = findLeaderMod(buildingLeaders[building.id],
                production.type, LQ.SPEED);
              prodQuantity *= (1 + (leaderMod / 100));
            }
            mapAdd(productionRates, production.type, prodQuantity);
            mapAdd(buildingRates[id], production.type, prodQuantity);
            mapAdd(bGroupRates[building.buildingType], production.type, prodQuantity);
            mapAdd(netRates, production.type, prodQuantity);
          });
        }
        if (recipe.consumes) {
          recipe.consumes.map((consumption) => {
            let consQuantity = consumption.quantity;
            if (buildingLeaders[building.id]) {
              const leaderMod = findLeaderMod(buildingLeaders[building.id],
                consumption.type, LQ.SPEED);
              consQuantity *= (1 + (leaderMod / 100));
              const leaderNegMod = findLeaderMod(buildingLeaders[building.id],
                consumption.type, LQ.EFFICIENCY);
              consQuantity *= (1 - (leaderNegMod / 100));
            }
            mapAdd(consumptionRates, consumption.type, consQuantity);
            mapAdd(buildingRates[id], consumption.type, (consQuantity * -1));
            mapAdd(bGroupRates[building.buildingType], consumption.type,
              (consQuantity * -1));
            mapAdd(netRates, consumption.type, (consQuantity * -1));
          });
        }
      }
    });

    Object.keys(leaders).map((id) => {
      const leader = leaders[id];
      if (leader.eating) {
        mapAdd(consumptionRates, leader.eating, 10);
        mapAdd(leaderRates[id], leader.eating, -10);
        mapAdd(netRates, leader.eating, -10);
      }
      if (leader.drinking) {
        mapAdd(consumptionRates, leader.drinking, 10);
        mapAdd(leaderRates[id], leader.drinking, -10);
        mapAdd(netRates, leader.drinking, -10);
      }
    });

    return {productionRates, consumptionRates, buildingRates, bGroupRates, netRates};

    function mapAdd(map: any, property: string, quantity: number) {
      if (map != undefined) {
        if (map[property] == undefined) {
          map[property] = 0;
        }
        map[property] += quantity;
      }
    }

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
        if (anEffect.quality == quality && doesResourceMatch(prodResource,
          anEffect) && anEffect.change > leaderMod) {
          leaderMod = anEffect.change;
        }
      });
      return leaderMod;
    }

    function doesResourceMatch(prodResource: string, effect: EquipmentEffect) {
      const resourceType = resourceTypes[prodResource];
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
      console.log('Unexpected resource specifcity: ' + effect.specificity);
      return false;
    }
  }
}

interface Rate { [resourceName: string] : number };
