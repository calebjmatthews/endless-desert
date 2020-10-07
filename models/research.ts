export default class Research {
  name: string = '';
  beginsCompleted: boolean = false;
  prereq: string[]|null = null;
  knowledgeReq: number = 0;
  unlocksBuilding: string[]|null = null;

  constructor(research: Research) {
    Object.assign(this, research);
  }
}
