import Resource from './resource';

export default class Trade {
  id: string = '';
  tradingPartnerType: string = '';
  give: { type: string, quality: number } = { type: '', quality: 0 };
  receive: {specificity: string, type: string} = { specificity: '', type: '' };
  multiplier: number = 1;

  constructor(trade: TradeInterface) {
    Object.assign(this, trade);
  }
}

interface TradeInterface {
  id: string;
  tradingPartnerType: string;
  give: { type: string, quality: number };
  receive: {specificity: string, type: string};
  multiplier?: number;
}
