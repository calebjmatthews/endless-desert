import ResearchStatus from '../models/research_status';

export const SET_RESEARCH_STATUS = 'SET_RESEARCH_STATUS';
export function setResearchStatus(researchStatus: ResearchStatus) {
  return {
    type: SET_RESEARCH_STATUS,
    researchStatus: researchStatus
  }
}

export const COMPLETE_RESEARCH = 'COMPLETE_RESEARCH';
export function completeResearch(name: string) {
  return {
    type: COMPLETE_RESEARCH,
    name: name
  }
}

export const STUDY_RESOURCE = 'STUDY_RESOURCE';
export function studyResource(typeQuality: string) {
  return {
    type: STUDY_RESOURCE,
    typeQuality: typeQuality
  }
}
