import BuildingRecipe from './building_recipe';
import BuildingType from './building_type';
import ResourceType from './resource_type';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { QUALITY_VALUES } from '../constants';
const QV = QUALITY_VALUES;

export default class Building {
  id: string = '';
  buildingType: string = '';
  suffix: number = 1;
  name: string|null = null;
  recipeSelected?: number = 0;
  // Usually a building is set to produce according to one recipe of an array,
  // but some buildings have modifiable recipies. If this building is one of those,
  // its current recipe will be stored here, otherwise this will be null.
  recipe: BuildingRecipe|null = null;
  paidCosts: { [costName: string] : boolean } = {};
  paidResources: { type: string, quantity: number }[] = [];
  paidUpgradeCosts: { [costName: string] : boolean } = {};
  paidUpgradeResources: { type: string, quantity: number }[] = [];

  constructor(building: Building) {
    if (!building.recipe) { building.recipe = null; }
    if (!building.paidCosts) { building.paidCosts = {}; }
    if (!building.paidResources) { building.paidResources = []; }
    if (!building.paidUpgradeCosts) { building.paidUpgradeCosts = {}; }
    if (!building.paidUpgradeResources) { building.paidUpgradeResources = []; }

    Object.assign(this, building);
  }

  modifyRecipesFromFuel(resourceType: ResourceType, quality: number,
    buildingType: BuildingType) {
    if (buildingType.recipes) {
      return buildingType.recipes.map((recipe) => {
        return this.modifyOneRecipeFromFuel(resourceType, quality, recipe);
      });
    }
    return [];
  }

  modifyOneRecipeFromFuel(resourceType: ResourceType, quality: number,
    recipe: BuildingRecipe) {
    let newProduces: {specificity: string, type: string, quantity: number,
      probability: number}[]|null = null;
    let newConsumes: {specificity: string, type: string, quantity: number}[]|null = null;
    if (recipe.produces) {
      newProduces = recipe.produces
    }
    if (recipe.consumes) {
      let fuelConsume: {specificity: string, type: string, quantity: number} =
        { specificity: RESOURCE_SPECIFICITY.EXACT, type: '', quantity: 0 };
      newConsumes = recipe.consumes.slice();
      newConsumes = newConsumes.filter((consume) => {
        if (consume.type != RESOURCE_TAGS.FUEL) { return consume; }
        else { fuelConsume = consume; }
      });

      if (fuelConsume.type.length > 0 && resourceType.value) {
        const quantity = fuelConsume.quantity / resourceType.value;
        newConsumes.push({specificity: RESOURCE_SPECIFICITY.EXACT,
          type: resourceType.name, quantity });
      }
    }
    return new BuildingRecipe({ index: recipe.index, produces: newProduces,
      consumes: newConsumes});
  }
}
