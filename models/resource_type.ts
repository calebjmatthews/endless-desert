export default class ResourceType {
  name: string = '';
  category: string = '';
  tags: string[] = [];
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';

  constructor(resourceType: ResourceType) {
    Object.assign(this, resourceType);
  }
}
