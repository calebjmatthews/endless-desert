import Quest from './quest';
import QuestCompleted from './quest_completed';
import QuestActivity from './quest_activity';

export default class QuestStatus {
  quests: { [id: string] : Quest } = {};
  questsCompleted: { [id: string] : QuestCompleted } = {};
  activityQueue: QuestActivity[] = [];
  resourcesToCheck: { [typeQuality: string] : string } = {};

  constructor(questStatus: QuestStatus) {
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

    Object.assign(this, { quests, questStatus, activityQueue, resourcesToCheck });
  }
}
