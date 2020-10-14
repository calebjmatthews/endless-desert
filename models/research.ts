export default class Research {
  name: string = '';
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';
  beginsCompleted: boolean = false;
  prereq: string[]|null = null;
  knowledgeReq: number = 0;
  unlocksBuilding: string[]|null = null;

  constructor(research: Research) {
    Object.assign(this, research);
  }
}
