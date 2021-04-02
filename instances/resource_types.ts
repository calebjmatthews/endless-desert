import ResourceType from '../models/resource_type';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
import { EQUIPMENT_TYPES } from '../enums/equipment_types';
import { EQUIPMENT_SLOTS } from '../enums/equipment_slots';

let resourceTypes: { [name: string] : ResourceType } = {};

resourceTypes[RESOURCE_TYPES.KNOWLEDGE] = new ResourceType({
  name: RESOURCE_TYPES.KNOWLEDGE,
  category: RESOURCE_CATEGORIES.ETHERIAL,
  tags: [RESOURCE_TAGS.MIND],
  value: 1,
  icon: {provider: 'FontAwesome5', name: 'graduation-cap'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WATER] = new ResourceType({
  name: RESOURCE_TYPES.WATER,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.LIQUID, RESOURCE_TAGS.DRINK, RESOURCE_TAGS.INGREDIENT],
  value: 5,
  icon: {provider: 'FontAwesome5', name: 'water'},
  foregroundColor: '#2196f3',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.LENTILS] = new ResourceType({
  name: RESOURCE_TYPES.LENTILS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT, RESOURCE_TAGS.FOOD, RESOURCE_TAGS.INGREDIENT],
  value: 10,
  icon: {provider: 'FontAwesome5', name: 'seedling'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.SEEDS] = new ResourceType({
  name: RESOURCE_TYPES.SEEDS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT, RESOURCE_TAGS.INGREDIENT],
  value: 40,
  icon: {provider: 'MaterialCommunityIcons', name: 'seed'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.REEDS] = new ResourceType({
  name: RESOURCE_TYPES.REEDS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT, RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.FUEL],
  value: 8,
  icon: {provider: 'MaterialCommunityIcons', name: 'reorder-vertical'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.GRAIN] = new ResourceType({
  name: RESOURCE_TYPES.GRAIN,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT, RESOURCE_TAGS.INGREDIENT],
  value: 15,
  icon: {provider: 'MaterialCommunityIcons', name: 'corn'},
  foregroundColor: '#d8be04',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.OLIVES] = new ResourceType({
  name: RESOURCE_TYPES.OLIVES,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT],
  value: 25,
  icon: {provider: 'FontAwesome', name: 'pagelines'},
  foregroundColor: '#97c701',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.QUAIL] = new ResourceType({
  name: RESOURCE_TYPES.QUAIL,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.ANIMAL, RESOURCE_TAGS.INGREDIENT],
  value: 200,
  icon: {provider: 'FontAwesome5', name: 'kiwi-bird'},
  foregroundColor: '#caa096',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.EGGS] = new ResourceType({
  name: RESOURCE_TYPES.EGGS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.ANIMAL_PRODUCT, RESOURCE_TAGS.INGREDIENT],
  value: 80,
  icon: {provider: 'MaterialCommunityIcons', name: 'egg'},
  foregroundColor: '#000',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.WOOD_OAK] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_OAK,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.BITTER],
  value: 50,
  icon: {provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'},
  foregroundColor: '#790f0f',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WOOD_ROWAN] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_ROWAN,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.HERBAL],
  value: 50,
  icon: {provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'},
  foregroundColor: '#95a53c',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WOOD_WALNUT] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_WALNUT,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.SOUR],
  value: 50,
  icon: {provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'},
  foregroundColor: '#927150',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WOOD_ALDER] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_ALDER,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.SPICY],
  value: 50,
  icon: {provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'},
  foregroundColor: '#a5104e',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WOOD_MAPLE] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_MAPLE,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.SWEET],
  value: 50,
  icon: {provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'},
  foregroundColor: '#d2734f',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WOOD_WILLOW] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_WILLOW,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.BRACKISH],
  value: 50,
  icon: {provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'},
  foregroundColor: '#e87b7b',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WOOD_ASH] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_ASH,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.SAVORY],
  value: 50,
  icon: {provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'},
  foregroundColor: '#ffcd8f',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WOOD_SPRUCE] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_SPRUCE,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.COOLING],
  value: 50,
  icon: {provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'},
  foregroundColor: '#633c02',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.CLAY_RED] = new ResourceType({
  name: RESOURCE_TYPES.CLAY_RED,
  subcategory: RESOURCE_SUBCATEGORIES.CLAY,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 15,
  icon: {provider: 'FontAwesome5', name: 'splotch'},
  foregroundColor: '#a91f1f',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.BRICKS_RED] = new ResourceType({
  name: RESOURCE_TYPES.BRICKS_RED,
  subcategory: RESOURCE_SUBCATEGORIES.BRICK,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [RESOURCE_TAGS.CONSTRUCTION],
  value: 80,
  icon: {provider: 'FontAwesome', name: 'cubes'},
  foregroundColor: '#a91f1f',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.THATCH] = new ResourceType({
  name: RESOURCE_TYPES.THATCH,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [RESOURCE_TAGS.CONSTRUCTION],
  value: 40,
  icon: {provider: 'MaterialCommunityIcons', name: 'pound-box'},
  foregroundColor: '#ceb903',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.SAND_YELLOW] = new ResourceType({
  name: RESOURCE_TYPES.SAND_YELLOW,
  subcategory: RESOURCE_SUBCATEGORIES.SAND,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 3,
  icon: {provider: 'FontAwesome5', name: 'mountain'},
  foregroundColor: '#f9df00',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.RUST_ORE] = new ResourceType({
  name: RESOURCE_TYPES.RUST_ORE,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 200,
  icon: {provider: 'MaterialCommunityIcons', name: 'circle-slice-8'},
  foregroundColor: '#a02d01',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.CRUDE_IRON] = new ResourceType({
  name: RESOURCE_TYPES.CRUDE_IRON,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 300,
  icon: {provider: 'FontAwesome5', name: 'bars'},
  foregroundColor: '#a02d01',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.SALT] = new ResourceType({
  name: RESOURCE_TYPES.SALT,
  subcategory: RESOURCE_SUBCATEGORIES.SPICE,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.BRACKISH, RESOURCE_TAGS.SPICE],
  value: 20,
  icon: {provider: 'FontAwesome5', name: 'wine-bottle'},
  foregroundColor: '#000',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.GLASS] = new ResourceType({
  name: RESOURCE_TYPES.GLASS,
  subcategory: RESOURCE_SUBCATEGORIES.GLASS,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [RESOURCE_TAGS.CONSTRUCTION],
  value: 120,
  icon: {provider: 'FontAwesome5', name: 'solar-panel'},
  foregroundColor: '#33cee2',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.OLIVE_OIL] = new ResourceType({
  name: RESOURCE_TYPES.OLIVE_OIL,
  subcategory: RESOURCE_SUBCATEGORIES.OIL,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.SPICE],
  value: 250,
  icon: {provider: 'FontAwesome5', name: 'oil-can'},
  foregroundColor: '#97c701',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.PULP] = new ResourceType({
  name: RESOURCE_TYPES.PULP,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 50,
  icon: {provider: 'FontAwesome', name: 'certificate'},
  foregroundColor: '#e6dab8',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.PAPYRUS] = new ResourceType({
  name: RESOURCE_TYPES.PAPYRUS,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 150,
  icon: {provider: 'FontAwesome5', name: 'newspaper'},
  foregroundColor: '#e6dab8',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.MILK] = new ResourceType({
  name: RESOURCE_TYPES.MILK,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.ANIMAL_PRODUCT, RESOURCE_TAGS.INGREDIENT],
  value: 300,
  icon: {provider: 'MaterialCommunityIcons', name: 'pail-outline'},
  foregroundColor: '#756f63',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.SOUP] = new ResourceType({
  name: RESOURCE_TYPES.SOUP,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: {provider: 'MaterialCommunityIcons', name: 'pot'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.OMELET] = new ResourceType({
  name: RESOURCE_TYPES.OMELET,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: {provider: 'MaterialCommunityIcons', name: 'egg'},
  foregroundColor: '#ffeb38',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.STEW] = new ResourceType({
  name: RESOURCE_TYPES.STEW,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: {provider: 'MaterialCommunityIcons', name: 'pot-mix'},
  foregroundColor: '#795548',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.PIE] = new ResourceType({
  name: RESOURCE_TYPES.PIE,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: {provider: 'FontAwesome5', name: 'chart-pie'},
  foregroundColor: '#673ab7',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.CAKE] = new ResourceType({
  name: RESOURCE_TYPES.CAKE,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: {provider: 'FontAwesome5', name: 'birthday-cake'},
  foregroundColor: '#e493a1',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.BREAD] = new ResourceType({
  name: RESOURCE_TYPES.BREAD,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.FOOD],
  value: 200,
  icon: {provider: 'MaterialCommunityIcons', name: 'baguette'},
  foregroundColor: '#790f0f',
  backgroundColor: '#fff'
});

resourceTypes[(EQUIPMENT_TYPES.ROUGH_MATTOCK + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.ROUGH_MATTOCK + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 4000,
  icon: {provider: 'MaterialCommunityIcons', name: 'pickaxe'},
  foregroundColor: '#6d6d6d',
  backgroundColor: '#fff'
});

resourceTypes[(EQUIPMENT_TYPES.WOODEN_POLE + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.WOODEN_POLE + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 4000,
  icon: {provider: 'FontAwesome5', name: 'slash'},
  foregroundColor: '#795548',
  backgroundColor: '#fff'
});

resourceTypes[(EQUIPMENT_TYPES.COARSE_IMPLEMENTS + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.COARSE_IMPLEMENTS + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 4000,
  icon: {provider: 'FontAwesome5', name: 'tools'},
  foregroundColor: '#6d6d6d',
  backgroundColor: '#fff'
});

resourceTypes[(EQUIPMENT_TYPES.SIMPLE_ROBE + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.SIMPLE_ROBE + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.CLOTHING],
  value: 2000,
  icon: {provider: 'FontAwesome5', name: 'tshirt'},
  foregroundColor: '#afc1ec',
  backgroundColor: '#fff'
});

resourceTypes[(EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK + ' (Unmarked)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 3000,
  icon: {provider: 'FontAwesome5', name: 'box'},
  foregroundColor: '#1a7b1d',
  backgroundColor: '#fff'
});

resourceTypes[(EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG + ' (Unmarked)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 3000,
  icon: {provider: 'MaterialCommunityIcons', name: 'toolbox'},
  foregroundColor: '#1a457b',
  backgroundColor: '#fff'
});

resourceTypes[(EQUIPMENT_TYPES.JOURNEYMANS_KITPACK + ' (Unmarked)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.JOURNEYMANS_KITPACK + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 3000,
  icon: {provider: 'FontAwesome5', name: 'toolbox'},
  foregroundColor: '#7a1a7b',
  backgroundColor: '#fff'
});

export { resourceTypes }
