import QuestStatus from '../models/quest_status';
import Quest from '../models/quest';
import QuestProgress from '../models/quest_progress';
import { SET_QUEST_STATUS, ADD_QUEST, REMOVE_QUEST, ADD_TO_ACTIVITY_QUEUE,
  REMOVE_FROM_ACTIVITY_QUEUE, SET_QUEST_PROGRESS, SET_QUEST_READY_TO_COMPLETE,
  ADD_QUEST_COMPLETED, PAY_QUEST_TASK_COST } from '../actions/quest_status';
import { quests } from '../instances/quests';

export default function (questStatus: QuestStatus = new QuestStatus({
    quests: {},  questsCompleted: {}, lastDailyCompleted: 0, activityQueue: [], resourcesToCheck: {}
  }), action: any = null) {
	switch(action.type) {
    case SET_QUEST_STATUS:
    return new QuestStatus(action.questStatus);

    case ADD_QUEST:
    const aqQuest: Quest = action.quest;
    const aqResourcesToCheck = { ...questStatus.resourcesToCheck };
    aqQuest.tasks.forEach((task) => {
      if (task.resourceToProduce) {
        aqResourcesToCheck[task.resourceToProduce.specType] = true;
      }
    });
    return new QuestStatus({ ...questStatus,
      quests: {...questStatus.quests, [aqQuest.id]: aqQuest},
      resourcesToCheck: aqResourcesToCheck,
      lastDailyCompleted: (aqQuest.isDaily) ? new Date(Date.now()).valueOf()
        : questStatus.lastDailyCompleted });

    case REMOVE_QUEST:
    const rqQuest: Quest = action.quest;
    let rqQuests = {...questStatus.quests};
    delete rqQuests[rqQuest.id];
    const rqResourcesToCheck: { [specType: string] : boolean } = { };
    Object.keys(rqQuests).forEach((id) => {
      const quest = rqQuests[id];
      quest.tasks.forEach((task) => {
        if (task.resourceToProduce) {
          rqResourcesToCheck[task.resourceToProduce.specType] = true;
        }
      });
    });
    return new QuestStatus({ ...questStatus, quests: rqQuests,
      resourcesToCheck: rqResourcesToCheck });

    case ADD_TO_ACTIVITY_QUEUE:
    return new QuestStatus({ ...questStatus,
      activityQueue: [...questStatus.activityQueue, action.questActivity] });

    case REMOVE_FROM_ACTIVITY_QUEUE:
    let rfaqActivityQueue = [...questStatus.activityQueue];
    rfaqActivityQueue = rfaqActivityQueue.filter((questActivity) => {
      if (questActivity.id != action.id) { return questActivity; }
    });
    return new QuestStatus({ ...questStatus, activityQueue: rfaqActivityQueue });

    case SET_QUEST_PROGRESS:
    let sqpQuest = new Quest(questStatus.quests[action.questProgress.parentId]);
    sqpQuest.progress[action.questProgress.index] =
      new QuestProgress(action.questProgress);
    return new QuestStatus({ ...questStatus, quests: { ...questStatus.quests,
      [action.questProgress.parentId]: sqpQuest }});

    case SET_QUEST_READY_TO_COMPLETE:
    return new QuestStatus({ ...questStatus, quests: { ...questStatus.quests,
      [action.id]: new Quest({
        ...questStatus.quests[action.id], readyToComplete: true
      }) }});

    case ADD_QUEST_COMPLETED:
    return new QuestStatus({ ...questStatus, questsCompleted: {
      ...questStatus.questsCompleted, [action.questCompleted.id]: action.questCompleted
    } });

    case PAY_QUEST_TASK_COST:
    let pqtcQuest = new Quest(questStatus.quests[action.questProgress.parentId]);
    pqtcQuest.progress[action.questProgress.index] =
      new QuestProgress(action.questProgress);
    pqtcQuest.progress[action.questProgress.index].resourcesConsumed = true;
    return new QuestStatus({ ...questStatus, quests: { ...questStatus.quests,
      [action.questProgress.parentId]: pqtcQuest }});

		default:
		return questStatus;
	}
};
