import React, { useState, useMemo, useRef } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import { selectTab, removeGlowingTab } from '../actions/ui';
import { addTimer } from '../actions/timers';
import IconComponent from './icon';

import Tab from '../models/tab';
import Timer from '../models/timer';
import { tabs } from '../instances/tabs';
import { utils } from '../utils'
import { PULSE_DURATION } from '../constants';

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
      dispatch(addTimer(new Timer({
        name: 'Fortuity',
        endsAt: (new Date(Date.now()).valueOf() + 100),
        fortuityCheck: true
      })));
    }
    else {
      dispatch(selectTab(tabName));
      if (tabsGlowing[tabName]) { dispatch(removeGlowingTab(tabName)); }
    }
  }
}
