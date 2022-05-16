import TradingPartnerType from '../models/trading_partner_type';
import Icon from '../models/icon';
import { utils } from '../utils';
import { TRADING_PARTNERS } from '../enums/trading_partners';
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_TAGS } from '../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
const RSC = RESOURCE_SUBCATEGORIES;
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
const RCA = RESOURCE_CATEGORIES;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;
import { EQUIPMENT_TYPES } from '../enums/equipment_types';
const ETY = EQUIPMENT_TYPES;
import { SVGS } from '../enums/svgs';

let tradingPartnerTypes: { [name: string] : TradingPartnerType } = {};

tradingPartnerTypes[TRADING_PARTNERS.FOXFIRE_ASCETICS] = new TradingPartnerType({
  name: TRADING_PARTNERS.FOXFIRE_ASCETICS,
  description: `Journeying ascetics on a pilgrimage to a sea of blue-green fire. Will trade materials they've picked up in their travels for simple food and drink.`,
  icon: new Icon({provider: 'svg', name: SVGS.FOXFIRE_ASCETICS, color: '#84f9e4',
    backgroundColor: '#008a71'}),
  givesPool: [[
    {specificity: RSP.EXACT, type: RTY.WOOD_ALDER, weight: 200},
    {specificity: RSP.EXACT, type: RTY.CLAY_BLUE, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SAND_DUNE, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SEEDS_REED, weight: 50},
    {specificity: RSP.EXACT, type: (ETY.SHOULDER_POUCH + ' (Unmarked)'), weight: 20}
  ], [
    {specificity: RSP.EXACT, type: RTY.WOOD_ALDER, weight: 200},
    {specificity: RSP.EXACT, type: RTY.TEA_LEAVES_DARJEELING, weight: 100},
    {specificity: RSP.EXACT, type: RTY.CLAY_BLUE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SAND_DUNE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_REED, weight: 25},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.BRINE, weight: 75},
    {specificity: RSP.EXACT, type: (ETY.SHOULDER_POUCH + ' (Unmarked)'), weight: 25}
  ], [
    {specificity: RSP.EXACT, type: RTY.WOOD_ALDER, weight: 200},
    {specificity: RSP.EXACT, type: RTY.TEA_LEAVES_DARJEELING, weight: 100},
    {specificity: RSP.EXACT, type: RTY.CLAY_BLUE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SAND_DUNE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_REED, weight: 25},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.BRINE, weight: 75},
    {specificity: RSP.EXACT, type: RTY.JADE_TOKEN, weight: 100},
    {specificity: RSP.EXACT, type: (ETY.SHOULDER_POUCH + ' (Unmarked)'), weight: 25}
  ]],
  receivesPool: [[
    {specificity: RSP.EXACT, type: RTY.WATER, weight: 100},
    {specificity: RSP.EXACT, type: RTY.LENTIL, weight: 100}
  ], [
    {specificity: RSP.EXACT, type: RTY.WATER, weight: 100},
    {specificity: RSP.EXACT, type: RTY.LENTIL, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SOUP, weight: 50}
  ], [
    {specificity: RSP.EXACT, type: RTY.WATER, weight: 100},
    {specificity: RSP.EXACT, type: RTY.LENTIL, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SOUP, weight: 50}
  ]],
  initialTrust: 0,
  maxTrust: 1000,
  getTier(trust) {
    return defaultGetTier(trust, [50, 200, 300]);
  },
  getAcceptQuantity(trust) {
    return Math.floor(108 + (trust * 1.5));
  }
});

tradingPartnerTypes[TRADING_PARTNERS.TREFOIL_ISLANDS] = new TradingPartnerType({
  name: TRADING_PARTNERS.TREFOIL_ISLANDS,
  description: ('Traders from a distant northern kingdom of rolling grassy hills.'),
  icon: new Icon({provider: 'svg', name: SVGS.TREFOIL_KINGDOM, color: '#27b327',
    backgroundColor: '#0d5f0d'}),
  givesPool: [[
    {specificity: RSP.EXACT, type: RTY.WOOD_ROWAN, weight: 200},
    {specificity: RSP.EXACT, type: RTY.POTATO, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SEEDS_OLIVE, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_RICH, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SAND_OLIVINE, weight: 100}
  ], [
    {specificity: RSP.EXACT, type: RTY.WOOD_ROWAN, weight: 200},
    {specificity: RSP.EXACT, type: RTY.POTATO, weight: 100},
    {specificity: RSP.EXACT, type: RTY.BLUEBERRY, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_OLIVE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL, weight: 25},
    {specificity: RSP.EXACT, type: RTY.CLAY_RICH, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SAND_OLIVINE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.QUAIL, weight: 50},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.GREENISH_ORE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, weight: 75},
    {specificity: RSP.EXACT, type: (ETY.WOODEN_POLE + ' (Unmarked)'), weight: 25},
    {specificity: RSP.EXACT, type: (ETY.SIMPLE_ROBE + ' (Unmarked)'), weight: 25}
  ], [
    {specificity: RSP.EXACT, type: RTY.WOOD_ROWAN, weight: 200},
    {specificity: RSP.EXACT, type: RTY.POTATO, weight: 100},
    {specificity: RSP.EXACT, type: RTY.BLUEBERRY, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_OLIVE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL, weight: 25},
    {specificity: RSP.EXACT, type: RTY.CLAY_RICH, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SAND_OLIVINE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.QUAIL, weight: 50},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.GREENISH_ORE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, weight: 75},
    {specificity: RSP.EXACT, type: RTY.FLAX, weight: 75},
    {specificity: RSP.EXACT, type: (ETY.WOODEN_POLE + ' (Unmarked)'), weight: 25},
    {specificity: RSP.EXACT, type: (ETY.SIMPLE_ROBE + ' (Unmarked)'), weight: 25}
  ]],
  receivesPool: [[
    {specificity: RSP.EXACT, type: RTY.REEDS, weight: 100},
    {specificity: RSP.TAG, type: RTA.CROP, weight: 16.7},
    {specificity: RSP.TAG, type: RTA.CONSTRUCTION, weight: 16.7},
    {specificity: RSP.TAG, type: RTA.FUEL, weight: 16.7},
    {specificity: RSP.SUBCATEGORY, type: RSC.SAND, weight: 100},
    {specificity: RSP.TAG, type: RTA.EARTH, weight: 50},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 100},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 100}
  ], [
    {specificity: RSP.EXACT, type: RTY.THATCH, weight: 50},
    {specificity: RSP.TAG, type: RTA.DRIED, weight: 12.5},
    {specificity: RSP.TAG, type: RTA.CONSTRUCTION, weight: 12.5},
    {specificity: RSP.EXACT, type: RTY.FLOUR, weight: 50},
    {specificity: RSP.TAG, type: RTA.POWDER, weight: 12.5},
    {specificity: RSP.TAG, type: RTA.INGREDIENT, weight: 25},
    {specificity: RSP.EXACT, type: RTY.MINNOW, weight: 50},
    {specificity: RSP.TAG, type: RTA.ANIMAL, weight: 12.5},
    {specificity: RSP.SUBCATEGORY, type: RSC.OMELET, weight: 50},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 100},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 100}
  ], [
    {specificity: RSP.EXACT, type: RTY.THATCH, weight: 50},
    {specificity: RSP.TAG, type: RTA.DRIED, weight: 12.5},
    {specificity: RSP.TAG, type: RTA.CONSTRUCTION, weight: 12.5},
    {specificity: RSP.EXACT, type: RTY.FLOUR, weight: 50},
    {specificity: RSP.TAG, type: RTA.POWDER, weight: 12.5},
    {specificity: RSP.TAG, type: RTA.INGREDIENT, weight: 25},
    {specificity: RSP.EXACT, type: RTY.MINNOW, weight: 50},
    {specificity: RSP.TAG, type: RTA.ANIMAL, weight: 12.5},
    {specificity: RSP.EXACT, type: RTY.ROUGH_ROPE, weight: 25},
    {specificity: RSP.EXACT, type: RTY.BINDING, weight: 25},
    {specificity: RSP.EXACT, type: RTY.HARDENED_SLAB, weight: 25},
    {specificity: RSP.CATEGORY, type: RCA.IMPLEMENT, weight: 25},
    {specificity: RSP.SUBCATEGORY, type: RSC.OMELET, weight: 50},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 100},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 100}
  ]],
  initialTrust: 0,
  maxTrust: 1200,
  getTier(trust) {
    return defaultGetTier(trust, [50, 250, 400]);
  },
  getAcceptQuantity(trust) {
    return Math.floor(82 + trust);
  }
});

tradingPartnerTypes[TRADING_PARTNERS.RED_CROW_TRADERS] = new TradingPartnerType({
  name: TRADING_PARTNERS.RED_CROW_TRADERS,
  description: `They're loud, rowdy, and argumentative; based on the rumours you've heard, "Red Crow Raiders" would be a more accurate name.`,
  icon: new Icon({provider: 'svg', name: SVGS.RED_CROW_TRADERS, color: '#ff2626',
    backgroundColor: '#4a0000'}),
  givesPool: [[
    {specificity: RSP.EXACT, type: RTY.WOOD_OAK, weight: 200},
    {specificity: RSP.EXACT, type: RTY.ONION, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SAND_CORAL, weight: 100},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SEEDS_GRAIN, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SEEDS_REED, weight: 50}
  ], [
    {specificity: RSP.EXACT, type: RTY.WOOD_OAK, weight: 200},
    {specificity: RSP.EXACT, type: RTY.ONION, weight: 100},
    {specificity: RSP.EXACT, type: RTY.TOMATO, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SAND_CORAL, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_GRAIN, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_REED, weight: 25},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.PALE_ORE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.BRINE, weight: 75},
    {specificity: RSP.EXACT, type: (ETY.ROUGH_MATTOCK + ' (Unmarked)'), weight: 25},
    {specificity: RSP.EXACT, type: (ETY.SIMPLE_ROBE + ' (Unmarked)'), weight: 25}
  ], [
    {specificity: RSP.EXACT, type: RTY.WOOD_OAK, weight: 200},
    {specificity: RSP.EXACT, type: RTY.ONION, weight: 100},
    {specificity: RSP.EXACT, type: RTY.TOMATO, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SAND_CORAL, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_GRAIN, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_REED, weight: 25},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.PALE_ORE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.BRINE, weight: 75},
    {specificity: RSP.EXACT, type: RTY.FLAX, weight: 75},
    {specificity: RSP.EXACT, type: (ETY.ROUGH_MATTOCK + ' (Unmarked)'), weight: 25},
    {specificity: RSP.EXACT, type: (ETY.SIMPLE_ROBE + ' (Unmarked)'), weight: 25}
  ]],
  receivesPool: [[
    {specificity: RSP.SUBCATEGORY, type: RSC.SAND, weight: 50},
    {specificity: RSP.SUBCATEGORY, type: RSC.CLAY, weight: 100},
    {specificity: RSP.TAG, type: RTA.EARTH, weight: 100},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 50},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 50}
  ], [
    {specificity: RSP.EXACT, type: RTY.CHARCOAL, weight: 50},
    {specificity: RSP.TAG, type: RTA.SMELTED, weight: 50},
    {specificity: RSP.TAG, type: RTA.FUEL, weight: 25},
    {specificity: RSP.EXACT, type: RTY.GLASS, weight: 100},
    {specificity: RSP.TAG, type: RTA.CONSTRUCTION, weight: 25},
    {specificity: RSP.EXACT, type: RTY.BARRAMUNDI, weight: 50},
    {specificity: RSP.TAG, type: RTA.ANIMAL, weight: 12.5},
    {specificity: RSP.SUBCATEGORY, type: RSC.PIE, weight: 50},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 50},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 50}
  ], [
    {specificity: RSP.EXACT, type: RTY.CHARCOAL, weight: 50},
    {specificity: RSP.TAG, type: RTA.SMELTED, weight: 50},
    {specificity: RSP.TAG, type: RTA.FUEL, weight: 25},
    {specificity: RSP.EXACT, type: RTY.GLASS, weight: 100},
    {specificity: RSP.TAG, type: RTA.CONSTRUCTION, weight: 25},
    {specificity: RSP.EXACT, type: RTY.BARRAMUNDI, weight: 50},
    {specificity: RSP.TAG, type: RTA.ANIMAL, weight: 12.5},
    {specificity: RSP.EXACT, type: RTY.ROUGH_ROPE, weight: 25},
    {specificity: RSP.EXACT, type: RTY.IRON_EDGE, weight: 25},
    {specificity: RSP.EXACT, type: RTY.TORCH, weight: 25},
    {specificity: RSP.CATEGORY, type: RCA.IMPLEMENT, weight: 25},
    {specificity: RSP.SUBCATEGORY, type: RSC.PIE, weight: 50},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 50},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 50}
  ]],
  initialTrust: 0,
  maxTrust: 1500,
  getTier(trust) {
    return defaultGetTier(trust, [80, 320, 580]);
  },
  getAcceptQuantity(trust) {
    return Math.floor(77 + (trust * 0.7));
  }
});

tradingPartnerTypes[TRADING_PARTNERS.SANDSTONE_EDIFICERS] = new TradingPartnerType({
  name: TRADING_PARTNERS.SANDSTONE_EDIFICERS,
  description: `A group of burly architect-builders who use enormous caravans to move huge quantities of raw material`,
  icon: new Icon({provider: 'svg', name: SVGS.SANDSTONE_EDIFICERS, color: '#895723',
    backgroundColor: '#ffc856'}),
  givesPool: [[
    {specificity: RSP.EXACT, type: RTY.WOOD_ASH, weight: 200},
    {specificity: RSP.EXACT, type: RTY.CLAY_BLUE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_RICH, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SPINACH, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SAND_VOLCANIC, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SEEDS_GRAIN, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SEEDS_OLIVE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.DUSTY_ORE, weight: 200}
  ], [
    {specificity: RSP.EXACT, type: RTY.WOOD_ASH, weight: 200},
    {specificity: RSP.EXACT, type: RTY.CLAY_BLUE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_RICH, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SPINACH, weight: 100},
    {specificity: RSP.EXACT, type: RTY.RADISH, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SAND_VOLCANIC, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_GRAIN, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_OLIVE, weight: 25},
    {specificity: RSP.EXACT, type: RTY.DUSTY_ORE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.OX, weight: 50},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_TOOLPACK + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_HAVERSACK + ' (Unmarked)'),
      weight: 25}
  ], [
    {specificity: RSP.EXACT, type: RTY.WOOD_ASH, weight: 200},
    {specificity: RSP.EXACT, type: RTY.CLAY_BLUE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_RICH, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SPINACH, weight: 100},
    {specificity: RSP.EXACT, type: RTY.RADISH, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SAND_VOLCANIC, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_GRAIN, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_OLIVE, weight: 25},
    {specificity: RSP.EXACT, type: RTY.DUSTY_ORE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, weight: 75},
    {specificity: RSP.EXACT, type: RTY.OX, weight: 50},
    {specificity: RSP.EXACT, type: RTY.FLAX, weight: 75},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_TOOLPACK + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_HAVERSACK + ' (Unmarked)'),
      weight: 25}
  ]],
  receivesPool: [[
    {specificity: RSP.SUBCATEGORY, type: RSC.SAND, weight: 100},
    {specificity: RSP.SUBCATEGORY, type: RSC.CLAY, weight: 100},
    {specificity: RSP.TAG, type: RTA.EARTH, weight: 50},
    {specificity: RSP.TAG, type: RTA.CONSTRUCTION, weight: 100},
    {specificity: RSP.EXACT, type: RTY.WATER, weight: 200}
  ], [
    {specificity: RSP.SUBCATEGORY, type: RSC.SAND, weight: 100},
    {specificity: RSP.SUBCATEGORY, type: RSC.CLAY, weight: 100},
    {specificity: RSP.TAG, type: RTA.EARTH, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CARP, weight: 50},
    {specificity: RSP.TAG, type: RTA.CONSTRUCTION, weight: 100},
    {specificity: RSP.SUBCATEGORY, type: RSC.BRICK, weight: 100},
    {specificity: RSP.TAG, type: RTA.DRIED, weight: 50},
    {specificity: RSP.EXACT, type: RTY.WATER, weight: 100}
  ], [
    {specificity: RSP.SUBCATEGORY, type: RSC.SAND, weight: 100},
    {specificity: RSP.SUBCATEGORY, type: RSC.CLAY, weight: 100},
    {specificity: RSP.TAG, type: RTA.EARTH, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CARP, weight: 50},
    {specificity: RSP.TAG, type: RTA.CONSTRUCTION, weight: 100},
    {specificity: RSP.SUBCATEGORY, type: RSC.BRICK, weight: 100},
    {specificity: RSP.TAG, type: RTA.DRIED, weight: 50},
    {specificity: RSP.EXACT, type: RTY.WATER, weight: 100}
  ]],
  initialTrust: 0,
  maxTrust: 1800,
  getTier(trust) {
    return defaultGetTier(trust, [100, 400, 800]);
  },
  getAcceptQuantity(trust) {
    return Math.floor(500 + (trust * 2.5));
  }
});

tradingPartnerTypes[TRADING_PARTNERS.SPRING_AUTUMN_KINGDOM] = new TradingPartnerType({
  name: TRADING_PARTNERS.SPRING_AUTUMN_KINGDOM,
  description: `A sprawling and powerful kingdom to the east, with strict bureaucracy and many centers of learning.`,
  icon: new Icon({provider: 'svg', name: SVGS.SPRING_AUTUMN_KINGDOM, color: '#fff',
    backgroundColor: '#bf0000'}),
  givesPool: [[
    {specificity: RSP.EXACT, type: RTY.JADE_TOKEN, weight: 400},
    {specificity: RSP.EXACT, type: RTY.KUMQUAT, weight: 100},
    {specificity: RSP.EXACT, type: RTY.WOOD_WILLOW, weight: 200},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 100},
    {specificity: RSP.EXACT, type: RTY.PALE_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.DUSTY_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.GREENISH_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, weight: 50},
    {specificity: RSP.EXACT, type: (ETY.ROUGH_MATTOCK + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.WOODEN_POLE + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.COARSE_MEASURES + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.SIMPLE_ROBE + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_HAVERSACK + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_TOOLPACK + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_GEARBAG + ' (Unmarked)'),
      weight: 25}
  ], [
    {specificity: RSP.EXACT, type: RTY.JADE_TOKEN, weight: 400},
    {specificity: RSP.EXACT, type: RTY.KUMQUAT, weight: 100},
    {specificity: RSP.EXACT, type: RTY.LOTUS_ROOT, weight: 100},
    {specificity: RSP.EXACT, type: RTY.WOOD_WILLOW, weight: 200},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 100},
    {specificity: RSP.EXACT, type: RTY.PALE_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.DUSTY_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.GREENISH_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_KAOLIN, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SILKWORM_COCOON, weight: 100},
  ], [
    {specificity: RSP.EXACT, type: RTY.JADE_TOKEN, weight: 400},
    {specificity: RSP.EXACT, type: RTY.KUMQUAT, weight: 100},
    {specificity: RSP.EXACT, type: RTY.LOTUS_ROOT, weight: 100},
    {specificity: RSP.EXACT, type: RTY.WOOD_WILLOW, weight: 200},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 100},
    {specificity: RSP.EXACT, type: RTY.PALE_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.DUSTY_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.GREENISH_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_KAOLIN, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SILKWORM_COCOON, weight: 100},
  ]],
  receivesPool: [[
    {specificity: RSP.EXACT, type: RTY.JADE_TOKEN, weight: 400},
    {specificity: RSP.TAG, type: RTA.PRECIOUS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.GLASS, weight: 100},
    {specificity: RSP.TAG, type: RTA.SMELTED, weight: 25},
    {specificity: RSP.TAG, type: RTA.CONSTRUCTION, weight: 25},
    {specificity: RSP.EXACT, type: RTY.OLIVE_OIL, weight: 100},
    {specificity: RSP.TAG, type: RTA.PRESSED, weight: 25},
    {specificity: RSP.TAG, type: RTA.SPICE, weight: 25},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 100},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 100}
  ], [
    {specificity: RSP.EXACT, type: RTY.JADE_TOKEN, weight: 400},
    {specificity: RSP.TAG, type: RTA.PRECIOUS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.GLASS, weight: 50},
    {specificity: RSP.TAG, type: RTA.SMELTED, weight: 12.5},
    {specificity: RSP.TAG, type: RTA.CONSTRUCTION, weight: 12.5},
    {specificity: RSP.EXACT, type: RTY.OLIVE_OIL, weight: 50},
    {specificity: RSP.TAG, type: RTA.PRESSED, weight: 12.5},
    {specificity: RSP.TAG, type: RTA.SPICE, weight: 12.5},
    {specificity: RSP.SUBCATEGORY, type: RSC.CAKE, weight: 50},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 100},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 100}
  ], [
    {specificity: RSP.EXACT, type: RTY.JADE_TOKEN, weight: 400},
    {specificity: RSP.TAG, type: RTA.PRECIOUS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.GLASS, weight: 50},
    {specificity: RSP.TAG, type: RTA.SMELTED, weight: 12.5},
    {specificity: RSP.TAG, type: RTA.CONSTRUCTION, weight: 12.5},
    {specificity: RSP.EXACT, type: RTY.OLIVE_OIL, weight: 50},
    {specificity: RSP.TAG, type: RTA.PRESSED, weight: 12.5},
    {specificity: RSP.TAG, type: RTA.SPICE, weight: 12.5},
    {specificity: RSP.EXACT, type: RTY.CRUDE_NEEDLE, weight: 25},
    {specificity: RSP.EXACT, type: RTY.GEARWORK, weight: 25},
    {specificity: RSP.CATEGORY, type: RCA.IMPLEMENT, weight: 25},
    {specificity: RSP.SUBCATEGORY, type: RSC.CAKE, weight: 50},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 100},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 100}
  ]],
  initialTrust: 0,
  maxTrust: 3000,
  getTier(trust) {
    return defaultGetTier(trust, [500, 1000, 1500]);
  },
  getAcceptQuantity(trust) {
    return Math.floor(200 + (trust * 0.6));
  }
});

tradingPartnerTypes[TRADING_PARTNERS.TOURMALINE_JEWELERS] = new TradingPartnerType({
  name: TRADING_PARTNERS.TOURMALINE_JEWELERS,
  description: ('A loosely organized group of caravanners who deal only in '
    + 'gemstones.'),
  icon: new Icon({provider: 'svg', name: SVGS.TOURMALINE_JEWELERS, color: '#c6baff',
    backgroundColor: '#4416ce'}),
  givesPool: [[
    {specificity: RSP.EXACT, type: RTY.JADE_TOKEN, weight: 400},
    {specificity: RSP.EXACT, type: RTY.AMETHYST_DUSKY, weight: 300},
    {specificity: RSP.EXACT, type: RTY.TOPAZ_SLATE, weight: 225},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_GEARBAG + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.COARSE_MEASURES + ' (Unmarked)'),
      weight: 25}
  ], [
    {specificity: RSP.EXACT, type: RTY.JADE_TOKEN, weight: 400},
    {specificity: RSP.EXACT, type: RTY.AMETHYST_DUSKY, weight: 300},
    {specificity: RSP.EXACT, type: RTY.TOPAZ_SLATE, weight: 225},
    {specificity: RSP.EXACT, type: RTY.LAPIS_LAZULI, weight: 169},
    {specificity: RSP.EXACT, type: RTY.ONYX_HUSK, weight: 127},
    {specificity: RSP.EXACT, type: RTY.RUBY_CURSED, weight: 95},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_GEARBAG + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.COARSE_MEASURES + ' (Unmarked)'),
      weight: 25}
  ], [
    {specificity: RSP.EXACT, type: RTY.JADE_TOKEN, weight: 400},
    {specificity: RSP.EXACT, type: RTY.AMETHYST_DUSKY, weight: 300},
    {specificity: RSP.EXACT, type: RTY.TOPAZ_SLATE, weight: 225},
    {specificity: RSP.EXACT, type: RTY.LAPIS_LAZULI, weight: 169},
    {specificity: RSP.EXACT, type: RTY.ONYX_HUSK, weight: 127},
    {specificity: RSP.EXACT, type: RTY.RUBY_CURSED, weight: 95},
    {specificity: RSP.EXACT, type: RTY.SAPPHIRE_FLOATING, weight: 71},
    {specificity: RSP.EXACT, type: RTY.EMERALD_REFRACTING, weight: 53},
    {specificity: RSP.EXACT, type: RTY.DIAMOND_IRRADIENT, weight: 40},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_GEARBAG + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.COARSE_MEASURES + ' (Unmarked)'),
      weight: 25}
  ]],
  receivesPool: [[
    {specificity: RSP.EXACT, type: RTY.JADE_TOKEN, weight: 400},
    {specificity: RSP.EXACT, type: RTY.AMETHYST_DUSKY, weight: 300},
    {specificity: RSP.EXACT, type: RTY.TOPAZ_SLATE, weight: 225},
    {specificity: RSP.TAG, type: RTA.PRECIOUS, weight: 200},
    {specificity: RSP.EXACT, type: RTY.TEA_DARJEELING, weight: 200}
  ], [
    {specificity: RSP.EXACT, type: RTY.JADE_TOKEN, weight: 400},
    {specificity: RSP.EXACT, type: RTY.AMETHYST_DUSKY, weight: 300},
    {specificity: RSP.EXACT, type: RTY.TOPAZ_SLATE, weight: 225},
    {specificity: RSP.TAG, type: RTA.PRECIOUS, weight: 200},
    {specificity: RSP.EXACT, type: RTY.TEA_DARJEELING, weight: 200},
    {specificity: RSP.EXACT, type: RTY.LAPIS_LAZULI, weight: 169},
    {specificity: RSP.EXACT, type: RTY.ONYX_HUSK, weight: 127},
    {specificity: RSP.EXACT, type: RTY.RUBY_CURSED, weight: 95}
  ], [
    {specificity: RSP.EXACT, type: RTY.JADE_TOKEN, weight: 400},
    {specificity: RSP.EXACT, type: RTY.AMETHYST_DUSKY, weight: 300},
    {specificity: RSP.EXACT, type: RTY.TOPAZ_SLATE, weight: 225},
    {specificity: RSP.TAG, type: RTA.PRECIOUS, weight: 200},
    {specificity: RSP.EXACT, type: RTY.TEA_DARJEELING, weight: 200},
    {specificity: RSP.EXACT, type: RTY.LAPIS_LAZULI, weight: 169},
    {specificity: RSP.EXACT, type: RTY.ONYX_HUSK, weight: 127},
    {specificity: RSP.EXACT, type: RTY.RUBY_CURSED, weight: 95},
    {specificity: RSP.EXACT, type: RTY.SAPPHIRE_FLOATING, weight: 71},
    {specificity: RSP.EXACT, type: RTY.EMERALD_REFRACTING, weight: 53},
    {specificity: RSP.EXACT, type: RTY.DIAMOND_IRRADIENT, weight: 40}
  ]],
  initialTrust: 0,
  maxTrust: 3000,
  getTier(trust) {
    return defaultGetTier(trust, [200, 600, 1800]);
  },
  getAcceptQuantity(trust) {
    return Math.floor(10 + (trust * 0.1));
  }
});

const defaultGetTier = (trust: number, demarkers: number[]) => {
  let value = 0, toNext = 0;
  demarkers.forEach((demarker, index) => {
    const currentSum = utils.arraySum(demarkers.slice(index));
    const previousSum = index > 0 ? utils.arraySum(demarkers.slice(index-1)) : 0;
    if (trust < currentSum && trust >= previousSum) {
      value = index;
      toNext = ((trust - previousSum) / demarker) * 100;
    }
  });
  if (trust >= utils.arraySum(demarkers)) {
    value = demarkers.length-1;
    toNext = 100;
  }
  return { value, toNext };
};

export { tradingPartnerTypes };
