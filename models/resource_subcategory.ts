export default class ResourceSubcategory {
  name: string = '';
  value: number|null = null;
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';

  constructor(resourceSubcategory: ResourceSubcategory) {
    Object.assign(this, resourceSubcategory);
  }
}
