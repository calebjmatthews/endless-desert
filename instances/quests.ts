import Quest from '../models/quest';
import QuestTask from '../models/quest_task';
import QuestProgress from '../models/quest_progress';
import Icon from '../models/icon';
import { conversations } from '../instances/conversations';
import { utils } from '../utils';
import { QUESTS } from '../enums/quests';
import { QUEST_TYPES } from '../enums/quest_types';
import { ACTIVITIES } from '../enums/activities';
import { RESEARCHES } from '../enums/researches';
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
const RSC = RESOURCE_SUBCATEGORIES;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;
import { EQUIPMENT_TYPES } from '../enums/equipment_types';
const ETY = EQUIPMENT_TYPES;
import { TRADING_PARTNERS } from '../enums/trading_partners';
import { BUILDING_TYPES } from '../enums/building_types';
import { CONVERSATIONS } from '../enums/conversations';
import { LEADER_TYPES } from '../enums/leader_types';
import { SVGS } from '../enums/svgs';

const testingId = utils.randHex(16);
const quests: { [id: string] : Quest } = {
  [QUESTS.EARLY_DAYS_SURVIVE]: new Quest({
    id: QUESTS.EARLY_DAYS_SURVIVE,
    subtitle: 'Early Days',
    name: 'Survive',
    givenBy: 'Firefly',
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({provider: 'svg', name: SVGS.DROP, color: '#28aae1',
      shadow: '#2887c3', secondaryColor: '#aaebf0'}),
    description: `A quiet voice inside you begs you to survive.`,
    finishText: `What's this? There's a box you hadn't noticed in front of your Study, and it smells strangely beautiful, like something you can't quite remember. Inside is a single piece of Jade.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.EARLY_DAYS_SURVIVE,
        label: `You need water: repair the Broken Cistern.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_UPGRADE,
          value: BUILDING_TYPES.BROKEN_CISTERN } }),
      new QuestTask({ index: 1, parentId: QUESTS.EARLY_DAYS_SURVIVE,
        label: `You need food: restore the Fallow Field.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_UPGRADE,
          value: BUILDING_TYPES.FALLOW_FIELD } }),
      new QuestTask({ index: 2, parentId: QUESTS.EARLY_DAYS_SURVIVE,
        label: `You need shelter: rebuild the Decaying Study.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_UPGRADE,
          value: BUILDING_TYPES.DECAYING_STUDY } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.JADE, value: 1000 }],
    questsBegin: [QUESTS.EARLY_DAYS_STUDY]
  }),
  [QUESTS.EARLY_DAYS_STUDY]: new Quest({
    id: QUESTS.EARLY_DAYS_STUDY,
    subtitle: 'Early Days',
    name: 'Study',
    givenBy: 'Firefly',
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.STUDY }),
    description: `You feel like someone wants you to examine the world. Check the "Research" tab.`,
    finishText: `Studying each new resource you find keeps the Knowledge flowing, and something tells you there may be even more benefits you haven't yet discovered.

You're not sure if it's related to your actions, but someone has put a set of rudimentary building materials in the scented box in front of your Study.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.EARLY_DAYS_STUDY,
        label: `Complete the "Study" research.`,
        actionToPerform: { kind: ACTIVITIES.RESEARCH, value: RESEARCHES.STUDY,
          includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.EARLY_DAYS_STUDY,
        label: `Study three different resources (destroying one of each in the process).`,
        actionToPerform: { kind: RESEARCHES.STUDY, quantity: 3 } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.SAND_YELLOW, value: 200 },
      { specificity: RSP.EXACT, type: RTY.CLAY_MUDDY, value: 200 },
      { specificity: RSP.EXACT, type: RTY.REEDS, value: 200 }],
    questsBegin: [QUESTS.EARLY_DAYS_ANALYZE, QUESTS.EARLY_DAYS_BUILD, QUESTS.EARLY_DAYS_TRADE]
  }),
  [QUESTS.EARLY_DAYS_ANALYZE]: new Quest({
    id: QUESTS.EARLY_DAYS_ANALYZE,
    subtitle: 'Early Days',
    name: 'Analyze',
    givenBy: 'Firefly',
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.KNOWLEDGE }),
    description: `You feel like someone wants you to examine the world even further.`,
    finishText: `Analyzing gives less Knowledge than studying, but its the only source if you have nothing new to study.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.EARLY_DAYS_STUDY,
        label: `Complete the "Analysis" research.`,
        actionToPerform: { kind: ACTIVITIES.RESEARCH, value: RESEARCHES.ANALYSIS,
          includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.EARLY_DAYS_STUDY,
        label: `Analyze 100 Water.`,
        resourceToAnalyze: { specificity: RSP.EXACT, type: RTY.WATER, quantity: 100 } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.KNOWLEDGE, value: 400 }]
  }),
  [QUESTS.EARLY_DAYS_BUILD]: new Quest({
    id: QUESTS.EARLY_DAYS_BUILD,
    subtitle: 'Early Days',
    name: 'Build',
    givenBy: 'Firefly',
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.HUTS }),
    description: `You feel like someone wants you to try your hand at construction. After researching a bit of Biology or Physics, look for the "Build" button in the "Buildings" tab.`,
    finishText: `You can build anytime you're not already building or upgrading something. And getting your hands dirty is surprisingly satisfying.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.EARLY_DAYS_BUILD,
        label: `Construct any building.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_CONSTRUCTION } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.WOOD_OAK, value: 2500 }],
    questsBegin: [QUESTS.EARLY_DAYS_BUILDING_STORAGE]
  }),
  [QUESTS.EARLY_DAYS_TRADE]: new Quest({
    id: QUESTS.EARLY_DAYS_TRADE,
    subtitle: 'Early Days',
    name: 'Trade',
    givenBy: 'Firefly',
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.MARKET }),
    description: `Some force wants you to do business with a trading partner from across the desert. First you'll need to research Anthropology, research Trading, repair the Market, and look inside the "Trading" tab.`,
    finishText: `There's only so much you can get from your town itself. For everything else, you'll have to trade.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.EARLY_DAYS_TRADE,
        label: `Complete a trade with the Foxfire Ascetics.`,
        tradeWith: { typeName: TRADING_PARTNERS.FOXFIRE_ASCETICS, quantity: 1 } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL, value: 400 }]
  }),
  [QUESTS.EARLY_DAYS_BUILDING_STORAGE]: new Quest({
    id: QUESTS.EARLY_DAYS_BUILDING_STORAGE,
    subtitle: 'Early Days',
    name: 'Building Storage',
    givenBy: 'Firefly',
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({provider: 'svg', name: SVGS.FURNACE}),
    description: `A voice in your mind tells you to put buildings away. We are all descendants of desert nomads, and our buildings can be easily packed away and brought back out. Put one into storage after inspecting it within the "Buildings" tab.`,
    finishText: `The caverns beneath the town are colossal, there's almost no end to the buildings you can store there.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.EARLY_DAYS_BUILDING_STORAGE,
        label: `Put a building into storage.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_INTO_STORAGE } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.RUST_ORE, value: 1400 }]
  }),
  [QUESTS.EARLY_DAYS_BUILDING_UPGRADE]: new Quest({
    id: QUESTS.EARLY_DAYS_BUILDING_UPGRADE,
    subtitle: 'Early Days',
    name: 'Building Upgrade',
    givenBy: 'Firefly',
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.COTTAGES }),
    description: `Something seems to whisper that buildings you've made can be improved. You'll need to finish the proper research first, then inspect the building within the "Buildings" tab.`,
    finishText: `Research and learning are key to improvement of all.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.EARLY_DAYS_BUILDING_UPGRADE,
        label: `Construct any building.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_CONSTRUCTION } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.RUST_ORE, value: 2800 }]
  }),
  [QUESTS.EARLY_DAYS_LEADER_SETUP]: new Quest({
    id: QUESTS.EARLY_DAYS_LEADER_SETUP,
    subtitle: 'Early Days',
    name: 'Leader Setup',
    givenBy: 'Firefly',
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.BREAD }),
    description: `A subtle feeling advises you that you need to take care of your leaders. After inspecting them in the "Leaders" tab, you can give them what they need to get by.`,
    finishText: `Leaders can take care of themselves. But if you want them to contribute to the town, they'll need food, drink, and shelter.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.EARLY_DAYS_LEADER_SETUP,
        label: `Give a leader something to eat.`,
        actionToPerform: { kind: ACTIVITIES.LEADER_SET_EATING } }),
      new QuestTask({ index: 1, parentId: QUESTS.EARLY_DAYS_LEADER_SETUP,
        label: `Give a leader something to drink.`,
        actionToPerform: { kind: ACTIVITIES.LEADER_SET_DRINKING } }),
      new QuestTask({ index: 2, parentId: QUESTS.EARLY_DAYS_LEADER_SETUP,
        label: `Give a leader somewhere to live.`,
        actionToPerform: { kind: ACTIVITIES.LEADER_LIVING_AT } }),
      new QuestTask({ index: 3, parentId: QUESTS.EARLY_DAYS_LEADER_SETUP,
        label: `Give a leader something to do.`,
        actionToPerform: { kind: ACTIVITIES.LEADER_WORKING_AT } }),
    ],
    gainResources: [{ specificity: RSP.EXACT, type: (ETY.ROUGH_MATTOCK + ' (Unmarked)'), value: 4000 }],
    questsBegin: [QUESTS.EARLY_DAYS_MARK_EQUIPMENT]
  }),
  [QUESTS.EARLY_DAYS_MARK_EQUIPMENT]: new Quest({
    id: QUESTS.EARLY_DAYS_MARK_EQUIPMENT,
    subtitle: 'Early Days',
    name: 'Mark Equipment',
    givenBy: 'Firefly',
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.SIMPLE_ROBE }),
    description: `A whisper tells you that the generic equipment you make or find needs to be inspected and marked with your town's seal before it can be used.`,
    finishText: `Marked equipment belongs to your town forever; it can be deconstructed back into some of its original materials, but you can't trade it away.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.EARLY_DAYS_MARK_EQUIPMENT,
        label: `Mark one piece of equipment.`,
        equipmentToMark: { quantity: 1 } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.PALE_ORE, value: 5250 }],
    conversationBegins: conversations[CONVERSATIONS.FIF_INTRODUCTION]
  }),
  [QUESTS.MYSTICISM_A_THRICE_LOCKED_TOME]: new Quest({
    id: QUESTS.MYSTICISM_A_THRICE_LOCKED_TOME,
    subtitle: 'Mysticism',
    name: 'A Thrice Locked Tome',
    givenBy: LEADER_TYPES.FOXFIRE_HERETIC,
    type: QUEST_TYPES.PARAMOUNT,
    icon: new Icon({ provider: 'svg', name: SVGS.TOME }),
    description: `To unlock the tome you'll need to find the matching keys and repair them with guidance from Guangzhou.`,
    finishText: `The keys gleam with a red light, and the tome sits in front of you.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.MYSTICISM_A_THRICE_LOCKED_TOME,
        label: `Find the three Broken Red Keys.`,
        resourceToGain: { specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY,
          quantity: 3, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.MYSTICISM_A_THRICE_LOCKED_TOME,
        label: `Repair them into three working Red Keys.`,
        resourceToGain: { specificity: RSP.EXACT, type: RTY.RED_KEY,
          quantity: 3, includeExisting: true } })
    ],
    conversationBegins: conversations[CONVERSATIONS.FFH_OPENING_THE_TOME]
  }),
  [QUESTS.MYSTICISM_A_RUINED_RED_METAL]: new Quest({
    id: QUESTS.MYSTICISM_A_RUINED_RED_METAL,
    subtitle: 'Mysticism',
    name: 'A Ruined Red Metal',
    givenBy: LEADER_TYPES.FOXFIRE_HERETIC,
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({provider: 'svg', name: SVGS.POWDER, color: '#ff7f22',
      shadow: '#d66224', secondaryColor: '#ffa575'}),
    description: `Both the tome and its red clasps are ancient; you'll need to analyze newly forged metals to determine what they're made of.`,
    finishText: `You've analyzed all the metals you could find, time to combine your findings.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.MYSTICISM_A_RUINED_RED_METAL,
        label: `Complete the "Chemistry" research.`,
        actionToPerform: { kind: ACTIVITIES.RESEARCH, value: RESEARCHES.CHEMISTRY,
          includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.MYSTICISM_A_RUINED_RED_METAL,
        label: `Complete the "Combustion" research.`,
        actionToPerform: { kind: ACTIVITIES.RESEARCH, value: RESEARCHES.COMBUSTION,
          includeExisting: true } }),
      new QuestTask({ index: 2, parentId: QUESTS.MYSTICISM_A_RUINED_RED_METAL,
        label: `Analyze a sample of Crude Iron.`,
        resourceToAnalyze: { specificity: RSP.EXACT, type: RTY.CRUDE_IRON,
          quantity: 1} }),
      new QuestTask({ index: 3, parentId: QUESTS.MYSTICISM_A_RUINED_RED_METAL,
        label: `Analyze a sample of Brass.`,
        resourceToAnalyze: { specificity: RSP.EXACT, type: RTY.BRASS,
          quantity: 1} }),
      new QuestTask({ index: 4, parentId: QUESTS.MYSTICISM_A_RUINED_RED_METAL,
        label: `Analyze a sample of Bronze.`,
        resourceToAnalyze: { specificity: RSP.EXACT, type: RTY.BRONZE,
          quantity: 1} }),
    ],
    conversationBegins: conversations[CONVERSATIONS.FFH_A_RUINED_RED_METAL]
  }),
  [QUESTS.MYSTICISM_REPAIRING_THE_FIRST_KEY]: new Quest({
    id: QUESTS.MYSTICISM_REPAIRING_THE_FIRST_KEY,
    subtitle: 'Mysticism',
    name: 'Repairing the First Key',
    givenBy: LEADER_TYPES.FOXFIRE_HERETIC,
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.BROKEN_KEY }),
    description: `You'll need to gather iron, copper, and somehow find a source of "otherworldly light"`,
    finishText: `You have the metals, fuel, and a strange gleaming sphere left to you by The Firefly, and looking at it too long makes you feel like you're falling into the sky. Could this disconcerting sensation be what Guangzhou meant by "otherworldly"?`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.MYSTICISM_REPAIRING_THE_FIRST_KEY,
        label: `Find a Broken Red Key.`,
        resourceToGain: { specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY,
          quantity: 1, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.MYSTICISM_REPAIRING_THE_FIRST_KEY,
        label: `Produce 20 Iron Powder.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.IRON_POWDER}`, quantity: 20,
          includeExisting: true } }),
      new QuestTask({ index: 2, parentId: QUESTS.MYSTICISM_REPAIRING_THE_FIRST_KEY,
        label: `Produce 30 Copper Powder.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.COPPER_POWDER}`,
          quantity: 30, includeExisting: true } }),
      new QuestTask({ index: 3, parentId: QUESTS.MYSTICISM_REPAIRING_THE_FIRST_KEY,
        label: `Produce 70 Charcoal.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.CHARCOAL}`,
          quantity: 70, includeExisting: true } }),
      new QuestTask({ index: 4, parentId: QUESTS.MYSTICISM_REPAIRING_THE_FIRST_KEY,
        label: `Discover a source of "otherworldly light".`,
        resourceToGain: { specificity: RSP.EXACT, type: RTY.GLOAMING_LIGHT,
          quantity: 1, includeExisting: true } })
    ],
    conversationBegins: conversations[CONVERSATIONS.FFH_REPAIRING_THE_FIRST_KEY]
  }),
  [QUESTS.MYSTICISM_REPAIRING_THE_SECOND_KEY]: new Quest({
    id: QUESTS.MYSTICISM_REPAIRING_THE_SECOND_KEY,
    subtitle: 'Mysticism',
    name: 'Repairing the Second Key',
    givenBy: LEADER_TYPES.FOXFIRE_HERETIC,
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.BROKEN_KEY }),
    description: `You'll need to gather iron, copper, and another light from The Firefly.`,
    finishText: `The second of three keys, and the materials to repair it. You're getting close.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.MYSTICISM_REPAIRING_THE_SECOND_KEY,
        label: `Find a Broken Red Key.`,
        resourceToGain: { specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY,
          quantity: 1, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.MYSTICISM_REPAIRING_THE_SECOND_KEY,
        label: `Produce 20 Iron Powder.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.IRON_POWDER}`, quantity: 20,
          includeExisting: true } }),
      new QuestTask({ index: 2, parentId: QUESTS.MYSTICISM_REPAIRING_THE_SECOND_KEY,
        label: `Produce 30 Copper Powder.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.COPPER_POWDER}`,
          quantity: 30, includeExisting: true } }),
      new QuestTask({ index: 3, parentId: QUESTS.MYSTICISM_REPAIRING_THE_SECOND_KEY,
        label: `Produce 70 Charcoal.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.CHARCOAL}`,
          quantity: 70, includeExisting: true } }),
      new QuestTask({ index: 4, parentId: QUESTS.MYSTICISM_REPAIRING_THE_SECOND_KEY,
        label: `Discover a source of "otherworldly light".`,
        resourceToGain: { specificity: RSP.EXACT, type: RTY.GLOAMING_LIGHT,
          quantity: 1, includeExisting: true } })
    ],
    conversationBegins: conversations[CONVERSATIONS.FFH_REPAIRING_THE_SECOND_KEY]
  }),
  [QUESTS.MYSTICISM_REPAIRING_THE_THIRD_KEY]: new Quest({
    id: QUESTS.MYSTICISM_REPAIRING_THE_THIRD_KEY,
    subtitle: 'Mysticism',
    name: 'Repairing the Third Key',
    givenBy: LEADER_TYPES.FOXFIRE_HERETIC,
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.BROKEN_KEY }),
    description: `You'll need to gather iron, copper, and another light from The Firefly.`,
    finishText: `The final key, and the materials to repair it. Opening the tome is at hand!`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.MYSTICISM_REPAIRING_THE_THIRD_KEY,
        label: `Find a Broken Red Key.`,
        resourceToGain: { specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY,
          quantity: 1, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.MYSTICISM_REPAIRING_THE_THIRD_KEY,
        label: `Produce 20 Iron Powder.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.IRON_POWDER}`, quantity: 20,
          includeExisting: true } }),
      new QuestTask({ index: 2, parentId: QUESTS.MYSTICISM_REPAIRING_THE_THIRD_KEY,
        label: `Produce 30 Copper Powder.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.COPPER_POWDER}`,
          quantity: 30, includeExisting: true } }),
      new QuestTask({ index: 3, parentId: QUESTS.MYSTICISM_REPAIRING_THE_THIRD_KEY,
        label: `Produce 70 Charcoal.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.CHARCOAL}`,
          quantity: 70, includeExisting: true } }),
      new QuestTask({ index: 4, parentId: QUESTS.MYSTICISM_REPAIRING_THE_THIRD_KEY,
        label: `Discover a source of "otherworldly light".`,
        resourceToGain: { specificity: RSP.EXACT, type: RTY.GLOAMING_LIGHT,
          quantity: 1, includeExisting: true } })
    ],
    conversationBegins: conversations[CONVERSATIONS.FFH_REPAIRING_THE_THIRD_KEY]
  }),
  [QUESTS.MYSTICISM_A_TERRACED_PLATFORM]: new Quest({
    id: QUESTS.MYSTICISM_A_TERRACED_PLATFORM,
    subtitle: 'Mysticism',
    name: 'A Terraced Platform',
    givenBy: '',
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.BROKEN_KEY }),
    description: `There's a strange structure clinging to the wall of the cavern beneath your town. If you collected enough bricks to build a staircase, you could examine it properly.`,
    finishText: `Your cartload of Mud Bricks is enough to build a perfectly serviceable (if not especially attractive) set of stairs. At the top is the ruins of a desk, in even worse shape than than the one that contained the tome. A drawer contains a mismash of red metal pieces; after some work you confirm that they were once a key. What happened to all the scholars in this town?`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.MYSTICISM_A_TERRACED_PLATFORM,
        label: `Gather 240 Mud Bricks.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.BRICKS_MUD}`,
          quantity: 240, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY, value: 13000 }]
  }),
  [QUESTS.NATIONS_SPRING_AUTUMN_PROOFS]: new Quest({
    id: QUESTS.NATIONS_SPRING_AUTUMN_PROOFS,
    subtitle: 'Nations',
    name: 'Spring-Autumn Proofs',
    givenBy: '',
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.SPRING_AUTUMN_KINGDOM, color: '#fff',
      backgroundColor: '#bf0000'}),
    description: `A Seneschal of the Spring-Autumn Kingdom has requested proof that your town would be a worthwhile trading partner.`,
    finishText: `Another intimidatingly handsome letter dropped off by messager hawk describes your town in glowing terms. You can expect to see a trading party from the Spring-Autumn Kingdom soon!`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.NATIONS_SPRING_AUTUMN_PROOFS,
        label: `Produce 1000 Thatch.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.THATCH}`,
          quantity: 1000, consumed: false, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.NATIONS_SPRING_AUTUMN_PROOFS,
        label: `Produce 800 Glass.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.GLASS}`,
          quantity: 800, consumed: false, includeExisting: true } }),
      new QuestTask({ index: 2, parentId: QUESTS.NATIONS_SPRING_AUTUMN_PROOFS,
        label: `Catch 600 Minnows.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.MINNOW}`,
          quantity: 600, consumed: false, includeExisting: true } }),
      new QuestTask({ index: 3, parentId: QUESTS.NATIONS_SPRING_AUTUMN_PROOFS,
        label: `Produce 100 Olive Oil.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.OLIVE_OIL}`,
          quantity: 100, consumed: false, includeExisting: true } }),
    ],
    tradingPartnerJoins: TRADING_PARTNERS.SPRING_AUTUMN_KINGDOM
  }),
  [QUESTS.TESTING]: new Quest({
    id: testingId,
    name: QUESTS.TESTING,
    givenBy: 'Firefly',
    type: QUEST_TYPES.CONVENTIONAL,
    description: `Is Water an inside job??? Or Lentils!?!?`,
    finishText: `Turns out, neither Water nor Lentils are an inside job.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.TESTING,
        label: `Produce 100 Water.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.WATER}`, quantity: 100 }}),
      new QuestTask({ index: 1, parentId: QUESTS.TESTING,
        label: `Produce 10 Lentil.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.LENTIL}`, quantity: 10 }})
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.JADE, value: 2000 }],
    conversationBegins: conversations[CONVERSATIONS.FIF_INTRODUCTION]
  }),
}

export { quests };
