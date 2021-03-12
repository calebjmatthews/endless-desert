import BuildingCategory from '../models/building_category';
import { BUILDING_CATEGORIES } from '../enums/building_categories';

let buildingCategories: { [name: string] : BuildingCategory } = {};

buildingCategories[BUILDING_CATEGORIES.GENERAL] = new BuildingCategory({
  name: BUILDING_CATEGORIES.GENERAL,
  order: 0,
  icon: {provider: 'FontAwesome5', name: 'archway'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff'
});

buildingCategories[BUILDING_CATEGORIES.HOUSING] = new BuildingCategory({
  name: BUILDING_CATEGORIES.HOUSING,
  order: 1,
  icon: {provider: 'FontAwesome5', name: 'home'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff'
});

buildingCategories[BUILDING_CATEGORIES.MATERIAL] = new BuildingCategory({
  name: BUILDING_CATEGORIES.MATERIAL,
  order: 2,
  icon: {provider: 'FontAwesome', name: 'cube'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff'
});

buildingCategories[BUILDING_CATEGORIES.FARMING] = new BuildingCategory({
  name: BUILDING_CATEGORIES.FARMING,
  order: 3,
  icon: {provider: 'MaterialCommunityIcons', name: 'silverware-fork'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff'
});

buildingCategories[BUILDING_CATEGORIES.MATERIAL_REFINED] = new BuildingCategory({
  name: BUILDING_CATEGORIES.MATERIAL_REFINED,
  order: 4,
  icon: {provider: 'FontAwesome5', name: 'coins'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff'
});

buildingCategories[BUILDING_CATEGORIES.ARTISAN_GOOD] = new BuildingCategory({
  name: BUILDING_CATEGORIES.ARTISAN_GOOD,
  order: 5,
  icon: {provider: 'MaterialCommunityIcons', name: 'bottle-wine'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff'
});

buildingCategories[BUILDING_CATEGORIES.EQUIPMENT] = new BuildingCategory({
  name: BUILDING_CATEGORIES.EQUIPMENT,
  order: 6,
  icon: {provider: 'FontAwesome5', name: 'tshirt'},
  foregroundColor: '#000',
  backgroundColor: '#fff'
});

export { buildingCategories }
