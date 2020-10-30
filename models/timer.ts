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
  resourcesToIncrease: {type: string, quantity: number}[] = [];
  resourcesToConsume: {type: string, quantity: number}[] = [];
  messageToDisplay: string|null = null;
  iconToDisplay: {provider: string, name: string}|null = null;
  iconForegroundColor: string|null = null;
  iconBackgroundColor: string|null = null;

  constructor(timer: TimerInterface) {
    Object.assign(this, timer);
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
  resourcesToIncrease: {type: string, quantity: number}[];
  resourcesToConsume: {type: string, quantity: number}[];
  messageToDisplay: string|null;
  iconToDisplay: {provider: string, name: string}|null;
  iconForegroundColor: string|null;
  iconBackgroundColor: string|null;
}
