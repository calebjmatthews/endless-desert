import BuildingType from '../models/building_type';
import BuildingRecipe from '../models/building_recipe';
import { BUILDING_TYPES } from '../enums/building_types';
const BTY = BUILDING_TYPES;
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;

let buildingTypes: { [name: string] : BuildingType } = {};

buildingTypes[BTY.BROKEN_CISTERN] = new BuildingType({
  name: BTY.BROKEN_CISTERN,
  icon: {provider: 'MaterialCommunityIcons', name: 'pot'},
  foregroundColor: '#93c5ec',
  backgroundColor: '#fff',
  cost: null,
  upgradeCost: [{resource: RTY.CLAY_RED, quantity: 2},
    {resource: RTY.SAND_YELLOW, quantity: 20}],
  recipes: [ new BuildingRecipe({index: 0, produces:
    [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 10, probability: 1}],
    consumes: null}) ],
  upgradesInto: BTY.CISTERN
});

buildingTypes[BTY.DECAYING_STUDY] = new BuildingType({
  name: BTY.DECAYING_STUDY,
  icon: {provider: 'FontAwesome5', name: 'book-open'},
  foregroundColor: '#b1b1b1',
  backgroundColor: '#fff',
  cost: null,
  upgradeCost: [{resource: RTY.CLAY_RED, quantity: 1},
    {resource: RTY.SAND_YELLOW, quantity: 10}],
  recipes: null,
  upgradesInto: BTY.STUDY
});

buildingTypes[BTY.RUINED_HUTS] = new BuildingType({
  name: BTY.RUINED_HUTS,
  icon: {provider: 'FontAwesome5', name: 'store-alt'},
  foregroundColor: '#d0b2a7',
  backgroundColor: '#fff',
  cost: null,
  upgradeCost: [{resource: RTY.CLAY_RED, quantity: 3},
    {resource: RTY.SAND_YELLOW, quantity: 30}],
  recipes: null,
  upgradesInto: BTY.HUTS
});

buildingTypes[BTY.FALLOW_FIELD] = new BuildingType({
  name: BTY.FALLOW_FIELD,
  icon: {provider: 'FontAwesome5', name: 'seedling'},
  foregroundColor: '#bbdc94',
  backgroundColor: '#fff',
  cost: null,
  upgradeCost: [{resource: RTY.SEEDS, quantity: 4},
    {resource: RTY.WATER, quantity: 20}],
  recipes: [ new BuildingRecipe({index: 0, produces:
    [{specificity: RSP.EXACT, type: RTY.LENTILS, quantity: 1, probability: 1}],
    consumes: null}) ],
  upgradesInto: BTY.LENTIL_FIELD
});

buildingTypes[BTY.SHATTERED_GATE] = new BuildingType({
  name: BTY.SHATTERED_GATE,
  icon: {provider: 'FontAwesome5', name: 'dungeon'},
  foregroundColor: '#b1b1b1',
  backgroundColor: '#fff',
  cost: null,
  recipes: null,
  upgradesInto: BTY.GATE
});

buildingTypes[BTY.ABANDONED_MARKET] = new BuildingType({
  name: BTY.ABANDONED_MARKET,
  icon: {provider: 'FontAwesome5', name: 'store'},
  foregroundColor: '#b1b1b1',
  backgroundColor: '#fff',
  cost: null,
  recipes: null,
  upgradesInto: BTY.MARKET
});

buildingTypes[BTY.MARKET] = new BuildingType({
  name: BTY.MARKET,
  icon: {provider: 'MaterialIcons', name: 'storefront'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff',
  cost: null,
  recipes: null
});

buildingTypes[BTY.STUDY] = new BuildingType({
  name: BTY.STUDY,
  icon: {provider: 'FontAwesome5', name: 'book-open'},
  foregroundColor: '#000',
  backgroundColor: '#fff',
  cost: null,
  recipes: null
});

buildingTypes[BTY.HUTS] = new BuildingType({
  name: BTY.HUTS,
  icon: {provider: 'FontAwesome5', name: 'store-alt'},
  foregroundColor: '#795548',
  backgroundColor: '#fff',
  cost: null,
  recipes: null
});

buildingTypes[BTY.CISTERN] = new BuildingType({
  name: BTY.CISTERN,
  icon: {provider: 'MaterialCommunityIcons', name: 'pot'},
  foregroundColor: '#2196f3',
  backgroundColor: '#fff',
  cost: null,
  recipes: [ new BuildingRecipe({index: 0, produces:
    [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 100, probability: 1}],
    consumes: null}) ]
});

buildingTypes[BTY.LENTIL_FIELD] = new BuildingType({
  name: BTY.LENTIL_FIELD,
  icon: {provider: 'FontAwesome5', name: 'seedling'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff',
  cost: [{resource: RTY.SEEDS, quantity: 10},
    {resource: RTY.WATER, quantity: 100}],
  recipes: [ new BuildingRecipe({index: 0, produces:
    [{specificity: RSP.EXACT, type: RTY.LENTILS, quantity: 10, probability: 1}],
    consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 10}]}) ]
});

buildingTypes[BTY.REED_DELTA] = new BuildingType({
  name: BTY.REED_DELTA,
  icon: {provider: 'MaterialCommunityIcons', name: 'reorder-vertical'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff',
  cost: [{resource: RTY.SEEDS, quantity: 10},
    {resource: RTY.WATER, quantity: 10}],
  recipes: [ new BuildingRecipe({index: 0, produces:
    [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 10, probability: 1}],
    consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 5}]}) ]
});

buildingTypes[BTY.GRAIN_FIELD] = new BuildingType({
  name: BTY.GRAIN_FIELD,
  icon: {provider: 'MaterialCommunityIcons', name: 'corn'},
  foregroundColor: '#d8be04',
  backgroundColor: '#fff',
  cost: [{resource: RTY.SEEDS, quantity: 10},
    {resource: RTY.WATER, quantity: 200}],
  recipes: [ new BuildingRecipe({index: 0, produces:
    [{specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 10, probability: 1}],
    consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 15}]}) ]
});

buildingTypes[BTY.OLIVE_GROVE] = new BuildingType({
  name: BTY.OLIVE_GROVE,
  icon: {provider: 'FontAwesome', name: 'pagelines'},
  foregroundColor: '#97c701',
  backgroundColor: '#fff',
  cost: [{resource: RTY.SEEDS, quantity: 10},
    {resource: RTY.WATER, quantity: 300}],
  recipes: [ new BuildingRecipe({index: 0, produces:
    [{specificity: RSP.EXACT, type: RTY.OLIVES, quantity: 10, probability: 1}],
    consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 20}]}) ]
});

buildingTypes[BTY.CLAY_PIT] = new BuildingType({
  name: BTY.CLAY_PIT,
  icon: {provider: 'FontAwesome5', name: 'splotch'},
  foregroundColor: '#a91f1f',
  backgroundColor: '#fff',
  cost: [{resource: RTY.REEDS, quantity: 100},
    {resource: RTY.WATER, quantity: 500}],
  recipes: [ new BuildingRecipe({index: 0, produces:
    [{specificity: RSP.EXACT, type: RTY.CLAY_RED, quantity: 10, probability: 1}],
    consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 10}]}) ]
});

buildingTypes[BTY.SAND_PIT] = new BuildingType({
  name: BTY.SAND_PIT,
  icon: {provider: 'FontAwesome5', name: 'mountain'},
  foregroundColor: '#f9df00',
  backgroundColor: '#fff',
  cost: [{resource: RTY.CLAY_RED, quantity: 100}],
  recipes: [ new BuildingRecipe({index: 0, produces:
    [{specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 10, probability: 1}],
    consumes: null}) ]
});

buildingTypes[BTY.DRYING_YARD] = new BuildingType({
  name: BTY.DRYING_YARD,
  icon: {provider: 'MaterialCommunityIcons', name: 'waves'},
  foregroundColor: '#ff0000',
  backgroundColor: '#fff',
  cost: [{resource: RTY.WOOD_OAK, quantity: 50}],
  recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.BRICKS_RED, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_RED, quantity: 10},
        {specificity: RSP.EXACT, type: RTY.THATCH, quantity: 1}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.THATCH, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 10}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.PULP, quantity: 10}]}) ]
});

buildingTypes[BTY.PRESS] = new BuildingType({
  name: BTY.PRESS,
  icon: {provider: 'MaterialCommunityIcons', name: 'inbox-multiple'},
  foregroundColor: '#795548',
  backgroundColor: '#fff',
  cost: [{resource: RTY.BRICKS_RED, quantity: 40},
    {resource: RTY.WOOD_OAK, quantity: 40}],
  recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.OLIVE_OIL, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.OLIVES, quantity: 10}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.PULP, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 10}]}) ]
});

buildingTypes[BTY.FURNACE] = new BuildingType({
  name: BTY.FURNACE,
  icon: {provider: 'MaterialCommunityIcons', name: 'fireplace'},
  foregroundColor: '#b02727',
  backgroundColor: '#fff',
  cost: [{resource: RTY.BRICKS_RED, quantity: 100},
    {resource: RTY.WOOD_OAK, quantity: 20}],
  recipes: [ new BuildingRecipe({index: 0, produces:
    [{specificity: RSP.EXACT, type: RTY.GLASS, quantity: 10, probability: 1}],
    consumes: [{specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 10}]}) ]
});

export { buildingTypes }
