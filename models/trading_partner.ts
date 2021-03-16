import Trade from './trade';
import Resource from './resource';

export default class TradingPartner implements TradingPartnerInterface {
  name: string = '';
  trades: { [id: string] : Trade } = {};
  acceptQuantity: number = 0;
  traded: { [id: string] : {given: Resource, received: Resource} } = {};
  arrived: Date = new Date(Date.now());

  constructor(tradingPartner: TradingPartnerInterface) {
    Object.assign(this, tradingPartner);
  }
}

interface TradingPartnerInterface {
  name: string;
  trades: { [id: string] : Trade };
  acceptQuantity: number;
  traded: { [id: string] : {given: Resource, received: Resource} };
  arrived: Date;
}
