import TradingStatus from '../models/trading_status';
import TradingPartner from '../models/trading_partner';
import { tradingPartnerTypes } from './trading_partner_types';
import { vaultStarting } from './vault';
import { TRADING_PARTNERS } from '../enums/trading_partners';

let tradingPartners: { [name: string] : TradingPartner } = {};
tradingPartners[TRADING_PARTNERS.ASCETICS] =
  tradingPartnerTypes[TRADING_PARTNERS.ASCETICS].createTradingPartner(vaultStarting);

let tradingStatusStarting = new TradingStatus({ tradingPartners });

export { tradingStatusStarting };
