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
import { setTimers, addTimer } from '../actions/timers';
import { setTerrain } from '../actions/terrain';
import { addQuest, addToActivityQueue } from '../actions/quest_status';
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
import NavbarComponent from '../components/navbar';
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
import Terrain from '../models/terrain';
import { tabs } from '../instances/tabs';
import { leaderTypes } from '../instances/leader_types';
import { resourceTypes } from '../instances/resource_types';
import { buildingTypes } from '../instances/building_types';
import { questGen } from '../instances/quest_gen';
import { quests } from '../instances/quests';
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
import { FORTUITY_BASE } from '../constants';

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
      <NavbarComponent />
      <View style={styles.scrollWrapper}>
        <View style={styles.break} />
        <View style={{flexGrow: 1, height: positioner.bodyHeight}}>
          {renderTab(tabSelected)}
        </View>
      </View>
      <MessageBarComponent />
      <StorageHandlerComponent />
      <ModalHandlerComponent />
    </LinearGradient>
  );

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
