export const DISPLAY_MODAL = 'DISPLAY_MODAL';

export function displayModal(modalType: string|null) {
  return {
    type: DISPLAY_MODAL,
    modalType: modalType
  }
}
