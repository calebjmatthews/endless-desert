import React, { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { increaseResources, consumeResources, setLastTimestamp }
  from '../actions/vault';
import { setRates } from '../actions/rates';
import { removeTimer, updateTimers, addTimer } from '../actions/timers';
import { addBuilding, replaceBuilding } from '../actions/buildings';
import { addMessage, addMemos } from '../actions/ui';
import { setIntroState, unlockTab, setCurrentFortuity, fortuitySeen }
  from '../actions/account';

import Hourglass from '../models/hourglass';
import Timer from '../models/timer';
import Vault from '../models/vault';
import Message from '../models/message';
import Building from '../models/building';
import Fortuity from '../models/fortuity';
import Memo from '../models/memo';
import Resource from '../models/resource';
import Rates from '../models/rates';
import Leader from '../models/leader';
import { buildingsStarting } from '../instances/buildings';
import { buildingTypes } from '../instances/building_types';
import { memos } from '../instances/memos';
import { fortuities } from '../instances/fortuities';1
import { utils } from '../utils';
import { MEMOS } from '../enums/memos';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { INTRO_STATES } from '../enums/intro_states';
import { BUILDING_TYPES } from '../enums/building_types';
import { TABS } from '../enums/tabs';

const FORTUITY_BASE = 10000;

export default function HourglassComponent() {
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
  const equipment = useTypedSelector(state => state.equipment);
  const hourglass = new Hourglass();
  const [localTimestamp, setLocalTimestamp] = useState(new Date(Date.now()).valueOf());
  const [callTick, setCallTick] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCallTick(true);
      setLocalTimestamp(new Date(Date.now()).valueOf());
    }, 100);

    return () => { clearTimeout(timeout); }
  }, [localTimestamp]);

  useEffect(() => {
    if (callTick) {
      setCallTick(false);
      // Resources to increase
      let rti: Resource[] = [];
      // Resources to consume
      let rtc: Resource[] = [];
      let recalcRates: boolean = false;
      let tempBuildings = Object.assign({}, buildings);
      if (rates) {
        const results = hourglass.callCalcs(rates, vault, tempBuildings, {});
        rti = utils.sumToResources(vault, results.productionSum);
        rtc = utils.sumToResources(vault, results.consumptionSum);
      }
      let nTimers = Object.assign({}, timers);
      let resolvedTimers = hourglass.timerTick(nTimers);
      resolvedTimers.map((timer) => {
        if (timer.resourcesToIncrease) {
          if (timer.resourcesToIncrease.length > 0) {
            rti = combineResources(rti, timer.resourcesToIncrease);
          }
        }
        if (timer.resourcesToConsume) {
          if (timer.resourcesToConsume.length > 0) {
            rtc = combineResources(rtc, timer.resourcesToConsume);
          }
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
            name: name,
            paidCosts: {},
            paidResources: [],
            paidUpgradeCosts: {},
            paidUpgradeResources: [],
            recipe: null
          });
          dispatch(addBuilding(building));
          tempBuildings[building.id] = building;
          recalcRates = true;
        }
        if (timer.buildingToUpgrade) {
          let building = buildings[timer.buildingToUpgrade];
          let buildingType = buildingTypes[building.buildingType];
          if (buildingType.upgradesInto) {
            let upgBuildingType = buildingTypes[buildingType.upgradesInto];
            let count = countBuildings(upgBuildingType.name, buildings);
            let suffix = 1;
            let name = upgBuildingType.name;
            if (count > 0) {
              suffix = count+1;
              name += (' ' + utils.numberToRoman(suffix));
            }
            let upgBuilding = new Building({
              id: building.id,
              buildingType: buildingType.upgradesInto,
              suffix: suffix,
              name: name,
              paidCosts: {},
              paidResources: [],
              paidUpgradeCosts: {},
              paidUpgradeResources: [],
              recipe: null
            });
            dispatch(replaceBuilding(upgBuilding));
            tempBuildings[building.id] = upgBuilding;
            recalcRates = true;
          }
          if (buildingType.name == BUILDING_TYPES.BROKEN_CISTERN) {
            cisternRepaired();
          }
          else if (buildingType.name == BUILDING_TYPES.FALLOW_FIELD) {
            fieldRepaired();
          }
          else if (buildingType.name == BUILDING_TYPES.DECAYING_STUDY) {
            studyRepaired();
          }
          else if (buildingType.name == BUILDING_TYPES.RUINED_HUTS) {
            hutsRepaired();
          }
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
        if (timer.fortuityCheck) {
          const fortuity = fortuityCheck();
          if (fortuity) {
            dispatch(setCurrentFortuity(fortuity));
            dispatch(fortuitySeen(fortuity.name));
          }
          else {
            dispatch(addTimer(new Timer({
              name: 'Fortuity',
              startedAt: new Date(Date.now()).valueOf(),
              endsAt: (new Date(Date.now()).valueOf()
                + Math.floor(utils.random() * FORTUITY_BASE) + (FORTUITY_BASE / 2)),
              progress: 0,
              fortuityCheck: true,
              remainingLabel: '',
              messageToDisplay: null,
              iconToDisplay: null,
              iconForegroundColor: null,
              iconBackgroundColor: null
            })));
          }
        }
        dispatch(removeTimer(timer));
      });
      dispatch(updateTimers(nTimers));

      if (rti.length > 0) {
        dispatch(increaseResources(vault, rti));
      }
      let emptiedTQs: string[] = [];
      if (rtc.length > 0) {
        dispatch(consumeResources(vault, rtc));
        emptiedTQs = vault.checkForEmptying(rtc);
        if (emptiedTQs.length > 0) { recalcRates = true; }
      }
      if (recalcRates) {
        let newRates = new Hourglass().calcRates(tempBuildings, leaders, vault);
        dispatch(setRates(newRates));
      }
      dispatch(setLastTimestamp(new Date(Date.now()).valueOf()));
    }
  }, [callTick]);

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
      return utils.randomWeightedSelect(fortuityPool);
    }
    return null;
  }

  function cisternRepaired() {
    dispatch(addMemos([memos[MEMOS.CISTERN_REPAIRED],
      memos[MEMOS.CISTERN_REPAIRED_NEXT]]));
    dispatch(increaseResources(vault,
      [new Resource({ type: RESOURCE_TYPES.WATER, quality: 0, quantity: 2080 })]));
    dispatch(setIntroState(INTRO_STATES.RESTORE_FIELD));
  }

  function fieldRepaired() {
    dispatch(addMemos([memos[MEMOS.FIELD_REPAIRED], memos[MEMOS.FIELD_REPAIRED_NEXT]]));
    dispatch(setIntroState(INTRO_STATES.REFURBISH_STUDY));
  }

  function studyRepaired() {
    dispatch(addMemos([memos[MEMOS.STUDY_REPAIRED], memos[MEMOS.STUDY_REPAIRED_NEXT]]));
    dispatch(setIntroState(INTRO_STATES.REFURBISH_HUTS));
    dispatch(unlockTab(TABS.RESEARCH));
  }

  function hutsRepaired() {
    dispatch(setIntroState(INTRO_STATES.DONE));
    dispatch(addTimer(new Timer({
      name: 'Fortuity',
      startedAt: new Date(Date.now()).valueOf(),
      endsAt: (new Date(Date.now()).valueOf()
        + Math.floor(utils.random() * FORTUITY_BASE) + (FORTUITY_BASE / 2)),
      progress: 0,
      fortuityCheck: true,
      remainingLabel: '',
      messageToDisplay: null,
      iconToDisplay: null,
      iconForegroundColor: null,
      iconBackgroundColor: null
    })));
  }

  return <></>;
}

function combineResources(resources: Resource[],
  newResources: Resource[]) {
  let resourceMap: { [typeQuality: string] : number} = {};
  resources.map((r, index) => {
    resourceMap[r.type + '|' + r.quality] = index;
  });
  newResources.map((r) => {
    if (resourceMap[r.type + '|' + r.quality]) {
      resources[resourceMap[r.type + '|' + r.quality]].quantity += r.quantity;
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
