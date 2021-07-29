import TradingStatus from '../models/trading_status';
import TradingPartnerVisit from '../models/trading_partner_visit';
import { tradingPartnerTypes } from './trading_partner_types';
import { vaultStarting } from './vault';
import { TRADING_PARTNERS } from '../enums/trading_partners';

let tradingPartnerVisits: { [name: string] : TradingPartnerVisit } = {};
tradingPartnerVisits[TRADING_PARTNERS.FOXFIRE_ASCETICS] =
  tradingPartnerTypes[TRADING_PARTNERS.FOXFIRE_ASCETICS].createTradingPartnerVisit();

let tpPending: TradingPartnerVisit[] = [];
tpPending.push(
  tradingPartnerTypes[TRADING_PARTNERS.KINGDOM_OF_TREFOIL].createTradingPartnerVisit());

let tradingStatusStarting = new TradingStatus({ tradingPartnerVisits, tpPending });

export { tradingStatusStarting };
