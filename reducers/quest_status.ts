import QuestStatus from '../models/quest_status';
import Quest from '../models/quest';
import QuestCompleted from '../models/quest_completed';
import QuestProgress from '../models/quest_progress';
import { SET_QUEST_STATUS, ADD_QUEST, REMOVE_QUEST, ADD_TO_ACTIVITY_QUEUE,
  REMOVE_FROM_ACTIVITY_QUEUE, SET_QUEST_PROGRESS, SET_QUEST_READY_TO_COMPLETE,
  ADD_QUEST_COMPLETED } from '../actions/quest_status';

export default function (questStatus: QuestStatus = { quests: {}, questsCompleted: {},
  activityQueue: [], resourcesToCheck: {} }, action: any = null) {
	switch(action.type) {
    case SET_QUEST_STATUS:
    return new QuestStatus(action.questStatus);

    case ADD_QUEST:
    return new QuestStatus({ ...questStatus,
      quests: {...questStatus.quests, [action.quest.id]: action.quest} });

    case REMOVE_QUEST:
    let rqQuests = {...questStatus.quests};
    delete rqQuests[action.id];
    return new QuestStatus({ ...questStatus, quests: rqQuests });

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

		default:
		return questStatus;
	}
};
