export default class ResourceType {
  name: string = '';
  icon: {provider: string, name: string} = {provider: '', name: ''};

  constructor(resourceType: ResourceType) {
    Object.assign(this, resourceType);
  }
}
