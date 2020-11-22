export default class Memo {
  text: string = '';
  title: string = '';
  timestamp: Date = new Date(Date.now());

  constructor(memo: Memo) {
    Object.assign(this, memo);
  }
}
