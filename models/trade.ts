import Resource from './resource';

export default class Trade {
  id: string = '';
  tradingPartnerType: string = '';
  give: { type: string, quality: number } = { type: '', quality: 0 };
  receive: {specificity: string, type: string} = { specificity: '', type: '' };

  constructor(trade: Trade) {
    Object.assign(this, trade);
  }
}
