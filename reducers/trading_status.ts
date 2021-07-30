import TradingStatus from '../models/trading_status';
import { tradingStatusStarting } from '../instances/trading_status';
import { SET_TRADING_STATUS, ADD_PENDING_TRADING_PARTNER,
  WELCOME_PENDING_TRADING_PARTNER, DISMISS_TRADING_PARTNER, COMPLETE_TRADE,
  TALK_TO } from '../actions/trading_status';

export default function (tradingStatus: TradingStatus = tradingStatusStarting,
  action: any = null) {
	switch(action.type) {
    case SET_TRADING_STATUS:
    return new TradingStatus(action.tradingStatus);

    case ADD_PENDING_TRADING_PARTNER:
    let newAPTPTradingStatus = new TradingStatus(tradingStatus);
    newAPTPTradingStatus.addPendingTradingPartnerVisit(action.tradingPartnerVisit);
    return newAPTPTradingStatus;

    case WELCOME_PENDING_TRADING_PARTNER:
    let newWPTPTradingStatus = new TradingStatus(tradingStatus);
    newWPTPTradingStatus.welcomePendingTradingPartnerVisit();
    return newWPTPTradingStatus;

    case DISMISS_TRADING_PARTNER:
    let newDTPTradingStatus = new TradingStatus(tradingStatus);
    newDTPTradingStatus.dismissTradingPartnerVisit(action.tradingPartnerVisit);
    return newDTPTradingStatus;

    case COMPLETE_TRADE:
    let newCTTradingStatus = new TradingStatus(tradingStatus);
    newCTTradingStatus.completeTrade(action.traded);
    return newCTTradingStatus;

    case TALK_TO:
    let newITTradingStatus = new TradingStatus(tradingStatus);
    newITTradingStatus.talkTo(action.typeName);
    return newITTradingStatus;

		default:
		return tradingStatus;
	}
};
