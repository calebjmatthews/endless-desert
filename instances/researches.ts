import Research from '../models/research';
import Icon from '../models/icon';
import { RESEARCHES } from '../enums/researches';
import { BUILDING_TYPES } from '../enums/building_types';
import { TABS } from '../enums/tabs';
import { SVGS } from '../enums/svgs';

let researches: { [name: string] : Research } = {};
researches[RESEARCHES.SCHOLARSHIP] = new Research({
  name: RESEARCHES.SCHOLARSHIP,
  unlocks: 'Researching this opens up new areas of study.',
  description: ('In order to learn, something of value must be lost. '
    + 'And at the beginning your options are few. Just one, if fact. '
    + 'Still, you have to start somewhere!'),
  icon: new Icon({provider: 'FontAwesome5', name: 'graduation-cap',
    color: '#fff', backgroundColor: '#071f56'}),
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
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'magnify',
    color: '#2b2b2d'}),
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
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'magnify-close',
    color: '#2b2b2d'}),
  category: RESEARCHES.SCHOLARSHIP,
  isCategory: false,
  difficulty: 0,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.STUDY],
  knowledgeReq: 0,
  actionCategory: TABS.RESEARCH
});

researches[RESEARCHES.GATE_EXPANSION] = new Research({
  name: RESEARCHES.GATE_EXPANSION,
  unlocks: ('Increase the maximum number of buildings by three.'),
  description: (`The wall that surrounds the town is small and crumbling. You'll need sand to level the ground outside and clay to build something at all functional.`),
  icon: new Icon({provider: 'svg', name: SVGS.GATE}),
  category: RESEARCHES.SCHOLARSHIP,
  isCategory: false,
  difficulty: 0,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.SCHOLARSHIP, RESEARCHES.BIOLOGY, RESEARCHES.ANTHROPOLOGY,
    RESEARCHES.PHYSICS, RESEARCHES.CHEMISTRY],
  knowledgeReq: 400,
  unlocksUpgrade: [BUILDING_TYPES.GATE_BAKED_CLAY]
});

researches[RESEARCHES.GATE_EXPANSION_BRICKWORK] = new Research({
  name: RESEARCHES.GATE_EXPANSION_BRICKWORK,
  unlocks: ('Increase the maximum number of buildings by five.'),
  description: (`The desert around your town becomes less and less stable the farther away you travel. In order to expand you'll need a more solid material than simple clay.`),
  icon: new Icon({provider: 'svg', name: SVGS.GATE}),
  category: RESEARCHES.SCHOLARSHIP,
  isCategory: false,
  difficulty: 0,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: [RESEARCHES.GATE_EXPANSION, RESEARCHES.TRADING, RESEARCHES.DEHYDRATION],
  knowledgeReq: 1600,
  unlocksUpgrade: [BUILDING_TYPES.GATE_BRICKWORK]
});

researches[RESEARCHES.GATE_EXPANSION_METAL_CLAD] = new Research({
  name: RESEARCHES.GATE_EXPANSION_METAL_CLAD,
  unlocks: ('Increase the maximum number of buildings by five.'),
  description: (`You've been gaining an understanding of metals sturdy enough to expand the wall around your town even further.`),
  icon: new Icon({provider: 'svg', name: SVGS.GATE}),
  category: RESEARCHES.SCHOLARSHIP,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.GATE_EXPANSION_BRICKWORK, RESEARCHES.FIELD_NOTES,
    RESEARCHES.COMBUSTION],
  knowledgeReq: 6400,
  unlocksUpgrade: [BUILDING_TYPES.GATE_METAL_CLAD]
});

researches[RESEARCHES.STUDY_PORTENTOUS] = new Research({
  name: RESEARCHES.STUDY_PORTENTOUS,
  unlocks: `Upgrade the Study for an additional research option.`,
  description: `It's difficult to get anything done in your current tiny Study, with its single writing table already overflowing with books. An upgrade's in order.`,
  icon: new Icon({provider: 'svg', name: SVGS.PORTENTOUS_STUDY}),
  category: RESEARCHES.SCHOLARSHIP,
  isCategory: false,
  difficulty: 0,
  stepsNeeded: 5,
  beginsCompleted: false,
  prereq: [RESEARCHES.STUDY],
  knowledgeReq: 2000,
  unlocksUpgrade: [BUILDING_TYPES.STUDY_PORTENTOUS]
});

researches[RESEARCHES.FIELD_NOTES] = new Research({
  name: RESEARCHES.FIELD_NOTES,
  unlocks: ('Create field notes, used to complete more complex researches.'),
  description: ('Until now, your research and observations have only lived inside your '
    + 'own head. Parchment and ink will allow you to record the phenomena '
    + 'you see as they\'re occurring.'),
  icon: new Icon({provider: 'FontAwesome', name: 'book', color: '#2b2b2d'}),
  category: RESEARCHES.SCHOLARSHIP,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: [RESEARCHES.ANALYSIS],
  knowledgeReq: 1000,
  actionCategory: TABS.RESEARCH
});

researches[RESEARCHES.BRACHYGRAPHY] = new Research({
  name: RESEARCHES.BRACHYGRAPHY,
  unlocks: `Create field notes in half the time`,
  description: `Writing down your observations takes entirely too long. It should be possible to invent a series of shortened symbols that correspond to longer, frequently used words and phrases, which would increase your speed drastically.`,
  icon: new Icon({provider: 'FontAwesome', name: 'align-center', color: '#2b2b2d'}),
  category: RESEARCHES.SCHOLARSHIP,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: [RESEARCHES.FIELD_NOTES],
  knowledgeReq: 10000
});

researches[RESEARCHES.BIOLOGY] = new Research({
  name: RESEARCHES.BIOLOGY,
  unlocks: ('Opens up new areas of study about life and cultivation.'),
  description: ('If your settlement is going to support a serious number of people '
    + 'you\'ll have to learn about crops. Better get started.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'seedling',
    color: '#fff', backgroundColor: '#071f56'}),
  category: RESEARCHES.BIOLOGY,
  isCategory: true,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.SCHOLARSHIP],
  knowledgeReq: 0
});

researches[RESEARCHES.BIOLOGY] = new Research({
  name: RESEARCHES.BIOLOGY,
  unlocks: ('Opens up new areas of study about life and cultivation.'),
  description: ('If your settlement is going to support a serious number of people '
    + 'you\'ll have to learn about crops. Better get started.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'seedling',
    color: '#fff', backgroundColor: '#071f56'}),
  category: RESEARCHES.BIOLOGY,
  isCategory: true,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.SCHOLARSHIP],
  knowledgeReq: 0
});

researches[RESEARCHES.BIOLOGY_ADVANCED] = new Research({
  name: RESEARCHES.BIOLOGY_ADVANCED,
  unlocks: ('Opens up further areas of study about life and cultivation.'),
  description: (`Lentils, reeds, and grain grow easily on riverbanks; improving their cultivation or adding new options will take a more concerted effort.`),
  icon: new Icon({provider: 'FontAwesome5', name: 'seedling',
    color: '#fff', backgroundColor: '#071f56'}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: [RESEARCHES.FIELD_NOTES],
  knowledgeReq: 4000
});

researches[RESEARCHES.REED_CULTIVATION] = new Research({
  name: RESEARCHES.REED_CULTIVATION,
  unlocks: ('Unlocks Reed Deltas.'),
  description: ('Reeds grow in river mud, and are incredibly useful. '
    + 'They can be a fuel source, thatch for roofs, raw material for rough fabric, '
    + 'pulp for papyrus, and probably other things you haven\'t even heard of.'),
  icon: new Icon({provider: 'svg', name: SVGS.REEDS}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: [RESEARCHES.BIOLOGY],
  knowledgeReq: 0,
  unlocksBuilding: [BUILDING_TYPES.REED_DELTA]
});

researches[RESEARCHES.REED_CULTIVATION_CHANNELED] = new Research({
  name: RESEARCHES.REED_CULTIVATION_CHANNELED,
  unlocks: ('Unlocks Channeled Reed Deltas.'),
  description: `You have an idea for an alternate way of growing reeds: with thin, flowing channels between bunches to both use less water and speed growth.`,
  icon: new Icon({provider: 'svg', name: SVGS.REEDS}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.REED_CULTIVATION],
  knowledgeReq: 350,
  unlocksUpgrade: [BUILDING_TYPES.REED_DELTA_CHANNELED]
});

researches[RESEARCHES.LENTIL_FARMING] = new Research({
  name: RESEARCHES.LENTIL_FARMING,
  unlocks: ('Unlocks lentil fields.'),
  description: ('Lentils are the perfect crop for your early settlement. '
    + 'Easy to grow, easy to prepare. The taste is admittedly uninspiring.'),
  icon: new Icon({provider: 'svg', name: SVGS.LENTIL}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.BIOLOGY],
  knowledgeReq: 25,
  unlocksBuilding: [BUILDING_TYPES.LENTIL_FIELD]
});

researches[RESEARCHES.LENTIL_FARMING_HEARTY] = new Research({
  name: RESEARCHES.LENTIL_FARMING_HEARTY,
  unlocks: ('Allows an upgrade to Lentil Fields.'),
  description: ('Some minor adaptations to your fields allow lentils to grow '
    + 'faster, and with even less water. The taste is unchanged.'),
  icon: new Icon({provider: 'svg', name: SVGS.LENTIL}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.LENTIL_FARMING],
  knowledgeReq: 400,
  unlocksUpgrade: [BUILDING_TYPES.LENTIL_FIELD_HEARTY]
});

researches[RESEARCHES.OLIVE_FARMING] = new Research({
  name: RESEARCHES.OLIVE_FARMING,
  unlocks: ('Unlocks Olive Groves.'),
  description: ('You\'ve come across a variety of olive trees that love the '
    + 'sun and the dry heat. And they can be pressed into an oil that\'s absolutely '
    + 'delicious.'),
  icon: new Icon({provider: 'svg', name: SVGS.OLIVE}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.BIOLOGY],
  knowledgeReq: 100,
  unlocksBuilding: [BUILDING_TYPES.OLIVE_GROVE]
});

researches[RESEARCHES.OLIVE_FARMING_FORMALIZED] = new Research({
  name: RESEARCHES.OLIVE_FARMING_FORMALIZED,
  unlocks: ('Allows Olive Groves to be run without a leader.'),
  description: ('It was mostly a matter of figuring out grafting and training the '
    + 'saplings, but you\'ve put together an olive grove that requires almost no '
    + 'supervision.'),
  icon: new Icon({provider: 'svg', name: SVGS.OLIVE}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.OLIVE_FARMING, RESEARCHES.BIOLOGY_ADVANCED],
  knowledgeReq: 8000,
  unlocksUpgrade: [BUILDING_TYPES.OLIVE_ORCHARD]
});

researches[RESEARCHES.GRAIN_FARMING] = new Research({
  name: RESEARCHES.GRAIN_FARMING,
  unlocks: ('Unlocks Grain Fields.'),
  description: ('Grain is more difficult to grow than lentils, and takes grinding '
    + 'before it can be eaten. But it is useful both as flour and animal feed.'),
  icon: new Icon({provider: 'svg', name: SVGS.GRAIN}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.OLIVE_FARMING],
  knowledgeReq: 200,
  unlocksBuilding: [BUILDING_TYPES.GRAIN_FIELD]
});

researches[RESEARCHES.GRAIN_FARMING_FURROWED] = new Research({
  name: RESEARCHES.GRAIN_FARMING_FURROWED,
  unlocks: ('Allows Grain Fields to be run without a leader.'),
  description: ('You\'ve perfected the tools and learned the tricks, with some '
    + 'quick instructions a total novice can grow perfect grain.'),
  icon: new Icon({provider: 'svg', name: SVGS.GRAIN}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 4,
  beginsCompleted: false,
  prereq: [RESEARCHES.GRAIN_FARMING],
  knowledgeReq: 400,
  unlocksUpgrade: [BUILDING_TYPES.GRAIN_FIELD_FURROWED]
});

researches[RESEARCHES.LIMNOLOGY] = new Research({
  name: RESEARCHES.LIMNOLOGY,
  unlocks: ('Unlocks Fishing Ponds.'),
  description: (`It's common practice in desert towns to divert a river into still ponds that are perfect for fish. The kind of fish attracted will depend on what you use as bait.`),
  icon: new Icon({provider: 'svg', name: SVGS.FISHING_POND}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.BIOLOGY],
  knowledgeReq: 100,
  unlocksBuilding: [BUILDING_TYPES.FISHING_POND]
});

researches[RESEARCHES.LIMNOLOGICAL_ENGINEERING] = new Research({
  name: RESEARCHES.LIMNOLOGICAL_ENGINEERING,
  unlocks: ('Unlocks an upgrade to Fishing Ponds.'),
  description: (`Carp love deep, slow-moving pond beds. You could create an ideal habitat after thorough dredging of the pond bottom.`),
  icon: new Icon({provider: 'svg', name: SVGS.CARP}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.LIMNOLOGY],
  knowledgeReq: 400,
  unlocksUpgrade: [BUILDING_TYPES.FISHING_POND_DREDGED]
});

researches[RESEARCHES.LIMNOLOGICAL_ARBOROLOGY] = new Research({
  name: RESEARCHES.LIMNOLOGICAL_ARBOROLOGY,
  unlocks: ('Unlocks an upgrade to Dredged Fishing Ponds.'),
  description: (`Planting olive trees to shade parts of the pond could attract Barramundi and offer a perfect place for a midday nap.`),
  icon: new Icon({provider: 'svg', name: SVGS.BARRAMUNDI}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 4,
  beginsCompleted: false,
  prereq: [RESEARCHES.LIMNOLOGICAL_ENGINEERING],
  knowledgeReq: 1200,
  unlocksUpgrade: [BUILDING_TYPES.FISHING_POND_OLIVE_SHADED]
});

researches[RESEARCHES.QUAIL_HUSBANDRY] = new Research({
  name: RESEARCHES.QUAIL_HUSBANDRY,
  unlocks: ('Unlocks Quail Pastures.'),
  description: ('These quail hide in dark places during the day\'s heat and the '
    + 'night\'s cold, but they\'re amusingly active in the dawn and dusk. '
    + 'Plus, they only need a small amount of grain as feed.'),
  icon: new Icon({provider: 'svg', name: SVGS.QUAIL}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.LIMNOLOGY],
  knowledgeReq: 200,
  unlocksBuilding: [BUILDING_TYPES.QUAIL_PASTURE]
});

researches[RESEARCHES.AUROCH_HUSBANDRY] = new Research({
  name: RESEARCHES.AUROCH_HUSBANDRY,
  unlocks: ('Unlocks Auroch Pastures.'),
  description: ('Aurochs are big, noisy beasts. Useful though: depending on '
    + 'method used they can give either milk or meat.'),
  icon: new Icon({provider: 'svg', name: SVGS.AUROCH}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.BIOLOGY_ADVANCED],
  knowledgeReq: 6000,
  unlocksBuilding: [BUILDING_TYPES.AUROCH_PASTURE]
});

researches[RESEARCHES.ROTATIONAL_GRAZING] = new Research({
  name: RESEARCHES.ROTATIONAL_GRAZING,
  unlocks: ('Unlocks Auroch Paddocks.'),
  description: `Your current method of carring for Aurochs requires a large amount of water and attention. There must be a better way.`,
  icon: new Icon({provider: 'svg', name: SVGS.AUROCH}),
  category: RESEARCHES.BIOLOGY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.AUROCH_HUSBANDRY],
  knowledgeReq: 18000,
  unlocksBuilding: [BUILDING_TYPES.AUROCH_PASTURE]
});

// researches[RESEARCHES.HERB_FARMING] = new Research({
//   name: RESEARCHES.HERB_FARMING,
//   unlocks: ('Unlocks Herb Gardens.'),
//   description: ('Herbs grow slowly relative to other plants. However, they are '
//     + 'valuable for trade, and a small amount can spice up an entire dish.'),
//   icon: new Icon({provider: 'svg', name: SVGS.ANISE}),
//   category: RESEARCHES.BIOLOGY,
//   isCategory: false,
//   difficulty: 2,
//   stepsNeeded: 2,
//   beginsCompleted: false,
//   prereq: [RESEARCHES.BIOLOGY_ADVANCED],
//   knowledgeReq: 10000,
//   unlocksBuilding: [BUILDING_TYPES.SPICE_FIELD]
// });

researches[RESEARCHES.ANTHROPOLOGY] = new Research({
  name: RESEARCHES.ANTHROPOLOGY,
  unlocks: ('Opens up new areas of study about art and communication.'),
  description: ('Hundreds of different cultures make their own ways through the vast '
    + 'emptiness of the desert. And they\'ve each learned different ways to thrive.'),
  icon: new Icon({provider: 'FontAwesome5', name: 'users',
    color: '#fff', backgroundColor: '#071f56'}),
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
  icon: new Icon({provider: 'FontAwesome5', name: 'exchange-alt', color: '#2b2b2d'}),
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
  icon: new Icon({provider: 'FontAwesome5', name: 'book-reader', color: '#2b2b2d'}),
  category: RESEARCHES.ANTHROPOLOGY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.ANTHROPOLOGY],
  knowledgeReq: 200
});

researches[RESEARCHES.ANTHROPOLOGY_ADVANCED] = new Research({
  name: RESEARCHES.ANTHROPOLOGY_ADVANCED,
  unlocks: ('Opens up new areas of study about culture and language.'),
  description: `Your grasp of language and culture has been constantly improving. With a push, you could ascend to an entirely new level.`,
  icon: new Icon({provider: 'FontAwesome5', name: 'users',
    color: '#fff', backgroundColor: '#071f56'}),
  category: RESEARCHES.ANTHROPOLOGY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: [RESEARCHES.ANTHROPOLOGY, RESEARCHES.FIELD_NOTES],
  knowledgeReq: 5000
});

researches[RESEARCHES.TRADING_IMPROVED] = new Research({
  name: RESEARCHES.TRADING_IMPROVED,
  unlocks: 'Allows an upgrade to the Market',
  description: `In order to expand the size of your market you'll need to do more than create a bigger space. You'll need a building designed so vastly different people can shout over one another without breaking into a fight.`,
  icon: new Icon({provider: 'svg', name: SVGS.GRAND_MARKET}),
  category: RESEARCHES.ANTHROPOLOGY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.ANTHROPOLOGY_ADVANCED],
  knowledgeReq: 17000,
  unlocksUpgrade: [BUILDING_TYPES.MARKET_GRAND]
});

researches[RESEARCHES.PHYSICS] = new Research({
  name: RESEARCHES.PHYSICS,
  unlocks: ('Opens up new areas of study about mechanical processes.'),
  description: ('Altered materials, new tools, grand architecture, it all feels '
    + 'tantalizingly close.'),
  icon: new Icon({provider: 'FontAwesome', name: 'balance-scale',
    color: '#fff', backgroundColor: '#071f56'}),
  category: RESEARCHES.PHYSICS,
  isCategory: true,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.SCHOLARSHIP],
  knowledgeReq: 50,
});

researches[RESEARCHES.PHYSICS_ADVANCED] = new Research({
  name: RESEARCHES.PHYSICS_ADVANCED,
  unlocks: ('Opens up further areas of study about mechanical processes.'),
  description: (`You've begun a cycle of improved materials and methods, which allow you to invent new materials and better methods. Where will it end?`),
  icon: new Icon({provider: 'FontAwesome', name: 'balance-scale',
    color: '#fff', backgroundColor: '#071f56'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: [RESEARCHES.FIELD_NOTES],
  knowledgeReq: 7000,
});

researches[RESEARCHES.CLAY_EXCAVATION] = new Research({
  name: RESEARCHES.CLAY_EXCAVATION,
  unlocks: ('Unlocks Clay Pits.'),
  description: ('The soil in desert is a dry, cracking clay. But careful application '
    + 'of water produces a building material for everything from bricks to '
    + 'pottery.'),
  icon: new Icon({provider: 'svg', name: SVGS.CLAY, color: '#a91f1f',
    shadow: '#6f1b1b'}),
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
  icon: new Icon({provider: 'svg', name: SVGS.CLAY, color: '#a91f1f',
    shadow: '#6f1b1b'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.CLAY_EXCAVATION, RESEARCHES.PHYSICS_ADVANCED],
  knowledgeReq: 10000,
  unlocksUpgrade: [BUILDING_TYPES.CLAY_PIT_RICH]
});

researches[RESEARCHES.SAND_EXCAVATION] = new Research({
  name: RESEARCHES.SAND_EXCAVATION,
  unlocks: ('Unlocks Sand Pits.'),
  description: ('You suspect the key to harvesting sand is keeping the pit '
    + 'from collapsing on your workers, and you\'re working on sturdy clay walls '
    + 'that should do the trick.'),
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#f3d98f',
    shadow: '#e6a960'}),
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
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#f3d98f',
    shadow: '#e6a960'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.SAND_EXCAVATION, RESEARCHES.PHYSICS_ADVANCED],
  knowledgeReq: 13000,
  unlocksUpgrade: [BUILDING_TYPES.SAND_PIT_RAPID]
});

researches[RESEARCHES.HUT_CONSTRUCTION] = new Research({
  name: RESEARCHES.HUT_CONSTRUCTION,
  unlocks: ('Unlocks Huts.'),
  description: ('Right now you have enough housing for you and one band of people. '
    + 'Adding more simple huts won\'t be too difficult a task.'),
  icon: new Icon({provider: 'svg', name: SVGS.HUTS}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.PHYSICS],
  knowledgeReq: 200,
  unlocksBuilding: [BUILDING_TYPES.HUTS]
});

researches[RESEARCHES.COTTAGE_CONSTRUCTION] = new Research({
  name: RESEARCHES.COTTAGE_CONSTRUCTION,
  unlocks: ('Unlocks Cottages.'),
  description: (`Wood and thatched roofs are a good start to making the dwellings in  your town feel more like homes and less like sand-covered mounds of clay.`),
  icon: new Icon({provider: 'svg', name: SVGS.COTTAGES}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 4,
  beginsCompleted: false,
  prereq: [RESEARCHES.HUT_CONSTRUCTION],
  knowledgeReq: 600,
  unlocksUpgrade: [BUILDING_TYPES.COTTAGES]
});

researches[RESEARCHES.HOUSE_CONSTRUCTION] = new Research({
  name: RESEARCHES.HOUSE_CONSTRUCTION,
  unlocks: ('Unlocks Houses.'),
  description: `Now that you have the capabity to produce some basic comforts, you can do better than the huts and cottages you've delt with until now. Much better.`,
  icon: new Icon({provider: 'svg', name: SVGS.HOUSE}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.HUT_CONSTRUCTION, RESEARCHES.PHYSICS_ADVANCED],
  knowledgeReq: 16000,
  unlocksUpgrade: [BUILDING_TYPES.HOUSES]
});

researches[RESEARCHES.COMPACTION] = new Research({
  name: RESEARCHES.COMPACTION,
  unlocks: ('Unlocks Presses.'),
  description: ('Reeds are useful as they are, but you\'ve been eager for one '
    + 'resource above all others: something to write on. You don\'t exactly '
    + 'know how to make papyrus, but it surely most involve a thorough '
    + 'flattening.'),
  icon: new Icon({provider: 'svg', name: SVGS.OLIVE_OIL}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.PHYSICS],
  knowledgeReq: 250,
  unlocksBuilding: [BUILDING_TYPES.PRESS]
});

researches[RESEARCHES.COMPACTION_COORDINATED] = new Research({
  name: RESEARCHES.COMPACTION_COORDINATED,
  unlocks: ('Allows Presses to be run without a leader.'),
  description: ('With a set of stabilizing safety structures, a '
    + 'Press can be run without any specialized skills.'),
  icon: new Icon({provider: 'svg', name: SVGS.PAPYRUS}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.COMPACTION, RESEARCHES.PHYSICS_ADVANCED],
  knowledgeReq: 12500,
  unlocksUpgrade: [BUILDING_TYPES.PRESS_COORDINATED]
});

researches[RESEARCHES.GRINDING] = new Research({
  name: RESEARCHES.GRINDING,
  unlocks: ('Unlocks Grinding Mills.'),
  description: ('You\'ve heard of structures that catch the wind to spin giant '
    + 'metal grinding wheels against each other. The idea is simple enough, but '
    + 'getting the mechanism right will be tricky.'),
  icon: new Icon({provider: 'svg', name: SVGS.FLOUR}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.PHYSICS],
  knowledgeReq: 450,
  unlocksBuilding: [BUILDING_TYPES.GRINDING_MILL]
});

researches[RESEARCHES.IMPLEMENT_ASSEMBLY] = new Research({
  name: RESEARCHES.IMPLEMENT_ASSEMBLY,
  unlocks: ('Unlocks Ateliers.'),
  description: `Now that you can produce metal and simple fibrous materials a new world of creation has opened to you.`,
  icon: new Icon({provider: 'svg', name: SVGS.GEARWORK}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 5,
  beginsCompleted: false,
  prereq: [RESEARCHES.COMPACTION, RESEARCHES.GRINDING, RESEARCHES.COMBUSTION],
  knowledgeReq: 1600,
  unlocksBuilding: [BUILDING_TYPES.ATELIER]
});

researches[RESEARCHES.ADVANCED_IMPLEMENTS] = new Research({
  name: RESEARCHES.ADVANCED_IMPLEMENTS,
  unlocks: `Allows Alteliers to be run without a leader, and unlocks new implements`,
  description: `The next step up in your creation of implements will require exotic insights and new materials. Objects from the distant past will be a good place to start.`,
  icon: new Icon({provider: 'svg', name: SVGS.GEARWORK}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 5,
  beginsCompleted: false,
  prereq: [RESEARCHES.COMBUSTION_VENTILATED, RESEARCHES.IMPLEMENT_ASSEMBLY],
  knowledgeReq: 32000,
  unlocksBuilding: [BUILDING_TYPES.ATELIER]
});

researches[RESEARCHES.GRINDING_SIMPLIFIED] = new Research({
  name: RESEARCHES.GRINDING_SIMPLIFIED,
  unlocks: ('Allows Grinding Mills to be run without a leader.'),
  description: ('Reinforcing the grinding wheels will make them far more reliable, '
    + 'and they should no longer need the constant small repairs that make them '
    + 'difficult to run.'),
  icon: new Icon({provider: 'svg', name: SVGS.FLOUR}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.GRINDING, RESEARCHES.PHYSICS_ADVANCED],
  knowledgeReq: 14500,
  unlocksUpgrade: [BUILDING_TYPES.GRINDING_MILL_SIMPLIFIED]
});

researches[RESEARCHES.WEAVING] = new Research({
  name: RESEARCHES.WEAVING,
  unlocks: ('Unlocks Weaverys.'),
  description: ('Cloth making is slow and time-consuming, but most people can be '
    + 'taught without too much of a learning curve. And there\'s a coarse linen '
    + 'cloth that could theoretically be made from something as simple as reeds.'),
  icon: new Icon({provider: 'svg', name: SVGS.LINEN}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.PHYSICS_ADVANCED],
  knowledgeReq: 8500,
  unlocksBuilding: [BUILDING_TYPES.WEAVERY]
});

researches[RESEARCHES.SAND_PURIFICATION] = new Research({
  name: RESEARCHES.SAND_PURIFICATION,
  unlocks: ('Unlocks Sand Cascades.'),
  description: ('You\'ve known for some time that sand is full of tiny '
    + 'particles of shocking variety, but it\'s only now that textiles are '
    + 'available that they could be separated into their component parts.'),
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#fff0c6',
    shadow: '#f5d698'}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.WEAVING],
  knowledgeReq: 18000,
  unlocksBuilding: [BUILDING_TYPES.SAND_CASCADE]
});

researches[RESEARCHES.TAILORING] = new Research({
  name: RESEARCHES.TAILORING,
  unlocks: ('Unlocks Tailors.'),
  description: ('Clothing made in other towns is shockingly expensive. '
    + 'Now that you can produce cloth, you can start work shaping it into '
    + 'clothing more suited to your specific needs.'),
  icon: new Icon({provider: 'svg', name: SVGS.SIMPLE_ROBE}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.WEAVING],
  knowledgeReq: 16000,
  unlocksBuilding: [BUILDING_TYPES.TAILORS]
});

researches[RESEARCHES.OUTFITTING] = new Research({
  name: RESEARCHES.OUTFITTING,
  unlocks: ('Unlocks Outfitters.'),
  description: ('In the desert, your survival is tied to how much you can carry '
    + 'on your back, and how well you can bear it.'),
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_HAVERSACK}),
  category: RESEARCHES.PHYSICS,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.WEAVING],
  knowledgeReq: 18000,
  unlocksBuilding: [BUILDING_TYPES.OUTFITTERS]
});

researches[RESEARCHES.CHEMISTRY] = new Research({
  name: RESEARCHES.CHEMISTRY,
  unlocks: ('Opens up new areas of study about non-physical changes.'),
  description: ('You\'ve stumbled across a disclipline you call Chemistry. '
    + 'It involves a lot of careful separation of liquids and salts, and the results '
    + 'so far aren\'t too impressive. Still, compared with the flashier "Alchemy", '
    + 'it seems to actually work.'),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'flask',
    color: '#fff', backgroundColor: '#071f56'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: true,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.BIOLOGY, RESEARCHES.PHYSICS],
  knowledgeReq: 80,
});

researches[RESEARCHES.CHEMISTRY_ADVANCED] = new Research({
  name: RESEARCHES.CHEMISTRY_ADVANCED,
  unlocks: ('Opens up further areas of study about non-physical changes.'),
  description: (`You've begun exploring aspects of Chemistry that feel suspiciously close to its hoax-prone cousin, Alchemy. Some substances truly can be converted into others. The options are limited, the rules are obscure, but the potential is enormous.`),
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'flask',
    color: '#fff', backgroundColor: '#071f56'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: [RESEARCHES.FIELD_NOTES],
  knowledgeReq: 9000,
});

researches[RESEARCHES.DEHYDRATION] = new Research({
  name: RESEARCHES.DEHYDRATION,
  unlocks: ('Unlocks Drying Yards.'),
  description: ('You\'ve surmised that many materials are stronger or easier to '
    + 'work with when dry. At least there\'s one area where the brutal sunlight will '
    + 'do you a favor.'),
  icon: new Icon({provider: 'svg', name: SVGS.THATCH}),
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
researches[RESEARCHES.DEHYDRATION_ORGANIZED] = new Research({
  name: RESEARCHES.DEHYDRATION_ORGANIZED,
  unlocks: ('Allows Drying Yards to be run without a leader.'),
  description: ('You\'ve put together simple diagrams showing where each material '
    + 'needs to be placed, and which shouldn\'t touch.'),
  icon: new Icon({provider: 'svg', name: SVGS.THATCH}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.DEHYDRATION, RESEARCHES.CHEMISTRY_ADVANCED],
  knowledgeReq: 1800,
  unlocksUpgrade: [BUILDING_TYPES.DRYING_YARD_ORGANIZED]
});

researches[RESEARCHES.COMBUSTION] = new Research({
  name: RESEARCHES.COMBUSTION,
  unlocks: ('Unlocks Furnaces.'),
  description: ('You\'ll need more than fire. You\'ll need useful fire. '
    + 'But if you can get the temperature and air flow high enough, you could start '
    + 'turning sand into glass! Gods know there\'s enough sand around.'),
  icon: new Icon({provider: 'svg', name: SVGS.GLASS}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.CHEMISTRY],
  knowledgeReq: 320,
  unlocksBuilding: [BUILDING_TYPES.FURNACE]
});

researches[RESEARCHES.COMBUSTION_VENTILATED] = new Research({
  name: RESEARCHES.COMBUSTION_VENTILATED,
  unlocks: ('Allows Furnaces to be run without a leader and produce new materials.'),
  description: ('There are some metals that require greater heat to form than your '
    + 'furnace can manage: much, much greater. You\'ll need powerful fuel, '
    + 'more of it, and continuous fresh air spiraling in.'),
  icon: new Icon({provider: 'svg', name: SVGS.BAR, color: '#8ea2d8',
    shadow: '#444b6b', secondaryColor: '#b1b9e4'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.COMBUSTION, RESEARCHES.CHEMISTRY_ADVANCED],
  knowledgeReq: 18000,
  unlocksUpgrade: [BUILDING_TYPES.FURNACE_BLAST]
});

researches[RESEARCHES.TOOL_FABRICATION] = new Research({
  name: RESEARCHES.TOOL_FABRICATION,
  unlocks: ('Unlocks Fabricatory.'),
  description: ('Your study of metals has brought you tantalizingly close to '
    + 'a variety of tools that would transform every part of the life that you\'ve '
    + 'carved out of this harsh land.'),
  icon: new Icon({provider: 'svg', name: SVGS.COARSE_MEASURES}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.COMBUSTION_VENTILATED],
  knowledgeReq: 22000,
  unlocksBuilding: [BUILDING_TYPES.FABRICATORY]
});

researches[RESEARCHES.COOKING] = new Research({
  name: RESEARCHES.COOKING,
  unlocks: ('Unlocks Kitchens.'),
  description: ('Eating raw lentils gets old fast. Real, enjoyable food will be '
    + 'a crucial part of making your settlement a livable place.'),
  icon: new Icon({provider: 'svg', name: SVGS.OMELET, color: '#18c08b',
    shadow: '#0caf7b'}),
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
  icon: new Icon({provider: 'svg', name: SVGS.CAKE, color: '#ffa6b7',
    shadow: '#d16479'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.COOKING, RESEARCHES.CHEMISTRY_ADVANCED],
  knowledgeReq: 13000,
  unlocksUpgrade: [BUILDING_TYPES.KITCHEN_BOUNTIFUL]
});

researches[RESEARCHES.GLASS_SHAPING] = new Research({
  name: RESEARCHES.GLASS_SHAPING,
  unlocks: ('Unlocks Glassworks.'),
  description: ('Glass can be blown, ground, or shaped into many more forms '
    + ' than the flat panes made in a furnace.'),
  icon: new Icon({provider: 'svg', name: SVGS.LENS}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.CHEMISTRY_ADVANCED],
  knowledgeReq: 24000,
  unlocksBuilding: [BUILDING_TYPES.GLASSWORKS]
});

researches[RESEARCHES.SOLVENTS] = new Research({
  name: RESEARCHES.SOLVENTS,
  unlocks: ('Unlocks Laboratories.'),
  description: ('There are powers and properties that are hidden in substances, and '
    + 'to control them you\'ll have to dissolve them.'),
  icon: new Icon({provider: 'svg', name: SVGS.DROP, color: '#dbea00',
    shadow: '#c6d400', secondaryColor: '#f8ff9c'}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.CHEMISTRY_ADVANCED],
  knowledgeReq: 33000,
  unlocksBuilding: [BUILDING_TYPES.LABORATORY]
});

researches[RESEARCHES.POTTERY] = new Research({
  name: RESEARCHES.POTTERY,
  unlocks: ('Unlocks Pottery Kiln.'),
  description: ('Simple terracotta isn\'t far removed from the clay bricks baked '
    + 'under the sun. But far more is possible: fine (and valuable) ceramics made '
    + 'from rare clays and glazes.'),
  icon: new Icon({provider: 'svg', name: SVGS.TERRACOTTA}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.CHEMISTRY_ADVANCED],
  knowledgeReq: 16000,
  unlocksBuilding: [BUILDING_TYPES.POTTERY_KILN]
});

researches[RESEARCHES.FERMENTATION] = new Research({
  name: RESEARCHES.FERMENTATION,
  unlocks: ('Unlocks Brewery.'),
  description: ('Now here\'s something your people have been clamoring for: '
    + 'something more interesting (and entertaining) to drink at the end '
    + 'of a hard day\'s work.'),
  icon: new Icon({provider: 'svg', name: SVGS.BEER}),
  category: RESEARCHES.CHEMISTRY,
  isCategory: false,
  difficulty: 2,
  stepsNeeded: 4,
  beginsCompleted: false,
  prereq: [RESEARCHES.CHEMISTRY_ADVANCED],
  knowledgeReq: 17000,
  unlocksBuilding: [BUILDING_TYPES.BREWERY]
});

researches[RESEARCHES.THRICE_LOCKED_TOME] = new Research({
  name: RESEARCHES.THRICE_LOCKED_TOME,
  unlocks: 'The Thrice Locked Tome has finally been opened. New avenues of research are available.',
  description: '',
  icon: new Icon({ provider: 'svg', name: SVGS.TOME }),
  category: RESEARCHES.SCHOLARSHIP,
  isCategory: false,
  difficulty: 0,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: ['No prerequisite'],
  knowledgeReq: 0,
  hidden: true
});

researches[RESEARCHES.MYSTICISM] = new Research({
  name: RESEARCHES.MYSTICISM,
  unlocks: 'Researching this opens up otherworldly areas of study.',
  description: `The tome is a labyrinth of written word, layers of text written in different inks, by different people. Untangling it will be a massive task.`,
  icon: new Icon({ provider: 'MaterialCommunityIcons', name: 'crystal-ball',
    color: '#fff', backgroundColor: '#071f56' }),
  category: RESEARCHES.MYSTICISM,
  isCategory: true,
  difficulty: 0,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.THRICE_LOCKED_TOME],
  knowledgeReq: 555
});

researches[RESEARCHES.EXPLORATION_OF_RITUALS] = new Research({
  name: RESEARCHES.EXPLORATION_OF_RITUALS,
  unlocks: 'Researching this continues otherworldly areas of study.',
  description: `You've begun delving into the substance of The Thrice-Locked Tome, and the contents are perplexing. Any given passage could be flowery instructions, poetry, allusions, or insane ramblings. Time to try some practical applications.`,
  icon: new Icon({ provider: 'svg', name: SVGS.MYSTICISM }),
  category: RESEARCHES.MYSTICISM,
  isCategory: false,
  difficulty: 1,
  stepsNeeded: 10,
  beginsCompleted: false,
  prereq: [RESEARCHES.MYSTICISM],
  knowledgeReq: 5555,
  unlocksBuilding: [BUILDING_TYPES.PYRE]
});

export { researches }
