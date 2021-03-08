import Equipment from './equipment';
import EquipmentEffect from './equipment_effect';
import { resourceTypes } from '../instances/resource_types';
import { LEADER_QUALITIES } from '../enums/leader_qualities';
const LQ = LEADER_QUALITIES;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;

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
  eating: string|null = null;
  drinking: string|null = null;
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';
  paddingHorizontal: number = 8;
  paddingVertical: number = 11;

  constructor(leader: LeaderInterface) {
    Object.assign(this, leader);
  }

  calcEffects(equipment: { [id: string] : Equipment }) {
    let effectArray: EquipmentEffect[] = []
    let happiness = 0;
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
              break;

              case LQ.HAPPINESS_TO_QUALITY:
              if (!happinessAppliesTo[LQ.QUALITY]) {
                happinessAppliesTo[LQ.QUALITY] = effect.change;
              }
              else {
                happinessAppliesTo[LQ.QUALITY] *= (1 + (effect.change/100));
              }
              break;

              case LQ.HAPPINESS_TO_EFFICIENCY:
              if (!happinessAppliesTo[LQ.EFFICIENCY]) {
                happinessAppliesTo[LQ.EFFICIENCY] = effect.change;
              }
              else {
                happinessAppliesTo[LQ.EFFICIENCY] *= (1 + (effect.change/100));
              }
              break;

              case LQ.HAPPINESS:
              happiness += effect.change; break;

              default:
              effectArray.push(effect); break;
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

    let combineMap: { [id: string] : { effect: EquipmentEffect, count: number,
      change: number, order: number } } = {};
    effectArray.map((effect, index) => {
      const key = ((effect.quality||'none') + ' ' + (effect.specificity||'none')
        + ' ' + (effect.type||'none'));
      if (!combineMap[key]) {
        combineMap[key] = { effect: new EquipmentEffect(effect), count: 1,
          change: effect.change, order: index };
      }
      else {
        const change = ((((100 + effect.change) / 100)
          * ((100 + combineMap[key].change) / 100)) - 1) * 100;
        combineMap[key].count++;
        combineMap[key].change = change;
      }
    });
    let interArray = Object.keys(combineMap).map((key) => {return combineMap[key]});
    interArray.sort((a, b) => { return a.order - b.order; });
    let combineArray = interArray.map((combineObj) => {
      combineObj.effect.change = combineObj.change;
      return new EquipmentEffect(combineObj.effect);
    });

    let moddedArray: EquipmentEffect[] = [];
    combineArray.map((effect, index) => {
      let moddedEffect = new EquipmentEffect(effect);
      for (let cIndex = 0; cIndex < index; cIndex++) {
        const compEffect = combineArray[cIndex];
        if (doesEffectMatch(effect, compEffect)) {
          moddedEffect.change = ((((100 + moddedEffect.change) / 100)
            * ((100 + compEffect.change) / 100)) - 1) * 100;
        }
      }
      if (happinessAppliesTo[effect.quality]) {
        moddedEffect.change = ((((100 + moddedEffect.change) / 100)
          * ((100 + (happiness * (happinessAppliesTo[effect.quality] / 100))) / 100))
          - 1) * 100;
      }
      moddedArray.push(moddedEffect);
    });
    this.effects = moddedArray;
    this.happiness = happiness;
    console.log('this leader');
    console.log(this);

    function doesEffectMatch(effect: EquipmentEffect, compEffect: EquipmentEffect) {
      if (effect.quality == compEffect.quality) {
        switch(compEffect.specificity) {
          // If effects are identical, they should already be combined
          case RESOURCE_SPECIFICITY.EXACT:
          if (effect.specificity == RESOURCE_SPECIFICITY.EXACT
            && effect.type) {
            if (effect.type == compEffect.type) {
              console.log('Unexpected matching effects:');
              console.log(effect);
              console.log(compEffect);
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
  eating: string|null;
  drinking: string|null;
  icon: {provider: string, name: string};
  foregroundColor: string;
  backgroundColor: string;
  paddingHorizontal: number;
  paddingVertical: number;
}
