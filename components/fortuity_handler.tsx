import React, { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

import Fortuity from '../models/fortuity';
import { fortuities } from '../instances/fortuities';
import { utils } from '../utils';

const CHECK_INTERVAL = 60000;

export default function FortuityHandlerComponent() {
  const dispatch = useDispatch();
  const [lastTimestamp, setLastTimestamp] = useState(new Date(Date.now()).valueOf());
  const [callCheck, setCallCheck] = useState(false);
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
  const equipment = useTypedSelector(state => state.equipment);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCallCheck(true);
      setLastTimestamp(new Date(Date.now()).valueOf());
    }, CHECK_INTERVAL);
  }, [lastTimestamp]);

  useEffect(() => {
    if (callCheck) {
      fortuityCheck();
      setCallCheck(false);
    }
  }), [callCheck];

  function fortuityCheck() {
    let fortuityPool: Fortuity[] = [];
    Object.keys(fortuities).map((fName) => {
      const fortuity = fortuities[fName];
      if (fortuity.repeatable || account.fortuitiesSeen[fName] == undefined) {
        if (fortuity.available({ vault, researchStatus, rates, buildings,
          buildingsConstruction, researchOptionDecks, timers, tradingStatus, account, leaders, equipment })) {
          fortuityPool.push(fortuity);
        }
      }
    });

    if (fortuityPool.length > 0) {
      const fortuity = utils.randomWeightedSelect(fortuityPool);
      console.log('fortuity');
      console.log(fortuity);
    }
    return null;
  }

  return <></>;
}
