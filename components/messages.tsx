import React, { useState, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';

import Message from '../models/message';
import { utils } from '../utils';

export default function MessagesComponent() {
  const dispatch = useDispatch();
  const messages = useTypedSelector(state => state.messages);

  const [rMessages, setRMessages] = useState<Message[]>([]);
  useEffect(() => {
    setRMessages([...messages].reverse());
  }, [messages])

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="MaterialCommunityIcons" name="message" color="#fff"
          size={20} style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Messages'}</Text>
      </View>
      <ScrollView style={styles.columns}>
        {rMessages.map((message, index) => (
            <View key={index} style={StyleSheet.flatten([styles.columns,
              { marginVertical: 5 }])}>
              <Text style={StyleSheet.flatten([styles.buttonTextSmall,
                { alignSelf: 'flex-start', marginLeft: 15 }])}>
                {utils.getDatetimeString(new Date(message.timestamp))}
              </Text>
              <View style={[styles.messageBar, {height: 'unset', minHeight: 30}]}>
                {message.icon &&
                  <BadgeComponent icon={message.icon} size={24} borderless={true} />}
                <Text style={styles.messageBarText}>{message.text}</Text>
              </View>
            </View>
        ))}
      </ScrollView>
    </View>
  )
}
