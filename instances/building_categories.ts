import BuildingCategory from '../models/building_category';
import Icon from '../models/icon';
import { BUILDING_CATEGORIES } from '../enums/building_categories';

let buildingCategories: { [name: string] : BuildingCategory } = {};

buildingCategories[BUILDING_CATEGORIES.GENERAL] = new BuildingCategory({
  name: BUILDING_CATEGORIES.GENERAL,
  order: 0,
  icon: new Icon({provider: 'FontAwesome5', name: 'archway', color: '#2b2b2d'})
});

buildingCategories[BUILDING_CATEGORIES.HOUSING] = new BuildingCategory({
  name: BUILDING_CATEGORIES.HOUSING,
  order: 1,
  icon: new Icon({provider: 'FontAwesome5', name: 'home', color: '#2b2b2d'})
});

buildingCategories[BUILDING_CATEGORIES.MATERIAL] = new BuildingCategory({
  name: BUILDING_CATEGORIES.MATERIAL,
  order: 2,
  icon: new Icon({provider: 'FontAwesome', name: 'cube', color: '#2b2b2d'})
});

buildingCategories[BUILDING_CATEGORIES.FARMING] = new BuildingCategory({
  name: BUILDING_CATEGORIES.FARMING,
  order: 3,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'silverware-fork', color: '#2b2b2d'})
});

buildingCategories[BUILDING_CATEGORIES.MATERIAL_REFINED] = new BuildingCategory({
  name: BUILDING_CATEGORIES.MATERIAL_REFINED,
  order: 4,
  icon: new Icon({provider: 'FontAwesome5', name: 'coins', color: '#2b2b2d'})
});

buildingCategories[BUILDING_CATEGORIES.ARTISAN_GOOD] = new BuildingCategory({
  name: BUILDING_CATEGORIES.ARTISAN_GOOD,
  order: 5,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'bottle-wine', color: '#2b2b2d'})
});

buildingCategories[BUILDING_CATEGORIES.EQUIPMENT] = new BuildingCategory({
  name: BUILDING_CATEGORIES.EQUIPMENT,
  order: 6,
  icon: new Icon({provider: 'FontAwesome5', name: 'tshirt', color: '#000'})
});

export { buildingCategories }
