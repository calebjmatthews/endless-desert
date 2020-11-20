import { SET_RESEARCH_STATUS,  COMPLETE_RESEARCH, STUDY_RESOURCE } from '../actions/research_status';
import ResearchStatus from '../models/research_status';

import { researchStatusStarting } from '../instances/research_status';

export default function (researchStatus: ResearchStatus = researchStatusStarting,
  action: any = null) {
	switch(action.type) {
    case SET_RESEARCH_STATUS:
    return new ResearchStatus(action.researchStatus);

    case COMPLETE_RESEARCH:
    let newResearchRS = new ResearchStatus(researchStatus);
    newResearchRS.setCompleted(action.name);
    return newResearchRS;

    case STUDY_RESOURCE:
    let newResourceRS = new ResearchStatus(researchStatus);
    newResourceRS.studyResource(action.resourceName);
    return newResourceRS;

		default:
		return researchStatus;
	}
};
