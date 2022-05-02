import { buildingTypes } from '../instances/building_types';
import { utils } from '../utils';
import { TERRAIN_TYPES } from '../enums/terrain_types';
const TTY = TERRAIN_TYPES;
import { BUILDING_TYPES } from '../enums/building_types';
const BTY = BUILDING_TYPES;

/*
Maps use a cartesian coordinate system, with the original bottom left corner as 0, 0.
Like so:

*----*----*----*----*
|0, 3|1, 3|2, 3|3, 3|
*----*----*----*----*
|0, 2|1, 2|2, 2|3, 2|
*----*----*----*----*
|0, 1|1, 1|2, 1|3, 1|
*----*----*----*----*
|0, 0|1, 0|2, 0|3, 0|
*----*----*----*----*
 */

export default class Terrain {
  spots: { type: string }[][] = [];
  leftBound: number = 0;
  upperBound: number = 3;
  rightBound: number = 3;

  constructor(terrain: TerrainInterface|null) {
    if (terrain) {
      Object.assign(this, terrain);
    }
    else {
      for (let col = this.leftBound; col <= this.rightBound; col++) {
        this.spots[col] = [];
      }
    }
  }

  generateTerrain(terrain: Terrain|null) {
    const ti = new Terrain(terrain);
    const buildingPlacement: { type: string }[][] = [];
    for (let col = this.leftBound; col <= this.rightBound; col++) {
      buildingPlacement[col] = [];
    }
    const buildingMap: { [typeName: string] : [number, number] } = {};

    // Place Sand on all spaces to begin
    for (let col = ti.leftBound; col <= ti.rightBound; col++) {
      for (let row = 0; row <= ti.upperBound; row++) {
        ti.spots[col][row] = { type: TTY.SAND };
      }
    }

    // Place Broken Cistern at one of the bottom-middle spots
    const bc: [number, number] = (utils.random() < 0.5) ? [1, 0] : [2, 0];
    ti.spots[bc[0]][bc[1]] = { type: TTY.WATER };
    ti.spots[bc[0]-1][bc[1]] = { type: TTY.RIVERBANK };
    ti.spots[bc[0]+1][bc[1]] = { type: TTY.RIVERBANK };
    buildingPlacement[bc[0]][bc[1]] = { type: BTY.BROKEN_CISTERN };
    buildingMap[BTY.BROKEN_CISTERN] = bc;

    // Make the spot one upwards into river
    ti.spots[bc[0]][bc[1]+1] = { type: TTY.WATER };
    ti.spots[bc[0]-1][bc[1]+1] = { type: TTY.RIVERBANK };
    ti.spots[bc[0]+1][bc[1]+1] = { type: TTY.RIVERBANK };

    // Follow the river's flow upwards for the next two rows
    const tr = new Terrain(this.flowRiver(ti));

    // Place starting buildings
    const startingBuildingTypes = [BTY.FALLOW_FIELD, BTY.DECAYING_STUDY,
      BTY.RUINED_HUTS, BTY.SHATTERED_DOME, BTY.MARKET_ABANDONED];
    for (let index = 0; index < startingBuildingTypes.length; index++) {
      const typeName = startingBuildingTypes[index];
      const spot = this.findSpotForBuilding(tr, buildingPlacement, typeName);
      buildingPlacement[spot[0]][spot[1]] = { type: typeName };
      buildingMap[typeName] = spot;
    }
    return { terrain: tr, buildingMap };
  }

  flowRiver(terrain: Terrain) {
    const t = new Terrain(terrain);
    // Find the highest row that contains water (row #2 is the lowest possible)
    let highestWaterRow = 2;
    for (let col = t.leftBound; col <= t.rightBound; col++) {
      for (let row = 2; row <= t.upperBound; row++) {
        if (t.spots[col][row].type === TTY.WATER) {
          highestWaterRow = row;
        }
      }
    }

    // Add water until upperBound is reached
    for (let row = highestWaterRow; row <= t.upperBound; row++) {
      // Check whether the river bent in the previous row
      let previousWaters: [number, number][] = [];
      for (let col = t.leftBound; col <= t.rightBound; col++) {
        if (t.spots[col][row-1].type === TTY.WATER) {
          previousWaters.push([col, row-1]);
        }
      }
      // If not, make the spot one upwards into river and roll for
      // whether the river bends
      if (previousWaters.length < 2) {
        const col = previousWaters[0][0];
        t.spots[col][row] = { type: TTY.WATER };
        t.spots[col-1][row] = { type: TTY.RIVERBANK };
        t.spots[col+1][row] = { type: TTY.RIVERBANK };
        if (utils.random() < 0.5) {
          const canBendLeft = ((col-1) > t.leftBound);
          const canBendRight = ((col+1) < t.rightBound);
          const preferLeft = (utils.random() < 0.5);
          if (preferLeft && canBendLeft || !canBendRight) {
            t.spots[col-1][row] = { type: TTY.WATER };
            t.spots[col-2][row] = { type: TTY.RIVERBANK };
          }
          else {
            t.spots[col+1][row] = { type: TTY.WATER };
            t.spots[col+2][row] = { type: TTY.RIVERBANK };
          }
        }
      }
      // If the river bent in the previous row, follow the bend of the river
      // rather than the original path
      else {
        const ls = previousWaters[0];
        const rs = previousWaters[1];
        const leftSpotIsBend = (t.spots[ls[0]][ls[1]-2].type !== TTY.WATER);
        if (leftSpotIsBend) {
          t.spots[ls[0]][row] = { type: TTY.WATER };
          t.spots[ls[0]-1][row] = { type: TTY.RIVERBANK };
          t.spots[ls[0]+1][row] = { type: TTY.RIVERBANK };
        }
        else {
          t.spots[rs[0]][row] = { type: TTY.WATER };
          t.spots[rs[0]-1][row] = { type: TTY.RIVERBANK };
          t.spots[rs[0]+1][row] = { type: TTY.RIVERBANK };
        }
      }
    }

    return t;
  }

  findSpotForBuilding(t: Terrain, buildingPlacement: { type: string }[][],
    typeName: string): [number, number] {
    const buildingType = buildingTypes[typeName];
    for (let loop = 0; loop < 100; loop++) {
      const col = Math.floor(utils.random() * (t.rightBound+1)) - t.leftBound;
      const row = Math.floor(utils.random() * (t.upperBound+1)) - 0;
      if (utils.arrayIncludes(buildingType.terrainAllowed, t.spots[col][row].type)
        && !buildingPlacement[col][row]) {
        return [col, row];
      }
    }
    console.log('Error: valid building spot could not be found after 100 attempts');
    return [-1, -1];
  }
}

interface TerrainInterface {
  spots: { type: string }[][];
  leftBound: number;
  upperBound: number;
  rightBound: number;
}
