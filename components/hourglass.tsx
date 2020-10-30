import React, { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { increaseResources, consumeResources } from '../actions/vault';
import { setRates } from '../actions/rates';
import { removeTimer } from '../actions/timers';
import { addMessage } from '../actions/ui';

import Hourglass from '../models/hourglass';
import Vault from '../models/vault';
import Message from '../models/message';
import { buildingsStarting } from '../instances/buildings';

export default function HourglassComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const rates = useTypedSelector(state => state.rates);
  const timers = useTypedSelector(state => state.timers);
  const [lastTimestamp, setLastTimestamp] = useState(new Date(Date.now()).valueOf());
  const hourglass = new Hourglass();

  useEffect(() => {
    const newRates = hourglass.setRates(buildingsStarting);
    dispatch(setRates(newRates));
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Resources to increase
      let rti: {type: string, quantity: number}[] = [];
      // Resources to consume
      let rtc: {type: string, quantity: number}[] = [];
      if (rates) {
        const results = hourglass.calculate(rates, lastTimestamp);
        let resourceDiffs: {type: string, quantity: number}[] = [];
        Object.keys(results.productionSum).map((type) => {
          resourceDiffs.push({type: type, quantity: results.productionSum[type]});
        });
        rti = resourceDiffs;
      }
      let resolvedTimers = hourglass.timerTick(timers);
      resolvedTimers.map((timer) => {
        if (timer.resourcesToIncrease.length > 0) {
          rti = combineResources(rti, timer.resourcesToIncrease);
        }
        if (timer.resourcesToConsume.length > 0) {
          rtc = combineResources(rtc, timer.resourcesToConsume);
        }
        if (timer.messageToDisplay) {
          dispatch(addMessage(new Message({
            text: timer.messageToDisplay,
            type: '',
            timestamp: new Date(Date.now()),
            icon: timer.iconToDisplay,
            foregroundColor: timer.iconForegroundColor,
            backgroundColor: timer.iconBackgroundColor
          })));
        }
        dispatch(removeTimer(timer));
      });

      if (rti.length > 0) {
        dispatch(increaseResources(vault, rti));
      }
      if (rtc.length > 0) {
        dispatch(consumeResources(vault, rtc));
      }
      setLastTimestamp(new Date(Date.now()).valueOf());
    }, 100);
  }, [lastTimestamp]);

  return <></>
}

function combineResources(resources: {type: string, quantity: number}[],
  newResources: {type: string, quantity: number}[]) {
  let resourceMap: { [type: string] : number} = {};
  resources.map((r, index) => {
    resourceMap[r.type] = index;
  });
  newResources.map((r) => {
    if (resourceMap[r.type]) {
      resources[resourceMap[r.type]].quantity += r.quantity;
    }
    else {
      resources.push(r);
    }
  });
  return resources;
}
