import Destination from '../models/destination';
import Icon from '../models/icon';
import { RESEARCHES } from '../enums/researches';
import { EXPLORATIONS } from '../enums/explorations';
import { DESTINATION_TYPES } from '../enums/destination_types';
import { SVGS } from '../enums/svgs';

const destinations: { [name: string] : Destination } = {
  [RESEARCHES.DESTINATION_CLIFFSIDE_CARTOGRAPHERS_TOWER]: new Destination({
    id: RESEARCHES.DESTINATION_CLIFFSIDE_CARTOGRAPHERS_TOWER,
    name: EXPLORATIONS.CLIFFSIDE_CARTOGRAPHERS_TOWER,
    coordinates: [58, -15], // 60
    atFinish: {
      id: EXPLORATIONS.CLIFFSIDE_CARTOGRAPHERS_TOWER,
      type: DESTINATION_TYPES.EXPLORATION
    },
    icon: new Icon({provider: 'svg', name: SVGS.CARTOGRAPHERS_TOWER, backgroundColor: '#404b85'})
  }),
  [RESEARCHES.DESTINATION_MOONLIT_POTTERS_STUDIO]: new Destination({
    id: RESEARCHES.DESTINATION_MOONLIT_POTTERS_STUDIO,
    name: EXPLORATIONS.MOONLIT_POTTERS_STUDIO,
    coordinates: [140, 80], // 161
    atFinish: {
      id: EXPLORATIONS.MOONLIT_POTTERS_STUDIO,
      type: DESTINATION_TYPES.EXPLORATION
    },
    icon: new Icon({provider: 'svg', name: SVGS.MOONLIT_STUDIO})
  }),
  [RESEARCHES.DESTINATION_THIEVES_CAMP]: new Destination({
    id: RESEARCHES.DESTINATION_THIEVES_CAMP,
    name: EXPLORATIONS.THIEVES_CAMP,
    coordinates: [-10, 40], // 41
    atFinish: {
      id: EXPLORATIONS.THIEVES_CAMP,
      type: DESTINATION_TYPES.EXPLORATION
    },
    icon: new Icon({provider: 'svg', name: SVGS.THIEVES_CAMP, backgroundColor: '#2c88ac'})
  }),
  [RESEARCHES.DESTINATION_CASCASE_OF_PRIMSMATIC_SAND]: new Destination({
    id: RESEARCHES.DESTINATION_CASCASE_OF_PRIMSMATIC_SAND,
    name: EXPLORATIONS.CASCASE_OF_PRIMSMATIC_SAND,
    coordinates: [30, 58], // 65
    atFinish: {
      id: EXPLORATIONS.CASCASE_OF_PRIMSMATIC_SAND,
      type: DESTINATION_TYPES.EXPLORATION
    },
    icon: new Icon({provider: 'svg', name: SVGS.PRISMATIC_SAND})
  }),
  [RESEARCHES.DESTINATION_TWIN_MOONS_GROTTO]: new Destination({
    id: RESEARCHES.DESTINATION_TWIN_MOONS_GROTTO,
    name: EXPLORATIONS.TWIN_MOONS_GROTTO,
    coordinates: [-80, -40], // 89
    atFinish: {
      id: EXPLORATIONS.TWIN_MOONS_GROTTO,
      type: DESTINATION_TYPES.EXPLORATION
    },
    icon: new Icon({provider: 'svg', name: SVGS.TWIN_MOONS})
  }),
  [RESEARCHES.DESTINATION_PAINTED_RAVINE]: new Destination({
    id: RESEARCHES.DESTINATION_PAINTED_RAVINE,
    name: EXPLORATIONS.PAINTED_RAVINE,
    coordinates: [-45, -60], // 75
    atFinish: {
      id: EXPLORATIONS.PAINTED_RAVINE,
      type: DESTINATION_TYPES.EXPLORATION
    },
    icon: new Icon({provider: 'svg', name: SVGS.PAINTED_CANYON})
  }),
};

export { destinations };