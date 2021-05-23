import Icon from './icon';

export default class ResourceSubcategory {
  name: string = '';
  value: number|null = null;
  order: number = 0;
  icon: Icon = new Icon({provider: '', name: ''});

  constructor(resourceSubcategory: ResourceSubcategory) {
    Object.assign(this, resourceSubcategory);
  }
}
