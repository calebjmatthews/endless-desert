import Research from '../models/research';
import Icon from '../models/icon';
import { RESEARCHES } from '../enums/researches';
import { BUILDING_TYPES } from '../enums/building_types';
import { TABS } from '../enums/tabs';

let researches: { [name: string] : Research } = {};
researches[RESEARCHES.SCHOLARSHIP] = new Research({
  name: RESEARCHES.SCHOLARSHIP,
  unlocks: 'Researching this opens up new areas of study.',
  description: ('In order to learn, something of value must be lost. '
    + 'And at the beginning your options are few. Just one, if fact. '
    + 'Still, you have to start somewhere!'),
  icon: new Icon({provider: 'FontAwesome5', name: 'graduation-cap', color: '#2b2b2d'}),
  category: RESEARCHES.SCHOLARSHIP,
  isCategory: true,
  difficulty: 0,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: null,
  knowledgeReq: 0
});

researches[RESEARCHES.STUDY] = new Research({
  name: RESEARCHES.STUDY,
  unlocks: ('Study new resources to increase your knowledge.'),
  description: ('Studying how to study. '
    + 'It feels a little dizzying, and a little uplifting.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'magnify', color: '#2b2b2d'}),
  category: RESEARCHES.SCHOLARSHIP,
  isCategory: false,
  difficulty: 0,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.SCHOLARSHIP],
  knowledgeReq: 0,
  actionCategory: TABS.RESEARCH
});

researches[RESEARCHES.ANALYSIS] = new Research({
  name: RESEARCHES.ANALYSIS,
  unlocks: ('Destroy batches of resources to increase your knowledge.'),
  description: ('Even after the easy discoveries have been made, there\'s an '
    + 'almost unlimited amount you can learn with large numbers of samples '
    + 'an a lack of concern about keeping them intact.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'magnify-close', color: '#2b2b2d'}),
  category: RESEARCHES.SCHOLARSHIP,
  isCategory: false,
  difficulty: 0,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.STUDY],
  knowledgeReq: 0,
  actionCategory: TABS.RESEARCH
});

researches[RESEARCHES.CONJECTURE] = new Research({
  name: RESEARCHES.CONJECTURE,
  unlocks: ('See one more option when researching.'),
  description: ('As you\'ve grown more experienced you increasingly see '
    + 'more than one answer to the questions you\'re asking.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'cloud-question', color: '#000'}),
  category: RESEARCHES.SCHOLARSHIP,
  isCategory: false,
  difficulty: 0,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.STUDY],
  knowledgeReq: 4000
});

researches[RESEARCHES.FIELD_NOTES] = new Research({
  name: RESEARCHES.FIELD_NOTES,
  unlocks: ('Create field notes, used to complete more complex researches.'),
  description: ('Until now, your research and observations have only lived inside your '
    + 'own head. Parchment and ink will allow you to record the phenomena '
    + 'you see as they\'re occurring.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'clipboard-list', color: '#000'}),
  category: RESEARCHES.SCHOLARSHIP,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: [RESEARCHES.ANALYSIS],
  knowledgeReq: 1000,
  actionCategory: TABS.RESEARCH
});

researches[RESEARCHES.BIOLOGY] = new Research({
  name: RESEARCHES.BIOLOGY,
  unlocks: ('Opens up new areas of study about life and cultivation.'),
  description: ('If your settlement is going to support a serious number of people '
    + 'you\'ll have to learn about crops. Better get started.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'seedling', color: '#59a500'}),
  category: RESEARCHES.BIOLOGY,
  isCategory: true,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.SCHOLARSHIP],
  knowledgeReq: 0
});

researches[RESEARCHES.LENTIL_FARMING] = new Research({
  name: RESEARCHES.LENTIL_FARMING,
  unlocks: ('Unlocks lentil fields.'),
  description: ('Lentils are the perfect crop for your early settlement. '
    + 'Easy to grow, easy to prepare. The taste is admittedly uninspiring.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'seedling', color: '#59a500'}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.BIOLOGY],
  knowledgeReq: 0,
  unlocksBuilding: [BUILDING_TYPES.LENTIL_FIELD]
});

researches[RESEARCHES.LENTIL_FARMING_HEARTY] = new Research({
  name: RESEARCHES.LENTIL_FARMING_HEARTY,
  unlocks: ('Allows an upgrade to Lentil Fields.'),
  description: ('Some minor adaptations to your fields allow lentils to grow '
    + 'faster, and with even less water. The taste is unchanged.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'seedling', color: '#59a500'}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.LENTIL_FARMING],
  knowledgeReq: 400,
  unlocksUpgrade: [BUILDING_TYPES.LENTIL_FIELD_HEARTY]
});

researches[RESEARCHES.REED_CULTIVATION] = new Research({
  name: RESEARCHES.REED_CULTIVATION,
  unlocks: ('Unlocks Reed Deltas.'),
  description: ('Reeds grow in river mud, and are incredibly useful. '
    + 'They can be a fuel source, thatch for roofs, raw material for rough fabric, '
    + 'pulp for papyrus, and probably other things you haven\'t even heard of.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'reorder-vertical', color: '#59a500'}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: [RESEARCHES.BIOLOGY],
  knowledgeReq: 35,
  unlocksBuilding: [BUILDING_TYPES.REED_DELTA]
});

researches[RESEARCHES.GRAIN_FARMING] = new Research({
  name: RESEARCHES.GRAIN_FARMING,
  unlocks: ('Unlocks Grain Fields.'),
  description: ('Grain is more difficult to grow than lentils, and takes grinding '
    + 'before it can be eaten. But it is useful both as flour and animal feed.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'corn', color: '#d8be04'}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.BIOLOGY],
  knowledgeReq: 100,
  unlocksBuilding: [BUILDING_TYPES.GRAIN_FIELD]
});

researches[RESEARCHES.GRAIN_FARMING_SIMPLIFIED] = new Research({
  name: RESEARCHES.GRAIN_FARMING_SIMPLIFIED,
  unlocks: ('Allows Grain Fields to be run without a leader.'),
  description: ('You\'ve perfected the tools and learned the tricks, with some '
    + 'quick instructions a total novice can grow perfect grain.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'corn', color: '#d8be04'}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.GRAIN_FARMING, RESEARCHES.FIELD_NOTES],
  knowledgeReq: 2000,
  unlocksUpgrade: [BUILDING_TYPES.GRAIN_FIELD_SIMPLIFIED]
});

researches[RESEARCHES.OLIVE_FARMING] = new Research({
  name: RESEARCHES.OLIVE_FARMING,
  unlocks: ('Unlocks Olive Groves.'),
  description: ('You\'ve come across a variety of olive trees that love the '
    + 'sun and the dry heat. And they can be pressed into an oil that\'s absolutely '
    + 'delicious.'),
  icon: new Icon({provider: 'FontAwesome', name: 'pagelines', color: '#97c701'}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.GRAIN_FARMING],
  knowledgeReq: 200,
  unlocksBuilding: [BUILDING_TYPES.OLIVE_GROVE]
});

researches[RESEARCHES.OLIVE_FARMING_SIMPLIFIED] = new Research({
  name: RESEARCHES.OLIVE_FARMING_SIMPLIFIED,
  unlocks: ('Allows Olive Groves to be run without a leader.'),
  description: ('It was mostly a matter of figuring out grafting and training the '
    + 'saplings, but you\'ve put together an olive grove that requires almost no '
    + 'supervision.'),
  icon: new Icon({provider: 'FontAwesome', name: 'pagelines', color: '#97c701'}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.OLIVE_FARMING, RESEARCHES.FIELD_NOTES],
  knowledgeReq: 4000,
  unlocksUpgrade: [BUILDING_TYPES.OLIVE_GROVE_SIMPLIFIED]
});

researches[RESEARCHES.QUAIL_HUSBANDRY] = new Research({
  name: RESEARCHES.QUAIL_HUSBANDRY,
  unlocks: ('Unlocks Quail Pastures.'),
  description: ('These quail hide in dark places during the day\'s heat and the '
    + 'night\'s cold, but they\'re amusingly active in the dawn and dusk. '
    + 'Plus, they only need a small amount of grain as feed.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'kiwi-bird', color: '#caa096'}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.BIOLOGY],
  knowledgeReq: 200,
  unlocksBuilding: [BUILDING_TYPES.QUAIL_PASTURE]
});

researches[RESEARCHES.QUAIL_HUSBANDRY_SIMPLIFIED] = new Research({
  name: RESEARCHES.QUAIL_HUSBANDRY_SIMPLIFIED,
  unlocks: ('Allows Quail Pastures to be run without a leader.'),
  description: ('Quail take to pacifying quite well, and with some training '
    + 'they can be almost left to themselves.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'kiwi-bird', color: '#caa096'}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.QUAIL_HUSBANDRY, RESEARCHES.FIELD_NOTES],
  knowledgeReq: 4000,
  unlocksUpgrade: [BUILDING_TYPES.QUAIL_PASTURE_SIMPLIFIED]
});

researches[RESEARCHES.OX_HUSBANDRY] = new Research({
  name: RESEARCHES.OX_HUSBANDRY,
  unlocks: ('Unlocks Ox Pastures.'),
  description: ('River oxen are big, noisy beasts. Useful though: depending on '
    + 'method used they can give either milk or meat and hides.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'cow', color: '#4a0e0e'}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.FIELD_NOTES],
  knowledgeReq: 2000,
  unlocksBuilding: [BUILDING_TYPES.OX_PASTURE]
});

researches[RESEARCHES.HERB_FARMING] = new Research({
  name: RESEARCHES.HERB_FARMING,
  unlocks: ('Unlocks Herb Gardens.'),
  description: ('Herbs grow slowly relative to other plants. However, they are '
    + 'valuable for trade, and a small amount can spice up an entire dish.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'leaf', color: '#ec5107'}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.FIELD_NOTES],
  knowledgeReq: 10000,
  unlocksBuilding: [BUILDING_TYPES.SPICE_FIELD]
});

researches[RESEARCHES.ANTHROPOLOGY] = new Research({
  name: RESEARCHES.ANTHROPOLOGY,
  unlocks: ('Opens up new areas of study about art and communication.'),
  description: ('Hundreds of different cultures make their own ways through the vast '
    + 'emptiness of the desert. And they\'ve each learned different ways to thrive.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'users', color: '#000'}),
  category: RESEARCHES.ANTHROPOLOGY,
  isCategory: true,
  difficulty: 1,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: [RESEARCHES.SCHOLARSHIP],
  knowledgeReq: 20,
});

researches[RESEARCHES.TRADING] = new Research({
  name: RESEARCHES.TRADING,
  unlocks: ('Allows trading with peoples from across the desert.'),
  description: ('Being able to trade your resources for those you can\'t make '
    + 'would open up an enormous amount of opportunity.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'exchange-alt', color: '#000'}),
  category: RESEARCHES.ANTHROPOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.ANTHROPOLOGY],
  knowledgeReq: 20,
  unlocksTab: TABS.TRADING
});

researches[RESEARCHES.BASIC_EDUCATION] = new Research({
  name: RESEARCHES.BASIC_EDUCATION,
  unlocks: ('Researching this has uncertain benefits.'),
  description: ('You\'ve always been better informed than most people around you; '
    + 'that\'s just a fact. How much good could you do if you spread that knowledge '
    + 'to the wider world?'),
  icon: new Icon({provider: 'FontAwesome5', name: 'book-reader', color: '#000'}),
  category: RESEARCHES.ANTHROPOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.ANTHROPOLOGY],
  knowledgeReq: 200
});

researches[RESEARCHES.PHYSICS] = new Research({
  name: RESEARCHES.PHYSICS,
  unlocks: ('Opens up new areas of study about mechanical processes.'),
  description: ('Altered materials, new tools, grand architecture, it all feels '
    + 'tantalizingly close.'),
  icon: new Icon({provider: 'FontAwesome', name: 'balance-scale', color: '#000'}),
  category: RESEARCHES.PHYSICS,
  isCategory: true,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.SCHOLARSHIP],
  knowledgeReq: 50,
});

researches[RESEARCHES.CLAY_EXCAVATION] = new Research({
  name: RESEARCHES.CLAY_EXCAVATION,
  unlocks: ('Unlocks Clay Pits.'),
  description: ('The soil in desert is a dry, cracking clay. But careful application '
    + 'of water produces a building material for everything from bricks to '
    + 'ornamental figurines.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'splotch', color: '#a91f1f'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.PHYSICS],
  knowledgeReq: 100,
  unlocksBuilding: [BUILDING_TYPES.CLAY_PIT]
});

researches[RESEARCHES.CLAY_EXCAVATION_QUALITY] = new Research({
  name: RESEARCHES.CLAY_EXCAVATION_QUALITY,
  unlocks: ('Allows an upgrade to Clay Pits.'),
  description: ('Application of wooden scaffolding and additional water could '
    + 'produce clay of superior quality. The kind that could make beautiful '
    + 'pottery, rather than bricks.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'splotch', color: '#a91f1f'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.CLAY_EXCAVATION, RESEARCHES.FIELD_NOTES],
  knowledgeReq: 1000,
  unlocksUpgrade: [BUILDING_TYPES.CLAY_PIT_QUALITY]
});

researches[RESEARCHES.SAND_EXCAVATION] = new Research({
  name: RESEARCHES.SAND_EXCAVATION,
  unlocks: ('Unlocks Sand Pits.'),
  description: ('You suspect the key to harvesting sand is keeping the pit '
    + 'from collapsing on your workers, and you\'re working on sturdy clay walls '
    + 'that should do the trick.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'mountain', color: '#f9df00'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.PHYSICS],
  knowledgeReq: 180,
  unlocksBuilding: [BUILDING_TYPES.SAND_PIT]
});

researches[RESEARCHES.SAND_EXCAVATION_RAPID] = new Research({
  name: RESEARCHES.SAND_EXCAVATION_RAPID,
  unlocks: ('Allows an upgrade to Sand Pits.'),
  description: ('Clay walls do most of the work, holding the sides of the pit '
    + 'together. But reinforcement with thatch as you go will allow your workers '
    + 'to dig much faster.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'mountain', color: '#f9df00'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.SAND_EXCAVATION, RESEARCHES.FIELD_NOTES],
  knowledgeReq: 1800,
  unlocksUpgrade: [BUILDING_TYPES.SAND_PIT_RAPID]
});

researches[RESEARCHES.HOME_CONSTRUCTION] = new Research({
  name: RESEARCHES.HOME_CONSTRUCTION,
  unlocks: ('Unlocks Huts.'),
  description: ('Right now you have enough housing for you and one band of people. '
    + 'Adding more simple huts won\'t be too difficult a task.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'store-alt', color: '#795548'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.PHYSICS],
  knowledgeReq: 200,
  unlocksBuilding: [BUILDING_TYPES.HUTS]
});

researches[RESEARCHES.HOME_CONSTRUCTION_IMRPOVED] = new Research({
  name: RESEARCHES.HOME_CONSTRUCTION_IMRPOVED,
  unlocks: ('Unlocks Houses.'),
  description: ('Now that you have the capabity to produce some basic comforts, '
    + 'you can do better than the huts you\'ve delt with until now. Much better.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'home', color: '#795548'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.HOME_CONSTRUCTION, RESEARCHES.FIELD_NOTES],
  knowledgeReq: 6000,
  unlocksBuilding: [BUILDING_TYPES.HOUSES]
});

researches[RESEARCHES.COMPACTION] = new Research({
  name: RESEARCHES.COMPACTION,
  unlocks: ('Unlocks Presses.'),
  description: ('Reeds are useful as they are, but you\'ve been eager for one '
    + 'resource above all others: something to write on. You don\'t exactly '
    + 'know how to make papyrus, but it surely most begin with a thorough '
    + 'flattening.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'inbox-multiple', color: '#795548'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.PHYSICS],
  knowledgeReq: 250,
  unlocksBuilding: [BUILDING_TYPES.PRESS]
});

researches[RESEARCHES.COMPACTION_SIMPLIFIED] = new Research({
  name: RESEARCHES.COMPACTION_SIMPLIFIED,
  unlocks: ('Allows Presses to be run without a leader.'),
  description: ('With a set of stabilizing and safety structures, a '
    + 'Press can be run without any specialized skills.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'inbox-multiple', color: '#795548'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.COMPACTION, RESEARCHES.FIELD_NOTES],
  knowledgeReq: 2500,
  unlocksUpgrade: [BUILDING_TYPES.PRESS_SIMPLIFIED]
});

researches[RESEARCHES.GRINDING] = new Research({
  name: RESEARCHES.GRINDING,
  unlocks: ('Unlocks Grinding Mills.'),
  description: ('You\'ve heard of structures that catch the wind to spin giant '
    + 'metal grinding wheels against each other. The idea is simple enough, but '
    + 'getting the mechanism right will be tricky.'),
  icon: new Icon({provider: 'FontAwesome', name: 'gears', color: '#705ea7'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.PHYSICS],
  knowledgeReq: 450,
  unlocksBuilding: [BUILDING_TYPES.GRINDING_MILL]
});

researches[RESEARCHES.GRINDING_SIMPLIFIED] = new Research({
  name: RESEARCHES.GRINDING_SIMPLIFIED,
  unlocks: ('Allows Grinding Mills to be run without a leader.'),
  description: ('Reinforcing the grinding wheels will make them far more reliable, '
    + 'and they should no longer need the constant small repairs that make them '
    + 'difficult to run.'),
  icon: new Icon({provider: 'FontAwesome', name: 'gears', color: '#705ea7'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.GRINDING, RESEARCHES.FIELD_NOTES],
  knowledgeReq: 4500,
  unlocksUpgrade: [BUILDING_TYPES.GRINDING_MILL_SIMPLIFIED]
});

researches[RESEARCHES.WEAVING] = new Research({
  name: RESEARCHES.WEAVING,
  unlocks: ('Unlocks Weaverys.'),
  description: ('Cloth making is slow and time-consuming, but most people can be '
    + 'taught without too much of a learning curve. And there\'s a coarse linen '
    + 'cloth that could theoretically be made from something as simple as reeds.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'ship-wheel', color: '#9c27b0'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.FIELD_NOTES],
  knowledgeReq: 2500,
  unlocksBuilding: [BUILDING_TYPES.WEAVERY]
});

researches[RESEARCHES.TAILORING] = new Research({
  name: RESEARCHES.TAILORING,
  unlocks: ('Unlocks Tailors.'),
  description: ('Clothing made in other towns is shockingly expensive. '
    + 'Now that you can produce cloth, you can start work shaping it into '
    + 'clothing more suited to your specific needs.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'tshirt', color: '#afc1ec'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.WEAVING],
  knowledgeReq: 6500,
  unlocksBuilding: [BUILDING_TYPES.TAILORS]
});

researches[RESEARCHES.OUTFITTING] = new Research({
  name: RESEARCHES.OUTFITTING,
  unlocks: ('Unlocks Outfitters.'),
  description: ('In the desert, your survival is tied to how much you can carry '
    + 'on your back, and how well you can bear it.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'toolbox', color: '#1a457b'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 4,
  beginsCompleted: false,
  prereq: [RESEARCHES.WEAVING],
  knowledgeReq: 6500,
  unlocksBuilding: [BUILDING_TYPES.OUTFITTERS]
});

researches[RESEARCHES.TOOL_FABRICATION] = new Research({
  name: RESEARCHES.TOOL_FABRICATION,
  unlocks: ('Unlocks Fabricatory.'),
  description: ('Your study of metals has brought you tantalizingly close to '
    + 'a variety of tools that would transform every part of the life that you\'ve '
    + 'carved out of this harsh land.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'toolbox', color: '#1a457b'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 4,
  beginsCompleted: false,
  prereq: [RESEARCHES.COMBUSTION, RESEARCHES.FIELD_NOTES],
  knowledgeReq: 8000,
  unlocksBuilding: [BUILDING_TYPES.FABRICATORY]
});

researches[RESEARCHES.CHEMISTRY] = new Research({
  name: RESEARCHES.CHEMISTRY,
  unlocks: ('Opens up new areas of study about non-physical changes.'),
  description: ('You\'ve stumbled across a disclipline you call Chemistry. '
    + 'It involves a lot of careful separation of liquids and salts, and the results '
    + 'so far aren\'t too impressive. Still, compared with the flashier "Alchemy", '
    + 'it seems to actually work.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'flask', color: '#97c701'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: true,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.BIOLOGY, RESEARCHES.PHYSICS],
  knowledgeReq: 80,
});

researches[RESEARCHES.DEHYDRATION] = new Research({
  name: RESEARCHES.DEHYDRATION,
  unlocks: ('Unlocks Drying Yards.'),
  description: ('You\'ve surmised that many materials are stronger or easier to '
    + 'work with when dry. And there\'s a special salt that\'s left once your '
    + 'cistern\'s water has evaporated you think could help in the process...'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'waves', color: '#ff0000'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.CHEMISTRY],
  knowledgeReq: 180,
  unlocksBuilding: [BUILDING_TYPES.DRYING_YARD]
});

///
researches[RESEARCHES.DEHYDRATION_SIMPLIFIED] = new Research({
  name: RESEARCHES.DEHYDRATION_SIMPLIFIED,
  unlocks: ('Allows Drying Yards to be run without a leader.'),
  description: ('You\'ve put together simple diagrams showing where each material '
    + 'needs to be placed, and which shouldn\'t touch.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'waves', color: '#ff0000'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.DEHYDRATION, RESEARCHES.FIELD_NOTES],
  knowledgeReq: 1800,
  unlocksUpgrade: [BUILDING_TYPES.DRYING_YARD_SIMPLIFIED]
});

researches[RESEARCHES.COMBUSTION] = new Research({
  name: RESEARCHES.COMBUSTION,
  unlocks: ('Unlocks Furnaces.'),
  description: ('You\'ll need more than fire. You\'ll need useful fire. '
    + 'But if you can get the temperature and air flow high enough, you could start '
    + 'turning sand into glass! Gods know there\'s enough sand around.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'fireplace', color: '#b02727'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.CHEMISTRY],
  knowledgeReq: 320,
  unlocksBuilding: [BUILDING_TYPES.FURNACE]
});

researches[RESEARCHES.COMBUSTION_SIMPLIFIED] = new Research({
  name: RESEARCHES.COMBUSTION_SIMPLIFIED,
  unlocks: ('Allows Furnaces to be run without a leader.'),
  description: ('Stoking the furnace to the proper temperature used to be an art. '
    + 'But the furnace you\'ve made is now unrecognizable, covered in vents '
    + 'and pulleys.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'fireplace', color: '#b02727'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.COMBUSTION, RESEARCHES.FIELD_NOTES],
  knowledgeReq: 3200,
  unlocksUpgrade: [BUILDING_TYPES.FURNACE_SIMPLIFIED]
});

researches[RESEARCHES.COMBUSTION_VENTILATED] = new Research({
  name: RESEARCHES.COMBUSTION_VENTILATED,
  unlocks: ('Allows Furnaces to be run without a leader.'),
  description: ('There are some metals that require greater heat to form than your '
    + 'furnace can manage: much, much greater. You\'ll need more powerful fuel, '
    + 'more of it, and continuous fresh air spiraling in.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'fireplace', color: '#b02727'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 4,
  beginsCompleted: false,
  prereq: [RESEARCHES.COMBUSTION_SIMPLIFIED],
  knowledgeReq: 6400,
  unlocksUpgrade: [BUILDING_TYPES.FURNACE_BLAST]
});

researches[RESEARCHES.COOKING] = new Research({
  name: RESEARCHES.COOKING,
  unlocks: ('Unlocks Kitchens.'),
  description: ('Eating raw lentils gets old fast. Real, enjoyable food will be '
    + 'a crucial part of making your settlement a livable place.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'silverware-fork-knife', color: '#000'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 4,
  beginsCompleted: false,
  prereq: [RESEARCHES.COMBUSTION],
  knowledgeReq: 320,
  unlocksBuilding: [BUILDING_TYPES.KITCHEN]
});

researches[RESEARCHES.COOKING_BOUNTIFUL] = new Research({
  name: RESEARCHES.COOKING_BOUNTIFUL,
  unlocks: ('Allows an upgrade to Kitchens.'),
  description: ('Some say that cooking is an art, but that\'s debatable. If it '
    + 'were truly art, would you be able to make it this efficient?'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'silverware-fork-knife', color: '#000'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 4,
  beginsCompleted: false,
  prereq: [RESEARCHES.COOKING, RESEARCHES.FIELD_NOTES],
  knowledgeReq: 3200,
  unlocksUpgrade: [BUILDING_TYPES.KITCHEN_BOUNTIFUL]
});

researches[RESEARCHES.GLASS_SHAPING] = new Research({
  name: RESEARCHES.GLASS_SHAPING,
  unlocks: ('Unlocks Glassworks.'),
  description: ('Glass can be blown, ground, or shaped into many more forms '
    + ' than the flat panes made in a furnace.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'window-restore', color: '#33cee2'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.FIELD_NOTES],
  knowledgeReq: 5000,
  unlocksBuilding: [BUILDING_TYPES.GLASSWORKS]
});

researches[RESEARCHES.SOLVENTS] = new Research({
  name: RESEARCHES.SOLVENTS,
  unlocks: ('Unlocks Laboratories.'),
  description: ('There are powers and properties that are hidden in substances, and '
    + 'to control them you\'ll have to dissolve them.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'flask', color: '#33cee2'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 4,
  beginsCompleted: false,
  prereq: [RESEARCHES.GLASS_SHAPING],
  knowledgeReq: 9000,
  unlocksBuilding: [BUILDING_TYPES.LABORATORY]
});

researches[RESEARCHES.POTTERY] = new Research({
  name: RESEARCHES.POTTERY,
  unlocks: ('Unlocks Pottery Kiln.'),
  description: ('Simple terracotta isn\'t far removed from the clay bricks baked '
    + 'under the sun. But far more is possible: fine (and valuable) ceramics made '
    + 'from rare clays and glazes.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'glass-whiskey', color: '#942c14'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.FIELD_NOTES],
  knowledgeReq: 7000,
  unlocksBuilding: [BUILDING_TYPES.POTTERY_KILN]
});

researches[RESEARCHES.FERMENTATION] = new Research({
  name: RESEARCHES.FERMENTATION,
  unlocks: ('Unlocks Brewery.'),
  description: ('Now here\'s something your people have been clamoring for: '
    + 'something more interesting (and entertaining) to drink at the end '
    + 'of a hard day\'s work.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'glass-whiskey', color: '#e8cf1e'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 4,
  beginsCompleted: false,
  prereq: [RESEARCHES.FIELD_NOTES],
  knowledgeReq: 8000,
  unlocksBuilding: [BUILDING_TYPES.BREWERY]
});

export { researches }
