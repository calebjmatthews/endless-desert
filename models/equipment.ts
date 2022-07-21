import EquipmentEffect from './equipment_effect';

export default class Equipment {
  id: string = '';
  typeName: string = '';
  tier: number = 0;
  originalQuality: number = 0;
  effects: EquipmentEffect[] = [];

  constructor(equipmentInterface: EquipmentInterface) {
    const { id, typeName, tier, originalQuality, effects } = equipmentInterface;
    Object.assign(this, {
      id,
      typeName,
      tier: tier || 0,
      originalQuality: originalQuality || 0,
      effects: effects.map((anEffect) => (new EquipmentEffect(anEffect)))
    });
  }
}

interface EquipmentInterface {
  id: string;
  typeName: string;
  tier?: number;
  originalQuality?: number;
  effects: EquipmentEffect[];
}