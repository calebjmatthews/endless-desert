import EquipmentEffect from './equipment_effect';

export default class Equipment {
  id: string = '';
  typeName: string = '';
  tier: number = 0;
  effects: EquipmentEffect[] = [];

  constructor(equipmentInterface: EquipmentInterface) {
    const { id, typeName, tier, effects } = equipmentInterface;
    Object.assign(this, {
      id,
      typeName,
      tier: tier || 0,
      effects: effects.map((anEffect) => (new EquipmentEffect(anEffect)))
    });
  }
}

interface EquipmentInterface {
  id: string;
  typeName: string;
  tier?: number;
  effects: EquipmentEffect[];
}