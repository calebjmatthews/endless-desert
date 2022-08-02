import EquipmentEffect from './equipment_effect';
import Icon from './icon';

export default class Treasure {
  typeName: string = '';
  equipmentEffects?: EquipmentEffect[];
  otherEffects?: { icon: Icon, label: string }[];

  constructor(treasure: Treasure) {
    Object.assign(this, treasure);
  }
}