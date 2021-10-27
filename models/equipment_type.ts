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

  createEquipment(tier: number, vault: Vault,
    resourceTypes: { [name: string] : ResourceType}) {
    let effects = this.effectGenerators[tier].generateEffects(vault, resourceTypes);
    return new Equipment({
      id: utils.randHex(16),
      typeName: this.name,
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
