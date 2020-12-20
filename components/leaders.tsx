import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';

import Leader from '../models/leader';
import Positioner from '../models/positioner';

export default function LeadersComponent() {
  const dispatch = useDispatch();
  const leaders = useTypedSelector(state => state.leaders);
  const positioner = useTypedSelector(state => state.ui.positioner);
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
        leader={leader} positioner={positioner} />
    });
  }
}

function LeaderDescription(props: {leader: Leader, positioner: Positioner}) {
  const leader: Leader = props.leader;
  const circleBgColor = leader.backgroundColor;

  return (
    <View style={StyleSheet.flatten([styles.panelFlexColumn,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])}>
      <View style={styles.containerStretchRow}>
        <View style={{width: 40, height: 40}}>
          <View style={StyleSheet.flatten([styles.leaderCircle,
            {backgroundColor: circleBgColor}])} />
          <IconComponent style={{position: 'absolute',
              paddingHorizontal: leader.paddingHorizontal,
              paddingVertical: leader.paddingVertical}}
            provider={leader.icon.provider}
            name={leader.icon.name}
            color={leader.foregroundColor}
            size={18} />
        </View>
        <View style={styles.containerStretchColumn}>
          <Text>
            {leader.name}
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
              styles.buttonLight])}>
              <IconComponent provider="FontAwesome5" name="question-circle"
                color="#071f56" size={16} />
              <Text style={styles.buttonTextDark}>{' Info'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
