import Message from '../models/message';

export const SET_MESSAGES = "SET_MESSAGES";
export function setMessages(messages: Message[]) {
  return {
    type: SET_MESSAGES,
    messages
  }
}

export const ADD_MESSAGE = "ADD_MESSAGE";
export function addMessage(message: Message) {
  return {
    type: ADD_MESSAGE,
    message
  }
}
