import Building from './building';
import BuildingType from './building_type';
import { buildingTypes } from '../instances/building_types';
const MS_IN_MIN = 60000;

export default class Hourglass {
  calculate(buildings: { [id: string] : Building }, lastTimestamp: number) {
    let timeMult = (new Date(Date.now()).valueOf() - lastTimestamp) / MS_IN_MIN;
    let productionSum: { [resourceName: string] : number } = {};
    let consumptionSum: { [resourceName: string] : number } = {};
    Object.keys(buildings).map((id) => {
      let building = buildings[id];
      let buildingType = buildingTypes[building.buildingType];
      if (buildingType.production) {
        buildingType.production.map((production) => {
          if (!productionSum[production.produces]) {
            productionSum[production.produces] = 0;
          }
          productionSum[production.produces] += (production.rate * timeMult);
        });
      }
      if (buildingType.consumption) {
        buildingType.consumption.map((consumption) => {
          if (!consumptionSum[consumption.consumes]) {
            consumptionSum[consumption.consumes] = 0;
          }
          consumptionSum[consumption.consumes] += (consumption.rate * timeMult);
        });
      }
    });
    return {productionSum, consumptionSum};
  }
}
