import Icon from '../models/icon';

export default class QuestCompleted {
  id: string = '';
  name: string = '';
  icon?: Icon;
  completedAt: number = new Date(Date.now()).valueOf();
  isDaily?: boolean;

  constructor(questCompleted: QuestCompletedInterface) {
    Object.assign(this, questCompleted);
  }
}

interface QuestCompletedInterface {
  id: string;
  name: string;
  icon?: Icon;
  completedAt?: number;
  isDaily?: boolean;
}
