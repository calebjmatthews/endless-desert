import ResearchOptionDeck from '../models/research_option_deck';
import { researches } from '../instances/researches';

export const SET_RESEARCH_OPTION_DECKS = 'SET_RESEARCH_OPTION_DECKS';
export function setResearchOptionDecks(researchOptionDecks:
  { [researchName: string] : ResearchOptionDeck}) {
  let newResearchOptionDecks: { [researchName: string] : ResearchOptionDeck} = {};
  Object.keys(researchOptionDecks).map((researchName) => {
    newResearchOptionDecks[researchName] =
      new ResearchOptionDeck(researchOptionDecks[researchName]);
  })
  return {
    type: SET_RESEARCH_OPTION_DECKS,
    researchOptionDecks: newResearchOptionDecks
  };
}

export const UPSERT_RESEARCH_OPTION_DECK = 'UPSERT_RESEARCH_OPTION_DECK';
export function startResearch(researchName: string, optionSlots: number) {
  let research = researches[researchName];
  let newROD = new ResearchOptionDeck({
    researchName,
    stepsCompleted: 0,
    stepsNeeded: research.stepsNeeded,
    optionSlots,
    preferredOptions: {},
    generalOptions: {},
    viewedOptions: {},
    currentOptions: [],
    paidCosts: {}
  });
  newROD.drawAllOptions(optionSlots);

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
