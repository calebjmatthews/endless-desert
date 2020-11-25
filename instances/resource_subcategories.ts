import ResourceSubcategory from '../models/resource_subcategory';
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';

let resourceSubcategories: { [name: string] : ResourceSubcategory } = {};

resourceSubcategories[RESOURCE_SUBCATEGORIES.WOOD] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.WOOD,
  icon: {provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'},
  foregroundColor: '#790f0f',
  backgroundColor: '#fff'
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.CLAY] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.CLAY,
  icon: {provider: 'FontAwesome5', name: 'splotch'},
  foregroundColor: '#a91f1f',
  backgroundColor: '#fff'
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.BRICK] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.BRICK,
  icon: {provider: 'FontAwesome', name: 'cubes'},
  foregroundColor: '#a91f1f',
  backgroundColor: '#fff'
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.SAND] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.SAND,
  icon: {provider: 'FontAwesome5', name: 'mountain'},
  foregroundColor: '#f9df00',
  backgroundColor: '#fff'
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.OIL] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.OIL,
  icon: {provider: 'FontAwesome5', name: 'oil-can'},
  foregroundColor: '#000',
  backgroundColor: '#fff',
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.GLASS] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.GLASS,
  icon: {provider: 'FontAwesome5', name: 'solar-panel'},
  foregroundColor: '#33cee2',
  backgroundColor: '#fff'
});

export { resourceSubcategories };
