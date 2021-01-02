import Equipment from './equipment';
import { LEADER_QUALITIES } from '../enums/leader_qualities';

export default class Leader implements LeaderInterface {
  id: string = '';
  name: string = '';
  description: string = '';
  speechType: string = '';
  assignedTo: string|null = null;
  livingAt: string|null = null;
  toolEquipped: string|null = null;
  clothingEquipped: string|null = null;
  backEquipped: string|null = null;
  eating: string = '';
  drinking: string = '';
  happiness: number = 10;
  productionPlus: number = 0;
  qualityPlus: number = 0;
  efficiencyPlus: number = 0;
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';
  paddingHorizontal: number = 8;
  paddingVertical: number = 11;

  constructor(leader: LeaderInterface) {
    Object.assign(this, leader);
  }

  setPluses(equipment: { [id: string] : Equipment }) {
    this.productionPlus = 100 + this.happiness;

    if (this.toolEquipped) {
      const tool = equipment[this.toolEquipped];
      if (tool.effects) {
        if (tool.effects[LEADER_QUALITIES.PRODUCTION]) {
          const change = tool.effects[LEADER_QUALITIES.PRODUCTION].change;
          this.productionPlus *= (1 + (change / 100));
        }
      }
    }
    this.productionPlus -= 100;
  }
}

interface LeaderInterface {
  id: string;
  name: string;
  description: string;
  speechType: string;
  assignedTo: string|null;
  livingAt: string|null;
  toolEquipped: string|null;
  clothingEquipped: string|null;
  backEquipped: string|null;
  eating: string|null;
  drinking: string|null;
  happiness: number;
  productionPlus: number;
  qualityPlus: number;
  efficiencyPlus: number;
  icon: {provider: string, name: string};
  foregroundColor: string;
  backgroundColor: string;
  paddingHorizontal: number;
  paddingVertical: number;
}
