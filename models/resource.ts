export default class Resource {
  type: string = '';
  quality: number = 0;
  quantity: number = 0;
  name?: string;
  value?: number;

  constructor(resource: Resource) {
    Object.assign(this, resource);
  }
}
