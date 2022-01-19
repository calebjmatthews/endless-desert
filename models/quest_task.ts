import Icon from './icon';
import QuestProgress from './quest_progress';
import { utils } from '../utils';

export default class QuestTask {
  index: number = 0;
  parentId: string = '';
  label: string = '';
  icon?: Icon;
  resourceToGain?: {specificity: string, type: string, quantity: number,
    consumed?: boolean, includeExisting?: boolean};
  resourceToProduce?: {specType: string, quantity: number, consumed?: boolean,
    includeExisting?: boolean};
  resourceToAnalyze?: {specificity: string, type: string, quantity: number};
  dishToCook?: {specTypes: {specificity: string, type: string}[], quantity: number};
  tradeWith?: {typeName: string, quantity: number};
  equipmentToMark?: {specificity?: string, type?: string, tier?: number,
    quantity: number};
  actionToPerform?: {kind: string, value?: string, quantity?: number,
    includeExisting?: boolean };

  constructor(questTask: QuestTaskInterface) {
    Object.assign(this, questTask);
  }

  isCompleted(progress: QuestProgress) {
    let completed = true;
    if (this.resourceToGain) {
      if ((progress.resourceGained || 0) < this.resourceToGain.quantity) {
        completed = false;
      }
    }
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

  getProgressLabel(progress: QuestProgress): string {
    if (this.resourceToGain) {
      const resourceGained = progress.resourceGained || 0;
      if (this.resourceToGain.quantity >= 1) {
        const numerator = resourceGained < this.resourceToGain.quantity ?
          resourceGained : this.resourceToGain.quantity;
        return `(${utils.formatNumberShort(numerator)}/${utils.formatNumberShort(this.resourceToGain.quantity)})`;
      }
    }
    if (this.resourceToProduce) {
      const resourceProduced = progress.resourceProduced || 0;
      if (this.resourceToProduce.quantity >= 1) {
        const numerator = resourceProduced < this.resourceToProduce.quantity ?
          resourceProduced : this.resourceToProduce.quantity;
        return `(${utils.formatNumberShort(numerator)}/${utils.formatNumberShort(this.resourceToProduce.quantity)})`;
      }
    }
    if (this.resourceToAnalyze) {
      const resourceAnalyzed = progress.resourceAnalyzed || 0;
      if (this.resourceToAnalyze.quantity >= 1) {
        const numerator = resourceAnalyzed < this.resourceToAnalyze.quantity ?
          resourceAnalyzed : this.resourceToAnalyze.quantity;
        return `(${utils.formatNumberShort(numerator)}/${utils.formatNumberShort(this.resourceToAnalyze.quantity)})`;
      }
    }
    if (this.dishToCook) {
      let dishCooked = progress.dishCooked || 0;
      if (this.dishToCook.quantity >= 1) {
        const numerator = dishCooked < this.dishToCook.quantity ?
          dishCooked : this.dishToCook.quantity;
        return `(${utils.formatNumberShort(numerator)}/${utils.formatNumberShort(this.dishToCook.quantity)})`;
      }
    }
    if (this.tradeWith) {
      if (this.tradeWith.quantity >= 1) {
        const tradedWith = progress.tradedWith || 0;
        const numerator = tradedWith < this.tradeWith.quantity ?
          tradedWith : this.tradeWith.quantity;
        return `(${utils.formatNumberShort(numerator)}/${utils.formatNumberShort(this.tradeWith.quantity)})`;
      }
    }
    if (this.equipmentToMark) {
      const equipmentMarked = progress.equipmentMarked || 0;
      if (this.equipmentToMark.quantity >= 1) {
        const numerator = equipmentMarked < this.equipmentToMark.quantity ?
          equipmentMarked : this.equipmentToMark.quantity;
        return `(${utils.formatNumberShort(numerator)}/${utils.formatNumberShort(this.equipmentToMark.quantity)})`;
      }
    }
    if (this.actionToPerform) {
      const actionPerformed = progress.actionPerformed || 0;
      if (this.actionToPerform.quantity && this.actionToPerform.quantity >= 1) {
        const numerator = actionPerformed < this.actionToPerform.quantity ?
          actionPerformed : this.actionToPerform.quantity;
        return `(${utils.formatNumberShort(numerator)}/${utils.formatNumberShort(this.actionToPerform.quantity)})`;
      }
    }
    return '';
  }
};

interface QuestTaskInterface {
  index: number;
  parentId: string;
  label: string;
  icon?: Icon;
  resourceToGain?: {specificity: string, type: string, quantity: number,
    consumed?: boolean, includeExisting?: boolean};
  resourceToProduce?: {specType: string, quantity: number, consumed?: boolean,
    includeExisting?: boolean};
  resourceToAnalyze?: {specificity: string, type: string, quantity: number};
  dishToCook?: {specTypes: {specificity: string, type: string}[], quantity: number};
  tradeWith?: {typeName: string, quantity: number};
  equipmentToMark?: {specificity?: string, type?: string, tier?: number,
    quantity: number};
  actionToPerform?: {kind: string, value?: string, quantity?: number,
    includeExisting?: boolean};
}
