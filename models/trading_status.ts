import TradingPartnerVisit from './trading_partner_visit';
import Trade from './trade';
import Resource from './resource';
import { tradingPartnerTypes } from '../instances/trading_partner_types';
import { utils } from '../utils';

export default class TradingStatus implements TradingStatusInterface {
  tradingPartnerVisits: { [name: string] : TradingPartnerVisit } = {};
  tpPending: TradingPartnerVisit[] = [];

  constructor(tradingStatus: TradingStatusInterface) {
    Object.assign(this, tradingStatus);
  }

  createPendingTradingPartnerVisit() {
    let tpName = selectTradingPartnerVisit(this.tradingPartnerVisits);
    return tradingPartnerTypes[tpName].createTradingPartnerVisit();

    function selectTradingPartnerVisit(ctps: { [name: string] : TradingPartnerVisit }) {
      let tps = Object.keys(tradingPartnerTypes);
      return tps[Math.floor(utils.random() * tps.length)];
    }
  }

  addPendingTradingPartnerVisit(tradingPartner: TradingPartnerVisit) {
    this.tpPending.push(tradingPartner);
  }

  welcomePendingTradingPartnerVisit() {
    let tradingPartner = this.tpPending[0];
    this.tradingPartnerVisits[tradingPartner.name] = tradingPartner;
    this.tpPending = this.tpPending.slice(1);
  }

  dismissTradingPartnerVisit(tradingPartner: TradingPartnerVisit) {
    delete this.tradingPartnerVisits[tradingPartner.name];
  }

  completeTrade(traded: {
    id: string,
    tradingPartnerType: string,
    given: Resource,
    received: Resource
  }) {
    this.tradingPartnerVisits[traded.tradingPartnerType].traded[traded.id] = traded;
  }
}

interface TradingStatusInterface {
  tradingPartnerVisits: { [name: string] : TradingPartnerVisit };
  tpPending: TradingPartnerVisit[];
}
