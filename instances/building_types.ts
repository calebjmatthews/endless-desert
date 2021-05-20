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
import { EQUIPMENT_TYPES } from '../enums/equipment_types';
const EQT = EQUIPMENT_TYPES;

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
    upgradesInto: BTY.CISTERN,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 10, probability: 1}],
      consumes: null}) ],
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
    upgradesInto: BTY.STUDY,
    recipes: null
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
    upgradesInto: BTY.HUTS,
    recipes: null
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
    upgradesInto: BTY.LENTIL_FIELD,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.LENTILS, quantity: 1, probability: 1}],
      consumes: null}) ],
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
    upgradesInto: BTY.MARKET,
    recipes: null
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
    upgradeCost: [{specificity: RSP.EXACT, type: RTY.THATCH, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 5000}],
    upgradesInto: BTY.CLAY_PIT_QUALITY,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.CLAY_RED, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 10}]}) ],
    requiresLeader: false
  }),

  [BTY.CLAY_PIT_QUALITY]: new BuildingType({
    name: BTY.CLAY_PIT_QUALITY,
    description: 'Extra water and time produce the best possible clay',
    category: BCA.MATERIAL,
    icon: {provider: 'FontAwesome5', name: 'splotch'},
    foregroundColor: '#a91f1f',
    backgroundColor: '#fff',
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.CLAY_RED, quantity: 20, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 20}]}) ],
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
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 400}],
    upgradesInto: BTY.SAND_PIT_RAPID,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 10, probability: 1}],
      consumes: null}) ],
    requiresLeader: false
  }),

  [BTY.SAND_PIT_RAPID]: new BuildingType({
    name: BTY.SAND_PIT_RAPID,
    description: ('Reinforced with brick and thatch to allow faster sand extraction'),
    category: BCA.MATERIAL,
    icon: {provider: 'FontAwesome5', name: 'mountain'},
    foregroundColor: '#f9df00',
    backgroundColor: '#fff',
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 40, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.THATCH, quantity: 1}]}) ],
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
    upgradeCost: [{specificity: RSP.EXACT, type: RTY.SEEDS, quantity: 4},
      {specificity: RSP.EXACT, type: RTY.WATER, quantity: 20}],
    upgradesInto: BTY.LENTIL_FIELD_HEARTY,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.LENTILS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 10}]}) ],
    requiresLeader: false
  }),

  [BTY.LENTIL_FIELD_HEARTY]: new BuildingType({
    name: BTY.LENTIL_FIELD_HEARTY,
    description: 'Lentils grow in curly, bushy rows',
    category: BCA.FARMING,
    icon: {provider: 'FontAwesome5', name: 'seedling'},
    foregroundColor: '#59a500',
    backgroundColor: '#fff',
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.LENTILS, quantity: 16, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4}]}) ],
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

  [BTY.OX_PASTURE]: new BuildingType({
    name: BTY.OX_PASTURE,
    description: 'Ox cover themselves in mud at the river\'s edge',
    category: BCA.FARMING,
    icon: {provider: 'MaterialCommunityIcons', name: 'cow'},
    foregroundColor: '#4a0e0e',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.EXACT, type: RTY.OXEN, quantity: 10},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.CLAY_RED, quantity: 500}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.OXEN, quantity: 1, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4},
        {specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 4}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.MILK, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 4},
        {specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 4}]}) ],
    requiresLeader: true
  }),

  [BTY.HERB_GARDEN]: new BuildingType({
    name: BTY.HERB_GARDEN,
    description: 'The smell is fantastic: spicy, biting, and wild',
    category: BCA.FARMING,
    icon: {provider: 'FontAwesome5', name: 'leaf'},
    foregroundColor: '#ec5107',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.EXACT, type: RTY.SEEDS, quantity: 200},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.CLAY_RED, quantity: 1000}],
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
    requiresLeader: true
  }),

  [BTY.HOUSES]: new BuildingType({
    name: BTY.HOUSES,
    description: 'Beautiful wooden homes with glass windows and rambling pathways '
      + 'running between them',
    category: BCA.HOUSING,
    icon: {provider: 'FontAwesome5', name: 'home'},
    foregroundColor: '#795548',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 300},
      {specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 800},
      {specificity: RSP.SUBCATEGORY, type: RSC.GLASS, quantity: 200}],
    recipes: null,
    livingHappiness: 20
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
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 200},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 200}],
    upgradesInto: BTY.PRESS_SIMPLIFIED,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.PULP, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 10}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.OLIVE_OIL, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.OLIVES, quantity: 10}]}), ],
    requiresLeader: true
  }),

  [BTY.PRESS_SIMPLIFIED]: new BuildingType({
    name: BTY.PRESS_SIMPLIFIED,
    description: 'Great slabs of brick groan as they press together',
    category: BCA.MATERIAL_REFINED,
    icon: {provider: 'MaterialCommunityIcons', name: 'inbox-multiple'},
    foregroundColor: '#795548',
    backgroundColor: '#fff',
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.PULP, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 10}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.OLIVE_OIL, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.OLIVES, quantity: 10}]}), ],
    requiresLeader: false
  }),

  [BTY.GRINDING_MILL]: new BuildingType({
    name: BTY.GRINDING_MILL,
    description: 'The mill-blades can be seen from across town, spinning in the wind',
    category: BCA.MATERIAL_REFINED,
    icon: {provider: 'FontAwesome', name: 'gears'},
    foregroundColor: '#705ea7',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 30},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 30},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 20}],
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 200},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 280}],
    upgradesInto: BTY.GRINDING_MILL_SIMPLIFIED,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.FLOUR, quantity: 40, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 40}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.IRON_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 20, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.RUST_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.COPPER_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 20, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GREENISH_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 3, produces:
      [{specificity: RSP.EXACT, type: RTY.TIN_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 20, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.DUSTY_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 4, produces:
      [{specificity: RSP.EXACT, type: RTY.ZINC_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 10, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SULFUR, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.PALE_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 5, produces:
      [{specificity: RSP.EXACT, type: RTY.CARBON, quantity: 40, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 40}]}),
    new BuildingRecipe({index: 6, produces:
      [{specificity: RSP.EXACT, type: RTY.ABRASIVE, quantity: 40, probability: 1}],
      consumes: [{specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 40}]})],
    requiresLeader: true
  }),

  [BTY.GRINDING_MILL_SIMPLIFIED]: new BuildingType({
    name: BTY.GRINDING_MILL_SIMPLIFIED,
    description: 'The mill-blades can be seen from across town, spinning in the wind',
    category: BCA.MATERIAL_REFINED,
    icon: {provider: 'FontAwesome', name: 'gears'},
    foregroundColor: '#705ea7',
    backgroundColor: '#fff',
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.FLOUR, quantity: 40, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 40}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.IRON_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 20, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.RUST_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.COPPER_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 20, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GREENISH_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 3, produces:
      [{specificity: RSP.EXACT, type: RTY.TIN_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 20, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.DUSTY_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 4, produces:
      [{specificity: RSP.EXACT, type: RTY.ZINC_POWDER, quantity: 20, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 10, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SULFUR, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.PALE_ORE, quantity: 40}]}),
    new BuildingRecipe({index: 5, produces:
      [{specificity: RSP.EXACT, type: RTY.CARBON, quantity: 40, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 40}]}),
    new BuildingRecipe({index: 6, produces:
      [{specificity: RSP.EXACT, type: RTY.ABRASIVE, quantity: 40, probability: 1}],
      consumes: [{specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 40}]})],
    requiresLeader: false
  }),

  [BTY.WEAVERY]: new BuildingType({
    name: BTY.WEAVERY,
    description: 'Clicking, whirring, and the murmur of soft voices',
    category: BCA.MATERIAL_REFINED,
    icon: {provider: 'MaterialCommunityIcons', name: 'ship-wheel'},
    foregroundColor: '#9c27b0',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 400},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 50}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.LINEN, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.THATCH, quantity: 20}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.SILK, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SILKWORM_COCOON, quantity: 20},
        {specificity: RSP.EXACT, type: RTY.WATER, quantity: 20}]}) ],
    requiresLeader: false
  }),

  [BTY.TAILORS]: new BuildingType({
    name: BTY.TAILORS,
    description: 'Robes and cloaks a lined in display cases, behind shining windows',
    category: BCA.ARTISAN_GOOD,
    icon: {provider: 'FontAwesome5', name: 'tshirt'},
    foregroundColor: '#afc1ec',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 600},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 200},
      {specificity: RSP.SUBCATEGORY, type: RSC.GLASS, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 50}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: EQT.SIMPLE_ROBE + " (Unmarked)",
        quantity: 0.1, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.LINEN, quantity: 2}]}) ],
    requiresLeader: true
  }),

  [BTY.OUTFITTERS]: new BuildingType({
    name: BTY.OUTFITTERS,
    description: 'Straps, gourds, cases, and bags of all kinds hang from the walls',
    category: BCA.ARTISAN_GOOD,
    icon: {provider: 'MaterialCommunityIcons', name: 'toolbox'},
    foregroundColor: '#1a457b',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 300},
      {specificity: RSP.SUBCATEGORY, type: RSC.GLASS, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.BRASS, quantity: 20}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: EQT.JOURNEYMANS_HAVERSACK + " (Unmarked)",
        quantity: 0.05, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.LINEN, quantity: 1}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: EQT.JOURNEYMANS_GEARBAG + " (Unmarked)",
        quantity: 0.05, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.LINEN, quantity: 1}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: EQT.JOURNEYMANS_TOOLPACK + " (Unmarked)",
        quantity: 0.05, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.LINEN, quantity: 1}]}) ],
    requiresLeader: true
  }),

  [BTY.FABRICATORY]: new BuildingType({
    name: BTY.FABRICATORY,
    description: 'The acrid tang of hot metal hangs outside the wide doors',
    category: BCA.ARTISAN_GOOD,
    icon: {provider: 'FontAwesome5', name: 'tools'},
    foregroundColor: '#6d6d6d',
    backgroundColor: '#fff',
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
      [{specificity: RSP.EXACT, type: EQT.COARSE_IMPLEMENTS + " (Unmarked)",
        quantity: 0.05, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 2}]}) ],
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
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 200},
      {specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.INK_FERROUS, quantity: 5}],
    upgradesInto: BTY.DRYING_YARD_SIMPLIFIED,
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

  [BTY.DRYING_YARD_SIMPLIFIED]: new BuildingType({
    name: BTY.DRYING_YARD_SIMPLIFIED,
    description: 'The pitiless sun is an ally, for once',
    category: BCA.MATERIAL_REFINED,
    icon: {provider: 'MaterialCommunityIcons', name: 'waves'},
    foregroundColor: '#ff0000',
    backgroundColor: '#fff',
    cost: null,
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
    requiresLeader: false
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
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 400},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 200}],
    upgradesInto: BTY.FURNACE_SIMPLIFIED,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 10},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 10}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.GLASS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 10},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 80}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 2, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 8, probability: 1}],
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
    requiresLeader: true
  }),

  [BTY.FURNACE_SIMPLIFIED]: new BuildingType({
    name: BTY.FURNACE_SIMPLIFIED,
    description: 'At night the furnace glows red, and the air shimmers around it',
    category: BCA.MATERIAL_REFINED,
    icon: {provider: 'MaterialCommunityIcons', name: 'fireplace'},
    foregroundColor: '#b02727',
    backgroundColor: '#fff',
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
      consumes: [{specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 10},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 80}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 2, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 8, probability: 1}],
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
    requiresLeader: false
  }),

  [BTY.FURNACE_BLAST]: new BuildingType({
    name: BTY.FURNACE_BLAST,
    description: 'At night the furnace glows red, and the air shimmers around it',
    category: BCA.MATERIAL_REFINED,
    icon: {provider: 'MaterialCommunityIcons', name: 'fireplace'},
    foregroundColor: '#b02727',
    backgroundColor: '#fff',
    cost: null,
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 10},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 10}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.GLASS, quantity: 10, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 10},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 80}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 2, probability: 1},
        {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 8, probability: 1}],
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
    requiresLeader: false
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
    upgradeCost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 400},
      {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 100},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 100}],
    upgradesInto: BTY.KITCHEN_BOUNTIFUL,
    recipes: null,
    requiresLeader: true
  }),

  [BTY.KITCHEN_BOUNTIFUL]: new BuildingType({
    name: BTY.KITCHEN_BOUNTIFUL,
    description: 'People are always hanging around outside, for some reason',
    category: BCA.ARTISAN_GOOD,
    icon: {provider: 'MaterialCommunityIcons', name: 'silverware-fork-knife'},
    foregroundColor: '#000',
    backgroundColor: '#fff',
    cost: null,
    recipes: null,
    requiresLeader: true
  }),

  [BTY.GLASSWORKS]: new BuildingType({
    name: BTY.GLASSWORKS,
    description: 'Glittering pieces of failed past works have been pressed '
      + 'into the walls',
    category: BCA.ARTISAN_GOOD,
    icon: {provider: 'FontAwesome5', name: 'solar-panel'},
    foregroundColor: '#33cee2',
    backgroundColor: '#fff',
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
      [{specificity: RSP.EXACT, type: RTY.LENSES, quantity: 1, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.GLASS, quantity: 10},
        {specificity: RSP.EXACT, type: RTY.ABRASIVE, quantity: 10}]}) ],
    requiresLeader: true
  }),

  [BTY.LABORATORY]: new BuildingType({
    name: BTY.LABORATORY,
    description: 'A shining manifestation of deep knowledge',
    category: BCA.ARTISAN_GOOD,
    icon: {provider: 'MaterialCommunityIcons', name: 'flask'},
    foregroundColor: '#33cee2',
    backgroundColor: '#fff',
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
        {specificity: RSP.EXACT, type: RTY.ACID, quantity: 1}]}) ],
    requiresLeader: true
  }),

  [BTY.POTTERY_KILN]: new BuildingType({
    name: BTY.POTTERY_KILN,
    description: 'The smell of wet clay and the whirring of wheels',
    category: BCA.ARTISAN_GOOD,
    icon: {provider: 'FontAwesome5', name: 'glass-whiskey'},
    foregroundColor: '#942c14',
    backgroundColor: '#fff',
    cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 300},
      {specificity: RSP.EXACT, type: RTY.CRUDE_IRON, quantity: 180},
      {specificity: RSP.EXACT, type: RTY.BRONZE, quantity: 60}],
    recipes: [ new BuildingRecipe({index: 0, produces:
      [{specificity: RSP.EXACT, type: RTY.TERRACOTTA, quantity: 6, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_RED, quantity: 6},
        {specificity: RSP.EXACT, type: RTY.WATER, quantity: 2},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 20}]}),
    new BuildingRecipe({index: 1, produces:
      [{specificity: RSP.EXACT, type: RTY.FAIENCE, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_RED, quantity: 4},
        {specificity: RSP.EXACT, type: RTY.GLAZE_TIN, quantity: 2},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 40}]}),
    new BuildingRecipe({index: 2, produces:
      [{specificity: RSP.EXACT, type: RTY.ASHWARE, quantity: 4, probability: 1}],
      consumes: [{specificity: RSP.EXACT, type: RTY.CLAY_RED, quantity: 4},
        {specificity: RSP.EXACT, type: RTY.GLAZE_ASH, quantity: 2},
        {specificity: RSP.TAG, type: RTA.FUEL, quantity: 40}]}) ],
    requiresLeader: true
  }),

  [BTY.BREWERY]: new BuildingType({
    name: BTY.BREWERY,
    description: 'Large wooden or copper vats, shielded from the sun and air',
    category: BCA.ARTISAN_GOOD,
    icon: {provider: 'MaterialCommunityIcons', name: 'glass-mug-variant'},
    foregroundColor: '#e8cf1e',
    backgroundColor: '#fff',
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
    requiresLeader: true
  }),
};

export { buildingTypes }
