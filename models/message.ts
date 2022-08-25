import Icon, { IconInterface } from '../models/icon';

export default class Message {
  text: string = '';
  type: string = '';
  timestamp: Date = new Date(Date.now());
  isNew: boolean = true;
  icon?: Icon;

  constructor(message: MessageInterface) {
    Object.assign(this, message);
    if (!message.timestamp) { this.timestamp = new Date(Date.now()); }
  }

  export() {
    const expMessage: DBMessage = {
      text: this.text,
      type: this.type,
      timestamp: this.timestamp.valueOf()
    };
    if (this.icon) {
      expMessage.icon = JSON.stringify(new Icon(this.icon).export());
    }
    return expMessage;
  }
}

interface MessageInterface {
  text: string;
  type: string;
  timestamp?: Date;
  isNew?: boolean;
  icon?: Icon;
}

export interface DBMessage {
  text: string;
  type: string;
  timestamp: number;
  icon?: string;
}
