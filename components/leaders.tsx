import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import EquipmentEffectComponent from './equipment_effect';
import { displayModalValue, addMemos } from '../actions/ui';

import Leader from '../models/leader';
import Building from '../models/building';
import { Conversation } from '../models/conversation';
import Memo from '../models/memo';
import Positioner from '../models/positioner';
import { buildingTypes } from '../instances/building_types';
import { conversations } from '../instances/conversations';
import { utils } from '../utils';
import { MODALS } from '../enums/modals';

export default function LeadersComponent() {
  const dispatch = useDispatch();
  const leaders = useTypedSelector(state => state.leaders);
  const leaderArray = Object.keys(leaders).map((id) => {
    return leaders[id];
  });
  const buildings = useTypedSelector(state => state.buildings);
  const conversationStatus = useTypedSelector(state => state.conversationStatus);
  const vault = useTypedSelector(state => state.vault);
  const positioner = useTypedSelector(state => state.ui.positioner);

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="user-circle" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Leaders'}</Text>
      </View>
      <ScrollView>
        {renderLeaders(leaderArray)}
      </ScrollView>
    </View>
  );

  function renderLeaders(leaderArray: Leader[]) {
    return leaderArray.map((leader) => {
      return <LeaderDescription key={leader.id} leader={leader} positioner={positioner}
        buildings={buildings} morePress={morePress} talkPress={talkPress} />
    });
  }

  function morePress(leader: Leader) {
    dispatch(displayModalValue(MODALS.LEADER_DETAIL, 'open', leader));
  }

  function talkPress(leader: Leader) {
    let convoPool: Conversation[] = [];
    Object.keys(conversations).map((name) => {
      const conversation = conversations[name];
      if (conversation.partnerType == leader.name && (conversation.repeatable
        || conversationStatus.seen[name] == undefined)) {
        if (conversation.available({ vault })) {
          convoPool.push(conversation);
        }
      }
    });

    if (convoPool.length > 0) {
      const conversationSelected: Conversation = utils.randomWeightedSelect(convoPool);
      dispatch(addMemos([new Memo({
        name: conversationSelected.name,
        title: conversationSelected.name,
        convoName: conversationSelected.name
      })]));
    }
  }
}

function LeaderDescription(props: {leader: Leader, positioner: Positioner,
  buildings: { [id: string] : Building }, morePress: Function, talkPress: Function}) {
  const leader: Leader = props.leader;
  const buildings: { [id: string] : Building } = props.buildings;
  const circleBgColor = '#000';

  return (
    <View style={StyleSheet.flatten([styles.panelFlexColumn,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])}>
      <View style={styles.containerStretchRow}>
        <BadgeComponent icon={leader.icon} size={43} />
        <View style={styles.containerStretchColumn}>
          <View style={styles.buttonTextRow}>
            <Text>{leader.name}</Text>
            {renderMoreButton()}
          </View>
          <View>
            {leader.effects.map((anEffect, index) => {
              return <EquipmentEffectComponent key={index} anEffect={anEffect} />;
            })}
          </View>
          <View>
            {renderAssignedTo()}
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
              styles.buttonLight])} onPress={() => props.talkPress(leader)} >
              <IconComponent provider="FontAwesome5" name="hand-paper"
                color="#071f56" size={16} />
              <Text style={styles.buttonTextDark}>{' Say hello'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  function renderMoreButton() {
    return (
      <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItemSmall,
        styles.buttonLight])} onPress={() => props.morePress(leader)}>
        <IconComponent provider="FontAwesome5" name="angle-down"
          color="17265d" size={14} />
        <Text style={StyleSheet.flatten([styles.buttonTextSmall,
          styles.buttonTextDark])}>
          {' More'}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderAssignedTo() {
    let assignedObj: any = {
      icon: {
        provider: 'MaterialCommunityIcons',
        name: 'sleep'
      },
      text: 'Resting'
    };
    if (!leader.eating) {
      assignedObj = {
        icon: {
          provider: 'FontAwesome5',
          name: 'paw'
        },
        text: 'Scavenging'
      };
    }
    else if (!leader.drinking) {
      assignedObj = {
        icon: {
          provider: 'MaterialCommunityIcons',
          name: 'water-off'
        },
        text: 'Scavenging'
      };
    }
    else if (!leader.livingAt) {
      assignedObj = {
        icon: {
          provider: 'MaterialCommunityIcons',
          name: 'tent'
        },
        text: 'Camping'
      };
    }
    else if (leader.assignedTo) {
      const building = buildings[leader.assignedTo];
      const buildingType = buildingTypes[building.buildingType];
      assignedObj = {
        icon: buildingType.icon,
        text: (building.name || buildingType.name)
      };
    }

    return (
      <View style={styles.rows}>
        <BadgeComponent icon={assignedObj.icon} size={21} />
        <Text style={{fontSize: 12}}>
          {' ' + assignedObj.text}
        </Text>
      </View>
    );
  }
}
