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

export interface GameState {
  vault?: Vault;
  researchStatus?: ResearchStatus;
  rates?: { productionRates: Rate, consumptionRates: Rate,
    buildingRates: { [buildingId: string] : Rate },
    bGroupRates: { [typeName: string] : Rate }, netRates: Rate };
  buildings?: { [id: string] : Building };
  buildingsConstruction?: { [typeName: string] : Building };
  researchOptionDecks?: { [researchName: string] : ResearchOptionDeck};
  timers?: { [name: string] : Timer };
  tradingStatus?: TradingStatus;
  account?: Account;
  leaders?: { [id: string] : Leader };
  equipment?: { [id: string] : Equipment };
  conversationStatus?: ConversationStatus;
}

interface Rate { [typeQuality: string] : number };
