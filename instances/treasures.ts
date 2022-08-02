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
  })
};

export { treasures };