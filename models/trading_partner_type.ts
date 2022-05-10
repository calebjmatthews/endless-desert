import TradingPartnerVisit from './trading_partner_visit';
import TradingPartner from './trading_partner';
import Resource from './resource';
import ResourceType from './resource_type';
import Trade from './trade';
import Icon from './icon';
import { resourceTypes } from '../instances/resource_types';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { utils } from '../utils';

export default class TradingPartnerType implements TradingPartnerTypeInterface {
  name: string = '';
  description: string = '';
  icon: Icon = new Icon({provider: '', name: ''});
  givesPool: {specificity: string, type: string, quality?: number,
    weight: number}[][] = [];
  receivesPool: {specificity: string, type: string, weight: number}[][] = [];
  initialTrust: number = 0;
  maxTrust: number = 0;
  getTier: (trust: number) => {value: number, toNext: number} = (trust) => ({
    value: Math.floor(trust / 100),
    toNext: trust % 100
  });
  getAcceptQuantity: (trust: number) => number = (trust) => (
    Math.floor(trust)
  );

  constructor(tradingPartnerType: TradingPartnerTypeInterface) {
    Object.assign(this, tradingPartnerType);
    this.givesPool.map((giveTiers) => {
      giveTiers.map((give) => {
        if (!give.quality) { give.quality = 0; }
      });
    });
  }

  createTradingPartnerVisit(tradingPartner: TradingPartner) {
    const tier = this.getTier(tradingPartner.trust);
    const acceptQuantity = this.getAcceptQuantity(tradingPartner.trust);
    let tCount = 4;
    const roll = utils.random();
    switch(tier.value) {
      case 0:
      if (roll > 0.9) { tCount = 5; }
      else if (roll < 0.25) { tCount = 3; }
      else { tCount = 4; }
      break;

      case 1:
      if (roll > 0.9) { tCount = 6; }
      else if (roll > 0.45) { tCount = 5; }
      else if (roll < 0.1) { tCount = 3; }
      else { tCount = 4; }
      break;

      case 2:
      if (roll > 0.9) { tCount = 7; }
      else if (roll > 0.65) { tCount = 6; }
      else if (roll < 0.15) { tCount = 4; }
      else if (roll < 0.05) { tCount = 3; }
      else { tCount = 5; }
      break;

      case 3:
      if (roll > 0.8) { tCount = 7; }
      else if (roll > 0.45) { tCount = 6; }
      else if (roll < 0.1) { tCount = 4; }
      else { tCount = 5; }
      break;
    }

    let trades: { [id: string] : Trade} = {};
    let pGives: {specificity: string, type: string, quality?: number,
      weight: number}[] = [];

    let retryLimit = 100;
    for (let loop = 0; loop < tCount; loop++) {
      let newTradeResult = this.createNewTrade(pGives, tier.value);
      if (newTradeResult) {
        pGives.push(newTradeResult.pGive);
        let give: {type: string, quality: number} = {
          type: newTradeResult.give.type,
          quality: (newTradeResult.give.quality || 0)
        };

        const newTrade = new Trade({
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

    return new TradingPartnerVisit({
      name: this.name,
      trades: trades,
      acceptQuantity: acceptQuantity,
      traded: {},
      arrived: new Date(Date.now()),
      talkedTo: false
    });
  }

  createNewTrade(pGives: {specificity: string, type: string, quality?: number,
    weight: number}[], tier: number) {
    const pGive = this.choosePGive(pGives, tier);
    const give = this.createGive(pGive);
    if (give) {
      const pReceive = this.choosePReceive(give, tier);

      const multiplierMap: { [spec: string] : number } = {
        [RESOURCE_SPECIFICITY.CATEGORY]: 0.8,
        [RESOURCE_SPECIFICITY.TAG]: 0.9,
        [RESOURCE_SPECIFICITY.SUBCATEGORY]: 1,
        [RESOURCE_SPECIFICITY.EXACT]: 1.1
      }
      let multiplier = multiplierMap[pReceive.specificity];
      multiplier = multiplier + (0.4 * utils.random() - 0.2);

      const receive = { specificity: pReceive.specificity, type: pReceive.type,
        multiplier };
      return { pGive, give, receive }
    }
    return null;
  }

  choosePGive(pGives: {specificity: string, type: string, quality?: number,
    weight: number}[], tier: number) {
    for (let loop = 0; loop < 100; loop++) {
      let tGive: {specificity: string, type: string, quality?: number,
        weight: number} =
        utils.randomWeightedSelect(this.givesPool[tier]);
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
    return this.givesPool[tier][0];
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
    return { type: typeName, quality: pGive.quality };
  }

  choosePReceive(give: {type: string, quality?: number}, tier: number) {
    for (let loop = 0; loop < 100; loop++) {
      let tReceive: {specificity: string, type: string, weight: number} =
        utils.randomWeightedSelect(this.receivesPool[tier]);
      if (give.type != tReceive.type) {
        return tReceive;
      }
    }
    return this.receivesPool[tier][0];
  }
}

interface TradingPartnerTypeInterface {
  name: string;
  description: string;
  icon: Icon;
  givesPool: {specificity: string, type: string, quality?: number, weight: number}[][];
  receivesPool: {specificity: string, type: string, weight: number}[][];
  initialTrust: number;
  maxTrust: number;
  getTier: (trust: number) => {value: number, toNext: number};
  getAcceptQuantity: (trust: number) => number;
}
