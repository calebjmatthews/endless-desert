import React, { useEffect, useState } from 'react';
import { Provider, useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { createStore } from 'redux';
import { Text, View, Button, FlatList, TouchableOpacity, ScrollView, Dimensions,
  ScaledSize, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import { selectTab, setPositioner } from '../actions/ui';
import { addBuilding, setBuildingSpecificRecipe } from '../actions/buildings';
import { changeSetting } from '../actions/account';
import { addLeader } from '../actions/leaders';
import { addEquipment } from '../actions/equipment';
import { increaseResources, consumeResources, setVault } from '../actions/vault';
import { handleIncreaseSlots } from '../actions/trading_status';
import { setTimers } from '../actions/timers';
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
import MapComponent from '../components/map';
import { styles } from '../styles';

import Tab from '../models/tab';
import Positioner from '../models/positioner';
import Memo from '../models/memo';
import LeaderType from '../models/leader_type';
import Equipment from '../models/equipment';
import Leader from '../models/leader';
import Resource from '../models/resource';
import Building from '../models/building';
import Vault from '../models/vault';
import Icon from '../models/icon';
import ResearchStatus from '../models/research_status';
import Timer from '../models/timer';
import { tabs } from '../instances/tabs';
import { leaderTypes } from '../instances/leader_types';
import { resourceTypes } from '../instances/resource_types';
import { buildingTypes } from '../instances/building_types';
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

const window = Dimensions.get('window');

export default function MainComponent() {
  const dispatch = useDispatch();
  const tabSelected = useTypedSelector(state => state.ui.tabSelected);
  const globalState = useTypedSelector(state => state.ui.globalState);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const account = useTypedSelector(state => state.account);
  const vault = useTypedSelector(state => state.vault);
  const buildings = useTypedSelector(state => state.buildings);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const timers = useTypedSelector(state => state.timers);
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
      const newTimers: { [name: string] : Timer } = {};
      Object.keys(timers).forEach((name) => {
        if (!name.includes('Fortuity-')) {
          newTimers[name] = timers[name];
        }
      });
      dispatch(setTimers(newTimers));
    }
    else {
      dispatch(selectTab(tabName));
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
      case TABS.TOWN:
      return <MapComponent />;
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
