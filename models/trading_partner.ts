import Trade from './trade';

export default class TradingPartner implements TradingPartnerInterface {
  name: string = '';
  trades: { [id: string] : Trade } = {};
  traded: { [id: string] : {given: { type: string, quantity: number },
    received: { type: string, quantity: number }} } = {};
  arrived: Date = new Date(Date.now());

  constructor(tradingPartner: TradingPartnerInterface) {
    Object.assign(this, tradingPartner);
  }
}

interface TradingPartnerInterface {
  name: string;
  trades: { [id: string] : Trade };
  traded: { [id: string] : {given: { type: string, quantity: number },
    received: { type: string, quantity: number }} };
  arrived: Date;
}
