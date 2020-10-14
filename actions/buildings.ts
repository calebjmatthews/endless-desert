import Building from '../models/building';

export const ADD_BUILDING = 'ADD_BUILDING';

export function addBuilding(building: Building) {
  return {
    type: ADD_BUILDING,
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
