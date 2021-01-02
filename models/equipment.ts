import EquipmentEffect from './equipment_effect';

export default class Equipment {
  id: string = '';
  typeName: string = '';
  effects: { [quality: string] : EquipmentEffect }|null = null;

  constructor(equipment: Equipment) {
    Object.assign(this, equipment);
  }
}
