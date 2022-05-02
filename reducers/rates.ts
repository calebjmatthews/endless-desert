import { SET_RATES } from '../actions/rates';
import Rates from '../models/rates';

export default function (rates: Rates = { productionRates: {}, consumptionRates: {},
  buildingRates: {}, bGroupRates: {}, netRates: {}}, action: any = null) {
	switch(action.type) {
    case SET_RATES:
    let newRates = Object.assign({}, action.rates);
    return newRates;
    break;

		default:
		return rates;
	}
};

interface Rate { [typeQuality: string] : number };
