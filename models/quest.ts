import QuestTask from './quest_task';
import QuestProgress from './quest_progress';

export default class Quest implements QuestInterface {
  id: string = '';
  name: string = '';
  givenBy: string = '';
  description: string = '';
  tasks: QuestTask[] = [];
  progress: QuestProgress[] = [];
  readyToComplete: boolean = false;
  beganAt: number = new Date(Date.now()).valueOf();
  isDaily?: boolean;
  gainResources?: {specificity: string, type: string, value: number}[];
  leaderJoins?: string;
  questsBegin?: string[];

  constructor(quest: QuestInterface) {
    Object.assign(this, quest);
  }
}

interface QuestInterface {
  id: string;
  name: string;
  givenBy: string;
  description: string;
  tasks: QuestTask[];
  beganAt?: number;
  progress: QuestProgress[];
  readyToComplete?: boolean;
  isDaily?: boolean;
  gainResources?: {specificity: string, type: string, value: number}[];
  leaderJoins?: string;
  questsBegin?: string[];
}
