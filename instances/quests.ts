import Quest from '../models/quest';
import QuestTask from '../models/quest_task';
import QuestProgress from '../models/quest_progress';
import { QUESTS } from '../enums/quests';
import { TABS } from '../enums/tabs';
import { RESEARCHES } from '../enums/researches';
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;

const quests: { [id: string] : Quest } = {
  [QUESTS.STUDY]: new Quest({
    id: QUESTS.STUDY,
    name: QUESTS.STUDY,
    givenBy: 'Firefly',
    description: `Some force wants you to examine the world.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.STUDY,
        label: `Complete the "Study" research.`,
        actionToPerform: { kind: TABS.RESEARCH, value: RESEARCHES.STUDY } }),
      new QuestTask({ index: 1, parentId: QUESTS.STUDY,
        label: `Study five different resources (destroying one of each in the process).`,
        actionToPerform: { kind: RESEARCHES.STUDY, quantity: 5 } })
    ],
    progress: createNewProgress(2, QUESTS.STUDY),
    questsBegin: [QUESTS.BUILD]
  }),
  [QUESTS.TESTING]: new Quest({
    id: QUESTS.TESTING,
    name: QUESTS.TESTING,
    givenBy: 'Firefly',
    description: `Is Water an inside job??? Or Lentils!?!?`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.TESTING,
        label: `Analyze 100 Water.`,
        resourceToAnalyze: { specificity: RSP.EXACT, type: RTY.WATER, quantity: 100 }}),
      new QuestTask({ index: 1, parentId: QUESTS.TESTING,
        label: `Analyze 100 bushels of Lentils.`,
        resourceToAnalyze: { specificity: RSP.EXACT, type: RTY.LENTIL, quantity: 100 }})
    ],
    progress: createNewProgress(2, QUESTS.TESTING)
  })
}

function createNewProgress(count: number, parentId: string) {
  let progress: QuestProgress[] = [];
  for (let index = 0; index < count; index++) {
    progress.push(new QuestProgress({ index, parentId }));
  }
  return progress;
}

export { quests };
