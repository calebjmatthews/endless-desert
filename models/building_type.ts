import BuildingRecipe from './building_recipe';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';

export default class BuildingType implements BuildingTypeInterface {
  name: string = '';
  description: string = '';
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';
  cost: {specificity: string, type: string, quantity: number}[]|null = null;
  upgradeCost?: {specificity: string, type: string, quantity: number}[]|null = null;
  recipes: BuildingRecipe[]|null = null;
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
        let resourceType = utils.getMatchingResource(aCost.specificity, aCost.type);
        if (!resourceType) {
          console.log('aCost');
          console.log(aCost);
        }
        if (resourceType.value) {
          newDuration += ((resourceType.value * aCost.quantity) / 10);
        }
      });
    }
    let newUpgradeDuration = 0;
    if (this.upgradeCost) {
      this.upgradeCost.map((aCost) => {
        let resourceType = utils.getMatchingResource(aCost.specificity, aCost.type);
        if (!resourceType) {
          console.log('aCost');
          console.log(aCost);
        }
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
  description: string;
  icon: {provider: string, name: string};
  foregroundColor: string;
  backgroundColor: string;
  cost: {specificity: string, type: string, quantity: number}[]|null;
  upgradeCost?: {specificity: string, type: string, quantity: number}[]|null;
  recipes: BuildingRecipe[]|null;
  upgradesInto?: string;
  duration?: number;
  upgradeDuration? :number;
}
