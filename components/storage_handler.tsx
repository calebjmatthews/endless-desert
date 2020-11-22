import React, { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

import { setVault } from '../actions/vault';
import { setResearchStatus } from '../actions/research_status';
import { setBuildings } from '../actions/buildings';
import { setResearchOptionDecks } from '../actions/research_option_decks';
import { setTimers } from '../actions/timers';
import { setTradingStatus } from '../actions/trading_status';
import { setAccount } from '../actions/account';
import { setGlobalState, addMemos } from '../actions/ui';

import { memos } from '../instances/memos';
import { MEMOS } from '../enums/memos';

const SAVE_INTERVAL = 60000;
const TABLE_SETTERS : { [tableName: string] : Function} = {
  'vault': setVault,
  'research_status': setResearchStatus,
  'buildings': setBuildings,
  'research_option_decks': setResearchOptionDecks,
  'timers': setTimers,
  'trading_status': setTradingStatus,
  'account': setAccount
}

export default function StorageHandlerComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const rates = useTypedSelector(state => state.rates);
  const buildings = useTypedSelector(state => state.buildings);
  const researchOptionDecks = useTypedSelector(state => state.researchOptionDecks);
  const timers = useTypedSelector(state => state.timers);
  const tradingStatus = useTypedSelector(state => state.tradingStatus);
  const account = useTypedSelector(state => state.account);
  const globalState = useTypedSelector(state => state.ui.globalState);
  const [lastTimestamp, setLastTimestamp] = useState(new Date(Date.now()).valueOf());
  const [callSave, setCallSave] = useState(false);

  useEffect(() => {
    if (globalState == 'loading') {
      fetchFromStorage()
      .then((fetchRes) => {
        console.log('fetchRes');
        console.log(fetchRes);
        if (!fetchRes) {
          dispatch(addMemos([memos[MEMOS.INTRO_ONE], memos[MEMOS.INTRO_TWO]]));
        }
      });
    }
  }, []);

  function fetchFromStorage(): Promise<boolean> {
    return fetch('http://localhost:8080/api/storage/' + account.id)
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
        Object.keys(TABLE_SETTERS).map((tableName) => {
          if (dataRes.data[tableName]) {
            try {
              let jsonValue = JSON.parse(dataRes.data[tableName][0].value);
              dispatch(TABLE_SETTERS[tableName](jsonValue));
            }
            catch {}
          }
        });
        return true;
      }
      catch {
        return false;
      }
      return false;
    })
    .then((booleanRes) => {
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
      // saveIntoStorage();
      setCallSave(false);
    }
  }), [callSave];

  function saveIntoStorage() {
    fetch(('http://localhost:8080/api/storage/' + account.id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vault: vault,
        research_status: researchStatus,
        buildings: buildings,
        research_option_decks: researchOptionDecks,
        timers: timers,
        trading_status: tradingStatus,
        accounts: account
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
