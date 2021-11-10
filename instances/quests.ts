import Quest from '../models/quest';
import QuestTask from '../models/quest_task';
import QuestProgress from '../models/quest_progress';
import { utils } from '../utils';
import { QUESTS } from '../enums/quests';
import { TABS } from '../enums/tabs';
import { RESEARCHES } from '../enums/researches';
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;

const testingId = utils.randHex(16);
const quests: { [id: string] : Quest } = {
  [QUESTS.STUDY]: new Quest({
    id: QUESTS.STUDY,
    name: QUESTS.STUDY,
    givenBy: 'Firefly',
    description: `Some force wants you to examine the world.`,
    finishText: `Studying each new resource you find keeps the Knowledge flowing, and something tells you there may be even more benefits you haven't yet discovered.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.STUDY,
        label: `Complete the "Study" research.`,
        actionToPerform: { kind: TABS.RESEARCH, value: RESEARCHES.STUDY } }),
      new QuestTask({ index: 1, parentId: QUESTS.STUDY,
        label: `Study five different resources (destroying one of each in the process).`,
        actionToPerform: { kind: RESEARCHES.STUDY, quantity: 5 } })
    ],
    progress: createNewProgress(2, QUESTS.STUDY),
    gainResources: [{ specificity: RSP.EXACT, type: RTY.KNOWLEDGE, value: 200 }],
    questsBegin: [QUESTS.BUILD]
  }),
  [QUESTS.TESTING]: new Quest({
    id: testingId,
    name: QUESTS.TESTING,
    givenBy: 'Firefly',
    description: `Is Water an inside job??? Or Lentils!?!?`,
    finishText: `Turns out, neither Water nor Lentils are an inside job.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.TESTING,
        label: `Produce 100 Water.`,
        resourceToProduce: { specType: (`${RSP.EXACT}|${RTY.WATER}`), quantity: 100 }}),
      new QuestTask({ index: 1, parentId: QUESTS.TESTING,
        label: `Produce 10 Lentil.`,
        resourceToProduce: { specType: (`${RSP.EXACT}|${RTY.LENTIL}`), quantity: 10 }})
    ],
    progress: createNewProgress(2, testingId),
    gainResources: [{ specificity: RSP.EXACT, type: RTY.JADE, value: 2000 }],
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
