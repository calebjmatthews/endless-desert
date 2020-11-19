import Vault from './vault';
import ResearchStatus from './research_status';
import Building from './building';
import ResearchOptionDeck from './research_option_deck';
import Timer from './timer';
import Message from './message';
import TradingStatus from './trading_status';

export default interface RootState {
  vault: Vault;
  researchStatus: ResearchStatus;
  rates: { productionRates: Rate, consumptionRates: Rate,
    netRates: Rate };
  buildings: { [id: string] : Building };
  researchOptionDecks: { [researchName: string] : ResearchOptionDeck};
  timers: { [name: string] : Timer };
  tradingStatus: TradingStatus;
  ui: {globalState: string, tabSelected: string, valueSelected: any,
    modalDisplayed: string|null, modalStage: string, modalValue: any,
    messages: Message[]};
}

interface Rate { [resourceName: string] : number };
