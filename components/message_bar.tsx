import React from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { View, Text } from 'react-native';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import BadgeComponent from './badge';

import Message from '../models/message';
import Icon from '../models/icon';

export default function MessageBarComponent() {
  const dispatch = useDispatch();
  const messages = useTypedSelector(state => state.messages);
  let message = messages[messages.length-1];
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
      icon = <BadgeComponent icon={message.icon} size={17} borderless={true} />
    }
    return (
      <View style={styles.messageBarContainer}>
        <View style={styles.messageBarBackground} />
        <View style={styles.messageBar}>
          {icon}
          <Text style={styles.messageBarText}>{' ' + message.text}</Text>
        </View>
      </View>
    );
  }
  else {
    return null;
  }
}
