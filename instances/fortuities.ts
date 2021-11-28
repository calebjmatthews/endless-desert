import Fortuity from '../models/fortuity';
import Memo from '../models/memo';
import { GameState } from '../models/game_state';
import { FORTUITIES } from '../enums/fortuities';
import { CONVERSATIONS } from '../enums/conversations';
import { LEADER_TYPES } from '../enums/leader_types';
import { INTRO_STATES } from '../enums/intro_states';
import { RESEARCHES } from '../enums/researches';
import { TRADING_PARTNERS } from '../enums/trading_partners';
const TPA = TRADING_PARTNERS;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_TAGS } from '../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
const RSC = RESOURCE_SUBCATEGORIES;

let fortuities: { [name: string] : Fortuity } = {};

fortuities[FORTUITIES.FAMILIAR_FIGURE] = new Fortuity({
  name: FORTUITIES.FAMILIAR_FIGURE,
  openLine: 'Someone familiar is waiting to speak to you',
  memos: [
    new Memo({
      name: 'A Familiar Figure',
      title: 'A Familiar Figure',
      convoName: FORTUITIES.FAMILIAR_FIGURE + ' - 0'
    })
  ],
  type: 'Conversation',
  repeatable: false,
  weight: 1000,
  available: (fState: GameState) => {
    if (fState.account) {
      const iState = fState.account.introState;
      if (iState == INTRO_STATES.REFURBISH_HUTS || iState == INTRO_STATES.DONE) {
        return true;
      }
    }
    return false;
  }
});

fortuities[FORTUITIES.SHUDDERING_FIGURE] = new Fortuity({
  name: FORTUITIES.SHUDDERING_FIGURE,
  openLine: 'Someone is waiting to speak to you',
  memos: [
    new Memo({
      name: 'A Shuddering Figure',
      title: 'A Shuddering Figure',
      convoName: FORTUITIES.SHUDDERING_FIGURE + ' - 0'
    })
  ],
  type: 'Conversation',
  repeatable: false,
  weight: 20,
  available: (fState: GameState) => {
    if (fState.account?.fortuitiesSeen[FORTUITIES.THRICE_LOCKED_BOOK]) {
      return true;
    }
    return false;
  }
});

fortuities[FORTUITIES.SLIGHT_FIGURE] = new Fortuity({
  name: FORTUITIES.SLIGHT_FIGURE,
  openLine: 'Someone is waiting to speak to you',
  memos: [
    new Memo({
      name: 'A Slight Figure',
      title: 'A Slight Figure',
      convoName: FORTUITIES.SLIGHT_FIGURE + ' - 0'
    })
  ],
  type: 'Conversation',
  repeatable: false,
  weight: 20,
  available: (fState: GameState) => {
    if (fState.researchStatus) {
      if (fState.researchStatus.status[RESEARCHES.BASIC_EDUCATION] == 'completed') {
        return true;
      }
    }
    return false;
  }
});

fortuities[FORTUITIES.UNREPENTANT_FIGURE] = new Fortuity({
  name: FORTUITIES.UNREPENTANT_FIGURE,
  openLine: 'Someone is waiting to speak to you',
  memos: [
    new Memo({
      name: 'An Unrepentant Figure',
      title: 'An Unrepentant Figure',
      convoName: FORTUITIES.UNREPENTANT_FIGURE + ' - 0'
    })
  ],
  type: 'Conversation',
  repeatable: false,
  weight: 10,
  available: (fState: GameState) => {
    if (fState.tradingStatus) {
      const ffa = fState.tradingStatus.tradingPartners[TPA.FOXFIRE_ASCETICS];
      if (ffa?.trust >= 25) {
        return true;
      }
    }
    return false;
  }
});

fortuities[FORTUITIES.CHEERY_FIGURE] = new Fortuity({
  name: FORTUITIES.CHEERY_FIGURE,
  openLine: 'Someone is waiting to speak to you',
  memos: [
    new Memo({
      name: 'A Cheery Figure',
      title: 'A Cheery Figure',
      convoName: FORTUITIES.CHEERY_FIGURE + ' - 0'
    })
  ],
  type: 'Conversation',
  repeatable: false,
  weight: 10,
  available: (fState: GameState) => {
    if (fState.tradingStatus) {
      const tfi = fState.tradingStatus.tradingPartners[TPA.TREFOIL_ISLANDS];
      if (tfi?.trust >= (50 + 250)) {
        return true;
      }
    }
    return false;
  }
});

fortuities[FORTUITIES.LIMPING_FIGURE] = new Fortuity({
  name: FORTUITIES.LIMPING_FIGURE,
  openLine: 'Someone is waiting to speak to you',
  memos: [
    new Memo({
      name: 'A Limping Figure',
      title: 'A Limping Figure',
      convoName: FORTUITIES.LIMPING_FIGURE + ' - 0'
    })
  ],
  type: 'Conversation',
  repeatable: false,
  weight: 10,
  available: (fState: GameState) => {
    if (fState.tradingStatus) {
      const rcr = fState.tradingStatus.tradingPartners[TPA.RED_CROW_TRADERS];
      if (rcr?.trust >= (800)) {
        return true;
      }
    }
    return false;
  }
});

fortuities[FORTUITIES.RAIN] = new Fortuity({
  name: FORTUITIES.RAIN,
  openLine: 'It\'s raining',
  memos: [
    new Memo({
      name: (FORTUITIES.RAIN),
      title: 'Rain',
      text: ('Water falls from the sky, and the landscape is transformed. '
        + 'Low places that had never caught your attention are now rushing streams. '
        + 'The air is full of unfamiliar smells: shrub root, flowers, and damp earth.')
    })
  ],
  type: 'Observation',
  repeatable: true,
  weight: 10,
  gainResources: [
    {specificity: RSP.EXACT, type: RTY.KNOWLEDGE, value: 320},
    {specificity: RSP.EXACT, type: RTY.WATER, value: 20400}
  ],
  available: (fState: GameState) => {
    if (fState.leaders) {
      if (Object.keys(fState.leaders).length > 0) {
        return true;
      }
    }
    return false;
  }
});

fortuities[FORTUITIES.UNSPEAKING] = new Fortuity({
  name: FORTUITIES.UNSPEAKING,
  openLine: 'Something has happened',
  memos: [
    new Memo({
      name: (FORTUITIES.UNSPEAKING),
      title: 'Unspeaking',
      text: (`No one speaks today. You wish you knew why; the faces you pass don't look upset or unhappy. Solumn, perhaps. Is it a holiday you've never heard of, or a religious observance? You spend the day in unsettling silence. The next morning you realize someone slipped a jade broach shaped like a beetle into your robe's pocket.`)
    })
  ],
  type: 'Observation',
  repeatable: false,
  weight: 5,
  gainResources: [{specificity: RSP.EXACT, type: RTY.JADE, value: 8000}],
  available: (fState: GameState) => {
    if (fState.leaders) {
      if (Object.keys(fState.leaders).length > 0) {
        return true;
      }
    }
    return false;
  }
});

fortuities[FORTUITIES.FIERCE_WIND] = new Fortuity({
  name: FORTUITIES.FIERCE_WIND,
  openLine: 'The wind is fierce',
  memos: [
    new Memo({
      name: (FORTUITIES.FIERCE_WIND),
      title: 'A Fierce Wind',
      text: ('The wind today is shockingly powerful. Sand scours your eyes, and '
        + 'great clouds of something pass by high in the air. After the worst '
        + 'of it has died down you realize the clouds were made of seeds: patches of '
        + 'them are clustered on clothes, buildings, and every other upright surface.')
    })
  ],
  type: 'Observation',
  repeatable: true,
  weight: 10,
  gainResources: [{specificity: RSP.SUBCATEGORY, type: RSC.SEEDS, value: 2000}],
  available: (fState: GameState) => {
    if (fState.leaders) {
      if (Object.keys(fState.leaders).length > 0) {
        return true;
      }
    }
    return false;
  }
});

fortuities[FORTUITIES.BURIED_SHIP] = new Fortuity({
  name: FORTUITIES.BURIED_SHIP,
  openLine: 'Something has been found',
  memos: [
    new Memo({
      name: (FORTUITIES.BURIED_SHIP + '0'),
      title: 'A Sand-buried Ship',
      text: ('A group of workers has uncovered something strange: based on a volume '
        + 'you once read you believe it\'s a ship made for traveling across water. '
        + 'It\'s covered by a bright blue paint which has mostly chipped off in the '
        + 'sand, and little fishes have been carved across the railing. How did this '
        + 'come to be here?')
    }),
    new Memo({
      name: (FORTUITIES.BURIED_SHIP + '1'),
      title: 'A Sand-buried Ship',
      text: ('Inside the ship there are sealed crates containing supplies, but '
        + 'your people break them open easily enough. You tell them to leave '
        + 'the rest of the ship as undamaged as they can.')
    })
  ],
  type: 'Observation',
  repeatable: true,
  weight: 5,
  gainResources: [
    {specificity: RSP.TAG, type: RTA.PROVISION, value: 10000},
    {specificity: RSP.EXACT, type: RTY.WOOD_WILLOW, value: 5000}
  ],
  available: (fState: GameState) => {
    if (fState.leaders) {
      if (Object.keys(fState.leaders).length > 0) {
        return true;
      }
    }
    return false;
  }
});

fortuities[FORTUITIES.UNUSUAL_SOIL] = new Fortuity({
  name: FORTUITIES.UNUSUAL_SOIL,
  openLine: 'Education is paying off',
  memos: [
    new Memo({
      name: (FORTUITIES.UNUSUAL_SOIL + '0'),
      title: 'Unusual Soil',
      text: (`"After that geology lecture you gave us we\'ve been looking at sand formations-", "And take a look at that!", "That patch of sand looks to have an unusually low silica ratio-", "And the particle size is nothing like the sand endemic to our part of the desert!"`)
    }),
    new Memo({
      name: (FORTUITIES.UNUSUAL_SOIL + '1'),
      title: 'Unusual Soil',
      text: (`The crowd around you is enthusiastic, if a little intense. But they're right; a short distance outside your settlement there's a strange patch of unusual sand, and the clay beneath it is just as out of place.`)
    })
  ],
  type: 'Observation',
  repeatable: true,
  weight: 10,
  gainResources: [
    {specificity: RSP.SUBCATEGORY, type: RSC.SAND, value: 3000},
    {specificity: RSP.SUBCATEGORY, type: RSC.CLAY, value: 5000},
  ],
  available: (fState: GameState) => {
    if (fState.researchStatus) {
      if (fState.researchStatus.status[RESEARCHES.BASIC_EDUCATION] == 'completed') {
        return true;
      }
    }
    return false;
  }
});

fortuities[FORTUITIES.THRICE_LOCKED_BOOK] = new Fortuity({
  name: FORTUITIES.THRICE_LOCKED_BOOK,
  openLine: 'Wait, what\'s this?',
  memos: [
    new Memo({
      name: (FORTUITIES.THRICE_LOCKED_BOOK + '0'),
      title: 'An Unexpected Find',
      text: (`While walking through the exceptionally useful storage caverns underneath the town, you come across something strange. Behind a cluster of rocks is what looks like a study, its crumbling walls exposing to the underground air.`)
    }),
    new Memo({
      name: (FORTUITIES.THRICE_LOCKED_BOOK + '1'),
      title: 'An Unexpected Find',
      text: (`There's a desk, an empty inkwell, and some loose sheets of partment that have mostly turned to dust. But in one of the drawers is something altogether different: a black book, alarmingly heavy, with clasps made of a hard red metal.`)
    }),
    new Memo({
      name: (FORTUITIES.THRICE_LOCKED_BOOK + '2'),
      title: 'An Unexpected Find',
      text: (`The book has three separate sturdy locks; forcing them open isn't an option. On its cover is a pattern of white specks and the word "Unfound". You don't know what to make of it, but you take the book with you. Any information about the people who originally lived here could be paramount.`)
    })
  ],
  type: 'Observation',
  repeatable: false,
  weight: 100,
  gainResources: [
    {specificity: RSP.EXACT, type: RTY.THRICE_LOCKED_BOOK, value: 33000}
  ],
  available: (fState: GameState) => {
    if (fState.leaders) {
      if (Object.keys(fState.leaders).length > 1) {
        return true;
      }
    }
    return false;
  }
});

export { fortuities };
