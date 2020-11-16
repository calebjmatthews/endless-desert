import Vault from '../models/vault';
import Resource from '../models/resource';
import { RESOURCE_TYPES } from '../enums/resource_types';

let vaultStarting = new Vault({ resources: {} });

vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.KNOWLEDGE,
  quantity: 100
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.SEEDS,
  quantity: 22
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.WATER,
  quantity: 3923
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.LENTILS,
  quantity: 51
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.WOOD_OAK,
  quantity: 12
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.SAND_YELLOW,
  quantity: 287
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.CLAY_RED,
  quantity: 17
}));

export { vaultStarting };
