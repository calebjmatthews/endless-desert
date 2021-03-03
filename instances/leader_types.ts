import LeaderType from '../models/leader_type';
import { LEADER_TYPES } from '../enums/leader_types';
import { EQUIPMENT_TYPES } from '../enums/equipment_types';

let leaderTypes: { [id: string] : LeaderType } = {};

leaderTypes[LEADER_TYPES.SAMANNOUD] = new LeaderType({
  name: LEADER_TYPES.SAMANNOUD,
  title: 'of ten thousand paths',
  description: ('A bevy of scars, sun-bleached hair, and a fondness for cats. '
    + 'You\'ve known Samannoud as long as you can remember.'),
  speechType: 'Roudy',
  toolStarting: EQUIPMENT_TYPES.FOUR_POINT_BANGLE,
  clothingStarting: EQUIPMENT_TYPES.SIMPLE_ROBE,
  backStarting: null,
  icon: {provider: 'MaterialCommunityIcons', name: 'star-four-points'},
  foregroundColor: '#dc2222',
  backgroundColor: '#3e37a0',
  paddingHorizontal: 8,
  paddingVertical: 11
});

leaderTypes[LEADER_TYPES.SHUDDERING_REFUGE] = new LeaderType({
  name: LEADER_TYPES.SHUDDERING_REFUGE,
  title: 'the Shuddering Refuge',
  description: ('You don\'t see many physical scars, but Da Nang and company '
    + 'are a downcast and solumn group. Their nightly singing as the sun goes '
    + 'down is one of the most sorrowful things you\'ve ever heard.'),
  speechType: 'Calm',
  toolStarting: null,
  clothingStarting: EQUIPMENT_TYPES.SIMPLE_ROBE,
  backStarting: null,
  icon: {provider: 'MaterialCommunityIcons', name: 'weather-sunset-down'},
  foregroundColor: '#ffff00',
  backgroundColor: '#b50c0c',
  paddingHorizontal: 8,
  paddingVertical: 11
});

leaderTypes[LEADER_TYPES.AUSPICIOUS_WAIF] = new LeaderType({
  name: LEADER_TYPES.AUSPICIOUS_WAIF,
  title: 'the Auspicious Waif',
  description: ('Reims joined your settlement early on, as little more than '
    + 'a child and with no particular skills. But after a taste of education, it '
    + 'seems to come fast: knowledge of construction, chemistry, languages, and still '
    + 'hungry for more.'),
  speechType: 'Humorous',
  toolStarting: null,
  clothingStarting: EQUIPMENT_TYPES.SIMPLE_ROBE,
  backStarting: null,
  icon: {provider: 'FontAwesome5', name: 'book-medical'},
  foregroundColor: '#ffb52c',
  backgroundColor: '#422c05',
  paddingHorizontal: 8,
  paddingVertical: 11
});

leaderTypes[LEADER_TYPES.FOXFIRE_HERETIC] = new LeaderType({
  name: LEADER_TYPES.FOXFIRE_HERETIC,
  title: 'the Foxfire Heretic',
  description: ('Guangzhou has been ejected from the Foxfire Ascetics, '
    + 'although there\'s'
    + 'no explanation as to why. But there are clues: a fierce glint '
    + 'in the eyes, and decidedly non-traditional views on alcohol consumption.'),
  speechType: 'Calm',
  toolStarting: null,
  clothingStarting: EQUIPMENT_TYPES.SIMPLE_ROBE,
  backStarting: null,
  icon: {provider: 'FontAwesome5', name: 'fire'},
  foregroundColor: '#84f9e4',
  backgroundColor: '#008a71',
  paddingHorizontal: 8,
  paddingVertical: 11
});

leaderTypes[LEADER_TYPES.TREFOIL_SOWER] = new LeaderType({
  name: LEADER_TYPES.TREFOIL_SOWER,
  title: 'Trefoil Sower',
  description: ('Apparently, in the Trefoil Kingdoms there is a custom called '
    + '"The Sowing of Wild Oats". Their young men and women spend time living in '
    + 'distant lands for a reason you can\'t quite discern. '
    + 'Louth told you the  "oats" aren\'t literal, so you know that much.'),
  speechType: 'Humorous',
  toolStarting: null,
  clothingStarting: EQUIPMENT_TYPES.SIMPLE_ROBE,
  backStarting: null,
  icon: {provider: 'MaterialCommunityIcons', name: 'cards-club'},
  foregroundColor: '#27b327',
  backgroundColor: '#0d5f0d',
  paddingHorizontal: 8,
  paddingVertical: 11
});

leaderTypes[LEADER_TYPES.SCARRED_SCHOLAR] = new LeaderType({
  name: LEADER_TYPES.SCARRED_SCHOLAR,
  title: 'the Scarred Scholar',
  description: ('After a loud argument and what sounded like a fistfight, |name| '
    + 'left the Red Crow Traders and joined you. Whatever the scars are from, '
    + 'one apparently only needs a single working eye to be intimidatingly well read.'),
  speechType: 'Roudy',
  toolStarting: null,
  clothingStarting: EQUIPMENT_TYPES.SIMPLE_ROBE,
  backStarting: null,
  icon: {provider: 'MaterialCommunityIcons', name: 'cards-club'},
  foregroundColor: '#27b327',
  backgroundColor: '#0d5f0d',
  paddingHorizontal: 8,
  paddingVertical: 11
});

export { leaderTypes };
