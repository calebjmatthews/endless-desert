import TradingStatus from '../models/trading_status';
import TradingPartner from '../models/trading_partner';
import { tradingStatusStarting } from '../instances/trading_status';
import { SET_TRADING_STATUS, TRADING_PARTNER_JOINS, ADD_PENDING_VISIT,
  SET_UPCOMING_TRADING_PARTNER_NAMES, WELCOME_PENDING_VISIT,
  DISMISS_TRADING_PARTNER, COMPLETE_TRADE, TALK_TO, HANDLE_INCREASE_SLOTS }
  from '../actions/trading_status';

export default function (tradingStatus: TradingStatus = tradingStatusStarting,
  action: any = null) {
	switch(action.type) {
    case SET_TRADING_STATUS:
    return new TradingStatus(action.tradingStatus);

    case TRADING_PARTNER_JOINS:
    let newTPJTradingStatus = new TradingStatus(tradingStatus);
    if (!tradingStatus.tradingPartners[action.name]) {
      newTPJTradingStatus.tradingPartners = { ...tradingStatus.tradingPartners,
        [action.name] : new TradingPartner({
          name: action.name,
          unlocked: true,
          trust: 0
        })
      }
    }
    return newTPJTradingStatus;

    case ADD_PENDING_VISIT:
    let newAPVTradingStatus = new TradingStatus(tradingStatus);
    newAPVTradingStatus.visitsPending[action.slot] = action.visit;
    return newAPVTradingStatus;

    case SET_UPCOMING_TRADING_PARTNER_NAMES:
    let newSUTPNTradingStatus = new TradingStatus(tradingStatus);
    newSUTPNTradingStatus.namesUpcoming = action.namesUpcoming.slice();
    return newSUTPNTradingStatus;

    case WELCOME_PENDING_VISIT:
    let newWPTPTradingStatus = new TradingStatus(tradingStatus);
    newWPTPTradingStatus.welcomePendingVisit(action.slot);
    return newWPTPTradingStatus;

    case DISMISS_TRADING_PARTNER:
    let newDTPTradingStatus = new TradingStatus(tradingStatus);
    newDTPTradingStatus.dismissTradingPartnerVisit(action.slot);
    return newDTPTradingStatus;

    case COMPLETE_TRADE:
    let newCTTradingStatus = new TradingStatus(tradingStatus);
    newCTTradingStatus.completeTrade(action.traded);
    return newCTTradingStatus;

    case TALK_TO:
    let newITTradingStatus = new TradingStatus(tradingStatus);
    newITTradingStatus.talkTo(action.slot);
    return newITTradingStatus;

    case HANDLE_INCREASE_SLOTS:
    let newHISTradingStatus = new TradingStatus(tradingStatus);
    newHISTradingStatus.handleIncreaseSlots();
    return newHISTradingStatus;

		default:
		return tradingStatus;
	}
};
