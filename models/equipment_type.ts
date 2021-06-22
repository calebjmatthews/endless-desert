import Equipment from './equipment';
import EquipmentEffect from './equipment_effect';
import EquipmentEffectGenerator from './equipment_effect_gen';
import Vault from './vault';
import Icon from './icon';
import { utils } from '../utils';

export default class EquipmentType implements EquipmentTypeInterface {
  name: string = '';
  description: string = '';
  slot: string = '';
  effectGenerators: EquipmentEffectGenerator[] = [];
  icon: Icon = new Icon({provider: '', name: ''});

  constructor(equipmentType: EquipmentTypeInterface) {
    Object.assign(this, equipmentType);
  }

  createEquipment(tier: number, vault: Vault) {
    let effects = this.effectGenerators[tier].generateEffects(vault);
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
}
