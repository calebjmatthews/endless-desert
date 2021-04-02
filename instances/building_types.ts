import BuildingType from '../models/building_type';
import BuildingRecipe from '../models/building_recipe';
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

const buildingTypes: { [name: string] : BuildingType } = {
  [BTY.BROKEN_CISTERN]:  new BuildingType({
    name: BTY.BROKEN_CISTERN,
    description: ('Water trickles through cracks in the wall, above a reservoir '
      + 'you cannot reach'),
    order: 0,
    category: BCA.MATERIAL,
    icon: {provider: 'MaterialCommunityIcons', name: 'pot'},
    foregroundColor: '#93c5ec',
    backgroundColor: '#fff',
    cost: null,
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 2},
      {specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 20}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 10, probability: 1}],
      consumes: null}) ],
    upgradesInto: BTY.CISTERN,
    requiresLeader: false
  }),

  [BTY.DECAYING_STUDY]: new BuildingType({
    name: BTY.DECAYING_STUDY,
    description: 'A dusty, crooked room with a small desk in the corner',
    order: 1,
    category: BCA.GENERAL,
    icon: {provider: 'FontAwesome5', name: 'book-open'},
    foregroundColor: '#b1b1b1',
    backgroundColor: '#fff',
    cost: null,
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 1},
      {specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 10}],
    recipes: null,
    upgradesInto: BTY.STUDY
  }),

  [BTY.RUINED_HUTS]: new BuildingType({
    name: BTY.RUINED_HUTS,
    description: 'A handful of tiny, abandoned houses',
    order: 2,
    category: BCA.HOUSING,
    icon: {provider: 'FontAwesome5', name: 'store-alt'},
    foregroundColor: '#d0b2a7',
    backgroundColor: '#fff',
    cost: null,
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 3},
      {specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 30}],
    recipes: null,
    upgradesInto: BTY.HUTS
  }),

  [BTY.FALLOW_FIELD]: new BuildingType({
    name: BTY.FALLOW_FIELD,
    description: 'As it stands, it\'s primarily growing weeds and rocks',
    order: 3,
    category: BCA.FARMING,
    icon: {provider: 'FontAwesome5', name: 'seedling'},
    foregroundColor: '#bbdc94',
    backgroundColor: '#fff',
    cost: null,
    upgradeCost: [{specificity: RSP.EXACT, type: RTY.SEEDS, quantity: 4},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 20}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.LENTILS, quantity: 1, probability: 1}],
      consumes: null}) ],
    upgradesInto: BTY.LENTIL_FIELD,
    requiresLeader: false
  }),

  [BTY.ABANDONED_MARKET]: new BuildingType({
    name: BTY.ABANDONED_MARKET,
    description: ('There\'s a smell of spices in the air, so faint you might '
      + 'be imagining it'),
    order: 4,
    category: BCA.GENERAL,
    icon: {provider: 'FontAwesome5', name: 'store'},
    foregroundColor: '#b1b1b1',
    backgroundColor: '#fff',
    cost: null,
    recipes: null,
    upgradesInto: BTY.MARKET
  }),

  [BTY.SHATTERED_GATE]: new BuildingType({
    name: BTY.SHATTERED_GATE,
    description: 'Two vast and trunkless legs of stone',
    order: 5,
    category: BCA.GENERAL,
    icon: {provider: 'FontAwesome5', name: 'dungeon'},
    foregroundColor: '#b1b1b1',
    backgroundColor: '#fff',
    cost: null,
    recipes: null,
    upgradesInto: BTY.GATE
  }),

  [BTY.STUDY]: new BuildingType({
    name: BTY.STUDY,
    description: ('Your home, with the bed you ignore nightly while you pour over '
      + 'writings'),
    category: BCA.GENERAL,
    icon: {provider: 'FontAwesome5', name: 'book-open'},
    foregroundColor: '#000',
    backgroundColor: '#fff',
    cost: null,
    recipes: null
  }),

  [BTY.MARKET]: new BuildingType({
    name: BTY.MARKET,
    description: ('Only large enough for a single stall, but a start to commerce '
      + 'in your settlement'),
    category: BCA.GENERAL,
    icon: {provider: 'MaterialIcons', name: 'storefront'},
    foregroundColor: '#2b2b2d',
    backgroundColor: '#fff',
    cost: null,
    recipes: null
  }),

  [BTY.HUTS]: new BuildingType({
    name: BTY.HUTS,
    description: 'Unglamorous but liveable shacks, clustered together',
    category: BCA.HOUSING,
    icon: {provider: 'FontAwesome5', name: 'store-alt'},
    foregroundColor: '#795548',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 30},
      {specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 300}],
    recipes: null,
    livingHappiness: 0
  }),

  [BTY.CISTERN]: new BuildingType({
    name: BTY.CISTERN,
    description: 'The only thing standing between you and desiccation',
    category: BCA.MATERIAL,
    icon: {provider: 'MaterialCommunityIcons', name: 'pot'},
    foregroundColor: '#2196f3',
    backgroundColor: '#fff',
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 100, probability: 1}],
      consumes: null}) ]
  }),

  [BTY.CLAY_PIT]: new BuildingType({
    name: BTY.CLAY_PIT,
    description: 'Small amounts of precious water mixing with the dry under-soil',
    category: BCA.MATERIAL,
    icon: {provider: 'FontAwesome5', name: 'splotch'},
    foregroundColor: '#a91f1f',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 500}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.CLAY_RED, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 10}]}) ],
    requiresLeader: false
  }),

  [BTY.SAND_PIT]: new BuildingType({
    name: BTY.SAND_PIT,
    description: ('Sand is everywhere, the trick is keeping it from collapsing as you '
      + 'remove it'),
    category: BCA.MATERIAL,
    icon: {provider: 'FontAwesome5', name: 'mountain'},
    foregroundColor: '#f9df00',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 100}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 10, probability: 1}],
      consumes: null}) ],
    requiresLeader: false
  }),

  [BTY.LENTIL_FIELD]: new BuildingType({
    name: BTY.LENTIL_FIELD,
    description: 'Lentils grow in curly, bushy rows',
    category: BCA.FARMING,
    icon: {provider: 'FontAwesome5', name: 'seedling'},
    foregroundColor: '#59a500',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.EXACT, type: RTY.SEEDS, quantity: 10},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 100}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.LENTILS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 10}]}) ],
    requiresLeader: false
  }),

  [BTY.REED_DELTA]: new BuildingType({
    name: BTY.REED_DELTA,
    description: 'Reeds cluster along the muddy banks',
    category: BCA.FARMING,
    icon: {provider: 'MaterialCommunityIcons', name: 'reorder-vertical'},
    foregroundColor: '#59a500',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.EXACT, type: RTY.SEEDS, quantity: 10},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 10}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 5}]}) ],
    requiresLeader: false
  }),

  [BTY.GRAIN_FIELD]: new BuildingType({
    name: BTY.GRAIN_FIELD,
    description: 'If it\'s knee-cover by mid summer you know it\'s growing well',
    category: BCA.FARMING,
    icon: {provider: 'MaterialCommunityIcons', name: 'corn'},
    foregroundColor: '#d8be04',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.EXACT, type: RTY.SEEDS, quantity: 10},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 200}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 15}]}) ],
    requiresLeader: true
  }),

  [BTY.OLIVE_GROVE]: new BuildingType({
    name: BTY.OLIVE_GROVE,
    description: 'The lines of olive trees smell rich and sweet',
    category: BCA.FARMING,
    icon: {provider: 'FontAwesome', name: 'pagelines'},
    foregroundColor: '#97c701',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.EXACT, type: RTY.SEEDS, quantity: 10},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 300}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.OLIVES, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 20}]}) ],
    requiresLeader: true
  }),

  [BTY.QUAIL_PASTURE]: new BuildingType({
    name: BTY.QUAIL_PASTURE,
    description: 'Quail frolick around in the dawn and the dusk',
    category: BCA.FARMING,
    icon: {provider: 'FontAwesome5', name: 'kiwi-bird'},
    foregroundColor: '#caa096',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.EXACT, type: RTY.QUAIL, quantity: 10},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 40},
      {specificity: RSP.EXACT, type: RTY.CLAY_RED, quantity: 100}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.QUAIL, quantity: 2, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4},
        {specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 2}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.EGGS, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4},
        {specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 2}]}) ],
    requiresLeader: true
  }),

  [BTY.DRYING_YARD]: new BuildingType({
    name: BTY.DRYING_YARD,
    description: 'The pitiless sun is an ally, for once',
    category: BCA.MATERIAL_REFINED,
    icon: {provider: 'MaterialCommunityIcons', name: 'waves'},
    foregroundColor: '#ff0000',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 50}],
    recipes: [ new BuildingRecipe({index: 0, produces:
        [{specificity: RSP.EXACT, type: RTY.BRICKS_RED, quantity: 10, probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_RED, quantity: 10},
          {specificity: RSP.EXACT, type: RTY.THATCH, quantity: 1}]}),
      new BuildingRecipe({index: 1, produces:
        [{specificity: RSP.EXACT, type: RTY.THATCH, quantity: 10, probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 10}]}),
      new BuildingRecipe({index: 2, produces:
        [{specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 10, probability: 1}],
        consumes: [{specificity: RSP.EXACT, type: RTY.PULP, quantity: 10}]}) ],
    requiresLeader: true
  }),

  [BTY.PRESS]: new BuildingType({
    name: BTY.PRESS,
    description: 'Great slabs of brick groan as they press together',
    category: BCA.MATERIAL_REFINED,
    icon: {provider: 'MaterialCommunityIcons', name: 'inbox-multiple'},
    foregroundColor: '#795548',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 40},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 40}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.OLIVE_OIL, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.OLIVES, quantity: 10}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.PULP, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 10}]}) ],
    requiresLeader: true
  }),

  [BTY.FURNACE]: new BuildingType({
    name: BTY.FURNACE,
    description: 'At night the furnace glows red, and the air shimmers around it',
    category: BCA.MATERIAL_REFINED,
    icon: {provider: 'MaterialCommunityIcons', name: 'fireplace'},
    foregroundColor: '#b02727',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 100},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 20}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.GLASS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 10},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 80}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.RUST_ORE, quantity: 10},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 160}]}) ],
    requiresLeader: true
  }),

  [BTY.KITCHEN]: new BuildingType({
    name: BTY.KITCHEN,
    description: 'People are always hanging around outside, for some reason',
    category: BCA.ARTISAN_GOOD,
    icon: {provider: 'MaterialCommunityIcons', name: 'silverware-fork-knife'},
    foregroundColor: '#000',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 200},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 50},
      {specificity: RSP.EXACT, type: RTY.THATCH, quantity: 50}],
    recipes: null,
    requiresLeader: true
  })
};

export { buildingTypes }
