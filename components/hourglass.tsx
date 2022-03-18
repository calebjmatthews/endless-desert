import React, { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { increaseResources, consumeResources, setLastTimestamp }
  from '../actions/vault';
import { setRates } from '../actions/rates';
import { removeTimer, updateTimers, addTimer } from '../actions/timers';
import { addBuilding, replaceBuilding, selectBuildingRecipe }
  from '../actions/buildings';
import { addQuest, addToActivityQueue } from '../actions/quest_status';
import { addMemos } from '../actions/ui';
import { addMessage } from '../actions/messages';
import { setIntroState, unlockTab, setCurrentFortuity, fortuitySeen,
  setFortuityDailyLast, achieveMilestone, setStorageCallSave }
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
import Account from '../models/account';
import Quest from '../models/quest';
import QuestActivity from '../models/quest_activity';
import { buildingsStarting } from '../instances/buildings';
import { buildingTypes } from '../instances/building_types';
import { memos } from '../instances/memos';
import { fortuities } from '../instances/fortuities';
import { questGen } from '../instances/quest_gen';
import { utils } from '../utils';
import { MEMOS } from '../enums/memos';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { INTRO_STATES } from '../enums/intro_states';
import { BUILDING_TYPES } from '../enums/building_types';
import { TABS } from '../enums/tabs';
import { ACTIVITIES } from '../enums/activities';
import { MILESTONES } from '../enums/milestones';
import { MESSAGE_TYPES } from '../enums/message_types';
import { CHECK_INTERVAL } from '../constants';

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
  const questStatus = useTypedSelector(state => state.questStatus);
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
      let whileAway: { diff: number, rti: Resource[], rtc: Resource[],
        buildingsToRest: string[], timers: Timer[] } =
        { diff: (new Date(Date.now()).valueOf()
        - vault.lastTimestamp), rti: [], rtc: [], buildingsToRest: [], timers: [] };
      let recalcRates: boolean = false;
      let tempBuildings = Object.assign({}, buildings);

      const ratesToUse = (whileAway.diff > 60000) ? hourglass.calcRates(buildings, leaders, vault) : rates;
      const results = hourglass.callCalcs(ratesToUse, vault, tempBuildings, {},
        vault.lastTimestamp, questStatus.resourcesToCheck);
      if (whileAway.diff > 60000) {
        console.log('hourglass.callCalcs results');
        console.log(results);
      }

      rti = utils.sumToResources(vault, results.productionSum);
      rtc = utils.sumToResources(vault, results.consumptionSum);
      if (Object.keys(results.questResourceChecks).length > 0) {
        let resourcesProduced: {specType: string, quantity: number}[] = [];
        Object.keys(results.questResourceChecks).forEach((specType) => {
          resourcesProduced.push({ specType,
            quantity: results.questResourceChecks[specType]})
        });
        dispatch(addToActivityQueue(new QuestActivity({ id: utils.randHex(16),
          resourcesProduced })));
      }
      whileAway = Object.assign(whileAway, { rti, rtc,
        buildingsToRest: results.buildingsToRest });

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
            resourcesSelected: {},
            recipe: null
          });
          dispatch(addBuilding(building));
          dispatch(addToActivityQueue(new QuestActivity({ id: utils.randHex(16),
            actionPerformed: { kind: ACTIVITIES.BUILDING_CONSTRUCTION,
              value: buildingType.name } })));
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
              resourcesSelected: {},
              recipe: null
            });
            dispatch(replaceBuilding(upgBuilding));
            dispatch(addToActivityQueue(new QuestActivity({ id: utils.randHex(16),
              actionPerformed: { kind: ACTIVITIES.BUILDING_UPGRADE,
              value: buildingType.name } })));
            tempBuildings[building.id] = upgBuilding;
            recalcRates = true;
            if (buildingType.upgradesInto == BUILDING_TYPES.STUDY_PORTENTOUS) {
              dispatch(achieveMilestone(MILESTONES.RESEARCH_OPTION_SLOTS_2));
            }
          }
          if (buildingType.name == BUILDING_TYPES.BROKEN_CISTERN) {
            cisternRepaired();
          }
          else if (buildingType.name == BUILDING_TYPES.FALLOW_FIELD) {
            fieldRepaired();
          }
          else if (buildingType.name == BUILDING_TYPES.ABANDONED_MARKET) {
            marketRepaired();
          }
          else if (buildingType.name == BUILDING_TYPES.DECAYING_STUDY) {
            studyRepaired();
          }
          else if (buildingType.name == BUILDING_TYPES.RUINED_HUTS) {
            hutsRepaired();
          }
        }
        if (timer.messageToDisplay) {
          if (whileAway.diff > 60000) { whileAway.timers.push(timer); }
          dispatch(addMessage(new Message({
            text: timer.messageToDisplay,
            type: timer.name.split('|')[0],
            timestamp: new Date(Date.now()),
            icon: timer.iconToDisplay
          })));
        }
        if (timer.fortuityCheck) {
          const fortuity = fortuityCheck();
          if (fortuity) {
            dispatch(setCurrentFortuity(fortuity));
          }
          dispatch(addTimer(new Timer({
            name: `Fortuity-${utils.randHex(8)}`,
            endsAt: (new Date(Date.now()).valueOf()
              + Math.floor(utils.random() * CHECK_INTERVAL) + (CHECK_INTERVAL / 2)),
            fortuityCheck: true
          })));
        }
        if (timer.dailyQuestCheck) {
          const quest = dailyQuestCheck();
          if (quest) {
            dispatch(addQuest(quest));
          }
          dispatch(addTimer(new Timer({
            name: `Daily Quest-${utils.randHex(8)}`,
            endsAt: (new Date(Date.now()).valueOf()
              + Math.floor(utils.random() * CHECK_INTERVAL) + (CHECK_INTERVAL / 2)),
            dailyQuestCheck: true
          })));
        }
        if (timer.questActivity) {
          dispatch(addToActivityQueue(timer.questActivity));
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
        let newRates = hourglass.calcRates(tempBuildings, leaders, vault);
        dispatch(setRates(newRates));
        newRates.buildingsToRest?.forEach((id) => {
          const building = buildings[id];
          const buildingType = buildingTypes[building.buildingType];
          dispatch(selectBuildingRecipe(building, -1));
          dispatch(addMessage(new Message({
            text: `${(building.name || buildingType.name)} stopped because of a missing resource.`,
            type: MESSAGE_TYPES.RESOURCE_MISSING,
            icon: buildingType.icon,
            timestamp: new Date(Date.now())
          })));
        });
      }
      if (whileAway.diff > 60000) {
        showWhileAway(whileAway);
        dispatch(setStorageCallSave(true));
      }
      dispatch(setLastTimestamp(new Date(Date.now()).valueOf()));
    }
  }, [callTick]);

  function fortuityCheck(): Fortuity|null {
    let fortuityPool: Fortuity[] = [];
    Object.keys(fortuities).map((fName) => {
      const fortuity = fortuities[fName];
      if (fortuity.repeatable || account.fortuitiesSeen[fName] == undefined) {
        if (!(fortuity.repeatable && withinLastDay(account.fortuityDailyLast))
          && fortuity.available({ vault, researchStatus, buildings, timers,  tradingStatus, account, leaders, equipment })) {
          fortuityPool.push(fortuity);
        }
      }
    });

    if (fortuityPool.length > 0) {
      return utils.randomWeightedSelect(fortuityPool);
    }
    return null;
  }
  function withinLastDay(timestamp: number) {
    const threshold = new Date(Date.now()).valueOf() - (1000 * 60 * 60 * 24);
    return (timestamp >= threshold);
  }

  function dailyQuestCheck(): Quest|null {
    let currentDaily: boolean = false;
    Object.keys(questStatus.quests).forEach((id) => {
      const quest = questStatus.quests[id];
      if (quest.isDaily) { currentDaily = true; }
    });
    if (!currentDaily && !withinLastDay(questStatus.lastDailyCompleted)) {
      return questGen({ vault, buildings });
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
    dispatch(setIntroState(INTRO_STATES.REVAMP_MARKET));
    dispatch(unlockTab(TABS.RESEARCH));
  }

  function marketRepaired() {
    dispatch(addMemos([memos[MEMOS.MARKET_REPAIRED],
      memos[MEMOS.MARKET_REPAIRED_NEXT]]));
    dispatch(setIntroState(INTRO_STATES.REFURBISH_HUTS));
  }

  function hutsRepaired() {
    dispatch(setIntroState(INTRO_STATES.DONE));
    dispatch(addTimer(new Timer({
      name: 'Fortuity',
      endsAt: (new Date(Date.now()).valueOf()
        + Math.floor(utils.random() * CHECK_INTERVAL) + (CHECK_INTERVAL / 2)),
      fortuityCheck: true
    })));
  }

  function showWhileAway(wa: {diff: number, rti: Resource[], rtc: Resource[],
    buildingsToRest: string[], timers: Timer[]}) {
    if (wa.rti.length == 0 && wa.rtc.length == 0 && wa.timers.length == 0) {
      return null;
    }
    const duration = utils.formatDuration(wa.diff, 0, true).slice(0, -2);
    let text = `You were away for ${duration}.`;
    let messages: Message[] = [];
    wa.buildingsToRest.forEach((id) => {
      const building = buildings[id];
      const buildingType = buildingTypes[building.buildingType];
      messages.push(new Message({
        text: `${(building.name || buildingType.name)} stopped because of a missing resource.`,
        type: MESSAGE_TYPES.RESOURCE_MISSING,
        icon: buildingType.icon,
        timestamp: new Date(Date.now())
      }));
    });
    wa.timers.forEach((timer) => {
      if (timer.messageToDisplay) {
        messages.push(new Message({
          text: timer.messageToDisplay,
          type: timer.name.split('|')[0],
          icon: timer.iconToDisplay,
          timestamp: new Date(timer.endsAt)
        }));
      }
    });

    dispatch(addMemos([new Memo({ name: 'While Away', title: 'You\'ve returned.',
      text, messages, resourcesGained: wa.rti, resourcesConsumed: wa.rtc })]));
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
