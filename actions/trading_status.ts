import TradingPartner from '../models/trading_partner';
import Trade from '../models/trade';

export const ADD_TRADING_PARTNER = 'ADD_TRADING_PARTNER';
export function addTradingPartner(tradingPartner: TradingPartner) {
  return {
    type: ADD_TRADING_PARTNER,
    tradingPartner: tradingPartner
  }
}

export const DISMISS_TRADING_PARTNER = 'DISMISS_TRADING_PARTNER';
export function dismissTradingPartner(tradingPartner: TradingPartner) {
  return {
    type: ADD_TRADING_PARTNER,
    tradingPartner: tradingPartner
  }
}

export const COMPLETE_TRADE = 'COMPLETE_TRADE';
export function completeTrade(trade: Trade) {
  return {
    type: COMPLETE_TRADE,
    trade: trade
  }
}
