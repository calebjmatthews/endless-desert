import React from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { View, Text } from 'react-native';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import BadgeComponent from './badge';

import Message from '../models/message';

export default function MessageBarComponent() {
  const dispatch = useDispatch();
  const messages = useTypedSelector(state => state.ui.messages);
  let message = messages[messages.length-1];
  if (!message) {
    message = new Message({
      text: 'The air smells like the white sand, baking in the sun.',
      type: '',
      timestamp: new Date(Date.now()),
      icon: {provider: 'FontAwesome5', name: 'sun'},
      foregroundColor: '#ff6b00',
      backgroundColor: '#fff'
    })
  }
  if (message) {
    return (
      <View style={styles.messageBarContainer}>
        <View style={styles.messageBarBackground} />
        <View style={styles.messageBar}>
          {renderBadge(message)}
          <Text style={styles.messageBarText}>{message.text}</Text>
        </View>
      </View>
    );
  }
  else {
    return null;
  }

  function renderBadge(message: Message) {
    if (message.icon && message.foregroundColor && message.backgroundColor) {
      return (
        <BadgeComponent
          provider={message.icon.provider}
          name={message.icon.name}
          foregroundColor={message.foregroundColor}
          backgroundColor={message.backgroundColor}
          iconSize={16} />
      );
    }
    return null;
  }
}
