import Destination from '../models/destination';
import Icon from '../models/icon';
import { RESEARCHES } from '../enums/researches';
import { EXPLORATIONS } from '../enums/explorations';
import { DESTINATION_TYPES } from '../enums/destination_types';
import { SVGS } from '../enums/svgs';

const destinations: { [name: string] : Destination } = {
  [RESEARCHES.DESTINATION_CLIFFSIDE_CARTOGRAPHERS_TOWER]: new Destination({
    id: RESEARCHES.DESTINATION_CLIFFSIDE_CARTOGRAPHERS_TOWER,
    name: `Cliffside Explorer's Study`,
    coordinates: [58, -15], // 60
    atFinish: {
      id: EXPLORATIONS.CLIFFSIDE_CARTOGRAPHERS_TOWER,
      type: DESTINATION_TYPES.EXPLORATION
    },
    icon: new Icon({provider: 'svg', name: SVGS.CARTOGRAPHERS_TOWER})
  })
};

export { destinations };