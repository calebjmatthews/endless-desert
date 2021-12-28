export default class QuestProgress implements QuestProgressInterface {
  index: number = 0;
  parentId: string = '';
  resourceGained?: number;
  resourceProduced?: number;
  resourceAnalyzed?: number;
  dishCooked?: number;
  tradedWith?: number;
  equipmentMarked?: number;
  actionPerformed?: number;

  constructor(questProgress: QuestProgressInterface) {
    Object.assign(this, questProgress);
  }

  addProgress(propName: 'resourceGained'|'resourceProduced'|'resourceAnalyzed'
    |'dishCooked'|'tradedWith'|'equipmentMarked'|'actionPerformed', quantity: number) {
    switch (propName) {
      case 'resourceGained':
      if (!this.resourceGained) { this.resourceGained = 0; }
      this.resourceGained += quantity; break;
      case 'resourceProduced':
      if (!this.resourceProduced) { this.resourceProduced = 0; }
      this.resourceProduced += quantity; break;
      case 'resourceAnalyzed':
      if (!this.resourceAnalyzed) { this.resourceAnalyzed = 0; }
      this.resourceAnalyzed += quantity; break;
      case 'dishCooked':
      if (!this.dishCooked) { this.dishCooked = 0; }
      this.dishCooked += quantity; break;
      case 'tradedWith':
      if (!this.tradedWith) { this.tradedWith = 0; }
      this.tradedWith += quantity; break;
      case 'equipmentMarked':
      if (!this.equipmentMarked) { this.equipmentMarked = 0; }
      this.equipmentMarked += quantity; break;
      case 'actionPerformed':
      if (!this.actionPerformed) { this.actionPerformed = 0; }
      this.actionPerformed += quantity; break;
    }
    return this;
  }
};

interface QuestProgressInterface {
  index: number;
  parentId: string;
  resourceGained?: number;
  resourceProduced?: number;
  resourceAnalyzed?: number;
  dishCooked?: number;
  tradedWith?: number;
  equipmentMarked?: number;
  actionPerformed?: number;
}
