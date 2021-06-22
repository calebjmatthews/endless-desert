import Icon from '../models/icon';

export default class Message {
  text: string = '';
  type: string = '';
  timestamp: Date = new Date(Date.now());
  icon: Icon|null = null;

  constructor(message: Message) {
    Object.assign(this, message);
  }
}
