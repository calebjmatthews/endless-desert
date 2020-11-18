import TradingStatus from '../models/trading_status';
import { tradingStatusStarting } from '../instances/trading_status';
import { ADD_PENDING_TRADING_PARTNER, WELCOME_PENDING_TRADING_PARTNER,
  DISMISS_TRADING_PARTNER, COMPLETE_TRADE } from '../actions/trading_status';

export default function (tradingStatus: TradingStatus = tradingStatusStarting,
  action: any = null) {
	switch(action.type) {
    case ADD_PENDING_TRADING_PARTNER:
    let newAPTPTradingStatus = new TradingStatus(tradingStatus);
    newAPTPTradingStatus.addPendingTradingPartner(action.tradingPartner);
    return newAPTPTradingStatus;

    case WELCOME_PENDING_TRADING_PARTNER:
    let newWPTPTradingStatus = new TradingStatus(tradingStatus);
    newWPTPTradingStatus.welcomePendingTradingPartner();
    return newWPTPTradingStatus;

    case DISMISS_TRADING_PARTNER:
    let newDTPTradingStatus = new TradingStatus(tradingStatus);
    newDTPTradingStatus.dismissTradingPartner(action.tradingPartner);
    return newDTPTradingStatus;

    case COMPLETE_TRADE:
    let newCTTradingStatus = new TradingStatus(tradingStatus);
    newCTTradingStatus.completeTrade(action.traded);
    return newCTTradingStatus;

		default:
		return tradingStatus;
	}
};
