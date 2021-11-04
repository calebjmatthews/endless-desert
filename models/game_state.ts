import Vault from './vault';
import ResearchStatus from './research_status';
import Building from './building';
import ResearchOptionDeck from './research_option_deck';
import Timer from './timer';
import TradingStatus from './trading_status';
import Account from './account';
import Leader from './leader';
import Equipment from './equipment';
import ConversationStatus from './conversation_status';
import QuestStatus from './quest_status';

export interface GameState {
  vault?: Vault;
  researchStatus?: ResearchStatus;
  buildings?: { [id: string] : Building };
  buildingsStorage?: { [id: string] : Building };
  timers?: { [name: string] : Timer };
  tradingStatus?: TradingStatus;
  account?: Account;
  leaders?: { [id: string] : Leader };
  equipment?: { [id: string] : Equipment };
  conversationStatus?: ConversationStatus;
  questStatus?: QuestStatus;
}

interface Rate { [typeQuality: string] : number };
