import { SELECT_TAB, DISPLAY_MODAL } from '../actions/ui';

export default function (ui: {tabSelected: string, valueSelected: string,
  modalDisplayed: string|null} =
  {tabSelected: "Resources", valueSelected: '', modalDisplayed: null},
  action: any = null) {
	switch(action.type) {
    case SELECT_TAB:
    return Object.assign({}, ui, {tabSelected: action.tabSelected,
      valueSelected: action.valueSelected});

    case DISPLAY_MODAL:
    return Object.assign({}, ui, {modalDisplayed: action.modalType});

		default:
		return ui;
	}
};
