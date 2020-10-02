export default class ResourceType {
  name: string = '';

  constructor(resourceType: ResourceType) {
    Object.assign(this, resourceType);
  }
}
