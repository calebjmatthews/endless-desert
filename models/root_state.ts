import Vault from './vault';
import ResearchStatus from './research_status';
import Building from './building';
import ResearchOptionDeck from './research_option_deck';

export default interface RootState {
  vault: Vault;
  researchStatus: ResearchStatus;
  rates: { productionRates: Rate, consumptionRates: Rate,
    netRates: Rate };
  buildings: { [id: string] : Building };
  researchOptionDecks: { [researchName: string] : ResearchOptionDeck};
  ui: {tabSelected: string, valueSelected: string, modalDisplayed: string|null};
}

interface Rate { [resourceName: string] : number };
