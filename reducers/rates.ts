import { SET_RATES } from '../actions/rates';
import { buildingsStarting } from '../instances/buildings';

export default function (rates: { productionRates: Rate, consumptionRates: Rate,
  buildingRates: { [buildingId: string] : Rate },
  bGroupRates: { [typeName: string] : Rate }, netRates: Rate } = { productionRates: {}, consumptionRates: {}, buildingRates: {}, bGroupRates: {}, netRates: {}},
  action: any = null) {
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
