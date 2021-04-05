export default class Resource implements ResourceInterface {
  type: string = '';
  quality: number = 0;
  quantity: number = 0;
  id?: string|undefined;
  name?: string|undefined;
  category?: string|undefined;
  subcategory?: string|undefined;
  tags?: string[]|undefined;
  value?: number|undefined;
  icon?: {provider: string, name: string}|undefined;
  foregroundColor?: string|undefined;
  backgroundColor?: string|undefined;

  constructor(resource: ResourceInterface) {
    if (resource.quality == undefined) { resource.quality = 0; }
    Object.assign(this, resource);
  }

  getResourceWithoutQuantity() {
    let tags = undefined;
    if (this.tags) { tags = this.tags.slice(); }
    return new Resource({
      type: this.type,
      quality: this.quality,
      quantity: 0,
      id: this.id,
      name: this.name,
      category: this.category,
      subcategory: this.subcategory,
      tags: tags,
      value: this.value,
      icon: this.icon,
      foregroundColor: this.foregroundColor,
      backgroundColor: this.backgroundColor
    })
  }
}

interface ResourceInterface {
  type: string;
  quality: number;
  quantity: number;
  id?: string|undefined;
  name?: string;
  category?: string;
  subcategory?: string;
  tags?: string[];
  value?: number;
  icon?: {provider: string, name: string};
  foregroundColor?: string;
  backgroundColor?: string;
}
