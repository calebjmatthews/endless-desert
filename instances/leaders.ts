import Leader from '../models/leader';
import Equipment from '../models/equipment';
import { equipmentTypes } from './equipment_types';
import { utils } from '../utils';
import { EQUIPMENT_TYPES } from '../enums/equipment_types';

let leadersStarting: { [id: string] : Leader } = {};
let equipmentStarting: { [id: string] : Equipment } = {};

const fourPointBangle =
  equipmentTypes[EQUIPMENT_TYPES.FOUR_POINT_BANGLE].createEquipment();
equipmentStarting[fourPointBangle.id] = fourPointBangle;
const simpleRobe =
  equipmentTypes[EQUIPMENT_TYPES.SIMPLE_ROBE].createEquipment();
equipmentStarting[simpleRobe.id] = simpleRobe;

function startingFactory() {
  let startingLeader = new Leader({
    id: utils.randHex(16),
    name: 'Samannoud',
    description: ('A bevy of scars, sun-bleached hair, and a fondness for cats. '
      + 'You\'ve known Samannoud as long as you can remember.'),
    speechType: 'Samannoud',
    assignedTo: null,
    livingAt: null,
    toolEquipped: fourPointBangle.id,
    clothingEquipped: simpleRobe.id,
    backEquipped: null,
    eating: null,
    drinking: null,
    happiness: 10,
    productionPlus: 0,
    qualityPlus: 0,
    efficiencyPlus: 0,
    icon: {provider: 'MaterialCommunityIcons', name: 'star-four-points'},
    foregroundColor: '#dc2222',
    backgroundColor: '#3e37a0',
    paddingVertical: 8,
    paddingHorizontal: 10
  });
  startingLeader.setPluses(equipmentStarting);
  leadersStarting[startingLeader.id] = startingLeader;
}

startingFactory();

export { leadersStarting, equipmentStarting }
