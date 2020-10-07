import Research from '../models/research';
import { RESEARCHES } from '../enums/researches';
import { BUILDING_TYPES } from '../enums/building_types';

let researches: { [name: string] : Research } = {};
researches[RESEARCHES.SCHOLARSHIP] = new Research({
  name: RESEARCHES.SCHOLARSHIP,
  beginsCompleted: false,
  prereq: null,
  knowledgeReq: 0,
  unlocksBuilding: null
});

researches[RESEARCHES.BOTANY] = new Research({
  name: RESEARCHES.BOTANY,
  beginsCompleted: true,
  prereq: null,
  knowledgeReq: 0,
  unlocksBuilding: null
});

researches[RESEARCHES.LENTIL_FARMING] = new Research({
  name: RESEARCHES.LENTIL_FARMING,
  beginsCompleted: true,
  prereq: [RESEARCHES.BOTANY],
  knowledgeReq: 0,
  unlocksBuilding: [BUILDING_TYPES.LENTIL_FIELD]
});

researches[RESEARCHES.REED_CULTIVATION] = new Research({
  name: RESEARCHES.REED_CULTIVATION,
  beginsCompleted: false,
  prereq: [RESEARCHES.BOTANY],
  knowledgeReq: 100,
  unlocksBuilding: [BUILDING_TYPES.REED_DELTA]
});

export { researches }
