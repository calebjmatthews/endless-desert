import Vault from '../models/vault';
import Resource from '../models/resource';
import { RESOURCE_TYPES } from '../enums/resource_types';

let vaultStarting = new Vault({ resources: {} });
// vaultStarting.increaseResource(new Resource({
//   type: RESOURCE_TYPES.KNOWLEDGE,
//   quantity: 10
// }));
// vaultStarting.increaseResource(new Resource({
//   type: RESOURCE_TYPES.SEEDS,
//   quantity: 20
// }));

vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.KNOWLEDGE,
  quantity: 10000
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.SEEDS,
  quantity: 500
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.WATER,
  quantity: 10000
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.LENTILS,
  quantity: 1000
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.WOOD_OAK,
  quantity: 500
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.SAND_YELLOW,
  quantity: 100
}));
vaultStarting.increaseResource(new Resource({
  type: RESOURCE_TYPES.CLAY_RED,
  quantity: 100
}));

export { vaultStarting };
