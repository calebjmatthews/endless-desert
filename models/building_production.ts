export default class BuildingProduction {
  produces: string = '';
  rate: number = 0;

  constructor(buildingProduction: BuildingProduction) {
    Object.assign(this, buildingProduction);
  }
}
