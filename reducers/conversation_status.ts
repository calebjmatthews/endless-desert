import ConversationStatus from '../models/conversation_status';
import { SET_CONVERSATION_STATUS, CONVERSATION_SEEN, RESPONSE_CHOSEN,
  USE_DAILY_CONVERSATION } from '../actions/conversation_status';

let startingConversationStatus: ConversationStatus = new ConversationStatus({
  seen: {},
  responsesChosen: {},
  lastDailyConvo: {}
});

export default function (conversationStatus: ConversationStatus = startingConversationStatus,
  action: any = null) {
	switch(action.type) {
    case SET_CONVERSATION_STATUS:
    return Object.assign({}, new ConversationStatus(action.conversationStatus));

    case CONVERSATION_SEEN:
    let newSeen = Object.assign({}, conversationStatus.seen);
    if (!newSeen[action.convoName]) { newSeen[action.convoName] = 0; }
    newSeen[action.convoName]++;
    return Object.assign({}, conversationStatus, { seen: newSeen });

    case RESPONSE_CHOSEN:
    let newResponsesChosen = Object.assign({}, conversationStatus.responsesChosen);
    if (!newResponsesChosen[action.responseName]) {
      newResponsesChosen[action.responseName] = 0;
    }
    newResponsesChosen[action.responseName]++;
    return Object.assign({}, conversationStatus, {
      responsesChosen: newResponsesChosen });

    case USE_DAILY_CONVERSATION:
    let newLastDailyConvo = Object.assign({}, conversationStatus.lastDailyConvo);
    if (!newLastDailyConvo[action.leaderId]) {
      newLastDailyConvo[action.leaderId] = 0;
    }
    newLastDailyConvo[action.leaderId] = new Date(Date.now()).valueOf();
    return Object.assign({}, conversationStatus, { lastDailyConvo: newLastDailyConvo });

		default:
		return conversationStatus;
	}
};
