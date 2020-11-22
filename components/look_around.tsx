import React, { useEffect, useState } from 'react';
import { Provider, useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, TouchableOpacity, ScrollView }
  from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles';

import MessageBarComponent from '../components/message_bar';
import ModalHandlerComponent from '../components/modal_handler';
import IconComponent from '../components/icon';
import { setIntroState } from '../actions/account';
import { addMemos } from '../actions/ui';

import { memos } from '../instances/memos';
import { MEMOS } from '../enums/memos';
import { INTRO_STATES } from '../enums/intro_states';

export default function LookAroundComponent() {
  const dispatch = useDispatch();

  return (
    <LinearGradient
      colors={["#0034aa", "#6a41b4", "#f58f7d"]}
      style={styles.mainContainer}>
      <ModalHandlerComponent />
      <StatusBar style="auto" />
      <View style={styles.statusBarSpacer}></View>
      <View style={styles.scrollWrapper}>
        <ScrollView contentContainerStyle={{display: 'flex', justifyContent: 'center',
          alignItems: 'center', flexGrow: 1, height: 473}}>
          <View style={styles.panelFlexColumn}>
            <Text style={{textAlign: 'center'}}>
              {'The paths are faded and the buildings are broken. What happened here?'}
            </Text>
            <View style={styles.break} />
            <TouchableOpacity style={styles.buttonLarge}
              onPress={() => {lookAround()}} >
              <IconComponent provider="FontAwesome" name="eye" color="#fff" size={16}
                style={styles.headingIcon} />
              <Text style={styles.buttonTextLarge}>{' Look around'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );

  function lookAround() {
    dispatch(addMemos([memos[MEMOS.LOOK_AROUND], memos[MEMOS.LOOK_AROUND_LOOT],
      memos[MEMOS.LOOK_AROUND_REPAIR]]));
    dispatch(setIntroState(INTRO_STATES.REPAIR_CISTERN));
  }
}
