import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import EquipmentEffectComponent from './equipment_effect';
import { displayModalValue } from '../actions/ui';

import Leader from '../models/leader';
import Positioner from '../models/positioner';
import Building from '../models/building';
import { buildingTypes } from '../instances/building_types';
import { MODALS } from '../enums/modals';

export default function LeadersComponent() {
  const dispatch = useDispatch();
  const leaders = useTypedSelector(state => state.leaders);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const buildings = useTypedSelector(state => state.buildings);
  const leaderArray = Object.keys(leaders).map((id) => {
    return leaders[id];
  });

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
      return <LeaderDescription key={leader.id}
        leader={leader} positioner={positioner}
        buildings={buildings} morePress={morePress} />
    });
  }

  function morePress(leader: Leader) {
    dispatch(displayModalValue(MODALS.LEADER_DETAIL, 'open', leader));
  }
}

function LeaderDescription(props: {leader: Leader, positioner: Positioner,
  buildings: { [id: string] : Building }, morePress: Function}) {
  const leader: Leader = props.leader;
  const buildings: { [id: string] : Building } = props.buildings;
  const circleBgColor = leader.backgroundColor;

  return (
    <View style={StyleSheet.flatten([styles.panelFlexColumn,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])}>
      <View style={styles.containerStretchRow}>
        <View style={{width: 40, height: 40, display: 'flex',
          justifyContent: 'center', alignItems: 'center'}}>
          <View style={StyleSheet.flatten([styles.leaderCircle,
            {backgroundColor: circleBgColor}])} />
          <IconComponent style={{position: 'absolute'}}
            provider={leader.icon.provider}
            name={leader.icon.name}
            color={leader.foregroundColor}
            size={18} />
        </View>
        <View style={styles.containerStretchColumn}>
          <Text>
            {leader.name}
          </Text>
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
              styles.buttonLight])} onPress={() => props.morePress(leader)} >
              <IconComponent provider="FontAwesome5" name="question-circle"
                color="#071f56" size={16} />
              <Text style={styles.buttonTextDark}>{' Info'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  function renderAssignedTo() {
    let assignedObj: any = {
      iconProvider: 'MaterialCommunityIcons',
      iconName: 'sleep',
      iconForegroundColor: '#000',
      iconBackgroundColor: '#fff',
      text: 'Resting'
    };
    if (!leader.eating) {
      assignedObj = {
        iconProvider: 'FontAwesome5',
        iconName: 'paw',
        iconForegroundColor: '#000',
        iconBackgroundColor: '#fff',
        text: 'Scavenging'
      };
    }
    else if (!leader.drinking) {
      assignedObj = {
        iconProvider: 'MaterialCommunityIcons',
        iconName: 'water-off',
        iconForegroundColor: '#000',
        iconBackgroundColor: '#fff',
        text: 'Scavenging'
      };
    }
    else if (!leader.livingAt) {
      assignedObj = {
        iconProvider: 'MaterialCommunityIcons',
        iconName: 'tent',
        iconForegroundColor: '#000',
        iconBackgroundColor: '#fff',
        text: 'Camping'
      };
    }
    else if (leader.assignedTo) {
      const building = buildings[leader.assignedTo];
      const buildingType = buildingTypes[building.buildingType];
      assignedObj = {
        iconProvider: buildingType.icon.provider,
        iconName: buildingType.icon.name,
        iconForegroundColor: buildingType.foregroundColor,
        iconBackgroundColor: buildingType.backgroundColor,
        text: buildingType.name
      };
    }

    return (
      <View style={styles.rows}>
        <BadgeComponent
          provider={assignedObj.iconProvider}
          name={assignedObj.iconName}
          foregroundColor={assignedObj.iconForegroundColor}
          backgroundColor={assignedObj.iconBackgroundColor}
          iconSize={14} />
        <Text style={{fontSize: 12}}>
          {' ' + assignedObj.text}
        </Text>
      </View>
    );
  }
}
