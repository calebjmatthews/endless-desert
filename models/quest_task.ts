import Icon from './icon';
import QuestProgress from './quest_progress';

export default class QuestTask {
  index: number = 0;
  parentId: string = '';
  label: string = '';
  icon?: Icon;
  resourceToProduce?: {specType: string, quantity: number};
  resourceToAnalyze?: {specificity: string, type: string, quantity: number};
  dishToCook?: {specTypes: {specificity: string, type: string}[], quantity: number};
  tradeWith?: {typeName: string, quantity: number};
  equipmentToMark?: {specificity?: string, type?: string, tier?: number,
    quantity: number};
  actionToPerform?: {kind: string, value?: string, quantity?: number};

  constructor(questTask: QuestTaskInterface) {
    Object.assign(this, questTask);
  }

  isCompleted(progress: QuestProgress) {
    let completed = true;
    if (this.resourceToProduce) {
      if ((progress.resourceProduced || 0) < this.resourceToProduce.quantity) {
        completed = false;
      }
    }
    if (this.resourceToAnalyze) {
      if ((progress.resourceAnalyzed || 0) < this.resourceToAnalyze.quantity) {
        completed = false;
      }
    }
    if (this.dishToCook) {
      if ((progress.dishCooked || 0) < this.dishToCook.quantity) {
        completed = false;
      }
    }
    if (this.tradeWith) {
      if ((progress.tradedWith || 0) < this.tradeWith.quantity) {
        completed = false;
      }
    }
    if (this.equipmentToMark) {
      if ((progress.equipmentMarked || 0) < this.equipmentToMark.quantity) {
        completed = false;
      }
    }
    if (this.actionToPerform) {
      if ((progress.actionPerformed || 0) < (this.actionToPerform.quantity || 1)) {
        completed = false;
      }
    }
    return completed;
  }
};

interface QuestTaskInterface {
  index: number;
  parentId: string;
  label: string;
  icon?: Icon;
  resourceToProduce?: {specType: string, quantity: number};
  resourceToAnalyze?: {specificity: string, type: string, quantity: number};
  dishToCook?: {specTypes: {specificity: string, type: string}[], quantity: number};
  tradeWith?: {typeName: string, quantity: number};
  equipmentToMark?: {specificity?: string, type?: string, tier?: number,
    quantity: number};
  actionToPerform?: {kind: string, value?: string, quantity?: number};
}
