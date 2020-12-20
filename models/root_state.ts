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

export default interface RootState {
  vault: Vault;
  researchStatus: ResearchStatus;
  rates: { productionRates: Rate, consumptionRates: Rate,
    buildingRates: { [buildingId: string] : Rate },
    bGroupRates: { [typeName: string] : Rate }, netRates: Rate };
  buildings: { [id: string] : Building };
  buildingsConstruction: { [typeName: string] : Building };
  researchOptionDecks: { [researchName: string] : ResearchOptionDeck};
  timers: { [name: string] : Timer };
  tradingStatus: TradingStatus;
  account: Account;
  leaders: { [id: string] : Leader };
  ui: { globalState: string, tabSelected: string,
    valueSelected: any, modalDisplayed: string|null, modalStage: string, modalValue: any,
    messages: Message[], memos: Memo[], positioner: Positioner };
}

interface Rate { [resourceName: string] : number };
