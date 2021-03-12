import TradingPartner from './trading_partner';
import Resource from './resource';
import ResourceType from './resource_type';
import Trade from './trade';
import { resourceTypes } from '../instances/resource_types';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { utils } from '../utils';

export default class TradingPartnerType implements TradingPartnerTypeInterface {
  name: string = '';
  description: string = '';
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';
  paddingHorizontal: number = 11;
  paddingVertical: number = 8;
  tradeValue: number = 0;
  givesPool: {specificity: string, type: string, quality?: number,
    weight: number}[] = [];
  receivesPool: {specificity: string, type: string, weight: number}[] = [];

  constructor(tradingPartnerType: TradingPartnerTypeInterface) {
    Object.assign(this, tradingPartnerType);
    this.givesPool.map((give) => {
      if (!give.quality) { give.quality = 0; }
    });
  }

  createTradingPartner() {
    let tCount = 3;
    const roll = Math.random();
    if (roll < 0.1) { tCount = 4; }
    else if (roll < 0.35) { tCount = 2; }
    let trades: { [id: string] : Trade} = {};
    let pGives: {specificity: string, type: string, quality?: number,
      weight: number}[] = [];

    let retryLimit = 100;
    for (let loop = 0; loop < tCount; loop++) {
      let newTradeResult = this.createNewTrade(pGives);
      if (newTradeResult) {
        pGives.push(newTradeResult.pGive);
        let give: {type: string, quality: number, quantity: number} = {
          type: newTradeResult.give.type,
          quality: (newTradeResult.give.quality || 0),
          quantity: newTradeResult.give.quantity
        };
        const newTrade = new Trade ({
          id: utils.randHex(8),
          tradingPartnerType: this.name,
          give: give,
          receive: newTradeResult.receive
        });
        trades[newTrade.id] = newTrade;
      }
      else if (retryLimit > 0) {
        loop--;
        retryLimit--;
      }
    }

    return new TradingPartner({
      name: this.name,
      trades: trades,
      traded: {},
      arrived: new Date(Date.now())
    });
  }

  createNewTrade(pGives: {specificity: string, type: string, quality?: number,
    weight: number}[]) {
    const pGive = this.choosePGive(pGives);
    const give = this.createGive(pGive);
    if (give) {
      const pReceive = this.choosePReceive(give);
      const receive = { specificity: pReceive.specificity, type: pReceive.type };
      return { pGive, give, receive }
    }
    return null;
  }

  choosePGive(pGives: {specificity: string, type: string, quality?: number,
    weight: number}[]) {
    for (let loop = 0; loop < 100; loop++) {
      let tGive: {specificity: string, type: string, quality?: number,
        weight: number} =
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

  createGive(pGive: {specificity: string, type: string, quality?: number,
    weight: number}) {
    let typeNames: string[] = [];
    switch(pGive.specificity) {
      case RESOURCE_SPECIFICITY.EXACT:
      typeNames = [resourceTypes[pGive.type].name];
      break;

      case RESOURCE_SPECIFICITY.TAG:
      Object.keys(resourceTypes).map((typeName) => {
        const resourceType = resourceTypes[typeName];
        if (utils.arrayIncludes(resourceType.tags, pGive.type)) {
          typeNames.push(typeName);
        }
      });
      break;

      case RESOURCE_SPECIFICITY.SUBCATEGORY:
      Object.keys(resourceTypes).map((typeName) => {
        const resourceType = resourceTypes[typeName];
        if (resourceType.subcategory == pGive.type) {
          typeNames.push(typeName);
        }
      });
      break;

      case RESOURCE_SPECIFICITY.CATEGORY:
      Object.keys(resourceTypes).map((typeName) => {
        const resourceType = resourceTypes[typeName];
        if (resourceType.category == pGive.type) {
          typeNames.push(typeName);
        }
      });
      break;
    }

    let resourceType: ResourceType|null = null;
    let typeName = typeNames[Math.floor(utils.random() * typeNames.length)];
    if (typeName) {
      resourceType = resourceTypes[typeName];
    }
    else {
      return null;
    }
    let baseQuantity = (this.tradeValue / (resourceType.value||1))
    let quantity = Math.ceil(baseQuantity
      + (baseQuantity * utils.random() - (baseQuantity / 2)));
    return { type: typeName, quality: pGive.quality, quantity: quantity };
  }

  choosePReceive(give: {type: string, quality?: number, quantity: number}) {
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
  paddingHorizontal: number;
  paddingVertical: number;
  tradeValue: number;
  givesPool: {specificity: string, type: string, quality?: number, weight: number}[];
  receivesPool: {specificity: string, type: string, weight: number}[];
}
