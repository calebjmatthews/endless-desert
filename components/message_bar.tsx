import React, { useEffect, useState, useRef } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import BadgeComponent from './badge';

import Message from '../models/message';
import Icon from '../models/icon';

const ENSURED_DURATION = 5000;

export default function MessageBarComponent() {
  const dispatch = useDispatch();
  const messages = useTypedSelector(state => state.messages);
  const [ensuredDisplay, setEnsuredDisplay] = useState<Message[]>([]);
  const [moveEnsured, setMoveEnsured] = useState<boolean>(false);

  const opacityAnim = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    if (ensuredDisplay.length === 0) {
      setEnsuredDisplay([messages[messages.length-1]]);
      const timeout = setTimeout(() => setMoveEnsured(true), ENSURED_DURATION);
      Animated.timing(
        opacityAnim, { toValue: 1, duration: 0, useNativeDriver: true }
      ).start(() => {
        Animated.timing(
          opacityAnim, { toValue: 0.35, duration: ENSURED_DURATION,
            useNativeDriver: true }
        ).start();
      });
    }
    else {
      setEnsuredDisplay([...ensuredDisplay, messages[messages.length-1]]);
    }
  }, [messages]);

  useEffect(() => {
    if (moveEnsured) {
      setMoveEnsured(false);
      if (ensuredDisplay.length > 1) {
        setEnsuredDisplay(ensuredDisplay.slice(1, ensuredDisplay.length));
        const timeout = setTimeout(() => setMoveEnsured(true), ENSURED_DURATION);
        Animated.timing(
          opacityAnim, { toValue: 1, duration: 0, useNativeDriver: true }
        ).start(() => {
          Animated.timing(
            opacityAnim, { toValue: 0.35, duration: ENSURED_DURATION,
              useNativeDriver: true }
          ).start();
        });
      }
      if (ensuredDisplay.length === 1) {
        setEnsuredDisplay([]);
      }
      else {
        console.log('ensuredDisplay is unexpectedly empty.');
      }
    }
  }, [moveEnsured, ensuredDisplay]);

  let message = ensuredDisplay[0] || messages[messages.length-1];
  if (!message) {
    message = new Message({
      text: 'The sun sets and the air cools. Finally, some relief.',
      type: '',
      timestamp: new Date(Date.now()),
      icon: new Icon({provider: 'FontAwesome5', name: 'sun', color: '#da8088'})
    })
  }
  if (message) {
    let icon = null;
    if (message.icon) {
      icon = <BadgeComponent icon={message.icon} size={24} borderless={true} />
    }
    return (
      <View style={styles.messageBarContainer}>
        <Animated.View style={StyleSheet.flatten([styles.messageBarBackground,
          {opacity: opacityAnim}])} />
        <View style={styles.messageBar}>
          {icon}
          <Text style={styles.messageBarText}>{message.text}</Text>
        </View>
      </View>
    );
  }
  else {
    return null;
  }
}
