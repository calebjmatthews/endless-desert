import { resourceTypes } from '../instances/resource_types';

export default class BuildingType implements BuildingTypeInterface {
  name: string = '';
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';
  cost: {resource: string, quantity: number}[]|null = null;
  upgradeCost?: {resource: string, quantity: number}[]|null = null;
  production: {produces: string, rate: number}[]|null = null;
  consumption: {consumes: string, rate: number}[]|null = null;
  upgradesInto?: string;
  duration?: number = 0;
  upgradeDuration?: number = 0;

  constructor(buildingType: BuildingTypeInterface) {
    Object.assign(this, buildingType);
    this.setDurations();
  }

  setDurations() {
    let newDuration = 0;
    if (this.cost) {
      this.cost.map((aCost) => {
        let resourceType = resourceTypes[aCost.resource];
        if (resourceType.value) {
          newDuration += ((resourceType.value * aCost.quantity) / 10);
        }
      });
    }
    let newUpgradeDuration = 0;
    if (this.upgradeCost) {
      this.upgradeCost.map((aCost) => {
        let resourceType = resourceTypes[aCost.resource];
        if (resourceType.value) {
          newUpgradeDuration += ((resourceType.value * aCost.quantity) / 10);
        }
      });
    }
    if (newDuration <= 0) { newDuration = 5; }
    this.duration = newDuration;
    if (newUpgradeDuration <= 0) { newUpgradeDuration = 5; }
    this.upgradeDuration = newUpgradeDuration
  }
}

interface BuildingTypeInterface {
  name: string;
  icon: {provider: string, name: string};
  foregroundColor: string;
  backgroundColor: string;
  cost: {resource: string, quantity: number}[]|null;
  upgradeCost?: {resource: string, quantity: number}[]|null;
  production: {produces: string, rate: number}[]|null;
  consumption: {consumes: string, rate: number}[]|null;
  upgradesInto?: string;
  duration?: number;
  upgradeDuration? :number;
}
