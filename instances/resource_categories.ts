import ResourceCategory from '../models/resource_category';
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';

let resourceCategories: { [name: string] : ResourceCategory } = {};

resourceCategories[RESOURCE_CATEGORIES.ETHERIAL] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.ETHERIAL,
  value: 1,
  icon: {provider: 'FontAwesome5', name: 'wind'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff'
});

resourceCategories[RESOURCE_CATEGORIES.MATERIAL] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.MATERIAL,
  value: 5,
  icon: {provider: 'FontAwesome', name: 'cube'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff'
});

resourceCategories[RESOURCE_CATEGORIES.MATERIAL_REFINED] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  value: 40,
  icon: {provider: 'FontAwesome5', name: 'coins'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff'
});

resourceCategories[RESOURCE_CATEGORIES.ARTISAN_GOOD] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  value: 200,
  icon: {provider: 'MaterialCommunityIcons', name: 'bottle-wine'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff'
});

export { resourceCategories }
