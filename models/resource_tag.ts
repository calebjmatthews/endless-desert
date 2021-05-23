import Icon from './icon';

export default class ResourceTag {
  name: string = '';
  extract: boolean = false;
  value: number|null = null;
  icon: Icon = new Icon({provider: '', name: ''});

  constructor(resourceTag: ResourceTag) {
    Object.assign(this, resourceTag);
  }
}
