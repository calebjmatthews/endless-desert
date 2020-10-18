import Resource from './resource';
import { resourceTypes } from '../instances/resource_types';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';

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

  getQuantity(specificity: string, type: string) {
    switch(specificity) {
      case RESOURCE_SPECIFICITY.EXACT:
      return this.getTypeQuantity(type);

      case RESOURCE_SPECIFICITY.TAG:
      return this.getTagQuantity(type);

      case RESOURCE_SPECIFICITY.CATEGORY:
      return this.getCategoryQuantity(type);

      default:
      return this.getTypeQuantity(type);
    }
  }

  getTypeQuantity(name: string) {
    return this.resources[name].quantity;
  }

  getTagQuantity(tagName: string) {
    let quantity = 0;
    Object.keys(this.resources).map((resourceName) => {
      if (resourceTypes[resourceName].tags.includes(tagName)) {
        quantity += this.resources[resourceName].quantity;
      }
    });
    return quantity;
  }

  getCategoryQuantity(catName: string) {
    let quantity = 0;
    Object.keys(this.resources).map((resourceName) => {
      if (resourceTypes[resourceName].category == catName) {
        quantity += this.resources[resourceName].quantity;
      }
    });
    return quantity;
  }
}

interface VaultInterface {
  resources: { [type: string] : Resource };
}
