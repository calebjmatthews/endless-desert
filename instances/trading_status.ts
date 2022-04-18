import TradingStatus from '../models/trading_status';
import TradingPartner from '../models/trading_partner';
import TradingPartnerVisit from '../models/trading_partner_visit';
import { tradingPartnerTypes } from './trading_partner_types';
import { vaultStarting } from './vault';
import { TRADING_PARTNERS } from '../enums/trading_partners';
const TP = TRADING_PARTNERS;

let tradingPartners: { [name: string] : TradingPartner } = {};
const tradingPartnerTypeNames = [TP.FOXFIRE_ASCETICS, TP.TREFOIL_ISLANDS,
  TP.RED_CROW_TRADERS];
tradingPartnerTypeNames.forEach((typeName) => {
  tradingPartners[typeName] = new TradingPartner({
    name: typeName,
    unlocked: true,
    trust: tradingPartnerTypes[typeName].initialTrust
  });
});

const visitsPending = [tradingPartnerTypes[TP.FOXFIRE_ASCETICS]
  .createTradingPartnerVisit(tradingPartners[TP.FOXFIRE_ASCETICS])];

let tradingStatusStarting = new TradingStatus({
  tradingPartners,
  visits: [],
  visitsPending,
  visitSlots: 1,
  namesUpcoming: []
});

export { tradingStatusStarting };
