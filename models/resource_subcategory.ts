export default class ResourceSubcategory {
  name: string = '';
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';

  constructor(resourceSubcategory: ResourceSubcategory) {
    Object.assign(this, resourceSubcategory);
  }
}
