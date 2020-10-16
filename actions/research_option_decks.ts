import ResearchOptionDeck from '../models/research_option_deck';
import { researches } from '../instances/researches';

export const UPSERT_RESEARCH_OPTION_DECK = 'UPSERT_RESEARCH_OPTION_DECK';
export function startResearch(researchName: string) {
  let research = researches[researchName];
  let newROD = new ResearchOptionDeck({
    researchName: researchName,
    stepsCompleted: 0,
    stepsNeeded: research.stepsNeeded,
    preferredOptions: {},
    generalOptions: {},
    viewedOptions: {},
    currentOptions: {}
  });
  newROD.beginStep(1);

  return {
    type: UPSERT_RESEARCH_OPTION_DECK,
    researchOptionDeck: newROD
  };
}

export const REMOVE_RESEARCH_OPTION_DECK = 'REMOVE_RESEARCH_OPTION_DECK';
