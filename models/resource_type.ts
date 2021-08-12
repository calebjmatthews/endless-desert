import Icon from './icon';

export default class ResourceType {
  name: string = '';
  category: string = '';
  subcategory?: string|null = null;
  tags: string[] = [];
  value: number = 0;
  icon: Icon = new Icon({provider: '', name: ''});
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';

  constructor(resourceType: ResourceTypeInterface) {
    if (!resourceType.foregroundColor) { resourceType.foregroundColor = '#000'; }
    if (!resourceType.backgroundColor) { resourceType.backgroundColor = '#fff'; }
    Object.assign(this, resourceType);
  }

  // 5, 10, 25, 80, 200, 700, 4K, 12K, 28K, 86K, 140K, 400K, 890K
  // 1,  2,  5, 11,
  getFoodOrDrinkHappinessValue() {
    let value = this.value;
    let happiness = 0;

    happiness += Math.floor(this.value / 5);  // Max of 5
    value -= 25;
    if (value < 0) { return happiness; }

    happiness += Math.floor(this.value / 10); // Max of 7.5
    value -= 75;
    if (value < 0) { return happiness; }

    happiness += Math.floor(this.value / 20); // Max of 10
    value -= 200;
    if (value < 0) { return happiness; }

    happiness += Math.floor(this.value / 40); // Max of 12.5
    value -= 500;
    if (value < 0) { return happiness; }

    happiness += Math.floor(this.value / 150); // Max of 13.3
    value -= 2000;
    if (value < 0) { return happiness; }

    happiness += Math.floor(this.value / 550); // Max of 14.5
    value -= 8000;
    if (value < 0) { return happiness; }

    happiness += Math.floor(this.value / 10000);
    return happiness;
  }
}

interface ResourceTypeInterface {
  name: string;
  category: string;
  subcategory?: string|null;
  tags: string[];
  value: number;
  icon: Icon;
  foregroundColor?: string;
  backgroundColor?: string;
}
