export default class Resource {
  type: string = '';
  quantity: number = 0;

  constructor(resource: Resource) {
    Object.assign(this, resource);
  }
}
