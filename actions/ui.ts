export const SELECT_TAB = 'SELECT_TAB';
export function selectTab(tabSelected: string, valueSelected: any = '') {
  return {
    type: SELECT_TAB,
    tabSelected: tabSelected,
    valueSelected: valueSelected
  };
}

export const DISPLAY_MODAL = 'DISPLAY_MODAL';
export function displayModal(modalType: string|null) {
  return {
    type: DISPLAY_MODAL,
    modalType: modalType
  };
}

export const DISPLAY_MODAL_VALUE = 'DISPLAY_MODAL_VALUE';
export function displayModalValue(modalType: string|null, modalStage: string,
  modalValue: any) {
  return {
    type: DISPLAY_MODAL_VALUE,
    modalType: modalType,
    modalStage: modalStage,
    modalValue: modalValue
  };
}
