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
import { QUESTS } from '../enums/quests';
import { BUILDING_TYPES } from '../enums/building_types';

let fortuities: { [name: string] : Fortuity } = {};

fortuities[FORTUITIES.FAMILIAR_FIGURE] = new Fortuity({
  name: FORTUITIES.FAMILIAR_FIGURE,
  openLine: 'Someone familiar is waiting to speak to you',
  memos: [
    new Memo({
      name: 'A Familiar Figure',
      title: 'A Familiar Figure',
      convoName: FORTUITIES.FAMILIAR_FIGURE
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

fortuities[FORTUITIES.SLIGHT_FIGURE] = new Fortuity({
  name: FORTUITIES.SLIGHT_FIGURE,
  openLine: 'Someone is waiting to speak to you',
  memos: [
    new Memo({
      name: 'A Slight Figure',
      title: 'A Slight Figure',
      convoName: FORTUITIES.SLIGHT_FIGURE
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
      convoName: FORTUITIES.UNREPENTANT_FIGURE
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
      convoName: FORTUITIES.CHEERY_FIGURE
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
      convoName: FORTUITIES.LIMPING_FIGURE
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

fortuities[FORTUITIES.BELLIGERENT_FIGURE] = new Fortuity({
  name: FORTUITIES.BELLIGERENT_FIGURE,
  openLine: 'Samannoud is waiting to speak to you',
  memos: [
    new Memo({
      name: 'A Belligerent Figure',
      title: 'A Belligerent Figure',
      convoName: FORTUITIES.BELLIGERENT_FIGURE
    })
  ],
  type: 'Conversation',
  repeatable: false,
  weight: 1000,
  available: (fState: GameState) => {
    if (fState.questStatus) {
      return (fState.questStatus.questsCompleted
        [QUESTS.OPPORTUNITY_A_STRANDED_STRANGER]) !== undefined;
    }
    return false;
  }
});

fortuities[FORTUITIES.THE_NOBLE_DROMEDARY] = new Fortuity({
  name: FORTUITIES.THE_NOBLE_DROMEDARY,
  openLine: 'A slow-moving caravan of Dromedaries approaches',
  memos: [
    new Memo({
      name: 'The Noble Dromedary',
      title: 'The Noble Dromedary',
      convoName: CONVERSATIONS.DRO_THE_NOBLE_DROMEDARY
    })
  ],
  type: 'Conversation',
  repeatable: false,
  weight: 1000,
  available: (fState: GameState) => {
    if (fState.questStatus) {
      return (fState.questStatus.questsCompleted
        [QUESTS.ASTRONOMY_REPAIRING_THE_DOME]) !== undefined;
    }
    return false;
  }
});

fortuities[FORTUITIES.BARTERING_DROMEDARY] = new Fortuity({
  name: FORTUITIES.BARTERING_DROMEDARY,
  openLine: 'A slow-moving caravan of Dromedaries approaches',
  memos: [
    new Memo({
      name: 'Bartering for Dromedaries',
      title: 'Bartering for Dromedaries',
      convoName: CONVERSATIONS.DRO_BARTERING_DROMEDARY
    })
  ],
  type: 'Conversation',
  repeatable: false,
  weight: 1000,
  available: (fState: GameState) => {
    const dromedarianQuestsCompleted = Object.keys(fState.questStatus?.
      questsCompleted || {}).filter((questName) => questName.includes('Dromedarian:'));
    const currentDromedarianQuest = Object.keys(fState.questStatus?.
      quests || {}).filter((questName) => questName.includes('Dromedarian:'));
    return (dromedarianQuestsCompleted.length >= 1
      && currentDromedarianQuest.length === 0);
  }
});

fortuities[FORTUITIES.A_SUSPICION_DROMEDARIAN] = new Fortuity({
  name: FORTUITIES.A_SUSPICION_DROMEDARIAN,
  openLine: 'A slow-moving caravan of Dromedaries approaches',
  memos: [
    new Memo({
      name: 'A Suspicion of the Dromedarian',
      title: 'A Suspicion of the Dromedarian',
      convoName: CONVERSATIONS.DRO_A_SUSPICION
    })
  ],
  type: 'Conversation',
  repeatable: false,
  weight: 1000,
  available: (fState: GameState) => {
    const dromedarianQuestsCompleted = Object.keys(fState.questStatus?.
      questsCompleted || {}).filter((questName) => questName.includes('Dromedarian:'));
    const currentDromedarianQuest = Object.keys(fState.questStatus?.
      quests || {}).filter((questName) => questName.includes('Dromedarian:'));
    return (dromedarianQuestsCompleted.length >= 3
      && currentDromedarianQuest.length === 0);
  }
});

fortuities[FORTUITIES.SOUTHERN_WADI] = new Fortuity({
  name: FORTUITIES.SOUTHERN_WADI,
  openLine: 'A slow-moving caravan of Dromedaries approaches',
  memos: [
    new Memo({
      name: 'A Southern Wadi',
      title: 'A Southern Wadi',
      convoName: CONVERSATIONS.DRO_SOUTHERN_WADI
    })
  ],
  type: 'Conversation',
  repeatable: false,
  weight: 1000,
  available: (fState: GameState) => {
    const dromedarianQuestsCompleted = Object.keys(fState.questStatus?.
      questsCompleted || {}).filter((questName) => questName.includes('Dromedarian:'));
    const currentDromedarianQuest = Object.keys(fState.questStatus?.
      quests || {}).filter((questName) => questName.includes('Dromedarian:'));
    return (dromedarianQuestsCompleted.length >= 6
      && currentDromedarianQuest.length === 0);
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
  gainResources: [{specificity: RSP.EXACT, type: RTY.JADE_TOKEN, value: 8000}],
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

fortuities[FORTUITIES.THRICE_LOCKED_TOME] = new Fortuity({
  name: FORTUITIES.THRICE_LOCKED_TOME,
  openLine: 'Wait, what\'s this?',
  memos: [
    new Memo({
      name: (FORTUITIES.THRICE_LOCKED_TOME + '0'),
      title: 'An Unexpected Find',
      text: (`While walking through the exceptionally useful storage caverns underneath the town, you come across something strange. Behind a cluster of rocks is what looks like a study, its crumbling walls exposed to the underground air.`)
    }),
    new Memo({
      name: (FORTUITIES.THRICE_LOCKED_TOME + '1'),
      title: 'An Unexpected Find',
      text: (`There's a desk, an empty inkwell, and some loose sheets of parchment that have mostly turned to dust. But in one of the drawers is something altogether different: a black book, alarmingly heavy, with clasps made of a hard red metal.`)
    }),
    new Memo({
      name: (FORTUITIES.THRICE_LOCKED_TOME + '2'),
      title: 'An Unexpected Find',
      text: (`The book has three separate sturdy locks; forcing them open isn't an option. On its cover is a pattern of oddly arranged white circles. You don't know what to make of it, but you take the book with you. Any information about the people who originally lived here could be paramount.`)
    })
  ],
  type: 'Observation',
  repeatable: false,
  weight: 100,
  gainResources: [
    {specificity: RSP.EXACT, type: RTY.THRICE_LOCKED_TOME, value: 33000}
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

fortuities[FORTUITIES.A_TERRACED_PLATFORM] = new Fortuity({
  name: FORTUITIES.A_TERRACED_PLATFORM,
  openLine: `There's something strange underground`,
  memos: [
    new Memo({
      name: (FORTUITIES.A_TERRACED_PLATFORM + '0'),
      title: 'A Terraced Platform',
      text: (`Beneath your town, next to where the clay is stored, there's a ruined structure partway up the cavern wall. You can almost make out a set wooden platforms, but between the distance and their disrepair you can't be sure what they are.`)
    }),
    new Memo({
      name: (FORTUITIES.A_TERRACED_PLATFORM + '1'),
      title: 'A Terraced Platform',
      text: (`There's more to these caves under the town than one might expect. If you had enough bricks you could build a staircase and search these platforms properly.`)
    })
  ],
  type: 'Observation',
  repeatable: false,
  weight: 1000,
  questsBegin: [QUESTS.MYSTICISM_A_TERRACED_PLATFORM],
  available: (fState: GameState) => {
    if (fState.vault?.resources[`${RTY.RED_KEY}|0`]) {
      if (fState.vault?.resources[`${RTY.RED_KEY}|0`].quantity >= 1) {
        return true;
      }
    }
    return false;
  }
});

fortuities[FORTUITIES.A_SANDSTONE_THROUGHWAY] = new Fortuity({
  name: FORTUITIES.A_SANDSTONE_THROUGHWAY,
  openLine: 'A letter falls onto you',
  memos: [
    new Memo({
      name: (FORTUITIES.A_SANDSTONE_THROUGHWAY + '0'),
      title: 'A Sandstone Throughway',
      text: (`A messenger hawk drops a... rather stange letter onto your head. It reads:

"SITUATION: The Sandstone Edificers wish to explore your town as a source for procurement of raw materials; however, the nearby terrain is unstable to a problematic degree."`)
    }),
    new Memo({
      name: (FORTUITIES.A_SANDSTONE_THROUGHWAY + '1'),
      title: 'A Sandstone Throughway',
      text: (`PROPOSAL: If accepting, you shall erect a number of buildings to gather data regarding soil compaction and stress tolerance. You shall collect construction resources as specified below. Subsequently, the Edificers will assemble a throughway and begin periodic stops for raw material, for which you will be compensated accordingly.

- Asyut, Sandstone Edificers, Archetect 1st Class"`)
    })
  ],
  type: 'Observation',
  repeatable: false,
  weight: 1000,
  questsBegin: [QUESTS.NATIONS_A_SANDSTONE_THROUGHWAY],
  available: (fState: GameState) => {
    if ((fState.vault?.resources[`${RTY.CLAY_MUDDY}|0`]?.quantity || 0) > 1000) {
      return true;
    }
    return false;
  }
});

fortuities[FORTUITIES.SPRING_AUTUMN_PROOFS] = new Fortuity({
  name: FORTUITIES.SPRING_AUTUMN_PROOFS,
  openLine: 'A letter falls onto you',
  memos: [
    new Memo({
      name: (FORTUITIES.SPRING_AUTUMN_PROOFS + '0'),
      title: 'Spring-Autumn Proofs',
      text: (`A messenger hawk drops a letter onto your head, which is lightly perfumed and bears a wax seal. It reads:

"We have received word of the rapid growth of your settlement, which lies near to routes often used by our trading parties. We, with authority vested by our august Emperor, seek a trading partnership for our mutual benefit."`)
    }),
    new Memo({
      name: (FORTUITIES.SPRING_AUTUMN_PROOFS + '1'),
      title: 'Spring-Autumn Proofs',
      text: (`"Please see the attached list of requisite goods to prove your settlement's sufficient advancement. Note that these are yours to keep, their production alone is adequate proof. With all deserved regard,

Weifang, his Spring-Autumn Majesty's Seventh Seneschal of Trade"`)
    })
  ],
  type: 'Observation',
  repeatable: false,
  weight: 1000,
  questsBegin: [QUESTS.NATIONS_SPRING_AUTUMN_PROOFS],
  available: (fState: GameState) => {
    const buildingsArray = Object.keys(fState.buildings || {}).map((id) => {
      return fState.buildings?.[id];
    });
    for (let index = 0; index < buildingsArray.length; index++) {
      const building = buildingsArray[index];
      if (building?.buildingType === BUILDING_TYPES.GATE_BRICKWORK
        || building?.buildingType === BUILDING_TYPES.GATE_METAL_CLAD
        || building?.buildingType === BUILDING_TYPES.GATE_SHINING
        || building?.buildingType === BUILDING_TYPES.GATE_RUNIC
        || building?.buildingType === BUILDING_TYPES.GATE_PEARLESCENT) {
        return true;
      }
    }
    return false;
  }
});

fortuities[FORTUITIES.A_SOILED_YET_SHINING_GOWN] = new Fortuity({
  name: FORTUITIES.A_SOILED_YET_SHINING_GOWN,
  openLine: 'A stranger is demanding your attention',
  memos: [
    new Memo({
      name: 'A Soiled, Yet Shining Gown',
      title: 'A Soiled, Yet Shining Gown',
      convoName: FORTUITIES.A_SOILED_YET_SHINING_GOWN
    })
  ],
  type: 'Observation',
  repeatable: false,
  weight: 1000,
  available: (fState: GameState) => {
    if ((fState.vault?.resources?.[`${RTY.JADE_TOKEN}|0`]?.quantity || 0) >= 25) {
      return true;
    }
    return false;
  }
});

export { fortuities };
