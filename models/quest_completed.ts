export default class QuestCompleted {
  id: string = '';
  name: string = '';
  completedAt: number = new Date(Date.now()).valueOf();
  isDaily?: boolean;

  constructor(questCompleted: QuestCompleted) {
    Object.assign(this, questCompleted);
  }
}
