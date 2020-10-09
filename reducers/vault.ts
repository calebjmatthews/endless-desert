import { SET_RESOURCES } from '../actions/vault';
import Vault from '../models/vault';
import Resource from '../models/resource';

import { vaultStarting } from '../instances/vault';

export default function (vault: Vault = vaultStarting, action: any = null) {
	switch(action.type) {
    case SET_RESOURCES:
    let newVault = new Vault(vault);
    action.resources.map((resource: Resource) => {
      newVault.resources[resource.type] = new Resource(resource);
    });
    return newVault;
    break;

		default:
		return vault;
	}
};
