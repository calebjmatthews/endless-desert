import Icon from './icon';

export default class ResourceType {
  name: string = '';
  displayName?: string;
  category: string = '';
  subcategory?: string|null = null;
  tags: string[] = [];
  value: number = 0;
  description?: string;
  icon: Icon = new Icon({provider: '', name: ''});

  constructor(resourceType: ResourceTypeInterface) {
    Object.assign(this, resourceType);
  }

  // 5, 10, 25, 80, 200, 700, 4K, 12K, 28K, 86K, 140K, 400K, 890K
  // 1,  2,  5, 11,
  getFoodOrDrinkHappinessValue() {
    let value = this.value;
    let happiness = 0;

    if (value <= 25) { // Max of 5
      return Math.floor((happiness + (value / 5)));
    }
    happiness += 5; value -= 25;

    if (value <= 75) { // Max of 7.5
      return Math.floor((happiness + (value / 10)));
    }
    happiness += 7.5; value -= 75;

    if (value <= 200) { // Max of 10
      return Math.floor((happiness + (value / 20)));
    }
    happiness += 10; value -= 200;

    if (value <= 500) { // Max of 12.5
      return Math.floor((happiness + (value / 40)));
    }
    happiness += 12.5; value -= 500;

    if (value <= 2000) { // Max of 13.3
      return Math.floor((happiness + (value / 150)));
    }
    happiness += 13.3; value -= 2000;

    if (value <= 8000) { // Max of 14.5
      return Math.floor((happiness + (value / 550)));
    }
    happiness += 14.5; value -= 8000;

    return Math.floor((happiness + (value / 10000)));
  }
}

interface ResourceTypeInterface {
  name: string;
  displayName?: string;
  category: string;
  subcategory?: string|null;
  tags: string[];
  value: number;
  description?: string;
  icon: Icon;
}
