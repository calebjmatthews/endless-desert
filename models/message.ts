export default class Message {
  text: string = '';
  type: string = '';
  timestamp: Date = new Date(Date.now());
  icon: {provider: string, name: string}|null = null;
  foregroundColor: string|null = null;
  backgroundColor: string|null = null;

  constructor(message: Message) {
    Object.assign(this, message);
  }
}
