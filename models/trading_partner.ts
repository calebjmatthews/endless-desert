export default class TradingPartner implements TradingPartnerInterface {
  name: string = '';
  trades: { give: {type: string, quantity: number},
    receive: {specificity: string, type: string} }[] = [];
  traded: { [typeName: string] : boolean } = {};

  constructor(tradingPartner: TradingPartnerInterface) {
    Object.assign(this, tradingPartner);
  }
}

interface TradingPartnerInterface {
  name: string;
  trades: { give: {type: string, quantity: number},
    receive: {specificity: string, type: string} }[];
  traded: { [typeName: string] : boolean };
}
