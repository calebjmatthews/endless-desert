import { SET_MESSAGES, ADD_MESSAGE } from '../actions/messages';
import Message from '../models/message';

export default function (messages: Message[] = [], action: any = null) {
	switch(action.type) {
    case SET_MESSAGES:
    return [...action.messages];

    case ADD_MESSAGE:
    return [...messages, action.message];
    break;

		default:
		return messages;
	}
};
