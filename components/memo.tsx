import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import { dismissMemo, displayModal } from '../actions/ui';

import { resourceTypes } from '../instances/resource_types';
import { leaderTypes } from '../instances/leader_types';

export default function MemoComponent() {
  const dispatch = useDispatch();
  const positioner = useTypedSelector(state => state.ui.positioner);
  const memos = useTypedSelector(state => state.ui.memos);
  const memo = memos[0];

  return (
    <View style={styles.container}>
      {renderHeading()}
      <View style={StyleSheet.flatten([styles.panelFlexColumn,
        {minWidth: positioner.majorWidth,
          maxWidth: positioner.majorWidth}])}>
        <Text style={styles.bodyText}>
          {memo.text}
        </Text>
        {renderResourcesGained()}
        {renderLeaderJoined()}
        <View style={styles.break} />
        <TouchableOpacity style={styles.buttonLarge}
          onPress={() => {dismissPress()}} >
          <IconComponent provider="FontAwesome" name="arrow-right" color="#fff" size={16}
            style={styles.headingIcon} />
          <Text style={styles.buttonTextLarge}>{' Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function renderHeading() {
    if (memo.title.length > 0) {
      return (
        <View style={styles.headingWrapper}>
          <Text style={styles.heading1}>{memo.title}</Text>
        </View>
      );
    }
    return null;
  }

  function renderResourcesGained() {
    if (memo.resourcesGained) {
      return memo.resourcesGained.map((resQty, index) => {
        const resourceType = resourceTypes[resQty.type];
        return (
          <View key={index} style={styles.containerStretchRow}>
            <BadgeComponent
              provider={resourceType.icon.provider}
              name={resourceType.icon.name}
              foregroundColor={resourceType.foregroundColor}
              backgroundColor={resourceType.backgroundColor}
              iconSize={16} />
            <Text>{' ' + resQty.quantity + ' ' + resQty.type}</Text>
          </View>
        );
      });
    }
    else {
      return null;
    }
  }

  function renderLeaderJoined() {
    if (memo.leaderJoined) {
      const leaderType = leaderTypes[memo.leaderJoined];
      return (
        <View style={styles.containerStretchRow}>
          <BadgeComponent
            provider={leaderType.icon.provider}
            name={leaderType.icon.name}
            foregroundColor={leaderType.foregroundColor}
            backgroundColor={leaderType.backgroundColor}
            iconSize={16} />
          <Text>{' ' + leaderType.name + ' joined you!'}</Text>
        </View>
      );
    }
    else {
      return null;
    }
  }

  function dismissPress() {
    if (memos.length > 1) {
      dispatch(dismissMemo());
    }
    else {
      dispatch(dismissMemo());
      dispatch(displayModal(null));
    }
  }
}
