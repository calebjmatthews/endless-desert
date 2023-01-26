import React, { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, Dimensions, ScaledSize, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import { setPositioner } from '../actions/ui';
import HourglassComponent from '../components/hourglass';
import ExpeditionHourglassComponent from '../components/expeditions/expedition_hourglass';
import ResourcesComponent from '../components/resources';
import ResearchesComponent from '../components/researches';
import ResearchingComponent from '../components/researching';
import ModalHandlerComponent from '../components/modal_handler';
import MessageBarComponent from '../components/message_bar';
import TradingComponent from '../components/trading';
import StorageHandlerComponent from '../components/storage_handler';
import QuestHandlerComponent from '../components/quest_handler';
import LookAroundComponent from '../components/look_around';
import LeadersComponent from '../components/leaders';
import LandingComponent from '../components/landing';
import EquipmentComponent from '../components/equipment';
import ValueCheckComponent from '../components/value_check';
import QuestsComponent from '../components/quests';
import MapComponent from '../components/map';
import NavbarComponent from '../components/navbar';
import ExpeditionsComponent from './expeditions/index';
import { styles } from '../styles';

import Positioner from '../models/positioner';
import { INTRO_STATES } from '../enums/intro_states';
import { TABS } from '../enums/tabs';

const window = Dimensions.get('window');

export default function MainComponent() {
  const dispatch = useDispatch();
  const tabSelected = useTypedSelector(state => state.ui.tabSelected);
  const globalState = useTypedSelector(state => state.ui.globalState);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const account = useTypedSelector(state => state.account);
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
      <ExpeditionHourglassComponent />
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
      case TABS.QUESTS:
      return <QuestsComponent />;
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
      case TABS.EXPEDITIONS:
      return <ExpeditionsComponent />;
      default:
      return null;
    }
  }
}
