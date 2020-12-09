export default class ResourceCategory {
  name: string = '';
  value: number|null = null;
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';

  constructor(resourceCategory: ResourceCategory) {
    Object.assign(this, resourceCategory);
  }
}
