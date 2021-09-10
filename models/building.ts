import BuildingRecipe from './building_recipe';
import BuildingType from './building_type';
import Resource from './resource';
import ResourceType from './resource_type';
import getDishFromIngredients from './building_cooking';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { QUALITY_VALUES } from '../constants';
const QV = QUALITY_VALUES;

export default class Building implements BuildingInterface {
  id: string = '';
  buildingType: string = '';
  suffix: number = 1;
  name: string|null = null;
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

  constructor(building: BuildingInterface) {
    if (!building.recipe) { building.recipe = null; }
    if (!building.paidCosts) { building.paidCosts = {}; }
    if (!building.paidResources) { building.paidResources = []; }
    if (!building.paidUpgradeCosts) { building.paidUpgradeCosts = {}; }
    if (!building.paidUpgradeResources) { building.paidUpgradeResources = []; }
    if (!building.resourcesSelected) { building.resourcesSelected = {}; }

    Object.assign(this, building);
  }

  getDishFromIngredients(ingredients: ResourceType[],
    resourceTypes: { [typeName: string] : ResourceType }) {
    return getDishFromIngredients(ingredients, resourceTypes);
  }
}

interface BuildingInterface {
  id: string;
  buildingType: string;
  suffix: number;
  name: string|null;
  recipeSelected?: number;
  // Resource typeQuality selected to satisfy a non-exact rate's specType
  resourcesSelected: { [ specType: string ] : Resource };
  // Usually a building is set to produce according to one recipe of an array,
  // but some buildings have modifiable recipies. If this building is one of those,
  // its current recipe will be stored here, otherwise this will be null.
  recipe: BuildingRecipe|null;
  paidCosts?: { [costName: string] : boolean };
  paidResources?: { type: string, quantity: number }[];
  paidUpgradeCosts?: { [costName: string] : boolean };
  paidUpgradeResources?: { type: string, quantity: number }[];
}
