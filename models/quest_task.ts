import Icon from './icon';
import QuestProgress from './quest_progress';
import { utils } from '../utils';

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

  getProgressLabel(progress: QuestProgress): string|null {
    if (this.resourceToProduce && progress.resourceProduced != undefined) {
      if (this.resourceToProduce.quantity > 1) {
        const numerator = progress.resourceProduced < this.resourceToProduce.quantity ?
          progress.resourceProduced : this.resourceToProduce.quantity;
        return `(${utils.formatNumberShort(numerator)}/${utils.formatNumberShort(this.resourceToProduce.quantity)})`;
      }
    }
    if (this.resourceToAnalyze && progress.resourceAnalyzed != undefined) {
      if (this.resourceToAnalyze.quantity > 1) {
        const numerator = progress.resourceAnalyzed < this.resourceToAnalyze.quantity ?
          progress.resourceAnalyzed : this.resourceToAnalyze.quantity;
        return `(${utils.formatNumberShort(numerator)}/${utils.formatNumberShort(this.resourceToAnalyze.quantity)})`;
      }
    }
    if (this.dishToCook && progress.dishCooked != undefined) {
      if (this.dishToCook.quantity > 1) {
        const numerator = progress.dishCooked < this.dishToCook.quantity ?
          progress.dishCooked : this.dishToCook.quantity;
        return `(${utils.formatNumberShort(numerator)}/${utils.formatNumberShort(this.dishToCook.quantity)})`;
      }
    }
    if (this.tradeWith && progress.tradedWith != undefined) {
      if (this.tradeWith.quantity > 1) {
        const numerator = progress.tradedWith < this.tradeWith.quantity ?
          progress.tradedWith : this.tradeWith.quantity;
        return `(${utils.formatNumberShort(numerator)}/${utils.formatNumberShort(this.tradeWith.quantity)})`;
      }
    }
    if (this.equipmentToMark && progress.equipmentMarked != undefined) {
      if (this.equipmentToMark.quantity > 1) {
        const numerator = progress.equipmentMarked < this.equipmentToMark.quantity ?
          progress.equipmentMarked : this.equipmentToMark.quantity;
        return `(${utils.formatNumberShort(numerator)}/${utils.formatNumberShort(this.equipmentToMark.quantity)})`;
      }
    }
    if (this.actionToPerform && progress.actionPerformed != undefined) {
      if (this.actionToPerform.quantity && this.actionToPerform.quantity > 1) {
        const numerator = progress.actionPerformed < this.actionToPerform.quantity ?
          progress.actionPerformed : this.actionToPerform.quantity;
        return `(${utils.formatNumberShort(numerator)}/${utils.formatNumberShort(this.actionToPerform.quantity)})`;
      }
    }
    return null;
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
