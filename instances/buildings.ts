import Building from '../models/building';
import { buildingTypes } from './building_types';
import { BUILDING_TYPES } from '../enums/building_types';
const BTY = BUILDING_TYPES;
import { utils } from '../utils';

function startingFactory(buildingType: string, coords: [number, number]) {
  let building = new Building({
    id: utils.randHex(16),
    buildingType,
    suffix: 1,
    name: buildingTypes[buildingType].name,
    coords,
    paidCosts: {},
    paidResources: [],
    paidUpgradeCosts: {},
    paidUpgradeResources: [],
    resourcesSelected: {},
    recipe: null
  });
  if (buildingTypes[buildingType].recipes) {
    building.recipeSelected = 0;
  }
  return building;
}

const genStartingBuildings = (buildingMap:
  { [typeName: string] : [number, number] }) => {
  const buildingsStartingTypeNames = [BTY.BROKEN_CISTERN, BTY.FALLOW_FIELD,
    BTY.DECAYING_STUDY, BTY.RUINED_HUTS, BTY.SHATTERED_DOME, BTY.MARKET_ABANDONED,
    BTY.GATE];
  let buildingsStarting: { [id: string] : Building } = {};
  buildingsStartingTypeNames.forEach((typeName) => {
    const coords = buildingMap[typeName];
    const building = startingFactory(typeName, coords);
    buildingsStarting[building.id] = building;
  });
  return buildingsStarting;
}

export { genStartingBuildings }
