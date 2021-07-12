import Vault from '../models/vault';
import Resource from '../models/resource';
import { RESOURCE_TYPES } from '../enums/resource_types';

let vaultStarting = new Vault({ resources: {},
  lastTimestamp: new Date(Date.now()).valueOf() });

vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.KNOWLEDGE,
  quality: 0,
  quantity: 100
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.SEEDS,
  quality: 0,
  quantity: 22
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.WATER,
  quality: 0,
  quantity: 8
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.LENTILS,
  quality: 0,
  quantity: 51
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.WOOD_OAK,
  quality: 0,
  quantity: 32
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.SAND_YELLOW,
  quality: 0,
  quantity: 217
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.CLAY_RED,
  quality: 0,
  quantity: 37
}));

export { vaultStarting };
