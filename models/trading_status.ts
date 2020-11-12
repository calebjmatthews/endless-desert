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

  completeTrade(trade: Trade) {
    this.tradingPartners[trade.tradingPartnerType].traded[trade.id] = true;
  }
}

interface TradingStatusInterface {
  tradingPartners: { [name: string] : TradingPartner };
}
