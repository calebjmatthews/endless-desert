import BuildingRecipe from './building_recipe';
import Icon from './icon';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';

export default class BuildingType implements BuildingTypeInterface {
  name: string = '';
  description: string = '';
  order?: number|undefined;
  category: string = '';
  icon: Icon = new Icon({provider: '', name: ''});
  cost: {specificity: string, type: string, quantity: number}[]|null = null;
  upgradeCost?: {specificity: string, type: string, quantity: number}[]|null;
  recipes: BuildingRecipe[]|null = null;
  givesNote: string = '';
  noteCost: {specificity: string, type: string, quantity: number}[] = [];
  upgradesInto?: string;
  duration?: number;
  upgradeDuration?: number;
  livingHappiness?: number;
  requiresLeader?: boolean;

  constructor(buildingType: BuildingTypeInterface) {
    let newRecipes = null;
    if (buildingType.recipes) {
      newRecipes = [];
      buildingType.recipes.map((recipe) => newRecipes.push(new BuildingRecipe(recipe)));
    }
    buildingType.recipes = newRecipes;
    Object.assign(this, buildingType);
    this.setDurations();
  }

  setDurations() {
    let newDuration = 0;
    if (this.cost) {
      this.cost.map((aCost) => {
        let resourceType = utils.getMatchingResourceKind(aCost.specificity, aCost.type);
        if (!resourceType) {
          console.log('resourceType missing, aCost:');
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
        let resourceType = utils.getMatchingResourceKind(aCost.specificity, aCost.type);
        if (!resourceType) {
          console.log('resourceType missing, aCost:');
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
  order?: number|undefined;
  category: string;
  icon: Icon;
  cost: {specificity: string, type: string, quantity: number}[]|null;
  upgradeCost?: {specificity: string, type: string, quantity: number}[]|null;
  recipes: BuildingRecipe[]|null;
  givesNote: string;
  noteCost: {specificity: string, type: string, quantity: number}[];
  upgradesInto?: string;
  duration?: number;
  upgradeDuration?: number;
  livingHappiness?: number;
  requiresLeader?: boolean;
}
