import EquipmentType from '../models/equipment_type';
import EquipmentEffect from '../models/equipment_effect';
import EquipmentEffectGenerator from '../models/equipment_effect_gen';
import Icon from '../models/icon';
import { EQUIPMENT_TYPES } from '../enums/equipment_types';
import { EQUIPMENT_SLOTS } from '../enums/equipment_slots';
import { LEADER_QUALITIES } from '../enums/leader_qualities';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
import { SVGS } from '../enums/svgs';

let equipmentTypes: { [name: string] : EquipmentType } = {};

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
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.HAPPINESS_TO_SPEED],
      change: 100,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.SPEED],
      change: 45,
      weight: 100
    }, {
      qualities: [LEADER_QUALITIES.QUALITY],
      change: 15,
      weight: 100
    }],
    count: 3
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.HAPPINESS_TO_SPEED],
      change: 100,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.SPEED],
      change: 55,
      weight: 100
    }, {
      qualities: [LEADER_QUALITIES.QUALITY],
      change: 25,
      weight: 100
    }],
    count: 3
  })],
  icon: new Icon({provider: 'svg', name: SVGS.COARSE_IMPLEMENTS})
});

equipmentTypes[EQUIPMENT_TYPES.ROUGH_MATTOCK] = new EquipmentType({
  name: EQUIPMENT_TYPES.ROUGH_MATTOCK,
  description: 'A rough stone tool made for digging soil and splitting rocks',
  slot: EQUIPMENT_SLOTS.TOOL,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.HAPPINESS_TO_SPEED],
      change: 100,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.SPEED],
      givenSpecificity: RESOURCE_SPECIFICITY.CATEGORY,
      finalSpecificity: RESOURCE_SPECIFICITY.EXACT,
      type: RESOURCE_CATEGORIES.MATERIAL,
      change: 10,
      weight: 100
    }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.HAPPINESS_TO_SPEED],
      change: 100,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.SPEED],
      givenSpecificity: RESOURCE_SPECIFICITY.CATEGORY,
      finalSpecificity: RESOURCE_SPECIFICITY.EXACT,
      type: RESOURCE_CATEGORIES.MATERIAL,
      change: 10,
      weight: 100
    }],
    count: 3
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.HAPPINESS_TO_SPEED],
      change: 100,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.SPEED],
      givenSpecificity: RESOURCE_SPECIFICITY.CATEGORY,
      finalSpecificity: RESOURCE_SPECIFICITY.EXACT,
      type: RESOURCE_CATEGORIES.MATERIAL,
      change: 10,
      weight: 100
    }],
    count: 4
  })],
  icon: new Icon({provider: 'svg', name: SVGS.ROUGH_MATTOCK})
})

equipmentTypes[EQUIPMENT_TYPES.WOODEN_POLE] = new EquipmentType({
  name: EQUIPMENT_TYPES.WOODEN_POLE,
  description: 'An iron-capped wooden pole: only limited by your creativity',
  slot: EQUIPMENT_SLOTS.TOOL,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.HAPPINESS_TO_EFFICIENCY],
      change: 100,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.EFFICIENCY],
      givenSpecificity: RESOURCE_SPECIFICITY.CATEGORY,
      finalSpecificity: RESOURCE_SPECIFICITY.EXACT,
      type: RESOURCE_CATEGORIES.MATERIAL,
      change: 10,
      weight: 100
    }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.HAPPINESS_TO_EFFICIENCY],
      change: 100,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.EFFICIENCY],
      givenSpecificity: RESOURCE_SPECIFICITY.CATEGORY,
      finalSpecificity: RESOURCE_SPECIFICITY.EXACT,
      type: RESOURCE_CATEGORIES.MATERIAL,
      change: 10,
      weight: 100
    }],
    count: 3
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.HAPPINESS_TO_EFFICIENCY],
      change: 100,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.EFFICIENCY],
      givenSpecificity: RESOURCE_SPECIFICITY.CATEGORY,
      finalSpecificity: RESOURCE_SPECIFICITY.EXACT,
      type: RESOURCE_CATEGORIES.MATERIAL,
      change: 10,
      weight: 100
    }],
    count: 4
  })],
  icon: new Icon({provider: 'svg', name: SVGS.WOODEN_POLE})
});

equipmentTypes[EQUIPMENT_TYPES.COARSE_IMPLEMENTS] = new EquipmentType({
  name: EQUIPMENT_TYPES.COARSE_IMPLEMENTS,
  description: 'A set of small tools made out of crude metal',
  slot: EQUIPMENT_SLOTS.TOOL,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.HAPPINESS_TO_QUALITY],
      change: 100,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.EFFICIENCY],
      givenSpecificity: RESOURCE_SPECIFICITY.CATEGORY,
      finalSpecificity: RESOURCE_SPECIFICITY.EXACT,
      type: RESOURCE_CATEGORIES.MATERIAL,
      change: 10,
      weight: 100
    }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.HAPPINESS_TO_QUALITY],
      change: 100,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.EFFICIENCY],
      givenSpecificity: RESOURCE_SPECIFICITY.CATEGORY,
      finalSpecificity: RESOURCE_SPECIFICITY.EXACT,
      type: RESOURCE_CATEGORIES.MATERIAL,
      change: 10,
      weight: 100
    }],
    count: 3
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.HAPPINESS_TO_QUALITY],
      change: 100,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.EFFICIENCY],
      givenSpecificity: RESOURCE_SPECIFICITY.CATEGORY,
      finalSpecificity: RESOURCE_SPECIFICITY.EXACT,
      type: RESOURCE_CATEGORIES.MATERIAL,
      change: 10,
      weight: 100
    }],
    count: 4
  })],
  icon: new Icon({provider: 'svg', name: SVGS.COARSE_IMPLEMENTS})
});

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
  icon: new Icon({provider: 'svg', name: SVGS.SIMPLE_ROBE})
});

equipmentTypes[EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK] = new EquipmentType({
  name: EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK,
  description: ('Countless pockets to keep anything you\'d need, the trick is '
    + 'remembering what you put where'),
  slot: EQUIPMENT_SLOTS.BACK,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.SPEED],
      change: 10,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.EFFICIENCY, LEADER_QUALITIES.QUALITY],
      change: -5,
      weight: 50
    }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.SPEED],
      change: 15,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.EFFICIENCY, LEADER_QUALITIES.QUALITY],
      change: -7.5,
      weight: 50
    }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.SPEED],
      change: 20,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.EFFICIENCY, LEADER_QUALITIES.QUALITY],
      change: -10,
      weight: 50
    }],
    count: 2
  })],
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_HAVERSACK})
});

equipmentTypes[EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG] = new EquipmentType({
  name: EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG,
  description: ('Smaller than you might like, but everything\'s within easy reach'),
  slot: EQUIPMENT_SLOTS.BACK,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.EFFICIENCY],
      change: 10,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.SPEED, LEADER_QUALITIES.QUALITY],
      change: -5,
      weight: 50
    }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.EFFICIENCY],
      change: 15,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.SPEED, LEADER_QUALITIES.QUALITY],
      change: -7.5,
      weight: 50
    }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.EFFICIENCY],
      change: 20,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.SPEED, LEADER_QUALITIES.QUALITY],
      change: -10,
      weight: 50
    }],
    count: 2
  })],
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_GEARBAG})
});

equipmentTypes[EQUIPMENT_TYPES.JOURNEYMANS_TOOLPACK] = new EquipmentType({
  name: EQUIPMENT_TYPES.JOURNEYMANS_TOOLPACK,
  description: ('Filled with crude tools to inspect and measure'),
  slot: EQUIPMENT_SLOTS.BACK,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.QUALITY],
      change: 10,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.SPEED, LEADER_QUALITIES.EFFICIENCY],
      change: -5,
      weight: 50
    }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.QUALITY],
      change: 15,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.SPEED, LEADER_QUALITIES.EFFICIENCY],
      change: -7.5,
      weight: 50
    }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOption: {
      qualities: [LEADER_QUALITIES.QUALITY],
      change: 20,
      weight: 100
    },
    additionalOptions: [{
      qualities: [LEADER_QUALITIES.SPEED, LEADER_QUALITIES.EFFICIENCY],
      change: -10,
      weight: 50
    }],
    count: 2
  })],
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_TOOLPACK})
});

export { equipmentTypes };
