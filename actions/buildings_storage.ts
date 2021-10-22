import Building from '../models/building';

export const SET_BUILDINGS_STORAGE = 'SET_BUILDINGS_STORAGE';
export function setBuildingsStorage(buildings: { [id: string] : Building }) {
  let newBuildings: { [id: string] : Building } = {};
  Object.keys(buildings).map((buildingId) => {
    newBuildings[buildingId] = new Building(buildings[buildingId]);
  });
  return {
    type: SET_BUILDINGS_STORAGE,
    buildings: buildings
  }
}

export const ADD_BUILDING_TO_STORAGE = 'ADD_BUILDING_TO_STORAGE';
export function addBuildingToStorage(building: Building) {
  return {
    type: ADD_BUILDING_TO_STORAGE,
    building: building
  }
}

export const REMOVE_BUILDING_FROM_STORAGE = 'REMOVE_BUILDING_FROM_STORAGE';
export function removeBuildingFromStorage(building: Building) {
  return {
    type: REMOVE_BUILDING_FROM_STORAGE,
    building: building
  }
}
