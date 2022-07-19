import Equipment from '../models/equipment';
import Resource from '../models/resource';

export const SET_EQUIPMENT_MARKED = 'SET_EQUIPMENT_MARKED';
export function setEquipmentMarked(equipment: { [ id: string ] : Equipment }) {
  return {
    type: SET_EQUIPMENT_MARKED,
    equipment
  };
}

export const REMOVE_EQUIPMENT_MARKED = 'REMOVE_EQUIPMENT_MARKED';
export function removeEquipmentMarked(equipmentIds: string[]) {
  return {
    type: REMOVE_EQUIPMENT_MARKED,
    equipmentIds
  }
}

export const ADD_TO_RESOURCES_FROM_DECONSTRUCTION = 'ADD_TO_RESOURCES_FROM_DECONSTRUCTION';
export function setResourcesFromDeconstruction(resources: { [typeQuality: string] : Resource }) {
  return {
    type: ADD_TO_RESOURCES_FROM_DECONSTRUCTION,
    resources
  }
}

export const CLEAR_EQUIPMENT_MARKED = 'CLEAR_EQUIPMENT_MARKED';
export function clearEquipmentMarked() {
  return {
    type: CLEAR_EQUIPMENT_MARKED
  }
}