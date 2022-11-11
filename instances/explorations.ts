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
    size: [20, 30],
    challenges: [
      { type: EXC.BREAKABLES, difficulty: 1, frequency: 20 } 
    ],
    treasuresPrimary: [
      { specificity: RSP.EXACT, type: RTY.HINT_FRATERNAL_FATE }
    ],
    treasuresSecondary: [
      { specificity: RSP.CATEGORY, type: RCA.FIELD_NOTES, weight: 100 },
      { specificity: RSP.EXACT, type: RTY.STARCHART, weight: 20 }
    ],
    treasureValue: 55555,
    getTreasureCount: () => defaultGetTreasureCount(2),
    description: `A jumble of prisms hang from the ceiling of the abandoned tower, refracting light coming from a single porthole in the high roof.`,
    icon: new Icon({provider: 'svg', name: SVGS.CARTOGRAPHERS_TOWER}),
    memoSuccessPrimary: new Memo({
      name: `${EXPLORATIONS.CLIFFSIDE_CARTOGRAPHERS_TOWER}-primary`,
      title: 'The Tower, Conquered',
      text: `A closer study of the floor under each of the prisms shows tangles of lines that aren't random marks, as you'd first thought. They're starcharts, of a sort, and annotated with characters you don't understand. Still, you might be able to cobble together some kind of direction from them.`
    }),
    memoSuccessSecondary: new Memo({
      name: `${EXPLORATIONS.CLIFFSIDE_CARTOGRAPHERS_TOWER}-secondary`,
      title: 'The Tower, Conquered Again',
      text: `Further study of the notes and drawings that cover the floors of this tower, and you're beginning to get a sense of the characters, and their meaning. They describe phenomena of all kinds, not just astrological, and much of it is new to you. And on occation you can even find a discarded scholar's tool. Whoever built and used this had both skill and means.`
    })
  }),

  [EXPLORATIONS.THIEVES_CAMP]: new Exploration({
    id: EXPLORATIONS.THIEVES_CAMP,
    name: EXPLORATIONS.THIEVES_CAMP,
    size: [25, 25],
    challenges: [
      { type: EXC.DARK, difficulty: 1 } ,
      { type: EXC.TRAPS, difficulty: 1, frequency: 5 }
    ],
    treasuresPrimary: [
      { specificity: RSP.EXACT, type: RTY.HINT_BANDIT_QUEENS_MOVEMENTS }
    ],
    treasuresSecondary: [
      { specificity: RSP.SUBCATEGORY, type: RSC.GEM, weight: 100 },
      { specificity: RSP.TAG, type: RTA.PRECIOUS, weight: 50 }
    ],
    treasureValue: 55555,
    getTreasureCount: () => defaultGetTreasureCount(3),
    description: ``,
    icon: new Icon({provider: '', name: ''}),
    // memoSuccessPrimary?: Memo; 
    // memoSuccessSecondary?: Memo; 
  }),
}

const defaultGetTreasureCount = (defaultCount: number) => (
  Math.round(Math.floor(defaultCount / 2) + (utils.randomGaussian() * defaultCount))
);

export { explorations };