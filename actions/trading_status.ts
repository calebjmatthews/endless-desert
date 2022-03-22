import TradingPartnerVisit from '../models/trading_partner_visit';
import Trade from '../models/trade';
import TradingStatus from '../models/trading_status';
import Resource from '../models/resource';

export const SET_TRADING_STATUS = 'SET_TRADING_STATUS';
export function setTradingStatus(tradingStatus: TradingStatus) {
  const newTradingStatus = new TradingStatus(tradingStatus);
  return {
    type: SET_TRADING_STATUS,
    tradingStatus: newTradingStatus
  }
}

export const TRADING_PARTNER_JOINS = 'TRADING_PARTNER_JOINS';
export function tradingPartnerJoins(name: string) {
  return {
    type: TRADING_PARTNER_JOINS,
    name
  }
}

export const ADD_PENDING_TRADING_PARTNER = 'ADD_PENDING_TRADING_PARTNER';
export function addPendingTradingPartnerVisit(tradingPartnerVisit: TradingPartnerVisit) {
  return {
    type: ADD_PENDING_TRADING_PARTNER,
    tradingPartnerVisit: tradingPartnerVisit
  }
}

export const WELCOME_PENDING_TRADING_PARTNER = 'WELCOME_PENDING_TRADING_PARTNER';
export function welcomePendingTradingPartnerVisit() {
  return {
    type: WELCOME_PENDING_TRADING_PARTNER
  }
}

export const DISMISS_TRADING_PARTNER = 'DISMISS_TRADING_PARTNER';
export function dismissTradingPartnerVisit(tradingPartnerVisit: TradingPartnerVisit) {
  return {
    type: DISMISS_TRADING_PARTNER,
    tradingPartnerVisit: tradingPartnerVisit
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

export const TALK_TO = 'TALK_TO';
export function talkTo(typeName: string) {
  return {
    type: TALK_TO,
    typeName: typeName
  }
}
