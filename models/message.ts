import Icon, { IconInterface } from '../models/icon';

export default class Message {
  text: string = '';
  type: string = '';
  timestamp: Date = new Date(Date.now());
  icon?: Icon;

  constructor(message: DBMessage) {
    Object.assign(this, message);
  }

  export() {
    const expMessage: DBMessage = { ...this };
    if (this.icon) {
      expMessage.icon = new Icon(this.icon).export();
    }
    return expMessage;
  }
}

interface MessageInterface extends DBMessage {
  icon?: Icon;
}

export interface DBMessage {
  text: string;
  type: string;
  timestamp: Date;
  icon?: IconInterface;
}
