import LeaderType from '../models/leader_type';
import { LEADER_TYPES } from '../enums/leader_types';
import { EQUIPMENT_TYPES } from '../enums/equipment_types';

let leaderTypes: { [id: string] : LeaderType } = {};

leaderTypes[LEADER_TYPES.SAMANNOUD] = new LeaderType({
  name: LEADER_TYPES.SAMANNOUD,
  description: ('A bevy of scars, sun-bleached hair, and a fondness for cats. '
    + 'You\'ve known Samannoud as long as you can remember.'),
  speechType: 'Roudy',
  toolStarting: EQUIPMENT_TYPES.FOUR_POINT_BANGLE,
  clothingStarting: EQUIPMENT_TYPES.SIMPLE_ROBE,
  backStarting: null,
  happinessStarting: 10,
  icon: {provider: 'MaterialCommunityIcons', name: 'star-four-points'},
  foregroundColor: '#dc2222',
  backgroundColor: '#3e37a0',
  paddingHorizontal: 8,
  paddingVertical: 11
});

export { leaderTypes };
