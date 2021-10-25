import Leader from './leader';
import Equipment from './equipment';
import Vault from './vault';
import ResourceType from './resource_type';
import Icon from './icon';
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
  icon: Icon = new Icon({ provider: '', name: ''});

  constructor(leader: LeaderTypeInterface) {
    Object.assign(this, leader);
  }

  createLeader(vault: Vault, resourceTypes: { [name: string] : ResourceType}) {
    let leader = new Leader({
      id: utils.randHex(16),
      name: this.name,
      title: this.title,
      description: this.description,
      speechType: this.speechType,
      assignedTo: null,
      livingAt: null,
      toolEquipped: null,
      clothingEquipped: null,
      backEquipped: null,
      happiness: 0,
      effects: [],
      explanations: {},
      eating: null,
      drinking: null,
      icon: this.icon,
    });
    let tool: Equipment|null = null;
    let startingEquipment: { [id: string] : Equipment } = {};
    if (this.toolStarting) {
      tool = equipmentTypes[this.toolStarting].createEquipment(0, vault, resourceTypes);
      startingEquipment[tool.id] = tool;
      leader.toolEquipped = tool.id;
    }
    let clothing: Equipment|null = null;
    if (this.clothingStarting) {
      clothing = equipmentTypes[this.clothingStarting].createEquipment(0, vault,
        resourceTypes);
      startingEquipment[clothing.id] = clothing;
      leader.clothingEquipped = clothing.id;
    }
    let back: Equipment|null = null;
    if (this.backStarting) {
      back = equipmentTypes[this.backStarting].createEquipment(0, vault, resourceTypes);
      startingEquipment[back.id] = back;
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
  icon: Icon;
}
