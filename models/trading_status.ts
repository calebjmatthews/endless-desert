import TradingPartner from './trading_partner';
import Trade from './trade';
import Resource from './resource';
import { tradingPartnerTypes } from '../instances/trading_partner_types';
import { utils } from '../utils';

export default class TradingStatus implements TradingStatusInterface {
  tradingPartners: { [name: string] : TradingPartner } = {};
  tpPending: TradingPartner[] = [];

  constructor(tradingStatus: TradingStatusInterface) {
    Object.assign(this, tradingStatus);
  }

  createPendingTradingPartner() {
    let tpName = selectTradingPartner(this.tradingPartners);
    return tradingPartnerTypes[tpName].createTradingPartner();

    function selectTradingPartner(ctps: { [name: string] : TradingPartner }) {
      let tps = Object.keys(tradingPartnerTypes);
      return tps[Math.floor(utils.random() * tps.length)];
    }
  }

  addPendingTradingPartner(tradingPartner: TradingPartner) {
    this.tpPending.push(tradingPartner);
  }

  welcomePendingTradingPartner() {
    let tradingPartner = this.tpPending[0];
    this.tradingPartners[tradingPartner.name] = tradingPartner;
    this.tpPending = this.tpPending.slice(1);
  }

  dismissTradingPartner(tradingPartner: TradingPartner) {
    delete this.tradingPartners[tradingPartner.name];
  }

  completeTrade(traded: {
    id: string,
    tradingPartnerType: string,
    given: Resource,
    received: Resource
  }) {
    this.tradingPartners[traded.tradingPartnerType].traded[traded.id] = traded;
  }
}

interface TradingStatusInterface {
  tradingPartners: { [name: string] : TradingPartner };
  tpPending: TradingPartner[];
}
