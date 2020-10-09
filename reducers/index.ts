import { combineReducers } from 'redux';
import VaultReducer from './vault';

const rootReducer = combineReducers({
  vault: VaultReducer
});

export default rootReducer;
