import Icon from './icon';

export default class BuildingCategory {
  name: string = '';
  order: number = 0;
  icon: Icon = new Icon({provider: '', name: ''});

  constructor(buildingCategory: BuildingCategory) {
    Object.assign(this, buildingCategory);
  }
}
