import EquipmentEffect from './equipment_effect';
import Vault from './vault';
import Resource from './resource';
import ResourceType from './resource_type';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { LEADER_QUALITIES } from '../enums/leader_qualities';
import { CHANGE_MULTIPLIERS } from '../constants';

export default class EquipmentEffectGenerator
  implements EquipmentEffectGeneratorInterface {
  defaultOptions: GeneratorOption[] = [];
  additionalOptions: GeneratorOption[] = [];
  count: number = 1;

  constructor(equipmentEffectGenerator: EquipmentEffectGeneratorInterface) {
    Object.assign(this, equipmentEffectGenerator);
  }

  generateEffects(vault: Vault, resourceTypes: { [name: string] : ResourceType}) {
    let effects: EquipmentEffect[] = [];
    for (let index = 0; index < this.count; index++) {
      let gos = this.additionalOptions;
      if (this.defaultOptions[index]) {
        gos = [this.defaultOptions[index]];
      }
      effects.push(this.generateOneEffect(gos, vault, resourceTypes));
    }
    return effects;
  }

  generateOneEffect(gos: GeneratorOption[], vault: Vault,
    resourceTypes: { [name: string] : ResourceType}) {
    const go: GeneratorOption = utils.randomWeightedSelect(gos);
    const quality: LEADER_QUALITIES = go.qualities[
      Math.floor(go.qualities.length * utils.random())
    ];
    let specificity = go.finalSpecificity;
    let type: string|undefined = go.type;
    if (go.finalSpecificity == RESOURCE_SPECIFICITY.EXACT && go.type) {
      type = undefined;
      switch(go.givenSpecificity) {
        case RESOURCE_SPECIFICITY.EXACT:
        type = go.type;
        break;

        case RESOURCE_SPECIFICITY.TAG:
        let mTRsc = vault.getTagResources(go.type);
        mTRsc = (quality !== LEADER_QUALITIES.EFFICIENCY) ? filterOutTradeGoods(mTRsc) : mTRsc;
        if (mTRsc.length > 0) {
          type = mTRsc[Math.floor(mTRsc.length * utils.random())].type;
        }
        break;

        case RESOURCE_SPECIFICITY.SUBCATEGORY:
        let mSRsc = vault.getSubcategoryResources(go.type);
        mSRsc = (quality !== LEADER_QUALITIES.EFFICIENCY) ? filterOutTradeGoods(mSRsc) : mSRsc;
        if (mSRsc.length > 0) {
          type = mSRsc[Math.floor(mSRsc.length * utils.random())].type;
        }
        break;

        case RESOURCE_SPECIFICITY.CATEGORY:
        let mCRsc = vault.getCategoryResources(go.type);
        mCRsc = (quality !== LEADER_QUALITIES.EFFICIENCY) ? filterOutTradeGoods(mCRsc) : mCRsc;
        if (mCRsc.length > 0) {
          type = mCRsc[Math.floor(mCRsc.length * utils.random())].type;
        }
        break;
      }

      // If no matching resources have been discovered yet, produce an effect
      //  with the initial specificity. E.g. if the user has no resources in the
      //  vault with a tag of "airy" and the final specificity of "exact",
      //  produce an effect with the specificity of "tag" and the type "airy".
      if (!type) {
        specificity = go.givenSpecificity;
        type = go.type;
      }
    }

    return new EquipmentEffect({ quality, specificity,
      type, change: getChange(quality, go.baseChange) });

    function filterOutTradeGoods(resources: Resource[]) {
      return resources.filter((resource) => {
        const resourceType = resourceTypes[resource.type];
        const isTradeGood = utils.arrayIncludes(resourceType.tags, RESOURCE_TAGS.TRADE_GOOD);
        if (!isTradeGood) { return resource; }
      });;
    }
  }
}

function getChange(quality: LEADER_QUALITIES, baseChange: number) {
  return baseChange * CHANGE_MULTIPLIERS[quality];
}

interface GeneratorOption {
  qualities: LEADER_QUALITIES[];
  givenSpecificity?: string;
  finalSpecificity?: string;
  type?: string;
  baseChange: number;
  weight: number;
}

interface EquipmentEffectGeneratorInterface {
  defaultOptions: GeneratorOption[];
  additionalOptions: GeneratorOption[];
  count: number;
}
