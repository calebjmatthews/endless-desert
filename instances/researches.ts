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

researches[RESEARCHES.BOTANY] = new Research({
  name: RESEARCHES.BOTANY,
  unlocks: ('Researching this opens up new areas of study about life and cultivation.'),
  description: ('If your settlement is going to support a serious number of people '
    + 'you\'ll have to learn about crops. Better get started.'),
  icon: {provider: 'FontAwesome5', name: 'seedling'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff',
  category: RESEARCHES.BOTANY,
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
  category: RESEARCHES.BOTANY,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: true,
  prereq: [RESEARCHES.BOTANY],
  knowledgeReq: 0
});

researches[RESEARCHES.SIMPLIFIED_LENTIL_FARMING] = new Research({
  name: RESEARCHES.SIMPLIFIED_LENTIL_FARMING,
  unlocks: ('Researching this allows lentil fields to be run without a leader.'),
  description: ('You\'ve got lentils figured out, now they practically grow '
    + 'themselves.'),
  icon: {provider: 'FontAwesome', name: 'pagelines'},
  foregroundColor: '#59a500',
  backgroundColor: '#fff',
  category: RESEARCHES.BOTANY,
  difficulty: 1,
  stepsNeeded: 1,
  beginsCompleted: true,
  prereq: [RESEARCHES.BOTANY],
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
  category: RESEARCHES.BOTANY,
  difficulty: 1,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: [RESEARCHES.BOTANY],
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
  category: RESEARCHES.BOTANY,
  difficulty: 1,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.BOTANY],
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
  category: RESEARCHES.BOTANY,
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
  category: RESEARCHES.BOTANY,
  difficulty: 1,
  stepsNeeded: 5,
  beginsCompleted: false,
  prereq: [RESEARCHES.GRAIN_FARMING],
  knowledgeReq: 200,
  unlocksBuilding: [BUILDING_TYPES.OLIVE_GROVE]
});

researches[RESEARCHES.SIMPLIFIED_OLIVE_FARMING] = new Research({
  name: RESEARCHES.SIMPLIFIED_OLIVE_FARMING,
  unlocks: ('Researching this unlocks olive groves.'),
  description: ('It was mostly a matter of figuring out grafting and training the '
    + 'saplings, but you\'ve put together an olive grove that requires almost no '
    + 'supervision.'),
  icon: {provider: 'FontAwesome5', name: 'seedling'},
  foregroundColor: '#97c701',
  backgroundColor: '#fff',
  category: RESEARCHES.BOTANY,
  difficulty: 1,
  stepsNeeded: 5,
  beginsCompleted: false,
  prereq: [RESEARCHES.OLIVE_FARMING],
  knowledgeReq: 400,
  unlocksBuilding: [BUILDING_TYPES.OLIVE_GROVE]
});

export { researches }
