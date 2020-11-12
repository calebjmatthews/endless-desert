import { combineReducers } from 'redux';
import VaultReducer from './vault';
import ResearchStatusReducer from './research_status';
import RatesReducer from './rates';
import BuildingsReducer from './buildings';
import ResearchOptionDecksReducer from './research_option_decks';
import TimersReducer from './timers';
import TradingStatusReducer from './trading_status';
import UIReducer from './ui';

const rootReducer = combineReducers({
  vault: VaultReducer,
  researchStatus: ResearchStatusReducer,
  rates: RatesReducer,
  buildings: BuildingsReducer,
  researchOptionDecks: ResearchOptionDecksReducer,
  timers: TimersReducer,
  tradingStatus: TradingStatusReducer,
  ui: UIReducer
});

export default rootReducer;
