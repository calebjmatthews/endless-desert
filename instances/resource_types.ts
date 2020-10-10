import ResourceType from '../models/resource_type';
import { RESOURCE_TYPES } from '../enums/resource_types';

let resourceTypes: { [name: string] : ResourceType } = {};

resourceTypes[RESOURCE_TYPES.KNOWLEDGE] = new ResourceType({
  name: RESOURCE_TYPES.KNOWLEDGE,
  icon: {provider: 'FontAwesome5', name: 'graduation-cap'}
});

resourceTypes[RESOURCE_TYPES.WATER] = new ResourceType({
  name: RESOURCE_TYPES.WATER,
  icon: {provider: 'FontAwesome5', name: 'water'}
});

resourceTypes[RESOURCE_TYPES.LENTILS] = new ResourceType({
  name: RESOURCE_TYPES.LENTILS,
  icon: {provider: 'FontAwesome', name: 'pagelines'}
});

export { resourceTypes }
