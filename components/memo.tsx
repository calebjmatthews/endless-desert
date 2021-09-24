import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import ConversationComponent from './conversation';
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
  const modalHeight = positioner.modalHeight - positioner.majorPadding;

  const containerStyle: any = (memo.text
    ? StyleSheet.flatten([styles.panelFlexColumn,
      {minWidth: positioner.majorWidth, maxWidth: positioner.majorWidth,
        justifyContent: 'space-between'}])
    : StyleSheet.flatten([styles.container,
      {minWidth: positioner.majorWidth, maxWidth: positioner.majorWidth,
        justifyContent: 'space-between'}]))

  return (
    <View style={styles.container}>
      {renderHeading()}
      <ScrollView contentContainerStyle={containerStyle}>
        {memo.text && (<Text style={styles.bodyText}>
          {memo.text}
        </Text>)}
        {renderMessages(memo.messages)}
        {memo.convoName && <ConversationComponent convoName={memo.convoName} />}
        {renderResources(memo.resourcesGained, true)}
        {renderResources(memo.resourcesLost, false)}
        {renderLeaderJoined()}
      </ScrollView>
      <View style={styles.break} />
      <TouchableOpacity style={styles.buttonLarge}
        onPress={() => {dismissPress()}} >
        <IconComponent provider="FontAwesome" name="arrow-right" color="#fff" size={16}
          style={styles.headingIcon} />
        <Text style={styles.buttonTextLarge}>{' Next'}</Text>
      </TouchableOpacity>
      <View style={styles.break} />
    </View>
  );

  function renderHeading() {
    if (memo.title) {
      return (
        <View style={styles.headingWrapper}>
          <Text style={styles.heading1}>{memo.title}</Text>
        </View>
      );
    }
    return <View style={styles.headingWrapper}></View>;
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
