import Rate from './rate';

export default class Rates {
  productionRates: Rate = {};
  consumptionRates: Rate = {};
  buildingRates: { [buildingId: string] : Rate } = {};
  bGroupRates: { [typeName: string] : Rate } = {};
  netRates: Rate = {};
  leaderRates: { [leaderId: string] : Rate } = {};
  exhaustions: { [typeQuality: string] : number } = {};
  soonestExhaustion: number|null = null;

  constructor(rates: Rates|null) {
    if (rates) {
      Object.assign(this, rates);
    }
  }
};
