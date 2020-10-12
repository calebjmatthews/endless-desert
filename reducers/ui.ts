import { DISPLAY_MODAL } from '../actions/ui';

export default function (ui: {modalDisplayed: string|null} =
  {modalDisplayed: null},
  action: any = null) {
	switch(action.type) {
    case DISPLAY_MODAL:
    let newUI = Object.assign({}, ui, {modalDisplayed: action.modalType});
    return newUI;
    break;

		default:
		return ui;
	}
};
