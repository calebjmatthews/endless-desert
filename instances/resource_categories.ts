import ResourceCategory from '../models/resource_category';
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';

let resourceCategories: { [name: string] : ResourceCategory } = {};

resourceCategories[RESOURCE_CATEGORIES.ETHERIAL] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.ETHERIAL,
  icon: {provider: 'FontAwesome5', name: 'wind'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff'
});

resourceCategories[RESOURCE_CATEGORIES.MATERIAL] = new ResourceCategory({
  name: RESOURCE_CATEGORIES.MATERIAL,
  icon: {provider: 'FontAwesome', name: 'cube'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff'
});

export { resourceCategories }
