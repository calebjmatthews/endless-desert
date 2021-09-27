export const SET_CONVERSATION_STATUS = 'SET_CONVERSATION_STATUS';
export function setConversationStatus(conversationStatus: {
  seen: { [name: string] : number },
  responsesChosen: { [name: string] : number } }) {
  return {
    type: SET_CONVERSATION_STATUS,
    conversationStatus: conversationStatus
  }
}

export const CONVERSATION_SEEN = 'CONVERSATION_SEEN';
export function conversationSeen(convoName: string) {
  return {
    type: CONVERSATION_SEEN,
    convoName: convoName
  }
}

export const RESPONSE_CHOSEN = 'RESPONSE_CHOSEN';
export function responseChosen(responseName: string) {
  return {
    type: RESPONSE_CHOSEN,
    responseName: responseName
  }
}
