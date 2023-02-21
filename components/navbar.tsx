import React, { useState, useMemo, useRef } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import { selectTab, removeGlowingTab, displayModal } from '../actions/ui';
import { unlockTab } from '../actions/account';
import { setScene } from '../actions/scene_status';
import { setExpeditionStatus } from '../actions/expedition_status';
import { consumeResources, increaseResources } from '../actions/vault';

import Tab from '../models/tab';
import Resource from '../models/resource';
import ExpeditionStatus from '../models/expedition_status';
import { tabs } from '../instances/tabs';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils'
import testScenes from '../scripts/test_scenes';
import { PULSE_DURATION } from '../constants';
import { TABS } from '../enums/tabs';
import { EXPEDITION_EVENTS } from '../enums/expedition_events';
import { MODALS } from '../enums/modals';

enum AP {
  START_RISING = 'start rising',
  RISING = 'rising',
  START_FALLING = 'start falling',
  FALLING = 'falling'
}

export default function  NavbarComponent() {
  const tabsUnlocked = useTypedSelector(state => state.account.tabsUnlocked);
  const tabSelected = useTypedSelector(state => state.ui.tabSelected);
  const tabsGlowing = useTypedSelector(state => state.ui.tabsGlowing);

  return useMemo(() => (
    <NavbarStaticComponent tabsUnlocked={tabsUnlocked} tabSelected={tabSelected}
      tabsGlowing={tabsGlowing} />
  ), [tabsUnlocked, tabSelected, tabsGlowing]);
}

function  NavbarStaticComponent(props: { tabsUnlocked: string[], tabSelected: string,
  tabsGlowing: { [tabName: string] : boolean } }) {
  const { tabsUnlocked, tabSelected, tabsGlowing } = props;
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);

  const [animationPhase, setAnimationPhase] = useState(AP.START_RISING);

  const opacityAnim = useRef(new Animated.Value(0.5)).current;
  React.useEffect(() => {
    if (Object.keys(tabsGlowing).length > 0) {
      if (animationPhase === AP.START_RISING) {
        setAnimationPhase(AP.RISING);
        Animated.timing(opacityAnim,
          { toValue: 1, duration: PULSE_DURATION, useNativeDriver: true }
        ).start(() => setAnimationPhase(AP.START_FALLING));
      }
      else if (animationPhase === AP.START_FALLING) {
        setAnimationPhase(AP.FALLING);
        Animated.timing(opacityAnim,
          { toValue: 0.5, duration: PULSE_DURATION, useNativeDriver: true }
        ).start(() => setAnimationPhase(AP.START_RISING));
      }
    }
  }, [animationPhase, tabsGlowing]);

  let tabsArray = Object.keys(tabs).map((tabName) => {
    return tabs[tabName];
  });
  tabsArray = tabsArray.filter((tab) => {
    if (utils.arrayIncludes(tabsUnlocked, tab.name)) {
      return tab;
    }
  });
  tabsArray = [new Tab({
    name: 'debug',
    order: -2,
    icon: {provider: 'FontAwesome5', name: 'bug'},
    settings: []
  }), ...tabsArray];

  return (
    <>
      <View style={styles.tabsWrapper}>
        {tabsArray.map((tab) => (
          <TouchableOpacity key={tab.name} style={[styles.tab,
            (tabSelected === tab.name) ? {backgroundColor: '#2237ac'} : null]}
            onPress={() => dropdownPress(tab.name)} >
            <IconComponent provider={tab.icon.provider} name={tab.icon.name}
              color="#fff" size={14} style={styles.tabIcon} />
            {tabsGlowing[tab.name] && (
              <Animated.View style={[styles.tab, styles.tabGlow, { opacity: opacityAnim }]}>
                <IconComponent provider={tab.icon.provider} name={tab.icon.name}
                  color="#fff" size={14} style={styles.tabIcon} />
              </Animated.View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </>
  )

  function dropdownPress(tabName: string) {
    if (tabsGlowing[tabSelected]) { dispatch(removeGlowingTab(tabSelected)); }
    if (tabName === 'debug') {
      testScenes();

      dispatch(setScene(EXPEDITION_EVENTS.SCORPIONS));
      dispatch(displayModal(MODALS.SCENE));

      // let resources: Resource[] = [];
      // Object.keys(vault.resources).map((typeQuality) => {
      //   resources.push(vault.resources[typeQuality]);
      // });
      // dispatch(consumeResources(vault, resources));

      // let allResources: Resource[] = [];
      // Object.keys(resourceTypes).map((typeName) => {
      //   allResources.push(new Resource({ type: typeName, quality: 0, quantity: 10000 }));
      // });
      // dispatch(increaseResources(vault, allResources));
      // dispatch(setExpeditionStatus(new ExpeditionStatus(null)));
    }
    else {
      dispatch(selectTab(tabName));
      if (tabsGlowing[tabName]) { dispatch(removeGlowingTab(tabName)); }
    }
  }
}
