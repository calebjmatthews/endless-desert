import Memo from '../models/memo';
import Positioner from '../models/positioner';
import { utils } from '../utils';

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

export const ADD_MEMOS = 'ADD_MEMOS';
export function addMemos(memos: Memo[]) {
  return {
    type: ADD_MEMOS,
    memos: memos
  }
}

export const JOIN_WHILE_AWAY_MEMOS = 'JOIN_WHILE_AWAY_MEMOS';
export function joinWhileAwayMemos(newMemo: Memo, existingMemos: Memo[]) {
  const memos = (existingMemos.length === 0) ? [newMemo]
  : existingMemos.map((memo) => {
    if (memo.name === 'While Away') {
      return new Memo({...memo,
        resourcesGained: utils.resourceArraysCombine(newMemo.resourcesGained || [], 
          memo.resourcesGained || []),
        resourcesConsumed: utils.resourceArraysCombine(newMemo.resourcesConsumed || [], 
          memo.resourcesConsumed || []),
        duration: (newMemo.duration || 0) + (memo.duration || 0),
        messages: (newMemo.messages || memo.messages)
          ? [...(newMemo.messages || []), ...memo.messages || []] : null
      })
    }
    return memo;
  });

  return {
    type: JOIN_WHILE_AWAY_MEMOS,
    memos
  }
}

export const DISMISS_MEMO = 'DISMISS_MEMO';
export function dismissMemo() {
  return {
    type: DISMISS_MEMO
  }
}

export const ADD_GLOWING_TAB = 'ADD_GLOWING_TAB';
export function addGlowingTab(tabName: string) {
  return {
    type: ADD_GLOWING_TAB,
    tabName
  }
}

export const REMOVE_GLOWING_TAB = 'REMOVE_GLOWING_TAB';
export function removeGlowingTab(tabName: string) {
  return {
    type: REMOVE_GLOWING_TAB,
    tabName
  }
}

export const SET_POSITIONER = 'SET_POSITIONER';
export function setPositioner(positioner: Positioner) {
  return {
    type: SET_POSITIONER,
    positioner: positioner
  }
}
