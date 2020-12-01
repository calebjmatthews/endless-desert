import Building from './building';
import BuildingType from './building_type';
import Timer from './timer';
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

  setRates(buildings: { [id: string] : Building }) {
    let productionRates: { [resourceName: string] : number } = {};
    let consumptionRates: { [resourceName: string] : number } = {};
    let netRates: { [resourceName: string] : number } = {};

    Object.keys(buildings).map((id) => {
      let building = buildings[id];
      let buildingType = buildingTypes[building.buildingType];
      if (buildingType.recipes) {
        let recipeSelected = building.recipeSelected || 0;
        let recipe = buildingType.recipes[recipeSelected];
        if (recipe.produces) {
          recipe.produces.map((production) => {
            if (!productionRates[production.type]) {
              productionRates[production.type] = 0;
            }
            if (!netRates[production.type]) {
              netRates[production.type] = 0;
            }
            productionRates[production.type] += production.quantity;
            netRates[production.type] += production.quantity;
          });
        }
        if (recipe.consumes) {
          recipe.consumes.map((consumption) => {
            if (!consumptionRates[consumption.type]) {
              consumptionRates[consumption.type] = 0;
            }
            if (!netRates[consumption.type]) {
              netRates[consumption.type] = 0;
            }
            consumptionRates[consumption.type] += consumption.quantity;
            netRates[consumption.type] -= consumption.quantity;
          });
        }
      }
    });

    return {productionRates, consumptionRates, netRates};
  }
}

interface Rate { [resourceName: string] : number };
