import Resource from './resource';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';

export default class Vault {
  lastTimestamp: number = new Date(Date.now()).valueOf();
  resources: { [typeQuality: string] : Resource } = {};

  constructor(vault: VaultInterface) {
    Object.assign(this, vault);
    let newResources: { [typeQuality: string] : Resource } = {};
    Object.keys(vault.resources).map((key) => {
      this.resources[key] = vault.resources[key];
    })
  }

  // Add a quantity of one resource to the vault, creating a 0 quantity Resource in
  //  the resources map if one does not already exist. Return a resource representing
  //  an increase event if the amount of a resource has tripped the threshold,
  //  e.g. by going from 3.92 to 4.02
  increaseResource(r: Resource) {
    const key = (r.type + '|' + r.quality);
    if (!this.resources[key]) {
      this.resources[key] =
        new Resource({type: r.type, quality: r.quality, quantity: 0});
    }
    const oldQuantity = Math.floor(this.resources[key].quantity);
    this.resources[key].quantity += r.quantity;
    let diff = Math.floor(this.resources[key].quantity) - oldQuantity;
    if (diff > 0) {
      return new Resource({type: r.type, quality: r.quality, quantity: diff});
    }
    return null;
  }

  // Remove a quanitity of one resource from the vault, creating a 0 quantity Resource in
  //  the resources map if one does not already exist. Return a resource representing
  //  a decrease event if the amount of a resource has tripped the threshold,
  //  e.g. by going from 1.01 to 0.98
  consumeResource(r: Resource) {
    const key = (r.type + '|' + r.quality);
    if (!this.resources[key]) {
      this.resources[key] = new Resource({type: r.type, quality: r.quality,
        quantity: 0});
    }
    const oldQuantity = Math.floor(this.resources[key].quantity);
    this.resources[key].quantity -= r.quantity;
    if (this.resources[key].quantity < 0) {
      this.resources[key].quantity = 0;
    }
    let diff = Math.floor(this.resources[key].quantity) - oldQuantity;
    if (diff < 0) {
      return new Resource({type: r.type, quality: r.quality, quantity: diff})
    }
    return null;
  }

  getQuantity(specificity: string, type: string, qualityMin: number = 0,
    qualityMax: number = 2) {
    switch(specificity) {
      case RESOURCE_SPECIFICITY.EXACT:
      return this.getTypeQuantity(type, qualityMin, qualityMax);

      case RESOURCE_SPECIFICITY.TAG:
      return this.getTagQuantity(type, qualityMin, qualityMax);

      case RESOURCE_SPECIFICITY.SUBCATEGORY:
      return this.getSubcategoryQuantity(type, qualityMin, qualityMax);

      case RESOURCE_SPECIFICITY.CATEGORY:
      return this.getCategoryQuantity(type, qualityMin, qualityMax);

      default:
      return this.getTypeQuantity(type, qualityMin, qualityMax);
    }
  }

  getTypeQuantity(typeName: string, qualityMin: number, qualityMax: number) {
    let quantity = 0;
    utils.range(qualityMin, qualityMax).map((quality) => {
      const key = (typeName + '|' + quality);
      if (this.resources[key]) {
        quantity += this.resources[key].quantity;
      }
    })

    return quantity;
  }

  getTagQuantity(tagName: string, qualityMin: number, qualityMax: number) {
    let quantity = 0;
    Object.keys(this.resources).map((typeQuality) => {
      const resource = this.resources[typeQuality];
      const resourceType = utils.getResourceType(resource);
      if (resourceType.tags.includes(tagName)
        && resource.quality >= qualityMin && resource.quality <= qualityMax) {
        quantity += this.resources[typeQuality].quantity;
      }
    });
    return quantity;
  }

  getSubcategoryQuantity(subcatName: string, qualityMin: number, qualityMax: number) {
    let quantity = 0;
    Object.keys(this.resources).map((typeQuality) => {
      const resource = this.resources[typeQuality];
      const resourceType = utils.getResourceType(resource);
      if (resourceType.subcategory == subcatName
        && resource.quality >= qualityMin && resource.quality <= qualityMax) {
        quantity += this.resources[typeQuality].quantity;
      }
    });
    return quantity;
  }

  getCategoryQuantity(catName: string, qualityMin: number, qualityMax: number) {
    let quantity = 0;
    Object.keys(this.resources).map((typeQuality) => {
      const resource = this.resources[typeQuality];
      const resourceType = utils.getResourceType(resource);
      if (resourceType.category == catName
        && resource.quality >= qualityMin && resource.quality <= qualityMax) {
        quantity += this.resources[typeQuality].quantity;
      }
    });
    return quantity;
  }

  getExactResources(resourceName: string) {
    let resources: Resource[] = [];
    utils.range(0, 2).map((quality) => {
      const key = (resourceName + '|' + quality);
      if (this.resources[key]) {
        resources.push(this.resources[key]);
      }
    })
    return resources;
  }

  getTagResources(tagName: string) {
    let resources: Resource[] = [];
    Object.keys(this.resources).map((typeQuality) => {
      const resource = this.resources[typeQuality];
      const resourceType = utils.getResourceType(resource);
      if (resourceType.tags.includes(tagName)) {
        resources.push(this.resources[typeQuality]);
      }
    });
    return resources;
  }

  getSubcategoryResources(subcatName: string) {
    let resources: Resource[] = [];
    Object.keys(this.resources).map((typeQuality) => {
      const resource = this.resources[typeQuality];
      const resourceType = utils.getResourceType(resource);
      if (resourceType.subcategory == subcatName) {
        resources.push(this.resources[typeQuality]);
      }
    });
    return resources;
  }

  getCategoryResources(catName: string) {
    let resources: Resource[] = [];
    Object.keys(this.resources).map((typeQuality) => {
      const resource = this.resources[typeQuality];
      const resourceType = utils.getResourceType(resource);
      if (resourceType.category == catName) {
        resources.push(this.resources[typeQuality]);
      }
    });
    return resources;
  }

  getValuedResources() {
    let resources: Resource[] = [];
    Object.keys(this.resources).map((typeQuality) => {
      const resource = this.resources[typeQuality];
      const resourceType = utils.getResourceType(resource);
      if (resourceType.value != null
        && this.resources[typeQuality].quantity >= 1) {
        resources.push(this.resources[typeQuality]);
      }
    });
    return resources;
  }

  checkForEmptying(rs: Resource[]) {
    let emptiedTQs: string[] = [];
    rs.map((r) => {
      const key = r.type + '|' + r.quality;
      if (this.resources[key]) {
        if (this.resources[key].quantity < r.quantity) {
          emptiedTQs.push(key);
        }
      }
    });
    return emptiedTQs;
  }
}

interface VaultInterface {
  lastTimestamp: number;
  resources: { [typeQuality: string] : Resource };
}
