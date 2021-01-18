export default class Memo {
  name: string = '';
  title: string = '';
  text: string = '';
  resourcesGained?: { type: string; quantity: number }[]|null = null;
  leaderJoined?: string|null = null;
  timestamp?: Date = new Date(Date.now());

  constructor(memo: Memo) {
    Object.assign(this, memo);
  }
}
