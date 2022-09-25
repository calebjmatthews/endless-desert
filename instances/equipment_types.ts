import EquipmentType from '../models/equipment_type';
import EquipmentEffectGenerator from '../models/equipment_effect_gen';
import Icon from '../models/icon';
import { EQUIPMENT_TYPES } from '../enums/equipment_types';
import { EQUIPMENT_SLOTS } from '../enums/equipment_slots';
import { LEADER_QUALITIES } from '../enums/leader_qualities';
const LDQ = LEADER_QUALITIES;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_TAGS } from '../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
const RSC = RESOURCE_SUBCATEGORIES;
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
const RCA = RESOURCE_CATEGORIES;
import { SVGS } from '../enums/svgs';

let equipmentTypes: { [name: string] : EquipmentType } = {};

equipmentTypes[EQUIPMENT_TYPES.FOUR_POINT_BANGLE] = new EquipmentType({
  name: EQUIPMENT_TYPES.FOUR_POINT_BANGLE,
  description: 'A bangle shaped like a four pointed star; Samannoud is never without it',
  slot: EQUIPMENT_SLOTS.TOOL,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED], baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED], baseChange: 35, weight: 100 }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED], baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED], baseChange: 45, weight: 100 },
      { qualities: [LDQ.QUALITY], baseChange: 15, weight: 100 }],
    count: 3
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED], baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED], baseChange: 55, weight: 100 },
      { qualities: [LDQ.QUALITY], baseChange: 25, weight: 100 }],
    count: 3
  })],
  recipeConsumes: null,
  icon: new Icon({provider: 'svg', name: SVGS.COARSE_MEASURES})
});

equipmentTypes[EQUIPMENT_TYPES.ROUGH_MATTOCK] = new EquipmentType({
  name: EQUIPMENT_TYPES.ROUGH_MATTOCK,
  description: 'A rough iron tool made for digging soil and splitting rocks',
  slot: EQUIPMENT_SLOTS.TOOL,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED], baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED], givenSpecificity: RSP.CATEGORY,
      finalSpecificity: RSP.EXACT, type: RCA.MATERIAL, baseChange: 10, weight: 100 }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED], baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED], givenSpecificity: RSP.CATEGORY,
      finalSpecificity: RSP.EXACT, type: RCA.MATERIAL, baseChange: 10, weight: 100 }],
    count: 3
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED], baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED], givenSpecificity: RSP.CATEGORY,
      finalSpecificity: RSP.EXACT, type: RCA.MATERIAL, baseChange: 10, weight: 100 }],
    count: 4
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.WOOD_OAK, quantity: 40},
    {specificity: RSP.EXACT, type: RTY.IRON_EDGE, quantity: 2}],
  icon: new Icon({provider: 'svg', name: SVGS.ROUGH_MATTOCK})
})

equipmentTypes[EQUIPMENT_TYPES.WOODEN_POLE] = new EquipmentType({
  name: EQUIPMENT_TYPES.WOODEN_POLE,
  description: 'An iron-capped wooden pole: only limited by your creativity',
  slot: EQUIPMENT_SLOTS.TOOL,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_EFFICIENCY], baseChange: 100,
      weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.CATEGORY,
      finalSpecificity: RSP.EXACT, type: RCA.MATERIAL, baseChange: 10, weight: 100 }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_EFFICIENCY], baseChange: 100,
      weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.CATEGORY,
      finalSpecificity: RSP.EXACT, type: RCA.MATERIAL, baseChange: 10, weight: 100 }],
    count: 3
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_EFFICIENCY], baseChange: 100,
      weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.CATEGORY,
      finalSpecificity: RSP.EXACT, type: RCA.MATERIAL, baseChange: 10, weight: 100 }],
    count: 4
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.WOOD_OAK, quantity: 60},
    {specificity: RSP.EXACT, type: RTY.HARDENED_SLAB, quantity: 1}],
  icon: new Icon({provider: 'svg', name: SVGS.WOODEN_POLE})
});

equipmentTypes[EQUIPMENT_TYPES.COARSE_MEASURES] = new EquipmentType({
  name: EQUIPMENT_TYPES.COARSE_MEASURES,
  description: 'A set of small tools made out of crude metal',
  slot: EQUIPMENT_SLOTS.TOOL,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_QUALITY], baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.QUALITY], givenSpecificity: RSP.CATEGORY,
      finalSpecificity: RSP.EXACT, type: RCA.MATERIAL, baseChange: 10, weight: 100 }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_QUALITY], baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.QUALITY], givenSpecificity: RSP.CATEGORY,
      finalSpecificity: RSP.EXACT, type: RCA.MATERIAL, baseChange: 10, weight: 100 }],
    count: 3
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_QUALITY], baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.QUALITY], givenSpecificity: RSP.CATEGORY,
      finalSpecificity: RSP.EXACT, type: RCA.MATERIAL, baseChange: 10, weight: 100 }],
    count: 4
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.GEARWORK, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.IRON_EDGE, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.LENS, quantity: 1}],
  icon: new Icon({provider: 'svg', name: SVGS.COARSE_MEASURES})
});

equipmentTypes[EQUIPMENT_TYPES.POT_OF_SEALANT_PITCH] = new EquipmentType({
  name: EQUIPMENT_TYPES.POT_OF_SEALANT_PITCH,
  description: `A pot filled with pitch, used to make a waterproof seal over cracks in cisterns`,
  slot: EQUIPMENT_SLOTS.TOOL,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED], baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED], givenSpecificity: RSP.EXACT,
      finalSpecificity: RSP.EXACT, type: RTY.WATER, baseChange: 50, weight: 100 }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED], baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.QUALITY], givenSpecificity: RSP.EXACT,
      finalSpecificity: RSP.EXACT, type: RTY.WATER, baseChange: 62.5, weight: 100 }],
    count: 3
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED], baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.QUALITY], givenSpecificity: RSP.EXACT,
      finalSpecificity: RSP.EXACT, type: RTY.WATER, baseChange: 75, weight: 100 }],
    count: 3
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.HARDENED_SLAB, quantity: 2},
    {specificity: RSP.EXACT, type: RTY.ROUGH_ROPE, quantity: 2},
    {specificity: RSP.EXACT, type: RTY.CARBON, quantity: 40}],
  icon: new Icon({provider: 'svg', name: SVGS.POT_OF_SEALANT_PITCH})
});

equipmentTypes[EQUIPMENT_TYPES.REED_MUCK_RAKE] = new EquipmentType({
  name: EQUIPMENT_TYPES.REED_MUCK_RAKE,
  description: `A rake for clearing channels through stagnant mud, keeping reeds healthy`,
  slot: EQUIPMENT_SLOTS.TOOL,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED], baseChange: 100, weight: 100 },
    { qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.EXACT,
      finalSpecificity: RSP.EXACT, type: RTY.WATER, baseChange: -50, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.QUALITY], givenSpecificity: RSP.EXACT,
      finalSpecificity: RSP.EXACT, type: RTY.REEDS, baseChange: 100, weight: 100 }],
    count: 3
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED], baseChange: 100, weight: 100 },
    { qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.EXACT,
      finalSpecificity: RSP.EXACT, type: RTY.WATER, baseChange: -40, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.QUALITY], givenSpecificity: RSP.EXACT,
      finalSpecificity: RSP.EXACT, type: RTY.REEDS, baseChange: 120, weight: 100 }],
    count: 3
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED], baseChange: 100, weight: 100 },
    { qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.EXACT,
      finalSpecificity: RSP.EXACT, type: RTY.WATER, baseChange: -30, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.QUALITY], givenSpecificity: RSP.EXACT,
      finalSpecificity: RSP.EXACT, type: RTY.REEDS, baseChange: 140, weight: 100 }],
    count: 3
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.WOOD_OAK, quantity: 60},
    {specificity: RSP.EXACT, type: RTY.IRON_EDGE, quantity: 4},
    {specificity: RSP.EXACT, type: RTY.BINDING, quantity: 1}],
  icon: new Icon({provider: 'svg', name: SVGS.REED_MUCK_RAKE})
});

equipmentTypes[EQUIPMENT_TYPES.CHAR_BELLOWS_FERVENT] = new EquipmentType({
  name: EQUIPMENT_TYPES.CHAR_BELLOWS_FERVENT,
  description: `A set of bellows for wood-burning that create a hot and erratic flame`,
  slot: EQUIPMENT_SLOTS.TOOL,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED], baseChange: 100, weight: 100 },
      { qualities: [LDQ.SPEED], givenSpecificity: RSP.EXACT,
        finalSpecificity: RSP.EXACT, type: RTY.CHARCOAL, baseChange: 25, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.SUBCATEGORY, 
      finalSpecificity: RSP.EXACT, type: RSC.WOOD, baseChange: 50, weight: 100 }],
    count: 3
  }),
  new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED], baseChange: 100, weight: 100 },
      { qualities: [LDQ.SPEED], givenSpecificity: RSP.EXACT,
        finalSpecificity: RSP.EXACT, type: RTY.CHARCOAL, baseChange: 30, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.SUBCATEGORY, 
      finalSpecificity: RSP.EXACT, type: RSC.WOOD, baseChange: 60, weight: 100 }],
    count: 3
  }),
  new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED], baseChange: 100, weight: 100 },
      { qualities: [LDQ.SPEED], givenSpecificity: RSP.EXACT,
        finalSpecificity: RSP.EXACT, type: RTY.CHARCOAL, baseChange: 35, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.SUBCATEGORY, 
      finalSpecificity: RSP.EXACT, type: RSC.WOOD, baseChange: 70, weight: 100 }],
    count: 3
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.WOOD_OAK, quantity: 40},
    {specificity: RSP.EXACT, type: RTY.LINEN, quantity: 30},
    {specificity: RSP.EXACT, type: RTY.GEARWORK, quantity: 2}],
  icon: new Icon({provider: 'svg', name: SVGS.CHAR_BELLOWS, color: '#d83e20',
    shadow: '#c1321f', secondaryColor: '#f4e3c3', secondaryShadow: '#efc59e'})
});

equipmentTypes[EQUIPMENT_TYPES.CHAR_BELLOWS_TEMPERATE] = new EquipmentType({
  name: EQUIPMENT_TYPES.CHAR_BELLOWS_TEMPERATE,
  description: `A set of bellows for wood-burning that create a hot and consistent flame`,
  slot: EQUIPMENT_SLOTS.TOOL,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_QUALITY], baseChange: 100, weight: 100 },
      { qualities: [LDQ.QUALITY], givenSpecificity: RSP.EXACT,
        finalSpecificity: RSP.EXACT, type: RTY.CHARCOAL, baseChange: 25, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.SUBCATEGORY, 
      finalSpecificity: RSP.EXACT, type: RSC.WOOD, baseChange: 50, weight: 100 }],
    count: 3
  }),
  new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_QUALITY], baseChange: 100, weight: 100 },
      { qualities: [LDQ.QUALITY], givenSpecificity: RSP.EXACT,
        finalSpecificity: RSP.EXACT, type: RTY.CHARCOAL, baseChange: 30, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.SUBCATEGORY, 
      finalSpecificity: RSP.EXACT, type: RSC.WOOD, baseChange: 60, weight: 100 }],
    count: 3
  }),
  new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_QUALITY], baseChange: 100, weight: 100 },
      { qualities: [LDQ.QUALITY], givenSpecificity: RSP.EXACT,
        finalSpecificity: RSP.EXACT, type: RTY.CHARCOAL, baseChange: 35, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.SUBCATEGORY, 
      finalSpecificity: RSP.EXACT, type: RSC.WOOD, baseChange: 70, weight: 100 }],
    count: 3
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.WOOD_OAK, quantity: 80},
    {specificity: RSP.EXACT, type: RTY.LINEN, quantity: 15},
    {specificity: RSP.EXACT, type: RTY.GEARWORK, quantity: 2}],
  icon: new Icon({provider: 'svg', name: SVGS.CHAR_BELLOWS, color: '#712d20',
    shadow: '#500d00', secondaryColor: '#efc59e', secondaryShadow: '#daa97b'})
});

equipmentTypes[EQUIPMENT_TYPES.CLAY_SPADE_BROAD] = new EquipmentType({
  name: EQUIPMENT_TYPES.CLAY_SPADE_BROAD,
  description: `A wide shovel with just the right shape of blade for moving clay about`,
  slot: EQUIPMENT_SLOTS.TOOL,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED, LDQ.HAPPINESS_TO_QUALITY], 
      baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.QUALITY], givenSpecificity: RSP.SUBCATEGORY,
      finalSpecificity: RSP.SUBCATEGORY, type: RSC.CLAY, baseChange: 50, weight: 100 },
    { qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.SUBCATEGORY, 
      finalSpecificity: RSP.EXACT, type: RSC.CLAY, baseChange: 50, weight: 50 }],
    count: 2
  }),
  new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED, LDQ.HAPPINESS_TO_QUALITY], 
      baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.QUALITY], givenSpecificity: RSP.SUBCATEGORY,
      finalSpecificity: RSP.SUBCATEGORY, type: RSC.CLAY, baseChange: 65, weight: 100 },
    { qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.SUBCATEGORY, 
      finalSpecificity: RSP.EXACT, type: RSC.CLAY, baseChange: 65, weight: 50 }],
    count: 2
  }),
  new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_SPEED, LDQ.HAPPINESS_TO_QUALITY], 
      baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.QUALITY], givenSpecificity: RSP.SUBCATEGORY,
      finalSpecificity: RSP.SUBCATEGORY, type: RSC.CLAY, baseChange: 80, weight: 100 },
    { qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.SUBCATEGORY, 
      finalSpecificity: RSP.EXACT, type: RSC.CLAY, baseChange: 80, weight: 50 }],
    count: 2
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.WOOD_OAK, quantity: 60},
    {specificity: RSP.EXACT, type: RTY.HARDENED_SLAB, quantity: 3}],
  icon: new Icon({provider: 'svg', name: SVGS.CLAY_SPADE_BROAD})
});

equipmentTypes[EQUIPMENT_TYPES.OLIVE_GRAFTING_SHEARS] = new EquipmentType({
  name: EQUIPMENT_TYPES.OLIVE_GRAFTING_SHEARS,
  description: `Careful planning and grafting leads to olive trees with higher-quality fruit that use less water`,
  slot: EQUIPMENT_SLOTS.TOOL,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_QUALITY], baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.EXACT, 
      finalSpecificity: RSP.EXACT, type: RTY.WATER, baseChange: 50, weight: 100 },
    { qualities: [LDQ.QUALITY], givenSpecificity: RSP.EXACT, 
      finalSpecificity: RSP.EXACT, type: RTY.OLIVE, baseChange: 50, weight: 100 }],
    count: 2
  }),
  new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_QUALITY], baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.EXACT, 
      finalSpecificity: RSP.EXACT, type: RTY.WATER, baseChange: 65, weight: 100 },
    { qualities: [LDQ.QUALITY], givenSpecificity: RSP.EXACT, 
      finalSpecificity: RSP.EXACT, type: RTY.OLIVE, baseChange: 65, weight: 100 }],
    count: 2
  }),
  new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS_TO_QUALITY], baseChange: 100, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.EFFICIENCY], givenSpecificity: RSP.EXACT, 
      finalSpecificity: RSP.EXACT, type: RTY.WATER, baseChange: 80, weight: 100 },
    { qualities: [LDQ.QUALITY], givenSpecificity: RSP.EXACT, 
      finalSpecificity: RSP.EXACT, type: RTY.OLIVE, baseChange: 80, weight: 100 }],
    count: 2
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.IRON_EDGE, quantity: 4},
    {specificity: RSP.EXACT, type: RTY.BINDING, quantity: 2},
    {specificity: RSP.EXACT, type: RTY.OLIVE_OIL, quantity: 5}],
  icon: new Icon({provider: 'svg', name: SVGS.OLIVE_GRAFTING_SHEARS})
});

equipmentTypes[EQUIPMENT_TYPES.RAGS_TATTERED] = new EquipmentType({
  name: EQUIPMENT_TYPES.RAGS_TATTERED,
  description: 'A bundle of hard-worn rags, neither comfortable nor flattering',
  slot: EQUIPMENT_SLOTS.CLOTHING,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.CATEGORY,
      type: RCA.MATERIAL, baseChange: -20, weight: 100 }],
    additionalOptions: [],
    count: 1
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.CATEGORY,
      type: RCA.MATERIAL, baseChange: -15, weight: 100 }],
    additionalOptions: [],
    count: 1
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.CATEGORY,
      type: RCA.MATERIAL, baseChange: -10, weight: 100 }],
    additionalOptions: [],
    count: 1
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 100}],
  icon: new Icon({provider: 'svg', name: SVGS.RAGS_TATTERED})
});

equipmentTypes[EQUIPMENT_TYPES.SIMPLE_ROBE] = new EquipmentType({
  name: EQUIPMENT_TYPES.SIMPLE_ROBE,
  description: 'An uncomplicated, long-lived robe made of reed linen',
  slot: EQUIPMENT_SLOTS.CLOTHING,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS], baseChange: 10, weight: 100 }],
    additionalOptions: [],
    count: 1
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS], baseChange: 15, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.CATEGORY,
      type: RCA.MATERIAL, baseChange: 10, weight: 100 }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.HAPPINESS], baseChange: 20, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.CATEGORY,
      type: RCA.MATERIAL, baseChange: 10, weight: 100 }],
    count: 3
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.REEDCLOTH, quantity: 20},
    {specificity: RSP.EXACT, type: RTY.CRUDE_NEEDLE, quantity: 1}],
  icon: new Icon({provider: 'svg', name: SVGS.SIMPLE_ROBE})
});

equipmentTypes[EQUIPMENT_TYPES.STURDY_OVERALLS] = new EquipmentType({
  name: EQUIPMENT_TYPES.STURDY_OVERALLS,
  description: 'These thick linen overalls can withstand all kinds of abuse',
  slot: EQUIPMENT_SLOTS.CLOTHING,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.CATEGORY,
      type: RCA.MATERIAL_REFINED, baseChange: 10, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.EXACT,
      type: RCA.MATERIAL_REFINED, baseChange: 20, weight: 100 }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.CATEGORY,
      type: RCA.MATERIAL_REFINED, baseChange: 20, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.EXACT,
      type: RCA.MATERIAL_REFINED, baseChange: 25, weight: 100 }],
    count: 3
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.CATEGORY,
      type: RCA.MATERIAL_REFINED, baseChange: 30, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.EXACT,
      type: RCA.MATERIAL_REFINED, baseChange: 30, weight: 100 }],
    count: 4
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.LINEN, quantity: 30},
    {specificity: RSP.EXACT, type: RTY.ROUGH_ROPE, quantity: 2},
    {specificity: RSP.EXACT, type: RTY.CRUDE_NEEDLE, quantity: 2}],
  icon: new Icon({provider: 'svg', name: SVGS.STURDY_OVERALLS})
});

equipmentTypes[EQUIPMENT_TYPES.APRON_OF_MANY_POCKETS] = new EquipmentType({
  name: EQUIPMENT_TYPES.APRON_OF_MANY_POCKETS,
  description: 'Some of the pockets contain smaller pockets',
  slot: EQUIPMENT_SLOTS.CLOTHING,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.CATEGORY,
      type: RCA.ARTISAN_GOOD, baseChange: 10, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.EXACT,
      type: RCA.ARTISAN_GOOD, baseChange: 20, weight: 100 }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.CATEGORY,
      type: RCA.ARTISAN_GOOD, baseChange: 20, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.EXACT,
      type: RCA.ARTISAN_GOOD, baseChange: 25, weight: 100 }],
    count: 3
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.CATEGORY,
      type: RCA.ARTISAN_GOOD, baseChange: 30, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY, LDQ.QUALITY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.EXACT,
      type: RCA.ARTISAN_GOOD, baseChange: 30, weight: 100 }],
    count: 4
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.LINEN, quantity: 40},
    {specificity: RSP.EXACT, type: RTY.BINDING, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.CRUDE_NEEDLE, quantity: 2}],
  icon: new Icon({provider: 'svg', name: SVGS.APRON_OF_MANY_POCKETS})
});

equipmentTypes[EQUIPMENT_TYPES.SHOULDER_POUCH] = new EquipmentType({
  name: EQUIPMENT_TYPES.SHOULDER_POUCH,
  description: 'A small cloth bag tailor-made to carry specific goods',
  slot: EQUIPMENT_SLOTS.BACK,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.EXACT,
      type: RCA.MATERIAL, baseChange: 10, weight: 100 }],
    additionalOptions: [],
    count: 1
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.EXACT,
      type: RCA.MATERIAL, baseChange: 15, weight: 100 }],
    additionalOptions: [],
    count: 1
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY],
      givenSpecificity: RSP.CATEGORY, finalSpecificity: RSP.EXACT,
      type: RCA.MATERIAL, baseChange: 20, weight: 100 }],
    additionalOptions: [],
    count: 1
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.REEDCLOTH, quantity: 10}],
  icon: new Icon({provider: 'svg', name: SVGS.SHOULDER_POUCH})
});

equipmentTypes[EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK] = new EquipmentType({
  name: EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK,
  description: ('Countless pockets to keep anything you\'d need, the trick is '
    + 'remembering what you put where'),
  slot: EQUIPMENT_SLOTS.BACK,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.SPEED], baseChange: 10, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.EFFICIENCY, LDQ.QUALITY], baseChange: -5,
      weight: 50 }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.SPEED], baseChange: 15, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.EFFICIENCY, LDQ.QUALITY], baseChange: -7.5,
      weight: 50 }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.SPEED], baseChange: 20, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.EFFICIENCY, LDQ.QUALITY], baseChange: -10,
      weight: 50 }],
    count: 2
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.REEDCLOTH, quantity: 40},
    {specificity: RSP.EXACT, type: RTY.ROUGH_ROPE, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.CRUDE_NEEDLE, quantity: 1}],
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_HAVERSACK})
});

equipmentTypes[EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG] = new EquipmentType({
  name: EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG,
  description: ('Smaller than you might like, but everything\'s within easy reach'),
  slot: EQUIPMENT_SLOTS.BACK,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.EFFICIENCY], baseChange: 10, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.QUALITY], baseChange: -5,
      weight: 50 }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.EFFICIENCY], baseChange: 15, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.QUALITY], baseChange: -7.5,
      weight: 50 }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.EFFICIENCY], baseChange: 20, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.QUALITY], baseChange: -10,
      weight: 50 }],
    count: 2
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.REEDCLOTH, quantity: 40},
    {specificity: RSP.EXACT, type: RTY.BINDING, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.CRUDE_NEEDLE, quantity: 1}],
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_GEARBAG})
});

equipmentTypes[EQUIPMENT_TYPES.JOURNEYMANS_TOOLPACK] = new EquipmentType({
  name: EQUIPMENT_TYPES.JOURNEYMANS_TOOLPACK,
  description: ('Filled with crude tools to inspect and measure'),
  slot: EQUIPMENT_SLOTS.BACK,
  effectGenerators: [new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.QUALITY], baseChange: 10, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY], baseChange: -5,
      weight: 50 }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.QUALITY], baseChange: 15, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY], baseChange: -7.5,
      weight: 50 }],
    count: 2
  }), new EquipmentEffectGenerator({
    defaultOptions: [{ qualities: [LDQ.QUALITY], baseChange: 20, weight: 100 }],
    additionalOptions: [{ qualities: [LDQ.SPEED, LDQ.EFFICIENCY], baseChange: -10,
      weight: 50 }],
    count: 2
  })],
  recipeConsumes: [{specificity: RSP.EXACT, type: RTY.REEDCLOTH, quantity: 40},
    {specificity: RSP.EXACT, type: RTY.GEARWORK, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.CRUDE_NEEDLE, quantity: 1}],
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_TOOLPACK})
});

export { equipmentTypes };
