import Resource from './resource';

export default class Vault {
  resources: { [type: string] : Resource } = {};

  constructor(vault: VaultInterface) {
    Object.assign(this, vault);
  }

  // Add a quantity of one resource to the vault, creating a 0 quantity Resource in
  //  the resources map if one does not already exist. Return a resource representing
  //  an increase event if the amount of a resource has tripped the threshold,
  //  e.g. by going from 3.92 to 4.02
  increaseResource(r: {type: string, quantity: number}) {
    if (!this.resources[r.type]) {
      this.resources[r.type] = new Resource({type: r.type, quantity: 0});
    }
    const oldQuantity = Math.floor(this.resources[r.type].quantity);
    this.resources[r.type].quantity += r.quantity;
    let diff = Math.floor(this.resources[r.type].quantity) - oldQuantity;
    if (diff > 0) {
      return new Resource({type: r.type, quantity: diff})
    }
    return null;
  }

  // Remove a quanitity of one resource from the vault, creating a 0 quantity Resource in
  //  the resources map if one does not already exist. Return a resource representing
  //  a decrease event if the amount of a resource has tripped the threshold,
  //  e.g. by going from 1.01 to 0.98
  consumeResource(r: {type: string, quantity: number}) {
    if (!this.resources[r.type]) {
      this.resources[r.type] = new Resource({type: r.type, quantity: 0});
    }
    const oldQuantity = Math.floor(this.resources[r.type].quantity);
    this.resources[r.type].quantity -= r.quantity;
    if (this.resources[r.type].quantity == 0) {
      this.resources[r.type].quantity = 0;
    }
    let diff = Math.floor(this.resources[r.type].quantity) - oldQuantity;
    if (diff < 0) {
      return new Resource({type: r.type, quantity: diff})
    }
    return null;
  }
}

interface VaultInterface {
  resources: { [type: string] : Resource };
}
