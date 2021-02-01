import Fortuity from './fortuity';

export default class Account {
  userId: string = '0';
  sessionId: string = '';
  introState: string = '';
  tabsUnloked: string[] = [];
  fortuityCurrent: Fortuity|null = null;
  fortuitiesSeen: { [name: string] : number } = {};
  showCompletedResearches: boolean = false;

  constructor(account: Account) {
    Object.assign(this, account);
  }
}
