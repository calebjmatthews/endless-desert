import { SET_CONVERSATION_STATUS, CONVERSATION_SEEN, RESPONSE_CHOSEN }
  from '../actions/conversation_status';

let startingConversationStatus: { seen: { [name: string] : number },
  responsesChosen: { [name: string] : number } } = { seen: {}, responsesChosen: {} };

export default function (conversationStatus: { seen: { [name: string] : number },
  responsesChosen: { [name: string] : number } } = startingConversationStatus,
  action: any = null) {
	switch(action.type) {
    case SET_CONVERSATION_STATUS:
    return Object.assign({}, action.conversationStatus);

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

		default:
		return conversationStatus;
	}
};
