import Equipment from './equipment';
import EquipmentEffect from './equipment_effect';
import Building from './building';
import Vault from './vault';
import ResourceType from './resource_type';
import Icon from './icon';
import { resourceTypes } from '../instances/resource_types';
import { buildingTypes } from '../instances/building_types';
import { utils } from '../utils';
import { LEADER_QUALITIES } from '../enums/leader_qualities';
const LQ = LEADER_QUALITIES;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;

const HAT_MAP = {
  [LQ.HAPPINESS_TO_SPEED] : LQ.SPEED,
  [LQ.HAPPINESS_TO_QUALITY] : LQ.QUALITY,
  [LQ.HAPPINESS_TO_EFFICIENCY] : LQ.EFFICIENCY
};

export default class Leader implements LeaderInterface {
  id: string = '';
  name: string = '';
  title: string = '';
  description: string = '';
  speechType: string = '';
  assignedTo: string|null = null;
  livingAt: string|null = null;
  toolEquipped: string|null = null;
  clothingEquipped: string|null = null;
  backEquipped: string|null = null;
  effects: EquipmentEffect[] = [];
  happiness: number = 0;
  explanations: { [subject: string] :
    { source: string, change: string, total: string }[] } = {};
  eating: string|null = null;
  drinking: string|null = null;
  icon: Icon = new Icon({provider: '', name: ''});

  constructor(leader: LeaderInterface) {
    Object.assign(this, leader);
  }

  calcEffects(equipment: { [id: string] : Equipment },
    buildings: { [id: string] : Building }, vault: Vault) {
    let effectArray: EquipmentEffect[] = []
    let happiness = 0;
    this.explanations = {};

    const home = this.livingAt ? buildings[this.livingAt] : null;
    const homeType = home ? buildingTypes[home.buildingType] : null;
    if (homeType?.livingHappiness) {
      happiness += homeType.livingHappiness;
      this.explanations = explanationsAdd({
        explanations: this.explanations,
        subject: `${LQ.HAPPINESS}|null|null`,
        source: (home?.name || 'Home'),
        change: homeType.livingHappiness,
        total: happiness
      });
    }

    const eating = this.eating ? vault.resources[this.eating] : null;
    let eatingResourceType = eating?.type ? resourceTypes[eating.type] : null;
    // @ts-ignore
    if (eating?.value) { eatingResourceType = new ResourceType(eating); }
    if (eatingResourceType) {
      const eatingValue = eatingResourceType.getFoodOrDrinkHappinessValue();
      happiness += eatingValue;
      this.explanations = explanationsAdd({
        explanations: this.explanations,
        subject: `${LQ.HAPPINESS}|null|null`,
        source: utils.getResourceName(eating),
        change: eatingValue,
        total: happiness
      });
    }

    const drinking = this.drinking ? vault.resources[this.drinking] : null;
    let drinkingResourceType = drinking?.type ? resourceTypes[drinking.type] : null;
    // @ts-ignore
    if (drinking?.value) { drinkingResourceType = new ResourceType(drinking); }
    if (drinkingResourceType) {
      const drinkingValue = drinkingResourceType.getFoodOrDrinkHappinessValue();
      happiness += drinkingValue;
      this.explanations = explanationsAdd({
        explanations: this.explanations,
        subject: `${LQ.HAPPINESS}|null|null`,
        source: utils.getResourceName(eating),
        change: drinkingValue,
        total: happiness
      });
    }

    let happinessAppliesTo: {[quality: string] : number} = {};
    const slots = ['toolEquipped', 'clothingEquipped', 'backEquipped'];
    let leader: any = this;
    slots.map((slot) => {
      const equipmentId: string = leader[slot];
      const anEquipment: Equipment = equipment[equipmentId];
      if (anEquipment) {
        if (anEquipment.effects) {
          anEquipment.effects.map((effect) => {
            switch(effect.quality) {
              case LQ.HAPPINESS_TO_SPEED:
              if (!happinessAppliesTo[LQ.SPEED]) {
                happinessAppliesTo[LQ.SPEED] = effect.change;
              }
              else {
                happinessAppliesTo[LQ.SPEED] *= (1 + (effect.change/100));
              }
              effectArray.push(effect); break;

              case LQ.HAPPINESS_TO_QUALITY:
              if (!happinessAppliesTo[LQ.QUALITY]) {
                happinessAppliesTo[LQ.QUALITY] = effect.change;
              }
              else {
                happinessAppliesTo[LQ.QUALITY] *= (1 + (effect.change/100));
              }
              effectArray.push(effect); break;

              case LQ.HAPPINESS_TO_EFFICIENCY:
              if (!happinessAppliesTo[LQ.EFFICIENCY]) {
                happinessAppliesTo[LQ.EFFICIENCY] = effect.change;
              }
              else {
                happinessAppliesTo[LQ.EFFICIENCY] *= (1 + (effect.change/100));
              }
              effectArray.push(effect); break;

              case LQ.HAPPINESS:
              happiness += effect.change; break;

              default:
              effectArray.push(({...effect, source: anEquipment.typeName})); break;
            }

            if (effect.quality == LQ.HAPPINESS) {
              this.explanations = explanationsAdd({
                explanations: this.explanations,
                subject: `${effect.quality}|null|null`,
                source: anEquipment.typeName,
                change: effect.change,
                total: happiness
              });
            }
            else if (effect.quality == LQ.HAPPINESS_TO_SPEED
              || effect.quality == LQ.HAPPINESS_TO_SPEED
              || effect.quality == LQ.HAPPINESS_TO_SPEED) {
              this.explanations = explanationsAdd({
                explanations: this.explanations,
                subject: `${effect.quality}|null|null`,
                source: anEquipment.typeName,
                change: effect.change,
                total: happinessAppliesTo[HAT_MAP[effect.quality]]
              });
            }
          });
        }
      }
    });

    effectArray.sort((a, b) => {
      const orderArray: string[] = [LQ.HAPPINESS_TO_SPEED, LQ.HAPPINESS_TO_QUALITY,
        LQ.HAPPINESS_TO_EFFICIENCY, LQ.SPEED, LQ.QUALITY, LQ.EFFICIENCY,
        'empty', RSP.CATEGORY, RSP.SUBCATEGORY, RSP.TAG, RSP.EXACT];
      const order: { [quality: string] : number } = {};
      orderArray.map((anOrder, index) => { order[anOrder] = index; });

      const orderDiff = order[a.quality] - order[b.quality];
      if (orderDiff != 0) { return orderDiff; }
      const order2ndDiff = order[a.specificity || 'empty']
        - order[b.specificity || 'empty'];
      if (order2ndDiff != 0) { return order2ndDiff; }
      return (((a.type || 'a') < (b.type || 'a')) ? -1 : 1);
    });

    let combineMap: { [key: string] : { effect: EquipmentEffect, order: number } } = {};
    effectArray.map((rawEffect, index) => {
      let effect = new EquipmentEffect(rawEffect);
      if (effect.quality == LQ.HAPPINESS_TO_SPEED
        || effect.quality == LQ.HAPPINESS_TO_QUALITY
        || effect.quality == LQ.HAPPINESS_TO_EFFICIENCY) {
        effect.quality = HAT_MAP[effect.quality];
        effect.change = 0;
      }
      let key = ((effect.quality||'null') + '|' + (effect.specificity||'null')
        + '|' + (effect.type||'null'));
      if (!combineMap[key]) {
        combineMap[key] = { effect: new EquipmentEffect(effect), order: index };
      }
    });
    console.log('combineMap');
    console.log(combineMap);

    let moddedArray: EquipmentEffect[] = [];
    Object.keys(combineMap).forEach((key) => {
      const combObj = combineMap[key];
      const combEffect = combObj.effect;
      let moddedEffect = new EquipmentEffect(combEffect);
      moddedEffect.change = 0;
      effectArray.map((compEffect, index) => {
        if (doesEffectMatch(combEffect, compEffect)) {
          const total = ((((100 + moddedEffect.change) / 100)
            * ((100 + compEffect.change) / 100)) - 1) * 100;
          moddedEffect.change = total;
          this.explanations = explanationsAdd({
            explanations: this.explanations,
            subject: key,
            source: compEffect.source || '',
            change: compEffect.change,
            total: total
          });
        }
      });
      if (happinessAppliesTo[moddedEffect.quality]) {
        const happinessMod = (happiness * (happinessAppliesTo[moddedEffect.quality]
          / 100));
        const total = ((((100 + moddedEffect.change) / 100)
          * ((100 + happinessMod) / 100)) - 1) * 100;
        moddedEffect.change = total;
        this.explanations = explanationsAdd({
          explanations: this.explanations,
          subject: key,
          source: 'Happiness',
          change: happinessMod,
          total: total
        });
      }
      moddedArray.push(moddedEffect);
    });

    this.effects = moddedArray;
    this.happiness = happiness;

    console.log('this');
    console.log(this);

    function explanationsAdd(p: {explanations: { [subject: string] :
      { source: string, change: string, total: string }[] }, subject: string,
      source: string, change: number, total: number}) {
      const baseZero = [ LQ.HAPPINESS, LQ.HAPPINESS_TO_SPEED,
        LQ.HAPPINESS_TO_QUALITY, LQ.HAPPINESS_TO_EFFICIENCY];
      if (!p.explanations[p.subject]) {
        let total = '100%';
        if (utils.arrayIncludes(baseZero, p.subject.split('|')[0])) {
          total = '0%';
        }
        p.explanations[p.subject] = [{ source: 'Base', change: '',
          total: total }];
      }

      let sign = ''; let changeStr = ''; let total = '';
      if (utils.arrayIncludes(baseZero, p.subject.split('|')[0])) {
        sign = '+';
        if (p.change < 0) { sign = ''; }
        changeStr += (sign + utils.formatNumberShort(p.change) + '%');
        total = (utils.formatNumberShort(p.total) + '%');
      }
      else {
        sign = 'x';
        changeStr += (sign + utils.formatNumberShort(100 + p.change) + '%');
        total = (utils.formatNumberShort(100 + p.total) + '%');
      }

      p.explanations[p.subject].push({ source: p.source, change: changeStr,
        total: total });
      return p.explanations;
    }

    function doesEffectMatch(effect: EquipmentEffect, compEffect: EquipmentEffect) {
      if (effect.quality == compEffect.quality) {
        switch(compEffect.specificity) {
          // If effects are identical, they should already be combined
          case RESOURCE_SPECIFICITY.EXACT:
          if (effect.specificity == RESOURCE_SPECIFICITY.EXACT
            && effect.type) {
            if (effect.type == compEffect.type) {
              return true;
            }
          }
          return false;

          case RESOURCE_SPECIFICITY.TAG:
          if (effect.specificity == RESOURCE_SPECIFICITY.EXACT
            && effect.type) {
            const resourceType = resourceTypes[effect.type];
            for (let index = 0; index < resourceType.tags.length; index++) {
              if (resourceType.tags[index] == compEffect.type) {
                return true;
              }
            }
          }
          return false;

          case RESOURCE_SPECIFICITY.SUBCATEGORY:
          if (effect.specificity == RESOURCE_SPECIFICITY.EXACT
            && effect.type) {
            return (resourceTypes[effect.type].subcategory == compEffect.type);
          }
          return false;

          case RESOURCE_SPECIFICITY.CATEGORY:
          if (effect.specificity == RESOURCE_SPECIFICITY.EXACT
            && effect.type) {
            return (resourceTypes[effect.type].category == compEffect.type);
          }
          return false;

          case undefined:
          return true;
        }
        console.log('Unexpected resource specifcity: ' + effect.specificity);
      }
      return false;
    }
  }
}

interface LeaderInterface {
  id: string;
  name: string;
  title: string;
  description: string;
  speechType: string;
  assignedTo: string|null;
  livingAt: string|null;
  toolEquipped: string|null;
  clothingEquipped: string|null;
  backEquipped: string|null;
  effects: EquipmentEffect[];
  happiness: number;
  explanations: { [subject: string] :
    { source: string, change: string, total: string }[] };
  eating: string|null;
  drinking: string|null;
  icon: Icon;
}
