import Resource from './resource';
import Icon from './icon';
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
  buildingToBuild?: string|null = null;
  buildingToUpgrade?: string|null = null;
  tradingPartnerToArrive?: string|null = null;
  fortuityCheck?: boolean = false;
  messageToDisplay: string|null = null;
  iconToDisplay: Icon|null = null;

  constructor(timer: TimerInterface) {
    Object.assign(this, timer);
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
}

interface TimerInterface {
  name: string;
  startedAt: number;
  endsAt: number;
  progress: number;
  remainingLabel: string;
  resourcesToIncrease?: Resource[];
  resourcesToConsume?: Resource[];
  buildingToBuild?: string|null;
  buildingToUpgrade?: string|null;
  tradingPartnerToArrive?: string|null;
  fortuityCheck?: boolean;
  messageToDisplay: string|null;
  iconToDisplay: {provider: string, name: string}|null;
}
