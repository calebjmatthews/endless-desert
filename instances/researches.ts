import Research from '../models/research';
import { RESEARCHES } from '../enums/researches';
import { BUILDING_TYPES } from '../enums/building_types';

let researches: { [name: string] : Research } = {};
researches[RESEARCHES.SCHOLARSHIP] = new Research({
  name: RESEARCHES.SCHOLARSHIP,
  unlocks: 'Researching this opens up new areas of study.',
  description: ('In order to learn, something of value must be lost. '
    + 'And at the beginning your options are few. Just one, if fact. '
    + 'Still, you have to start somewhere!'),
  icon: {provider: 'FontAwesome5', name: 'graduation-cap'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff',
  category: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: null,
  knowledgeReq: 0
});

researches[RESEARCHES.STUDY] = new Research({
  name: RESEARCHES.STUDY,
  unlocks: ('Researching this allows you to study new resources '
    + 'to increase your knowledge.'),
  description: ('Studying how to study. '
    + 'It feels a little dizzying, and a little uplifting.'),
  icon: {provider: 'MaterialCommunityIcons', name: 'magnify'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff',
  category: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.SCHOLARSHIP],
  knowledgeReq: 0
});

researches[RESEARCHES.ANALYSIS] = new Research({
  name: RESEARCHES.ANALYSIS,
  unlocks: ('Researching this allows you to destroy batches of resources '
    + 'to increase your knowledge.'),
  description: ('Even after the easy discoveries have been made, there\'s an '
    + 'almost unlimited amount you can learn with large numbers of samples '
    + 'an a lack of concern about keeping them intact.'),
  icon: {provider: 'MaterialCommunityIcons', name: 'magnify-close'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff',
  category: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.STUDY],
  knowledgeReq: 0
});

researches[RESEARCHES.CONJECTURE] = new Research({
  name: RESEARCHES.CONJECTURE,
  unlocks: ('Researching this gives one more option when researching.'),
  description: ('As you\'ve grown more experienced you increasingly see '
    + 'more than one answer to the questions you\'re asking.'),
  icon: {provider: 'MaterialCommunityIcons', name: 'cloud-question'},
  foregroundColor: '#000',
  backgroundColor: '#fff',
  category: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.STUDY],
  knowledgeReq: 100
});

researches[RESEARCHES.BIOLOGY] = new Research({
  name: RESEARCHES.BIOLOGY,
  unlocks: ('Researching this opens up new areas of study about life and cultivation.'),
  description: ('If your settlement is going to support a serious number of people '
    + 'you\'ll have to learn about crops. Better get started.'),
  icon: {provider: 'FontAwesome5', name: 'seedling'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff',
  category: RESEARCHES.BIOLOGY,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: null,
  knowledgeReq: 20
});

researches[RESEARCHES.LENTIL_FARMING] = new Research({
  name: RESEARCHES.LENTIL_FARMING,
  unlocks: ('Researching this unlocks lentil fields.'),
  description: ('Lentils are the perfect crop for your early settlement. '
    + 'Easy to grow, easy to prepare. The taste is admittedly uninspiring.'),
  icon: {provider: 'FontAwesome', name: 'pagelines'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff',
  category: RESEARCHES.BIOLOGY,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.BIOLOGY],
  knowledgeReq: 0,
  unlocksBuilding: [BUILDING_TYPES.LENTIL_FIELD]
});

researches[RESEARCHES.SIMPLIFIED_LENTIL_FARMING] = new Research({
  name: RESEARCHES.SIMPLIFIED_LENTIL_FARMING,
  unlocks: ('Researching this allows lentil fields to be run without a leader.'),
  description: ('You\'ve got lentils figured out, now they practically grow '
    + 'themselves.'),
  icon: {provider: 'FontAwesome', name: 'pagelines'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff',
  category: RESEARCHES.BIOLOGY,
  difficulty: 1,
  stepsNeeded: 1,
  beginsCompleted: true,
  prereq: [RESEARCHES.BIOLOGY],
  knowledgeReq: 50,
  simplifiedBuilding: [BUILDING_TYPES.LENTIL_FIELD]
});

researches[RESEARCHES.REED_CULTIVATION] = new Research({
  name: RESEARCHES.REED_CULTIVATION,
  unlocks: ('Researching this unlocks reed deltas.'),
  description: ('Reeds grow in river mud, and are incredibly useful. '
    + 'They can be a fuel source, thatch for roofs, raw material for rough fabric, '
    + 'pulp for papyrus, and probably other things you haven\'t even heard of.'),
  icon: {provider: 'MaterialCommunityIcons', name: 'reorder-vertical'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff',
  category: RESEARCHES.BIOLOGY,
  difficulty: 1,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: [RESEARCHES.BIOLOGY],
  knowledgeReq: 35,
  unlocksBuilding: [BUILDING_TYPES.REED_DELTA]
});

researches[RESEARCHES.GRAIN_FARMING] = new Research({
  name: RESEARCHES.GRAIN_FARMING,
  unlocks: ('Researching this unlocks grain fields.'),
  description: ('Grain is more difficult to grow than lentils, and takes grinding '
    + 'before it can be eaten. But it is useful both as flour and animal feed.'),
  icon: {provider: 'MaterialCommunityIcons', name: 'corn'},
  foregroundColor: '#d8be04',
  backgroundColor: '#fff',
  category: RESEARCHES.BIOLOGY,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.BIOLOGY],
  knowledgeReq: 100,
  unlocksBuilding: [BUILDING_TYPES.GRAIN_FIELD]
});

researches[RESEARCHES.SIMPLIFIED_GRAIN_FARMING] = new Research({
  name: RESEARCHES.SIMPLIFIED_GRAIN_FARMING,
  unlocks: ('Researching this allows grain fields to be run without a leader.'),
  description: ('You\'ve perfected the tools and learned the tricks, with some '
    + 'quick instructions a total novice can grow perfect grain.'),
  icon: {provider: 'MaterialCommunityIcons', name: 'corn'},
  foregroundColor: '#d8be04',
  backgroundColor: '#fff',
  category: RESEARCHES.BIOLOGY,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.GRAIN_FARMING],
  knowledgeReq: 200,
  simplifiedBuilding: [BUILDING_TYPES.GRAIN_FIELD]
});

researches[RESEARCHES.OLIVE_FARMING] = new Research({
  name: RESEARCHES.OLIVE_FARMING,
  unlocks: ('Researching this unlocks olive groves.'),
  description: ('You\'ve come across a variety of olive trees that love the '
    + 'sun and the dry heat. And they can be pressed into an oil that\'s absolutely '
    + 'delicious.'),
  icon: {provider: 'FontAwesome5', name: 'seedling'},
  foregroundColor: '#97c701',
  backgroundColor: '#fff',
  category: RESEARCHES.BIOLOGY,
  difficulty: 1,
  stepsNeeded: 5,
  beginsCompleted: false,
  prereq: [RESEARCHES.GRAIN_FARMING],
  knowledgeReq: 200,
  unlocksBuilding: [BUILDING_TYPES.OLIVE_GROVE]
});

researches[RESEARCHES.SIMPLIFIED_OLIVE_FARMING] = new Research({
  name: RESEARCHES.SIMPLIFIED_OLIVE_FARMING,
  unlocks: ('Researching this allows olive groves to be run without a leader.'),
  description: ('It was mostly a matter of figuring out grafting and training the '
    + 'saplings, but you\'ve put together an olive grove that requires almost no '
    + 'supervision.'),
  icon: {provider: 'FontAwesome5', name: 'seedling'},
  foregroundColor: '#97c701',
  backgroundColor: '#fff',
  category: RESEARCHES.BIOLOGY,
  difficulty: 1,
  stepsNeeded: 5,
  beginsCompleted: false,
  prereq: [RESEARCHES.OLIVE_FARMING],
  knowledgeReq: 400,
  unlocksBuilding: [BUILDING_TYPES.OLIVE_GROVE]
});

researches[RESEARCHES.PHYSICS] = new Research({
  name: RESEARCHES.PHYSICS,
  unlocks: ('Researching this opens up new areas of study.'),
  description: ('Altered materials, new tools, grand architecture, it all feels '
    + 'tantalizingly close.'),
  icon: {provider: 'FontAwesome5', name: 'balance-scale'},
  foregroundColor: '#97c701',
  backgroundColor: '#fff',
  category: RESEARCHES.PHYSICS,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.SCHOLARSHIP],
  knowledgeReq: 50,
});

researches[RESEARCHES.CLAY_EXCAVATION] = new Research({
  name: RESEARCHES.CLAY_EXCAVATION,
  unlocks: ('Researching this unlocks clay pits.'),
  description: ('The soil in desert is a dry, cracking clay. But careful application '
    + 'of water produces a building material for everything from bricks to '
    + 'ornamental figurines.'),
  icon: {provider: 'FontAwesome5', name: 'splotch'},
  foregroundColor: '#a91f1f',
  backgroundColor: '#fff',
  category: RESEARCHES.PHYSICS,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.PHYSICS],
  knowledgeReq: 100,
  unlocksBuilding: [BUILDING_TYPES.CLAY_PIT]
});

researches[RESEARCHES.SAND_EXCAVATION] = new Research({
  name: RESEARCHES.SAND_EXCAVATION,
  unlocks: ('Researching this unlocks sand pits.'),
  description: ('You suspect the key to harvesting sand is keeping the pit '
    + 'from collapsing on your workers, and you\'re working on sturdy brick walls '
    + 'that should do the trick.'),
  icon: {provider: 'FontAwesome5', name: 'mountain'},
  foregroundColor: '#f7ea78',
  backgroundColor: '#fff',
  category: RESEARCHES.PHYSICS,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.PHYSICS],
  knowledgeReq: 180,
  unlocksBuilding: [BUILDING_TYPES.SAND_PIT]
});

researches[RESEARCHES.COMPACTION] = new Research({
  name: RESEARCHES.COMPACTION,
  unlocks: ('Researching this unlocks presses.'),
  description: ('Reeds are useful as they are, but you\'ve heard '
    + 'that pressing them into a dense sheet makes a good roofing material. '
    + 'Once you figure out how to do it, you wonder if a thorough compacting may '
    + 'have even more uses.'),
  icon: {provider: 'MaterialCommunityIcons', name: 'inbox-multiple'},
  foregroundColor: '#795548',
  backgroundColor: '#fff',
  category: RESEARCHES.PHYSICS,
  difficulty: 1,
  stepsNeeded: 4,
  beginsCompleted: false,
  prereq: [RESEARCHES.PHYSICS],
  knowledgeReq: 250,
  unlocksBuilding: [BUILDING_TYPES.PRESS]
});

researches[RESEARCHES.CHEMISTRY] = new Research({
  name: RESEARCHES.CHEMISTRY,
  unlocks: ('Researching this opens up new areas of study.'),
  description: ('You\'ve stumbled across a disclipline you call Chemistry. '
    + 'It involves a lot of careful separation of liquids and salts, and the results '
    + 'so far aren\'t too impressive. Still, compared with the flashier "Alchemy", '
    + 'it seems to actually work.'),
  icon: {provider: 'MaterialCommunityIcons', name: 'test-tube'},
  foregroundColor: '#97c701',
  backgroundColor: '#fff',
  category: RESEARCHES.CHEMISTRY,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.BIOLOGY, RESEARCHES.PHYSICS],
  knowledgeReq: 80,
});

researches[RESEARCHES.DEHYDRATION] = new Research({
  name: RESEARCHES.DEHYDRATION,
  unlocks: ('Researching this unlocks drying yards.'),
  description: ('You\'ve surmised that many materials are stronger or easier to '
    + 'work with when dry. And there\'s a special salt that\'s left once your '
    + 'cistern\'s water has evaporated you think could help in the process...'),
  icon: {provider: 'MaterialCommunityIcons', name: 'waves'},
  foregroundColor: '#ff0000',
  backgroundColor: '#fff',
  category: RESEARCHES.CHEMISTRY,
  difficulty: 1,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.CHEMISTRY],
  knowledgeReq: 180,
  unlocksBuilding: [BUILDING_TYPES.DRYING_YARD]
});

researches[RESEARCHES.COMBUSTION] = new Research({
  name: RESEARCHES.COMBUSTION,
  unlocks: ('Researching this unlocks furnaces.'),
  description: ('You\'ll need more than fire. You\'ll need useful fire. '
    + 'But if you can get the temperature and air flow high enough, you could start '
    + 'turning sand into glass! Gods know there\'s enough sand around.'),
  icon: {provider: 'MaterialCommunityIcons', name: 'fireplace'},
  foregroundColor: '#b02727',
  backgroundColor: '#fff',
  category: RESEARCHES.CHEMISTRY,
  difficulty: 1,
  stepsNeeded: 4,
  beginsCompleted: false,
  prereq: [RESEARCHES.CHEMISTRY],
  knowledgeReq: 320,
  unlocksBuilding: [BUILDING_TYPES.FURNACE]
});

export { researches }
