import Trade from './trade';
import Resource from './resource';

export default class TradingPartnerVisit implements TradingPartnerVisitInterface {
  name: string = '';
  trades: { [id: string] : Trade } = {};
  acceptQuantity: number = 0;
  traded: { [id: string] : {given: Resource, received: Resource} } = {};
  arrived: Date = new Date(Date.now());
  talkedTo: boolean = false;

  constructor(tradingPartnerVisit: TradingPartnerVisitInterface|null) {
    if (tradingPartnerVisit !== null) {
      Object.assign(this, tradingPartnerVisit);
    }
  }

  getTradesRemaining() {
    return Object.keys(this.trades).length - Object.keys(this.traded).length;
  }
}

interface TradingPartnerVisitInterface {
  name: string;
  trades: { [id: string] : Trade };
  acceptQuantity: number;
  traded: { [id: string] : {given: Resource, received: Resource} };
  arrived: Date;
  talkedTo: boolean;
}
