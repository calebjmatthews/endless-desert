import React, { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

import Quest from '../models/quest';
import QuestActivity from '../models/quest_activity';
import QuestProgress from '../models/quest_progress';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;

import { setQuestProgress, setQuestReadyToComplete } from '../actions/quest_status';

export default function QuestHandlerComponent() {
  const dispatch = useDispatch();
  const questStatus = useTypedSelector(state => state.questStatus);

  useEffect(() => {
    const questActivity = questStatus.activityQueue[0];
    if (questActivity) {
      if (questActivity.resourcesProduced) {
        Object.keys(questStatus.quests).forEach((id) => {
          const quest = questStatus.quests[id];
          if (!quest.readyToComplete) {
            let questProgress: QuestProgress|null = null;
            quest.tasks.forEach((task, index) => {
              if (task.resourceToProduce) {
                const quantityAdd = taskMatchResourceToProduce(task.resourceToProduce,
                  questActivity.resourcesProduced);
                if (quantityAdd) {
                  questProgress = new QuestProgress(quest.progress[index]);
                  questProgress = questProgress.addProgress('resourceProduced',
                    quantityAdd);
                }
              }
            });
            if (questProgress) { handleQuestProgress(quest, questProgress); }
          }
        });
      }
      if (questActivity.resourceAnalyzed) {
        Object.keys(questStatus.quests).forEach((id) => {
          const quest = questStatus.quests[id];
          if (!quest.readyToComplete) {
            let questProgress: QuestProgress|null = null;
            quest.tasks.forEach((task, index) => {
              if (task.resourceToAnalyze) {
                const quantityAdd = taskMatchResourceToAnalyze(task.resourceToAnalyze,
                  questActivity.resourceAnalyzed);
                if (quantityAdd) {
                  questProgress = new QuestProgress(quest.progress[index]);
                  questProgress = questProgress.addProgress('resourceAnalyzed',
                    quantityAdd);
                }
              }
            });
            if (questProgress) { handleQuestProgress(quest, questProgress); }
          }
        });
      }
      if (questActivity.dishesCooked) {
        Object.keys(questStatus.quests).forEach((id) => {
          const quest = questStatus.quests[id];
          if (!quest.readyToComplete) {
            let questProgress: QuestProgress|null = null;
            quest.tasks.forEach((task, index) => {
              if (task.dishToCook) {
                const quantityAdd = taskMatchDishToCook(task.dishToCook,
                  questActivity.dishesCooked);
                if (quantityAdd) {
                  questProgress = new QuestProgress(quest.progress[index]);
                  questProgress = questProgress.addProgress('dishCooked', quantityAdd);
                }
              }
            });
            if (questProgress) { handleQuestProgress(quest, questProgress); }
          }
        });
      }
      if (questActivity.tradedWith) {
        Object.keys(questStatus.quests).forEach((id) => {
          const quest = questStatus.quests[id];
          if (!quest.readyToComplete) {
            let questProgress: QuestProgress|null = null;
            quest.tasks.forEach((task, index) => {
              if (task.tradeWith) {
                const quantityAdd = taskMatchTradeWith(task.tradeWith,
                  questActivity.tradedWith);
                if (quantityAdd) {
                  questProgress = new QuestProgress(quest.progress[index]);
                  questProgress = questProgress.addProgress('tradedWith', quantityAdd);
                }
              }
            });
            if (questProgress) { handleQuestProgress(quest, questProgress); }
          }
        });
      }
      if (questActivity.equipmentMarked) {
        Object.keys(questStatus.quests).forEach((id) => {
          const quest = questStatus.quests[id];
          if (!quest.readyToComplete) {
            let questProgress: QuestProgress|null = null;
            quest.tasks.forEach((task, index) => {
              if (task.equipmentToMark) {
                const quantityAdd = taskMatchEquipmentToMark(task.equipmentToMark,
                  questActivity.equipmentMarked);
                if (quantityAdd) {
                  questProgress = new QuestProgress(quest.progress[index]);
                  questProgress = questProgress.addProgress('equipmentMarked',
                    quantityAdd);
                }
              }
            });
            if (questProgress) { handleQuestProgress(quest, questProgress); }
          }
        });
      }
      if (questActivity.actionPerformed) {
        Object.keys(questStatus.quests).forEach((id) => {
          const quest = questStatus.quests[id];
          if (!quest.readyToComplete) {
            let questProgress: QuestProgress|null = null;
            quest.tasks.forEach((task, index) => {
              if (task.actionToPerform) {
                const quantityAdd = taskMatchActionToPerform(task.actionToPerform,
                  questActivity.actionPerformed);
                if (quantityAdd) {
                  questProgress = new QuestProgress(quest.progress[index]);
                  questProgress = questProgress.addProgress('actionPerformed',
                    quantityAdd);
                }
              }
            });
            if (questProgress) { handleQuestProgress(quest, questProgress); }
          }
        });
      }
    }
  }, [questStatus.activityQueue]);

  function handleQuestProgress(quest: Quest, questProgress: QuestProgress) {
    let tempQuest = new Quest(quest);
    tempQuest.progress[questProgress.index] = new QuestProgress(questProgress);
    let readyToComplete = true;
    tempQuest.tasks.forEach((task, index) => {
      const progress = quest.progress[index];
      if (task.resourceToProduce) {
        if ((progress.resourceProduced || 0) < task.resourceToProduce.quantity) {
          readyToComplete = false;
        }
      }
      if (task.resourceToAnalyze) {
        if ((progress.resourceAnalyzed || 0) < task.resourceToAnalyze.quantity) {
          readyToComplete = false;
        }
      }
      if (task.dishToCook) {
        if ((progress.dishCooked || 0) < task.dishToCook.quantity) {
          readyToComplete = false;
        }
      }
      if (task.tradeWith) {
        if ((progress.tradedWith || 0) < task.tradeWith.quantity) {
          readyToComplete = false;
        }
      }
      if (task.equipmentToMark) {
        if ((progress.equipmentMarked || 0) < task.equipmentToMark.quantity) {
          readyToComplete = false;
        }
      }
      if (task.actionToPerform) {
        if ((progress.actionPerformed || 0) < (task.actionToPerform.quantity || 1)) {
          readyToComplete = false;
        }
      }
    });
    if (readyToComplete) { dispatch(setQuestReadyToComplete(quest.id)); }
    dispatch(setQuestProgress(questProgress));
  }

  return <></>;
}

function taskMatchResourceToProduce(resourceToProduce:
  {specificity: string, type: string, quantity: number}, resourcesProduced:
  {type: string, quantity: number}[]|undefined) {
  if (!resourcesProduced) { return 0; }
  let quantity = 0;
  resourcesProduced.forEach((resourceProduced) => {
    const resourceType = resourceTypes[resourceProduced.type];
    switch(resourceToProduce.specificity) {
      case RSP.CATEGORY:
      if (resourceType.category === resourceToProduce.type) {
        quantity += resourceProduced.quantity;
      }
      break;
      case RSP.SUBCATEGORY:
      if (resourceType.subcategory === resourceToProduce.type) {
        quantity += resourceProduced.quantity;
      }
      break;
      case RSP.TAG:
      resourceType.tags.forEach((tag) => {
        if (tag === resourceToProduce.type) {
          quantity += resourceProduced.quantity;
        }
      });
      break;
      case RSP.EXACT:
      if (resourceProduced.type === resourceToProduce.type) {
        quantity += resourceProduced.quantity;
      }
      break;
    }
  });
  return quantity;
}

function taskMatchResourceToAnalyze(resourceToAnalyze:
  {specificity: string, type: string, quantity: number}, resourceAnalyzed:
  {type: string, quantity: number}|undefined) {
  if (!resourceAnalyzed) { return 0; }
  let quantity = 0;
  const resourceType = resourceTypes[resourceAnalyzed.type];
  switch(resourceToAnalyze.specificity) {
    case RSP.CATEGORY:
    if (resourceType.category === resourceToAnalyze.type) {
      quantity = resourceAnalyzed.quantity;
    }
    break;
    case RSP.SUBCATEGORY:
    if (resourceType.subcategory === resourceToAnalyze.type) {
      quantity = resourceAnalyzed.quantity;
    }
    break;
    case RSP.TAG:
    resourceType.tags.forEach((tag) => {
      if (tag === resourceToAnalyze.type) {
        quantity = resourceAnalyzed.quantity;
      }
    });
    break;
    case RSP.EXACT:
    if (resourceAnalyzed.type === resourceToAnalyze.type) {
      quantity = resourceAnalyzed.quantity;
    }
    break;
  }
  return quantity;
}

function taskMatchDishToCook(dishToCook: {specTypes:
  {specificity: string, type: string}[], quantity: number}, dishesCooked:
  {type: string, tags: string[], quantity: number}[]|undefined) {
  if (!dishesCooked) { return 0; }
  let quantity = 0;
  dishesCooked.forEach((dishCooked) => {
    let isDishMatch: boolean = true;
    dishToCook.specTypes.forEach((specType) => {
      let isSpecTypeMatched: boolean = false;
      switch(specType.specificity) {
        case RSP.TAG:
        dishCooked.tags.forEach((tag) => {
          if (tag === specType.type) {
            isSpecTypeMatched = true;
          }
        });
        break;
        case RSP.EXACT:
        if (dishCooked.type === specType.type) {
          isSpecTypeMatched = true;
        }
        break;
      }
      if (!isSpecTypeMatched) { isDishMatch = false; }
    });
    if (isDishMatch) { quantity += dishCooked.quantity; }
  });
  return quantity;
}

function taskMatchTradeWith(tradeWith: {typeName: string, quantity: number},
  tradedWith: {typeName: string, quantity: number}|undefined) {
  if (!tradedWith) { return 0; }
  let quantity = 0;
  if (tradeWith.typeName == tradedWith.typeName) {
    quantity = tradedWith.quantity;
  }
  return quantity;
}

function taskMatchEquipmentToMark(equipmentToMark:
  {specificity?: string, type?: string, rarity?: number, quantity: number},
  equipmentMarked:
  {typeName: string, rarity: number, quantity: number}|undefined) {
  if (!equipmentMarked) { return 0; }
  let quantity = 0;
  if (equipmentToMark.rarity && equipmentToMark.rarity > equipmentMarked.rarity) {
    return 0;
  }
  const resourceType = resourceTypes[equipmentMarked.typeName + ' (Unmarked)'];
  switch(equipmentToMark.specificity) {
    case RSP.CATEGORY:
    if (resourceType.category === equipmentToMark.type) {
      quantity = equipmentMarked.quantity;
    }
    break;
    case RSP.SUBCATEGORY:
    if (resourceType.subcategory === equipmentToMark.type) {
      quantity = equipmentMarked.quantity;
    }
    break;
    case RSP.TAG:
    resourceType.tags.forEach((tag) => {
      if (tag === equipmentToMark.type) {
        quantity = equipmentMarked.quantity;
      }
    });
    break;
    case RSP.EXACT:
    if (equipmentMarked.typeName === equipmentToMark.type) {
      quantity = equipmentMarked.quantity;
    }
    break;
  }
  return quantity;
}

function taskMatchActionToPerform(actionToPerform:
  {kind: string, value?: string, quantity?: number}, actionPerformed:
  {kind: string, value: string|null, quantity: number|null}|undefined) {
  if (!actionPerformed) { return 0; }
  if (actionPerformed.kind != actionToPerform.kind) {
    return 0;
  }
  if (actionToPerform.value && actionPerformed.value != actionToPerform.value) {
    return 0;
  }
  return actionPerformed.quantity || 1;
}
