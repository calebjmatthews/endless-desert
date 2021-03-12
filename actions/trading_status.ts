import TradingPartner from '../models/trading_partner';
import Trade from '../models/trade';
import TradingStatus from '../models/trading_status';
import Resource from '../models/resource';

export const SET_TRADING_STATUS = 'SET_TRADING_STATUS';
export function setTradingStatus(tradingStatus: TradingStatus) {
  return {
    type: SET_TRADING_STATUS,
    tradingStatus: tradingStatus
  }
}

export const ADD_PENDING_TRADING_PARTNER = 'ADD_PENDING_TRADING_PARTNER';
export function addPendingTradingPartner(tradingPartner: TradingPartner) {
  return {
    type: ADD_PENDING_TRADING_PARTNER,
    tradingPartner: tradingPartner
  }
}

export const WELCOME_PENDING_TRADING_PARTNER = 'WELCOME_PENDING_TRADING_PARTNER';
export function welcomePendingTradingPartner() {
  return {
    type: WELCOME_PENDING_TRADING_PARTNER
  }
}

export const DISMISS_TRADING_PARTNER = 'DISMISS_TRADING_PARTNER';
export function dismissTradingPartner(tradingPartner: TradingPartner) {
  return {
    type: DISMISS_TRADING_PARTNER,
    tradingPartner: tradingPartner
  }
}

export const COMPLETE_TRADE = 'COMPLETE_TRADE';
export function completeTrade(traded: {id: string, tradingPartnerType: string,
  given: Resource, received: Resource}) {
  return {
    type: COMPLETE_TRADE,
    traded: traded
  }
}
