export default class Resource implements ResourceInterface {
  type: string = '';
  quality: number = 0;
  quantity: number = 0;
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
}

interface ResourceInterface {
  type: string;
  quality?: number;
  quantity?: number;
  name?: string;
  category?: string;
  subcategory?: string;
  tags?: string[];
  value?: number;
  icon?: {provider: string, name: string};
  foregroundColor?: string;
  backgroundColor?: string;
}
