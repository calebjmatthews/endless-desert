export default class ConversationStatus {
  seen: { [name: string] : number } = {};
  responsesChosen: { [name: string] : number } = {};
  lastDailyConvo: { [leaderId: string] : number } = {};

  constructor(conversationStatus: ConversationStatus) {
    Object.assign(this, conversationStatus);
    if (!conversationStatus.lastDailyConvo) {
      this.lastDailyConvo = {};
    }
  }
};
