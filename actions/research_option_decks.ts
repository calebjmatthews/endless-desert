import ResearchOptionDeck from '../models/research_option_deck';
import { researches } from '../instances/researches';

export const SET_RESEARCH_OPTION_DECKS = 'SET_RESEARCH_OPTION_DECKS';
export function setResearchOptionDecks(researchOptionDecks:
  { [researchName: string] : ResearchOptionDeck}) {
  return {
    type: SET_RESEARCH_OPTION_DECKS,
    researchOptionDecks: researchOptionDecks
  };
}

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
    currentOptions: {},
    paidCosts: {}
  });
  newROD.beginStep(1);

  return {
    type: UPSERT_RESEARCH_OPTION_DECK,
    researchOptionDeck: newROD
  };
}

export function updateResearchOptionDeck(rod: ResearchOptionDeck) {
  return {
    type: UPSERT_RESEARCH_OPTION_DECK,
    researchOptionDeck: rod
  };
}

export const REMOVE_RESEARCH_OPTION_DECK = 'REMOVE_RESEARCH_OPTION_DECK';
