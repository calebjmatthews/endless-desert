import BuildingRecipe from './building_recipe';
import Icon from './icon';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { TERRAIN_TYPES } from '../enums/terrain_types';

export default class BuildingType implements BuildingTypeInterface {
  name: string = '';
  description: string = '';
  order?: number|undefined;
  category: string = '';
  icon: Icon = new Icon({provider: '', name: ''});
  cost: {specificity: string, type: string, quantity: number}[]|null = null;
  upgradeCost?: {specificity: string, type: string, quantity: number}[]|null;
  terrainAllowed: string[] = [];
  recipes: BuildingRecipe[]|null = null;
  givesNote: string = '';
  noteCost: {specificity: string, type: string, quantity: number}[] = [];
  upgradesInto?: string;
  duration?: number;
  upgradeDuration?: number;
  livingHappiness?: number;
  requiresLeader?: boolean;
  cannotStore?: boolean;
  opensTab?: { tabName: string, icon: Icon, label: string };

  constructor(buildingType: BuildingTypeInterface | null) {
    if (buildingType) {
      let newRecipes = null;
      if (buildingType.recipes) {
        newRecipes = [];
        buildingType.recipes.map((recipe) => newRecipes.push(new BuildingRecipe(recipe)));
      }
      buildingType.recipes = newRecipes;
      if (!buildingType.terrainAllowed) {
        buildingType.terrainAllowed = [TERRAIN_TYPES.SAND, TERRAIN_TYPES.RIVERBANK];
      }
      Object.assign(this, buildingType);
      this.setDurations();
    }
  }

  setDurations() {
    let buildValue = 0;
    if (this.cost) {
      this.cost.map((aCost) => {
        let resourceType = utils.getMatchingResourceKind(aCost.specificity, aCost.type);
        if (!resourceType) {
          console.log('resourceType missing, aCost:');
          console.log(aCost);
        }
        if (resourceType.value) {
          buildValue += (resourceType.value * aCost.quantity);
        }
      });
    }
    if (buildValue <= 10) { this.duration = 5; }
    else {
      this.duration = (buildValue / Math.pow(3, Math.log10(buildValue)));
    }

    let upgradeValue = 0;
    if (this.upgradeCost) {
      this.upgradeCost.map((aCost) => {
        let resourceType = utils.getMatchingResourceKind(aCost.specificity, aCost.type);
        if (!resourceType) {
          console.log('resourceType missing, aCost:');
          console.log(aCost);
        }
        if (resourceType.value) {
          upgradeValue += (resourceType.value * aCost.quantity);
        }
      });
    }
    if (upgradeValue <= 10) { this.upgradeDuration = 5; }
    else {
      this.upgradeDuration = (upgradeValue / Math.pow(3, Math.log10(upgradeValue)));
    }
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
  terrainAllowed?: string[];
  recipes: BuildingRecipe[]|null;
  givesNote: string;
  noteCost: {specificity: string, type: string, quantity: number}[];
  upgradesInto?: string;
  duration?: number;
  upgradeDuration?: number;
  livingHappiness?: number;
  requiresLeader?: boolean;
  cannotStore?: boolean;
  opensTab?: { tabName: string, icon: Icon, label: string };
}
