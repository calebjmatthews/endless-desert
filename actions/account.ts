import Account from '../models/account';
import Fortuity from '../models/fortuity';

export const SET_ACCOUNT = 'SET_ACCOUNT';
export function setAccount(account: Account) {
  return {
    type: SET_ACCOUNT,
    account: account
  }
}

export const SET_USER_ID = 'SET_USER_ID';
export function setUserId(userId: string) {
  return {
    type: SET_USER_ID,
    userId: userId
  }
}

export const SET_SESSION_ID = 'SET_SESSION_ID';
export function setSessionId(sessionId: string) {
  return {
    type: SET_SESSION_ID,
    sessionId: sessionId
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

export const FORTUITY_SEEN = 'FORTUITY_SEEN';
export function fortuitySeen(fortuityName: string) {
  return {
    type: FORTUITY_SEEN,
    fortuityName: fortuityName
  }
}

export const SET_FORTUITY_DAILY_LAST = 'SET_FORTUITY_DAILY_LAST';
export function setFortuityDailyLast(timestamp: number) {
  return {
    type: SET_FORTUITY_DAILY_LAST,
    timestamp: timestamp
  }
}
