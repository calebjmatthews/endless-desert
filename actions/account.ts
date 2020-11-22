import Account from '../models/account';

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
