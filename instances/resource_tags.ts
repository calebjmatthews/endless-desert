import ResourceTag from '../models/resource_tag';
import { RESOURCE_TAGS } from '../enums/resource_tags';

let resourceTags: { [name: string] : ResourceTag } = {};

resourceTags[RESOURCE_TAGS.CONSTRUCTION] = new ResourceTag({
  name: RESOURCE_TAGS.CONSTRUCTION,
  value: 5,
  extract: false,
  icon: {provider: 'FontAwesome5', name: 'hammer'},
  foregroundColor: '#8a4949',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.DRINK] = new ResourceTag({
  name: RESOURCE_TAGS.DRINK,
  value: 5,
  extract: false,
  icon: {provider: 'MaterialIcons', name: 'local-drink'},
  foregroundColor: '#03a9f4',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.FOOD] = new ResourceTag({
  name: RESOURCE_TAGS.FOOD,
  value: 5,
  extract: false,
  icon: {provider: 'MaterialCommunityIcons', name: 'food-apple'},
  foregroundColor: '#f44336',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.LIQUID] = new ResourceTag({
  name: RESOURCE_TAGS.LIQUID,
  value: 5,
  extract: false,
  icon: {provider: 'Entypo', name: 'drop'},
  foregroundColor: '#3f51b5',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.MIND] = new ResourceTag({
  name: RESOURCE_TAGS.MIND,
  value: 5,
  extract: false,
  icon: {provider: 'MaterialCommunityIcons', name: 'brain'},
  foregroundColor: '#b10101',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.PLANT] = new ResourceTag({
  name: RESOURCE_TAGS.PLANT,
  value: 5,
  extract: false,
  icon: {provider: 'MaterialCommunityIcons', name: 'sprout'},
  foregroundColor: '#008000',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.EARTH] = new ResourceTag({
  name: RESOURCE_TAGS.EARTH,
  value: 5,
  extract: false,
  icon: {provider: 'FontAwesome5', name: 'globe-africa'},
  foregroundColor: '#986127',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.SAVORY] = new ResourceTag({
  name: RESOURCE_TAGS.SAVORY,
  value: 5,
  extract: true,
  icon: {provider: 'MaterialCommunityIcons', name: 'food-drumstick'},
  foregroundColor: '#ca8826',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.SWEET] = new ResourceTag({
  name: RESOURCE_TAGS.SWEET,
  value: 5,
  extract: true,
  icon: {provider: 'FontAwesome5', name: 'cubes'},
  foregroundColor: '#ff7373',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.BITTER] = new ResourceTag({
  name: RESOURCE_TAGS.BITTER,
  value: 5,
  extract: true,
  icon: {provider: 'FontAwesome5', name: 'times-circle'},
  foregroundColor: '#7b27b0',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.SOUR] = new ResourceTag({
  name: RESOURCE_TAGS.SOUR,
  value: 5,
  extract: true,
  icon: {provider: 'FontAwesome5', name: 'lemon'},
  foregroundColor: '#ffeb3b',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.BRACKISH] = new ResourceTag({
  name: RESOURCE_TAGS.BRACKISH,
  value: 5,
  extract: true,
  icon: {provider: 'FontAwesome5', name: 'water'},
  foregroundColor: '#3f51b5',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.SPICY] = new ResourceTag({
  name: RESOURCE_TAGS.SPICY,
  value: 5,
  extract: true,
  icon: {provider: 'FontAwesome5', name: 'pepper-hot'},
  foregroundColor: '#ff2222',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.COOLING] = new ResourceTag({
  name: RESOURCE_TAGS.COOLING,
  value: 5,
  extract: true,
  icon: {provider: 'FontAwesome5', name: 'snowflake'},
  foregroundColor: '#83d8ff',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.HERBAL] = new ResourceTag({
  name: RESOURCE_TAGS.HERBAL,
  value: 5,
  extract: true,
  icon: {provider: 'FontAwesome5', name: 'leaf'},
  foregroundColor: '#4caf50',
  backgroundColor: '#fff'
});

export { resourceTags }
