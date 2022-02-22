import { SET_ACCOUNT, SET_USER_ID, SET_SESSION_ID, CHANGE_SETTING, SET_INTRO_STATE,
  UNLOCK_TAB, SET_CURRENT_FORTUITY, FORTUITY_SEEN, SET_FORTUITY_DAILY_LAST,
  ACHIEVE_MILESTONE } from '../actions/account';

import Account from '../models/account';
import { buildingsStarting } from '../instances/buildings';
import { INTRO_STATES } from '../enums/intro_states';
import { TABS } from '../enums/tabs';

let accountStarting = new Account({
  userId: '0',
  sessionId: '',
  introState: INTRO_STATES.LOOK_AROUND,
  tabsUnloked: [TABS.RESOURCES, TABS.BUILDINGS],
  fortuityCurrent: null,
  fortuitiesSeen: {},
  fortuityDailyLast: 0,
  showCompletedResearches: false,
  milestones: {}
});

export default function (account: Account = accountStarting,
  action: any = null) {
	switch(action.type) {
    case SET_ACCOUNT:
    return new Account(action.account);

    case SET_USER_ID:
    let newSUIAccount = new Account(account);
    newSUIAccount.userId = action.userId;
    return newSUIAccount;

    case SET_SESSION_ID:
    let newSSIAccount = new Account(account);
    newSSIAccount.sessionId = action.sessionId;
    return newSSIAccount;

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

    case SET_FORTUITY_DAILY_LAST:
    let newFDLAccount = new Account(account);
    newFDLAccount.fortuityDailyLast = action.timestamp;
    return newFDLAccount;

    case ACHIEVE_MILESTONE:
    let newAMAccount = new Account(account);
    newAMAccount.milestones[action.milestone] = true;
    return newAMAccount;

		default:
		return account;
	}
};
