import BuildingRecipe from './building_recipe';
import BuildingType from './building_type';
import Resource from './resource';
import ResourceType from './resource_type';
import getDishFromIngredients from './building_cooking';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { QUALITY_VALUES } from '../constants';
const QV = QUALITY_VALUES;

export default class Building {
  id: string = '';
  buildingType: string = '';
  suffix: number = 1;
  name: string|null = null;
  coords?: [number, number];
  recipeSelected?: number = 0;
  // Resource selected to satisfy a non-exact rate's specType
  resourcesSelected: { [ specType: string ] : Resource } = {};
  // Usually a building is set to produce according to one recipe of an array,
  // but some buildings have modifiable recipies. If this building is one of those,
  // its current recipe will be stored here, otherwise this will be null.
  recipe: BuildingRecipe|null = null;
  paidCosts: { [costName: string] : boolean } = {};
  paidResources: { type: string, quantity: number }[] = [];
  paidUpgradeCosts: { [costName: string] : boolean } = {};
  paidUpgradeResources: { type: string, quantity: number }[] = [];

  constructor(building: DBBuilding, key?: string) {
    if (key) { building.id = key; }
    if (!building.suffix) { building.suffix = 1; }
    if (!building.name) { building.name = null; }
    if (!building.recipeSelected) { building.recipeSelected = 0; }
    if (!building.resourcesSelected) { building.resourcesSelected = {}; }
    if (!building.recipe) { building.recipe = null; }
    if (!building.paidCosts) { building.paidCosts = {}; }
    if (!building.paidResources) { building.paidResources = []; }
    if (!building.paidUpgradeCosts) { building.paidUpgradeCosts = {}; }
    if (!building.paidUpgradeResources) { building.paidUpgradeResources = []; }

    Object.assign(this, building);
  }

  getDishFromIngredients(ingredients: ResourceType[],
    resourceTypes: { [typeName: string] : ResourceType }) {
    return getDishFromIngredients(ingredients, resourceTypes);
  }

  export() {
    const exportObj: DBBuilding = { buildingType: this.buildingType };
    if (this.suffix !== 1) { exportObj.suffix = this.suffix; }
    if (this.name) { exportObj.name = this.name; }
    if (this.recipeSelected) { exportObj.recipeSelected = this.recipeSelected; }
    if (Object.keys(this.resourcesSelected).length > 0) {
      const expResourcesSelected:
        { [specType: string] : { type: string, quality: number} } = {};
      Object.keys(this.resourcesSelected).forEach((specType) => {
        const r = this.resourcesSelected[specType];
        expResourcesSelected[specType] = { type: r.type, quality: r.quality };
      });
      exportObj.resourcesSelected = expResourcesSelected;
    }
    if (this.recipe) { exportObj.recipe = this.recipe; }
    if (Object.keys(this.paidCosts).length > 0) {
      exportObj.paidCosts = this.paidCosts;
    }
    if (this.paidResources.length > 0) {
      exportObj.paidResources = this.paidResources;
    }
    if (Object.keys(this.paidUpgradeCosts).length > 0) {
      exportObj.paidUpgradeCosts = this.paidUpgradeCosts;
    }
    if (this.paidUpgradeResources.length > 0) {
      exportObj.paidUpgradeResources = this.paidUpgradeResources;
    }
    if (this.coords) {
      exportObj.coords = this.coords;
    }
    return exportObj;
  }
}

export interface DBBuilding {
  id?: string;
  buildingType: string;
  suffix?: number;
  name?: string|null;
  coords?: [number, number];
  recipeSelected?: number;
  // Resource typeQuality selected to satisfy a non-exact rate's specType
  resourcesSelected?: { [ specType: string ] : { type: string, quality: number} };
  // Usually a building is set to produce according to one recipe of an array,
  // but some buildings have modifiable recipies. If this building is one of those,
  // its current recipe will be stored here, otherwise this will be null.
  recipe?: BuildingRecipe|null;
  paidCosts?: { [costName: string] : boolean };
  paidResources?: { type: string, quantity: number }[];
  paidUpgradeCosts?: { [costName: string] : boolean };
  paidUpgradeResources?: { type: string, quantity: number }[];
}
