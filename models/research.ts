export default class Research {
  name: string = '';
  unlocks: string = '';
  description: string = '';
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';
  category: string = '';
  isCategory: boolean = false;
  difficulty: number = 0;
  stepsNeeded: number = 1;
  beginsCompleted: boolean = false;
  prereq: string[]|null = null;
  knowledgeReq: number = 0;
  unlocksBuilding?: string[];
  unlocksUpgrade?: string[];
  unlocksTab?: string;
  actionCategory?: string;

  constructor(research: Research) {
    Object.assign(this, research);
  }
}
