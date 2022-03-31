import ResourceType from './resource_type';
import Icon from './icon';

export default class Resource implements ResourceInterface {
  type: string = '';
  quality: number = 0;
  quantity: number = 0;
  id?: string;
  name?: string;
  category?: string;
  subcategory?: string;
  tags?: string[];
  value?: number;
  icon?: Icon;

  constructor(resource: ResourceInterface|number|null, key?: string) {
    if (resource !== null && typeof resource !== 'number') {
      if (resource.quality == undefined) { resource.quality = 0; }
      Object.assign(this, resource);
    }
    else if (typeof resource === 'number' && key) {
      Object.assign(this, {
        type: key.split('|')[0],
        quality: parseInt(key.split('|')[1]),
        quantity: resource
      });
    }
  }

  getResourceWithoutQuantity() {
    return new Resource({
      type: this.type,
      quality: this.quality,
      quantity: 0,
      id: this.id,
      name: this.name,
      category: this.category,
      subcategory: this.subcategory,
      tags: (this.tags) ? [...this.tags] : [],
      value: this.value,
      icon: this.icon
    })
  }

  toResourceType(resourceTypes: { [typeName: string] : ResourceType }): ResourceType {
    if (this.id) {
      return new ResourceType({
        name: this.type,
        displayName: this.name,
        category: this.category || '',
        subcategory: this.subcategory,
        tags: this.tags || [],
        value: this.value || 0,
        icon: (this.icon) ? new Icon(this.icon) : new Icon(null)
      });
    }
    return new ResourceType(resourceTypes[this.type]);
  }

  export() {
    if (this.id) { return this; }
    return this.quantity;
  }
}

interface ResourceInterface {
  type: string;
  quality: number;
  quantity: number;
  id?: string;
  name?: string;
  category?: string;
  subcategory?: string;
  tags?: string[];
  value?: number;
  icon?: Icon;
}
