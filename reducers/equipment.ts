import { SET_EQUIPMENT } from '../actions/equipment';

import Equipment from '../models/equipment';
import { equipmentStarting } from '../instances/leaders';

export default function (equipment: { [id: string] : Equipment } = equipmentStarting,
  action: any = null) {
	switch(action.type) {
    case SET_EQUIPMENT:
    return Object.assign({}, action.equipment);

		default:
		return equipment;
	}
};
