export default class EquipmentEffect {
  quality: string = '';
  source?: string;
  specificity?: string;
  type?: string;
  change: number = 0;

  constructor(equipmentEffect: EquipmentEffect|null) {
    if (equipmentEffect) {
      Object.assign(this, equipmentEffect);
    }
  }
}
