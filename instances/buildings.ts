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
    name: buildingTypes[buildingType].name,
    paidCosts: {},
    paidResources: [],
    paidUpgradeCosts: {},
    paidUpgradeResources: [],
    resourcesSelected: {},
    recipe: null
  });
  if (buildingTypes[buildingType].recipes) {
    startingBuilding.recipeSelected = 0;
  }
  buildingsStarting[startingBuilding.id] = startingBuilding;
}

startingFactory(BUILDING_TYPES.BROKEN_CISTERN);
startingFactory(BUILDING_TYPES.FALLOW_FIELD);
startingFactory(BUILDING_TYPES.DECAYING_STUDY);
startingFactory(BUILDING_TYPES.RUINED_HUTS);
startingFactory(BUILDING_TYPES.SHATTERED_DOME);
startingFactory(BUILDING_TYPES.ABANDONED_MARKET);

export { buildingsStarting }
