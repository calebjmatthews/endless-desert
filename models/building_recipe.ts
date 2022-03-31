export default class BuildingRecipe {
  index: number = 0;
  produces: { specificity: string, type: string, quantity: number,
    probability: number }[]|null = null;
  consumes: { specificity: string, type: string, quantity: number }[]|null = null;

  constructor(recipe: BuildingRecipe) {
    let produces: { specificity: string, type: string, quantity: number,
      probability: number }[] = [];
    if (recipe.produces) {
      recipe.produces.map((produce) => produces.push(produce));
      recipe.produces = produces;
    }
    let consumes: { specificity: string, type: string, quantity: number }[] = [];
    if (recipe.consumes) {
      recipe.consumes.map((consume) => consumes.push(consume));
      recipe.consumes = consumes;
    }

    Object.assign(this, { index: recipe.index, produces, consumes });
  }
}
