import BuildingType from '../models/building_type';
import BuildingProduction from '../models/building_production';
import BuildingConsumption from '../models/building_consumption';
import { BUILDING_TYPES } from '../enums/building_types';
import { RESOURCE_TYPES } from '../enums/resource_types';

let buildingTypes: { [name: string] : BuildingType } = {};

buildingTypes[BUILDING_TYPES.TRADING_POST] = new BuildingType({
  name: BUILDING_TYPES.TRADING_POST,
  production: null,
  consumption: null
});

buildingTypes[BUILDING_TYPES.HUT] = new BuildingType({
  name: BUILDING_TYPES.HUT,
  production: null,
  consumption: null
});

buildingTypes[BUILDING_TYPES.CISTERN] = new BuildingType({
  name: BUILDING_TYPES.CISTERN,
  production: [new BuildingProduction({produces: RESOURCE_TYPES.WATER, rate: 100})],
  consumption: null
});

buildingTypes[BUILDING_TYPES.LENTIL_FIELD] = new BuildingType({
  name: BUILDING_TYPES.LENTIL_FIELD,
  production: [new BuildingProduction({produces: RESOURCE_TYPES.LENTILS, rate: 10})],
  consumption: [new BuildingConsumption({consumes: RESOURCE_TYPES.WATER, rate: 10})]
});

export { buildingTypes }
