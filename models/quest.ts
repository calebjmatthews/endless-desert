import QuestTask, { DBQuestTask } from './quest_task';
import QuestProgress from './quest_progress';
import QuestActivity from './quest_activity';
import Icon, { IconInterface } from './icon';
import Vault from './vault';
import Resource from './resource';
import ResearchStatus from './research_status';
import { Conversation } from './conversation';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { ACTIVITIES } from '../enums/activities';

export default class Quest implements QuestInterface {
  id: string = '';
  subtitle?: string;
  name: string = '';
  givenBy: string = '';
  type: string = '';
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
  tradingPartnerJoins?: string;
  conversationBegins?: Conversation;

  constructor(quest: DBQuest|null) {
    if (quest != null) {
      Object.assign(this, quest);
      this.tasks = quest.tasks.map((task) => ( new QuestTask(task) ));
      if (this.progress.length == 0) {
        this.progress = createNewProgress(this.tasks.length, this.id);
      }
    }
  }

  taskCheckExisting(vault: Vault, researchStatus: ResearchStatus) {
    let questActivities: QuestActivity[] = [];
    for (let index = 0; index < this.tasks.length; index++) {
      const task = this.tasks[index];
      if (task.resourceToGain?.includeExisting) {
        const rToGain = task.resourceToGain;
        const quantity = Math.floor(vault.getSpecificityQuantity(rToGain.specificity,
          rToGain.type));
        if (quantity) {
          questActivities.push(new QuestActivity({ id: utils.randHex(16),
            resourceGained: { type: rToGain.type, quantity } }));
        }
      }
      if (task.resourceToProduce?.includeExisting) {
        const rToProd = task.resourceToProduce;
        const [ specificity, type ] = rToProd.specType.split('|');
        const quantity = Math.floor(vault.getSpecificityQuantity(specificity, type));
        if (quantity) {
          questActivities.push(new QuestActivity({ id: utils.randHex(16),
            resourcesProduced: [{ specType: rToProd.specType, quantity }] }));
        }
      }
      if (task.actionToPerform?.includeExisting && task.actionToPerform?.value
        && task.actionToPerform?.kind == ACTIVITIES.RESEARCH) {
        if (researchStatus.status[task.actionToPerform.value] == 'completed') {
          questActivities.push(new QuestActivity({ id: utils.randHex(16),
            actionPerformed: task.actionToPerform }));
        }
      }
    }
    return questActivities;
  }

  getResourcesConsumed() {
    let resourcesConsumed: Resource[] = [];
    this.tasks.forEach((task) => {
      if (task.resourceToGain?.consumed) {
        if (task.resourceToGain.specificity != RESOURCE_SPECIFICITY.EXACT) {
          console.log('Time to implement this!');
        }
        else {
          resourcesConsumed.push(new Resource({ type: task.resourceToGain.type,
            quality: 0, quantity: task.resourceToGain.quantity }));
        }
      }
      if (task.resourceToProduce?.consumed) {
        const [ specificity, type ] = task.resourceToProduce.specType.split('|');
        if (specificity != RESOURCE_SPECIFICITY.EXACT) {
          console.log('Time to implement this!');
        }
        else {
          resourcesConsumed.push(new Resource({ type, quality: 0,
            quantity: task.resourceToProduce.quantity }));
        }
      }
    });
    if (resourcesConsumed.length === 0) { return null; }
    return resourcesConsumed;
  }

  export() {
    const expQuest: DBQuest = Object.assign({}, this);
    if (this.icon) { expQuest.icon = new Icon(this.icon).export(); }
    expQuest.tasks = this.tasks.map((task) => {
      return new QuestTask(task).export();
    });
    return expQuest;
  }
}

function createNewProgress(count: number, parentId: string) {
  let progress: QuestProgress[] = [];
  for (let index = 0; index < count; index++) {
    progress.push(new QuestProgress({ index, parentId }));
  }
  return progress;
}

interface QuestInterface extends DBQuest {
  icon?: Icon;
  tasks: QuestTask[];
}

export interface DBQuest {
  id: string;
  subtitle?: string;
  name: string;
  givenBy: string;
  type: string;
  icon?: IconInterface;
  description: string;
  finishText: string;
  tasks: DBQuestTask[];
  beganAt?: number;
  progress?: QuestProgress[];
  readyToComplete?: boolean;
  isDaily?: boolean;
  gainResources?: {specificity: string, type: string, value: number}[];
  leaderJoins?: string;
  questsBegin?: string[];
  tradingPartnerJoins?: string;
  conversationBegins?: Conversation;
}
