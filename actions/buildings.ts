import Building from '../models/building';
import BuildingRecipe from '../models/building_recipe';
import Resource from '../models/resource';

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
export function selectBuildingRecipe(building: Building, recipeIndex: number|undefined) {
  return {
    type: SELECT_BUILDING_RECIPE,
    building: building,
    recipeIndex: recipeIndex
  }
}

export const SET_BUILDING_SPECIFIC_RECIPE = 'SET_BUILDING_SPECIFIC_RECIPE';
export function setBuildingSpecificRecipe(building: Building, recipe: BuildingRecipe,
  recipeIndex: number) {
  return {
    type: SET_BUILDING_SPECIFIC_RECIPE,
    building: building,
    recipe: recipe,
    recipeIndex: recipeIndex
  }
}

export const SET_BUILDING_RESOURCE_SELECTED = 'SET_BUILDING_RESOURCE_SELECTED';
export function setBuildingResourceSelected(building: Building, specType: string,
  resource: Resource) {
  return {
    type: SET_BUILDING_RESOURCE_SELECTED,
    building: building,
    specType: specType,
    resource: resource
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
