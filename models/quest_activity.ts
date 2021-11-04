export default class QuestActivity {
  id: string = '';
  timestamp: number = new Date(Date.now()).valueOf();
  resourcesProduced?: {type: string, quantity: number}[];
  resourceAnalyzed?: {type: string, quantity: number};
  dishesCooked?: {type: string, tags: string[], quantity: number}[];
  tradedWith?: {typeName: string, quantity: number};
  equipmentMarked?: {typeName: string, rarity: number, quantity: number};
  actionPerformed?: {kind: string, value: string|null, quantity: number|null};

  constructor(questActivity: QuestActivityInterface) {
    Object.assign(this, questActivity);
  }
}

interface QuestActivityInterface {
  id: string;
  timestamp: number;
  resourcesProduced?: {type: string, quantity: number}[];
  resourceAnalyzed?: {type: string, quantity: number};
  dishesCooked?: {type: string, tags: string[], quantity: number}[];
  tradedWith?: {typeName: string, quantity: number};
  equipmentMarked?: {typeName: string, rarity: number, quantity: number};
  actionPerformed?: {kind: string, value: string|null, quantity: number|null};
}
