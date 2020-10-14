import { combineReducers } from 'redux';
import VaultReducer from './vault';
import ResearchStatusReducer from './research_status';
import RatesReducer from './rates';
import BuildingsReducer from './buildings';
import UIReducer from './ui';

const rootReducer = combineReducers({
  vault: VaultReducer,
  researchStatus: ResearchStatusReducer,
  rates: RatesReducer,
  buildings: BuildingsReducer,
  ui: UIReducer
});

export default rootReducer;
