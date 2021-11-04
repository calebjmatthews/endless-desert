import Quest from '../models/quest';
import QuestTask from '../models/quest_task';
import QuestProgress from '../models/quest_progress';
import { QUESTS } from '../enums/quests';
import { TABS } from '../enums/tabs';
import { RESEARCHES } from '../enums/researches';

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
  })
}

function createNewProgress(count: number, parentId: string) {
  let progress: QuestProgress[] = [];
  for (let index = 0; index < count; index++) {
    progress.push(new QuestProgress({ index, parentId }));
  }
  return progress;
}
