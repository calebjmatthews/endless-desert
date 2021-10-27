import { SET_EQUIPMENT, ADD_EQUIPMENT, REMOVE_EQUIPMENT }
  from '../actions/equipment';

import Equipment from '../models/equipment';

let startingEquipment: { [id: string] : Equipment } = {};

export default function (equipment: { [id: string] : Equipment } = startingEquipment,
  action: any = null) {
	switch(action.type) {
    case SET_EQUIPMENT:
    return Object.assign({}, action.equipment);

    case ADD_EQUIPMENT:
    let newAEEquipment = Object.assign({}, equipment);
    action.equipment.forEach((anEquipment: Equipment) => {
      newAEEquipment[anEquipment.id] = anEquipment;
    });
    return newAEEquipment;

    case REMOVE_EQUIPMENT:
    let newREEquipment = Object.assign({}, equipment);
    action.equipment.forEach((anEquipment: Equipment) => {
      delete newREEquipment[anEquipment.id];
    });
    return newREEquipment;

		default:
		return equipment;
	}
};
