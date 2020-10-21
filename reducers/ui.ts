import { SELECT_TAB, DISPLAY_MODAL, DISPLAY_MODAL_VALUE } from '../actions/ui';

export default function (ui: {tabSelected: string, valueSelected: any,
  modalDisplayed: string|null, modalStage: string, modalValue: any} =
  {tabSelected: "Resources", valueSelected: null, modalDisplayed: null,
  modalStage: 'closed', modalValue: null}, action: any = null) {
	switch(action.type) {
    case SELECT_TAB:
    return Object.assign({}, ui, {tabSelected: action.tabSelected,
      valueSelected: action.valueSelected});

    case DISPLAY_MODAL:
    return Object.assign({}, ui, {modalDisplayed: action.modalType});

    case DISPLAY_MODAL_VALUE:
    return Object.assign({}, ui, {modalDisplayed: action.modalType,
      modalStage: action.modalStage, modalValue: action.modalValue});

		default:
		return ui;
	}
};
