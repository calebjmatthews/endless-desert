import ResourceTag from '../models/resource_tag';
import { RESOURCE_TAGS } from '../enums/resource_tags';

let resourceTags: { [name: string] : ResourceTag } = {};

resourceTags[RESOURCE_TAGS.CONSTRUCTION] = new ResourceTag({
  name: RESOURCE_TAGS.CONSTRUCTION,
  icon: {provider: 'FontAwesome5', name: 'hammer'},
  foregroundColor: '#8a4949',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.DRINK] = new ResourceTag({
  name: RESOURCE_TAGS.DRINK,
  icon: {provider: 'MaterialIcons', name: 'local-drink'},
  foregroundColor: '#03a9f4',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.FOOD] = new ResourceTag({
  name: RESOURCE_TAGS.FOOD,
  icon: {provider: 'MaterialCommunityIcons', name: 'food-apple'},
  foregroundColor: '#f44336',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.LIQUID] = new ResourceTag({
  name: RESOURCE_TAGS.LIQUID,
  icon: {provider: 'Entypo', name: 'drop'},
  foregroundColor: '#3f51b5',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.MIND] = new ResourceTag({
  name: RESOURCE_TAGS.MIND,
  icon: {provider: 'MaterialCommunityIcons', name: 'brain'},
  foregroundColor: '#b10101',
  backgroundColor: '#fff'
});

resourceTags[RESOURCE_TAGS.PLANT] = new ResourceTag({
  name: RESOURCE_TAGS.PLANT,
  icon: {provider: 'MaterialCommunityIcons', name: 'sprout'},
  foregroundColor: '#008000',
  backgroundColor: '#fff'
});

export { resourceTags }
