import ResourceSubcategory from '../models/resource_subcategory';
import Icon from '../models/icon';
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';

let resourceSubcategories: { [name: string] : ResourceSubcategory } = {};

resourceSubcategories[RESOURCE_SUBCATEGORIES.WOOD] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.WOOD,
  value: 50,
  order: 0,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant',
    color: '#790f0f'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.CLAY] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.CLAY,
  value: 15,
  order: 1,
  icon: new Icon({provider: 'FontAwesome5', name: 'splotch',
    color: '#a91f1f'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.BRICK] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.BRICK,
  value: 80,
  order: 2,
  icon: new Icon({provider: 'FontAwesome', name: 'cubes',
    color: '#a91f1f'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.SAND] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.SAND,
  value: 3,
  order: 3,
  icon: new Icon({provider: 'FontAwesome5', name: 'mountain',
    color: '#f9df00'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.OIL] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.OIL,
  value: 100,
  order: 4,
  icon: new Icon({provider: 'FontAwesome5', name: 'oil-can',
    color: '#000'}),
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.GLASS] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.GLASS,
  value: 120,
  order: 5,
  icon: new Icon({provider: 'FontAwesome5', name: 'solar-panel',
    color: '#33cee2'})
});

export { resourceSubcategories };
