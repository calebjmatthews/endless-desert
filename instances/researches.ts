import Research from '../models/research';
import { RESEARCHES } from '../enums/researches';
import { BUILDING_TYPES } from '../enums/building_types';

let researches: { [name: string] : Research } = {};
researches[RESEARCHES.SCHOLARSHIP] = new Research({
  name: RESEARCHES.SCHOLARSHIP,
  icon: {provider: 'FontAwesome5', name: 'graduation-cap'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff',
  category: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  stepsNeeded: 1,
  beginsCompleted: false,
  prereq: null,
  knowledgeReq: 0,
  unlocksBuilding: null
});

researches[RESEARCHES.STUDY] = new Research({
  name: RESEARCHES.STUDY,
  icon: {provider: 'MaterialCommunityIcons', name: 'magnify'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff',
  category: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: [RESEARCHES.SCHOLARSHIP],
  knowledgeReq: 0,
  unlocksBuilding: null
});

researches[RESEARCHES.ANALYSIS] = new Research({
  name: RESEARCHES.ANALYSIS,
  icon: {provider: 'MaterialCommunityIcons', name: 'magnify-close'},
  foregroundColor: '#2b2b2d',
  backgroundColor: '#fff',
  category: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  stepsNeeded: 3,
  beginsCompleted: false,
  prereq: [RESEARCHES.STUDY],
  knowledgeReq: 0,
  unlocksBuilding: null
});

researches[RESEARCHES.BOTANY] = new Research({
  name: RESEARCHES.BOTANY,
  icon: {provider: 'FontAwesome5', name: 'seedling'},
  foregroundColor: '#76c716',
  backgroundColor: '#fff',
  category: RESEARCHES.BOTANY,
  difficulty: 0,
  stepsNeeded: 2,
  beginsCompleted: false,
  prereq: null,
  knowledgeReq: 20,
  unlocksBuilding: null
});

researches[RESEARCHES.LENTIL_FARMING] = new Research({
  name: RESEARCHES.LENTIL_FARMING,
  icon: {provider: 'FontAwesome', name: 'pagelines'},
  foregroundColor: '#76c716',
  backgroundColor: '#fff',
  category: RESEARCHES.BOTANY,
  difficulty: 0,
  stepsNeeded: 1,
  beginsCompleted: true,
  prereq: [RESEARCHES.BOTANY],
  knowledgeReq: 0,
  unlocksBuilding: [BUILDING_TYPES.LENTIL_FIELD]
});

researches[RESEARCHES.REED_CULTIVATION] = new Research({
  name: RESEARCHES.REED_CULTIVATION,
  icon: {provider: 'MaterialCommunityIcons', name: 'reorder-vertical'},
  foregroundColor: '#76c716',
  backgroundColor: '#fff',
  category: RESEARCHES.BOTANY,
  difficulty: 0,
  stepsNeeded: 1,
  beginsCompleted: true,
  prereq: [RESEARCHES.BOTANY],
  knowledgeReq: 0,
  unlocksBuilding: [BUILDING_TYPES.REED_DELTA]
});

export { researches }
