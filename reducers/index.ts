import { combineReducers } from 'redux';
import VaultReducer from './vault';
import ResearchStatusReducer from './research_status';
import RatesReducer from './rates';

const rootReducer = combineReducers({
  vault: VaultReducer,
  researchStatus: ResearchStatusReducer,
  rates: RatesReducer
});

export default rootReducer;
