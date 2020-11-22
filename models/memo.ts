export default class Memo {
  name: string = '';
  title: string = '';
  text: string = '';
  timestamp?: Date = new Date(Date.now());

  constructor(memo: Memo) {
    Object.assign(this, memo);
  }
}
