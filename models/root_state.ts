import Vault from './vault';
import ResearchStatus from './research_status';
import Building from './building';
import ResearchOptionDeck from './research_option_deck';
import Timer from './timer';
import Message from './message';
import TradingStatus from './trading_status';
import Account from './account';
import Memo from './memo';
import Positioner from './positioner';
import Leader from './leader';
import Equipment from './equipment';
import Rates from './rates';

export default interface RootState {
  vault: Vault;
  researchStatus: ResearchStatus;
  rates: Rates;
  buildings: { [id: string] : Building };
  buildingsConstruction: { [typeName: string] : Building };
  researchOptionDecks: { [researchName: string] : ResearchOptionDeck};
  timers: { [name: string] : Timer };
  tradingStatus: TradingStatus;
  account: Account;
  leaders: { [id: string] : Leader };
  equipment: { [id: string] : Equipment };
  conversationStatus: { seen: { [name: string] : number },
    responsesChosen: { [name: string] : number } };
  ui: { globalState: string, tabSelected: string,
    valueSelected: any, modalDisplayed: string|null, modalStage: string, modalValue: any,
    messages: Message[], memos: Memo[], positioner: Positioner };
}
