import TradingPartner from '../models/trading_partner';
import Trade from '../models/trade';

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
export function completeTrade(traded: {
  id: string,
  tradingPartnerType: string,
  given: { type: string, quantity: number },
  received: { type: string, quantity: number }
}) {
  return {
    type: COMPLETE_TRADE,
    traded: traded
  }
}
