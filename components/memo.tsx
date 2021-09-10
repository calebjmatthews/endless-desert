import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import { dismissMemo, displayModal } from '../actions/ui';

import Resource from '../models/resource';
import Message from '../models/message';
import Icon from '../models/icon';
import { resourceTypes } from '../instances/resource_types';
import { leaderTypes } from '../instances/leader_types';
import { utils } from '../utils';

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
          maxWidth: positioner.majorWidth, maxHeight: positioner.modalHeight,
          overflowY: 'auto'}])}>
        <Text style={styles.bodyText}>
          {memo.text}
        </Text>
        {renderMessages(memo.messages)}
        {renderResources(memo.resourcesGained, true)}
        {renderResources(memo.resourcesLost, false)}
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

  function renderMessages(messages: Message[]|null|undefined) {
    if (!messages) { return null; }
    if (messages.length > 0) {
      let label = 'These things happened:';
      if (messages.length == 1) { label = 'Something happened:'; }
      return (
        <>
          <Text style={styles.bodyText}>{label}</Text>
          {messages.map((message, index) => {
            let icon = null;
            if (message.icon) {
              icon = <BadgeComponent icon={message.icon} size={21} />;
            }
            return (
              <View key={index} style={styles.containerStretchRow}>
                {icon}
                <Text style={styles.bodyText}>{message.text}</Text>
              </View>
            )
          })}
        </>
      );
    }
  }

  function renderResources(resources: Resource[]|null|undefined,
    gained: boolean = true) {
    let label = 'gained', sign = '+';
    if (!gained) { label = 'used up'; sign = '-'; }
    if (!resources) { return null; }
    if (resources.length > 0) {
      return (
        <>
          <Text style={styles.bodyText}>{'Your town ' + label + ':'}</Text>
          {resources.map((resource, index) => {
            const resourceType = utils.getResourceType(resource);
            return (
              <View key={index} style={styles.containerStretchRow}>
                <BadgeComponent icon={resourceType.icon} size={21} />
                <Text style={styles.bodyText}>
                  {' ' + sign + utils.formatNumberShort(resource.quantity) + ' '
                    + utils.getResourceName(resource)}
                </Text>
              </View>
            );
          })}
        </>
      )
    }
  }

  function renderLeaderJoined() {
    if (memo.leaderJoined) {
      const leaderType = leaderTypes[memo.leaderJoined];
      return (
        <View style={styles.containerStretchRow}>
          <BadgeComponent icon={leaderType.icon} size={16} />
          <Text style={styles.bodyText}>{' ' + leaderType.name + ' joined you!'}</Text>
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
