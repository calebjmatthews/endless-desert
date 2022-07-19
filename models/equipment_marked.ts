import Equipment from './equipment';
import Resource from './resource';

export interface EquipmentMarked {
  equipment: { [id: string] : Equipment };
  resourcesFromDestruction: { [id: string] : Resource };
}