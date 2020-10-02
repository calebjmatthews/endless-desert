import Building from '../models/building';
import { buildingTypes } from './building_types';
import { BUILDING_TYPES } from '../enums/building_types';
import { utils } from '../utils';

let buildingsStarting: { [id: string] : Building } = {};

function startingFactory(buildingType: string) {
  let startingBuilding = new Building({
    id: utils.randHex(16),
    buildingType: buildingType,
    suffix: 1,
    name: null
  });
  buildingsStarting[startingBuilding.id] = startingBuilding;
}

startingFactory(BUILDING_TYPES.TRADING_POST);
startingFactory(BUILDING_TYPES.HUT);
startingFactory(BUILDING_TYPES.CISTERN);
startingFactory(BUILDING_TYPES.LENTIL_FIELD);

export { buildingsStarting }
