import Building from '../models/building';

export const SET_BUILDINGS = 'SET_BUILDINGS';
export function setBuildings(buildings: { [id: string] : Building }) {
  let newBuildings: { [id: string] : Building } = {};
  Object.keys(buildings).map((buildingId) => {
    newBuildings[buildingId] = new Building(buildings[buildingId]);
  });
  return {
    type: SET_BUILDINGS,
    buildings: newBuildings
  }
}

export const ADD_BUILDING = 'ADD_BUILDING';
export function addBuilding(building: Building) {
  return {
    type: ADD_BUILDING,
    building: building
  }
}

export const REPLACE_BUILDING = 'REPLACE_BUILDING';
export function replaceBuilding(building: Building) {
  return {
    type: REPLACE_BUILDING,
    building: building
  }
}

export const SELECT_BUILDING_RECIPE = 'SELECT_BUILDING_RECIPE';
export function selectBuildingRecipe(building: Building, recipeIndex: number) {
  return {
    type: SELECT_BUILDING_RECIPE,
    building: building,
    recipeIndex: recipeIndex
  }
}

export const PAY_BUILDING_UPGRADE_COST = 'PAY_BUILDING_UPGRADE_COST';
export function payBuildingUpgradeCost(building: Building,
  aCost: {specificity: string, type: string, quantity: number},
  resources: {type: string, quantity: number}[]) {
  return {
    type: PAY_BUILDING_UPGRADE_COST,
    building: building,
    aCost: aCost,
    resources: resources
  }
}

function countBuildings(buildingName: string, buildings: { [id: string] : Building }) {
  let count = 0;
  Object.keys(buildings).map((id) => {
    if (buildings[id].buildingType == buildingName) {
      count++;
    }
  });
  return count;
}
