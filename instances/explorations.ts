import Exploration from '../models/exploration';
import Icon from '../models/icon';
import Memo from '../models/memo';
import { utils } from '../utils';
import { EXPLORATIONS } from '../enums/explorations';
import { EXPLORATION_CHALLENGES } from '../enums/exploration_challenges';
import { SVGS } from '../enums/svgs';
const EXC = EXPLORATION_CHALLENGES;
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_TAGS } from '../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
const RSC = RESOURCE_SUBCATEGORIES;
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
const RCA = RESOURCE_CATEGORIES;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;

const explorations: { [id: string] : Exploration } = {
  [EXPLORATIONS.CLIFFSIDE_CARTOGRAPHERS_TOWER]: new Exploration({
    id: EXPLORATIONS.CLIFFSIDE_CARTOGRAPHERS_TOWER,
    name: EXPLORATIONS.CLIFFSIDE_CARTOGRAPHERS_TOWER,
    size: [[10, 16], [8, 13], [6, 10]],
    challenges: [
      { type: EXC.BREAKABLES, difficulty: 1, frequency: 20 } 
    ],
    treasuresInitial: [
      { specificity: RSP.EXACT, type: RTY.HINT_FRATERNAL_FATE }
    ],
    treasures: [
      { specificity: RSP.CATEGORY, type: RCA.FIELD_NOTES, weight: 100 },
      { specificity: RSP.EXACT, type: RTY.STARCHART, weight: 20 }
    ],
    treasureValue: 60000,
    getTreasureCount: () => defaultGetTreasureCount(2),
    description: `A jumble of prisms hang from the ceiling of the abandoned tower, refracting light coming from a single porthole in the high roof.`,
    icon: new Icon({provider: 'svg', name: SVGS.CARTOGRAPHERS_TOWER}),
    memoSuccessInitial: new Memo({
      name: `${EXPLORATIONS.CLIFFSIDE_CARTOGRAPHERS_TOWER}-initial`,
      title: 'The Tower, Unraveled',
      text: `A closer study of the floor under each of the prisms shows tangles of lines that aren't random marks, as you'd first thought. They're starcharts, of a sort, and annotated with characters you don't understand. Still, you might be able to cobble together some kind of direction from them.`
    }),
    memoSuccess: new Memo({
      name: `${EXPLORATIONS.CLIFFSIDE_CARTOGRAPHERS_TOWER}-subsequent`,
      title: 'The Tower, Conquered',
      text: `Further study of the notes and drawings that cover the floors of this tower, and you're beginning to get a sense of the characters, and their meaning. They describe phenomena of all kinds, not just astrological, and much of it is new to you. And on occation you can even find a discarded scholar's tool. Whoever built and used this had both skill and means.`
    })
  }),

  [EXPLORATIONS.THIEVES_CAMP]: new Exploration({
    id: EXPLORATIONS.THIEVES_CAMP,
    name: EXPLORATIONS.THIEVES_CAMP,
    size: [[20, 30]],
    challenges: [
      { type: EXC.DARK, difficulty: 1 } ,
      { type: EXC.TRAPS, difficulty: 1, frequency: 5 }
    ],
    treasuresInitial: [
      { specificity: RSP.EXACT, type: RTY.HINT_BANDIT_QUEENS_MOVEMENTS }
    ],
    treasures: [
      { specificity: RSP.SUBCATEGORY, type: RSC.GEM, weight: 100 },
      { specificity: RSP.TAG, type: RTA.PRECIOUS, weight: 50 }
    ],
    treasureValue: 55555,
    getTreasureCount: () => defaultGetTreasureCount(3),
    description: `A cluster of tents, hidden in a depression between dunes. It's deathly quiet, which could mean either abandonment or a trap.`,
    icon: new Icon({provider: 'svg', name: SVGS.THIEVES_CAMP}),
    memoSuccessInitial: new Memo({
      name: `${EXPLORATIONS.THIEVES_CAMP}-initial`,
      title: `Revelry's Aftermath`,
      text: `In sneaking around through the thieves' campground you've found remnants of feasting, discarded beer vessels, and countless slips of parchment. They all contain bits of poetry (of varying quality). "Rosy-fingered dawn caressing the dunes?" A little trite. The thieves must have other nests. With some work, you might be able to piece this questionable poetry together into a lead.`
    }),
    memoSuccess: new Memo({
      name: `${EXPLORATIONS.THIEVES_CAMP}-subsequent`,
      title: 'The Tower, Conquered',
      text: `You find even more slips containing unfinished poetry: "The noonday air, scouring my breath and raising my spirits", "The basalt rose silently, the surface glittering as heat out of light". All written by the same hand. Is the thieves' leader a lover of both verse and stolen jewels?`
    })
  }),

  [EXPLORATIONS.CASCASE_OF_PRIMSMATIC_SAND]: new Exploration({
    id: EXPLORATIONS.CASCASE_OF_PRIMSMATIC_SAND,
    name: EXPLORATIONS.CASCASE_OF_PRIMSMATIC_SAND,
    size: [[10, 14], [20, 36]],
    challenges: [
      { type: EXC.DARK, difficulty: 1 },
      { type: EXC.BREAKABLES, difficulty: 1, frequency: 15 },
      { type: EXC.HAZARDS, difficulty: 1, frequency: 4 }
    ],
    treasuresInitial: [
      // { specificity: RSP.EXACT, type: RTY.STAINED_GLASS } 
    ],
    treasures: [
      { specificity: RSP.EXACT, type: RTY.PORTAGE_BOX_SAND, weight: 100 },
      { specificity: RSP.EXACT, type: RTY.GLASS_FLOAT, weight: 20 }
    ],
    treasureValue: 75000,
    getTreasureCount: () => defaultGetTreasureCount(3),
    description: ``,
    icon: new Icon({provider: 'svg', name: SVGS.PRISMATIC_SAND}),
    memoSuccessInitial: new Memo({
      name: `${EXPLORATIONS.CASCASE_OF_PRIMSMATIC_SAND}-initial`,
      title: ``,
      text: ``
    }),
    memoSuccess: new Memo({
      name: `${EXPLORATIONS.CASCASE_OF_PRIMSMATIC_SAND}-subsequent`,
      title: ``,
      text: ``
    })
  }),

  [EXPLORATIONS.TWIN_MOONS_GROTTO]: new Exploration({
    id: EXPLORATIONS.TWIN_MOONS_GROTTO,
    name: EXPLORATIONS.TWIN_MOONS_GROTTO,
    size: [[18, 26], [18, 26]],
    challenges: [
      { type: EXC.DARK, difficulty: 1 },
      { type: EXC.BREAKABLES, difficulty: 1, frequency: 25 },
    ],
    treasuresInitial: [
      // { specificity: RSP.EXACT, type: RTY. } ITTAR???
    ],
    treasures: [
      { specificity: RSP.EXACT, type: RTY.CHITENOUS_PINS, weight: 100 },
      { specificity: RSP.EXACT, type: RTY.ECHINACEA_BLOOM, weight: 100 },
      { specificity: RSP.EXACT, type: RTY.LOTUS_ROOT, weight: 50, quality: 1 },
      { specificity: RSP.EXACT, type: RTY.LOTUS_ROOT, weight: 12.5, quality: 2 },
      { specificity: RSP.EXACT, type: RTY.WATER, weight: 50, quality: 2 }
    ],
    treasureValue: 75000,
    getTreasureCount: () => defaultGetTreasureCount(3),
    description: ``,
    icon: new Icon({provider: 'svg', name: SVGS.TWIN_MOONS}),
    memoSuccessInitial: new Memo({
      name: `${EXPLORATIONS.TWIN_MOONS_GROTTO}-initial`,
      title: ``,
      text: ``
    }),
    memoSuccess: new Memo({
      name: `${EXPLORATIONS.TWIN_MOONS_GROTTO}-subsequent`,
      title: ``,
      text: ``
    })
  }),
}

const defaultGetTreasureCount = (defaultCount: number) => (
  Math.round(Math.floor(defaultCount / 2) + (utils.randomGaussian() * defaultCount))
);

export { explorations };