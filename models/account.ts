import Fortuity from './fortuity';

export default class Account {
  id: number = 0;
  introState: string = '';
  tabsUnloked: string[] = [];
  fortuityCurrent: Fortuity|null = null;
  fortuitiesSeen: { [name: string] : number } = {};
  showCompletedResearches: boolean = false;

  constructor(account: Account) {
    Object.assign(this, account);
  }
}
