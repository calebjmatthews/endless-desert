import BuildingType from '../models/building_type';
import BuildingProduction from '../models/building_production';
import BuildingConsumption from '../models/building_consumption';
import { BUILDING_TYPES } from '../enums/building_types';
import { RESOURCE_TYPES } from '../enums/resource_types';

let buildingTypes: { [name: string] : BuildingType } = {};

buildingTypes[BUILDING_TYPES.TRADING_POST] = new BuildingType({
  name: BUILDING_TYPES.TRADING_POST,
  icon: {provider: 'FontAwesome', name: 'exchange'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff',
  production: null,
  consumption: null
});

buildingTypes[BUILDING_TYPES.HUT] = new BuildingType({
  name: BUILDING_TYPES.HUT,
  icon: {provider: 'MaterialCommunityIcons', name: 'window-closed'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff',
  production: null,
  consumption: null
});

buildingTypes[BUILDING_TYPES.CISTERN] = new BuildingType({
  name: BUILDING_TYPES.CISTERN,
  icon: {provider: 'MaterialCommunityIcons', name: 'pot'},
  foregroundColor: '#2196f3',
  backgroundColor: '#fff',
  production: [new BuildingProduction({produces: RESOURCE_TYPES.WATER, rate: 100})],
  consumption: null
});

buildingTypes[BUILDING_TYPES.LENTIL_FIELD] = new BuildingType({
  name: BUILDING_TYPES.LENTIL_FIELD,
  icon: {provider: 'FontAwesome', name: 'pagelines'},
  foregroundColor: '#76c716',
  backgroundColor: '#fff',
  production: [new BuildingProduction({produces: RESOURCE_TYPES.LENTILS, rate: 10})],
  consumption: [new BuildingConsumption({consumes: RESOURCE_TYPES.WATER, rate: 10})]
});

buildingTypes[BUILDING_TYPES.REED_DELTA] = new BuildingType({
  name: BUILDING_TYPES.REED_DELTA,
  icon: {provider: 'MaterialCommunityIcons', name: 'palm-tree'},
  foregroundColor: '#76c716',
  backgroundColor: '#fff',
  production: [new BuildingProduction({produces: RESOURCE_TYPES.REEDS, rate: 10})],
  consumption: [new BuildingConsumption({consumes: RESOURCE_TYPES.WATER, rate: 5})]
});

export { buildingTypes }
