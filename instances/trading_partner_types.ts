import TradingPartnerType from '../models/trading_partner_type';
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

let tradingPartnerTypes: { [name: string] : TradingPartnerType } = {};

tradingPartnerTypes[TRADING_PARTNERS.FOXFIRE_ASCETICS] = new TradingPartnerType({
  name: TRADING_PARTNERS.FOXFIRE_ASCETICS,
  description: ('Journeying ascetics on a pilgrimage to a sea of blue-green fire. '
    + 'Will trade materials they\'ve picked up in their travels for simple food '
    + 'and drink.'),
  icon: {provider: 'FontAwesome', name: 'fire'},
  foregroundColor: '#84f9e4',
  backgroundColor: '#008a71',
  paddingHorizontal: 11,
  paddingVertical: 8,
  acceptQuantity: 80,
  givesPool: [
    {specificity: RSP.EXACT, type: RTY.WOOD_ALDER, weight: 200},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SEEDS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.RUST_ORE, weight: 50},
    {specificity: RSP.EXACT, type: (ETY.SIMPLE_ROBE + ' (Unmarked)'), weight: 20}
  ],
  receivesPool: [
    {specificity: RSP.EXACT, type: RTY.WATER, weight: 100},
    {specificity: RSP.EXACT, type: RTY.LENTILS, weight: 100}
  ]
});

tradingPartnerTypes[TRADING_PARTNERS.KINGDOM_OF_TREFOIL] = new TradingPartnerType({
  name: TRADING_PARTNERS.KINGDOM_OF_TREFOIL,
  description: ('Traders from a distant northern kingdom of rolling grassy hills.'),
  icon: {provider: 'MaterialCommunityIcons', name: 'cards-club'},
  foregroundColor: '#27b327',
  backgroundColor: '#0d5f0d',
  paddingHorizontal: 9,
  paddingVertical: 8,
  acceptQuantity: 100,
  givesPool: [
    {specificity: RSP.EXACT, type: RTY.WOOD_ROWAN, weight: 200},
    {specificity: RSP.EXACT, type: RTY.SEEDS, weight: 100},
    {specificity: RSP.EXACT, type: RTY.QUAIL, weight: 50},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, weight: 100},
    {specificity: RSP.EXACT, type: RTY.GREENISH_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.PALE_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SALT, weight: 50},
    {specificity: RSP.EXACT, type: (ETY.WOODEN_POLE + ' (Unmarked)'), weight: 20},
    {specificity: RSP.EXACT, type: (ETY.SIMPLE_ROBE + ' (Unmarked)'), weight: 10}
  ],
  receivesPool: [
    {specificity: RSP.EXACT, type: RTY.REEDS, weight: 100},
    {specificity: RSP.EXACT, type: RTY.THATCH, weight: 100},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 50},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 50}
  ]
});

tradingPartnerTypes[TRADING_PARTNERS.RED_CROW_TRADERS] = new TradingPartnerType({
  name: TRADING_PARTNERS.RED_CROW_TRADERS,
  description: ('They\'re loud, rowdy, and argumentative; based on the rumours '
    + 'you\'ve heard, "Red Crow Raiders" would be a more accurate name.'),
  icon: {provider: 'FontAwesome5', name: 'crow'},
  foregroundColor: '#ff2626',
  backgroundColor: '#4a0000',
  paddingHorizontal: 8,
  paddingVertical: 8,
  acceptQuantity: 100,
  givesPool: [
    {specificity: RSP.EXACT, type: RTY.WOOD_OAK, weight: 200},
    {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, weight: 100},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED, weight: 100},
    {specificity: RSP.EXACT, type: RTY.GREENISH_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.DUSTY_ORE, weight: 50},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, weight: 50},
    {specificity: RSP.EXACT, type: RTY.SALT, weight: 50},
    {specificity: RSP.EXACT, type: (ETY.ROUGH_MATTOCK + ' (Unmarked)'), weight: 20},
    {specificity: RSP.EXACT, type: (ETY.JOURNEYMANS_HAVERSACK + ' (Unmarked)'),
      weight: 10}
  ],
  receivesPool: [
    {specificity: RSP.CATEGORY, type: RCA.ARTISAN_GOOD, weight: 100},
    {specificity: RSP.CATEGORY, type: RCA.MATERIAL_REFINED, weight: 100},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 50},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 50}
  ]
});

export { tradingPartnerTypes };
