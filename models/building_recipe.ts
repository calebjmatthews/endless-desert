export default class BuildingRecipe {
  index: number = 0;
  produces: {specificity: string, type: string, quantity: number,
    probability: number}[]|null = null;
  consumes: {specificity: string, type: string, quantity: number}[]|null = null;

  constructor(recipe: BuildingRecipe) {
    Object.assign(this, recipe);
  }
}
