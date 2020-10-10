import Building from './building';
import BuildingType from './building_type';
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

  setRates(buildings: { [id: string] : Building }) {
    let productionRates: { [resourceName: string] : number } = {};
    let consumptionRates: { [resourceName: string] : number } = {};
    let netRates: { [resourceName: string] : number } = {};

    Object.keys(buildings).map((id) => {
      let building = buildings[id];
      let buildingType = buildingTypes[building.buildingType];
      if (buildingType.production) {
        buildingType.production.map((production) => {
          if (!productionRates[production.produces]) {
            productionRates[production.produces] = 0;
          }
          if (!netRates[production.produces]) {
            netRates[production.produces] = 0;
          }
          productionRates[production.produces] += production.rate;
          netRates[production.produces] += production.rate;
        });
      }
      if (buildingType.consumption) {
        buildingType.consumption.map((consumption) => {
          if (!consumptionRates[consumption.consumes]) {
            consumptionRates[consumption.consumes] = 0;
          }
          if (!netRates[consumption.consumes]) {
            netRates[consumption.consumes] = 0;
          }
          consumptionRates[consumption.consumes] += consumption.rate;
          netRates[consumption.consumes] -= consumption.rate;
        });
      }
    });

    return {productionRates, consumptionRates, netRates};
  }
}

interface Rate { [resourceName: string] : number };
