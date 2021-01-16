import { SET_ACCOUNT, CHANGE_SETTING, SET_INTRO_STATE, UNLOCK_TAB, SET_CURRENT_FORTUITY,
  FORTUITY_SEEN } from '../actions/account';

import Account from '../models/account';
import { buildingsStarting } from '../instances/buildings';
import { INTRO_STATES } from '../enums/intro_states';
import { TABS } from '../enums/tabs';

let accountStarting = new Account({
  id: 5,
  introState: INTRO_STATES.LOOK_AROUND,
  tabsUnloked: [TABS.RESOURCES, TABS.BUILDINGS],
  fortuityCurrent: null,
  fortuitiesSeen: {},
  showCompletedResearches: false
});

export default function (account: Account = accountStarting,
  action: any = null) {
	switch(action.type) {
    case SET_ACCOUNT:
    return new Account(action.account);

    case CHANGE_SETTING:
    let newCSAccount = new Account(account);
    // @ts-ignore
    newCSAccount[action.name] = action.value;
    return newCSAccount;

    case SET_INTRO_STATE:
    let newSISAccount = new Account(account);
    newSISAccount.introState = action.introState;
    return newSISAccount;

    case UNLOCK_TAB:
    let newUTAccount = new Account(account);
    newUTAccount.tabsUnloked.push(action.tabName);
    return newUTAccount;

    case SET_CURRENT_FORTUITY:
    let newSCFAccount = new Account(account);
    newSCFAccount.fortuityCurrent = action.fortuity;
    return newSCFAccount;

    case FORTUITY_SEEN:
    let newFSAccount = new Account(account);
    newFSAccount.fortuitiesSeen[action.fortuityName] = new Date(Date.now()).valueOf();
    return newFSAccount;

		default:
		return account;
	}
};
