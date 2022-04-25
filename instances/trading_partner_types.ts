import TradingPartnerType from '../models/trading_partner_type';
import Icon from '../models/icon';
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
  description: ('Journeying ascetics on a pilgrimage to a sea of blue-green fire. '
    + 'Will trade materials they\'ve picked up in their travels for simple food '
    + 'and drink.'),
  icon: new Icon({provider: 'svg', name: SVGS.FOXFIRE_ASCETICS, color: '#84f9e4',
    backgroundColor: '#008a71'}),
  givesPool: [[
    {specificity: RSP.EXACT, type: RTY.WOOD_ALDER, weight: 200},
    {specificity: RSP.EXACT, type: RTY.CLAY_BLUE, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SAND_DUNE, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL, weight: 25},
    {specificity: RSP.EXACT, type: RTY.SEEDS_REED, weight: 25},
    {specificity: RSP.EXACT, type: (ETY.SHOULDER_POUCH + ' (Unmarked)'), weight: 20}
  ], [
    {specificity: RSP.EXACT, type: RTY.WOOD_ALDER, weight: 200},
    {specificity: RSP.EXACT, type: RTY.TEA_LEAVES_DARJEELING, weight: 100},
    {specificity: RSP.EXACT, type: RTY.CLAY_BLUE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SAND_DUNE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL, weight: 25},
    {specificity: RSP.EXACT, type: RTY.SEEDS_REED, weight: 25},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 100},
    {specificity: RSP.EXACT, type: RTY.PALE_ORE, weight: 25},
    {specificity: RSP.EXACT, type: RTY.DUSTY_ORE, weight: 25},
    {specificity: RSP.EXACT, type: RTY.BRINE, weight: 50},
    {specificity: RSP.EXACT, type: (ETY.SHOULDER_POUCH + ' (Unmarked)'), weight: 20}
  ]],
  receivesPool: [[
    {specificity: RSP.EXACT, type: RTY.WATER, weight: 100},
    {specificity: RSP.EXACT, type: RTY.LENTIL, weight: 100}
  ], [
    {specificity: RSP.EXACT, type: RTY.WATER, weight: 100},
    {specificity: RSP.EXACT, type: RTY.LENTIL, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SOUP, weight: 50}
  ]],
  initialTrust: 0,
  maxTrust: 1000,
  getTier(trust) {
    let value = 0, toNext = 0;
    if (trust < 25) {
      value = 0;
      toNext = (trust / 25) * 100;
    }
    else if (trust < (25 + 175)) {
      value = 1;
      toNext = ((trust - 25) / 175) * 100;
    }
    else {
      value = 1;
      toNext = 100;
    }
    return { value, toNext };
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
    {specificity: RSP.EXACT, type: RTY.SEEDS_REED, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_OLIVE, weight: 25},
    {specificity: RSP.EXACT, type: RTY.CLAY_RICH, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SAND_OLIVINE, weight: 100},
    {specificity: RSP.EXACT, type: (ETY.WOODEN_POLE + ' (Unmarked)'), weight: 20},
    {specificity: RSP.EXACT, type: (ETY.SIMPLE_ROBE + ' (Unmarked)'), weight: 10}
  ], [
    {specificity: RSP.EXACT, type: RTY.WOOD_ROWAN, weight: 200},
    {specificity: RSP.EXACT, type: RTY.POTATO, weight: 100},
    {specificity: RSP.EXACT, type: RTY.BLUEBERRY, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_REED, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_OLIVE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_RICH, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SAND_OLIVINE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.QUAIL, weight: 50},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.GREENISH_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.PALE_ORE, weight: 25},
    {specificity: RSP.EXACT, type: RTY.BRINE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, weight: 50},
    {specificity: RSP.EXACT, type: (ETY.WOODEN_POLE + ' (Unmarked)'), weight: 20},
    {specificity: RSP.EXACT, type: (ETY.SIMPLE_ROBE + ' (Unmarked)'), weight: 10}
  ]],
  receivesPool: [[
    {specificity: RSP.EXACT, type: RTY.REEDS, weight: 50},
    {specificity: RSP.SUBCATEGORY, type: RSC.CLAY, weight: 50},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 100},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 100}
  ], [
    {specificity: RSP.EXACT, type: RTY.THATCH, weight: 100},
    {specificity: RSP.EXACT, type: RTY.FLOUR, weight: 50},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 100},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 100}
  ]],
  initialTrust: 0,
  maxTrust: 1200,
  getTier(trust) {
    let value = 0, toNext = 0;
    if (trust < 50) {
      value = 0;
      toNext = (trust / 50) * 100;
    }
    else if (trust < (50 + 250)) {
      value = 1;
      toNext = ((trust - 50) / 250) * 100;
    }
    else {
      value = 1;
      toNext = 100;
    }
    return { value, toNext };
  },
  getAcceptQuantity(trust) {
    return Math.floor(82 + trust);
  }
});

tradingPartnerTypes[TRADING_PARTNERS.RED_CROW_TRADERS] = new TradingPartnerType({
  name: TRADING_PARTNERS.RED_CROW_TRADERS,
  description: ('They\'re loud, rowdy, and argumentative; based on the rumours '
    + 'you\'ve heard, "Red Crow Raiders" would be a more accurate name.'),
  icon: new Icon({provider: 'svg', name: SVGS.RED_CROW_TRADERS, color: '#ff2626',
    backgroundColor: '#4a0000'}),
  givesPool: [[
    {specificity: RSP.EXACT, type: RTY.WOOD_OAK, weight: 200},
    {specificity: RSP.EXACT, type: RTY.ONION, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SAND_VOLCANIC, weight: 100},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SEEDS_GRAIN, weight: 50},
    {specificity: RSP.EXACT, type: (ETY.ROUGH_MATTOCK + ' (Unmarked)'), weight: 20},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_HAVERSACK + ' (Unmarked)'),
      weight: 10}
  ], [
    {specificity: RSP.EXACT, type: RTY.WOOD_OAK, weight: 200},
    {specificity: RSP.EXACT, type: RTY.ONION, weight: 100},
    {specificity: RSP.EXACT, type: RTY.TOMATO, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SAND_VOLCANIC, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS_GRAIN, weight: 50},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.GREENISH_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.DUSTY_ORE, weight: 20},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.BRINE, weight: 50},
    {specificity: RSP.EXACT, type: (ETY.ROUGH_MATTOCK + ' (Unmarked)'), weight: 20},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_HAVERSACK + ' (Unmarked)'),
      weight: 10}
  ]],
  receivesPool: [[
    {specificity: RSP.SUBCATEGORY, type: RSC.SAND, weight: 50},
    {specificity: RSP.SUBCATEGORY, type: RSC.CLAY, weight: 100},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 50},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 50}
  ], [
    {specificity: RSP.EXACT, type: RTY.OLIVE_OIL, weight: 100},
    {specificity: RSP.SUBCATEGORY, type: RSC.BRICK, weight: 100},
    {specificity: RSP.EXACT, type: RTY.GLASS, weight: 100},
    {specificity: RSP.CATEGORY, type: RCA.MATERIAL_REFINED, weight: 50},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 50},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 50}
  ]],
  initialTrust: 0,
  maxTrust: 1500,
  getTier(trust) {
    let value = 0, toNext = 0;
    if (trust < 80) {
      value = 0;
      toNext = (trust / 80) * 100;
    }
    else if (trust < (320 + 80)) {
      value = 1;
      toNext = ((trust - 80) / 320) * 100;
    }
    else {
      value = 1;
      toNext = 100;
    }
    return { value, toNext };
  },
  getAcceptQuantity(trust) {
    return Math.floor(77 + (trust * 0.7));
  }
});

tradingPartnerTypes[TRADING_PARTNERS.SPRING_AUTUMN_KINGDOM] = new TradingPartnerType({
  name: TRADING_PARTNERS.SPRING_AUTUMN_KINGDOM,
  description: ('A sprawling and powerful kingdom to the east, '
    + 'with strict bureaucracy and many centers of learning.'),
  icon: new Icon({provider: 'svg', name: SVGS.SPRING_AUTUMN_KINGDOM, color: '#fff',
    backgroundColor: '#bf0000'}),
  givesPool: [[
    {specificity: RSP.EXACT, type: RTY.JADE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.KUMQUAT, weight: 100},
    {specificity: RSP.EXACT, type: RTY.WOOD_WILLOW, weight: 100},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 100},
    {specificity: RSP.EXACT, type: RTY.PALE_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.DUSTY_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.QUAIL, weight: 25},
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
    {specificity: RSP.EXACT, type: RTY.JADE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.KUMQUAT, weight: 100},
    {specificity: RSP.EXACT, type: RTY.LOTUS_ROOT, weight: 50},
    {specificity: RSP.EXACT, type: RTY.WOOD_WILLOW, weight: 100},
    {specificity: RSP.EXACT, type: RTY.CLAY_KAOLIN, weight: 50},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 100},
    {specificity: RSP.EXACT, type: RTY.PALE_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.DUSTY_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SULFUR, weight: 50},
    {specificity: RSP.EXACT, type: RTY.OX, weight: 25}
  ]],
  receivesPool: [[
    {specificity: RSP.EXACT, type: RTY.JADE, weight: 400},
    {specificity: RSP.EXACT, type: RTY.THATCH, weight: 100},
    {specificity: RSP.EXACT, type: RTY.GLASS, weight: 100},
    {specificity: RSP.EXACT, type: RTY.OLIVE_OIL, weight: 100},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 100},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 100}
  ], [
    {specificity: RSP.EXACT, type: RTY.JADE, weight: 400},
    {specificity: RSP.EXACT, type: RTA.CERAMIC, weight: 100},
    {specificity: RSP.TAG, type: RTA.GLASS, weight: 100},
    {specificity: RSP.TAG, type: RTA.TEXTILE, weight: 100},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 50},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 50}
  ]],
  initialTrust: 0,
  maxTrust: 3000,
  getTier(trust) {
    let value = 0, toNext = 0;
    if (trust < 500) {
      value = 0;
      toNext = (trust / 500) * 100;
    }
    else if (trust < (500 + 500)) {
      value = 1;
      toNext = ((trust - 500) / 500) * 100;
    }
    else {
      value = 1;
      toNext = 100;
    }
    return { value, toNext };
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
    {specificity: RSP.EXACT, type: RTY.JADE, weight: 400},
    {specificity: RSP.EXACT, type: RTY.AMETHYST, weight: 300},
    {specificity: RSP.EXACT, type: RTY.TOPAZ, weight: 225},
    {specificity: RSP.EXACT, type: RTY.LAPIS_LAZULI, weight: 169},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_GEARBAG + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.COARSE_MEASURES + ' (Unmarked)'),
      weight: 25}
  ], [
    {specificity: RSP.EXACT, type: RTY.JADE, weight: 400},
    {specificity: RSP.EXACT, type: RTY.AMETHYST, weight: 300},
    {specificity: RSP.EXACT, type: RTY.TOPAZ, weight: 225},
    {specificity: RSP.EXACT, type: RTY.LAPIS_LAZULI, weight: 169},
    {specificity: RSP.EXACT, type: RTY.ONYX, weight: 127},
    {specificity: RSP.EXACT, type: RTY.RUBY, weight: 95},
    {specificity: RSP.EXACT, type: RTY.SAPPHIRE, weight: 71},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_GEARBAG + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.COARSE_MEASURES + ' (Unmarked)'),
      weight: 25}
  ]],
  receivesPool: [[
    {specificity: RSP.EXACT, type: RTY.JADE, weight: 400},
    {specificity: RSP.EXACT, type: RTY.AMETHYST, weight: 300},
    {specificity: RSP.EXACT, type: RTY.TOPAZ, weight: 225},
    {specificity: RSP.EXACT, type: RTY.LAPIS_LAZULI, weight: 169}
  ], [
    {specificity: RSP.EXACT, type: RTY.JADE, weight: 400},
    {specificity: RSP.EXACT, type: RTY.AMETHYST, weight: 300},
    {specificity: RSP.EXACT, type: RTY.TOPAZ, weight: 225},
    {specificity: RSP.EXACT, type: RTY.LAPIS_LAZULI, weight: 169},
    {specificity: RSP.EXACT, type: RTY.ONYX, weight: 127},
    {specificity: RSP.EXACT, type: RTY.RUBY, weight: 95},
    {specificity: RSP.EXACT, type: RTY.SAPPHIRE, weight: 71}
  ]],
  initialTrust: 0,
  maxTrust: 3000,
  getTier(trust) {
    let value = 0, toNext = 0;
    if (trust < 200) {
      value = 0;
      toNext = (trust / 200) * 100;
    }
    else if (trust < (200 + 600)) {
      value = 1;
      toNext = ((trust - 200) / 600) * 100;
    }
    else {
      value = 1;
      toNext = 100;
    }
    return { value, toNext };
  },
  getAcceptQuantity(trust) {
    return Math.floor(10 + (trust * 0.1));
  }
});

export { tradingPartnerTypes };
