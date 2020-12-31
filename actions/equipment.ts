import Equipment from '../models/equipment';

export const SET_EQUIPMENT = 'SET_EQUIPMENT';
export function setEquipment(equipment: { [ id: string ] : Equipment }) {
  return {
    type: SET_EQUIPMENT,
    equipment: equipment
  };
}
