import EquipmentEffect from './equipment_effect';

export default class Equipment {
  id: string = '';
  typeName: string = '';
  effects: EquipmentEffect[] = [];

  constructor(equipment: Equipment) {
    Object.assign(this, equipment);
  }
}
