import Building from '../models/building';

export const SET_BUILDINGS_CONSTRUCTION = 'SET_BUILDINGS_CONSTRUCTION';
export function setBuildingsConstruction(buildings: { [id: string] : Building }) {
  let newBuildings: { [id: string] : Building } = {};
  Object.keys(buildings).map((buildingId) => {
    newBuildings[buildingId] = new Building(buildings[buildingId]);
  });
  return {
    type: SET_BUILDINGS_CONSTRUCTION,
    buildings: buildings
  }
}

export const ADD_BUILDING_CONSTRUCTION = 'ADD_BUILDING_CONSTRUCTION';
export function addBuildingConstruction(building: Building) {
  return {
    type: ADD_BUILDING_CONSTRUCTION,
    building: building
  }
}

export const REMOVE_BUILDING_CONSTRUCTION = 'REMOVE_BUILDING_CONSTRUCTION';
export function removeBuildingConstruction(building: Building) {
  return {
    type: REMOVE_BUILDING_CONSTRUCTION,
    building: building
  }
}

export const PAY_BUILDING_COST = 'PAY_BUILDING_COST';
export function payBuildingCost(building: Building,
  aCost: {specificity: string, type: string, quantity: number},
  resources: {type: string, quantity: number}[]) {
  return {
    type: PAY_BUILDING_COST,
    building: building,
    aCost: aCost,
    resources: resources
  }
}
