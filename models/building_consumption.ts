export default class BuildingConsumption {
  consumes: string = '';
  rate: number = 0;

  constructor(buildingConsumption: BuildingConsumption) {
    Object.assign(this, buildingConsumption);
  }
}
