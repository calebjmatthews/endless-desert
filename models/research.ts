export default class Research {
  name: string = '';
  unlocks: string = '';
  description: string = '';
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';
  category: string = '';
  difficulty: number = 0;
  stepsNeeded: number = 1;
  beginsCompleted: boolean = false;
  prereq: string[]|null = null;
  knowledgeReq: number = 0;
  unlocksBuilding?: string[] = undefined;
  simplifiedBuilding?: string[] = undefined;
  unlocksTab?: string = undefined;

  constructor(research: Research) {
    Object.assign(this, research);
  }
}
