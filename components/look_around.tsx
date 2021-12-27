import React, { useEffect, useState } from 'react';
import { Provider, useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles';

import MessageBarComponent from '../components/message_bar';
import ModalHandlerComponent from '../components/modal_handler';
import IconComponent from '../components/icon';
import ProgressBarComponent from '../components/progress_bar';
import { setIntroState, unlockTab } from '../actions/account';
import { addMemos } from '../actions/ui';
import { addQuest } from '../actions/quest_status';

import { memos } from '../instances/memos';
import { quests } from '../instances/quests';
import { MEMOS } from '../enums/memos';
import { INTRO_STATES } from '../enums/intro_states';
import { TABS } from '../enums/tabs';
import { QUESTS } from '../enums/quests';

export default function LookAroundComponent(props: {height: number, panelWidth: number}) {
  const dispatch = useDispatch();
  const positioner = useTypedSelector(state => state.ui.positioner);
  const [looking, setLooking] = useState(false);

  return (
    <LinearGradient
      colors={["#0034aa", "#6a41b4", "#f58f7d"]}
      style={styles.mainContainer}>
      <ModalHandlerComponent />
      <StatusBar style="auto" />
      <View style={styles.statusBarSpacer}></View>
      <View style={styles.scrollWrapper}>
        <View style={{display: 'flex', justifyContent: 'center',
          alignItems: 'center', flexGrow: 1, height: props.height}}>
          <View style={StyleSheet.flatten([styles.panelFlexColumn,
            {minWidth: props.panelWidth, maxWidth: props.panelWidth}])}>
            <Text style={{textAlign: 'center'}}>
              {'The paths are faded and the buildings are broken. What happened here?'}
            </Text>
            <View style={styles.break} />
            {renderButtonBar()}
          </View>
        </View>
      </View>
    </LinearGradient>
  );

  function renderButtonBar() {
    if (!looking) {
      return (
        <TouchableOpacity style={styles.buttonLarge}
          onPress={() => {lookAround()}} >
          <IconComponent provider="FontAwesome" name="eye" color="#fff" size={16}
            style={styles.headingIcon} />
          <Text style={styles.buttonTextLarge}>{' Look around'}</Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <ProgressBarComponent startingProgress={0}
          width={positioner.majorWidth - positioner.minorPadding}
          endingProgress={1} duration={3000}
          label={'Searching...'} />
      );
    }
  }

  function lookAround() {
    setLooking(true);
    const timeout = setTimeout(() => {
      dispatch(addMemos([memos[MEMOS.LOOK_AROUND], memos[MEMOS.LOOK_AROUND_LOOT],
        memos[MEMOS.LOOK_AROUND_REPAIR]]));
      dispatch(setIntroState(INTRO_STATES.REPAIR_CISTERN));
      dispatch(unlockTab(TABS.QUESTS));
      dispatch(addQuest(quests[QUESTS.EARLY_DAYS_SURVIVE]));
    }, 3000);

    return () => { clearTimeout(timeout); }
  }
}
