import Terrain from '../models/terrain';

export const SET_TERRAIN = "SET_TERRAIN";
export function setTerrain(terrain: Terrain) {
  return {
    type: SET_TERRAIN,
    terrain
  }
}
