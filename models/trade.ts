import Resource from './resource';

export default class Trade {
  id: string = '';
  tradingPartnerType: string = '';
  give: Resource = { type: '', quality: 0, quantity: 0 };
  receive: {specificity: string, type: string} = { specificity: '', type: '' };

  constructor(trade: Trade) {
    Object.assign(this, trade);
  }
}
