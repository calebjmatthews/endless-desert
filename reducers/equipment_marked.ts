import { SET_EQUIPMENT_MARKED, REMOVE_EQUIPMENT_MARKED, ADD_TO_RESOURCES_FROM_DECONSTRUCTION,
  CLEAR_EQUIPMENT_MARKED } from '../actions/equipment_marked';

import { EquipmentMarked } from '../models/equipment_marked';

export default function (equipmentMarked: EquipmentMarked = { equipment: {}, 
  resourcesFromDestruction: {} }, action: any = null) {
	switch(action.type) {
    case SET_EQUIPMENT_MARKED:
    return Object.assign(equipmentMarked, { equipment: action.equipment });

    case REMOVE_EQUIPMENT_MARKED:
    let newREMEquipmentMarked = Object.assign({}, equipmentMarked);
    action.equipmentIds.forEach((id: string) => {
      delete newREMEquipmentMarked.equipment[id];
    });
    console.log('newREMEquipmentMarked');
    console.log(newREMEquipmentMarked);
    return newREMEquipmentMarked;

    case ADD_TO_RESOURCES_FROM_DECONSTRUCTION:
    let newATRFDEquipmentMarked = Object.assign({}, equipmentMarked);
    Object.keys(action.resources).forEach((typeQuality: string) => {
      const resource = action.resources[typeQuality];
      if (!newATRFDEquipmentMarked.resourcesFromDestruction[typeQuality]) {
        newATRFDEquipmentMarked.resourcesFromDestruction[typeQuality] = resource;
      }
      else {
        newATRFDEquipmentMarked.resourcesFromDestruction[typeQuality].quantity += resource.quantity;
      }
    });
    return newATRFDEquipmentMarked;

    case CLEAR_EQUIPMENT_MARKED:
    return { equipment: {}, resourcesFromDestruction: {} };

		default:
		return equipmentMarked;
	}
};
