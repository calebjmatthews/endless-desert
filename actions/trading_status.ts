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

export const ADD_PENDING_VISIT = 'ADD_PENDING_VISIT';
export function addPendingVisit(visit: TradingPartnerVisit, slot: number) {
  return {
    type: ADD_PENDING_VISIT,
    visit,
    slot
  }
}

export const SET_UPCOMING_TRADING_PARTNER_NAMES = "SET_UPCOMING_TRADING_PARTNER_NAMES";
export function setUpcomingTradingPartnerNames(namesUpcoming: string[]) {
  return {
    type: SET_UPCOMING_TRADING_PARTNER_NAMES,
    namesUpcoming
  }
}

export const WELCOME_PENDING_VISIT = 'WELCOME_PENDING_VISIT';
export function welcomePendingVisit(slot: number) {
  return {
    type: WELCOME_PENDING_VISIT,
    slot
  }
}

export const DISMISS_TRADING_PARTNER = 'DISMISS_TRADING_PARTNER';
export function dismissTradingPartnerVisit(slot: number) {
  return {
    type: DISMISS_TRADING_PARTNER,
    slot
  }
}

export const COMPLETE_TRADE = 'COMPLETE_TRADE';
export function completeTrade(traded: {id: string, slot: number,
  given: Resource, received: Resource}) {
  return {
    type: COMPLETE_TRADE,
    traded: traded
  }
}

export const TALK_TO = 'TALK_TO';
export function talkTo(slot: number) {
  return {
    type: TALK_TO,
    slot
  }
}

export const HANDLE_INCREASE_SLOTS = 'HANDLE_INCREASE_SLOTS';
export function handleIncreaseSlots() {
  return {
    type: HANDLE_INCREASE_SLOTS
  }
}
