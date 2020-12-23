import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import { displayModalValue } from '../actions/ui';

import Leader from '../models/leader';
import { buildingTypes } from '../instances/building_types';
import { MODALS } from '../enums/modals';

export default function LeaderDetailComponent() {
  const dispatch = useDispatch();
  const modalValue: Leader = useTypedSelector(state => state.ui.modalValue);
  const leader = modalValue;
  const buildings = useTypedSelector(state => state.buildings);

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
      <View>
        {renderAssignedTo()}
      </View>
    </View>
  );

  function renderAssignedTo() {
    if (leader.assignedTo) {
      const building = buildings[leader.assignedTo];
      const buildingType = buildingTypes[building.buildingType];
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { assignedToPress() }} >
          <BadgeComponent
            provider={buildingType.icon.provider}
            name={buildingType.icon.name}
            foregroundColor={buildingType.foregroundColor}
            backgroundColor={buildingType.backgroundColor}
            iconSize={16} />
          <Text style={styles.buttonText}>
            {buildingType.name}
          </Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { assignedToPress() }} >
          <BadgeComponent
            provider='MaterialCommunityIcons'
            name='sleep'
            foregroundColor='#000'
            backgroundColor='#fff'
            iconSize={16} />
          <Text style={styles.buttonText}>
            {'Resting'}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  function assignedToPress() {
    dispatch(displayModalValue(MODALS.BUILDING_SELECT, 'open',
      {type: MODALS.LEADER_DETAIL, leader: leader}));
  }
}
