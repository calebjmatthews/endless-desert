import ConversationStatus from '../models/conversation_status';

export const SET_CONVERSATION_STATUS = 'SET_CONVERSATION_STATUS';
export function setConversationStatus(conversationStatus: ConversationStatus) {
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

export const USE_DAILY_CONVERSATION = 'USE_DAILY_CONVERSATION';
export function useDailyConversation(leaderId: string) {
  return {
    type: USE_DAILY_CONVERSATION,
    leaderId: leaderId
  }
}
