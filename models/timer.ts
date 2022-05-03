import Resource from './resource';
import QuestActivity from './quest_activity';
import Icon, { IconInterface } from './icon';
import { utils } from '../utils';

export default class Timer implements TimerInterface {
  name: string = '';
  // Millisecond timestamp when timer was created
  startedAt: number = 0;
  // Millisecond timestamp when timer will end
  endsAt: number = 0;
  // Progress as a number between 0 and 1
  progress: number = 0;
  // Human readable amount of time remaining
  remainingLabel: string = '';
  resourcesToIncrease?: Resource[] = [];
  resourcesToConsume?: Resource[] = [];
  buildingToBuild?: { type: string, coords: [number, number] }|null = null;
  buildingToUpgrade?: string|null = null;
  tradingPartnerToArrive?: string|null = null;
  fortuityCheck?: boolean = false;
  dailyQuestCheck?: boolean = false;
  questActivity?: QuestActivity|null = null;
  messageToDisplay: string|null = null;
  iconToDisplay: Icon|null = null;

  constructor(timer: TimerInterface) {
    Object.assign(this, timer);
    if (!timer.startedAt) { this.startedAt = new Date(Date.now()).valueOf(); }
    if (!timer.progress) { this.setProgress(); }
    if (!timer.resourcesToIncrease) { this.resourcesToIncrease = []; }
    if (!timer.resourcesToConsume) { this.resourcesToConsume = []; }
    this.setProgress();
    this.setRemainingLabel();
  }

  setProgress() {
    let diff = this.endsAt - new Date(Date.now()).valueOf();
    if (diff > 0) {
      let oDiff = this.endsAt - this.startedAt;
      this.progress = (1 - diff / oDiff) * 100;
    }
    else {
      this.progress = 100;
    }
  }

  setRemainingLabel() {
    let diff = this.endsAt - new Date(Date.now()).valueOf();
    if (diff > 0) {
      this.remainingLabel = utils.formatDuration(diff);
    }
    else {
      this.remainingLabel = '';
    }
  }

  export() {
    const expTimer: DBTimer = {
      name: this.name,
      endsAt: this.endsAt
    };
    if (this.startedAt) { expTimer.startedAt = this.startedAt; }
    if (this.progress) { expTimer.progress = this.progress; }
    if (this.remainingLabel) { expTimer.remainingLabel = this.remainingLabel; }
    if ((this.resourcesToIncrease?.length || 0) > 0) {
      expTimer.resourcesToIncrease = this.resourcesToIncrease;
    }
    if ((this.resourcesToConsume?.length || 0) > 0) {
      expTimer.resourcesToConsume = this.resourcesToConsume;
    }
    if (this.buildingToBuild) { expTimer.buildingToBuild = this.buildingToBuild; }
    if (this.buildingToUpgrade) { expTimer.buildingToUpgrade = this.buildingToUpgrade; }
    if (this.tradingPartnerToArrive) {
      expTimer.tradingPartnerToArrive = this.tradingPartnerToArrive;
    }
    if (this.fortuityCheck) { expTimer.fortuityCheck = this.fortuityCheck; }
    if (this.dailyQuestCheck) { expTimer.dailyQuestCheck = this.dailyQuestCheck; }
    if (this.dailyQuestCheck) { expTimer.dailyQuestCheck = this.dailyQuestCheck; }
    if (this.questActivity) { expTimer.questActivity = this.questActivity; }
    if (this.messageToDisplay) { expTimer.messageToDisplay = this.messageToDisplay; }
    if (this.iconToDisplay) {
      expTimer.iconToDisplay = new Icon(this.iconToDisplay).export();
    }
    return expTimer;
  }
}

interface TimerInterface {
  name: string;
  startedAt?: number;
  endsAt: number;
  progress?: number;
  remainingLabel?: string;
  resourcesToIncrease?: Resource[];
  resourcesToConsume?: Resource[];
  buildingToBuild?: { type: string, coords: [number, number] }|null;
  buildingToUpgrade?: string|null;
  tradingPartnerToArrive?: string|null;
  fortuityCheck?: boolean;
  dailyQuestCheck?: boolean;
  questActivity?: QuestActivity|null;
  messageToDisplay?: string|null;
  iconToDisplay?: {provider: string, name: string}|null;
}

export interface DBTimer extends TimerInterface {
  iconToDisplay?: IconInterface;
}
