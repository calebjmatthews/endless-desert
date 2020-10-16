export const SELECT_TAB = 'SELECT_TAB';
export function selectTab(tabSelected: string, valueSelected: string = '') {
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
