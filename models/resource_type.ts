export default class ResourceType {
  name: string = '';
  category: string = '';
  tags: string[] = [];
  value: number|null = null;
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';

  constructor(resourceType: ResourceType) {
    Object.assign(this, resourceType);
  }
}
