import { DBRootState } from './root_state';
import Vault, { DBVault } from './vault';
import ResearchStatus from './research_status';
import Building, { DBBuilding } from './building';
import ResearchOptionDeck, { DBResearchOptionDeck } from './research_option_deck';
import Timer, { DBTimer } from './timer';
import TradingStatus from './trading_status';
import Account from './account';
import Leader, { DBLeader } from './leader';
import Equipment from './equipment';
import ConversationStatus from './conversation_status';
import QuestStatus, { DBQuestStatus } from './quest_status';
import Message, { DBMessage } from './message';
import Terrain from './terrain';
import Icon from './icon';

export default class DBObject {
  vault?: DBVault;
  research_status?: ResearchStatus;
  buildings?: { [id: string] : DBBuilding };
  buildings_construction?: { [id: string] : DBBuilding };
  buildings_storage?: { [id: string] : DBBuilding };
  research_option_decks?: { [researchName: string] : DBResearchOptionDeck };
  timers?: { [name: string] : Timer };
  trading_status?: TradingStatus;
  accounts?: Account;
  leaders?: { [id: string] : DBLeader };
  equipment?: { [id: string] : Equipment };
  conversation_status?: ConversationStatus;
  quest_status?: DBQuestStatus;
  messages?: DBMessage[];
  terrain?: Terrain;
  sessionId?: string;
  userId?: string;

  constructor(obj?: DBRootState, sessionId?: string, userId?: string) {
    if (obj) {
      Object.assign(this, {
        vault: obj.vault?.export(),
        research_status: obj.researchStatus,
        buildings: exportBuildings(obj.buildings),
        buildings_construction: exportBuildings(obj.buildingsConstruction),
        buildings_storage: exportBuildings(obj.buildingsStorage),
        research_option_decks: exportRODs(obj.researchOptionDecks),
        timers: exportTimers(obj.timers),
        trading_status: obj.tradingStatus,
        accounts: obj.account?.export(),
        leaders: exportLeaders(obj.leaders),
        equipment: obj.equipment,
        conversation_status: obj.conversationStatus,
        quest_status: (obj.questStatus ? obj.questStatus.export() : null),
        terrain: obj.terrain,
        sessionId,
        userId
      });
      const messagesToSave: DBMessage[] = [];
      obj.messages?.forEach((message) => {
        if (message.isNew) { messagesToSave.push(message.export()); }
      });
      if (messagesToSave.length > 0) { this.messages = messagesToSave; }
    }
  }

  import(rawDbObj: RawDBObject) {
    const dbObj = new DBObject();

    if (rawDbObj.vault?.[0]?.value) {
      dbObj.vault = JSON.parse(rawDbObj.vault?.[0]?.value);
    }
    if (rawDbObj.research_status?.[0]?.value) {
      dbObj.research_status = JSON.parse(rawDbObj.research_status?.[0]?.value);
    }
    if (rawDbObj.buildings?.[0]?.value) {
      dbObj.buildings = JSON.parse(rawDbObj.buildings?.[0]?.value);
    }
    if (rawDbObj.buildings_construction?.[0]?.value) {
      dbObj.buildings_construction =
        JSON.parse(rawDbObj.buildings_construction?.[0]?.value);
    }
    if (rawDbObj.buildings_storage?.[0]?.value) {
      dbObj.buildings_storage = JSON.parse(rawDbObj.buildings_storage?.[0]?.value);
    }
    if (rawDbObj.research_option_decks?.[0]?.value) {
      dbObj.research_option_decks =
        JSON.parse(rawDbObj.research_option_decks?.[0]?.value);
    }
    if (rawDbObj.timers?.[0]?.value) {
      dbObj.timers = JSON.parse(rawDbObj.timers?.[0]?.value);
    }
    if (rawDbObj.trading_status?.[0]?.value) {
      dbObj.trading_status = JSON.parse(rawDbObj.trading_status?.[0]?.value);
    }
    if (rawDbObj.accounts?.[0]?.value) {
      dbObj.accounts = JSON.parse(rawDbObj.accounts?.[0]?.value);
    }
    if (rawDbObj.leaders?.[0]?.value) {
      dbObj.leaders = JSON.parse(rawDbObj.leaders?.[0]?.value);
    }
    if (rawDbObj.equipment?.[0]?.value) {
      dbObj.equipment = JSON.parse(rawDbObj.equipment?.[0]?.value);
    }
    if (rawDbObj.conversation_status?.[0]?.value) {
      dbObj.conversation_status = JSON.parse(rawDbObj.conversation_status?.[0]?.value);
    }
    if (rawDbObj.quest_status?.[0]?.value) {
      dbObj.quest_status = JSON.parse(rawDbObj.quest_status?.[0]?.value);
    }
    if (rawDbObj.messages) {
      dbObj.messages = rawDbObj.messages.slice();
    }
    if (rawDbObj.terrain) {
      dbObj.terrain = JSON.parse(rawDbObj.terrain?.[0]?.value);
    }

    const impObj: any = {};
    if (dbObj.vault) { impObj.vault = new Vault(dbObj.vault); }
    if (dbObj.research_status) {
      impObj.research_status = new ResearchStatus(dbObj.research_status);
    }
    if (dbObj.buildings) {
      const impBuildings: { [id: string] : Building } = {};
      Object.keys(dbObj.buildings).forEach((id) => {
        const building = dbObj.buildings?.[id] || { buildingType: 'MISSING' };
        impBuildings[id] = new Building({ id, ...building });
      });
      impObj.buildings = impBuildings;
    }
    if (dbObj.buildings_construction) {
      const impBuildings: { [id: string] : Building } = {};
      Object.keys(dbObj.buildings_construction).forEach((id) => {
        const building = dbObj.buildings_construction?.[id]
          || { buildingType: 'MISSING' };
        impBuildings[id] = new Building({ id, ...building });
      });
      impObj.buildings_construction = impBuildings;
    }
    if (dbObj.buildings_storage) {
      const impBuildings: { [id: string] : Building } = {};
      Object.keys(dbObj.buildings_storage).forEach((id) => {
        const building = dbObj.buildings_storage?.[id]
          || { buildingType: 'MISSING' };
        impBuildings[id] = new Building({ id, ...building });
      });
      impObj.buildings_storage = impBuildings;
    }
    if (dbObj.research_option_decks) {
      const impRODs: { [researchName: string] : ResearchOptionDeck } = {};
      Object.keys(dbObj.research_option_decks).forEach((name) => {
        if (dbObj.research_option_decks) {
          const rod = dbObj.research_option_decks[name];
          impRODs[name] = new ResearchOptionDeck(rod);
        }
      });
      impObj.research_option_decks = impRODs;
    }
    if (dbObj.timers) {
      const impTimers: { [name: string] : Timer } = {};
      Object.keys(dbObj.timers).forEach((name) => {
        const timer = dbObj.timers?.[name] || { name: 'MISSING',
          endsAt: new Date(Date.now()).valueOf() }
        impTimers[name] = new Timer(timer);
      });
      impObj.timers = impTimers;
    }
    if (dbObj.trading_status) {
      impObj.trading_status = new TradingStatus(dbObj.trading_status);
    }
    if (dbObj.accounts) {
      impObj.accounts = new Account(dbObj.accounts);
    }
    if (dbObj.leaders) {
      const impLeaders: { [id: string] : Leader } = {};
      Object.keys(dbObj.leaders).forEach((id) => {
        if (dbObj.leaders) { impLeaders[id] = new Leader(dbObj.leaders[id]); }
      });
      impObj.leaders = impLeaders;
    }
    if (dbObj.equipment) {
      const impEquipment: { [id: string] : Equipment } = {};
      Object.keys(dbObj.equipment).forEach((id) => {
        if (dbObj.equipment) { impEquipment[id] = new Equipment(dbObj.equipment[id]); }
        // @ts-ignore
        delete impEquipment[id].leader;
      });
      impObj.equipment = impEquipment;
    }
    if (dbObj.conversation_status) {
      impObj.conversation_status = new ConversationStatus(dbObj.conversation_status);
    }
    if (dbObj.quest_status) {
      impObj.quest_status = new QuestStatus(dbObj.quest_status);
    }
    if (dbObj.messages) {
      const dbMessages = dbObj.messages.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });
      impObj.messages = dbMessages.map((message) => ( new Message({
          ...message,
          timestamp: new Date(message.timestamp),
          icon: message.icon ? new Icon(JSON.parse(message.icon)) : undefined,
          isNew: false
      }) ));
    }
    if (dbObj.terrain) {
      impObj.terrain = new Terrain(dbObj.terrain);
    }
    return impObj;
  }
}

interface RawDBObject {
  vault: [{ value: string }],
  research_status: [{ value: string }],
  buildings: [{ value: string }],
  buildings_construction: [{ value: string }],
  buildings_storage: [{ value: string }],
  research_option_decks: [{ value: string }],
  timers: [{ value: string }],
  trading_status: [{ value: string }],
  accounts: [{ value: string }],
  leaders: [{ value: string }],
  equipment: [{ value: string }],
  conversation_status: [{ value: string }],
  quest_status: [{ value: string }],
  messages: [{ timestamp: number, text: string, type: string, icon: string }],
  terrain: [{ value: string }]
}

const exportBuildings = (buildings: { [id: string] : Building }) => {
  const expBuildings: { [id: string] : DBBuilding } = {};
  Object.keys(buildings || {}).forEach((id) => {
    const building = buildings[id];
    expBuildings[id] = building.export();
  });
  return expBuildings;
}

const exportRODs = (rods: { [id: string] : ResearchOptionDeck }) => {
  const expRODs: { [researchName: string] : DBResearchOptionDeck } = {};
  Object.keys(rods || {}).forEach((researchName) => {
    const rod = rods[researchName];
    if (rod.stepsNeeded > rod.stepsCompleted) {
      expRODs[researchName] = rod.export();
    }
  });
  return expRODs;
}

const exportTimers = (timers: { [name: string] : Timer }) => {
  const expTimers: { [name: string] : DBTimer } = {};
  Object.keys(timers || {}).forEach((name) => {
    const timer = timers[name];
    expTimers[name] = timer.export();
  });
  return expTimers;
}

const exportLeaders = (leaders: { [id: string] : Leader }) => {
  const expLeaders: { [name: string] : DBLeader } = {};
  Object.keys(leaders || {}).forEach((name) => {
    const leader = leaders[name];
    expLeaders[name] = leader.export();
  });
  return expLeaders;
}
