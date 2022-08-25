import Fortuity from './fortuity';
import EquipmentEffect from './equipment_effect';
import Icon from './icon';
import { treasures } from '../instances/treasures';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';

export default class Account {
  userId: string = '0';
  sessionId?: string;
  storageCallSave: boolean = false;
  introState: string = '';
  tabsUnlocked: string[] = [];
  fortuityCurrent: Fortuity|null = null;
  fortuitiesSeen: { [name: string] : number } = {};
  fortuityDailyLast: number = 0;
  showCompletedResearches: boolean = false;
  milestones: { [name: string] : boolean } = {};
  treasuresDisplayed: { [name: string] : number } = {};
  treasureEffects: EquipmentEffect[] = [];
  treasureExplanations: { [subject: string] :
    { source: string, sourceIcon?: Icon, change: string, total: string }[] } = {};

  constructor(account: Account) {
    Object.assign(this, account);
    this.fortuitiesSeen = Object.assign({}, account.fortuitiesSeen);
    this.milestones = Object.assign({}, (account.milestones || {}));
    this.treasuresDisplayed = Object.assign({}, (account.treasuresDisplayed || {}));
  }

  calcTreasureEffects() {
    const effectArray: EquipmentEffect[] = [];
    Object.keys(this.treasuresDisplayed).forEach((name) => {
      const treasure = treasures[name];
      treasure.equipmentEffects?.forEach((anEffect) => {
        effectArray.push({...anEffect, source: name});
      });
    });

    let combineMap: { [key: string] : { effect: EquipmentEffect, order: number } } = {};
    effectArray.map((rawEffect, index) => {
      let effect = new EquipmentEffect(rawEffect);
      let key = ((effect.quality||'null') + '|' + (effect.specificity||'null')
        + '|' + (effect.type||'null'));
      if (!combineMap[key]) {
        combineMap[key] = { effect: new EquipmentEffect(effect), order: index };
      }
    });

    let moddedArray: EquipmentEffect[] = [];
    Object.keys(combineMap).forEach((key) => {
      const combObj = combineMap[key];
      const combEffect = combObj.effect;
      let moddedEffect = new EquipmentEffect(combEffect);
      moddedEffect.change = 0;
      effectArray.map((compEffect, index) => {
        if (utils.doesEffectMatch(combEffect, compEffect)) {
          const total = ((((100 + moddedEffect.change) / 100)
            * ((100 + compEffect.change) / 100)) - 1) * 100;
          moddedEffect.change = total;
          const sourceIcon = compEffect.source ? 
            resourceTypes[compEffect.source].icon : undefined;
          this.treasureExplanations = utils.explanationsAdd({
            explanations: this.treasureExplanations,
            subject: key,
            source: compEffect.source || '',
            sourceIcon: sourceIcon,
            change: compEffect.change,
            total: total
          });
        }
      });
      moddedArray.push(moddedEffect);
    });

    this.treasureEffects = moddedArray;
  }

  export(): DBAccount {
    const { userId, sessionId, storageCallSave, introState, tabsUnlocked, fortuityCurrent, 
      fortuitiesSeen, fortuityDailyLast,  showCompletedResearches, milestones, 
      treasuresDisplayed } = this;
    return { userId, sessionId, storageCallSave, introState, tabsUnlocked, fortuityCurrent, 
      fortuitiesSeen, fortuityDailyLast,  showCompletedResearches, milestones, 
      treasuresDisplayed };
  }
}

export interface DBAccount {
  userId: string;
  sessionId?: string;
  storageCallSave: boolean;
  introState: string;
  tabsUnlocked: string[];
  fortuityCurrent: Fortuity|null;
  fortuitiesSeen: { [name: string] : number };
  fortuityDailyLast: number;
  showCompletedResearches: boolean;
  milestones: { [name: string] : boolean };
  treasuresDisplayed: { [name: string] : number };
}