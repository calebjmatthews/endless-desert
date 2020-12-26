import Building from './building';
import BuildingType from './building_type';
import Timer from './timer';
import Leader from './leader';
import { buildingTypes } from '../instances/building_types';
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

  setRates(buildings: { [id: string] : Building },
    leaders: { [id: string] : Leader }) {
    let productionRates: { [resourceName: string] : number } = {};
    let consumptionRates: { [resourceName: string] : number } = {};
    let netRates: { [resourceName: string] : number } = {};
    let buildingRates: { [buildingId: string] :
      { [resourceName: string] : number } } = {};
    let bGroupRates: { [typeName: string] :
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
      if (buildingType.recipes) {
        let recipeSelected = building.recipeSelected || 0;``
        let recipe = buildingType.recipes[recipeSelected];
        if (recipe.produces) {
          recipe.produces.map((production) => {
            let prodQuantity = production.quantity;
            if (buildingLeaders[building.id]) {
              prodQuantity *= (1 + (buildingLeaders[building.id].productionPlus / 100));
            }
            mapAdd(productionRates, production.type, prodQuantity);
            mapAdd(buildingRates[id], production.type, prodQuantity);
            mapAdd(bGroupRates[building.buildingType], production.type, prodQuantity);
            mapAdd(netRates, production.type, prodQuantity);
          });
        }
        if (recipe.consumes) {
          recipe.consumes.map((consumption) => {
            mapAdd(consumptionRates, consumption.type, consumption.quantity);
            mapAdd(buildingRates[id], consumption.type, (consumption.quantity * -1));
            mapAdd(bGroupRates[building.buildingType], consumption.type,
              (consumption.quantity * -1));
            mapAdd(netRates, consumption.type, (consumption.quantity * -1));
          });
        }
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
        if (leader.assignedTo) {
          buildingLeaders[leader.assignedTo] = leader;
        }
      });
      return buildingLeaders;
    }
  }
}

interface Rate { [resourceName: string] : number };
