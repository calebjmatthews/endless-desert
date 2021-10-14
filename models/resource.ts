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
  icon?: {provider: string, name: string};
  foregroundColor?: string;
  backgroundColor?: string;

  constructor(resource: ResourceInterface) {
    if (resource.quality == undefined) { resource.quality = 0; }
    Object.assign(this, resource);
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
      icon: this.icon,
      foregroundColor: this.foregroundColor,
      backgroundColor: this.backgroundColor
    })
  }

  toResourceType(resourceTypes: { [typeName: string] : ResourceType }): ResourceType {
    if (this.id) {
      return new ResourceType({
        name: this.type,
        category: this.category || '',
        subcategory: this.subcategory,
        tags: this.tags || [],
        value: this.value || 0,
        icon: (this.icon) ? new Icon(this.icon) : new Icon(null),
        foregroundColor: this.foregroundColor,
        backgroundColor: this.backgroundColor
      });
    }
    return new ResourceType(resourceTypes[this.type]);
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
  icon?: {provider: string, name: string};
  foregroundColor?: string;
  backgroundColor?: string;
}
