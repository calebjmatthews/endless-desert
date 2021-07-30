export default class TradingPartner implements TradingPartnerInterface {
  name: string = '';
  unlocked: boolean = false;
  trust: number = 0;

  constructor(tradingPartner: TradingPartner) {
    Object.assign(this, tradingPartner);
  }
}

interface TradingPartnerInterface {
  name: string;
  unlocked: boolean;
  trust: number;
}
