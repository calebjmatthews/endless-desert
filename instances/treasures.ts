import Treasure from "../models/treasure";
import EquipmentEffect from "../models/equipment_effect";
import Icon from "../models/icon";
import { RESOURCE_TYPES } from "../enums/resource_types";
import { RESOURCE_SPECIFICITY } from "../enums/resource_specificity";
import { LEADER_QUALITIES } from "../enums/leader_qualities";

const treasures: { [name: string] : Treasure } = {
  [RESOURCE_TYPES.CARPET_CURLING_GREEN_MOTIF]: new Treasure({
    typeName: RESOURCE_TYPES.CARPET_CURLING_GREEN_MOTIF,
    equipmentEffects: [new EquipmentEffect({
      quality: LEADER_QUALITIES.QUALITY,
      specificity: RESOURCE_SPECIFICITY.EXACT,
      type: RESOURCE_TYPES.LENTIL,
      change: 5
    })]
  }),

  [RESOURCE_TYPES.MEMORANDA_ON_A_GROWING_PANOPLY]: new Treasure({
    typeName: RESOURCE_TYPES.MEMORANDA_ON_A_GROWING_PANOPLY,
    otherEffects: [{
      icon: new Icon({provider: 'MaterialCommunityIcons', name: 'magnify-close', color: '#2b2b2d'}), 
      label: 'Increase maximum analysis quantity for every resource studied'
    }]
  }),

  [RESOURCE_TYPES.SYSTEM_OF_ABBREVIATED_BRACHYGRAPHY]: new Treasure({
    typeName: RESOURCE_TYPES.SYSTEM_OF_ABBREVIATED_BRACHYGRAPHY,
    otherEffects: [{
      icon: new Icon({provider: 'FontAwesome', name: 'align-center', color: '#2b2b2d'}), 
      label: 'Halves field note writing time'
    }]
  }),

  [RESOURCE_TYPES.TECHNIQUES_FOR_SWIFT_EXAMINATION]: new Treasure({
    typeName: RESOURCE_TYPES.TECHNIQUES_FOR_SWIFT_EXAMINATION,
    otherEffects: [{
      icon: new Icon({provider: 'FontAwesome5', name: 'wind', color: '#ad6767'}), 
      label: 'Decreases Study and Analysis time by x50%, but Analysis requires Ink'
    }]
  }),

  [RESOURCE_TYPES.TECHNIQUES_FOR_MERCURIAL_EXAMINATION]: new Treasure({
    typeName: RESOURCE_TYPES.TECHNIQUES_FOR_MERCURIAL_EXAMINATION,
    otherEffects: [{
      icon: new Icon({provider: 'FontAwesome5', name: 'wind', color: '#69a8c7'}), 
      label: 'Decreases Study and Analysis time by a further x50%, but Analysis requires Lens'
    }]
  }),

  [RESOURCE_TYPES.TECHNIQUES_FOR_ALACRITOUS_EXAMINATION]: new Treasure({
    typeName: RESOURCE_TYPES.TECHNIQUES_FOR_ALACRITOUS_EXAMINATION,
    otherEffects: [{
      icon: new Icon({provider: 'FontAwesome5', name: 'wind', color: '#94699d'}), 
      label: 'Decreases Study and Analysis time by a further x50%, but Analysis requires Compound Lens'
    }]
  }),

  [RESOURCE_TYPES.TECHNIQUES_FOR_WEIGHTY_EXAMINATION]: new Treasure({
    typeName: RESOURCE_TYPES.TECHNIQUES_FOR_WEIGHTY_EXAMINATION,
    otherEffects: [{
      icon: new Icon({provider: 'FontAwesome5', name: 'graduation-cap', color: '#ad6767'}), 
      label: 'Increases Study and Analysis Knowledge by x50%, but Analysis requires Papyrus'
    }]
  }),

  [RESOURCE_TYPES.TECHNIQUES_FOR_POTENT_EXAMINATION]: new Treasure({
    typeName: RESOURCE_TYPES.TECHNIQUES_FOR_POTENT_EXAMINATION,
    otherEffects: [{
      icon: new Icon({provider: 'FontAwesome5', name: 'graduation-cap', color: '#69a8c7'}), 
      label: 'Increases Study and Analysis Knowledge by a further x50%, but Analysis requires Gearwork'
    }]
  }),

  [RESOURCE_TYPES.TECHNIQUES_FOR_VISIONARY_EXAMINATION]: new Treasure({
    typeName: RESOURCE_TYPES.TECHNIQUES_FOR_VISIONARY_EXAMINATION,
    otherEffects: [{
      icon: new Icon({provider: 'FontAwesome5', name: 'graduation-cap', color: '#94699d'}), 
      label: 'Increases Study and Analysis Knowledge by a further x50%, but Analysis requires Precise Gearwork'
    }]
  }),
};

export { treasures };