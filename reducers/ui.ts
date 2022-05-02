import { SET_GLOBAL_STATE, SELECT_TAB, DISPLAY_MODAL, DISPLAY_MODAL_VALUE,
  ADD_MEMOS, DISMISS_MEMO, SET_POSITIONER } from '../actions/ui';

import Message from '../models/message';
import Memo from '../models/memo';
import Positioner from '../models/positioner';
import { TABS } from '../enums/tabs';

export default function (ui: { globalState: string, tabSelected: string,
  valueSelected: any, modalDisplayed: string|null, modalStage: string, modalValue: any,
  memos: Memo[], positioner: Positioner } =
  { globalState: 'loading', tabSelected: TABS.TOWN, valueSelected: null,
  modalDisplayed: null, modalStage: 'closed', modalValue: null,
  memos: [], positioner: new Positioner() },
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

    case ADD_MEMOS:
    return Object.assign({}, ui, {memos: [...ui.memos, ...action.memos]});

    case DISMISS_MEMO:
    return Object.assign({}, ui, {memos: [...ui.memos.slice(1)]});

    case SET_POSITIONER:
    return Object.assign({}, ui, {positioner: action.positioner});

		default:
		return ui;
	}
};
