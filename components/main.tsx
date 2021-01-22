import React, { useEffect, useState } from 'react';
import { Provider, useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { createStore } from 'redux';
import { Text, View, Button, FlatList, TouchableOpacity, ScrollView, Dimensions,
  ScaledSize } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import { selectTab, setPositioner, addMemos } from '../actions/ui';
import { changeSetting, setCurrentFortuity, unlockTab } from '../actions/account';
import { addLeader } from '../actions/leaders';
import { addEquipment } from '../actions/equipment';
import { addTimer } from '../actions/timers';
import { increaseResources } from '../actions/vault';
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
import LookAroundComponent from '../components/look_around';
import LeadersComponent from '../components/leaders';
import { styles } from '../styles';

import Tab from '../models/tab';
import Positioner from '../models/positioner';
import Memo from '../models/memo';
import LeaderType from '../models/leader_type';
import Timer from '../models/timer';
import { tabs } from '../instances/tabs';
import { leaderTypes } from '../instances/leader_types';
import { utils } from '../utils';
import { INTRO_STATES } from '../enums/intro_states';
import { TABS } from '../enums/tabs';
import { LEADER_TYPES } from '../enums/leader_types';

const FORTUITY_BASE = 600000;
const window = Dimensions.get('window');

export default function App() {
  const dispatch = useDispatch();
  const tabSelected = useTypedSelector(state => state.ui.tabSelected);
  const globalState = useTypedSelector(state => state.ui.globalState);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const account = useTypedSelector(state => state.account);
  const vault = useTypedSelector(state => state.vault);
  const [dropdownExpanded, dropdownSet] = useState(false);
  const [positionerInit, setPositionerInit] = useState(false);

  useEffect(() => {
    if (!positionerInit) {
      setPositionerInit(true);
      dispatch(setPositioner(new Positioner(window.width, window.height)));
    }
    Dimensions.addEventListener("change", onWindowChange);
    return () => {
      Dimensions.removeEventListener("change", onWindowChange);
    };
  });

  const onWindowChange = ({window, screen}:
    {window: ScaledSize, screen: ScaledSize}) => {
    dispatch(setPositioner(new Positioner(window.width, window.height)));
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

  if (globalState == 'loading') {
    return (
      <LinearGradient
        colors={["#0034aa", "#6a41b4", "#f58f7d"]}
        style={styles.mainContainer}>
        <StorageHandlerComponent />
        <StatusBar style="auto" />
        <View style={styles.statusBarSpacer}></View>
        <View style={styles.scrollWrapper}>
          <ScrollView contentContainerStyle={{flexGrow: 1,
            height: positioner.bodyHeight}}>
            <Text style={styles.bareText}>{'Loading...'}</Text>
          </ScrollView>
        </View>
      </LinearGradient>
    );
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
      <ModalHandlerComponent />
      <StorageHandlerComponent />
      <StatusBar style="auto" />
      <View style={styles.statusBarSpacer}></View>
      <View style={styles.scrollWrapper}>
        <ScrollView contentContainerStyle={{flexGrow: 1,
          height: positioner.bodyHeight}}>
          {renderTab(tabSelected)}
        </ScrollView>
      </View>
      <MessageBarComponent />
      <View style={styles.buttonTabWrapper}>
        <TouchableOpacity style={styles.button}
          onPress={() => { dropdownSet(!dropdownExpanded) }} >
          <IconComponent provider="Entypo" name="menu" color="#fff" size={30} />
        </TouchableOpacity>
      </View>
      {renderDropdown(dropdownExpanded, dropdownPress)}
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
    if (tabName != TABS.FORTUITY) {
      dispatch(selectTab(tabName));
    }
    else {
      if (account.fortuityCurrent) {
        let memos = account.fortuityCurrent.memos.slice();
        if (account.fortuityCurrent.leaderJoins) {
          if (!utils.arrayIncludes(account.tabsUnloked, TABS.LEADERS)) {
            dispatch(unlockTab(TABS.LEADERS));
          }
          const leaderCreateRes =
            leaderTypes[account.fortuityCurrent.leaderJoins].createLeader();
          dispatch(addLeader(leaderCreateRes.leader));
          leaderCreateRes.equipment.map((equip) => {
            if (equip) {
              dispatch(addEquipment(equip));
            }
          });
        }
        if (account.fortuityCurrent.gainResources) {
          const fgr = account.fortuityCurrent.gainResources;
          let resourcesGained: { type: string, quantity: number }[] = [];
          let resourceNames: string[] = [];
          for (let index = 0; index < fgr.length; index++) {
            const resReq = fgr[index];
            const rToGain = utils.getMatchingResourceQuantity(resReq, resourceNames);
            resourcesGained.push(rToGain);
            resourceNames.push(rToGain.type);
          }
          memos[memos.length-1].resourcesGained = resourcesGained;
          dispatch(increaseResources(vault, resourcesGained));
        }
        dispatch(addMemos(account.fortuityCurrent.memos));
        dispatch(setCurrentFortuity(null));
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
      case "Buildings":
      return <BuildingsComponent />;
      case "Resources":
      return <ResourcesComponent />
      case "Research":
      return <ResearchesComponent />
      case "Researching":
      return <ResearchingComponent />
      case "Trading":
      return <TradingComponent />
      case "Leaders":
      return <LeadersComponent />
      default:
      return null;
    }
  }
}
