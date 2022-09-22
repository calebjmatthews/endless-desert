import Resource from './resource';
import Message from './message';

export default class Memo {
  name: string = '';
  title?: string;
  text?: string;
  convoName?: string;
  resourcesGained?: Resource[]|null = null;
  resourcesConsumed?: Resource[]|null = null;
  messages?: Message[]|null = null;
  leaderJoined?: string|null = null;
  questsBegin?: string[]|null = null;
  duration?: number|null = null;
  timestamp?: Date = new Date(Date.now());

  constructor(memo: Memo) {
    Object.assign(this, memo);
  }
}
