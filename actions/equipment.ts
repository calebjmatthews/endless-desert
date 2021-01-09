import Equipment from '../models/equipment';

export const SET_EQUIPMENT = 'SET_EQUIPMENT';
export function setEquipment(equipment: { [ id: string ] : Equipment }) {
  return {
    type: SET_EQUIPMENT,
    equipment: equipment
  };
}

export const ADD_EQUIPMENT = 'ADD_EQUIPMENT';
export function addEquipment(equipment: Equipment) {
  return {
    type: ADD_EQUIPMENT,
    equipment: equipment
  }
}
