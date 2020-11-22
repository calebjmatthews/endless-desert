import Message from '../models/message';
import Memo from '../models/memo';

export const SET_GLOBAL_STATE = 'SET_GLOBAL_STATE';
export function setGlobalState(globalState: string) {
  return {
    type: SET_GLOBAL_STATE,
    globalState: globalState
  }
}

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

export const ADD_MESSAGE = 'ADD_MESSAGE';
export function addMessage(message: Message) {
  return {
    type: ADD_MESSAGE,
    message: message
  }
}

export const ADD_MEMOS = 'ADD_MEMOS';
export function addMemos(memos: Memo[]) {
  return {
    type: ADD_MEMOS,
    memos: memos
  }
}

export const DISMISS_MEMO = 'DISMISS_MEMO';
export function dismissMemo() {
  return {
    type: DISMISS_MEMO
  }
}
