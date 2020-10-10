import React, { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { increaseResources } from '../actions/vault';
import { setRates } from '../actions/rates';

import Hourglass from '../models/hourglass';
import Vault from '../models/vault';
import { buildingsStarting } from '../instances/buildings';

export default function HourglassComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const rates = useTypedSelector(state => state.rates);
  const [lastTimestamp, setLastTimestamp] = useState(new Date(Date.now()).valueOf());
  const hourglass = new Hourglass();

  useEffect(() => {
    const newRates = hourglass.setRates(buildingsStarting);
    dispatch(setRates(newRates));
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (rates) {
        const results = hourglass.calculate(rates, lastTimestamp);
        let resourceDiffs: {type: string, quantity: number}[] = [];
        Object.keys(results.productionSum).map((type) => {
          resourceDiffs.push({type: type, quantity: results.productionSum[type]});
        });
        dispatch(increaseResources(vault, resourceDiffs));
      }
      setLastTimestamp(new Date(Date.now()).valueOf());
    }, 100);
  }, [lastTimestamp]);

  return <></>
}
