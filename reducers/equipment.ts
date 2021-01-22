import { SET_EQUIPMENT, ADD_EQUIPMENT } from '../actions/equipment';

import Equipment from '../models/equipment';

let startingEquipment: { [id: string] : Equipment } = {};

export default function (equipment: { [id: string] : Equipment } = startingEquipment,
  action: any = null) {
	switch(action.type) {
    case SET_EQUIPMENT:
    return Object.assign({}, action.equipment);

    case ADD_EQUIPMENT:
    let newAEEquipment = Object.assign({}, equipment);
    newAEEquipment[action.equipment.id] = action.equipment;
    return newAEEquipment;

		default:
		return equipment;
	}
};
