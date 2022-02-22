import Fortuity from './fortuity';

export default class Account {
  userId: string = '0';
  sessionId: string = '';
  introState: string = '';
  tabsUnloked: string[] = [];
  fortuityCurrent: Fortuity|null = null;
  fortuitiesSeen: { [name: string] : number } = {};
  fortuityDailyLast: number = 0;
  showCompletedResearches: boolean = false;
  milestones: { [name: string] : boolean } = {};

  constructor(account: Account) {
    Object.assign(this, account);
    this.fortuitiesSeen = Object.assign({}, account.fortuitiesSeen);
    this.milestones = Object.assign({}, (account.milestones || {}));
  }
}
