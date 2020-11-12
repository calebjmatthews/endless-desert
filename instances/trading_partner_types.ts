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

// name: string = '';
// description: string = '';
// icon: {provider: string, name: string} = {provider: '', name: ''};
// foregroundColor: string = '#000';
// backgroundColor: string = '#fff';
// tradeValue: number = 0;
// givesPool: {specificity: string, type: string, weight: number}[] = [];
// receivesPool: {specificity: string, type: string, weight: number}[] = [];
tradingPartnerTypes[TRADING_PARTNERS.ASCETICS] = new TradingPartnerType({
  name: TRADING_PARTNERS.ASCETICS,
  description: ('Journeying ascetics on a pilgrimage to a sea of blue-green fire. '
    + 'Will trade materials they\'ve picked up in their travels for simple food '
    + 'and drink.'),
  icon: {provider: 'FontAwesome', name: 'fire'},
  foregroundColor: '#84f9e4',
  backgroundColor: '#008a71',
  tradeValue: 200,
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

export { tradingPartnerTypes };
