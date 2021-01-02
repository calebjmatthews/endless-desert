import Equipment from './equipment';
import EquipmentEffect from './equipment_effect';
import { utils } from '../utils';

export default class EquipmentType implements EquipmentTypeInterface {
  name: string = '';
  description: string = '';
  slot: string = '';
  effects: { [quality: string] : EquipmentEffect }|null = null;
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';

  constructor(equipmentType: EquipmentTypeInterface) {
    Object.assign(this, equipmentType);
  }

  createEquipment() {
    return new Equipment({
      id: utils.randHex(16),
      typeName: this.name,
      effects: this.effects
    })
  }
}

interface EquipmentTypeInterface {
  name: string;
  description: string;
  slot: string;
  effects: { [quality: string] : EquipmentEffect }|null;
  icon: {provider: string, name: string};
  foregroundColor: string;
  backgroundColor: string;
}
