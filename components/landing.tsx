import React, { useEffect, useState } from 'react';
import { Provider, useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles';

import ModalHandlerComponent from '../components/modal_handler';
import IconComponent from '../components/icon';
import { displayModal } from '../actions/ui';

import { MODALS } from '../enums/modals';

export default function LandingComponent(props: {height: number, panelWidth: number}) {
  const dispatch = useDispatch();

  return (
    <LinearGradient
      colors={["#0034aa", "#6a41b4", "#f58f7d"]}
      style={styles.mainContainer}>
      <StatusBar style="auto" />
      <View style={styles.statusBarSpacer}></View>
      <View style={styles.scrollWrapper}>
        <View style={{display: 'flex', justifyContent: 'center',
          alignItems: 'center', flexGrow: 1, height: props.height}}>
          <View style={StyleSheet.flatten([styles.panelFlexColumn,
            {minWidth: props.panelWidth, maxWidth: props.panelWidth}])}>
            <Text style={{textAlign: 'center'}}>
              {'The desert stretches beyond sight, in every direction.'}
            </Text>
            <View style={styles.break}></View>
            <TouchableOpacity style={styles.buttonLarge}
              onPress={() => { defer() }} >
              <IconComponent provider="FontAwesome5" name="shoe-prints" color="#fff"
                size={16} style={styles.headingIcon} />
              <View style={{width: (props.panelWidth - 60)}}>
                <Text style={styles.buttonTextLarge}>{' Continue walking '}</Text>
                <Text style={styles.buttonText}>{'(create an account later)'}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.break}></View>
            <TouchableOpacity style={styles.buttonLarge}
              onPress={() => { login() }} >
              <IconComponent provider="FontAwesome" name="eye" color="#fff" size={16}
                style={styles.headingIcon} />
              <View style={{width: (props.panelWidth - 60)}}>
                <Text style={styles.buttonTextLarge}>{' You\'ve been here before '}</Text>
                <Text style={styles.buttonText}>{'(load from existing account)'}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.break}></View>
            <TouchableOpacity style={styles.buttonLarge}
              onPress={() => { signup() }} >
              <IconComponent provider="FontAwesome5" name="exclamation-circle"
                color="#fff" size={16} style={styles.headingIcon} />
              <View style={{width: (props.panelWidth - 60)}}>
                <Text style={styles.buttonTextLarge}>{' You will remember this '}</Text>
                <Text style={styles.buttonText}>{'(create a new account)'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ModalHandlerComponent />
    </LinearGradient>
  );

  function defer() {

  }

  function login() {
    dispatch(displayModal(MODALS.LOGIN));
  }

  function signup() {
    dispatch(displayModal(MODALS.SIGNUP));
  }
}
