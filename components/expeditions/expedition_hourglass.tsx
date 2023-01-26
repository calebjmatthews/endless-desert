import React, { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

import { addStoredTime, updateExpeditionTimers, setLastTimestamp, increaseResources, consumeResources } 
  from '../../actions/expedition_status';

import Hourglass from '../../models/hourglass';
import Expedition from '../../models/expedition';
import Rates from '../../models/rates';
import { utils } from '../../utils';
import { HOURGLASS_INTERVAL } from '../../constants';

export default function ExpeditionHourglassComponent() {
  const dispatch = useDispatch();
  const expeditionStatus = useTypedSelector(state => state.expeditionStatus);
  const vault = useTypedSelector(state => state.vault);

  const hourglass = new Hourglass();
  const [localTimestamp, setLocalTimestamp] = useState(new Date(Date.now()).valueOf());
  const [hourglassState, setHourglassState] = useState('waiting');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHourglassState('callTick');
      setLocalTimestamp(new Date(Date.now()).valueOf());
    }, HOURGLASS_INTERVAL);

    return () => { clearTimeout(timeout); }
  }, [localTimestamp]);

  useEffect(() => {
    if (hourglassState === 'callTick') {
      setHourglassState('waiting');
      Object.keys(expeditionStatus.expeditions).forEach((expeditionId) => {
        const expedition = expeditionStatus.expeditions[expeditionId];
        if (expedition.subState === -1) {
          handlePausedExpedition(expedition);
        }
        if ((expedition.state === 'embarking' || expedition.state === 'returning')
        && expedition.subState === 0) {
          handleTravelingExpedition(expedition);
        }
      });
      dispatch(setLastTimestamp(new Date(Date.now()).valueOf()));
    }
  }, [hourglassState]);

  const handlePausedExpedition = (expedition: Expedition) => {
    dispatch(addStoredTime({
      expeditionId: expedition.id,
      storedTimeToAdd: HOURGLASS_INTERVAL
    }));
  }

  const handleTravelingExpedition = (expedition: Expedition) => {
    let nTimers = Object.assign({}, expedition.timers);
    let resolvedTimers = hourglass.timerTick(nTimers);
    let earliestTimerTimestamp: number|null = null;
    // Todo: Don't resolve timers that happen after earliest timestamp
    resolvedTimers.forEach((timer) => {
      if (earliestTimerTimestamp === null || timer.endsAt < earliestTimerTimestamp) {
        earliestTimerTimestamp = timer.endsAt;
      }

      if (timer.eventCheck) {

      }
      if (timer.eventId) {
        
      }
    });
    dispatch(updateExpeditionTimers({ expeditionId: expedition.id, timers: nTimers }));

    let endingTimestamp = new Date(Date.now()).valueOf();
    if (earliestTimerTimestamp !== null) {
      endingTimestamp = earliestTimerTimestamp;

      dispatch(addStoredTime({
        expeditionId: expedition.id,
        storedTimeToAdd: HOURGLASS_INTERVAL
      }));
    }
    const rates = expedition.getRates();
    const { productionSum, consumptionSum } = hourglass.calculate(new Rates(rates),
      expeditionStatus.lastTimestamp, endingTimestamp);
    if (Object.keys(productionSum).length > 0) {
      const rti = utils.sumToResources(vault, productionSum);
      dispatch(increaseResources({ expeditionId: expedition.id, rti }));
    }
    if (Object.keys(consumptionSum).length > 0) {
      const rtc = utils.sumToResources(vault, consumptionSum);
      dispatch(consumeResources({ expeditionId: expedition.id, rtc }));
    }
  }

  return null;
}