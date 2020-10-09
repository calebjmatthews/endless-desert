export const COMPLETE_RESEARCH = 'COMPLETE_RESEARCH';

export function completeResearch(name: string) {
  return {
    type: COMPLETE_RESEARCH,
    name: name
  }
}
