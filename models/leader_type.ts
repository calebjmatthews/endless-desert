import Leader from './leader';
import Equipment from './equipment';
import { equipmentTypes } from '../instances/equipment_types';
import { utils } from '../utils';
import { EQUIPMENT_TYPES } from '../enums/equipment_types';

export default class LeaderType implements LeaderTypeInterface {
  name: string = '';
  title: string = '';
  description: string = '';
  speechType: string = '';
  toolStarting: string|null = null;
  clothingStarting: string|null = null;
  backStarting: string|null = null;
  happinessStarting: number = 10;
  icon: {provider: string, name: string} = { provider: '', name: ''};
  foregroundColor: string = '';
  backgroundColor: string = '';
  paddingHorizontal: number = 8;
  paddingVertical: number = 11;

  constructor(leader: LeaderTypeInterface) {
    Object.assign(this, leader);
  }

  createLeader() {
    let leader = new Leader({
      id: utils.randHex(16),
      name: this.name,
      description: this.description,
      speechType: this.speechType,
      assignedTo: null,
      livingAt: null,
      toolEquipped: null,
      clothingEquipped: null,
      backEquipped: null,
      eating: null,
      drinking: null,
      happiness: this.happinessStarting,
      productionPlus: 0,
      qualityPlus: 0,
      efficiencyPlus: 0,
      icon: this.icon,
      foregroundColor: this.foregroundColor,
      backgroundColor: this.backgroundColor,
      paddingVertical: this.paddingVertical,
      paddingHorizontal: this.paddingHorizontal
    });
    let tool: Equipment|null = null;
    if (this.toolStarting) {
      tool = equipmentTypes[this.toolStarting].createEquipment();
      leader.toolEquipped = tool.id;
    }
    let clothing: Equipment|null = null;
    if (this.clothingStarting) {
      clothing = equipmentTypes[this.clothingStarting].createEquipment();
      leader.clothingEquipped = clothing.id;
    }
    let back: Equipment|null = null;
    if (this.backStarting) {
      back = equipmentTypes[this.backStarting].createEquipment();
      leader.backEquipped = back.id;
    }
    return { leader: leader, equipment: [tool, clothing, back] };
  }
}

interface LeaderTypeInterface {
  name: string;
  title: string;
  description: string;
  speechType: string;
  toolStarting: string|null;
  clothingStarting: string|null;
  backStarting: string|null;
  happinessStarting: number;
  icon: {provider: string, name: string};
  foregroundColor: string;
  backgroundColor: string;
  paddingHorizontal: number;
  paddingVertical: number;
}
