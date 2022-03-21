import { SET_LEADERS, SET_LEADER, ADD_LEADER, REMOVE_LEADER, ASSIGN_TO_BUILDING,
  LIVE_AT_BUILDING, DON_EQUIPMENT }
  from '../actions/leaders';

import Leader from '../models/leader';
import { equipmentTypes } from '../instances/equipment_types';
import { EQUIPMENT_SLOTS } from '../enums/equipment_slots';

export default function (leaders: { [id: string] : Leader } = {},
  action: any = null) {
	switch(action.type) {
    case SET_LEADERS:
    return Object.assign({}, action.leaders);

    case SET_LEADER:
    return { ...leaders, [action.leader.id] : action.leader };

    case ADD_LEADER:
    let newALeaders = Object.assign({}, leaders);
    newALeaders[action.leader.id] = action.leader;
    return newALeaders;

    case REMOVE_LEADER:
    let newRLeaders = Object.assign({}, leaders);
    delete newRLeaders[action.leader.id];
    return newRLeaders;

    case ASSIGN_TO_BUILDING:
    let newATBLeaders = Object.assign({}, leaders);
    newATBLeaders[action.leader.id].assignedTo = action.assignedTo;
    return newATBLeaders;

    case LIVE_AT_BUILDING:
    let newLABLeaders = Object.assign({}, leaders);
    newLABLeaders[action.leader.id].livingAt = action.livingAt;
    return newLABLeaders;

    case DON_EQUIPMENT:
    const equipmentType = equipmentTypes[action.equipment.typeName];
    let newSEqLeaders = Object.assign({}, leaders);
    if (equipmentType) {
      if (equipmentType.slot == EQUIPMENT_SLOTS.TOOL) {
        newSEqLeaders[action.leader.id].toolEquipped = action.equipment.id;
      }
      else if (equipmentType.slot == EQUIPMENT_SLOTS.CLOTHING) {
        newSEqLeaders[action.leader.id].clothingEquipped = action.equipment.id;
      }
      else if (equipmentType.slot == EQUIPMENT_SLOTS.BACK) {
        newSEqLeaders[action.leader.id].backEquipped = action.equipment.id;
      }
    }
    return newSEqLeaders;

		default:
		return leaders;
	}
};
