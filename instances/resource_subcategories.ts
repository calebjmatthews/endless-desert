import ResourceSubcategory from '../models/resource_subcategory';
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';

let resourceSubcategories: { [name: string] : ResourceSubcategory } = {};

resourceSubcategories[RESOURCE_SUBCATEGORIES.WOOD] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.WOOD,
  value: 50,
  order: 0,
  icon: {provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'},
  foregroundColor: '#790f0f',
  backgroundColor: '#fff'
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.CLAY] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.CLAY,
  value: 15,
  order: 1,
  icon: {provider: 'FontAwesome5', name: 'splotch'},
  foregroundColor: '#a91f1f',
  backgroundColor: '#fff'
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.BRICK] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.BRICK,
  value: 80,
  order: 2,
  icon: {provider: 'FontAwesome', name: 'cubes'},
  foregroundColor: '#a91f1f',
  backgroundColor: '#fff'
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.SAND] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.SAND,
  value: 3,
  order: 3,
  icon: {provider: 'FontAwesome5', name: 'mountain'},
  foregroundColor: '#f9df00',
  backgroundColor: '#fff'
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.OIL] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.OIL,
  value: 100,
  order: 4,
  icon: {provider: 'FontAwesome5', name: 'oil-can'},
  foregroundColor: '#000',
  backgroundColor: '#fff',
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.GLASS] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.GLASS,
  value: 120,
  order: 5,
  icon: {provider: 'FontAwesome5', name: 'solar-panel'},
  foregroundColor: '#33cee2',
  backgroundColor: '#fff'
});

export { resourceSubcategories };
