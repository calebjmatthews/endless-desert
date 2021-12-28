import QuestTask from './quest_task';
import QuestProgress from './quest_progress';
import QuestActivity from './quest_activity';
import Icon from './icon';
import Vault from './vault';
import { Conversation } from './conversation';
import { utils } from '../utils';

export default class Quest implements QuestInterface {
  id: string = '';
  subtitle?: string;
  name: string = '';
  givenBy: string = '';
  icon?: Icon;
  description: string = '';
  finishText: string = '';
  tasks: QuestTask[] = [];
  progress: QuestProgress[] = [];
  readyToComplete: boolean = false;
  beganAt: number = new Date(Date.now()).valueOf();
  isDaily?: boolean;
  gainResources?: {specificity: string, type: string, value: number}[];
  leaderJoins?: string;
  questsBegin?: string[];
  conversationBegins?: Conversation;
  researchUnlocked?: string;

  constructor(quest: QuestInterface|null) {
    if (quest != null) {
      Object.assign(this, quest);
      this.tasks = quest.tasks.map((task) => ( new QuestTask(task) ));
      if (this.progress.length == 0) {
        this.progress = createNewProgress(this.tasks.length, this.id);
      }
    }
  }

  resourceToGainCheckExisting(vault: Vault) {
    let questActivities: QuestActivity[] = [];
    for (let index = 0; index < this.tasks.length; index++) {
      const task = this.tasks[index];
      if (task.resourceToGain) {
        const rToGain = task.resourceToGain;
        const quantity = Math.floor(vault.getSpecificityQuantity(rToGain.specificity,
          rToGain.type));
        if (quantity) {
          questActivities.push(new QuestActivity({ id: utils.randHex(16),
            resourceGained: { type: rToGain.type, quantity } }));
        }
      }
    }
    return questActivities;
  }
}

function createNewProgress(count: number, parentId: string) {
  let progress: QuestProgress[] = [];
  for (let index = 0; index < count; index++) {
    progress.push(new QuestProgress({ index, parentId }));
  }
  return progress;
}

interface QuestInterface {
  id: string;
  subtitle?: string;
  name: string;
  givenBy: string;
  icon?: Icon;
  description: string;
  finishText: string;
  tasks: QuestTask[];
  beganAt?: number;
  progress?: QuestProgress[];
  readyToComplete?: boolean;
  isDaily?: boolean;
  gainResources?: {specificity: string, type: string, value: number}[];
  leaderJoins?: string;
  questsBegin?: string[];
  conversationBegins?: Conversation;
  researchUnlocked?: string;
}
