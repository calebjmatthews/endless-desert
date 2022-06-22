import ResourceSubcategory from '../models/resource_subcategory';
import Icon from '../models/icon';
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
import { SVGS } from '../enums/svgs';

let resourceSubcategories: { [name: string] : ResourceSubcategory } = {};

resourceSubcategories[RESOURCE_SUBCATEGORIES.WATER] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.WATER,
  plural: 'Water',
  value: 5,
  order: -1,
  icon: new Icon({provider: 'svg', name: SVGS.DROP, color: '#28aae1',
    shadow: '#2887c3', secondaryColor: '#aaebf0'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.CROP] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.CROP,
  plural: 'Crops',
  value: 10,
  order: 0,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'sprout',
    color:'#008000'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.SPICE] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.SPICE,
  plural: 'Spices',
  value: 40,
  order: 1,
  icon: new Icon({provider: 'FontAwesome5', name: 'mortar-pestle',
    color:'#ca8826'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.SEEDS] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.SEEDS,
  plural: 'Seeds',
  value: 40,
  order: 2,
  icon: new Icon({provider: 'svg', name: SVGS.SEEDS, color: '#ffbe00',
    shadow: '#ffb655'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.WOOD] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.WOOD,
  plural: 'Wood',
  value: 50,
  order: 3,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#9b6e42',
    shadow: '#825a3a', secondaryColor: '#f3d488', secondaryShadow: '#daae90'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.ANIMAL] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.ANIMAL,
  plural: 'Animal Products',
  value: 50,
  order: 4,
  icon: new Icon({provider: 'FontAwesome5', name: 'paw',
    color:'#881919'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.FISH] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.FISH,
  plural: 'Fish',
  value: 24,
  order: 5,
  icon: new Icon({provider: 'FontAwesome5', name: 'fish',
    color:'#03a9f4'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.SAND] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.SAND,
  plural: 'Sand',
  value: 3,
  order: 6,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#f3d98f',
    shadow: '#e6a960'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.CLAY] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.CLAY,
  plural: 'Clay',
  value: 15,
  order: 7,
  icon: new Icon({provider: 'svg', name: SVGS.CLAY, color: '#a91f1f',
    shadow: '#6f1b1b'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.ORE] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.ORE,
  plural: 'Ore',
  value: 200,
  order: 8,
  icon: new Icon({provider: 'svg', name: SVGS.ORE, color: '#61676d',
    shadow: '#4b4b65', secondaryColor: '#758da2', secondaryShadow: '#94a2bd'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.GEM] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.GEM,
  plural: 'Gems',
  value: 1000,
  order: 9,
  icon: new Icon({provider: 'FontAwesome5', name: 'gem',
    color: '#33cee2'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.BRICK] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.BRICK,
  plural: 'Brick',
  value: 80,
  order: 10,
  icon: new Icon({provider: 'svg', name: SVGS.BRICK, color: '#a91f1f',
    shadow: '#6f1b1b', secondaryColor: '#de6363'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.OIL] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.OIL,
  plural: 'Oil',
  value: 100,
  order: 11,
  icon: new Icon({provider: 'FontAwesome5', name: 'oil-can',
    color: '#000'}),
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.METAL_POWDER] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.METAL_POWDER,
  plural: 'Metal Powders',
  value: 350,
  order: 12,
  icon: new Icon({provider: 'svg', name: SVGS.POWDER, color: '#4d4d4d',
    shadow: '#333', secondaryColor: '#666'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.METAL_INGOT] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.METAL_INGOT,
  plural: 'Metal Ingots',
  value: 400,
  order: 13,
  icon: new Icon({provider: 'svg', name: SVGS.BAR, color: '#4d4d4d',
    shadow: '#333', secondaryColor: '#666'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.GLAZE] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.GLAZE,
  plural: 'Glazes',
  value: 240,
  order: 14,
  icon: new Icon({provider: 'svg', name: SVGS.GLAZE, color: '#94a2bd',
    shadow: '#758da2'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.GLASS] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.GLASS,
  plural: 'Glass',
  value: 120,
  order: 15,
  icon: new Icon({provider: 'svg', name: SVGS.GLASS})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.CERAMIC] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.CERAMIC,
  plural: 'Ceramics',
  value: 60,
  order: 16,
  icon: new Icon({provider: 'svg', name: SVGS.TERRACOTTA})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.TEXTILE] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.TEXTILE,
  plural: 'Textiles',
  value: 200,
  order: 17,
  icon: new Icon({provider: 'svg', name: SVGS.LINEN})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.DROMEDARY] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.DROMEDARY,
  plural: 'Dromedaries',
  value: 2000,
  order: 18,
  icon: new Icon({provider: 'svg', name: SVGS.DROMEDARY})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.TEA_CELADON] =
new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.TEA_CELADON,
  plural: 'Pots of Celadon Tea',
  value: 30,
  order: 80,
  icon: new Icon({provider: 'svg', name: SVGS.TEA})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.JUICE_TOMATO] =
new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.JUICE_TOMATO,
  plural: 'Jorums of Tomato Juice',
  value: 275,
  order: 81,
  icon: new Icon({provider: 'svg', name: SVGS.JUICE_TOMATO})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.JUICE_BLUEBERRY] =
new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.JUICE_BLUEBERRY,
  plural: 'Jorums of Blueberry Juice',
  value: 275,
  order: 82,
  icon: new Icon({provider: 'svg', name: SVGS.JUICE_BLUEBERRY})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.SOUP] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.SOUP,
  plural: 'Bowls of Soup',
  value: 30,
  order: 100,
  icon: new Icon({provider: 'svg', name: SVGS.SOUP, color: '#F47400',
    shadow: '#f25600'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.BREAD] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.BREAD,
  plural: 'Loaves of Bread',
  value: 40,
  order: 101,
  icon: new Icon({provider: 'svg', name: SVGS.BREAD })
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.OMELET] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.OMELET,
  plural: 'Omelets',
  value: 160,
  order: 102,
  icon: new Icon({provider: 'svg', name: SVGS.OMELET, color: '#18c08b',
    shadow: '#0caf7b'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.STEW] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.STEW,
  plural: 'Bowls of Stew',
  value: 220,
  order: 103,
  icon: new Icon({provider: 'svg', name: SVGS.STEW, color: '#fa690e',
    shadow: '#f94c10'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.PIE] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.PIE,
  plural: 'Pies',
  value: 120,
  order: 104,
  icon: new Icon({provider: 'svg', name: SVGS.PIE, color: '#c22235'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.CAKE] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.CAKE,
  plural: 'Cakes',
  value: 280,
  order: 105,
  icon: new Icon({provider: 'svg', name: SVGS.CAKE, color: '#ffa6b7',
    shadow: '#d16479'})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.WAYBREAD] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.WAYBREAD,
  plural: 'Wafers of Waybread',
  value: 60,
  order: 106,
  icon: new Icon({provider: 'svg', name: SVGS.WAYBREAD})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.DRIED_FRUIT] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.DRIED_FRUIT,
  plural: 'Dried Fruits',
  value: 80,
  order: 107,
  icon: new Icon({provider: 'svg', name: SVGS.DRIED_FRUIT})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.SALTED_MEAT] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.SALTED_MEAT,
  plural: 'Salted Meats',
  value: 280,
  order: 108,
  icon: new Icon({provider: 'svg', name: SVGS.SALTED_MEAT})
});

resourceSubcategories[RESOURCE_SUBCATEGORIES.MISTAKE] = new ResourceSubcategory({
  name: RESOURCE_SUBCATEGORIES.MISTAKE,
  plural: 'Mistakes',
  value: 1,
  order: 199,
  icon: new Icon({provider: 'svg', name: SVGS.MISTAKE})
});

export { resourceSubcategories };
