import EquipmentType from '../models/equipment_type';
import EquipmentEffect from '../models/equipment_effect';
import EquipmentEffectGenerator from '../models/equipment_effect_gen';
import { EQUIPMENT_TYPES } from '../enums/equipment_types';
import { EQUIPMENT_SLOTS } from '../enums/equipment_slots';
import { LEADER_QUALITIES } from '../enums/leader_qualities';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';

let equipmentTypes: { [name: string] : EquipmentType } = {};

equipmentTypes[EQUIPMENT_TYPES.SIMPLE_ROBE] = new EquipmentType({
  name: EQUIPMENT_TYPES.SIMPLE_ROBE,
  description: 'An uncomplicated, long-lived robe made of reed linen',
  slot: EQUIPMENT_SLOTS.CLOTHING,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.HAPPINESS],
      change: 10,
      weight: 100
    },
    additionalOptions: [],
    count: 1
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.HAPPINESS],
      change: 15,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.SPEED, LEADER_QUALITIES.EFFICIENCY,
        LEADER_QUALITIES.QUALITY],
      givenSpecificity: RESOURCE_SPECIFICITY.CATEGORY,
      finalSpecificity: RESOURCE_SPECIFICITY.CATEGORY,
      type: RESOURCE_CATEGORIES.MATERIAL,
      change: 10,
      weight: 100
    }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.HAPPINESS],
      change: 20,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.SPEED, LEADER_QUALITIES.EFFICIENCY,
        LEADER_QUALITIES.QUALITY],
      givenSpecificity: RESOURCE_SPECIFICITY.CATEGORY,
      finalSpecificity: RESOURCE_SPECIFICITY.CATEGORY,
      type: RESOURCE_CATEGORIES.MATERIAL,
      change: 10,
      weight: 100
    }],
    count: 3
  })],
  icon: {provider: 'FontAwesome5', name: 'tshirt'},
  foregroundColor: '#afc1ec',
  backgroundColor: '#fff'
});

equipmentTypes[EQUIPMENT_TYPES.FOUR_POINT_BANGLE] = new EquipmentType({
  name: EQUIPMENT_TYPES.FOUR_POINT_BANGLE,
  description: 'A bangle shaped like a four pointed star; Samannoud is never without it',
  slot: EQUIPMENT_SLOTS.TOOL,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.HAPPINESS_TO_SPEED],
      change: 100,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.SPEED],
      change: 35,
      weight: 100
    }],
    count: 2
  })],
  icon: {provider: 'MaterialCommunityIcons', name: 'star-four-points'},
  foregroundColor: '#dc2222',
  backgroundColor: '#fff'
});

equipmentTypes[EQUIPMENT_TYPES.LABORERS_SATCHEL] = new EquipmentType({
  name: EQUIPMENT_TYPES.LABORERS_SATCHEL,
  description: 'A pack filled with basic worker\'s equipment',
  slot: EQUIPMENT_SLOTS.BACK,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.SPEED],
      change: 10,
      weight: 100
    },
    additionalOptions: [],
    count: 1
  })],
  icon: {provider: 'FontAwesome5', name: 'toolbox'},
  foregroundColor: '#000',
  backgroundColor: '#fff'
});

export { equipmentTypes };
