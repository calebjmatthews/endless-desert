import React, { useEffect, useState } from 'react';
import { Provider, useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { createStore } from 'redux';
import { Text, View, Button, FlatList, TouchableOpacity, ScrollView, Dimensions,
  ScaledSize, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import { selectTab, setPositioner, addMemos } from '../actions/ui';
import { addBuilding, setBuildingSpecificRecipe } from '../actions/buildings';
import { changeSetting, setCurrentFortuity, unlockTab, setAccount, fortuitySeen,
  setFortuityDailyLast, achieveMilestone } from '../actions/account';
import { addLeader } from '../actions/leaders';
import { addEquipment } from '../actions/equipment';
import { addTimer } from '../actions/timers';
import { increaseResources, consumeResources, setVault } from '../actions/vault';
import { addQuest, addToActivityQueue } from '../actions/quest_status';
import { handleIncreaseSlots } from '../actions/trading_status';
import HourglassComponent from '../components/hourglass';
import BuildingsComponent from '../components/buildings';
import ResourcesComponent from '../components/resources';
import ResearchesComponent from '../components/researches';
import ResearchingComponent from '../components/researching';
import ModalHandlerComponent from '../components/modal_handler';
import MessageBarComponent from '../components/message_bar';
import TradingComponent from '../components/trading';
import IconComponent from '../components/icon';
import StorageHandlerComponent from '../components/storage_handler';
import QuestHandlerComponent from '../components/quest_handler';
import LookAroundComponent from '../components/look_around';
import LeadersComponent from '../components/leaders';
import LandingComponent from '../components/landing';
import EquipmentComponent from '../components/equipment';
import ValueCheckComponent from '../components/value_check';
import QuestsComponent from '../components/quests';
import BadgeComponent from '../components/badge';
import { styles } from '../styles';

import Tab from '../models/tab';
import Positioner from '../models/positioner';
import Memo from '../models/memo';
import LeaderType from '../models/leader_type';
import Timer from '../models/timer';
import Equipment from '../models/equipment';
import Leader from '../models/leader';
import Resource from '../models/resource';
import Building from '../models/building';
import Vault from '../models/vault';
import Icon from '../models/icon';
import ResearchStatus from '../models/research_status';
import { tabs } from '../instances/tabs';
import { leaderTypes } from '../instances/leader_types';
import { resourceTypes } from '../instances/resource_types';
import { buildingTypes } from '../instances/building_types';
import { quests } from '../instances/quests';
import { questGen } from '../instances/quest_gen';
import { utils } from '../utils';
import { INTRO_STATES } from '../enums/intro_states';
import { TABS } from '../enums/tabs';
import { LEADER_TYPES } from '../enums/leader_types';
import { EQUIPMENT_TYPES } from '../enums/equipment_types';
import { BUILDING_TYPES } from '../enums/building_types';
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { QUESTS } from '../enums/quests';
import { CONVERSATIONS } from '../enums/conversations';
import { MILESTONES } from '../enums/milestones';
import { FORTUITIES } from '../enums/fortuities';

const FORTUITY_BASE = 600000;
const window = Dimensions.get('window');

export default function MainComponent() {
  const dispatch = useDispatch();
  const tabSelected = useTypedSelector(state => state.ui.tabSelected);
  const globalState = useTypedSelector(state => state.ui.globalState);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const account = useTypedSelector(state => state.account);
  const vault = useTypedSelector(state => state.vault);
  const buildings = useTypedSelector(state => state.buildings);
  const [dropdownExpanded, dropdownSet] = useState(false);
  const [positionerInit, setPositionerInit] = useState(false)

  useEffect(() => {
    if (!positionerInit) {
      setPositionerInit(true);
      dispatch(setPositioner(new Positioner(window.width, window.height, Platform.OS)));
    }
    Dimensions.addEventListener("change", onWindowChange);
    return () => {
      Dimensions.removeEventListener("change", onWindowChange);
    };
  });

  const onWindowChange = ({window, screen}:
    {window: ScaledSize, screen: ScaledSize}) => {
    dispatch(setPositioner(new Positioner(window.width, window.height, Platform.OS)));
  }

  let tabsArray = Object.keys(tabs).map((tabName) => {
    return tabs[tabName];
  });
  tabsArray = tabsArray.filter((tab) => {
    if (utils.arrayIncludes(account.tabsUnloked, tab.name)) {
      return tab;
    }
  });
  if (account.fortuityCurrent) {
    tabsArray = [new Tab({
      name: TABS.FORTUITY,
      order: -1,
      icon: {provider: 'FontAwesome5', name: 'exclamation-circle'},
      settings: []
    }), ...tabsArray];
  }
  // tabsArray = [new Tab({
  //   name: 'debug',
  //   order: -2,
  //   icon: {provider: 'FontAwesome5', name: 'bug'},
  //   settings: []
  // }), ...tabsArray];

  // return (
  //   <LinearGradient
  //     colors={["#0034aa", "#6a41b4", "#f58f7d"]}
  //     style={styles.mainContainer}>
  //     <StorageHandlerComponent />
  //     <StatusBar style="auto" />
  //     <View style={styles.statusBarSpacer}></View>
  //     <View style={styles.scrollWrapper}>
  //       <View style={{flexGrow: 1, height: positioner.bodyHeight}}>
  //         <ValueCheckComponent />
  //       </View>
  //     </View>
  //   </LinearGradient>
  // );

  // return (
  //   <LinearGradient
  //     colors={["#0034aa", "#6a41b4", "#f58f7d"]}
  //     style={styles.mainContainer}>
  //     <StatusBar style="auto" />
  //     <View style={styles.statusBarSpacer}></View>
  //     <View style={styles.scrollWrapper}>
  //       <View style={{flexGrow: 1, height: positioner.bodyHeight}}>
  //         <BadgeComponent icon={new Icon({ provider: 'svg', name: 'Knowledge',
  //           size: 29 })} />
  //       </View>
  //     </View>
  //   </LinearGradient>
  // );

  if (globalState == 'loading') {
    return (
      <LinearGradient
        colors={["#0034aa", "#6a41b4", "#f58f7d"]}
        style={styles.mainContainer}>
        <StorageHandlerComponent />
        <StatusBar style="auto" />
        <View style={styles.statusBarSpacer}></View>
        <View style={styles.scrollWrapper}>
          <Text style={styles.bareText}>{'Loading...'}</Text>
        </View>
      </LinearGradient>
    );
  }

  else if (globalState == 'landing') {
    return <LandingComponent height={positioner.bodyHeight}
      panelWidth={positioner.majorWidth} />
  }

  else if (account.introState == INTRO_STATES.LOOK_AROUND) {
    return <LookAroundComponent height={positioner.bodyHeight}
      panelWidth={positioner.majorWidth} />
  }

  return (
    <LinearGradient
      colors={["#0034aa", "#6a41b4", "#f58f7d"]}
      style={styles.mainContainer}>
      <HourglassComponent />
      <QuestHandlerComponent />
      <StatusBar style="auto" />
      <View style={styles.statusBarSpacer}></View>
      <View style={styles.scrollWrapper}>
        <View style={{flexGrow: 1, height: positioner.bodyHeight}}>
          {renderTab(tabSelected)}
        </View>
      </View>
      <MessageBarComponent />
      <StorageHandlerComponent />
      <View style={styles.menuButtonWrapper}>
        <TouchableOpacity style={styles.button}
          onPress={() => { dropdownSet(!dropdownExpanded) }} >
          <IconComponent provider="Entypo" name="menu" color="#fff" size={30} />
        </TouchableOpacity>
      </View>
      {renderDropdown(dropdownExpanded, dropdownPress)}
      <ModalHandlerComponent />
    </LinearGradient>
  );

  function renderDropdown(expanded: boolean, dropdownPress: Function) {
    if (expanded) {
      return (
        <View style={styles.dropdownList}>
          {renderDropdownTabsSection()}
          {renderTabSettingsSection()}
        </View>
      );
    }
    return null;
  }

  function renderDropdownTabsSection() {
    let tab = tabs[tabSelected];
    let sectionHeading = null;
    if (tab) {
      if (tab.settings.length > 0) {
        sectionHeading = <Text style={styles.dropdownHeading}>{'Go to:'}</Text>
      }
    }
    return (
      <>
        {sectionHeading}
        {renderDropdownTabs()}
      </>
    );
  }

  function renderDropdownTabs() {
    return tabsArray.map((tab) => {
      return (
        <TouchableOpacity key={tab.name} style={styles.dropdownListItem}
          onPress={() => dropdownPress(tab.name)} >
          <IconComponent provider={tab.icon.provider} name={tab.icon.name}
            color="#000" size={14} />
          <Text>{' ' + tab.name}</Text>
        </TouchableOpacity>
      )
    })
  }

  function renderTabSettingsSection() {
    let tab = tabs[tabSelected];
    if (tab) {
      if (tab.settings.length > 0) {
        let sectionHeading = <Text style={styles.dropdownHeading}>{'Settings:'}</Text>
        return (
          <>
            {sectionHeading}
            {renderTabSettings()}
          </>
        );
      }
    }
    return null;
  }

  function renderTabSettings() {
    let tab = tabs[tabSelected];
    return tab.settings.map((setting) => {
      return (
        <TouchableOpacity key={setting.name} style={styles.dropdownListItem}
          onPress={() => settingPress(setting)} >
          <IconComponent provider={setting.icon.provider} name={setting.icon.name}
            color="#000" size={14} />
          <Text>{' ' + setting.displayName}</Text>
        </TouchableOpacity>
      )
    });
  }

  function dropdownPress(tabName: string) {
    if (tabName == 'debug') {
      // let allResources: Resource[] = [];
      // Object.keys(resourceTypes).map((typeName) => {
      //   allResources.push(new Resource({ type: typeName, quality: 0, quantity: 1000 }));
      // });
      // dispatch(increaseResources(vault, allResources));
      Object.keys(buildingTypes).map((typeName) => {
        dispatch(addTimer(new Timer({
          name: 'Fortuity',
          endsAt: (new Date(Date.now()).valueOf() + 100),
          fortuityCheck: true
        })));
      });
    }
    else if (tabName != TABS.FORTUITY) {
      dispatch(selectTab(tabName));
    }
    else {
      if (account.fortuityCurrent) {
        let memos = account.fortuityCurrent.memos.slice();
        // if (account.fortuityCurrent.leaderJoins) {
        //   if (!utils.arrayIncludes(account.tabsUnloked, TABS.LEADERS)) {
        //     dispatch(unlockTab(TABS.LEADERS));
        //     dispatch(unlockTab(TABS.EQUIPMENT));
        //   }
        //   const leaderCreateRes =
        //     leaderTypes[account.fortuityCurrent.leaderJoins].createLeader(vault);
        //   let tempEquipment: { [id: string] : Equipment } = {};
        //   leaderCreateRes.equipment.map((equip) => {
        //     if (equip) {
        //       tempEquipment[equip.id] = equip;
        //       dispatch(addEquipment(equip));
        //     }
        //   });
        //   let leader = new Leader(leaderCreateRes.leader);
        //   leader.calcEffects(tempEquipment, {}, new Vault(null));
        //   dispatch(addLeader(leader));
        // }
        if (account.fortuityCurrent.gainResources) {
          const fgr = account.fortuityCurrent.gainResources;
          let resourcesGained: Resource[] = [];
          let resourceNames: string[] = [];
          for (let index = 0; index < fgr.length; index++) {
            const resReq = fgr[index];
            const rToGain = utils.getMatchingResourceQuantity(resReq, resourceNames);
            resourcesGained.push(new Resource(rToGain));
            resourceNames.push(rToGain.type);
          }
          memos[memos.length-1].resourcesGained = resourcesGained;
          dispatch(increaseResources(vault, resourcesGained));
        }
        if (account.fortuityCurrent.questsBegin) {
          account.fortuityCurrent.questsBegin.forEach((questName) => {
            dispatch(addQuest(quests[questName]));
          });
          memos[memos.length-1].questsBegin = account.fortuityCurrent.questsBegin;
        }
        dispatch(addMemos(account.fortuityCurrent.memos));
        dispatch(setCurrentFortuity(null));
        dispatch(fortuitySeen(account.fortuityCurrent.name));
        if (account.fortuityCurrent.repeatable) {
          const currentTimestamp = new Date(Date.now()).valueOf();
          dispatch(setFortuityDailyLast(currentTimestamp));
        }
        dispatch(addTimer(new Timer({
          name: 'Fortuity',
          endsAt: (new Date(Date.now()).valueOf()
            + Math.floor(utils.random() * FORTUITY_BASE) + (FORTUITY_BASE / 2)),
          fortuityCheck: true
        })));
      }
    }
    dropdownSet(false);
  }

  function settingPress(setting: {name: string, displayName: string, type: string,
    icon: {provider: string, name: string}}) {
    switch(setting.type) {
      case 'toggle':
      // @ts-ignore
      dispatch(changeSetting(setting.name, !(account[setting.name])));
      dropdownSet(false);
      break;

      default:
      break;
    }
  }

  function renderTab(tabName: string) {
    switch(tabName) {
      case TABS.BUILDINGS:
      return <BuildingsComponent />;
      case TABS.RESOURCES:
      return <ResourcesComponent />;
      case TABS.RESEARCH:
      return <ResearchesComponent />;
      case TABS.RESEARCHING:
      return <ResearchingComponent />;
      case TABS.TRADING:
      return <TradingComponent />;
      case TABS.LEADERS:
      return <LeadersComponent />;
      case TABS.EQUIPMENT:
      return <EquipmentComponent />;
      case TABS.QUESTS:
      return <QuestsComponent />;
      default:
      return null;
    }
  }
}
