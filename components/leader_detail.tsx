import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';

import Leader from '../models/leader';

export default function LeaderDetailComponent() {
  const dispatch = useDispatch();
  const modalValue: Leader = useTypedSelector(state => state.ui.modalValue);
  const leader = modalValue;

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <BadgeComponent
          provider={leader.icon.provider}
          name={leader.icon.name}
          foregroundColor={leader.foregroundColor}
          backgroundColor={leader.backgroundColor}
          iconSize={24} />
        <Text style={styles.heading1}>{leader.name}</Text>
      </View>
      <View style={styles.descriptionBand}>
        <Text style={styles.descriptionBandText}>{leader.description}</Text>
      </View>
    </View>
  );
}
