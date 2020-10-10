import Vault from '../models/vault';
import Resource from '../models/resource';

export const SET_RATES = 'SET_RATES';
export function setRates(rates: { productionRates: Rate, consumptionRates: Rate,
  netRates: Rate }) {
  return {
    type: SET_RATES,
    rates: rates
  }
}

interface Rate { [resourceName: string] : number };
