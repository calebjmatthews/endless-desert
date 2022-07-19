import Equipment from './equipment';
import EquipmentEffect from './equipment_effect';
import EquipmentEffectGenerator from './equipment_effect_gen';
import Vault from './vault';
import ResourceType from './resource_type';
import Icon from './icon';
import { utils } from '../utils';

export default class EquipmentType implements EquipmentTypeInterface {
  name: string = '';
  description: string = '';
  slot: string = '';
  effectGenerators: EquipmentEffectGenerator[] = [];
  icon: Icon = new Icon({provider: '', name: ''});
  recipeConsumes: { specificity: string, type: string, quantity: number }[]|null = null;

  constructor(equipmentType: EquipmentTypeInterface) {
    Object.assign(this, equipmentType);
  }

  createEquipment(quality: number, vault: Vault, resourceTypes: { [name: string] : ResourceType}) {
    let tier = quality;
    const roll = utils.random();
    if (roll < 0.02) { tier += 2; }
    else if (roll < 0.18) { tier += 1; }
    let effects = this.effectGenerators[tier].generateEffects(vault, resourceTypes);
    return new Equipment({
      id: utils.randHex(16),
      typeName: this.name,
      tier,
      effects: effects
    })
  }
}

interface EquipmentTypeInterface {
  name: string;
  description: string;
  slot: string;
  effectGenerators: EquipmentEffectGenerator[];
  icon: Icon;
  recipeConsumes: { specificity: string, type: string, quantity: number }[]|null;
}
