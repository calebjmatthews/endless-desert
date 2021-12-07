import EquipmentEffect from './equipment_effect';
import Vault from './vault';
import Resource from './resource';
import ResourceType from './resource_type';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { RESOURCE_TAGS } from '../enums/resource_tags';

export default class EquipmentEffectGenerator
  implements EquipmentEffectGeneratorInterface {
  defaultOption: GeneratorOption|null = null;
  additionalOptions: GeneratorOption[] = [];
  count: number = 1;

  constructor(equipmentEffectGenerator: EquipmentEffectGeneratorInterface) {
    Object.assign(this, equipmentEffectGenerator);
  }

  generateEffects(vault: Vault, resourceTypes: { [name: string] : ResourceType}) {
    let effects: EquipmentEffect[] = [];
    for (let index = 0; index < this.count; index++) {
      let gos = this.additionalOptions;
      if (index == 0 && this.defaultOption) {
        gos = [this.defaultOption];
      }
      effects.push(this.generateOneEffect(gos, vault, resourceTypes));
    }
    return effects;
  }

  generateOneEffect(gos: GeneratorOption[], vault: Vault,
    resourceTypes: { [name: string] : ResourceType}) {
    console.log('arguments');
    console.log(arguments);
    const go: GeneratorOption = utils.randomWeightedSelect(gos);
    const quality = go.qualities[
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
        let mTRsc = filterOutTradeGoods(vault.getTagResources(go.type));
        if (mTRsc.length > 0) {
          type = mTRsc[Math.floor(mTRsc.length * utils.random())].type;
        }
        break;

        case RESOURCE_SPECIFICITY.SUBCATEGORY:
        const mSRsc = filterOutTradeGoods(vault.getSubcategoryResources(go.type));
        if (mSRsc.length > 0) {
          type = mSRsc[Math.floor(mSRsc.length * utils.random())].type;
        }
        break;

        case RESOURCE_SPECIFICITY.CATEGORY:
        const mCRsc = filterOutTradeGoods(vault.getCategoryResources(go.type));
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
      type, change: go.change });

    function filterOutTradeGoods(resources: Resource[]) {
      return resources.filter((resource) => {
        const resourceType = resourceTypes[resource.type];
        const isTradeGood = utils.arrayIncludes(resourceType.tags,
          RESOURCE_TAGS.TRADE_GOOD);
        if (!isTradeGood) { return resource; }
      });;
    }
  }
}

interface GeneratorOption {
  qualities: string[];
  givenSpecificity?: string;
  finalSpecificity?: string;
  type?: string;
  change: number;
  weight: number;
}

interface EquipmentEffectGeneratorInterface {
  defaultOption: GeneratorOption|null;
  additionalOptions: GeneratorOption[];
  count: number;
}
