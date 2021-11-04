import Icon from './icon';

export default class QuestTask {
  index: number = 0;
  parentId: string = '';
  label: string = '';
  icon?: Icon;
  resourceToProduce?: {specificity: string, type: string, quantity: number};
  resourceToAnalyze?: {specificity: string, type: string, quantity: number};
  dishToCook?: {specTypes: {specificity: string, type: string}[], quantity: number};
  tradeWith?: {typeName: string, quantity: number};
  equipmentToMark?: {specificity?: string, type?: string, rarity?: number,
    quantity: number};
  actionToPerform?: {kind: string, value?: string, quantity?: number};

  constructor(questTask: QuestTask) {
    Object.assign(this, questTask);
  }
};
