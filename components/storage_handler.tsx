import React, { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

import { setVault } from '../actions/vault';
import { setResearchStatus } from '../actions/research_status';
import { setBuildings } from '../actions/buildings';
import { setBuildingsConstruction } from '../actions/buildings_construction';
import { setResearchOptionDecks } from '../actions/research_option_decks';
import { setTimers } from '../actions/timers';
import { setTradingStatus } from '../actions/trading_status';
import { setAccount } from '../actions/account';
import { setRates } from '../actions/rates';
import { setLeaders } from '../actions/leaders';
import { setGlobalState, addMemos } from '../actions/ui';

import Hourglass from '../models/hourglass';
const hourglass = new Hourglass();
import ResearchStatus from '../models/research_status';
import { buildingsStarting } from '../instances/buildings';
import { memos } from '../instances/memos';
import { MEMOS } from '../enums/memos';

const SAVE_INTERVAL = 60000;
// const STORAGE_URL = 'http://64.225.48.128:8080/api/storage/';
const STORAGE_URL = 'http://localhost:8080/api/storage/'
const TABLE_SETTERS : { [tableName: string] : Function} = {
  'vault': setVault,
  'research_status': setResearchStatus,
  'buildings': setBuildings,
  'buildings_construction': setBuildingsConstruction,
  'research_option_decks': setResearchOptionDecks,
  'timers': setTimers,
  'trading_status': setTradingStatus,
  'accounts': setAccount,
  'leaders': setLeaders
}

export default function StorageHandlerComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const rates = useTypedSelector(state => state.rates);
  const buildings = useTypedSelector(state => state.buildings);
  const buildingsConstruction = useTypedSelector(state => state.buildingsConstruction);
  const researchOptionDecks = useTypedSelector(state => state.researchOptionDecks);
  const timers = useTypedSelector(state => state.timers);
  const tradingStatus = useTypedSelector(state => state.tradingStatus);
  const account = useTypedSelector(state => state.account);
  const leaders = useTypedSelector(state => state.leaders);
  const globalState = useTypedSelector(state => state.ui.globalState);
  const [lastTimestamp, setLastTimestamp] = useState(new Date(Date.now()).valueOf());
  const [callSave, setCallSave] = useState(false);

  useEffect(() => {
    if (globalState == 'loading') {
      fetchFromStorage()
      .then((fetchRes) => {
        if (!fetchRes) {
          dispatch(addMemos([memos[MEMOS.INTRO_ONE], memos[MEMOS.INTRO_TWO]]));
        }
      });
    }
  }, []);

  function fetchFromStorage(): Promise<boolean> {
    return fetch(STORAGE_URL + account.id)
    .then((dataRes) => {
      if (dataRes) {
        return dataRes.json()
      }
      return false;
    })
    .then((dataRes) => {
      try {
        if (dataRes.data.accounts.length == 0) {
          return false;
        }
        let buildings = {};
        let leaders = {};
        Object.keys(TABLE_SETTERS).map((tableName) => {
          if (dataRes.data[tableName]) {
            let jsonValue = JSON.parse(dataRes.data[tableName][0].value);
            if (tableName != 'research_status'
              && tableName != 'buildings' && tableName != 'leaders' && jsonValue) {
              dispatch(TABLE_SETTERS[tableName](jsonValue));
            }
            else if (tableName == 'research_status' && jsonValue) {
              let researchStatus = new ResearchStatus(jsonValue);
              researchStatus.checkAndSetVisible();
              researchStatus.setResearchedActions();
              researchStatus.setBuildingsAvailable();
              dispatch(setResearchStatus(researchStatus));
            }
            else if (tableName == 'buildings' && jsonValue) {
              buildings = jsonValue;
              dispatch(TABLE_SETTERS[tableName](jsonValue));
            }
            else if (tableName == 'leaders' && jsonValue) {
              leaders = jsonValue;
              dispatch(TABLE_SETTERS[tableName](jsonValue));
            }
          }
        });
        const newRates = hourglass.setRates(buildings, leaders);
        dispatch(setRates(newRates));
        return true;
      }
      catch {
        return false;
      }
      return false;
    })
    .then((booleanRes) => {
      if (booleanRes == false) {
        const newRates = hourglass.setRates(buildingsStarting, {});
        dispatch(setRates(newRates));
      }
      dispatch(setGlobalState('loaded'));
      return booleanRes;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCallSave(true);
      setLastTimestamp(new Date(Date.now()).valueOf());
    }, SAVE_INTERVAL);
  }, [lastTimestamp]);

  useEffect(() => {
    if (callSave) {
      saveIntoStorage();
      setCallSave(false);
    }
  }), [callSave];

  function saveIntoStorage() {
    fetch((STORAGE_URL + account.id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vault: vault,
        research_status: researchStatus,
        buildings: buildings,
        buildings_construction: buildingsConstruction,
        research_option_decks: researchOptionDecks,
        timers: timers,
        trading_status: tradingStatus,
        accounts: account,
        leaders: leaders
      })
    })
    .then((res) => {
      let tDate = new Date(Date.now());
      console.log('Data saved at ' + tDate.toDateString() + ' ' + tDate.toTimeString());
    })
    .catch((error) => {
      console.error(error);
    });;
  }

  return <></>;
}
