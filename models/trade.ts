export default class Trade {
  id: string = '';
  tradingPartnerType: string = '';
  give: {type: string, quantity: number} = { type: '', quantity: 0 };
  receive: {specificity: string, type: string} = { specificity: '', type: '' };

  constructor(trade: Trade) {
    Object.assign(this, trade);
  }
}
