import { SET_RESEARCH_OPTION_DECKS, UPSERT_RESEARCH_OPTION_DECK,
  REMOVE_RESEARCH_OPTION_DECK } from '../actions/research_option_decks';
import ResearchOptionDeck from '../models/research_option_deck';

export default function (researchOptionDecks:
  { [researchName: string] : ResearchOptionDeck} = {}, action: any = null) {
	switch(action.type) {
    case SET_RESEARCH_OPTION_DECKS:
    return Object.assign({}, action.researchOptionDecks);

    case UPSERT_RESEARCH_OPTION_DECK:
    let newROD: { [researchName: string] : ResearchOptionDeck} = {};
    newROD[action.researchOptionDeck.researchName] = action.researchOptionDeck;
    return Object.assign({}, researchOptionDecks,
      {[action.researchOptionDeck.researchName] : action.researchOptionDeck});

    case REMOVE_RESEARCH_OPTION_DECK:
    let newRODs = Object.assign({}, researchOptionDecks);
    delete newRODs[action.researchName];
    return newRODs;

		default:
		return researchOptionDecks;
	}
};
