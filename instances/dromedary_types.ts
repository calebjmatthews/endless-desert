import DromedaryType from '../models/dromedary_type';
import { RESOURCE_TYPES } from '../enums/resource_types';

const dromedaryTypes: { [typeName: string] : DromedaryType } = {
  [RESOURCE_TYPES.DROMEDARY_PLAINS] : new DromedaryType({
    typeName: RESOURCE_TYPES.DROMEDARY_PLAINS,
    speed: 1,
    capacity: 100
  }),
  [RESOURCE_TYPES.DROMEDARY_HILL] : new DromedaryType({
    typeName: RESOURCE_TYPES.DROMEDARY_HILL,
    speed: 2,
    capacity: 40
  }),
  [RESOURCE_TYPES.DROMEDARY_RIVERINE] : new DromedaryType({
    typeName: RESOURCE_TYPES.DROMEDARY_RIVERINE,
    speed: 0.4,
    capacity: 200
  }),
};

export { dromedaryTypes };