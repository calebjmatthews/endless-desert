import Rates from '../models/rates';

export const SET_RATES = 'SET_RATES';
export function setRates(rates: Rates ) {
  return {
    type: SET_RATES,
    rates: rates
  }
}

interface Rate { [typeQuality: string] : number };
