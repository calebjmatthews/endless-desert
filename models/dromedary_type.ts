import EquipmentEffect from './equipment_effect';
import Icon from './icon';

export default class DromedaryType {
  typeName: string = '';
  speed: number = 0; // Leagues per hour
  capacity: number = 0;
  equipmentEffects?: EquipmentEffect[];
  otherEffects?: { icon: Icon, label: string }[];

  constructor(dromedaryType: DromedaryType) {
    Object.assign(this, dromedaryType);
  }
}