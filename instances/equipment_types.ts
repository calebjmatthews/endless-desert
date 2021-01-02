import EquipmentType from '../models/equipment_type';
import EquipmentEffect from '../models/equipment_effect';
import { EQUIPMENT_TYPES } from '../enums/equipment_types';
import { EQUIPMENT_SLOTS } from '../enums/equipment_slots';
import { LEADER_QUALITIES } from '../enums/leader_qualities';

let equipmentTypes: { [name: string] : EquipmentType } = {};

equipmentTypes[EQUIPMENT_TYPES.SIMPLE_ROBE] = new EquipmentType({
  name: EQUIPMENT_TYPES.SIMPLE_ROBE,
  description: 'An uncomplicated, long-lived robe made of reed linen',
  slot: EQUIPMENT_SLOTS.CLOTHING,
  effects: null,
  icon: {provider: 'FontAwesome5', name: 'tshirt'},
  foregroundColor: '#000',
  backgroundColor: '#fff'
});

const fourPointBangleEffects: { [quality: string] : EquipmentEffect } = {};
fourPointBangleEffects[LEADER_QUALITIES.PRODUCTION] =
  new EquipmentEffect({ quality: LEADER_QUALITIES.PRODUCTION, change: 35 });
equipmentTypes[EQUIPMENT_TYPES.FOUR_POINT_BANGLE] = new EquipmentType({
  name: EQUIPMENT_TYPES.FOUR_POINT_BANGLE,
  description: 'A bangle shaped like a four pointed star; Samannoud is never without it',
  slot: EQUIPMENT_SLOTS.TOOL,
  effects: fourPointBangleEffects,
  icon: {provider: 'MaterialCommunityIcons', name: 'star-four-points'},
  foregroundColor: '#dc2222',
  backgroundColor: '#fff'
});

export { equipmentTypes };
