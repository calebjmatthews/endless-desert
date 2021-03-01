export default class EquipmentEffect {
  quality: string = '';
  specificity: string|undefined;
  type: string|undefined;
  change: number = 0;

  constructor(equipmentEffect: EquipmentEffect) {
    Object.assign(this, equipmentEffect);
  }
}
