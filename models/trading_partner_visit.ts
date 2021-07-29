import Trade from './trade';
import Resource from './resource';

export default class TradingPartnerVisit implements TradingPartnerVisitInterface {
  name: string = '';
  trades: { [id: string] : Trade } = {};
  acceptQuantity: number = 0;
  traded: { [id: string] : {given: Resource, received: Resource} } = {};
  arrived: Date = new Date(Date.now());

  constructor(tradingPartnerVisit: TradingPartnerVisitInterface) {
    Object.assign(this, tradingPartnerVisit);
  }
}

interface TradingPartnerVisitInterface {
  name: string;
  trades: { [id: string] : Trade };
  acceptQuantity: number;
  traded: { [id: string] : {given: Resource, received: Resource} };
  arrived: Date;
}
