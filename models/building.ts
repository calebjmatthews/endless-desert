export default class Building {
  id: string = '';
  buildingType: string = '';
  suffix: number = 1;
  name: string|null = null;
  recipeSelected?: number = 0;
  paidCosts: { [costName: string] : boolean } = {};
  paidResources: { type: string, quantity: number }[] = [];
  paidUpgradeCosts: { [costName: string] : boolean } = {};
  paidUpgradeResources: { type: string, quantity: number }[] = [];

  constructor(building: Building) {
    if (!building.paidCosts) { building.paidCosts = {}; }
    if (!building.paidResources) { building.paidResources = []; }
    if (!building.paidUpgradeCosts) { building.paidUpgradeCosts = {}; }
    if (!building.paidUpgradeResources) { building.paidUpgradeResources = []; }

    Object.assign(this, building);
  }
}
