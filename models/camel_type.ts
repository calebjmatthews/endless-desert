import EquipmentEffect from './equipment_effect';
import Icon from './icon';

export default class CamelType {
  typeName: string = '';
  speed: number = 0;
  capacity: number = 0;
  equipmentEffects?: EquipmentEffect[];
  otherEffects?: { icon: Icon, label: string }[];

  constructor(camelType: CamelType) {
    Object.assign(this, camelType);
  }
}