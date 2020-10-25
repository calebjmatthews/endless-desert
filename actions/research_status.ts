export const COMPLETE_RESEARCH = 'COMPLETE_RESEARCH';
export function completeResearch(name: string) {
  return {
    type: COMPLETE_RESEARCH,
    name: name
  }
}

export const STUDY_RESOURCE = 'STUDY_RESOURCE';
export function studyResource(resourceName: string) {
  return {
    type: STUDY_RESOURCE,
    resourceName: resourceName
  }
}
