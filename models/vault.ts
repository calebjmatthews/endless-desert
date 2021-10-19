import Resource from './resource';
import { CategoryBranch } from './category_branch';
import { resourceTypes } from '../instances/resource_types';
import { resourceCategories } from '../instances/resource_categories';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { STUDY_CATEGORY_BLACKLIST, STUDY_TAG_BLACKLIST } from '../constants';

export default class Vault {
  lastTimestamp: number = new Date(Date.now()).valueOf();
  resources: { [typeQuality: string] : Resource } = {};

  constructor(vault: VaultInterface|null) {
    if (vault) {
      Object.assign(this, vault);
      let newResources: { [typeQuality: string] : Resource } = {};
      Object.keys(vault.resources).map((key) => {
        this.resources[key] = vault.resources[key];
      })
    }
  }

  // Add a quantity of one resource to the vault, creating a 0 quantity Resource in
  //  the resources map if one does not already exist. Return a resource representing
  //  an increase event if the amount of a resource has tripped the threshold,
  //  e.g. by going from 3.92 to 4.02
  increaseResource(r: Resource) {
    const key = (r.type + '|' + r.quality);
    if (!this.resources[key]) {
      this.resources[key] = new Resource(r).getResourceWithoutQuantity();
    }
    const oldQuantity = Math.floor(this.resources[key].quantity);
    this.resources[key].quantity += r.quantity;
    let diff = Math.floor(this.resources[key].quantity) - oldQuantity;
    if (diff > 0) {
      let nResource = new Resource(r).getResourceWithoutQuantity();
      nResource.quantity = diff;
      return nResource;
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
      this.resources[key] = new Resource(r).getResourceWithoutQuantity();;
    }
    const oldQuantity = Math.floor(this.resources[key].quantity);
    this.resources[key].quantity -= r.quantity;
    if (this.resources[key].quantity < 0) {
      this.resources[key].quantity = 0;
    }
    let diff = Math.floor(this.resources[key].quantity) - oldQuantity;
    if (diff < 0) {
      let nResource = new Resource(r).getResourceWithoutQuantity();
      nResource.quantity = diff;
      return nResource;
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

  getStudyableResources() {
    let resources: Resource[] = [];
    Object.keys(this.resources).map((typeQuality) => {
      const resource = this.resources[typeQuality];
      const resourceType = utils.getResourceType(resource);
      if (!resourceType) {
        console.log('typeQuality');
        console.log(typeQuality);
        console.log('this');
        console.log(this);
      }
      if (this.resources[typeQuality].quantity >= 1
        && !utils.arrayIncludes(STUDY_CATEGORY_BLACKLIST, resourceType.category)) {
        let tagBlacklisted = false;
        resourceType.tags.map((tag) => {
          if (utils.arrayIncludes(STUDY_TAG_BLACKLIST, tag)) {
            tagBlacklisted = true;
          }
        });
        if (!tagBlacklisted) { resources.push(this.resources[typeQuality]); }
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

  getCategoryTree(resourcesArray: Resource[]) {
    let catTree: { [catName: string] : CategoryBranch } = {};
    Object.keys(resourceCategories).map((categoryName) => {
      catTree[categoryName] = { ...resourceCategories[categoryName], resources: [] };
    });
    resourcesArray = utils.resourcesSort(resourcesArray);
    resourcesArray.map((resource) => {
      if (resource.category) {
        catTree[resource.category].resources.push(resource);
      }
      else {
        const resourceType = resourceTypes[resource.type];
        catTree[resourceType.category].resources.push(resource);
      }
    });
    return catTree;
  }
}

interface VaultInterface {
  lastTimestamp: number;
  resources: { [typeQuality: string] : Resource };
}
