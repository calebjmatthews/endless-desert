import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import AsyncStorage from '@react-native-async-storage/async-storage';

import IconComponent from '../components/icon';
import { styles } from '../styles';
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
import { setEquipmentMarked } from '../actions/equipment_marked';
import { setConversationStatus } from '../actions/conversation_status';
import { setQuestStatus } from '../actions/quest_status';
import { setGlobalState } from '../actions/ui';
import { setMessages, setMessagesNotNew } from '../actions/messages';
import { setTerrain } from '../actions/terrain';

import Hourglass from '../models/hourglass';
const hourglass = new Hourglass();
import ResearchStatus from '../models/research_status';
import Account from '../models/account';
import Leader from '../models/leader';
import Building from '../models/building';
import Vault from '../models/vault';
import DBObject from '../models/db_object';
import Terrain from '../models/terrain';
import EquipmentEffect from '../models/equipment_effect';
import { genStartingBuildings } from '../instances/buildings';
import { SAVE_INTERVAL, STORAGE_GET_URL, STORAGE_UPSERT_URL, SESSION_URL,
  FADE_IN_DELAY } from '../constants';
import { utils } from '../utils';

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
  'equipmentMarked': setEquipmentMarked,
  'conversation_status': setConversationStatus,
  'quest_status': setQuestStatus,
  'messages': setMessages,
  'terrain': setTerrain
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
  const equipmentMarked = useTypedSelector(state => state.equipmentMarked);
  const conversationStatus = useTypedSelector(state => state.conversationStatus);
  const questStatus = useTypedSelector(state => state.questStatus);
  const globalState = useTypedSelector(state => state.ui.globalState);
  const messages = useTypedSelector(state => state.messages);
  const terrain = useTypedSelector(state => state.terrain);
  const [lastTimestamp, setLastTimestamp] = useState(new Date(Date.now()).valueOf());
  const [callSave, setCallSave] = useState(false);

  const opacityAnim = useRef(new Animated.Value(0.25)).current;
  useEffect(() => {
    Animated.timing(
      opacityAnim, { toValue: 0, duration: FADE_IN_DELAY, useNativeDriver: true }
    ).start();
  }, []);

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
          initNewFile();
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
      Animated.timing(
        opacityAnim, { toValue: 0.25, duration: 0, useNativeDriver: true }
      ).start(() => {
        Animated.timing(
          opacityAnim, { toValue: 0, duration: FADE_IN_DELAY, useNativeDriver: true }
        ).start();
      });
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

  function fetchFromStorage(sessionId?: string, userId?: string):
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
    .then((rawDataRes) => {
      try {
        if (rawDataRes.data.accounts.length == 0) {
          return false;
        }
        const importedState = new DBObject().import(rawDataRes.data);
        console.log('importedState');
        console.log(importedState);
        let rawBuildings: { [id: string] : Building } = {};
        let rawLeaders: { [id: string] : Leader } = {};
        let equipment = {};
        let treasureEffects: EquipmentEffect[] = [];
        let vault: Vault = new Vault({ lastTimestamp: Date.now(), resources: {} });

        Object.keys(TABLE_SETTERS).map((tableName) => {
          if (importedState[tableName]) {
            let tableValue: any = {};
            if (importedState[tableName]) {
              tableValue = importedState[tableName];
            }
            if (tableName != 'research_status'
              && tableName != 'buildings' && tableName != 'leaders'
              && tableName != 'accounts' && tableName != 'equipment'
              && tableName != 'vault' && tableValue) {
              dispatch(TABLE_SETTERS[tableName](tableValue));
            }
            else if (tableName == 'research_status' && tableValue) {
              let researchStatus = new ResearchStatus(tableValue);
              researchStatus.checkAndSetVisible();
              researchStatus.setResearchedActions();
              researchStatus.setBuildingsAvailable();
              researchStatus.setUpgradesAvailable();
              dispatch(setResearchStatus(researchStatus));
            }
            else if (tableName == 'buildings' && tableValue) {
              rawBuildings = tableValue;
            }
            else if (tableName == 'leaders' && tableValue) {
              rawLeaders = tableValue;
            }
            else if (tableName == 'equipment' && tableValue) {
              equipment = tableValue;
              dispatch(TABLE_SETTERS[tableName](tableValue));
            }
            else if (tableName == 'vault' && tableValue) {
              vault = tableValue;
              dispatch(TABLE_SETTERS[tableName](tableValue));
            }
            else if (tableName == 'accounts' && tableValue) {
              let account: Account = tableValue;
              account.sessionId = sessionId;
              account.calcTreasureEffects();
              treasureEffects = account.treasureEffects;
              dispatch(TABLE_SETTERS[tableName](account));
            }
          }
        });

        let buildings: { [id: string] : Building } = {};
        Object.keys(rawBuildings).forEach((id) => {
          const building = rawBuildings[id];
          if (building.recipe) {
            if (vault.isResourceCustomAndBroken(building.recipe?.produces?.[0]?.type)) {
              console.log(`Broken building recipe removed: `, building.recipe);
              building.recipe = null;
              building.recipeSelected = -1;
            }
          }
          buildings[id] = building;
        });
        dispatch(setBuildings(buildings));

        let leaders: { [id: string] : Leader } = {};
        Object.keys(rawLeaders).map((id) => {
          let leader = new Leader(rawLeaders[id]);
          if (vault.isResourceCustomAndBroken(leader.eating?.split('|')[0])) { leader.eating = null; }
          if (vault.isResourceCustomAndBroken(leader.drinking?.split('|')[0])) { leader.drinking = null; }
          leader.calcEffects(equipment, buildings, vault, treasureEffects);
          leaders[id] = leader;
        });
        dispatch(setLeaders(leaders));

        const newRates = hourglass.calcRates(buildings, leaders, treasureEffects, vault);
        dispatch(setRates(newRates));
        return true;
      }
      catch(error) {
        console.log(error);
        return false;
      }
    })
    .then((booleanRes) => {
      if (booleanRes == false) {
        initNewFile();
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
      const accountToSave = new Account(account);
      delete accountToSave.sessionId;
      const dbObject = new DBObject({
        vault: vault,
        researchStatus: researchStatus,
        buildings: buildings,
        buildingsConstruction: buildingsConstruction,
        buildingsStorage: buildingsStorage,
        researchOptionDecks: researchOptionDecks,
        timers: timers,
        tradingStatus: tradingStatus,
        account: accountToSave,
        leaders: leaders,
        equipment: equipment,
        equipmentMarked: equipmentMarked,
        conversationStatus: conversationStatus,
        questStatus: questStatus,
        messages: messages,
        terrain: terrain
      }, account.sessionId, account.userId);
      const body = JSON.stringify(dbObject);
      fetch((STORAGE_UPSERT_URL), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
      .then((res) => {
        let tDate = new Date(Date.now());
        console.log('Data saved at ' + tDate.toDateString() + ' ' + tDate.toTimeString());
        dispatch(setMessagesNotNew());
      })
      .catch((error) => {
        dispatch(setGlobalState('landing'));
        console.log(error);
      });;
    }
  }

  function initNewFile() {
    const { terrain, buildingMap } = new Terrain(null).generateTerrain(null);
    dispatch(setTerrain(terrain));
    const buildingsStarting = genStartingBuildings(buildingMap);
    dispatch(setBuildings(buildingsStarting));
    const newRates = hourglass.calcRates(buildingsStarting, {}, []);
    dispatch(setRates(newRates));
    dispatch(setGlobalState('landing'));
  }

  return (
    <Animated.View style={StyleSheet.flatten([styles.saveButtonWrapper,
      {opacity: opacityAnim}])}>
      <TouchableOpacity onPress={() => { setCallSave(true) }} >
        <IconComponent provider="FontAwesome" name="save" color="#fff" size={30} />
      </TouchableOpacity>
    </Animated.View>
  );
}
