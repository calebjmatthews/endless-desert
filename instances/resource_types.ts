import ResourceType from '../models/resource_type';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
import { RESOURCE_TAGS } from '../enums/resource_tags';

let resourceTypes: { [name: string] : ResourceType } = {};

resourceTypes[RESOURCE_TYPES.KNOWLEDGE] = new ResourceType({
  name: RESOURCE_TYPES.KNOWLEDGE,
  category: RESOURCE_CATEGORIES.ETHERIAL,
  tags: [RESOURCE_TAGS.MIND],
  icon: {provider: 'FontAwesome5', name: 'graduation-cap'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WATER] = new ResourceType({
  name: RESOURCE_TYPES.WATER,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.LIQUID, RESOURCE_TAGS.DRINK],
  icon: {provider: 'FontAwesome5', name: 'water'},
  foregroundColor: '#2196f3',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.LENTILS] = new ResourceType({
  name: RESOURCE_TYPES.LENTILS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT, RESOURCE_TAGS.FOOD],
  icon: {provider: 'FontAwesome', name: 'pagelines'},
  foregroundColor: '#76c716',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.SEEDS] = new ResourceType({
  name: RESOURCE_TYPES.SEEDS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT],
  icon: {provider: 'MaterialCommunityIcons', name: 'seed'},
  foregroundColor: '#76c716',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.REEDS] = new ResourceType({
  name: RESOURCE_TYPES.REEDS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT, RESOURCE_TAGS.CONSTRUCTION],
  icon: {provider: 'MaterialCommunityIcons', name: 'reorder-vertical'},
  foregroundColor: '#76c716',
  backgroundColor: '#fff',
});

export { resourceTypes }
