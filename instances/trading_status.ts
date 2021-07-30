import TradingStatus from '../models/trading_status';
import TradingPartner from '../models/trading_partner';
import TradingPartnerVisit from '../models/trading_partner_visit';
import { tradingPartnerTypes } from './trading_partner_types';
import { vaultStarting } from './vault';
import { TRADING_PARTNERS } from '../enums/trading_partners';
const TP = TRADING_PARTNERS;

let tradingPartners: { [name: string] : TradingPartner } = {};
const tradingPartnerTypeNames = [TP.FOXFIRE_ASCETICS, TP.KINGDOM_OF_TREFOIL,
  TP.RED_CROW_TRADERS];
tradingPartnerTypeNames.forEach((typeName) => {
  tradingPartners[typeName] = new TradingPartner({
    name: typeName,
    unlocked: true,
    trust: tradingPartnerTypes[typeName].initialTrust
  });
});

let tradingPartnerVisits: { [name: string] : TradingPartnerVisit } = {};
tradingPartnerVisits[TP.FOXFIRE_ASCETICS] = tradingPartnerTypes[TP.FOXFIRE_ASCETICS]
  .createTradingPartnerVisit(tradingPartners[TP.FOXFIRE_ASCETICS]);

let tpPending: TradingPartnerVisit[] = [];
tpPending.push(tradingPartnerTypes[TP.KINGDOM_OF_TREFOIL]
  .createTradingPartnerVisit(tradingPartners[TP.KINGDOM_OF_TREFOIL]));

let tradingStatusStarting = new TradingStatus({ tradingPartners, tradingPartnerVisits,
  tpPending });

export { tradingStatusStarting };
