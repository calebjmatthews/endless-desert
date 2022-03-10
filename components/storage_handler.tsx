import React, { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setVault } from '../actions/vault';
import { setResearchStatus } from '../actions/research_status';
import { setBuildings } from '../actions/buildings';
import { setBuildingsConstruction } from '../actions/buildings_construction';
import { setBuildingsStorage } from '../actions/buildings_storage';
import { setResearchOptionDecks } from '../actions/research_option_decks';
import { setTimers } from '../actions/timers';
import { setTradingStatus } from '../actions/trading_status';
import { setAccount, setUserId, setSessionId, setStorageCallSave }
  from '../actions/account';
import { setRates } from '../actions/rates';
import { setLeaders } from '../actions/leaders';
import { setEquipment } from '../actions/equipment';
import { setConversationStatus } from '../actions/conversation_status';
import { setQuestStatus } from '../actions/quest_status';
import { setGlobalState } from '../actions/ui';

import Hourglass from '../models/hourglass';
const hourglass = new Hourglass();
import ResearchStatus from '../models/research_status';
import Account from '../models/account';
import Leader from '../models/leader';
import Building from '../models/building';
import Vault from '../models/vault';
import { buildingsStarting } from '../instances/buildings';
import { memos } from '../instances/memos';
import { MEMOS } from '../enums/memos';
import { SAVE_INTERVAL, STORAGE_GET_URL, STORAGE_UPSERT_URL, SESSION_URL }
  from '../constants';

const TABLE_SETTERS : { [tableName: string] : Function} = {
  'vault': setVault,
  'research_status': setResearchStatus,
  'buildings': setBuildings,
  'buildings_construction': setBuildingsConstruction,
  'buildings_storage': setBuildingsStorage,
  'research_option_decks': setResearchOptionDecks,
  'timers': setTimers,
  'trading_status': setTradingStatus,
  'accounts': setAccount,
  'leaders': setLeaders,
  'equipment': setEquipment,
  'conversation_status': setConversationStatus,
  'quest_status': setQuestStatus
}

export default function StorageHandlerComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const rates = useTypedSelector(state => state.rates);
  const buildings = useTypedSelector(state => state.buildings);
  const buildingsConstruction = useTypedSelector(state => state.buildingsConstruction);
  const buildingsStorage = useTypedSelector(state => state.buildingsStorage);
  const researchOptionDecks = useTypedSelector(state => state.researchOptionDecks);
  const timers = useTypedSelector(state => state.timers);
  const tradingStatus = useTypedSelector(state => state.tradingStatus);
  const account = useTypedSelector(state => state.account);
  const leaders = useTypedSelector(state => state.leaders);
  const equipment = useTypedSelector(state => state.equipment);
  const conversationStatus = useTypedSelector(state => state.conversationStatus);
  const questStatus = useTypedSelector(state => state.questStatus);
  const globalState = useTypedSelector(state => state.ui.globalState);
  const [lastTimestamp, setLastTimestamp] = useState(new Date(Date.now()).valueOf());
  const [callSave, setCallSave] = useState(false);

  useEffect(() => {
    if (globalState == 'loading') {
      sessionCheck()
      .then((checkRes) => {
        if (checkRes.succeeded == true) {
          dispatch(setSessionId(checkRes.sessionId));
          dispatch(setUserId(checkRes.userId));
          fetchFromStorage(checkRes.sessionId, checkRes.userId);
        }
        else {
          const newRates = hourglass.calcRates(buildingsStarting, {});
          dispatch(setRates(newRates));
          dispatch(setGlobalState('landing'));
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!callSave) {
      setCallSave(true);
      dispatch(setStorageCallSave(false));
    }
  }, [account.storageCallSave]);

  useEffect(() => {
    if (callSave) {
      saveIntoStorage();
      setCallSave(false);
    }
  }), [callSave];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCallSave(true);
      setLastTimestamp(new Date(Date.now()).valueOf());
    }, SAVE_INTERVAL);

    return () => { clearTimeout(timeout); }
  }, [lastTimestamp]);

  function sessionCheck(): Promise<any> {
    let sessionId = '';
    let userId = '';
    return Promise.all([
      AsyncStorage.getItem('@ed_session_id'),
      AsyncStorage.getItem('@ed_user_id')
    ])
    .then((asRes): any => {
      if (asRes[0] && asRes[1]) {
        sessionId = asRes[0];
        userId = asRes[1];
        return fetch((SESSION_URL), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, userId })
        });
      }
      return { succeeded: false, message: ('Async storage missing sessionId '
        + 'or userId.') };
    })
    .then((sessionResRaw) => {
      if (sessionResRaw.succeeded == false) { return sessionResRaw; }
      if (sessionResRaw) {
        if (sessionResRaw.json) {
          return sessionResRaw.json();
        }
      }
      return { succeeded: false, message: ('Session response cannot be parsed.') };
    })
    .then((sessionRes) => {
      if (sessionRes.succeeded == false) { return sessionRes; }
      if (sessionRes.data) {
        if (sessionRes.data.succeeded == true) {
          return { succeeded: true, sessionId: sessionId, userId: userId,
            message: 'Session accepted.' };
        }
        return sessionRes;
      }
      return { succeeded: false, message: ('Session response missing data.') };
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }

  function fetchFromStorage(sessionId: string|null = null, userId: string|null = null):
    Promise<boolean> {
    if (!sessionId || !userId) {
      sessionId = account.sessionId;
      userId = account.userId;
    }
    return fetch((STORAGE_GET_URL), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, userId })
    })
    .then((dataRes) => {
      if (dataRes) {
        return dataRes.json();
      }
      return false;
    })
    .then((dataRes) => {
      try {
        if (dataRes.data.accounts.length == 0) {
          return false;
        }
        let buildings: { [id: string] : Building } = {};
        let rawLeaders: { [id: string] : Leader } = {};
        let equipment = {};
        let vault: Vault = new Vault({ lastTimestamp: Date.now(), resources: {} });
        Object.keys(TABLE_SETTERS).map((tableName) => {
          if (dataRes.data[tableName]) {
            let jsonValue: any = {};
            if (dataRes.data[tableName][0]) {
              jsonValue = JSON.parse(dataRes.data[tableName][0].value);
            }
            if (tableName != 'research_status'
              && tableName != 'buildings' && tableName != 'leaders'
              && tableName != 'accounts' && tableName != 'equipment'
              && tableName != 'vault' && jsonValue) {
              dispatch(TABLE_SETTERS[tableName](jsonValue));
            }
            else if (tableName == 'research_status' && jsonValue) {
              let researchStatus = new ResearchStatus(jsonValue);
              researchStatus.checkAndSetVisible();
              researchStatus.setResearchedActions();
              researchStatus.setBuildingsAvailable();
              researchStatus.setUpgradesAvailable();
              dispatch(setResearchStatus(researchStatus));
            }
            else if (tableName == 'buildings' && jsonValue) {
              buildings = jsonValue;
              dispatch(TABLE_SETTERS[tableName](jsonValue));
            }
            else if (tableName == 'leaders' && jsonValue) {
              rawLeaders = jsonValue;
            }
            else if (tableName == 'equipment' && jsonValue) {
              equipment = jsonValue;
              dispatch(TABLE_SETTERS[tableName](jsonValue));
            }
            else if (tableName == 'vault' && jsonValue) {
              vault = jsonValue;
              dispatch(TABLE_SETTERS[tableName](jsonValue));
            }
            else if (tableName == 'accounts' && jsonValue) {
              let account = jsonValue;
              account.sessionId = sessionId;
              dispatch(TABLE_SETTERS[tableName](account));
            }
          }
        });
        let leaders: { [id: string] : Leader } = {};
        Object.keys(rawLeaders).map((id) => {
          let leader = new Leader(rawLeaders[id]);
          leader.calcEffects(equipment, buildings, vault);
          leaders[id] = leader;
        });
        dispatch(setLeaders(leaders));
        const newRates = hourglass.calcRates(buildings, leaders, vault);
        dispatch(setRates(newRates));
        return true;
      }
      catch(error) {
        console.log(error);
        return false;
      }
      return false;
    })
    .then((booleanRes) => {
      if (booleanRes == false) {
        const newRates = hourglass.calcRates(buildingsStarting, {});
        dispatch(setRates(newRates));
        dispatch(setGlobalState('landing'));
      }
      else {
        dispatch(setGlobalState('loaded'));
      }
      return booleanRes;
    })
    .catch((error) => {
      dispatch(setGlobalState('landing'));
      console.log(error);
      return false;
    });
  }

  function saveIntoStorage() {
    if (account.sessionId && account.userId) {
      let accountToSave = new Account(account);
      delete accountToSave.sessionId;
      fetch((STORAGE_UPSERT_URL), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vault: vault,
          research_status: researchStatus,
          buildings: buildings,
          buildings_construction: buildingsConstruction,
          buildings_storage: buildingsStorage,
          research_option_decks: researchOptionDecks,
          timers: timers,
          trading_status: tradingStatus,
          accounts: accountToSave,
          leaders: leaders,
          equipment: equipment,
          conversation_status: conversationStatus,
          quest_status: questStatus,
          sessionId: account.sessionId,
          userId: account.userId
        })
      })
      .then((res) => {
        let tDate = new Date(Date.now());
        console.log('Data saved at ' + tDate.toDateString() + ' ' + tDate.toTimeString());
      })
      .catch((error) => {
        dispatch(setGlobalState('landing'));
        console.log(error);
      });;
    }
  }

  return <></>;
}
