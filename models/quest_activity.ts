export default class QuestActivity {
  id: string = '';
  timestamp: number = new Date(Date.now()).valueOf();
  resourceGained?: {type: string, quantity: number};
  resourcesProduced?: {specType: string, quantity: number}[];
  resourceAnalyzed?: {type: string, quantity: number};
  dishesCooked?: {type: string, tags: string[], quantity: number}[];
  tradedWith?: {typeName: string, quantity: number};
  equipmentMarked?: {typeName: string, tier: number, quantity: number};
  actionPerformed?: {kind: string, value: string|null, quantity: number|null};

  constructor(questActivity: QuestActivityInterface) {
    Object.assign(this, questActivity);
    if (questActivity.actionPerformed) {
      const ap = questActivity.actionPerformed;
      this.actionPerformed = { kind: ap.kind, value: (ap.value || null),
        quantity: (ap.quantity || null) };
    }
  }
}

interface QuestActivityInterface {
  id: string;
  timestamp?: number;
  resourceGained?: {type: string, quantity: number};
  resourcesProduced?: {specType: string, quantity: number}[];
  resourceAnalyzed?: {type: string, quantity: number};
  dishesCooked?: {type: string, tags: string[], quantity: number}[];
  tradedWith?: {typeName: string, quantity: number};
  equipmentMarked?: {typeName: string, tier: number, quantity: number};
  actionPerformed?: {kind: string, value?: string|null, quantity?: number|null};
}
