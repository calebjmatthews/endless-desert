import QuestTask from './quest_task';
import QuestProgress from './quest_progress';
import Icon from './icon';

export default class Quest implements QuestInterface {
  id: string = '';
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

  constructor(quest: QuestInterface|null) {
    if (quest != null) {
      Object.assign(this, quest);
      this.tasks = quest.tasks.map((task) => ( new QuestTask(task) ));
      if (this.progress.length == 0) {
        this.progress = createNewProgress(this.tasks.length, this.id);
      }
    }
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
}
