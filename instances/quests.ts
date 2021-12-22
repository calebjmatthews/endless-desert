import Quest from '../models/quest';
import QuestTask from '../models/quest_task';
import QuestProgress from '../models/quest_progress';
import Icon from '../models/icon';
import { conversations } from '../instances/conversations';
import { utils } from '../utils';
import { QUESTS } from '../enums/quests';
import { ACTIVITIES } from '../enums/activities';
import { RESEARCHES } from '../enums/researches';
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;
import { EQUIPMENT_TYPES } from '../enums/equipment_types';
const ETY = EQUIPMENT_TYPES;
import { TRADING_PARTNERS } from '../enums/trading_partners';
import { BUILDING_TYPES } from '../enums/building_types';
import { CONVERSATIONS } from '../enums/conversations';
import { SVGS } from '../enums/svgs';

const testingId = utils.randHex(16);
const quests: { [id: string] : Quest } = {
  [QUESTS.SURVIVE]: new Quest({
    id: QUESTS.SURVIVE,
    name: QUESTS.SURVIVE,
    givenBy: 'Firefly',
    icon: new Icon({provider: 'svg', name: SVGS.DROP, color: '#28aae1',
      shadow: '#2887c3', secondaryColor: '#aaebf0'}),
    description: `A quiet voice inside you begs you to survive.`,
    finishText: `What's this? There's a box you hadn't noticed in front of your Study, and it smells strangely beautiful, like something you can't quite remember. Inside is a single piece of Jade.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.SURVIVE,
        label: `You need water: repair the Broken Cistern.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_UPGRADE,
          value: BUILDING_TYPES.BROKEN_CISTERN } }),
      new QuestTask({ index: 1, parentId: QUESTS.SURVIVE,
        label: `You need food: restore the Fallow Field.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_UPGRADE,
          value: BUILDING_TYPES.FALLOW_FIELD } }),
      new QuestTask({ index: 2, parentId: QUESTS.SURVIVE,
        label: `You need shelter: rebuild the Decaying Study.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_UPGRADE,
          value: BUILDING_TYPES.DECAYING_STUDY } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.JADE, value: 1000 }],
    questsBegin: [QUESTS.STUDY]
  }),
  [QUESTS.STUDY]: new Quest({
    id: QUESTS.STUDY,
    name: QUESTS.STUDY,
    givenBy: 'Firefly',
    icon: new Icon({ provider: 'svg', name: SVGS.STUDY }),
    description: `You feel like someone wants you to examine the world. Check the "Research" tab.`,
    finishText: `Studying each new resource you find keeps the Knowledge flowing, and something tells you there may be even more benefits you haven't yet discovered.

You're not sure if it's related to your actions, but someone has put a set of rudimentary building materials in the scented box in front of your Study.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.STUDY,
        label: `Complete the "Study" research.`,
        actionToPerform: { kind: ACTIVITIES.RESEARCH, value: RESEARCHES.STUDY } }),
      new QuestTask({ index: 1, parentId: QUESTS.STUDY,
        label: `Study five different resources (destroying one of each in the process).`,
        actionToPerform: { kind: RESEARCHES.STUDY, quantity: 5 } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.SAND_YELLOW, value: 200 },
      { specificity: RSP.EXACT, type: RTY.CLAY_MUDDY, value: 200 },
      { specificity: RSP.EXACT, type: RTY.REEDS, value: 200 }],
    questsBegin: [QUESTS.ANALYZE, QUESTS.BUILD, QUESTS.TRADE]
  }),
  [QUESTS.ANALYZE]: new Quest({
    id: QUESTS.ANALYZE,
    name: QUESTS.ANALYZE,
    givenBy: 'Firefly',
    icon: new Icon({ provider: 'svg', name: SVGS.KNOWLEDGE }),
    description: `You feel like someone wants you to examine the world even further.`,
    finishText: `Analyzing gives less Knowledge than studying, but its the only source if you have nothing new to study.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.STUDY,
        label: `Complete the "Analysis" research.`,
        actionToPerform: { kind: ACTIVITIES.RESEARCH, value: RESEARCHES.ANALYSIS } }),
      new QuestTask({ index: 1, parentId: QUESTS.STUDY,
        label: `Analyze 100 Water.`,
        resourceToAnalyze: { specificity: RSP.EXACT, type: RTY.WATER, quantity: 100 } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.KNOWLEDGE, value: 400 }]
  }),
  [QUESTS.BUILD]: new Quest({
    id: QUESTS.BUILD,
    name: QUESTS.BUILD,
    givenBy: 'Firefly',
    icon: new Icon({ provider: 'svg', name: SVGS.HUTS }),
    description: `You feel like someone wants you to try your hand at construction. After researching a bit of Biology or Physics, look for the "Build" button in the "Buildings" tab.`,
    finishText: `You can build anytime you're not already building or upgrading something. And getting your hands dirty is surprisingly satisfying.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.BUILD,
        label: `Construct any building.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_CONSTRUCTION } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.WOOD_OAK, value: 2500 }],
    questsBegin: [QUESTS.BUILDING_STORAGE]
  }),
  [QUESTS.TRADE]: new Quest({
    id: QUESTS.TRADE,
    name: QUESTS.TRADE,
    givenBy: 'Firefly',
    icon: new Icon({ provider: 'svg', name: SVGS.MARKET }),
    description: `Some force wants you to do business with a trading partner from across the desert. First you'll need to research Anthropology, research Trading, repair the Market, and look inside the "Trading" tab.`,
    finishText: `There's only so much you can get from your town itself. For everything else, you'll have to trade.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.TRADE,
        label: `Complete a trade with the Foxfire Ascetics.`,
        tradeWith: { typeName: TRADING_PARTNERS.FOXFIRE_ASCETICS, quantity: 1 } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL, value: 400 }]
  }),
  [QUESTS.BUILDING_STORAGE]: new Quest({
    id: QUESTS.BUILDING_STORAGE,
    name: QUESTS.BUILDING_STORAGE,
    givenBy: 'Firefly',
    icon: new Icon({provider: 'svg', name: SVGS.FURNACE}),
    description: `A voice in your mind tells you to put buildings away. We are all descendants of desert nomads, and our buildings can be easily packed away and brought back out. Put one into storage after inspecting it within the "Buildings" tab.`,
    finishText: `The caverns beneath the town are colossal, there's almost no end to the buildings you can store there.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.BUILDING_STORAGE,
        label: `Put a building into storage.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_INTO_STORAGE } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.BRICKS_SANDLIME, value: 1400 }]
  }),
  [QUESTS.BUILDING_UPGRADE]: new Quest({
    id: QUESTS.BUILDING_UPGRADE,
    name: QUESTS.BUILDING_UPGRADE,
    givenBy: 'Firefly',
    icon: new Icon({ provider: 'svg', name: SVGS.COTTAGES }),
    description: `Something seems to whisper that buildings you've made can be improved. You'll need to finish the proper research first, then inspect the building within the "Buildings" tab.`,
    finishText: `Research and learning are key to improvement of all.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.BUILDING_UPGRADE,
        label: `Construct any building.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_CONSTRUCTION } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.RUST_ORE, value: 2800 }]
  }),
  [QUESTS.LEADER_SETUP]: new Quest({
    id: QUESTS.LEADER_SETUP,
    name: QUESTS.LEADER_SETUP,
    givenBy: 'Firefly',
    icon: new Icon({ provider: 'svg', name: SVGS.BREAD }),
    description: `A subtle feeling advises you that you need to take care of your leaders. After inspecting them in the "Leaders" tab, you can give them what they need to get by.`,
    finishText: `Leaders can take care of themselves. But if you want them to contribute to the town, they'll need food, drink, and shelter.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.LEADER_SETUP,
        label: `Give a leader something to eat.`,
        actionToPerform: { kind: ACTIVITIES.LEADER_SET_EATING } }),
      new QuestTask({ index: 1, parentId: QUESTS.LEADER_SETUP,
        label: `Give a leader something to drink.`,
        actionToPerform: { kind: ACTIVITIES.LEADER_SET_DRINKING } }),
      new QuestTask({ index: 2, parentId: QUESTS.LEADER_SETUP,
        label: `Give a leader somewhere to live.`,
        actionToPerform: { kind: ACTIVITIES.LEADER_LIVING_AT } }),
      new QuestTask({ index: 3, parentId: QUESTS.LEADER_SETUP,
        label: `Give a leader something to do.`,
        actionToPerform: { kind: ACTIVITIES.LEADER_WORKING_AT } }),
    ],
    gainResources: [{ specificity: RSP.EXACT, type: (ETY.ROUGH_MATTOCK + ' (Unmarked)'), value: 4000 }],
    questsBegin: [QUESTS.MARK_EQUIPMENT]
  }),
  [QUESTS.MARK_EQUIPMENT]: new Quest({
    id: QUESTS.MARK_EQUIPMENT,
    name: QUESTS.MARK_EQUIPMENT,
    givenBy: 'Firefly',
    icon: new Icon({ provider: 'svg', name: SVGS.SIMPLE_ROBE }),
    description: `A whisper tells you that the generic equipment you make or find needs to be inspected and marked with your town's seal before it can be used.`,
    finishText: `Marked equipment belongs to your town forever; it can be deconstructed back into some of its original materials, but you can't trade it away.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.MARK_EQUIPMENT,
        label: `Mark one piece of equipment.`,
        equipmentToMark: { quantity: 1 } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.PALE_ORE, value: 5250 }],
    conversationBegins: conversations[CONVERSATIONS.FIF_INTRODUCTION]
  }),
  [QUESTS.TESTING]: new Quest({
    id: testingId,
    name: QUESTS.TESTING,
    givenBy: 'Firefly',
    description: `Is Water an inside job??? Or Lentils!?!?`,
    finishText: `Turns out, neither Water nor Lentils are an inside job.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.TESTING,
        label: `Produce 100 Water.`,
        resourceToProduce: { specType: (`${RSP.EXACT}|${RTY.WATER}`), quantity: 100 }}),
      new QuestTask({ index: 1, parentId: QUESTS.TESTING,
        label: `Produce 10 Lentil.`,
        resourceToProduce: { specType: (`${RSP.EXACT}|${RTY.LENTIL}`), quantity: 10 }})
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.JADE, value: 2000 }],
    conversationBegins: conversations[CONVERSATIONS.FIF_INTRODUCTION]
  })
}

export { quests };
