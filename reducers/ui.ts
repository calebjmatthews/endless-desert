import { SET_GLOBAL_STATE, SELECT_TAB, DISPLAY_MODAL, DISPLAY_MODAL_VALUE, ADD_MESSAGE }
  from '../actions/ui';

import Message from '../models/message';

export default function (ui: {globalState: string, tabSelected: string,
  valueSelected: any, modalDisplayed: string|null, modalStage: string, modalValue: any,
  messages: Message[]} =
  {globalState: 'loading', tabSelected: "Resources", valueSelected: null,
  modalDisplayed: null, modalStage: 'closed', modalValue: null, messages: []},
  action: any = null) {
	switch(action.type) {
    case SET_GLOBAL_STATE:
    return Object.assign({}, ui, {globalState: action.globalState});

    case SELECT_TAB:
    return Object.assign({}, ui, {tabSelected: action.tabSelected,
      valueSelected: action.valueSelected});

    case DISPLAY_MODAL:
    return Object.assign({}, ui, {modalDisplayed: action.modalType});

    case DISPLAY_MODAL_VALUE:
    return Object.assign({}, ui, {modalDisplayed: action.modalType,
      modalStage: action.modalStage, modalValue: action.modalValue});

    case ADD_MESSAGE:
    return Object.assign({}, ui, {messages: [...ui.messages, action.message]});

		default:
		return ui;
	}
};
