export default class BuildingCategory {
  name: string = '';
  order: number = 0;
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';

  constructor(buildingCategory: BuildingCategory) {
    Object.assign(this, buildingCategory);
  }
}
