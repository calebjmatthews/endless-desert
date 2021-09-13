import TradingPartnerVisit from './trading_partner_visit';
import TradingPartner from './trading_partner';
import Trade from './trade';
import Resource from './resource';
import { tradingPartnerTypes } from '../instances/trading_partner_types';
import { utils } from '../utils';

export default class TradingStatus implements TradingStatusInterface {
  tradingPartners: { [name: string] : TradingPartner } = {};
  tradingPartnerVisits: { [name: string] : TradingPartnerVisit } = {};
  tpPending: TradingPartnerVisit[] = [];

  constructor(tradingStatus: TradingStatusInterface) {
    let tradingPartners: { [name: string] : TradingPartner } = {};
    Object.keys(tradingStatus.tradingPartners).map((name) => {
      tradingPartners[name] =
        new TradingPartner(tradingStatus.tradingPartners[name]);
    });

      let tradingPartnerVisits: { [name: string] : TradingPartnerVisit } = {};
      Object.keys(tradingStatus.tradingPartnerVisits).map((name) => {
        tradingPartnerVisits[name] =
          new TradingPartnerVisit(tradingStatus.tradingPartnerVisits[name]);
      });
    const tpPending: TradingPartnerVisit[] = tradingStatus.tpPending.map((tp) => {
      return new TradingPartnerVisit(tp);
    })
    Object.assign(this, { tradingPartners, tradingPartnerVisits, tpPending });
  }

  createPendingTradingPartnerVisit() {
    const tpName = selectTradingPartnerVisit(this.tradingPartners,
      this.tpPending);
    const tPartner = this.tradingPartners[tpName];
    return tradingPartnerTypes[tpName].createTradingPartnerVisit(tPartner);

    function selectTradingPartnerVisit(tradingPartners:
      { [name: string] : TradingPartner },
      tpPending: TradingPartnerVisit[]) {
      const tps = Object.keys(tradingPartners);
      const ftps = tps.filter((tradingPartnerName) => {
        if (!utils.arrayIncludes(tpPending, tradingPartnerName)) {
          return tradingPartnerName;
        }
      });
      return ftps[Math.floor(utils.random() * ftps.length)];
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
    if (this.tradingPartnerVisits[traded.tradingPartnerType].getTradesRemaining() <= 1) {
      this.increaseTrust(traded.tradingPartnerType, 9);
    }
    else {
      this.increaseTrust(traded.tradingPartnerType, 3);
    }
    this.tradingPartnerVisits[traded.tradingPartnerType].traded[traded.id] = traded;
  }

  talkTo(typeName: string) {
    if (!this.tradingPartnerVisits[typeName].talkedTo) {
      this.increaseTrust(typeName, 2);
      this.tradingPartnerVisits[typeName].talkedTo = true;
    }
    else {
      console.log('Already talked to!');
    }
  }

  increaseTrust(typeName: string, amount: number) {
    const newTrust = this.tradingPartners[typeName].trust + amount;
    if (newTrust < tradingPartnerTypes[typeName].maxTrust) {
      this.tradingPartners[typeName].trust = newTrust;
    }
  }
}

interface TradingStatusInterface {
  tradingPartners: { [name: string] : TradingPartner };
  tradingPartnerVisits: { [name: string] : TradingPartnerVisit };
  tpPending: TradingPartnerVisit[];
}
