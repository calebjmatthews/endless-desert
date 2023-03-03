import React, { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

import { updateExpeditionSubState, addStoredTime, updateExpeditionTimers, setLastExpeditionTimestamp, 
  increaseExpeditionResources, consumeExpeditionResources, updateExpeditionCurrentCoordinates,
  updateExpeditionEvent }
  from '../../actions/expedition_status';

import Hourglass from '../../models/hourglass';
import Expedition from '../../models/expedition';
import Rates from '../../models/rates';
import { Scene } from '../../models/scene';
import { dromedaryTypes } from '../../instances/dromedary_types';
import { scenes } from '../../instances/scenes';
import { utils } from '../../utils';
import { HOURGLASS_INTERVAL } from '../../constants';
import { EXPEDITION_EVENTS } from '../../enums/expedition_events';

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
      dispatch(setLastExpeditionTimestamp(new Date(Date.now()).valueOf()));
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
      console.log(`resolvedTimer`, timer);
      if (earliestTimerTimestamp === null || timer.endsAt < earliestTimerTimestamp) {
        earliestTimerTimestamp = timer.endsAt;
      }

      if (timer.eventCheck) {
        const expeditionScenes = Object.keys(scenes).map((sceneId) => scenes[sceneId]);
        const eventOptions: { scene: Scene, weight: number }[] = [];
        expeditionScenes.forEach((scene) => {
          const weight = scene.availableForExpedition({ expedition, gState: {} });
          if (weight) { eventOptions.push({ scene, weight }); }
        });
        const optionSelected: { scene: Scene, weight: number } = 
          utils.randomWeightedSelect(eventOptions);
        dispatch(updateExpeditionEvent({
          expeditionId: expedition.id,
          eventId: optionSelected.scene.id
        }));
      }

      if (timer.eventId === EXPEDITION_EVENTS.OUT_OF_FOOD
        || timer.eventId === EXPEDITION_EVENTS.OUT_OF_DRINK) {
        
      }

      if (timer.eventId === EXPEDITION_EVENTS.ARRIVAL) {

      }
    });
    dispatch(updateExpeditionTimers({ expeditionId: expedition.id, timers: nTimers }));

    let endingTimestamp = new Date(Date.now()).valueOf();
    if (earliestTimerTimestamp !== null) {
      endingTimestamp = earliestTimerTimestamp;

      dispatch(updateExpeditionSubState({
        expeditionId: expedition.id,
        subState: -1
      }));
      dispatch(addStoredTime({
        expeditionId: expedition.id,
        storedTimeToAdd: HOURGLASS_INTERVAL,
      }));
    }
    // 24le / hr = 0.4le / min = 0.0067le / sec = 0.00067le / interval
    const distanceTraveled = expedition.getSpeed(dromedaryTypes) * ((endingTimestamp
      - expeditionStatus.lastTimestamp) / (1000 * 60 * 60));
    const newCoordinates = utils.travelAlongPoints(expedition.currentCoordinates,
      expedition.targetCoordinates, distanceTraveled);
    dispatch(updateExpeditionCurrentCoordinates({ expeditionId: expedition.id, newCoordinates }));
    const rates = expedition.getRates();
    const { productionSum, consumptionSum } = hourglass.calculate(new Rates(rates),
      expeditionStatus.lastTimestamp, endingTimestamp);
    if (Object.keys(productionSum).length > 0) {
      const rti = utils.sumToResources(vault, productionSum);
      dispatch(increaseExpeditionResources({ expeditionId: expedition.id, rti }));
    }
    if (Object.keys(consumptionSum).length > 0) {
      const rtc = utils.sumToResources(vault, consumptionSum);
      dispatch(consumeExpeditionResources({ expeditionId: expedition.id, rtc }));
    }
  }

  return null;
}