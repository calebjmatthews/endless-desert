export const SET_RATES = 'SET_RATES';
export function setRates(rates: { productionRates: Rate, consumptionRates: Rate,
  buildingRates: { [buildingId: string] : Rate },
  bGroupRates: { [typeName: string] : Rate }, netRates: Rate }) {
  return {
    type: SET_RATES,
    rates: rates
  }
}

interface Rate { [typeQuality: string] : number };
