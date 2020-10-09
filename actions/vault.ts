import Vault from '../models/vault';
import Resource from '../models/resource';

export const SET_RESOURCES = 'SET_RESOURCES';
export function consumeResource(vault: Vault, r: {type: string, quantity: number}) {
  vault.consumeResource(r);
  return {
    type: SET_RESOURCES,
    resources: [new Resource({
      type: r.type,
      quantity: vault.resources[r.type].quantity
    })]
  }
}

export function increaseResources(vault: Vault, rs: {type: string, quantity: number}[]) {
  let resources: Resource[] = []
  rs.map((r) => {
    vault.increaseResource(r);
    resources.push(new Resource({
      type: r.type,
      quantity: vault.resources[r.type].quantity
    }));
  });
  return {
    type: SET_RESOURCES,
    resources: resources
  }
}
