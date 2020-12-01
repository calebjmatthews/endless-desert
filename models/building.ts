export default class Building {
  id: string = '';
  buildingType: string = '';
  suffix: number = 1;
  name: string|null = null;
  recipeSelected?: number = 0;

  constructor(building: Building) {
    Object.assign(this, building);
  }
}
