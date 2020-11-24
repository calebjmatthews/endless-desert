import Building from '../models/building';

export const SET_BUILDINGS = 'SET_BUILDINGS';
export function setBuildings(buildings: { [id: string] : Building }) {
  let newBuildings: { [id: string] : Building } = {};
  Object.keys(buildings).map((buildingId) => {
    newBuildings[buildingId] = new Building(buildings[buildingId]);
  });
  return {
    type: SET_BUILDINGS,
    buildings: buildings
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

function countBuildings(buildingName: string, buildings: { [id: string] : Building }) {
  let count = 0;
  Object.keys(buildings).map((id) => {
    if (buildings[id].buildingType == buildingName) {
      count++;
    }
  });
  return count;
}
