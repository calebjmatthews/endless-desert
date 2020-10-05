import Research from '../models/research';
import { RESEARCHES } from '../enums/researches';
import { BUILDING_TYPES } from '../enums/building_types';

let researches: { [name: string] : Research } = {};
researches[RESEARCHES.SCHOLARSHIP] = new Research({
  name: RESEARCHES.SCHOLARSHIP,
  prereq: null,
  knowledgeReq: 0,
  unlocksBuilding: null
});

researches[RESEARCHES.BOTANY] = new Research({
  name: RESEARCHES.BOTANY,
  prereq: null,
  knowledgeReq: 0,
  unlocksBuilding: null
});

researches[RESEARCHES.LENTIL_FARMING] = new Research({
  name: RESEARCHES.LENTIL_FARMING,
  prereq: [RESEARCHES.BOTANY],
  knowledgeReq: 0,
  unlocksBuilding: [BUILDING_TYPES.LENTIL_FIELD]
});

researches[RESEARCHES.REED_CULTIVATION] = new Research({
  name: RESEARCHES.REED_CULTIVATION,
  prereq: [RESEARCHES.BOTANY],
  knowledgeReq: 100,
  unlocksBuilding: [BUILDING_TYPES.REED_DELTA]
});

export { researches }
