export default class Resource {
  type: string = '';
  quality: number = 0;
  quantity: number = 0;

  constructor(resource: Resource) {
    Object.assign(this, resource);
  }
}
