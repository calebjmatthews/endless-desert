import { COMPLETE_RESEARCH } from '../actions/research_status';
import ResearchStatus from '../models/research_status';

import { researchStatusStarting } from '../instances/research_status';
import { researches } from '../instances/researches';

export default function (researchStatus: ResearchStatus = researchStatusStarting,
  action: any = null) {
	switch(action.type) {
    case COMPLETE_RESEARCH:
    let newRS = new ResearchStatus(researchStatus);
    newRS.status[action.name] = 'completed';
    newRS.checkAndSetVisible(researches);
    return newRS;
    break;

		default:
		return researchStatus;
	}
};
