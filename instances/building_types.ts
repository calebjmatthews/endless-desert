import BuildingType from '../models/building_type';
import { BUILDING_TYPES } from '../enums/building_types';
import { RESOURCE_TYPES } from '../enums/resource_types';

let buildingTypes: { [name: string] : BuildingType } = {};

buildingTypes[BUILDING_TYPES.BROKEN_CISTERN] = new BuildingType({
  name: BUILDING_TYPES.BROKEN_CISTERN,
  icon: {provider: 'MaterialCommunityIcons', name: 'pot'},
  foregroundColor: '#93c5ec',
  backgroundColor: '#fff',
  cost: null,
  upgradeCost: [{resource: RESOURCE_TYPES.CLAY_RED, quantity: 2},
    {resource: RESOURCE_TYPES.SAND_YELLOW, quantity: 20}],
  production: [{produces: RESOURCE_TYPES.WATER, rate: 10}],
  consumption: null,
  upgradesInto: BUILDING_TYPES.CISTERN
});

buildingTypes[BUILDING_TYPES.DECAYING_STUDY] = new BuildingType({
  name: BUILDING_TYPES.DECAYING_STUDY,
  icon: {provider: 'FontAwesome5', name: 'book-open'},
  foregroundColor: '#b1b1b1',
  backgroundColor: '#fff',
  cost: null,
  upgradeCost: [{resource: RESOURCE_TYPES.CLAY_RED, quantity: 1},
    {resource: RESOURCE_TYPES.SAND_YELLOW, quantity: 10}],
  production: null,
  consumption: null,
  upgradesInto: BUILDING_TYPES.STUDY
});

buildingTypes[BUILDING_TYPES.RUINED_HUTS] = new BuildingType({
  name: BUILDING_TYPES.RUINED_HUTS,
  icon: {provider: 'FontAwesome5', name: 'store-alt'},
  foregroundColor: '#d0b2a7',
  backgroundColor: '#fff',
  cost: null,
  upgradeCost: [{resource: RESOURCE_TYPES.CLAY_RED, quantity: 3},
    {resource: RESOURCE_TYPES.SAND_YELLOW, quantity: 30}],
  production: null,
  consumption: null,
  upgradesInto: BUILDING_TYPES.HUTS
});

buildingTypes[BUILDING_TYPES.FALLOW_FIELD] = new BuildingType({
  name: BUILDING_TYPES.FALLOW_FIELD,
  icon: {provider: 'FontAwesome5', name: 'seedling'},
  foregroundColor: '#bbdc94',
  backgroundColor: '#fff',
  cost: null,
  upgradeCost: [{resource: RESOURCE_TYPES.SEEDS, quantity: 4},
    {resource: RESOURCE_TYPES.WATER, quantity: 20}],
  production: [{produces: RESOURCE_TYPES.LENTILS, rate: 1}],
  consumption: null,
  upgradesInto: BUILDING_TYPES.LENTIL_FIELD
});

buildingTypes[BUILDING_TYPES.SHATTERED_GATE] = new BuildingType({
  name: BUILDING_TYPES.SHATTERED_GATE,
  icon: {provider: 'FontAwesome5', name: 'dungeon'},
  foregroundColor: '#b1b1b1',
  backgroundColor: '#fff',
  cost: null,
  production: null,
  consumption: null,
  upgradesInto: BUILDING_TYPES.GATE
});

buildingTypes[BUILDING_TYPES.ABANDONED_MARKET] = new BuildingType({
  name: BUILDING_TYPES.ABANDONED_MARKET,
  icon: {provider: 'FontAwesome5', name: 'store'},
  foregroundColor: '#b1b1b1',
  backgroundColor: '#fff',
  cost: null,
  production: null,
  consumption: null,
  upgradesInto: BUILDING_TYPES.MARKET
});

buildingTypes[BUILDING_TYPES.MARKET] = new BuildingType({
  name: BUILDING_TYPES.MARKET,
  icon: {provider: 'MaterialIcons', name: 'storefront'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff',
  cost: null,
  production: null,
  consumption: null
});

buildingTypes[BUILDING_TYPES.HUTS] = new BuildingType({
  name: BUILDING_TYPES.HUTS,
  icon: {provider: 'FontAwesome5', name: 'store-alt'},
  foregroundColor: '#795548',
  backgroundColor: '#fff',
  cost: null,
  production: null,
  consumption: null
});

buildingTypes[BUILDING_TYPES.CISTERN] = new BuildingType({
  name: BUILDING_TYPES.CISTERN,
  icon: {provider: 'MaterialCommunityIcons', name: 'pot'},
  foregroundColor: '#2196f3',
  backgroundColor: '#fff',
  cost: null,
  production: [{produces: RESOURCE_TYPES.WATER, rate: 100}],
  consumption: null
});

buildingTypes[BUILDING_TYPES.LENTIL_FIELD] = new BuildingType({
  name: BUILDING_TYPES.LENTIL_FIELD,
  icon: {provider: 'FontAwesome5', name: 'seedling'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff',
  cost: [{resource: RESOURCE_TYPES.SEEDS, quantity: 10},
    {resource: RESOURCE_TYPES.WATER, quantity: 100}],
  production: [{produces: RESOURCE_TYPES.LENTILS, rate: 10}],
  consumption: [{consumes: RESOURCE_TYPES.WATER, rate: 10}]
});

buildingTypes[BUILDING_TYPES.REED_DELTA] = new BuildingType({
  name: BUILDING_TYPES.REED_DELTA,
  icon: {provider: 'MaterialCommunityIcons', name: 'reorder-vertical'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff',
  cost: [{resource: RESOURCE_TYPES.SEEDS, quantity: 10},
    {resource: RESOURCE_TYPES.WATER, quantity: 10}],
  production: [{produces: RESOURCE_TYPES.REEDS, rate: 10}],
  consumption: [{consumes: RESOURCE_TYPES.WATER, rate: 5}]
});

buildingTypes[BUILDING_TYPES.GRAIN_FIELD] = new BuildingType({
  name: BUILDING_TYPES.GRAIN_FIELD,
  icon: {provider: 'MaterialCommunityIcons', name: 'corn'},
  foregroundColor: '#d8be04',
  backgroundColor: '#fff',
  cost: [{resource: RESOURCE_TYPES.SEEDS, quantity: 10},
    {resource: RESOURCE_TYPES.WATER, quantity: 200}],
  production: [{produces: RESOURCE_TYPES.GRAIN, rate: 10}],
  consumption: [{consumes: RESOURCE_TYPES.WATER, rate: 15}]
});

buildingTypes[BUILDING_TYPES.OLIVE_GROVE] = new BuildingType({
  name: BUILDING_TYPES.OLIVE_GROVE,
  icon: {provider: 'FontAwesome', name: 'pagelines'},
  foregroundColor: '#97c701',
  backgroundColor: '#fff',
  cost: [{resource: RESOURCE_TYPES.SEEDS, quantity: 10},
    {resource: RESOURCE_TYPES.WATER, quantity: 300}],
  production: [{produces: RESOURCE_TYPES.OLIVES, rate: 10}],
  consumption: [{consumes: RESOURCE_TYPES.WATER, rate: 20}]
});

buildingTypes[BUILDING_TYPES.CLAY_PIT] = new BuildingType({
  name: BUILDING_TYPES.CLAY_PIT,
  icon: {provider: 'FontAwesome5', name: 'splotch'},
  foregroundColor: '#a91f1f',
  backgroundColor: '#fff',
  cost: [{resource: RESOURCE_TYPES.REEDS, quantity: 100},
    {resource: RESOURCE_TYPES.WATER, quantity: 500}],
  production: [{produces: RESOURCE_TYPES.CLAY_RED, rate: 10}],
  consumption: [{consumes: RESOURCE_TYPES.WATER, rate: 10}]
});

buildingTypes[BUILDING_TYPES.SAND_PIT] = new BuildingType({
  name: BUILDING_TYPES.SAND_PIT,
  icon: {provider: 'FontAwesome5', name: 'mountain'},
  foregroundColor: '#f9df00',
  backgroundColor: '#fff',
  cost: [{resource: RESOURCE_TYPES.BRICKS_RED, quantity: 100}],
  production: [{produces: RESOURCE_TYPES.SAND_YELLOW, rate: 10}],
  consumption: null
});

buildingTypes[BUILDING_TYPES.DRYING_YARD] = new BuildingType({
  name: BUILDING_TYPES.DRYING_YARD,
  icon: {provider: 'MaterialCommunityIcons', name: 'waves'},
  foregroundColor: '#ff0000',
  backgroundColor: '#fff',
  cost: [{resource: RESOURCE_TYPES.WOOD_OAK, quantity: 50}],
  production: [{produces: RESOURCE_TYPES.THATCH, rate: 10}],
  consumption: [{consumes: RESOURCE_TYPES.REEDS, rate: 10}]
});

buildingTypes[BUILDING_TYPES.PRESS] = new BuildingType({
  name: BUILDING_TYPES.PRESS,
  icon: {provider: 'MaterialCommunityIcons', name: 'inbox-multiple'},
  foregroundColor: '#795548',
  backgroundColor: '#fff',
  cost: [{resource: RESOURCE_TYPES.BRICKS_RED, quantity: 40},
    {resource: RESOURCE_TYPES.WOOD_OAK, quantity: 40}],
  production: [{produces: RESOURCE_TYPES.THATCH, rate: 10}],
  consumption: null
});

buildingTypes[BUILDING_TYPES.FURNACE] = new BuildingType({
  name: BUILDING_TYPES.FURNACE,
  icon: {provider: 'MaterialCommunityIcons', name: 'fireplace'},
  foregroundColor: '#b02727',
  backgroundColor: '#fff',
  cost: [{resource: RESOURCE_TYPES.BRICKS_RED, quantity: 100},
    {resource: RESOURCE_TYPES.WOOD_OAK, quantity: 20}],
  production: [{produces: RESOURCE_TYPES.GLASS, rate: 5}],
  consumption: [{consumes: RESOURCE_TYPES.SAND_YELLOW, rate: 10},
    {consumes: RESOURCE_TYPES.REEDS, rate: 3}]
});

export { buildingTypes }
