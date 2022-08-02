import ResourceCategory from '../models/resource_category';
import Icon from '../models/icon';
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';

let resourceCategories: { [name: string] : ResourceCategory } = {};

resourceCategories[RESOURCE_CATEGORIES.ETHERIAL] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.ETHERIAL,
  value: 1,
  order: 0,
  icon: new Icon({provider: 'FontAwesome5', name: 'wind',
    color: '#2b2b2d'})
});

resourceCategories[RESOURCE_CATEGORIES.FIELD_NOTES] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.FIELD_NOTES,
  value: 10000,
  order: 1,
  icon: new Icon({provider: 'FontAwesome', name: 'book',
    color: '#2b2b2d'}),
});

resourceCategories[RESOURCE_CATEGORIES.MATERIAL] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.MATERIAL,
  value: 5,
  order: 2,
  icon: new Icon({provider: 'FontAwesome', name: 'cube',
    color: '#2b2b2d'})
});

resourceCategories[RESOURCE_CATEGORIES.MATERIAL_REFINED] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  value: 40,
  order: 3,
  icon: new Icon({provider: 'FontAwesome5', name: 'coins',
    color: '#2b2b2d'})
});

resourceCategories[RESOURCE_CATEGORIES.ARTISAN_GOOD] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  value: 200,
  order: 4,
  icon: new Icon({provider: 'FontAwesome5', name: 'wine-bottle',
    color: '#2b2b2d'})
});

resourceCategories[RESOURCE_CATEGORIES.DISH] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.DISH,
  value: 20,
  order: 5,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'silverware-fork-knife',
    color: '#2b2b2d'})
});

resourceCategories[RESOURCE_CATEGORIES.IMPLEMENT] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.IMPLEMENT,
  value: 200,
  order: 6,
  icon: new Icon({provider: 'FontAwesome', name: 'gear', color: '#2b2b2d'})
});

resourceCategories[RESOURCE_CATEGORIES.EQUIPMENT] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.EQUIPMENT,
  value: 2000,
  order: 7,
  icon: new Icon({provider: 'FontAwesome5', name: 'tools', color: '#2b2b2d'})
});

resourceCategories[RESOURCE_CATEGORIES.TREASURE] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.TREASURE,
  value: 20000,
  order: 8,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'treasure-chest', color: '#2b2b2d'})
});

resourceCategories[RESOURCE_CATEGORIES.SPECIAL] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.SPECIAL,
  value: 10000,
  order: 9,
  icon: new Icon({provider: 'FontAwesome5', name: 'star', color: '#2b2b2d'})
});

export { resourceCategories }
