import TradingPartner from './trading_partner';
import Trade from './trade';

export default class TradingStatus implements TradingStatusInterface {
  tradingPartners: { [name: string] : TradingPartner } = {};

  constructor(tradingStatus: TradingStatusInterface) {
    Object.assign(this, tradingStatus);
  }

  addTradingPartner(tradingPartner: TradingPartner) {
    this.tradingPartners[tradingPartner.name] = tradingPartner;
  }

  dismissTradingPartner(tradingPartner: TradingPartner) {
    delete this.tradingPartners[tradingPartner.name];
  }

  completeTrade(traded: {
    id: string,
    tradingPartnerType: string,
    given: { type: string, quantity: number },
    received: { type: string, quantity: number }
  }) {
    this.tradingPartners[traded.tradingPartnerType].traded[traded.id] = traded;
  }
}

interface TradingStatusInterface {
  tradingPartners: { [name: string] : TradingPartner };
}
