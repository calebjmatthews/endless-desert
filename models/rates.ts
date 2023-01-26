import Rate from './rate';

export default class Rates {
  productionRates: Rate = {};
  consumptionRates: Rate = {};
  buildingRates: { [buildingId: string] : Rate } = {};
  buildingAllRates: { [buildingId: string] : Rate } = {};
  recipesRates: { [buildingId: string] : Rate[] } = {};
  bGroupRates: { [typeName: string] : Rate } = {};
  netRates: Rate = {};
  leaderRates: { [leaderId: string] : Rate } = {};
  exhaustions: { [typeQuality: string] : number } = {};
  soonestExhaustion: number|null = null;
  problems: { [buildingId: string] : string[] }  = {};
  buildingsToRest: string[] = [];

  constructor(rates: RatesInterface|null) {
    if (rates) {
      Object.assign(this, rates);
    }
  }
};

interface RatesInterface {
  productionRates?: Rate;
  consumptionRates?: Rate;
  buildingRates?: { [buildingId: string] : Rate };
  buildingAllRates?: { [buildingId: string] : Rate };
  recipesRates?: { [buildingId: string] : Rate[] };
  bGroupRates?: { [typeName: string] : Rate };
  netRates?: Rate;
  leaderRates?: { [leaderId: string] : Rate };
  exhaustions?: { [typeQuality: string] : number };
  soonestExhaustion?: number|null;
  problems?: { [buildingId: string] : string[] } ;
  buildingsToRest?: string[];
}