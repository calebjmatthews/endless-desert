import Quest, { DBQuest } from './quest';
import QuestCompleted, { DBQuestCompleted } from './quest_completed';
import QuestActivity from './quest_activity';

export default class QuestStatus {
  quests: { [id: string] : Quest } = {};
  questsCompleted: { [id: string] : QuestCompleted } = {};
  lastDailyCompleted: number = 0;
  activityQueue: QuestActivity[] = [];
  resourcesToCheck: { [specType: string] : boolean } = {};

  constructor(questStatus: DBQuestStatus) {
    let questStatusValid: boolean = false;
    if (questStatus) {
      if (questStatus.quests && questStatus.questsCompleted && questStatus.activityQueue
        && questStatus.resourcesToCheck) {
        questStatusValid = true;
      }
    }
    if (questStatusValid) {
      const quests: { [id: string] : Quest } = {};
      Object.keys(questStatus.quests).forEach((id) => {
        quests[id] = new Quest(questStatus.quests[id]);
      });

      const questsCompleted: { [id: string] : QuestCompleted } = {};
      Object.keys(questStatus.questsCompleted).forEach((id) => {
        questsCompleted[id] = new QuestCompleted(questStatus.questsCompleted[id]);
      });

      const activityQueue: QuestActivity[] =
        questStatus.activityQueue.map((questActivity) => {
        return new QuestActivity(questActivity);
      });

      const resourcesToCheck = { ...questStatus.resourcesToCheck };

      Object.assign(this, { quests, questsCompleted, activityQueue, resourcesToCheck });
    }
  }

  export() {
    const expQuestStatus: DBQuestStatus = { ...this };
    const expQuests: { [id: string] : DBQuest } = {};
    Object.keys(this.quests).forEach((id) => {
      expQuests[id] = new Quest(this.quests[id]).export();
    });
    expQuestStatus.quests = expQuests;
    const expQuestsCompleted: { [id: string] : DBQuestCompleted } = {};
    Object.keys(this.questsCompleted).forEach((id) => {
      expQuestsCompleted[id] = this.questsCompleted[id].export();
    });
    expQuestStatus.questsCompleted = expQuestsCompleted;
    return expQuestStatus;
  }
}

export interface DBQuestStatus {
  quests: { [id: string] : DBQuest };
  questsCompleted: { [id: string] : DBQuestCompleted };
  lastDailyCompleted: number;
  activityQueue: QuestActivity[];
  resourcesToCheck: { [specType: string] : boolean };
}
