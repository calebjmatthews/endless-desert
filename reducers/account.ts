import { CHANGE_SETTING } from '../actions/account';
import Account from '../models/account';

import { buildingsStarting } from '../instances/buildings';

let accountStarting = new Account({id: 5, showCompletedResearches: false});

export default function (account: Account = accountStarting,
  action: any = null) {
	switch(action.type) {
    case CHANGE_SETTING:
    let newCSAccount = new Account(account);
    // @ts-ignore
    newCSAccount[action.name] = action.value;
    return newCSAccount;

		default:
		return account;
	}
};
