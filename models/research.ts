export default class Research {
  name: string = '';
  prereq: string[]|null = null;
  knowledgeReq: number = 0;
  unlocksBuilding: string[]|null = null;

  constructor(research: Research) {
    Object.assign(this, research);
  }
}
