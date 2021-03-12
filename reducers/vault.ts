import { SET_VAULT, SET_RESOURCES, SET_LAST_TIMESTAMP } from '../actions/vault';
import Vault from '../models/vault';
import Resource from '../models/resource';

import { vaultStarting } from '../instances/vault';

export default function (vault: Vault = vaultStarting, action: any = null) {
	switch(action.type) {
		case SET_VAULT:
		return new Vault(action.vault);

    case SET_RESOURCES:
    let newSRVault = new Vault(vault);
    action.resources.map((resource: Resource) => {
      newSRVault.resources[resource.type + '|' + resource.quality] =
				new Resource(resource);
    });
    return newSRVault;

		case SET_LAST_TIMESTAMP:
		let newSVTVault = new Vault(vault);
		newSVTVault.lastTimestamp = action.timestamp;
		return newSVTVault;

		default:
		return vault;
	}
};
