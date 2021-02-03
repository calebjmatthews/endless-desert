import Fortuity from '../models/fortuity';
import Memo from '../models/memo';
import { FortuityState } from '../models/fortuity_state';
import { FORTUITIES } from '../enums/fortuities';
import { LEADER_TYPES } from '../enums/leader_types';
import { INTRO_STATES } from '../enums/intro_states';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_TAGS } from '../enums/resource_tags';
const RTA = RESOURCE_TAGS;

let fortuities: { [name: string] : Fortuity } = {};

fortuities[FORTUITIES.FAMILIAR_FIGURE] = new Fortuity({
  name: FORTUITIES.FAMILIAR_FIGURE,
  openLine: 'Someone familiar is waiting to speak to you',
  memos: [
    new Memo({
      name: (FORTUITIES.FAMILIAR_FIGURE + '0'),
      title: 'Someone Familiar',
      text: ('Samannoud: "Yeah, I followed you all the way out here. What, did you '
        + 'think I was just going to let you run off into the desert after Dani '
        + 'and end up dead? Gods knew what you were thinking, although your '
        + 'clumsy trail was easy enough to follow."')
    }),
    new Memo({
      name: (FORTUITIES.FAMILIAR_FIGURE + '1'),
      title: 'Someone Familiar',
      text: ('Samannoud: "From now on it\'ll be me doing the exploring, and '
        + 'you doing the reading and counting and such. '
        + 'Less likely you\'ll get yourself killed that way."'),
      leaderJoined: LEADER_TYPES.SAMANNOUD
    })
  ],
  type: 'Conversation',
  repeatable: false,
  weight: 1000,
  leaderJoins: LEADER_TYPES.SAMANNOUD,
  available: (fState: FortuityState) => {
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
      name: (FORTUITIES.SHUDDERING_FIGURE + '0'),
      title: 'A Shuddering Figure',
      text: ('Da Nang: My name is Da Nang. My people and I have traveled '
        + 'thousands of miles, '
        + 'across seas and forests, suffering every step of the way. '
        + 'But these smooth waves of sand speak of a beginning. And perhaps '
        + 'we are far enough away, now.')
    }),
    new Memo({
      name: (FORTUITIES.SHUDDERING_FIGURE + '1'),
      title: 'A Shuddering Figure',
      text: ('Da Nang: "We will stay here, with you, in the desert. Unless you '
        + 'remove us by force we will travel no longer."'),
      leaderJoined: LEADER_TYPES.SHUDDERING_REFUGE
    })
  ],
  type: 'Conversation',
  repeatable: false,
  weight: 20,
  leaderJoins: LEADER_TYPES.SHUDDERING_REFUGE,
  available: (fState: FortuityState) => {
    if (fState.leaders) {
      if (Object.keys(fState.leaders).length > 0) {
        return true;
      }
    }
    return false;
  }
});

fortuities[FORTUITIES.DOWNCAST_FIGURE] = new Fortuity({
  name: FORTUITIES.DOWNCAST_FIGURE,
  openLine: 'Someone is waiting to speak to you',
  memos: [
    new Memo({
      name: (FORTUITIES.DOWNCAST_FIGURE + '0'),
      title: 'A Downcast Figure',
      text: ('Guangzhou: "I have been ejected from the ascetics, for... '
        + 'For betraying my vows. I have no place to go."')
    }),
    new Memo({
      name: (FORTUITIES.DOWNCAST_FIGURE + '1'),
      title: 'A Downcast Figure',
      text: ('Guangzhou: "Please. I can till a field, I can raise a building, '
        + 'I can help an animal to give birth. Show mercy, if you can. '
        + 'Allow me to stay."'),
      leaderJoined: LEADER_TYPES.FOXFIRE_HERETIC
    })
  ],
  type: 'Conversation',
  repeatable: false,
  weight: 10,
  leaderJoins: LEADER_TYPES.FOXFIRE_HERETIC,
  available: (fState: FortuityState) => {
    if (fState.leaders) {
      if (Object.keys(fState.leaders).length > 0) {
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
    {specificity: RSP.EXACT, type: RTY.KNOWLEDGE, value: 48},
    {specificity: RSP.EXACT, type: RTY.WATER, value: 580}
  ],
  available: (fState: FortuityState) => {
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
      text: ('No one speaks today. You wish you knew why; the faces you pass don\'t '
        + 'look upset or unhappy. Solumn, perhaps. Is it a holiday you\'ve never heard '
        + 'of, or a religious observance? You spend the day in unsettling silence.')
    })
  ],
  type: 'Observation',
  repeatable: false,
  weight: 5,
  gainResources: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, value: 82}],
  available: (fState: FortuityState) => {
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
  gainResources: [{specificity: RSP.EXACT, type: RTY.SEEDS, value: 822}],
  available: (fState: FortuityState) => {
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
  repeatable: false,
  weight: 5,
  gainResources: [
    {specificity: RSP.TAG, type: RTA.CONSTRUCTION, value: 200},
    {specificity: RSP.TAG, type: RTA.FOOD, value: 200},
    {specificity: RSP.TAG, type: RTA.DRINK, value: 200}
  ],
  available: (fState: FortuityState) => {
    if (fState.leaders) {
      if (Object.keys(fState.leaders).length > 0) {
        return true;
      }
    }
    return false;
  }
});

export { fortuities };
