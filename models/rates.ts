import Rate from './rate';

export default class Rates {
  productionRates: Rate = {};
  consumptionRates: Rate = {};
  buildingRates: { [buildingId: string] : Rate } = {};
  bGroupRates: { [typeName: string] : Rate } = {};
  netRates: Rate = {};
  exhaustions: { [typeQuality: string] : number } = {};
  soonestExhaustion: number|null = null;

  constructor(rates: Rates) {
    Object.assign(this, rates);
  }
};
