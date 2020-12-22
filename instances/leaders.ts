import Leader from '../models/leader';
import { utils } from '../utils';

let leadersStarting: { [id: string] : Leader } = {};

function startingFactory() {
  let startingLeader = new Leader({
    id: utils.randHex(16),
    name: 'Samannoud',
    description: ('A bevy of scars, sun-bleached hair, and a fondness for cats. '
      + 'You\'ve known Samannoud as long as you can remember.'),
    speechType: 'Samannoud',
    assignedTo: null,
    toolEquipped: null,
    clothingEquipped: null,
    backEquipped: null,
    eating: null,
    drinking: null,
    icon: {provider: 'MaterialCommunityIcons', name: 'star-four-points'},
    foregroundColor: '#dc2222',
    backgroundColor: '#3e37a0',
    paddingVertical: 8,
    paddingHorizontal: 10
  });
  leadersStarting[startingLeader.id] = startingLeader;
}

startingFactory();

export { leadersStarting }
