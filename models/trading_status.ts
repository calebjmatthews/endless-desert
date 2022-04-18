import TradingPartnerVisit from './trading_partner_visit';
import TradingPartner from './trading_partner';
import Trade from './trade';
import Resource from './resource';
import { tradingPartnerTypes } from '../instances/trading_partner_types';
import { utils } from '../utils';

export default class TradingStatus implements TradingStatusInterface {
  tradingPartners: { [name: string] : TradingPartner } = {};
  visits: TradingPartnerVisit[]|null[] = [];
  visitsPending: TradingPartnerVisit[]|null[] = [];
  visitSlots: number = 1;
  namesUpcoming: string[] = [];

  constructor(tradingStatus: TradingStatusInterface) {
    let tradingPartners: { [name: string] : TradingPartner } = {};
    Object.keys(tradingStatus.tradingPartners).forEach((name) => {
      tradingPartners[name] =
        new TradingPartner(tradingStatus.tradingPartners[name]);
    });
    const visits = tradingStatus.visits?.length > 0 ?
      tradingStatus.visits.map((visit) => new TradingPartnerVisit(visit)) : [];
    const visitsPending = tradingStatus.visitsPending?.length > 0 ?
      tradingStatus.visitsPending.map((visit) => new TradingPartnerVisit(visit)) : [];
    const visitSlots = tradingStatus.visitSlots || 1;
    const namesUpcoming = (tradingStatus.namesUpcoming?.length > 0) ?
      tradingStatus.namesUpcoming :
      utils.shuffle(Object.keys(tradingStatus.tradingPartners));

    Object.assign(this, { tradingPartners, visits, visitsPending, visitSlots,
      namesUpcoming });
  }

  handleNewPendingVisit() {
    const nameUpcoming = this.namesUpcoming[0];
    let newNamesUpcoming = this.namesUpcoming.slice(1);
    if (newNamesUpcoming.length === 0) {
      newNamesUpcoming = utils.shuffle(Object.keys(this.tradingPartners));
    }
    const tPartner = this.tradingPartners[nameUpcoming];
    const visit = tradingPartnerTypes[nameUpcoming].createTradingPartnerVisit(tPartner);
    return { visit, newNamesUpcoming };
  }

  welcomePendingVisit(slot: number) {
    this.visits[slot] = this.visitsPending[slot];
  }

  dismissTradingPartnerVisit(slot: number) {
    this.visits[slot] = null;
  }

  completeTrade(completedTrade: {
    id: string,
    slot: number,
    given: Resource,
    received: Resource
  }) {
    const visit = this.visits[completedTrade.slot];
    if (visit !== null) {
      const tradesRemaining = visit.getTradesRemaining();
      if (tradesRemaining <= 1) {
        this.increaseTrust(completedTrade.slot, 9);
      }
      else {
        this.increaseTrust(completedTrade.slot, 3);
      }
      visit.traded[completedTrade.id] = completedTrade;
    }
  }

  talkTo(slot: number) {
    const visit = this.visits[slot];
    if (visit !== null) {
      if (!visit.talkedTo) {
        this.increaseTrust(slot, 2);
        visit.talkedTo = true;
      }
      else {
        console.log('Already talked to!');
      }
    }
  }

  increaseTrust(slot: number, amount: number) {
    const visit = this.visits[slot];
    if (visit !== null) {
      const newTrust = this.tradingPartners[visit.name].trust + amount;
      if (newTrust < tradingPartnerTypes[visit.name].maxTrust) {
        this.tradingPartners[visit.name].trust = newTrust;
      }
    }
  }

  handleIncreaseSlots() {
    this.visitSlots++;
    const { visit, newNamesUpcoming } = this.handleNewPendingVisit();
    this.visits[this.visitSlots-1] = null;
    this.visitsPending[this.visitSlots-1] = visit;
    this.namesUpcoming = newNamesUpcoming;
  }
}

interface TradingStatusInterface {
  tradingPartners: { [name: string] : TradingPartner };
  visits: TradingPartnerVisit[]|null[];
  visitsPending: TradingPartnerVisit[]|null[];
  visitSlots: number;
  namesUpcoming: string[];
}
