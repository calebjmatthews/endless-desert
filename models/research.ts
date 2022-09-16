import Icon from './icon';

export default class Research {
  name: string = '';
  unlocks: string = '';
  description: string = '';
  icon: Icon = new Icon({provider: '', name: ''});
  category: string = '';
  isCategory: boolean = false;
  difficulty: number = 0;
  stepsNeeded: number = 1;
  beginsCompleted: boolean = false;
  prereq: string[]|null = null;
  knowledgeReq: number = 0;
  options?: string[];
  repeatable?: boolean = false;
  unlocksBuilding?: string[];
  unlocksUpgrade?: string[];
  unlocksTab?: string;
  actionCategory?: string;
  hidden?: boolean;
  givesTreasure?: string;

  constructor(research: Research) {
    Object.assign(this, research);
  }
}
