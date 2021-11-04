import { combineReducers } from 'redux';
import VaultReducer from './vault';
import ResearchStatusReducer from './research_status';
import RatesReducer from './rates';
import BuildingsReducer from './buildings';
import BuildingsConstructionReducer from './buildings_construction';
import BuildingsStorageReducer from './buildings_storage';
import ResearchOptionDecksReducer from './research_option_decks';
import TimersReducer from './timers';
import TradingStatusReducer from './trading_status';
import AccountReducer from './account';
import LeadersReducer from './leaders';
import EquipmentReducer from './equipment';
import ConversationStatusReducer from './conversation_status';
import QuestStatusReducer from './quest_status';
import UIReducer from './ui';

const rootReducer = combineReducers({
  vault: VaultReducer,
  researchStatus: ResearchStatusReducer,
  rates: RatesReducer,
  buildings: BuildingsReducer,
  buildingsConstruction: BuildingsConstructionReducer,
  buildingsStorage: BuildingsStorageReducer,
  researchOptionDecks: ResearchOptionDecksReducer,
  timers: TimersReducer,
  tradingStatus: TradingStatusReducer,
  account: AccountReducer,
  leaders: LeadersReducer,
  equipment: EquipmentReducer,
  conversationStatus: ConversationStatusReducer,
  questStatus: QuestStatusReducer,
  ui: UIReducer
});

export default rootReducer;
