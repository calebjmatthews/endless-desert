export default class Leader implements LeaderInterface {
  id: string = '';
  name: string = '';
  description: string = '';
  speechType: string = '';
  assignedTo: string|null = null;
  toolEquipped: string|null = null;
  clothingEquipped: string|null = null;
  backEquipped: string|null = null;
  eating: string = '';
  drinking: string = '';
  happiness: number = 50;
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
    this.setPluses();
  }

  setPluses() {
    this.productionPlus = this.happiness;
  }
}

interface LeaderInterface {
  id: string;
  name: string;
  description: string;
  speechType: string;
  assignedTo: string|null;
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
