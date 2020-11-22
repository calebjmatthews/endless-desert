import { SET_ACCOUNT, CHANGE_SETTING } from '../actions/account';

import Account from '../models/account';
import { buildingsStarting } from '../instances/buildings';
import { INTRO_STATES } from '../enums/intro_states';

let accountStarting = new Account({
  id: 5,
  introState: INTRO_STATES.LOOK_AROUND,
  tabsUnloked: [],
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

		default:
		return account;
	}
};
