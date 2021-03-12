import Vault from '../models/vault';
import Resource from '../models/resource';

export const SET_VAULT = 'SET_VAULT';
export function setVault(vault: Vault) {
  return {
    type: SET_VAULT,
    vault: vault
  }
}

export const SET_RESOURCES = 'SET_RESOURCES';
export function consumeResources(vault: Vault, rs: Resource[]) {
  let resources: Resource[] = []
  rs.map((r) => {
    vault.consumeResource(r);
    resources.push(new Resource({
      type: r.type,
      quality: r.quality,
      quantity: vault.resources[r.type + '|' + r.quality].quantity
    }));
  });
  return {
    type: SET_RESOURCES,
    resources: resources
  }
}

export function increaseResources(vault: Vault, rs: Resource[]) {
  let resources: Resource[] = []
  rs.map((r) => {
    vault.increaseResource(r);
    resources.push(new Resource({
      type: r.type,
      quality: r.quality,
      quantity: vault.resources[r.type + '|' + r.quality].quantity
    }));
  });
  return {
    type: SET_RESOURCES,
    resources: resources
  }
}

export const SET_LAST_TIMESTAMP = 'SET_LAST_TIMESTAMP';
export function setLastTimestamp(timestamp: number) {
  return {
    type: SET_LAST_TIMESTAMP,
    timestamp: timestamp
  }
}
