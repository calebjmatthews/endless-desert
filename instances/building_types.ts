import BuildingType from '../models/building_type';
import BuildingRecipe from '../models/building_recipe';
import Icon from '../models/icon';
import { BUILDING_TYPES } from '../enums/building_types';
const BTY = BUILDING_TYPES;
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_TAGS } from '../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
const RSC = RESOURCE_SUBCATEGORIES;
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
const RCA = RESOURCE_CATEGORIES;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;
import { BUILDING_CATEGORIES } from '../enums/building_categories';
const BCA = BUILDING_CATEGORIES;
import { EQUIPMENT_TYPES } from '../enums/equipment_types';
const EQT = EQUIPMENT_TYPES;
import { SVGS } from '../enums/svgs';

const defaultNoteCost = [
  { specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 1000 },
  { specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 400 },
  { specificity: RSP.EXACT, type: RTY.INK_FERROUS, quantity: 20 }
];
const dialecticNoteCost = [
  { specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 4000 },
  { specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 800 },
  { specificity: RSP.EXACT, type: RTY.INK_FERROUS, quantity: 40 }
];

const buildingTypes: { [name: string] : BuildingType } = {
  [BTY.SKY]:  new BuildingType({
    name: BTY.SKY,
    description: ('It stretches out boundlessly above you'),
    order: -1,
    category: BCA.GENERAL,
    icon: new Icon({provider: 'svg', name: SVGS.SKY}),
    cost: null,
    recipes: null,
    givesNote: RTY.NOTES_SKY,
    noteCost: defaultNoteCost,
    requiresLeader: false,
    cannotStore: true
  }),

  [BTY.BROKEN_CISTERN]:  new BuildingType({
    name: BTY.BROKEN_CISTERN,
    description: ('Water trickles through cracks in the wall, above a reservoir '
      + 'you cannot reach'),
    order: 1,
    category: BCA.MATERIAL,
    icon: new Icon({provider: 'svg', name: SVGS.BROKEN_CISTERN}),
    cost: null,
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 20},
      {specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 100}],
    upgradesInto: BTY.CISTERN,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 10, probability: 1}],
      consumes: null}) ],
    givesNote: RTY.NOTES_WATER,
    noteCost: defaultNoteCost,
    requiresLeader: false,
    cannotStore: true
  }),

  [BTY.DECAYING_STUDY]: new BuildingType({
    name: BTY.DECAYING_STUDY,
    description: 'A dusty, crooked room with a small desk in the corner',
    order: 2,
    category: BCA.GENERAL,
    icon: new Icon({provider: 'svg', name: SVGS.DECAYING_STUDY}),
    cost: null,
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 10},
      {specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 50}],
    upgradesInto: BTY.STUDY,
    recipes: null,
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    cannotStore: true
  }),

  [BTY.RUINED_HUTS]: new BuildingType({
    name: BTY.RUINED_HUTS,
    description: 'A handful of tiny, abandoned houses',
    order: 3,
    category: BCA.HOUSING,
    icon: new Icon({provider: 'svg', name: SVGS.RUINED_HUTS}),
    cost: null,
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 30},
      {specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 150}],
    upgradesInto: BTY.HUTS,
    recipes: null,
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    cannotStore: true
  }),

  [BTY.FALLOW_FIELD]: new BuildingType({
    name: BTY.FALLOW_FIELD,
    description: 'As it stands, it\'s primarily growing weeds and rocks',
    order: 4,
    category: BCA.FARMING,
    icon: new Icon({provider: 'svg', name: SVGS.FALLOW_FIELD}),
    cost: null,
    upgradeCost: [{specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL, quantity: 4},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 20}],
    upgradesInto: BTY.LENTIL_FIELD,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.LENTIL, quantity: 1, probability: 1}],
      consumes: null}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: false,
    cannotStore: true
  }),

  [BTY.MARKET_ABANDONED]: new BuildingType({
    name: BTY.MARKET_ABANDONED,
    description: ('There\'s a smell of spices in the air, so faint you might '
      + 'be imagining it'),
    order: 5,
    category: BCA.GENERAL,
    icon: new Icon({provider: 'svg', name: SVGS.MARKET_ABANDONED}),
    cost: null,
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 30}],
    upgradesInto: BTY.MARKET,
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    recipes: null,
    cannotStore: true
  }),

  [BTY.SHATTERED_DOME]: new BuildingType({
    name: BTY.SHATTERED_DOME,
    description: 'Its floors are covered in shattered glass; what was this?',
    order: 6,
    category: BCA.GENERAL,
    icon: new Icon({provider: 'svg', name: SVGS.SHATTERED_DOME}),
    cost: null,
    upgradeCost: [{specificity: RSP.EXACT, type: RTY.STEEL, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.GLASS, quantity: 4000}],
    recipes: null,
    givesNote: RTY.NOTES_SKY,
    noteCost: defaultNoteCost,
    upgradesInto: BTY.OBSERVATORY,
    cannotStore: true
  }),

  [BTY.OBSERVATORY]: new BuildingType({
    name: BTY.OBSERVATORY,
    description: 'The deepest desert can only be navigated by star',
    order: 6,
    category: BCA.GENERAL,
    icon: new Icon({provider: 'svg', name: SVGS.OBSERVATORY}),
    cost: null,
    recipes: null,
    givesNote: RTY.NOTES_SKY,
    noteCost: defaultNoteCost,
    cannotStore: true
  }),

  [BTY.GATE]: new BuildingType({
    name: BTY.GATE,
    description: 'A wall encircling the town and its simple gate',
    order: 7,
    category: BCA.GENERAL,
    icon: new Icon({provider: 'svg', name: SVGS.GATE}),
    cost: null,
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 100},
      {specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 1000}],
    recipes: null,
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    upgradesInto: BTY.GATE_BAKED_CLAY,
    cannotStore: true
  }),

  [BTY.GATE_BAKED_CLAY]: new BuildingType({
    name: BTY.GATE_BAKED_CLAY,
    description: 'A baked clay wall encircling the town and its rough gate',
    order: 7,
    category: BCA.GENERAL,
    icon: new Icon({provider: 'svg', name: SVGS.GATE}),
    cost: null,
    upgradeCost: [{specificity: RSP.EXACT, type: RTY.BRICKS_MUD, quantity: 400},
      {specificity: RSP.EXACT, type: RTY.BRICKS_SANDLIME, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.BRICKS_BROWNSTONE, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.BRICKS_RED, quantity: 100}],
    recipes: null,
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    upgradesInto: BTY.GATE_BRICKWORK,
    cannotStore: true
  }),

  [BTY.GATE_BRICKWORK]: new BuildingType({
    name: BTY.GATE_BRICKWORK,
    description: 'A many colored brick wall encircling the town and its sturdy gate',
    order: 7,
    category: BCA.GENERAL,
    icon: new Icon({provider: 'svg', name: SVGS.GATE}),
    cost: null,
    upgradeCost: [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.BRONZE, quantity: 80},
      {specificity: RSP.EXACT, type: RTY.BRASS, quantity: 80}],
    recipes: null,
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    upgradesInto: BTY.GATE_METAL_CLAD,
    cannotStore: true
  }),

  [BTY.GATE_METAL_CLAD]: new BuildingType({
    name: BTY.GATE_METAL_CLAD,
    description: 'A metal-plated wall encircling the town and its iron gate',
    order: 7,
    category: BCA.GENERAL,
    icon: new Icon({provider: 'svg', name: SVGS.GATE}),
    cost: null,
    // upgradeCost: [{specificity: RSP.EXACT, type: RTY.STEEL, quantity: 600}],
    recipes: null,
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    // upgradesInto: BTY.GATE_SHINING,
    cannotStore: true
  }),

  [BTY.STUDY]: new BuildingType({
    name: BTY.STUDY,
    description: ('Your home, with the bed you ignore nightly while you pour over '
      + 'writings'),
    category: BCA.GENERAL,
    icon: new Icon({provider: 'svg', name: SVGS.STUDY}),
    cost: null,
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 800},
      {specificity: RSP.EXACT, type: RTY.INK_FERROUS, quantity: 40},
      {specificity: RSP.EXACT, type: RTY.GLASS, quantity: 1600}],
    recipes: null,
    givesNote: RTY.NOTES_DIALECTIC,
    noteCost: dialecticNoteCost,
    upgradesInto: BTY.STUDY_PORTENTOUS,
    cannotStore: true
  }),

  [BTY.STUDY_PORTENTOUS]: new BuildingType({
    name: BTY.STUDY_PORTENTOUS,
    description: `A handsome house with an array of desks, shelves, and materials for your experiments`,
    category: BCA.GENERAL,
    icon: new Icon({provider: 'svg', name: SVGS.PORTENTOUS_STUDY}),
    cost: null,
    recipes: null,
    givesNote: RTY.NOTES_DIALECTIC,
    noteCost: dialecticNoteCost,
    cannotStore: true
  }),

  [BTY.MARKET]: new BuildingType({
    name: BTY.MARKET,
    description: ('Only large enough for a single stall, but a start to commerce '
      + 'in your settlement'),
    category: BCA.GENERAL,
    icon: new Icon({provider: 'svg', name: SVGS.MARKET}),
    cost: null,
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 500},
      {specificity: RSP.EXACT, type: RTY.BRASS, quantity: 40},
      {specificity: RSP.EXACT, type: RTY.GLASS, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 100}],
    upgradesInto: BTY.MARKET_GRAND,
    recipes: null,
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    cannotStore: true
  }),

  [BTY.MARKET_GRAND]: new BuildingType({
    name: BTY.MARKET_GRAND,
    description: `Large and handsome enough to comfortably hold two trading parties`,
    category: BCA.GENERAL,
    icon: new Icon({provider: 'svg', name: SVGS.GRAND_MARKET}),
    cost: null,
    recipes: null,
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    cannotStore: true
  }),

  [BTY.HUTS]: new BuildingType({
    name: BTY.HUTS,
    description: 'Unglamorous but liveable shacks, clustered together',
    category: BCA.HOUSING,
    icon: new Icon({provider: 'svg', name: SVGS.HUTS}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 30},
      {specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 300}],
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 120},
      {specificity: RSP.EXACT, type: RTY.THATCH, quantity: 300}],
    recipes: null,
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    upgradesInto: BTY.COTTAGES,
    livingHappiness: 0
  }),

  [BTY.COTTAGES]: new BuildingType({
    name: BTY.COTTAGES,
    description: 'Thatch roofed cottages to keep the wind and sun out',
    category: BCA.HOUSING,
    icon: new Icon({provider: 'svg', name: SVGS.COTTAGES}),
    cost: null,
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 300},
      {specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 800},
      {specificity: RSP.SUBCATEGORY, type: RSC.GLASS, quantity: 200}],
    recipes: null,
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    upgradesInto: BTY.HOUSES,
    livingHappiness: 15
  }),

  [BTY.HOUSES]: new BuildingType({
    name: BTY.HOUSES,
    description: 'Beautiful wooden homes with glass windows and rambling pathways '
      + 'running between them',
    category: BCA.HOUSING,
    icon: new Icon({provider: 'svg', name: SVGS.HOUSE}),
    cost: null,
    recipes: null,
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    livingHappiness: 30
  }),

  [BTY.CISTERN]: new BuildingType({
    name: BTY.CISTERN,
    description: 'The only thing standing between you and desiccation',
    category: BCA.MATERIAL,
    icon: new Icon({provider: 'svg', name: SVGS.CISTERN}),
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 100, probability: 1}],
      consumes: null}) ],
    givesNote: RTY.NOTES_WATER,
    noteCost: defaultNoteCost
  }),

  [BTY.CLAY_PIT]: new BuildingType({
    name: BTY.CLAY_PIT,
    description: 'Small amounts of precious water mixing with the dry under-soil',
    category: BCA.MATERIAL,
    icon: new Icon({provider: 'svg', name: SVGS.CLAY_PIT}),
    cost: [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 500}],
    upgradeCost: [{specificity: RSP.EXACT, type: RTY.THATCH, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 5000}],
    upgradesInto: BTY.CLAY_PIT_QUALITY,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.CLAY_MUDDY, quantity: 6, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 10}]}) ],
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.CLAY_PIT_QUALITY]: new BuildingType({
    name: BTY.CLAY_PIT_QUALITY,
    description: 'Extra water and care produce the best possible clay',
    category: BCA.MATERIAL,
    icon: new Icon({provider: 'svg', name: SVGS.CLAY_PIT}),
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.CLAY_MUDDY, quantity: 4, probability: 1},
        {specificity: RSP.EXACT, type: RTY.CLAY_RICH, quantity: 2, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 12}]}) ],
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.SAND_PIT]: new BuildingType({
    name: BTY.SAND_PIT,
    description: ('Sand is everywhere, the trick is keeping it from collapsing as you '
      + 'remove it'),
    category: BCA.MATERIAL,
    icon: new Icon({provider: 'svg', name: SVGS.SAND_PIT}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 50}],
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 400}],
    upgradesInto: BTY.SAND_PIT_RAPID,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 10, probability: 1}],
      consumes: null}) ],
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.SAND_PIT_RAPID]: new BuildingType({
    name: BTY.SAND_PIT_RAPID,
    description: ('Reinforced with brick and thatch to allow faster sand extraction'),
    category: BCA.MATERIAL,
    icon: new Icon({provider: 'svg', name: SVGS.SAND_PIT}),
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 40, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.THATCH, quantity: 1}]}) ],
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.LENTIL_FIELD]: new BuildingType({
    name: BTY.LENTIL_FIELD,
    description: 'Lentils grow in curly, bushy rows',
    category: BCA.FARMING,
    icon: new Icon({provider: 'svg', name: SVGS.LENTIL_FIELD}),
    cost: [{specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL, quantity: 10},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 100}],
    upgradeCost: [{specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL, quantity: 40},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 400}],
    upgradesInto: BTY.LENTIL_FIELD_HEARTY,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.LENTIL, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 10}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.LENTIL_FIELD_HEARTY]: new BuildingType({
    name: BTY.LENTIL_FIELD_HEARTY,
    description: 'Lentils grow in curly, bushy rows',
    category: BCA.FARMING,
    icon: new Icon({provider: 'svg', name: SVGS.LENTIL_FIELD}),
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.LENTIL, quantity: 16, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.REED_DELTA]: new BuildingType({
    name: BTY.REED_DELTA,
    description: 'Reeds cluster along the muddy banks',
    category: BCA.FARMING,
    icon: new Icon({provider: 'svg', name: SVGS.REED_DELTA}),
    cost: [{specificity: RSP.EXACT, type: RTY.SEEDS_REED, quantity: 10},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 10}],
    upgradeCost: [{specificity: RSP.EXACT, type: RTY.SEEDS_REED, quantity: 40},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 40}],
    upgradesInto: BTY.REED_DELTA_BOUNTIFUL,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 5}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.REED_DELTA_BOUNTIFUL]: new BuildingType({
    name: BTY.REED_DELTA_BOUNTIFUL,
    description: 'Reeds cluster along the muddy banks',
    category: BCA.FARMING,
    icon: new Icon({provider: 'svg', name: SVGS.REED_DELTA}),
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 22, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 6}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.GRAIN_FIELD]: new BuildingType({
    name: BTY.GRAIN_FIELD,
    description: 'If it\'s knee-cover by mid summer you know it\'s growing well',
    category: BCA.FARMING,
    icon: new Icon({provider: 'svg', name: SVGS.GRAIN_FIELD}),
    cost: [{specificity: RSP.EXACT, type: RTY.SEEDS_GRAIN, quantity: 10},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 200}],
    upgradeCost: [{specificity: RSP.EXACT, type: RTY.SEEDS_GRAIN, quantity: 80},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 800}],
    upgradesInto: BTY.GRAIN_FIELD_SIMPLIFIED,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 20, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 15}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.GRAIN_FIELD_SIMPLIFIED]: new BuildingType({
    name: BTY.GRAIN_FIELD_SIMPLIFIED,
    description: 'If it\'s knee-cover by mid summer you know it\'s growing well',
    category: BCA.FARMING,
    icon: new Icon({provider: 'svg', name: SVGS.GRAIN_FIELD}),
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 20, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 15}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.OLIVE_GROVE]: new BuildingType({
    name: BTY.OLIVE_GROVE,
    description: 'The lines of olive trees smell rich and sweet',
    category: BCA.FARMING,
    icon: new Icon({provider: 'svg', name: SVGS.OLIVE_GROVE}),
    cost: [{specificity: RSP.EXACT, type: RTY.SEEDS_OLIVE, quantity: 10},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 300}],
    upgradeCost: [{specificity: RSP.EXACT, type: RTY.SEEDS_OLIVE, quantity: 80},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 800}],
    upgradesInto: BTY.OLIVE_GROVE_SIMPLIFIED,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.OLIVE, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 20}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.OLIVE_GROVE_SIMPLIFIED]: new BuildingType({
    name: BTY.OLIVE_GROVE_SIMPLIFIED,
    description: 'The lines of olive trees smell rich and sweet',
    category: BCA.FARMING,
    icon: new Icon({provider: 'svg', name: SVGS.OLIVE_GROVE}),
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.OLIVE, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 20}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.FISHING_POND]: new BuildingType({
    name: BTY.FISHING_POND,
    description: '- Gone fishing -',
    category: BCA.FARMING,
    icon: new Icon({provider: 'svg', name: SVGS.FISHING_POND}),
    cost: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 2000},
      {specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 200}],
    upgradeCost: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4000},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 30},
      {specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 40}],
    upgradesInto: BTY.FISHING_POND_DREDGED,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.MUSSEL, quantity: 6, probability: 1}],
      consumes: null}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.MINNOW, quantity: 16, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 16}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.FISHING_POND_DREDGED]: new BuildingType({
    name: BTY.FISHING_POND_DREDGED,
    description: '- Gone fishing -',
    category: BCA.FARMING,
    icon: new Icon({provider: 'svg', name: SVGS.FISHING_POND}),
    cost: null,
    upgradeCost: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4000},
      {specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 180},
      {specificity: RSP.EXACT, type: RTY.SEEDS_OLIVE, quantity: 40}],
    upgradesInto: BTY.FISHING_POND_OLIVE_SHADED,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.MUSSEL, quantity: 6, probability: 1}],
      consumes: null}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.MINNOW, quantity: 16, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 16}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.CARP, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.TAG, type: RTA.FOOD, quantity: 800}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.FISHING_POND_OLIVE_SHADED]: new BuildingType({
    name: BTY.FISHING_POND_OLIVE_SHADED,
    description: '- Gone fishing -',
    category: BCA.FARMING,
    icon: new Icon({provider: 'svg', name: SVGS.FISHING_POND}),
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.MUSSEL, quantity: 6, probability: 1}],
      consumes: null}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.MINNOW, quantity: 16, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 16}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.CARP, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.TAG, type: RTA.FOOD, quantity: 800}]}),
    new BuildingRecipe({index: 3, produces:
      [{specificity: RSP.EXACT, type: RTY.BARRAMUNDI, quantity: 2, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.OLIVE, quantity: 6}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.QUAIL_PASTURE]: new BuildingType({
    name: BTY.QUAIL_PASTURE,
    description: 'Quail frolick around in the dawn and the dusk',
    category: BCA.FARMING,
    icon: new Icon({provider: 'svg', name: SVGS.QUAIL_PASTURE}),
    cost: [{specificity: RSP.EXACT, type: RTY.QUAIL, quantity: 10},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 40},
      {specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 100}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.QUAIL, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 8},
        {specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 8}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.EGG, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4},
        {specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 4}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.QUAIL_MEAT, quantity: 8, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.QUAIL, quantity: 8}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.OX_PASTURE]: new BuildingType({
    name: BTY.OX_PASTURE,
    description: 'Oxen cover themselves in mud at the river\'s edge',
    category: BCA.FARMING,
    icon: new Icon({provider: 'svg', name: SVGS.OX_PASTURE}),
    cost: [{specificity: RSP.EXACT, type: RTY.OX, quantity: 10},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 200},
      {specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 500}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.OX, quantity: 1, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 8},
        {specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 8}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.MILK, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4},
        {specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 4}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.OX_MEAT, quantity: 16, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.OX, quantity: 8}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.SPICE_FIELD]: new BuildingType({
    name: BTY.SPICE_FIELD,
    description: 'The smell is fantastic: spicy, biting, and wild',
    category: BCA.FARMING,
    icon: new Icon({provider: 'svg', name: SVGS.SPICE_FIELD}),
    cost: [{specificity: RSP.EXACT, type: RTY.SEEDS_OLIVE, quantity: 200},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 200},
      {specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 1000}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.CINNAMON, quantity: 2, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.CAROB, quantity: 2, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.MINT, quantity: 2, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4}]}),
    new BuildingRecipe({index: 3, produces:
      [{specificity: RSP.EXACT, type: RTY.PEPPERCORN, quantity: 2, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4}]}),
    new BuildingRecipe({index: 4, produces:
      [{specificity: RSP.EXACT, type: RTY.CORIANDER, quantity: 2, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4}]}),
    new BuildingRecipe({index: 5, produces:
      [{specificity: RSP.EXACT, type: RTY.ANISE, quantity: 2, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4}]}),
    new BuildingRecipe({index: 6, produces:
      [{specificity: RSP.EXACT, type: RTY.SORREL, quantity: 2, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.PRESS]: new BuildingType({
    name: BTY.PRESS,
    description: 'Great slabs of brick groan as they press together',
    category: BCA.MATERIAL_REFINED,
    icon: new Icon({provider: 'svg', name: SVGS.PRESS}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 40},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 40}],
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 200},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 200}],
    upgradesInto: BTY.PRESS_SIMPLIFIED,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.PULP, quantity: 10}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.OLIVE_OIL, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.OLIVE, quantity: 10}]}), ],
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.PRESS_SIMPLIFIED]: new BuildingType({
    name: BTY.PRESS_SIMPLIFIED,
    description: 'Great slabs of brick groan as they press together',
    category: BCA.MATERIAL_REFINED,
    icon: new Icon({provider: 'svg', name: SVGS.PRESS}),
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.PULP, quantity: 10}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.OLIVE_OIL, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.OLIVE, quantity: 10}]}), ],
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.GRINDING_MILL]: new BuildingType({
    name: BTY.GRINDING_MILL,
    description: 'The mill-blades can be seen from across town, spinning in the wind',
    category: BCA.MATERIAL_REFINED,
    icon: new Icon({provider: 'svg', name: SVGS.GRINDING_MILL}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 30},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 30},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 10}],
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 200},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 280}],
    upgradesInto: BTY.GRINDING_MILL_SIMPLIFIED,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.FLOUR, quantity: 40, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 40}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.PULP, quantity: 40, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 40}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.IRON_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_BLACK, quantity: 20, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.RUST_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 3, produces:
      [{specificity: RSP.EXACT, type: RTY.COPPER_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_BLACK, quantity: 20, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GREENISH_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 4, produces:
      [{specificity: RSP.EXACT, type: RTY.TIN_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_BLACK, quantity: 20, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.DUSTY_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 5, produces:
      [{specificity: RSP.EXACT, type: RTY.ZINC_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_BLACK, quantity: 10, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SULFUR, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.PALE_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 6, produces:
      [{specificity: RSP.EXACT, type: RTY.CARBON, quantity: 40, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 40}]}),
    new BuildingRecipe({index: 7, produces:
      [{specificity: RSP.EXACT, type: RTY.ABRASIVE, quantity: 40, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SAND_BLACK, quantity: 40}]})],
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.GRINDING_MILL_SIMPLIFIED]: new BuildingType({
    name: BTY.GRINDING_MILL_SIMPLIFIED,
    description: 'The mill-blades can be seen from across town, spinning in the wind',
    category: BCA.MATERIAL_REFINED,
    icon: new Icon({provider: 'svg', name: SVGS.GRINDING_MILL}),
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.FLOUR, quantity: 40, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 40}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.PULP, quantity: 10}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.IRON_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_BLACK, quantity: 20, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.RUST_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 3, produces:
      [{specificity: RSP.EXACT, type: RTY.COPPER_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_BLACK, quantity: 20, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GREENISH_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 4, produces:
      [{specificity: RSP.EXACT, type: RTY.TIN_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_BLACK, quantity: 20, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.DUSTY_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 5, produces:
      [{specificity: RSP.EXACT, type: RTY.ZINC_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_BLACK, quantity: 10, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SULFUR, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.PALE_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 6, produces:
      [{specificity: RSP.EXACT, type: RTY.CARBON, quantity: 40, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 40}]}),
    new BuildingRecipe({index: 7, produces:
      [{specificity: RSP.EXACT, type: RTY.ABRASIVE, quantity: 40, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SAND_VOLCANIC, quantity: 40}]})],
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.WEAVERY]: new BuildingType({
    name: BTY.WEAVERY,
    description: 'Clicking, whirring, and the murmur of soft voices',
    category: BCA.MATERIAL_REFINED,
    icon: new Icon({provider: 'svg', name: SVGS.WEAVERY}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 400},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 50}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.REEDCLOTH, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.THATCH, quantity: 20}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.LINEN, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.FLAX, quantity: 20}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.SILK, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SILKWORM_COCOON, quantity: 20},
        {specificity: RSP.EXACT, type: RTY.WATER, quantity: 20}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.SAND_CASCADE]: new BuildingType({
    name: BTY.SAND_CASCADE,
    description: 'Pillars of sand falling through great cloth filters',
    category: BCA.MATERIAL_REFINED,
    icon: new Icon({provider: 'svg', name: SVGS.SAND_CASCADE}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 400},
      {specificity: RSP.EXACT, type: RTY.LINEN, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.STEEL, quantity: 20}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.SAND_PURE, quantity: 98, probability: 1},
        {specificity: RSP.EXACT, type: RTY.CLAY_RICH, quantity: 2, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 100}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.SAND_PURE, quantity: 100, probability: 1},
        {specificity: RSP.EXACT, type: RTY.RUST_ORE, quantity: 0.6, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SAND_DUNE, quantity: 100}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.SAND_PURE, quantity: 100, probability: 1},
        {specificity: RSP.EXACT, type: RTY.PALE_ORE, quantity: 0.3, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SAND_PALE, quantity: 100}]}),
    new BuildingRecipe({index: 3, produces:
      [{specificity: RSP.EXACT, type: RTY.SAND_PURE, quantity: 100, probability: 1},
        {specificity: RSP.EXACT, type: RTY.DUSTY_ORE, quantity: 0.3, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SAND_VOLCANIC, quantity: 100}]}),
    new BuildingRecipe({index: 4, produces:
      [{specificity: RSP.EXACT, type: RTY.SAND_PURE, quantity: 100, probability: 1},
        {specificity: RSP.EXACT, type: RTY.JADE, quantity: 0.1, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SAND_CORAL, quantity: 100}]}),
    new BuildingRecipe({index: 5, produces:
      [{specificity: RSP.EXACT, type: RTY.SAND_PURE, quantity: 100, probability: 1},
        {specificity: RSP.EXACT, type: RTY.GREENISH_ORE, quantity: 0.2,
          probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SAND_OLIVINE, quantity: 100}]}),
    new BuildingRecipe({index: 6, produces:
      [{specificity: RSP.EXACT, type: RTY.SAND_PURE, quantity: 100, probability: 1},
        {specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 2, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SAND_BLACK, quantity: 100}]}),
    new BuildingRecipe({index: 7, produces:
      [{specificity: RSP.EXACT, type: RTY.SAND_PURE, quantity: 100, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SEEDS_GRAIN, quantity: 0.4,
          probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SAND_OCHRE, quantity: 100}]}) ],
    givesNote: RTY.NOTES_EARTH,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.TAILORS]: new BuildingType({
    name: BTY.TAILORS,
    description: 'Robes and cloaks lined in display cases, behind shining windows',
    category: BCA.ARTISAN_GOOD,
    icon: new Icon({provider: 'svg', name: SVGS.TAILORS}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 600},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 200},
      {specificity: RSP.SUBCATEGORY, type: RSC.GLASS, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 50}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: EQT.SIMPLE_ROBE + " (Unmarked)",
        quantity: 0.1, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.LINEN, quantity: 2}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.OUTFITTERS]: new BuildingType({
    name: BTY.OUTFITTERS,
    description: 'Straps, gourds, cases, and bags of all kinds hang from the walls',
    category: BCA.ARTISAN_GOOD,
    icon: new Icon({provider: 'svg', name: SVGS.OUTFITTERS}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 300},
      {specificity: RSP.SUBCATEGORY, type: RSC.GLASS, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.BRASS, quantity: 20}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: EQT.SHOULDER_POUCH + " (Unmarked)",
        quantity: 0.1, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.LINEN, quantity: 0.5}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: EQT.JOURNEYMANS_HAVERSACK + " (Unmarked)",
        quantity: 0.05, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.LINEN, quantity: 1}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: EQT.JOURNEYMANS_GEARBAG + " (Unmarked)",
        quantity: 0.05, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.LINEN, quantity: 1}]}),
    new BuildingRecipe({index: 3, produces:
      [{specificity: RSP.EXACT, type: EQT.JOURNEYMANS_TOOLPACK + " (Unmarked)",
        quantity: 0.05, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.LINEN, quantity: 1}]}) ],
    givesNote: RTY.NOTES_CULTIVATION,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.FABRICATORY]: new BuildingType({
    name: BTY.FABRICATORY,
    description: 'The acrid tang of hot metal hangs outside the wide doors',
    category: BCA.ARTISAN_GOOD,
    icon: new Icon({provider: 'svg', name: SVGS.FABRICATORY}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 400},
      {specificity: RSP.SUBCATEGORY, type: RSC.GLASS, quantity: 150},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 80},
      {specificity: RSP.EXACT, type: RTY.BRONZE, quantity: 40}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: EQT.ROUGH_MATTOCK + " (Unmarked)", quantity: 0.05,
        probability: 1}],
      consumes: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 1},
        {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 1}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: EQT.WOODEN_POLE + " (Unmarked)", quantity: 0.05,
        probability: 1}],
      consumes: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 1.5},
        {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 0.5}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: EQT.COARSE_MEASURES + " (Unmarked)",
        quantity: 0.05, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 2}]}) ],
    givesNote: RTY.NOTES_HEAT,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.DRYING_YARD]: new BuildingType({
    name: BTY.DRYING_YARD,
    description: 'The pitiless sun is an ally, for once',
    category: BCA.MATERIAL_REFINED,
    icon: new Icon({provider: 'svg', name: SVGS.DRYING_YARD}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 50}],
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.INK_FERROUS, quantity: 5}],
    upgradesInto: BTY.DRYING_YARD_SIMPLIFIED,
    recipes: [new BuildingRecipe({index: 0, produces:
        [{specificity: RSP.EXACT, type: RTY.SALT, quantity: 20, probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.BRINE, quantity: 20}]}),
      new BuildingRecipe({index: 1, produces:
        [{specificity: RSP.EXACT, type: RTY.THATCH, quantity: 10, probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 10}]}),
      new BuildingRecipe({index: 2, produces:
        [{specificity: RSP.EXACT, type: RTY.BRICKS_MUD, quantity: 10, probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_MUDDY, quantity: 10},
          {specificity: RSP.EXACT, type: RTY.THATCH, quantity: 1}]}),
      new BuildingRecipe({index: 3, produces:
        [{specificity: RSP.EXACT, type: RTY.BRICKS_BROWNSTONE, quantity: 10,
          probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_RICH, quantity: 10},
          {specificity: RSP.EXACT, type: RTY.THATCH, quantity: 1}]}),
      new BuildingRecipe({index: 4, produces:
        [{specificity: RSP.EXACT, type: RTY.BRICKS_RED, quantity: 10,
          probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_RED, quantity: 10},
          {specificity: RSP.EXACT, type: RTY.THATCH, quantity: 1}]}),
      new BuildingRecipe({index: 5, produces:
        [{specificity: RSP.EXACT, type: RTY.BRICKS_SANDLIME, quantity: 10,
          probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_BLUE, quantity: 10},
          {specificity: RSP.EXACT, type: RTY.THATCH, quantity: 1}]}),
      new BuildingRecipe({index: 6, produces:
        [{specificity: RSP.EXACT, type: RTY.BRICKS_SHINING, quantity: 10,
          probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_KAOLIN, quantity: 10},
          {specificity: RSP.EXACT, type: RTY.THATCH, quantity: 1}]}) ],
    givesNote: RTY.NOTES_HEAT,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.DRYING_YARD_SIMPLIFIED]: new BuildingType({
    name: BTY.DRYING_YARD_SIMPLIFIED,
    description: 'The pitiless sun is an ally, for once',
    category: BCA.MATERIAL_REFINED,
    icon: new Icon({provider: 'svg', name: SVGS.DRYING_YARD}),
    cost: null,
    recipes: [new BuildingRecipe({index: 0, produces:
        [{specificity: RSP.EXACT, type: RTY.SALT, quantity: 20, probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.BRINE, quantity: 20}]}),
      new BuildingRecipe({index: 1, produces:
        [{specificity: RSP.EXACT, type: RTY.THATCH, quantity: 10, probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 10}]}),
      new BuildingRecipe({index: 2, produces:
        [{specificity: RSP.EXACT, type: RTY.BRICKS_MUD, quantity: 10, probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_MUDDY, quantity: 10},
          {specificity: RSP.EXACT, type: RTY.THATCH, quantity: 1}]}),
      new BuildingRecipe({index: 3, produces:
        [{specificity: RSP.EXACT, type: RTY.BRICKS_BROWNSTONE, quantity: 10,
          probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_RICH, quantity: 10},
          {specificity: RSP.EXACT, type: RTY.THATCH, quantity: 1}]}),
      new BuildingRecipe({index: 4, produces:
        [{specificity: RSP.EXACT, type: RTY.BRICKS_RED, quantity: 10,
          probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_RED, quantity: 10},
          {specificity: RSP.EXACT, type: RTY.THATCH, quantity: 1}]}),
      new BuildingRecipe({index: 5, produces:
        [{specificity: RSP.EXACT, type: RTY.BRICKS_SANDLIME, quantity: 10,
          probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_BLUE, quantity: 10},
          {specificity: RSP.EXACT, type: RTY.THATCH, quantity: 1}]}),
      new BuildingRecipe({index: 6, produces:
        [{specificity: RSP.EXACT, type: RTY.BRICKS_SHINING, quantity: 10,
          probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_KAOLIN, quantity: 10},
          {specificity: RSP.EXACT, type: RTY.THATCH, quantity: 1}]}) ],
    givesNote: RTY.NOTES_HEAT,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.FURNACE]: new BuildingType({
    name: BTY.FURNACE,
    description: 'At night the furnace glows red, and the air shimmers around it',
    category: BCA.MATERIAL_REFINED,
    icon: new Icon({provider: 'svg', name: SVGS.FURNACE}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 100},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 20}],
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 400},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 200}],
    upgradesInto: BTY.FURNACE_SIMPLIFIED,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 500},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 40}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.GLASS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 30},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 80}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 2, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_BLACK, quantity: 8, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.RUST_ORE, quantity: 10},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 160}]}),
    new BuildingRecipe({index: 3, produces:
      [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.IRON_POWDER, quantity: 10},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 160}]}),
    new BuildingRecipe({index: 4, produces:
      [{specificity: RSP.EXACT, type: RTY.BRONZE, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.COPPER_POWDER, quantity: 8},
        {specificity: RSP.EXACT, type: RTY.TIN_POWDER, quantity: 2},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 160}]}),
    new BuildingRecipe({index: 5, produces:
      [{specificity: RSP.EXACT, type: RTY.BRASS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.COPPER_POWDER, quantity: 7},
        {specificity: RSP.EXACT, type: RTY.ZINC_POWDER, quantity: 3},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 160}]}) ],
    givesNote: RTY.NOTES_HEAT,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.FURNACE_SIMPLIFIED]: new BuildingType({
    name: BTY.FURNACE_SIMPLIFIED,
    description: 'At night the furnace glows red, and the air shimmers around it',
    category: BCA.MATERIAL_REFINED,
    icon: new Icon({provider: 'svg', name: SVGS.FURNACE}),
    cost: null,
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 800},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 400},
      {specificity: RSP.EXACT, type: RTY.BRONZE, quantity: 100}],
    upgradesInto: BTY.FURNACE_BLAST,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 10},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 10}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.GLASS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 30},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 80}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 2, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_BLACK, quantity: 8, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.RUST_ORE, quantity: 10},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 160}]}),
    new BuildingRecipe({index: 3, produces:
      [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.IRON_POWDER, quantity: 10},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 160}]}),
    new BuildingRecipe({index: 4, produces:
      [{specificity: RSP.EXACT, type: RTY.BRONZE, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.COPPER_POWDER, quantity: 8},
        {specificity: RSP.EXACT, type: RTY.TIN_POWDER, quantity: 2},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 160}]}),
    new BuildingRecipe({index: 5, produces:
      [{specificity: RSP.EXACT, type: RTY.BRASS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.COPPER_POWDER, quantity: 7},
        {specificity: RSP.EXACT, type: RTY.ZINC_POWDER, quantity: 3},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 160}]}) ],
    givesNote: RTY.NOTES_HEAT,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.FURNACE_BLAST]: new BuildingType({
    name: BTY.FURNACE_BLAST,
    description: 'At night the furnace glows red, and the air shimmers around it',
    category: BCA.MATERIAL_REFINED,
    icon: new Icon({provider: 'svg', name: SVGS.FURNACE}),
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 10},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 10}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.GLASS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 30},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 80}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 2, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_BLACK, quantity: 8, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.RUST_ORE, quantity: 10},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 160}]}),
    new BuildingRecipe({index: 3, produces:
      [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.IRON_POWDER, quantity: 10},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 160}]}),
    new BuildingRecipe({index: 4, produces:
      [{specificity: RSP.EXACT, type: RTY.BRONZE, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.COPPER_POWDER, quantity: 8},
        {specificity: RSP.EXACT, type: RTY.TIN_POWDER, quantity: 2},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 160}]}),
    new BuildingRecipe({index: 5, produces:
      [{specificity: RSP.EXACT, type: RTY.BRASS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.COPPER_POWDER, quantity: 7},
        {specificity: RSP.EXACT, type: RTY.ZINC_POWDER, quantity: 3},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 160}]}),
    new BuildingRecipe({index: 6, produces:
      [{specificity: RSP.EXACT, type: RTY.STEEL, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.IRON_POWDER, quantity: 40},
        {specificity: RSP.EXACT, type: RTY.CARBON, quantity: 40},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 800}]}) ],
    givesNote: RTY.NOTES_HEAT,
    noteCost: defaultNoteCost,
    requiresLeader: false
  }),

  [BTY.WORKSHOP]: new BuildingType({
    name: BTY.WORKSHOP,
    description: `Rows of benches, with myriad tools in easy reach`,
    category: BCA.MATERIAL_REFINED,
    icon: new Icon({provider: 'svg', name: SVGS.WORKSHOP}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 100},
      {specificity: RSP.SUBCATEGORY, type: RSC.GLASS, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 10},
      {specificity: RSP.EXACT, type: RTY.BRONZE, quantity: 20}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.IRON_EDGE, quantity: 1, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 10}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.HARDENED_SLAB, quantity: 1, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 5},
        {specificity: RSP.EXACT, type: RTY.BRONZE, quantity: 5}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.CRUDE_NEEDLE, quantity: 1, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 4},
        {specificity: RSP.EXACT, type: RTY.BRONZE, quantity: 1}]}),
    new BuildingRecipe({index: 3, produces:
      [{specificity: RSP.EXACT, type: RTY.GEARWORK, quantity: 1, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.BRONZE, quantity: 2},
        {specificity: RSP.EXACT, type: RTY.BRASS, quantity: 4}]}),
    new BuildingRecipe({index: 4, produces:
      [{specificity: RSP.EXACT, type: RTY.ROUGH_ROPE, quantity: 1, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.THATCH, quantity: 20},
        {specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 20}]}),
    new BuildingRecipe({index: 5, produces:
      [{specificity: RSP.EXACT, type: RTY.BINDING, quantity: 1, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 40},
        {specificity: RSP.EXACT, type: RTY.PULP, quantity: 40}]}) ],
    givesNote: RTY.NOTES_HEAT,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.KITCHEN]: new BuildingType({
    name: BTY.KITCHEN,
    description: 'People are always hanging around outside, for some reason',
    category: BCA.ARTISAN_GOOD,
    icon: new Icon({provider: 'svg', name: SVGS.KITCHEN}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 200},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 50},
      {specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 40},
      {specificity: RSP.EXACT, type: RTY.GLASS, quantity: 100}],
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 400},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 100}],
    upgradesInto: BTY.KITCHEN_BOUNTIFUL,
    recipes: null,
    givesNote: RTY.NOTES_HEAT,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.KITCHEN_BOUNTIFUL]: new BuildingType({
    name: BTY.KITCHEN_BOUNTIFUL,
    description: 'People are always hanging around outside, for some reason',
    category: BCA.ARTISAN_GOOD,
    icon: new Icon({provider: 'svg', name: SVGS.KITCHEN}),
    cost: null,
    recipes: null,
    givesNote: RTY.NOTES_HEAT,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.GLASSWORKS]: new BuildingType({
    name: BTY.GLASSWORKS,
    description: 'Glittering pieces of failed past works have been pressed '
      + 'into the walls',
    category: BCA.ARTISAN_GOOD,
    icon: new Icon({provider: 'svg', name: SVGS.GLASSWORKS}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.BRASS, quantity: 80}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.BEADS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GLASS, quantity: 10}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.GLASSWARE, quantity: 2, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GLASS, quantity: 8}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.LENS, quantity: 1, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GLASS, quantity: 10},
        {specificity: RSP.EXACT, type: RTY.ABRASIVE, quantity: 10}]}) ],
    givesNote: RTY.NOTES_HEAT,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.LABORATORY]: new BuildingType({
    name: BTY.LABORATORY,
    description: 'A shining manifestation of deep knowledge',
    category: BCA.ARTISAN_GOOD,
    icon: new Icon({provider: 'svg', name: SVGS.LABORATORY}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 400},
      {specificity: RSP.EXACT, type: RTY.GLASSWARE, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.BRASS, quantity: 120},
      {specificity: RSP.EXACT, type: RTY.STEEL, quantity: 40}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.ACID, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SULFUR, quantity: 5},
        {specificity: RSP.EXACT, type: RTY.WATER, quantity: 5}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.FERTILIZER, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.TAG, type: RTA.FUEL, quantity: 100}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.GLAZE_TIN, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.TIN_POWDER, quantity: 10},
        {specificity: RSP.EXACT, type: RTY.ACID, quantity: 1}]}),
    new BuildingRecipe({index: 3, produces:
      [{specificity: RSP.EXACT, type: RTY.GLAZE_ASH, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CARBON, quantity: 10},
        {specificity: RSP.EXACT, type: RTY.ACID, quantity: 1}]}),
    new BuildingRecipe({index: 4, produces:
      [{specificity: RSP.EXACT, type: RTY.GLAZE_LAPIS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.LAPIS_LAZULI, quantity: 10},
        {specificity: RSP.EXACT, type: RTY.ACID, quantity: 1}]}) ],
    givesNote: RTY.NOTES_WATER,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.POTTERY_KILN]: new BuildingType({
    name: BTY.POTTERY_KILN,
    description: 'The smell of wet clay and the whirring of wheels',
    category: BCA.ARTISAN_GOOD,
    icon: new Icon({provider: 'svg', name: SVGS.POTTERY_KILN}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 300},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 180},
      {specificity: RSP.EXACT, type: RTY.BRONZE, quantity: 60}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.TERRACOTTA, quantity: 6, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_RED, quantity: 6},
        {specificity: RSP.EXACT, type: RTY.WATER, quantity: 2},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 20}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.ASHWARE, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_RICH, quantity: 4},
        {specificity: RSP.EXACT, type: RTY.GLAZE_ASH, quantity: 2},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 40}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.FAIENCE, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_BLUE, quantity: 4},
        {specificity: RSP.EXACT, type: RTY.GLAZE_TIN, quantity: 2},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 40}]}),
    new BuildingRecipe({index: 3, produces:
      [{specificity: RSP.EXACT, type: RTY.PORCELAIN, quantity: 2, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_KAOLIN, quantity: 2},
        {specificity: RSP.EXACT, type: RTY.GLAZE_LAPIS, quantity: 2},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 60}]}) ],
    givesNote: RTY.NOTES_HEAT,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.BREWERY]: new BuildingType({
    name: BTY.BREWERY,
    description: 'Large wooden and copper vats, shielded from the sun and air',
    category: BCA.ARTISAN_GOOD,
    icon: new Icon({provider: 'svg', name: SVGS.BREWERY}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 500},
      {specificity: RSP.EXACT, type: RTY.BRASS, quantity: 300},
      {specificity: RSP.EXACT, type: RTY.STEEL, quantity: 60}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.BEER, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 4},
        {specificity: RSP.EXACT, type: RTY.WATER, quantity: 4}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.LIQUOR, quantity: 1, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.BEER, quantity: 2}]}) ],
    givesNote: RTY.NOTES_WATER,
    noteCost: defaultNoteCost,
    requiresLeader: true
  }),

  [BTY.PYRE]: new BuildingType({
    name: BTY.PYRE,
    description: 'A white brick basin made for immolation',
    category: BCA.GENERAL,
    icon: new Icon({provider: 'svg', name: SVGS.PYRE}),
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 1000},
      {specificity: RSP.EXACT, type: RTY.BRICKS_SHINING, quantity: 300},
      {specificity: RSP.EXACT, type: RTY.BRASS, quantity: 100}],
    recipes: null,
    givesNote: RTY.NOTES_HEAT,
    noteCost: defaultNoteCost,
    cannotStore: true
  }),
};

export { buildingTypes }
