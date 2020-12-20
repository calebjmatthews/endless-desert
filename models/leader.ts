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
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';
  paddingHorizontal: number = 8;
  paddingVertical: number = 11;

  constructor(leader: LeaderInterface) {
    Object.assign(this, leader);
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
  icon: {provider: string, name: string};
  foregroundColor: string;
  backgroundColor: string;
  paddingHorizontal: number;
  paddingVertical: number;
}
