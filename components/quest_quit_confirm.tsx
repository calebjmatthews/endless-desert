import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import { displayModal } from '../actions/ui';
import { removeQuest } from '../actions/quest_status';

import Quest from '../models/quest';

export default function QuestQuitConfirmComponent() {
  const dispatch = useDispatch();
  const modalValue: Quest =
    useTypedSelector(state => state.ui.modalValue);
  const quest = modalValue;
  const positioner = useTypedSelector(state => state.ui.positioner);

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <BadgeComponent icon={quest.icon} size={29} />
        <Text style={styles.heading1}>{` ${quest.name}`}</Text>
      </View>
      <View style={styles.panelFlex}>
        <Text style={styles.bodyText}>
          {`Are you sure you want to quit this quest? A new daily quest will arrive soon.`}
        </Text>
      </View>
      <View style={StyleSheet.flatten([styles.columns, {minWidth: positioner.majorWidth,
        maxWidth: positioner.majorWidth}])}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
            styles.buttonLarge])} onPress={() => {
              dispatch(removeQuest(quest));
              dispatch(displayModal(null));
            }} >
            <IconComponent provider="FontAwesome" name="trash" color="#fff"
              size={16} style={styles.headingIcon} />
            <Text style={styles.buttonTextLarge}>{` Quit`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
            styles.buttonLarge])} onPress={() => {
              dispatch(displayModal(null));
            }} >
            <IconComponent provider="FontAwesome" name="times" color="#fff"
              size={16} style={styles.headingIcon} />
            <Text style={styles.buttonTextLarge}>{` Nevermind`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
