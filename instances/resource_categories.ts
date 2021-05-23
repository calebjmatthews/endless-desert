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

resourceCategories[RESOURCE_CATEGORIES.MATERIAL] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.MATERIAL,
  value: 5,
  order: 1,
  icon: new Icon({provider: 'FontAwesome', name: 'cube',
    color: '#2b2b2d'})
});

resourceCategories[RESOURCE_CATEGORIES.MATERIAL_REFINED] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  value: 40,
  order: 2,
  icon: new Icon({provider: 'FontAwesome5', name: 'coins',
    color: '#2b2b2d'})
});

resourceCategories[RESOURCE_CATEGORIES.ARTISAN_GOOD] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  value: 200,
  order: 3,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'bottle-wine',
    color: '#2b2b2d'})
});

resourceCategories[RESOURCE_CATEGORIES.DISH] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.DISH,
  value: 20,
  order: 4,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'silverware-fork-knife',
    color: '#2b2b2d'})
});

resourceCategories[RESOURCE_CATEGORIES.EQUIPMENT] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.EQUIPMENT,
  value: 2000,
  order: 5,
  icon: new Icon({provider: 'FontAwesome5', name: 'tshirt',
    color: '#000'})
});

export { resourceCategories }
