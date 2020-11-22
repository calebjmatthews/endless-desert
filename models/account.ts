export default class Account {
  id: number = 0;
  introState: string = '';
  tabsUnloked: string[] = [];
  showCompletedResearches: boolean = false;

  constructor(account: Account) {
    Object.assign(this, account);
  }
}
