import Resource from './resource';

export default class Memo {
  name: string = '';
  title: string = '';
  text: string = '';
  resourcesGained?: Resource[]|null = null;
  leaderJoined?: string|null = null;
  timestamp?: Date = new Date(Date.now());

  constructor(memo: Memo) {
    Object.assign(this, memo);
  }
}
