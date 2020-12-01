import ResourceType from '../models/resource_type';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';

let resourceTypes: { [name: string] : ResourceType } = {};

resourceTypes[RESOURCE_TYPES.KNOWLEDGE] = new ResourceType({
  name: RESOURCE_TYPES.KNOWLEDGE,
  category: RESOURCE_CATEGORIES.ETHERIAL,
  tags: [RESOURCE_TAGS.MIND],
  value: null,
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

resourceTypes[RESOURCE_TYPES.WOOD_OAK] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_OAK,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION],
  value: 50,
  icon: {provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'},
  foregroundColor: '#790f0f',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.CLAY_RED] = new ResourceType({
  name: RESOURCE_TYPES.CLAY_RED,
  subcategory: RESOURCE_SUBCATEGORIES.CLAY,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION],
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
  tags: [],
  value: 3,
  icon: {provider: 'FontAwesome5', name: 'mountain'},
  foregroundColor: '#f9df00',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.GLASS] = new ResourceType({
  name: RESOURCE_TYPES.GLASS,
  subcategory: RESOURCE_SUBCATEGORIES.GLASS,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
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
  name: RESOURCE_TYPES.OLIVE_OIL,
  subcategory: RESOURCE_SUBCATEGORIES.OIL,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [],
  value: 250,
  icon: {provider: 'FontAwesome', name: 'certificate'},
  foregroundColor: '#e6dab8',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.PAPYRUS] = new ResourceType({
  name: RESOURCE_TYPES.OLIVE_OIL,
  subcategory: RESOURCE_SUBCATEGORIES.OIL,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [],
  value: 250,
  icon: {provider: 'FontAwesome5', name: 'newspaper'},
  foregroundColor: '#e6dab8',
  backgroundColor: '#fff'
});

export { resourceTypes }
