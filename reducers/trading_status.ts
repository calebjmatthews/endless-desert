import TradingStatus from '../models/trading_status';
import { tradingStatusStarting } from '../instances/trading_status';
import { ADD_TRADING_PARTNER, DISMISS_TRADING_PARTNER, COMPLETE_TRADE }
  from '../actions/trading_status';

export default function (tradingStatus: TradingStatus = tradingStatusStarting,
  action: any = null) {
	switch(action.type) {
    case ADD_TRADING_PARTNER:
    let newATPTradingStatus = new TradingStatus(tradingStatus);
    newATPTradingStatus.addTradingPartner(action.tradingPartner);
    return newATPTradingStatus;

    case COMPLETE_TRADE:
    let newCTTradingStatus = new TradingStatus(tradingStatus);
    newCTTradingStatus.completeTrade(action.trade);
    return newCTTradingStatus;

    case DISMISS_TRADING_PARTNER:
    let newDTPTradingStatus = new TradingStatus(tradingStatus);
    newDTPTradingStatus.dismissTradingPartner(action.tradingPartner);
    return newDTPTradingStatus;

		default:
		return tradingStatus;
	}
};
