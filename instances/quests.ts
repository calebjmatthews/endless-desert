import Quest from '../models/quest';
import QuestTask from '../models/quest_task';
import Icon from '../models/icon';
import { conversations } from '../instances/conversations';
import { utils } from '../utils';
import { QUESTS } from '../enums/quests';
import { QUEST_TYPES } from '../enums/quest_types';
import { ACTIVITIES } from '../enums/activities';
import { RESEARCHES } from '../enums/researches';
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
const RCA = RESOURCE_CATEGORIES;
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
const RSC = RESOURCE_SUBCATEGORIES;
import { RESOURCE_TAGS } from '../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;
import { EQUIPMENT_TYPES } from '../enums/equipment_types';
const ETY = EQUIPMENT_TYPES;
import { TRADING_PARTNERS } from '../enums/trading_partners';
import { BUILDING_TYPES } from '../enums/building_types';
import { CONVERSATIONS } from '../enums/conversations';
import { LEADER_TYPES } from '../enums/leader_types';
import { PEOPLE } from '../enums/people';
import { SVGS } from '../enums/svgs';

const testingId = utils.randHex(16);
const quests: { [id: string] : Quest } = {
  [QUESTS.EARLY_DAYS_SURVIVE]: new Quest({
    id: QUESTS.EARLY_DAYS_SURVIVE,
    subtitle: 'Early Days',
    name: 'Survive',
    givenBy: PEOPLE.FIREFLY,
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
    gainResources: [{ specificity: RSP.EXACT, type: RTY.JADE_TOKEN, value: 1000 }],
    questsBegin: [QUESTS.EARLY_DAYS_STUDY]
  }),
  [QUESTS.EARLY_DAYS_STUDY]: new Quest({
    id: QUESTS.EARLY_DAYS_STUDY,
    subtitle: 'Early Days',
    name: 'Study',
    givenBy: PEOPLE.FIREFLY,
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
    givenBy: PEOPLE.FIREFLY,
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.KNOWLEDGE }),
    description: `You feel like someone wants you to examine the world even further.`,
    finishText: `Analyzing gives less Knowledge than studying, but its the only source if you have nothing new to study.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.EARLY_DAYS_ANALYZE,
        label: `Complete the "Analysis" research.`,
        actionToPerform: { kind: ACTIVITIES.RESEARCH, value: RESEARCHES.ANALYSIS,
          includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.EARLY_DAYS_ANALYZE,
        label: `Analyze 100 Water.`,
        resourceToAnalyze: { specificity: RSP.EXACT, type: RTY.WATER, quantity: 100 } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.KNOWLEDGE, value: 400 }]
  }),
  [QUESTS.EARLY_DAYS_BUILD]: new Quest({
    id: QUESTS.EARLY_DAYS_BUILD,
    subtitle: 'Early Days',
    name: 'Build',
    givenBy: PEOPLE.FIREFLY,
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
    givenBy: PEOPLE.FIREFLY,
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
    givenBy: PEOPLE.FIREFLY,
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
    givenBy: PEOPLE.FIREFLY,
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
    givenBy: PEOPLE.FIREFLY,
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
    gainResources: [{ specificity: RSP.EXACT, type: (ETY.ROUGH_MATTOCK + ' (U)'), value: 6200 }],
    questsBegin: [QUESTS.EARLY_DAYS_MARK_EQUIPMENT]
  }),
  [QUESTS.EARLY_DAYS_MARK_EQUIPMENT]: new Quest({
    id: QUESTS.EARLY_DAYS_MARK_EQUIPMENT,
    subtitle: 'Early Days',
    name: 'Mark Equipment',
    givenBy: PEOPLE.FIREFLY,
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.SIMPLE_ROBE }),
    description: `A whisper tells you that the generic equipment you make or find needs to be inspected and marked with your town's seal before it can be used.`,
    finishText: `Marked equipment belongs to your town forever; it can be deconstructed back into some of its original materials, but you can't trade it away.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.EARLY_DAYS_MARK_EQUIPMENT,
        label: `Mark one piece of equipment.`,
        equipmentToMark: { quantity: 1 } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.CARPET_CURLING_GREEN_MOTIF, value: 20000 }]
  }),
  [QUESTS.EARLY_DAYS_DISPLAY_TREASURE]: new Quest({
    id: QUESTS.EARLY_DAYS_DISPLAY_TREASURE,
    subtitle: 'Early Days',
    name: 'Display Treasure',
    givenBy: PEOPLE.FIREFLY,
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.CARPET }),
    description: `Somehow, you know your treasures won't have any effect unless you display them on your town Gate for all to see.`,
    finishText: `Only one of each treasure can be displayed, and they can be removed at any time.
    
You find something strange in the perfumed box this time... And someone even stranger.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.EARLY_DAYS_DISPLAY_TREASURE,
        label: `Display a treasure on the town's Gate.`,
        actionToPerform: { kind: ACTIVITIES.DISPLAY_TREASURE } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.GLOAMING_LIGHT, value: 10000 }],
    conversationBegins: conversations[CONVERSATIONS.FIF_INTRODUCTION]
  }),
  [QUESTS.ASTRONOMY_POTENT_FUEL]: new Quest({
    id: QUESTS.ASTRONOMY_POTENT_FUEL,
    subtitle: 'Astronomy',
    name: 'Potent Fuel',
    givenBy: LEADER_TYPES.SAMANNOUD,
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.FURNACE }),
    description: `The first step in a long journey to rescue Dani: decent fuel`,
    finishText: `This should be enough Charcoal to begin smelting metal.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.ASTRONOMY_POTENT_FUEL,
        label: `Complete the "Chemistry" research.`,
        actionToPerform: { kind: ACTIVITIES.RESEARCH, value: RESEARCHES.CHEMISTRY,
          includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.ASTRONOMY_POTENT_FUEL,
        label: `Complete the "Combustion" research.`,
        actionToPerform: { kind: ACTIVITIES.RESEARCH, value: RESEARCHES.COMBUSTION,
          includeExisting: true } }),
      new QuestTask({ index: 2, parentId: QUESTS.ASTRONOMY_POTENT_FUEL,
        label: `Construct a Furnace.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_CONSTRUCTION,
          value: BUILDING_TYPES.FURNACE } }),
      new QuestTask({ index: 3, parentId: QUESTS.ASTRONOMY_POTENT_FUEL,
        label: `Produce 100 Charcoal.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.CHARCOAL}`, quantity: 100,
          includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.RUST_ORE, value: 4000 }],
    conversationBegins: conversations[CONVERSATIONS.SND_THE_GRINDING_MILL]
  }),
  [QUESTS.ASTRONOMY_THE_GRINDING_MILL]: new Quest({
    id: QUESTS.ASTRONOMY_THE_GRINDING_MILL,
    subtitle: 'Astronomy',
    name: 'The Grinding Mill',
    givenBy: LEADER_TYPES.SAMANNOUD,
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.GRINDING_MILL }),
    description: `Grinding Mills turn metal ore into powder`,
    finishText: `Now we're ready to start making metal in quantity.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.ASTRONOMY_THE_GRINDING_MILL,
        label: `Complete the "Grinding" research.`,
        actionToPerform: { kind: ACTIVITIES.RESEARCH, value: RESEARCHES.GRINDING,
          includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.ASTRONOMY_THE_GRINDING_MILL,
        label: `Produce 10 Crude Iron.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.CRUDE_IRON}`, quantity: 10,
          includeExisting: true } }),
      new QuestTask({ index: 2, parentId: QUESTS.ASTRONOMY_THE_GRINDING_MILL,
        label: `Construct a Grinding Mill.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_CONSTRUCTION,
          value: BUILDING_TYPES.GRINDING_MILL } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.GREENISH_ORE, value: 24000 }],
    conversationBegins: conversations[CONVERSATIONS.SND_IMPLEMENTS_FOR_EXPLORATION]
  }),
  [QUESTS.ASTRONOMY_IMPLEMENTS_FOR_EXPLORATION]: new Quest({
    id: QUESTS.ASTRONOMY_IMPLEMENTS_FOR_EXPLORATION,
    subtitle: 'Astronomy',
    name: 'Implements for Exploration',
    givenBy: LEADER_TYPES.SAMANNOUD,
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.ATELIER }),
    description: `The desert is a rough place, and exploring it properly will require an array of supplies: rope, torches, cutting blades, and the like.`,
    finishText: `You're getting closer and closer to the true beginning of your search.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.ASTRONOMY_IMPLEMENTS_FOR_EXPLORATION,
        label: `Complete the "Implement Assembly" research.`,
        actionToPerform: { kind: ACTIVITIES.RESEARCH,
          value: RESEARCHES.IMPLEMENT_ASSEMBLY, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.ASTRONOMY_THE_GRINDING_MILL,
        label: `Construct an Atelier.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_CONSTRUCTION,
          value: BUILDING_TYPES.ATELIER } }),
      new QuestTask({ index: 2, parentId: QUESTS.ASTRONOMY_IMPLEMENTS_FOR_EXPLORATION,
        label: `Produce 100 Iron Edges.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.IRON_EDGE}`, quantity: 100,
          includeExisting: true } }),
      new QuestTask({ index: 3, parentId: QUESTS.ASTRONOMY_IMPLEMENTS_FOR_EXPLORATION,
        label: `Produce 100 Torches.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.TORCH}`, quantity: 100,
          includeExisting: true } }),
      new QuestTask({ index: 4, parentId: QUESTS.ASTRONOMY_IMPLEMENTS_FOR_EXPLORATION,
        label: `Produce 100 Rough Rope.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.ROUGH_ROPE}`, quantity: 100,
          includeExisting: true } }),
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.NOTES_HEAT, value: 10000 }],
    conversationBegins: conversations[CONVERSATIONS.SND_REPAIRING_THE_DOME]
  }),
  [QUESTS.ASTRONOMY_REPAIRING_THE_DOME]: new Quest({
    id: QUESTS.ASTRONOMY_REPAIRING_THE_DOME,
    subtitle: 'Astronomy',
    name: 'Implements for Exploration',
    givenBy: LEADER_TYPES.SAMANNOUD,
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({ provider: 'svg', name: SVGS.ATELIER }),
    description: `The Shattered Dome was once an observatory, and with work it could be one again.`,
    finishText: `With this, your expedition parties can find their way across the lonely sands.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.ASTRONOMY_REPAIRING_THE_DOME,
        label: `Complete the "Glass Shaping" research.`,
        actionToPerform: { kind: ACTIVITIES.RESEARCH,
          value: RESEARCHES.GLASS_SHAPING, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.ASTRONOMY_REPAIRING_THE_DOME,
        label: `Produce 100 Lenses.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.LENS}`, quantity: 100,
          includeExisting: true } }),
      new QuestTask({ index: 2, parentId: QUESTS.ASTRONOMY_REPAIRING_THE_DOME,
        label: `Complete the "Ventilated Combustion" research.`,
        actionToPerform: { kind: ACTIVITIES.RESEARCH,
          value: RESEARCHES.COMBUSTION_VENTILATED, includeExisting: true } }),
      new QuestTask({ index: 3, parentId: QUESTS.ASTRONOMY_REPAIRING_THE_DOME,
        label: `Produce 200 Steel.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.STEEL}`, quantity: 200,
          includeExisting: true } }),
      new QuestTask({ index: 4, parentId: QUESTS.ASTRONOMY_REPAIRING_THE_DOME,
        label: `Repair the Shattered Dome.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_UPGRADE,
          value: BUILDING_TYPES.SHATTERED_DOME } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.NOTES_STAR, value: 10000 }],
    conversationBegins: conversations[CONVERSATIONS.SND_BEASTS_OF_BURDEN]
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
    finishText: `You have the metals, fuel, and a strange gleaming sphere left to you by The Firefly. Looking at it too long makes you feel like you're falling into the sky. Could this disconcerting sensation be what Guangzhou meant by "otherworldly"?`,
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
    gainResources: [{ specificity: RSP.EXACT, type: RTY.BROKEN_RED_KEY, value: 10000 }]
  }),
  [QUESTS.OPPORTUNITY_A_STRANDED_STRANGER]: new Quest({
    id: QUESTS.OPPORTUNITY_A_STRANDED_STRANGER,
    subtitle: 'Opportunity',
    name: 'A Stranded Stranger',
    givenBy: LEADER_TYPES.SAMANNOUD,
    type: QUEST_TYPES.OBLIGATORY,
    icon: new Icon({provider: 'svg', name: SVGS.DESERT_SUNSET}),
    description: `Samannoud has noticed smoke from a tiny campfire coming from the dangerous lands to the west, and needs provisions before journeying there.`,
    finishText: `After giving you a nod, Samannoud heads toward the wisp of rising smoke. Now, to wait.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.OPPORTUNITY_A_STRANDED_STRANGER,
        label: `Collect 600 Water.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.CLAY_MUDDY}`,
          quantity: 600, consumed: true, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.OPPORTUNITY_A_STRANDED_STRANGER,
        label: `Cook 600 travel-ready dishes (these use Salt).`,
        resourceToProduce: { specType: `${RSP.TAG}|${RTA.PROVISION}`,
          quantity: 600, consumed: true, includeExisting: true } })
    ]
  }),
  [QUESTS.NATIONS_A_SANDSTONE_THROUGHWAY]: new Quest({
    id: QUESTS.NATIONS_A_SANDSTONE_THROUGHWAY,
    subtitle: 'Nations',
    name: 'A Sandstone Throughway',
    givenBy: '',
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.SANDSTONE_EDIFICERS, color: '#895723',
      backgroundColor: '#ffc856'}),
    description: `An Archetect (1st Class) of the Sandstone Edificers has requested information and building supplies.`,
    finishText: `Asyut of the Sandstone Edificers has heard word of your progress, and wants to talk to you.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.NATIONS_A_SANDSTONE_THROUGHWAY,
        label: `Construct any building.`,
        actionToPerform: { kind: ACTIVITIES.BUILDING_CONSTRUCTION } }),
      new QuestTask({ index: 1, parentId: QUESTS.NATIONS_A_SANDSTONE_THROUGHWAY,
        label: `Collect 2000 Muddy Clay.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.CLAY_MUDDY}`,
          quantity: 2000, consumed: true, includeExisting: true } }),
      new QuestTask({ index: 2, parentId: QUESTS.NATIONS_A_SANDSTONE_THROUGHWAY,
        label: `Collect 2000 Yellow Sand.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.SAND_YELLOW}`,
          quantity: 2000, consumed: true, includeExisting: true } })
    ],
    // conversationBegins: conversations[],
    tradingPartnerJoins: TRADING_PARTNERS.SANDSTONE_EDIFICERS
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
  [QUESTS.NATIONS_TOURMALINE_JEWELERS]: new Quest({
    id: QUESTS.NATIONS_TOURMALINE_JEWELERS,
    subtitle: 'Nations',
    name: 'Tourmaline Jewelers',
    givenBy: '',
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.TOURMALINE_JEWELERS, color: '#c6baff',
      backgroundColor: '#4416ce'}),
    description: `A rather entitled trader is demanding you furnish materials to repair her "fourth-finest riding dress."`,
    finishText: `And here the materials are, in neat little stacks.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.NATIONS_TOURMALINE_JEWELERS,
        label: `Complete the "Glass Shaping" research.`,
        actionToPerform: { kind: ACTIVITIES.RESEARCH, value: RESEARCHES.GLASS_SHAPING,
          includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.NATIONS_TOURMALINE_JEWELERS,
        label: `Produce 200 Beads.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.BEADS}`,
          quantity: 200, consumed: true, includeExisting: true } }),
      new QuestTask({ index: 2, parentId: QUESTS.NATIONS_TOURMALINE_JEWELERS,
        label: `Complete the "Weaving" research.`,
        actionToPerform: { kind: ACTIVITIES.RESEARCH, value: RESEARCHES.WEAVING,
          includeExisting: true } }),
      new QuestTask({ index: 3, parentId: QUESTS.NATIONS_TOURMALINE_JEWELERS,
        label: `Produce 100 Linen.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.LINEN}`,
          quantity: 100, consumed: true, includeExisting: true } }),
      new QuestTask({ index: 4, parentId: QUESTS.NATIONS_TOURMALINE_JEWELERS,
        label: `Trade for 50 Jade.`,
        resourceToGain: { specificity: RSP.EXACT, type: RTY.JADE_TOKEN,
          quantity: 50, consumed: true, includeExisting: true } }),
    ],
    tradingPartnerJoins: TRADING_PARTNERS.TOURMALINE_JEWELERS,
    conversationBegins: conversations[CONVERSATIONS.ETC_BEADS_AND_BOLTS_OF_CLOTH]
  }),
  [QUESTS.DROMEDARIES_RATIONS]: new Quest({
    id: QUESTS.DROMEDARIES_RATIONS,
    subtitle: 'Dromedaries',
    name: 'Rations, Wrapped and Labeled',
    givenBy: PEOPLE.DROMEDARIAN,
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.SALTFISH}),
    description: `The Dromedarian has requested "Rations, Wrapped and Labeled" in exchange for ten noble beasts of burden`,
    finishText: `After sending off the supplies a small herd of Plains Dromedaries arrives more quickly than you would have expected. The desert is yours!`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.DROMEDARIES_RATIONS,
        label: `Requested: 2000 Provisions.`,
        resourceToProduce: { specType: `${RSP.TAG}|${RTA.PROVISION}`,
          quantity: 2000, consumed: true, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.DROMEDARIES_RATIONS,
        label: `Requested: 400 Papyrus`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.PAPYRUS}`,
          quantity: 400, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.DROMEDARY_PLAINS,
      value: 200000 }]
  }),
  [QUESTS.DROMEDARIES_BEER]: new Quest({
    id: QUESTS.DROMEDARIES_BEER,
    subtitle: 'Dromedaries',
    name: 'Beer, Sealed in Jars',
    givenBy: PEOPLE.DROMEDARIAN,
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.BEER}),
    description: `The Dromedarian has requested "Beer, Sealed in Jars" in exchange for ten noble beasts of burden`,
    finishText: `After sending off the supplies a small herd of Plains Dromedaries arrives more quickly than you would have expected. The desert is yours!`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.DROMEDARIES_BEER,
        label: `Requested: 1800 Beer.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.BEER}`,
          quantity: 1800, consumed: true, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.DROMEDARIES_BEER,
        label: `Requested: 300 Earthenware`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.TERRACOTTA}`,
          quantity: 300, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.DROMEDARY_PLAINS,
      value: 200000 }]
  }),
  [QUESTS.DROMEDARIES_WINE]: new Quest({
    id: QUESTS.DROMEDARIES_WINE,
    subtitle: 'Dromedaries',
    name: 'Wine, Decanted and Bottled',
    givenBy: PEOPLE.DROMEDARIAN,
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.WINE}),
    description: `The Dromedarian has requested "Wine, Decanted and Bottled" in exchange for ten noble beasts of burden`,
    finishText: `After sending off the supplies a small herd of Plains Dromedaries arrives more quickly than you would have expected. The desert is yours!`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.DROMEDARIES_WINE,
        label: `Requested: 200 Wine.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.WINE}`,
          quantity: 200, consumed: true, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.DROMEDARIES_WINE,
        label: `Requested: 20 Glassware`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.GLASSWARE}`,
          quantity: 20, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.DROMEDARY_PLAINS,
      value: 200000 }]
  }),
  [QUESTS.DROMEDARIES_LINEN]: new Quest({
    id: QUESTS.DROMEDARIES_LINEN,
    subtitle: 'Dromedaries',
    name: 'Linen, Rolled into Bolts',
    givenBy: PEOPLE.DROMEDARIAN,
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.LINEN}),
    description: `The Dromedarian has requested "Linen, Rolled into Bolts" in exchange for ten noble beasts of burden`,
    finishText: `After sending off the supplies a small herd of Plains Dromedaries arrives more quickly than you would have expected. The desert is yours!`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.DROMEDARIES_LINEN,
        label: `Requested: 120 Linen.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.LINEN}`,
          quantity: 120, consumed: true, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.DROMEDARIES_LINEN,
        label: `Requested: 20 Crude Needles`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.CRUDE_NEEDLE}`,
          quantity: 20, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.DROMEDARY_PLAINS,
      value: 200000 }]
  }),
  [QUESTS.DROMEDARIES_OLIVE_OIL]: new Quest({
    id: QUESTS.DROMEDARIES_OLIVE_OIL,
    subtitle: 'Dromedaries',
    name: 'Oilve Oil, Cleanly Pressed',
    givenBy: PEOPLE.DROMEDARIAN,
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.OLIVE_OIL}),
    description: `The Dromedarian has requested "Oilve Oil, Cleanly Pressed" in exchange for ten noble beasts of burden`,
    finishText: `After sending off the supplies a small herd of Plains Dromedaries arrives more quickly than you would have expected. The desert is yours!`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.DROMEDARIES_OLIVE_OIL,
        label: `Requested: 2200 Olive Oil.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.OLIVE_OIL}`,
          quantity: 2200, consumed: true, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.DROMEDARIES_OLIVE_OIL,
        label: `Requested: 200 Ashware`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.ASHWARE}`,
          quantity: 200, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.DROMEDARY_PLAINS,
      value: 200000 }]
  }),
  [QUESTS.DROMEDARIES_INK]: new Quest({
    id: QUESTS.DROMEDARIES_INK,
    subtitle: 'Dromedaries',
    name: 'Ink, for Use as Kohl',
    givenBy: PEOPLE.DROMEDARIAN,
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.DROP, color: '#333',
      shadow: '#111', secondaryColor: '#a2a2a2'}),
    description: `The Dromedarian has requested "Ink, for Use as Kohl" in exchange for ten noble beasts of burden`,
    finishText: `After sending off the supplies a small herd of Plains Dromedaries arrives more quickly than you would have expected. The desert is yours!`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.DROMEDARIES_INK,
        label: `Requested: 340 Ferrous Ink.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.INK_FERROUS}`,
          quantity: 340, consumed: true, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.DROMEDARIES_INK,
        label: `Requested: 34 Faience`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.FAIENCE}`,
          quantity: 34, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.DROMEDARY_PLAINS,
      value: 200000 }]
  }),
  [QUESTS.DROMEDARIES_GEARWORK]: new Quest({
    id: QUESTS.DROMEDARIES_GEARWORK,
    subtitle: 'Dromedaries',
    name: 'Gearwork, with Annotations',
    givenBy: PEOPLE.DROMEDARIAN,
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.DROP, color: '#333',
      shadow: '#111', secondaryColor: '#a2a2a2'}),
    description: `The Dromedarian has requested "Gearwork, with Annotations" in exchange for ten noble beasts of burden`,
    finishText: `After sending off the supplies a small herd of Plains Dromedaries arrives more quickly than you would have expected. The desert is yours!`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.DROMEDARIES_GEARWORK,
        label: `Requested: 40 Gearwork.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.GEARWORK}`,
          quantity: 40, consumed: true, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.DROMEDARIES_GEARWORK,
        label: `Requested: Field Notes`,
        resourceToProduce: { specType: `${RSP.CATEGORY}|${RCA.FIELD_NOTES}`,
          quantity: 1, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.DROMEDARY_PLAINS,
      value: 200000 }]
  }),
  [QUESTS.DROMEDARIES_LENSES]: new Quest({
    id: QUESTS.DROMEDARIES_LENSES,
    subtitle: 'Dromedaries',
    name: 'Lenses, for Nighttime Use',
    givenBy: PEOPLE.DROMEDARIAN,
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.LENS}),
    description: `The Dromedarian has requested "Lenses, for Nighttime Use" in exchange for ten noble beasts of burden`,
    finishText: `After sending off the supplies a small herd of Plains Dromedaries arrives more quickly than you would have expected. The desert is yours!`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.DROMEDARIES_LENSES,
        label: `Requested: 300 Lenses.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.GEARWORK}`,
          quantity: 300, consumed: true, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.DROMEDARIES_LENSES,
        label: `Requested: 15 Torches`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.TORCH}`,
          quantity: 15, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.DROMEDARY_PLAINS,
      value: 200000 }]
  }),
  [QUESTS.DROMEDARIES_GLASS]: new Quest({
    id: QUESTS.DROMEDARIES_GLASS,
    subtitle: 'Dromedaries',
    name: 'Crystal Glass, Ready to Grind',
    givenBy: PEOPLE.DROMEDARIAN,
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.GLASS_FLOAT}),
    description: `The Dromedarian has requested "Crystal Glass, Ready to Grind" in exchange for ten noble beasts of burden`,
    finishText: `After sending off the supplies a small herd of Plains Dromedaries arrives more quickly than you would have expected. The desert is yours!`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.DROMEDARIES_GLASS,
        label: `Requested: 200 Float Glass.`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.LENS}`,
          quantity: 200, consumed: true, includeExisting: true } }),
      new QuestTask({ index: 1, parentId: QUESTS.DROMEDARIES_GLASS,
        label: `Requested: 200 Abrasive`,
        resourceToProduce: { specType: `${RSP.EXACT}|${RTY.ABRASIVE}`,
          quantity: 200, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: RTY.DROMEDARY_PLAINS,
      value: 200000 }]
  }),
  [QUESTS.SIMPLE_TOOLS_POT_OF_SEALANT_PITCH]: new Quest({
    id: QUESTS.SIMPLE_TOOLS_POT_OF_SEALANT_PITCH,
    subtitle: 'Simple Tools',
    name: EQUIPMENT_TYPES.POT_OF_SEALANT_PITCH,
    givenBy: LEADER_TYPES.SCARRED_NAVIGATOR,
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.POT_OF_SEALANT_PITCH}),
    description: `${LEADER_TYPES.SCARRED_NAVIGATOR} has promised you a tool for maintaining the Cistern in exchange for one hundred bundles of Wood.`,
    finishText: `${LEADER_TYPES.SCARRED_NAVIGATOR} hands over the ${EQUIPMENT_TYPES.POT_OF_SEALANT_PITCH} with a grin.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.SIMPLE_TOOLS_POT_OF_SEALANT_PITCH,
        label: `Deliver 100 bundles of Wood.`,
        resourceToProduce: { specType: `${RSP.SUBCATEGORY}|${RSC.WOOD}`,
          quantity: 100, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: EQUIPMENT_TYPES.POT_OF_SEALANT_PITCH, value: 12800 }]
  }),
  [QUESTS.SIMPLE_TOOLS_REED_MUCK_RAKE]: new Quest({
    id: QUESTS.SIMPLE_TOOLS_REED_MUCK_RAKE,
    subtitle: 'Simple Tools',
    name: EQUIPMENT_TYPES.REED_MUCK_RAKE,
    givenBy: LEADER_TYPES.SCARRED_NAVIGATOR,
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.REED_MUCK_RAKE}),
    description: `${LEADER_TYPES.SCARRED_NAVIGATOR} has promised you a tool to care for Reeds in exchange for one hundred bundles of Wood.`,
    finishText: `${LEADER_TYPES.SCARRED_NAVIGATOR} hands over the ${EQUIPMENT_TYPES.REED_MUCK_RAKE} with a grin.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.SIMPLE_TOOLS_REED_MUCK_RAKE,
        label: `Deliver 100 bundles of Wood.`,
        resourceToProduce: { specType: `${RSP.SUBCATEGORY}|${RSC.WOOD}`,
          quantity: 100, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: `${EQUIPMENT_TYPES.REED_MUCK_RAKE} (U)`, value: 12800 }]
  }),
  [QUESTS.SIMPLE_TOOLS_CLAY_SPADE_BROAD]: new Quest({
    id: QUESTS.SIMPLE_TOOLS_CLAY_SPADE_BROAD,
    subtitle: 'Simple Tools',
    name: EQUIPMENT_TYPES.CLAY_SPADE_BROAD,
    givenBy: LEADER_TYPES.SCARRED_NAVIGATOR,
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.CLAY_SPADE_BROAD}),
    description: `${LEADER_TYPES.SCARRED_NAVIGATOR} has promised you a tool for shoveling Clay in exchange for one hundred bundles of Wood.`,
    finishText: `${LEADER_TYPES.SCARRED_NAVIGATOR} hands over the ${EQUIPMENT_TYPES.CLAY_SPADE_BROAD} with a grin.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.SIMPLE_TOOLS_CLAY_SPADE_BROAD,
        label: `Deliver 100 bundles of Wood.`,
        resourceToProduce: { specType: `${RSP.SUBCATEGORY}|${RSC.WOOD}`,
          quantity: 100, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: `${EQUIPMENT_TYPES.CLAY_SPADE_BROAD} (U)`, value: 12000 }]
  }),
  [QUESTS.SIMPLE_TOOLS_CHAR_BELLOWS_FERVENT]: new Quest({
    id: QUESTS.SIMPLE_TOOLS_CHAR_BELLOWS_FERVENT,
    subtitle: 'Simple Tools',
    name: EQUIPMENT_TYPES.CHAR_BELLOWS_FERVENT,
    givenBy: LEADER_TYPES.SCARRED_NAVIGATOR,
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.CHAR_BELLOWS, color: '#d83e20',
    shadow: '#c1321f', secondaryColor: '#f4e3c3', secondaryShadow: '#efc59e'}),
    description: `${LEADER_TYPES.SCARRED_NAVIGATOR} has promised you a tool for creating Charcoal quickly in exchange for two hundred bundles of Wood.`,
    finishText: `${LEADER_TYPES.SCARRED_NAVIGATOR} hands over the ${EQUIPMENT_TYPES.CHAR_BELLOWS_FERVENT} with a grin.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.SIMPLE_TOOLS_CHAR_BELLOWS_FERVENT,
        label: `Deliver 200 bundles of Wood.`,
        resourceToProduce: { specType: `${RSP.SUBCATEGORY}|${RSC.WOOD}`,
          quantity: 200, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: `${EQUIPMENT_TYPES.CHAR_BELLOWS_FERVENT} (U)`, value: 13000 }]
  }),
  [QUESTS.SIMPLE_TOOLS_CHAR_BELLOWS_TEMPERATE]: new Quest({
    id: QUESTS.SIMPLE_TOOLS_CHAR_BELLOWS_TEMPERATE,
    subtitle: 'Simple Tools',
    name: EQUIPMENT_TYPES.CHAR_BELLOWS_TEMPERATE,
    givenBy: LEADER_TYPES.SCARRED_NAVIGATOR,
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.CHAR_BELLOWS, color: '#d83e20',
    shadow: '#c1321f', secondaryColor: '#f4e3c3', secondaryShadow: '#efc59e'}),
    description: `${LEADER_TYPES.SCARRED_NAVIGATOR} has promised you a tool for creating high quality Charcoal in exchange for two hundred bundles of Wood.`,
    finishText: `${LEADER_TYPES.SCARRED_NAVIGATOR} hands over the ${EQUIPMENT_TYPES.CHAR_BELLOWS_TEMPERATE} with a grin.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.SIMPLE_TOOLS_CHAR_BELLOWS_TEMPERATE,
        label: `Deliver 200 bundles of Wood.`,
        resourceToProduce: { specType: `${RSP.SUBCATEGORY}|${RSC.WOOD}`,
          quantity: 200, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: `${EQUIPMENT_TYPES.CHAR_BELLOWS_TEMPERATE} (U)`, value: 12600 }]
  }),
  [QUESTS.SIMPLE_TOOLS_OLIVE_GRAFTING_SHEARS]: new Quest({
    id: QUESTS.SIMPLE_TOOLS_OLIVE_GRAFTING_SHEARS,
    subtitle: 'Simple Tools',
    name: EQUIPMENT_TYPES.OLIVE_GRAFTING_SHEARS,
    givenBy: LEADER_TYPES.SCARRED_NAVIGATOR,
    type: QUEST_TYPES.CONVENTIONAL,
    icon: new Icon({provider: 'svg', name: SVGS.OLIVE_GRAFTING_SHEARS}),
    description: `${LEADER_TYPES.SCARRED_NAVIGATOR} has promised you a tool for creating high quality Charcoal in exchange for two hundred bundles of Wood.`,
    finishText: `${LEADER_TYPES.SCARRED_NAVIGATOR} hands over the ${EQUIPMENT_TYPES.OLIVE_GRAFTING_SHEARS} with a grin.`,
    tasks: [
      new QuestTask({ index: 0, parentId: QUESTS.SIMPLE_TOOLS_OLIVE_GRAFTING_SHEARS,
        label: `Deliver 200 bundles of Wood.`,
        resourceToProduce: { specType: `${RSP.SUBCATEGORY}|${RSC.WOOD}`,
          quantity: 200, consumed: true, includeExisting: true } })
    ],
    gainResources: [{ specificity: RSP.EXACT, type: `${EQUIPMENT_TYPES.OLIVE_GRAFTING_SHEARS} (U)`, value: 12000 }]
  }),
  [QUESTS.TESTING]: new Quest({
    id: testingId,
    name: QUESTS.TESTING,
    givenBy: PEOPLE.FIREFLY,
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
    gainResources: [{ specificity: RSP.EXACT, type: RTY.JADE_TOKEN, value: 2000 }],
    conversationBegins: conversations[CONVERSATIONS.FIF_INTRODUCTION]
  }),
}

export { quests };
