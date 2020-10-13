export default class BuildingType {
  name: string = '';
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';
  cost: {resource: string, quantity: number}[]|null = null;
  production: {produces: string, rate: number}[]|null = null;
  consumption: {consumes: string, rate: number}[]|null = null;

  constructor(buildingType: BuildingType) {
    Object.assign(this, buildingType);
  }
}
