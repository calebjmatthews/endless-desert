import QuestStatus from '../models/quest_status';
import Quest from '../models/quest';
import QuestActivity from '../models/quest_activity';
import QuestProgress from '../models/quest_progress';
import QuestCompleted from '../models/quest_completed';

export const SET_QUEST_STATUS = 'SET_QUEST_STATUS';
export function setQuestStatus(questStatus: QuestStatus) {
  return {
    type: SET_QUEST_STATUS,
    questStatus: questStatus
  }
}

export const ADD_QUEST = 'ADD_QUEST';
export function addQuest(quest: Quest) {
  return {
    type: ADD_QUEST,
    quest: quest
  }
}

export const REMOVE_QUEST = 'REMOVE_QUEST';
export function removeQuest(id: string) {
  return {
    type: REMOVE_QUEST,
    id: id
  }
}

export const ADD_TO_ACTIVITY_QUEUE = 'ADD_TO_ACTIVITY_QUEUE';
export function addToActivityQueue(questActivity: QuestActivity) {
  return {
    type: ADD_TO_ACTIVITY_QUEUE,
    questActivity: questActivity
  }
}

export const REMOVE_FROM_ACTIVITY_QUEUE = 'REMOVE_FROM_ACTIVITY_QUEUE';
export function removeFromActivityQueue(id: string) {
  return {
    type: REMOVE_FROM_ACTIVITY_QUEUE,
    id: id
  }
}

export const SET_QUEST_PROGRESS = 'SET_QUEST_PROGRESS';
export function setQuestProgress(questProgress: QuestProgress) {
  return {
    type: SET_QUEST_PROGRESS,
    questProgress: questProgress
  }
}

export const SET_QUEST_READY_TO_COMPLETE = 'QUEST_READY_TO_COMPLETE';
export function setQuestReadyToComplete(id: string) {
  return {
    type: SET_QUEST_READY_TO_COMPLETE,
    id: id
  }
}

export const ADD_QUEST_COMPLETED = 'ADD_QUEST_COMPLETED';
export function addQuestCompleted(questCompleted: QuestCompleted) {
  return {
    type: ADD_QUEST_COMPLETED,
    questCompleted: questCompleted
  }
}
