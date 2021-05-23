import Icon from './icon';

export default class ResourceCategory {
  name: string = '';
  value: number|null = null;
  order: number = 0;
  icon: Icon = new Icon({provider: '', name: ''});

  constructor(resourceCategory: ResourceCategory) {
    Object.assign(this, resourceCategory);
  }
}
