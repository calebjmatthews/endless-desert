import TradingPartner from './trading_partner';
import Vault from './vault';
import Resource from './resource';
import { resourceTypes } from '../instances/resource_types';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { utils } from '../utils';

export default class TradingPartnerType implements TradingPartnerTypeInterface {
  name: string = '';
  description: string = '';
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';
  tradeValue: number = 0;
  givesPool: {specificity: string, type: string, weight: number}[] = [];
  receivesPool: {specificity: string, type: string, weight: number}[] = [];

  constructor(tradingPartnerType: TradingPartnerTypeInterface) {
    Object.assign(this, tradingPartnerType);
  }

  createTradingPartner(vault: Vault) {
    let tCount = 3;
    const roll = Math.random();
    if (roll < 0.1) { tCount = 4; }
    else if (roll < 0.35) { tCount = 2; }
    let trades: Trade[] = [];
    let pGives: {specificity: string, type: string, weight: number}[] = [];

    for (let loop = 0; loop < tCount; loop++) {
      let newTradeResult = this.createNewTrade(pGives, vault);
      pGives.push(newTradeResult.pGive);
      trades.push({ give: newTradeResult.give, receive: newTradeResult.receive });
    }

    return new TradingPartner({
      name: this.name,
      trades: trades,
      traded: {}
    });
  }

  createNewTrade(pGives: {specificity: string, type: string, weight: number}[],
    vault: Vault) {
    const pGive = this.choosePGive(pGives);
    const give = this.createGive(pGive, vault);
    const pReceive = this.choosePReceive(give);
    const receive = { specificity: pReceive.specificity, type: pReceive.type };
    return { pGive, give, receive }
  }

  choosePGive(pGives: {specificity: string, type: string, weight: number}[]) {
    for (let loop = 0; loop < 100; loop++) {
      let tGive: {specificity: string, type: string, weight: number} =
        utils.randomWeightedSelect(this.givesPool);
      let alreadyPresent = false;
      pGives.map((pGive) => {
        if (pGive.type == tGive.type) {
          alreadyPresent = true;
        }
      });
      if (!alreadyPresent) {
        return tGive;
      }
    }
    return this.givesPool[0];
  }

  createGive(pGive: {specificity: string, type: string, weight: number}, vault: Vault) {
    let resources: Resource[] = [];
    switch(pGive.specificity) {
      case RESOURCE_SPECIFICITY.CATEGORY:
      resources = vault.getCategoryResources(pGive.type);
      break;

      case RESOURCE_SPECIFICITY.TAG:
      resources = vault.getTagResources(pGive.type);
      break;

      case RESOURCE_SPECIFICITY.EXACT:
      resources = vault.getExactResources(pGive.type);
      break;
    }

    const resourceName = resources[Math.floor(utils.random() * resources.length)].type;
    const resourceType = resourceTypes[resourceName];
    let baseQuantity = (this.tradeValue / (resourceType.value||1))
    let quantity = Math.ceil(baseQuantity
      + (baseQuantity * utils.random() - (baseQuantity / 2)));
    return { type: resourceName, quantity: quantity };
  }

  choosePReceive(give: {type: string, quantity: number}) {
    for (let loop = 0; loop < 100; loop++) {
      let tReceive: {specificity: string, type: string, weight: number} =
        utils.randomWeightedSelect(this.receivesPool);
      if (give.type != tReceive.type) {
        return tReceive;
      }
    }
    return this.receivesPool[0];
  }
}

interface TradingPartnerTypeInterface {
  name: string;
  description: string;
  icon: {provider: string, name: string};
  foregroundColor: string;
  backgroundColor: string;
  tradeValue: number;
  givesPool: {specificity: string, type: string, weight: number}[];
  receivesPool: {specificity: string, type: string, weight: number}[];
}

interface Trade {
  give: {type: string, quantity: number};
  receive: {specificity: string, type: string};
}
