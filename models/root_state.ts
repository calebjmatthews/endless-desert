import Vault from './vault';
import ResearchStatus from './research_status';
import Building from './building';
import ResearchOptionDeck from './research_option_deck';
import Timer from './timer';
import Message from './message';
import TradingStatus from './trading_status';
import Account from './account';
import Memo from './memo';

export default interface RootState {
  vault: Vault;
  researchStatus: ResearchStatus;
  rates: { productionRates: Rate, consumptionRates: Rate,
    netRates: Rate };
  buildings: { [id: string] : Building };
  researchOptionDecks: { [researchName: string] : ResearchOptionDeck};
  timers: { [name: string] : Timer };
  tradingStatus: TradingStatus;
  account: Account;
  ui: { globalState: string, tabSelected: string,
    valueSelected: any, modalDisplayed: string|null, modalStage: string, modalValue: any,
    messages: Message[], memos: Memo[] };
}

interface Rate { [resourceName: string] : number };
