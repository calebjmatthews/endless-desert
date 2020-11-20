import React, { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { increaseResources, consumeResources, setLastTimestamp } from '../actions/vault';
import { setRates } from '../actions/rates';
import { removeTimer, updateTimers } from '../actions/timers';
import { addBuilding } from '../actions/buildings';
import { addMessage } from '../actions/ui';

import Hourglass from '../models/hourglass';
import Vault from '../models/vault';
import Message from '../models/message';
import Building from '../models/building';
import { buildingsStarting } from '../instances/buildings';
import { buildingTypes } from '../instances/building_types';
import { utils } from '../utils';

export default function HourglassComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const rates = useTypedSelector(state => state.rates);
  const timers = useTypedSelector(state => state.timers);
  const buildings = useTypedSelector(state => state.buildings);
  const hourglass = new Hourglass();
  const [localTimestamp, setLocalTimestamp] = useState(new Date(Date.now()).valueOf());
  const [callCalc, setCallCalc] = useState(false);

  useEffect(() => {
    const newRates = hourglass.setRates(buildingsStarting);
    dispatch(setRates(newRates));
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCallCalc(true);
      setLocalTimestamp(new Date(Date.now()).valueOf());
    }, 100);
  }, [localTimestamp]);

  useEffect(() => {
    if (callCalc) {
      setCallCalc(false);
      // Resources to increase
      let rti: {type: string, quantity: number}[] = [];
      // Resources to consume
      let rtc: {type: string, quantity: number}[] = [];
      let recalcRates: boolean = false;
      let tempBuildings = Object.assign({}, buildings);
      if (rates) {
        const results = hourglass.calculate(rates, vault.lastTimestamp);
        let resourceDiffs: {type: string, quantity: number}[] = [];
        Object.keys(results.productionSum).map((type) => {
          resourceDiffs.push({type: type, quantity: results.productionSum[type]});
        });
        rti = resourceDiffs;
      }
      let nTimers = Object.assign({}, timers);
      let resolvedTimers = hourglass.timerTick(nTimers);
      resolvedTimers.map((timer) => {
        if (timer.resourcesToIncrease.length > 0) {
          rti = combineResources(rti, timer.resourcesToIncrease);
        }
        if (timer.resourcesToConsume.length > 0) {
          rtc = combineResources(rtc, timer.resourcesToConsume);
        }
        if (timer.buildingToBuild) {
          let buildingType = buildingTypes[timer.buildingToBuild];
          let count = countBuildings(buildingType.name, buildings);
          let suffix = 1;
          let name = buildingType.name;
          if (count > 0) {
            suffix = count+1;
            name += (' ' + utils.numberToRoman(suffix));
          }
          let building = new Building({
            id: utils.randHex(16),
            buildingType: buildingType.name,
            suffix: suffix,
            name: name
          });
          dispatch(addBuilding(building));
          tempBuildings[building.id] = building;
          recalcRates = true;
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
      dispatch(updateTimers(nTimers));

      if (rti.length > 0) {
        dispatch(increaseResources(vault, rti));
      }
      if (rtc.length > 0) {
        dispatch(consumeResources(vault, rtc));
      }
      if (recalcRates) {
        let newRates = new Hourglass().setRates(tempBuildings);
        dispatch(setRates(newRates));
      }
      dispatch(setLastTimestamp(new Date(Date.now()).valueOf()));
    }
  }, [callCalc]);

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

function countBuildings(buildingName: string,
  buildings: { [id: string] : Building }) {
  let count = 0;
  Object.keys(buildings).map((id) => {
    if (buildings[id].buildingType == buildingName) {
      count++;
    }
  });
  return count;
}
