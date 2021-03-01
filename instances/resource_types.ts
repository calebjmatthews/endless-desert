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
  tags: [RESOURCE_TAGS.LIQUID, RESOURCE_TAGS.DRINK],
  value: 5,
  icon: {provider: 'FontAwesome5', name: 'water'},
  foregroundColor: '#2196f3',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.LENTILS] = new ResourceType({
  name: RESOURCE_TYPES.LENTILS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT, RESOURCE_TAGS.FOOD],
  value: 10,
  icon: {provider: 'FontAwesome5', name: 'seedling'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.SEEDS] = new ResourceType({
  name: RESOURCE_TYPES.SEEDS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT],
  value: 40,
  icon: {provider: 'MaterialCommunityIcons', name: 'seed'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.REEDS] = new ResourceType({
  name: RESOURCE_TYPES.REEDS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT, RESOURCE_TAGS.CONSTRUCTION],
  value: 8,
  icon: {provider: 'MaterialCommunityIcons', name: 'reorder-vertical'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.GRAIN] = new ResourceType({
  name: RESOURCE_TYPES.GRAIN,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT],
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
  tags: [RESOURCE_TAGS.ANIMAL],
  value: 200,
  icon: {provider: 'FontAwesome5', name: 'kiwi-bird'},
  foregroundColor: '#caa096',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.EGGS] = new ResourceType({
  name: RESOURCE_TYPES.EGGS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.ANIMAL_PRODUCT],
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

resourceTypes[RESOURCE_TYPES.SALT] = new ResourceType({
  name: RESOURCE_TYPES.SALT,
  subcategory: RESOURCE_SUBCATEGORIES.SPICE,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.BRACKISH],
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
  tags: [],
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

resourceTypes[RESOURCE_TYPES.LENTIL_SOUP] = new ResourceType({
  name: RESOURCE_TYPES.LENTIL_SOUP,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: {provider: 'MaterialCommunityIcons', name: 'pot'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff'
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

resourceTypes[(EQUIPMENT_TYPES.SIMPLE_ROBE + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.SIMPLE_ROBE + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.CLOTHING],
  value: 2000,
  icon: {provider: 'FontAwesome5', name: 'tshirt'},
  foregroundColor: '#afc1ec',
  backgroundColor: '#fff'
});

export { resourceTypes }
