import TradingPartnerType from '../models/trading_partner_type';
import { TRADING_PARTNERS } from '../enums/trading_partners';
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_TAGS } from '../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
const RCA = RESOURCE_CATEGORIES;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;

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
  tradeValue: 800,
  givesPool: [
    {specificity: RSP.TAG, type: RTA.WOOD, weight: 100},
    {specificity: RSP.TAG, type: RTA.CLAY, weight: 100},
    {specificity: RSP.TAG, type: RTA.SAND, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SEEDS, weight: 100},
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
  tradeValue: 1200,
  givesPool: [
    {specificity: RSP.TAG, type: RTA.WOOD, weight: 100},
    {specificity: RSP.EXACT, type: RTY.SEEDS, weight: 100},
    {specificity: RSP.EXACT, type: RTY.GRAIN, weight: 100},
    {specificity: RSP.EXACT, type: RTY.LENTILS, weight: 50}
  ],
  receivesPool: [
    {specificity: RSP.EXACT, type: RTY.REEDS, weight: 100},
    {specificity: RSP.EXACT, type: RTY.GLASS, weight: 100},
    {specificity: RSP.TAG, type: RTA.FOOD, weight: 50},
    {specificity: RSP.TAG, type: RTA.DRINK, weight: 50}
  ]
});

export { tradingPartnerTypes };
