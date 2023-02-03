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
import { EquipmentMarked } from './equipment_marked';
import Rates from './rates';
import ConversationStatus from './conversation_status';
import QuestStatus from './quest_status';
import Terrain from './terrain';
import ExpeditionStatus from './expedition_status';
import SceneStatus from './scene_status';

export interface RootState extends DBRootState {
  rates: Rates;
  ui: { globalState: string, tabSelected: string, valueSelected: any,
    modalDisplayed: string|null, modalStage: string, modalValue: any,
    memos: Memo[], tabsGlowing: { [tabName: string] : boolean },
    positioner: Positioner };
}

export interface DBRootState {
  vault: Vault;
  researchStatus: ResearchStatus;
  buildings: { [id: string] : Building };
  buildingsConstruction: { [typeName: string] : Building };
  buildingsStorage: { [id: string] : Building };
  researchOptionDecks: { [researchName: string] : ResearchOptionDeck };
  timers: { [name: string] : Timer };
  tradingStatus: TradingStatus;
  account: Account;
  leaders: { [id: string] : Leader };
  equipment: { [id: string] : Equipment };
  equipmentMarked: EquipmentMarked;
  conversationStatus: ConversationStatus;
  questStatus: QuestStatus;
  messages: Message[];
  terrain: Terrain;
  expeditionStatus: ExpeditionStatus;
  sceneStatus: SceneStatus;
}
