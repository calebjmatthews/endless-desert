import Icon, { IconInterface } from '../models/icon';

export default class QuestCompleted {
  id: string = '';
  name: string = '';
  icon?: Icon;
  completedAt: number = new Date(Date.now()).valueOf();
  isDaily?: boolean;

  constructor(questCompleted: DBQuestCompleted) {
    Object.assign(this, questCompleted);
  }

  export() {
    const expQuestCompleted: DBQuestCompleted = Object.assign({}, this);
    if (this.icon) { expQuestCompleted.icon = new Icon(this.icon).export(); }
    return expQuestCompleted;
  }
}

interface QuestCompletedInterface extends DBQuestCompleted {
  icon?: Icon;
}

export interface DBQuestCompleted {
  id: string;
  name: string;
  icon?: IconInterface;
  completedAt?: number;
  isDaily?: boolean;
}
