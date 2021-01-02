export default class EquipmentEffect {
  quality: string = '';
  change: number = 0;

  constructor(equipmentEffect: EquipmentEffect) {
    Object.assign(this, equipmentEffect);
  }
}
