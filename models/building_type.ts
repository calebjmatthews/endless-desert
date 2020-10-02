import BuildingProduction from './building_production';
import BuildingConsumption from './building_consumption';

export default class BuildingType {
  name: string = '';
  production: BuildingProduction[]|null = null;
  consumption: BuildingConsumption[]|null = null;

  constructor(buildingType: BuildingType) {
    Object.assign(this, buildingType);
  }
}
