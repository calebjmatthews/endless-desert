export default class Account {
  id: number = 0;
  showCompletedResearches: boolean = false;

  constructor(account: Account) {
    Object.assign(this, account);
  }
}
