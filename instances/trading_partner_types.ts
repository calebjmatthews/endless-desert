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
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SEEDS, weight: 50},
    {specificity: RSP.EXACT, type: (ETY.SIMPLE_ROBE + ' (Unmarked)'), weight: 20}
  ], [
    {specificity: RSP.EXACT, type: RTY.WOOD_ALDER, weight: 200},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SULFUR, weight: 50},
    {specificity: RSP.EXACT, type: (ETY.SIMPLE_ROBE + ' (Unmarked)'), weight: 20}
  ]],
  receivesPool: [[
    {specificity: RSP.EXACT, type: RTY.WATER, weight: 100},
    {specificity: RSP.EXACT, type: RTY.LENTIL, weight: 100}
  ], [
    {specificity: RSP.EXACT, type: RTY.WATER, weight: 100},
    {specificity: RSP.EXACT, type: RTY.LENTIL, weight: 100}
  ]],
  initialTrust: 100,
  maxTrust: 1000,
  getTier(trust) {
    let value = Math.floor((trust-100) / 80);
    const toNext = (trust-100) % 80;
    if (value < 0) { value = 0; }
    if (value >= 1) { value = 1; }
    return { value, toNext };
  },
  getAcceptQuantity(trust) { return Math.floor(trust * 0.8); }
});

tradingPartnerTypes[TRADING_PARTNERS.TREFOIL_ISLANDS] = new TradingPartnerType({
  name: TRADING_PARTNERS.TREFOIL_ISLANDS,
  description: ('Traders from a distant northern kingdom of rolling grassy hills.'),
  icon: new Icon({provider: 'svg', name: SVGS.TREFOIL_KINGDOM, color: '#27b327',
    backgroundColor: '#0d5f0d'}),
  givesPool: [[
    {specificity: RSP.EXACT, type: RTY.WOOD_ROWAN, weight: 200},
    {specificity: RSP.EXACT, type: RTY.SEEDS, weight: 100},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, weight: 100},
    {specificity: RSP.EXACT, type: (ETY.WOODEN_POLE + ' (Unmarked)'), weight: 20},
    {specificity: RSP.EXACT, type: (ETY.SIMPLE_ROBE + ' (Unmarked)'), weight: 10}
  ], [
    {specificity: RSP.EXACT, type: RTY.WOOD_ROWAN, weight: 200},
    {specificity: RSP.EXACT, type: RTY.SEEDS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.QUAIL, weight: 50},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.GREENISH_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.PALE_ORE, weight: 20},
    {specificity: RSP.EXACT, type: RTY.SALT, weight: 50},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, weight: 50},
    {specificity: RSP.EXACT, type: (ETY.WOODEN_POLE + ' (Unmarked)'), weight: 20},
    {specificity: RSP.EXACT, type: (ETY.SIMPLE_ROBE + ' (Unmarked)'), weight: 10}
  ]],
  receivesPool: [[
    {specificity: RSP.EXACT, type: RTY.REEDS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 50},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 100},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 100}
  ], [
    {specificity: RSP.EXACT, type: RTY.THATCH, weight: 100},
    {specificity: RSP.EXACT, type: RTY.FLOUR, weight: 50},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 100},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 100}
  ]],
  initialTrust: 112,
  maxTrust: 1200,
  getTier(trust) {
    let value = Math.floor((trust-112) / 100);
    const toNext = (trust-100) % 100;
    if (value < 0) { value = 0; }
    if (value >= 1) { value = 1; }
    return { value, toNext };
  },
  getAcceptQuantity(trust) { return Math.floor(trust); }
});

tradingPartnerTypes[TRADING_PARTNERS.RED_CROW_TRADERS] = new TradingPartnerType({
  name: TRADING_PARTNERS.RED_CROW_TRADERS,
  description: ('They\'re loud, rowdy, and argumentative; based on the rumours '
    + 'you\'ve heard, "Red Crow Raiders" would be a more accurate name.'),
  icon: new Icon({provider: 'svg', name: SVGS.RED_CROW_TRADERS, color: '#ff2626',
    backgroundColor: '#4a0000'}),
  givesPool: [[
    {specificity: RSP.EXACT, type: RTY.WOOD_OAK, weight: 200},
    {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, weight: 100},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 100},
    {specificity: RSP.EXACT, type: (ETY.ROUGH_MATTOCK + ' (Unmarked)'), weight: 20},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_HAVERSACK + ' (Unmarked)'),
      weight: 10}
  ], [
    {specificity: RSP.EXACT, type: RTY.WOOD_OAK, weight: 200},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.GREENISH_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.DUSTY_ORE, weight: 20},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SALT, weight: 50},
    {specificity: RSP.EXACT, type: (ETY.ROUGH_MATTOCK + ' (Unmarked)'), weight: 20},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_HAVERSACK + ' (Unmarked)'),
      weight: 10}
  ]],
  receivesPool: [[
    {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 100},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 50},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 50}
  ], [
    {specificity: RSP.EXACT, type: RTY.OLIVE_OIL, weight: 100},
    {specificity: RSP.EXACT, type: RTY.BRICKS_RED, weight: 100},
    {specificity: RSP.EXACT, type: RTY.GLASS, weight: 100},
    {specificity: RSP.CATEGORY, type: RCA.EQUIPMENT, weight: 50},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 50},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 50}
  ]],
  initialTrust: 100,
  maxTrust: 1500,
  getTier(trust) {
    let value = Math.floor((trust-100) / 110);
    const toNext = (trust-100) % 110;
    if (value < 0) { value = 0; }
    if (value >= 1) { value = 1; }
    return { value, toNext };
  },
  getAcceptQuantity(trust) { return Math.floor(trust * 1.1); }
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
    {specificity: RSP.EXACT, type: RTY.JASPER, weight: 169},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_GEARBAG + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.COARSE_IMPLEMENTS + ' (Unmarked)'),
      weight: 25}
  ], [
    {specificity: RSP.EXACT, type: RTY.JADE, weight: 400},
    {specificity: RSP.EXACT, type: RTY.AMETHYST, weight: 300},
    {specificity: RSP.EXACT, type: RTY.TOPAZ, weight: 225},
    {specificity: RSP.EXACT, type: RTY.JASPER, weight: 169},
    {specificity: RSP.EXACT, type: RTY.ONYX, weight: 127},
    {specificity: RSP.EXACT, type: RTY.RUBY, weight: 95},
    {specificity: RSP.EXACT, type: RTY.SAPPHIRE, weight: 71},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_GEARBAG + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.COARSE_IMPLEMENTS + ' (Unmarked)'),
      weight: 25}
  ]],
  receivesPool: [[
    {specificity: RSP.EXACT, type: RTY.JADE, weight: 400},
    {specificity: RSP.EXACT, type: RTY.AMETHYST, weight: 300},
    {specificity: RSP.EXACT, type: RTY.TOPAZ, weight: 225},
    {specificity: RSP.EXACT, type: RTY.JASPER, weight: 169}
  ], [
    {specificity: RSP.EXACT, type: RTY.JADE, weight: 400},
    {specificity: RSP.EXACT, type: RTY.AMETHYST, weight: 300},
    {specificity: RSP.EXACT, type: RTY.TOPAZ, weight: 225},
    {specificity: RSP.EXACT, type: RTY.JASPER, weight: 169},
    {specificity: RSP.EXACT, type: RTY.ONYX, weight: 127},
    {specificity: RSP.EXACT, type: RTY.RUBY, weight: 95},
    {specificity: RSP.EXACT, type: RTY.SAPPHIRE, weight: 71}
  ]],
  initialTrust: 100,
  maxTrust: 3000,
  getTier(trust) {
    if (trust < 1000) {
      return { value: 0, toNext: (trust-100 / 1000) }
    }
    if (trust < 3000) {
      return { value: 1, toNext: (trust-1100 / 2000) }
    }
    return { value: 1, toNext: 1 };
  },
  getAcceptQuantity(trust) { return Math.floor(trust * 0.1); }
});

tradingPartnerTypes[TRADING_PARTNERS.SPRING_AUTUMN_KINGDOM] = new TradingPartnerType({
  name: TRADING_PARTNERS.SPRING_AUTUMN_KINGDOM,
  description: ('A sprawling and powerful kingdom to the east, '
    + 'with strict bureaucracy and many centers of learning.'),
  icon: new Icon({provider: 'svg', name: SVGS.SPRING_AUTUMN_KINGDOM, color: '#fff',
    backgroundColor: '#bf0000'}),
  givesPool: [[
    {specificity: RSP.EXACT, type: RTY.JADE, weight: 200},
    {specificity: RSP.EXACT, type: RTY.WOOD_WILLOW, weight: 100},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 100},
    {specificity: RSP.EXACT, type: RTY.PALE_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.DUSTY_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SEEDS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.QUAIL, weight: 25},
    {specificity: RSP.EXACT, type: (ETY.ROUGH_MATTOCK + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.WOODEN_POLE + ' (Unmarked)'),
      weight: 25},
    {specificity: RSP.EXACT, type: (ETY.COARSE_IMPLEMENTS + ' (Unmarked)'),
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
    {specificity: RSP.EXACT, type: RTY.WOOD_WILLOW, weight: 100},
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
  initialTrust: 100,
  maxTrust: 3000,
  getTier(trust) {
    if (trust < 1000) {
      return { value: 0, toNext: (trust-100 / 1000) }
    }
    if (trust < 2000) {
      return { value: 1, toNext: (trust-1100 / 1000) }
    }
    return { value: 1, toNext: 1 };
  },
  getAcceptQuantity(trust) { return Math.floor(trust * 1); }
});

export { tradingPartnerTypes };
