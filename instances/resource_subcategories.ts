import ResourceSubcategory from '../models/resource_subcategory';
import Icon from '../models/icon';
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
import { SVGS } from '../enums/svgs';

let resourceSubcategories: { [name: string] : ResourceSubcategory } = {};

resourceSubcategories[RESOURCE_SUBCATEGORIES.CROP] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.CROP,
  value: 10,
  order: 0,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'sprout',
    color:'#008000'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.SPICE] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.SPICE,
  value: 40,
  order: 1,
  icon: new Icon({provider: 'FontAwesome5', name: 'mortar-pestle',
    color:'#ca8826'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.SEEDS] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.SEEDS,
  value: 40,
  order: 2,
  icon: new Icon({provider: 'svg', name: SVGS.SEEDS, color: '#ffbe00',
    shadow: '#ffb655'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.WOOD] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.WOOD,
  value: 50,
  order: 3,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#9b6e42',
    shadow: '#825a3a', secondaryColor: '#f3d488', secondaryShadow: '#daae90'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.ANIMAL] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.ANIMAL,
  value: 50,
  order: 4,
  icon: new Icon({provider: 'FontAwesome5', name: 'paw',
    color:'#881919'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.FISH] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.FISH,
  value: 24,
  order: 5,
  icon: new Icon({provider: 'FontAwesome5', name: 'fish',
    color:'#03a9f4'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.SAND] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.SAND,
  value: 3,
  order: 6,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#f3d98f',
    shadow: '#e6a960'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.CLAY] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.CLAY,
  value: 15,
  order: 7,
  icon: new Icon({provider: 'svg', name: SVGS.CLAY, color: '#a91f1f',
    shadow: '#6f1b1b'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.ORE] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.ORE,
  value: 200,
  order: 8,
  icon: new Icon({provider: 'svg', name: SVGS.ORE, color: '#61676d',
    shadow: '#4b4b65', secondaryColor: '#758da2', secondaryShadow: '#94a2bd'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.GEM] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.GEM,
  value: 1000,
  order: 9,
  icon: new Icon({provider: 'FontAwesome5', name: 'gem',
    color: '#33cee2'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.BRICK] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.BRICK,
  value: 80,
  order: 10,
  icon: new Icon({provider: 'svg', name: SVGS.BRICK, color: '#a91f1f',
    shadow: '#6f1b1b', secondaryColor: '#de6363'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.OIL] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.OIL,
  value: 100,
  order: 11,
  icon: new Icon({provider: 'FontAwesome5', name: 'oil-can',
    color: '#000'}),
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.METAL_POWDER] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.METAL_POWDER,
  value: 350,
  order: 12,
  icon: new Icon({provider: 'svg', name: SVGS.POWDER, color: '#4d4d4d',
    shadow: '#333', secondaryColor: '#666'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.METAL_INGOT] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.METAL_INGOT,
  value: 400,
  order: 13,
  icon: new Icon({provider: 'svg', name: SVGS.BAR, color: '#4d4d4d',
    shadow: '#333', secondaryColor: '#666'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.GLAZE] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.GLAZE,
  value: 240,
  order: 14,
  icon: new Icon({provider: 'svg', name: SVGS.GLAZE, color: '#94a2bd',
    shadow: '#758da2'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.GLASS] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.GLASS,
  value: 120,
  order: 15,
  icon: new Icon({provider: 'svg', name: SVGS.GLASS})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.CERAMIC] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.CERAMIC,
  value: 60,
  order: 16,
  icon: new Icon({provider: 'svg', name: SVGS.TERRACOTTA})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.TEXTILE] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.TEXTILE,
  value: 200,
  order: 17,
  icon: new Icon({provider: 'svg', name: SVGS.LINEN})
});

export { resourceSubcategories };
