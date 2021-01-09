import Account from '../models/account';
import Fortuity from '../models/fortuity';

export const SET_ACCOUNT = 'SET_ACCOUNT';
export function setAccount(account: Account) {
  return {
    type: SET_ACCOUNT,
    account: account
  }
}

export const CHANGE_SETTING = 'CHANGE_SETTING';
export function changeSetting(name: string, value: any) {
  return {
    type: CHANGE_SETTING,
    name: name,
    value: value
  }
}

export const SET_INTRO_STATE = 'SET_INTRO_STATE';
export function setIntroState(introState: string) {
  return {
    type: SET_INTRO_STATE,
    introState: introState
  }
}

export const UNLOCK_TAB = 'UNLOCK_TAB';
export function unlockTab(tabName: string) {
  return {
    type: UNLOCK_TAB,
    tabName: tabName
  }
}

export const SET_CURRENT_FORTUITY = 'SET_CURRENT_FORTUITY';
export function setCurrentFortuity(fortuity: Fortuity|null) {
  return {
    type: SET_CURRENT_FORTUITY,
    fortuity: fortuity
  }
}
