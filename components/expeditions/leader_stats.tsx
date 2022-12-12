import React from 'react';
import { Text, View } from 'react-native';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import IconComponent from '../icon';

import Icon from '../../models/icon';
import Resource from '../../models/resource';
import { leaderTypes } from '../../instances/leader_types';
import { utils } from '../../utils';

export default function LeaderStatsComponent(props: { expeditionId: string }) {
  const { expeditionId } = props;
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const pos = useTypedSelector(state => state.ui.positioner);

  const getStats = (leaders: { [typeQuality: string] : Resource }) : Stat[] => {
    return [];
  }
  const stats = getStats(expedition?.dromedaries || {});

  return (
    <View style={styles.rows}>
      {stats.map((stat) => (
        <View key={stat.label} style={[styles.rows, {paddingHorizontal: 6, minWidth: pos.minorWidth, maxWidth: pos.minorWidth}]}>
          <IconComponent {...stat.icon} size={14} />
          <Text>
            <Text style={styles.emphasis}>{` ${stat.label}: `}</Text>
            <Text>{stat.extent}</Text>
          </Text>
        </View>
      ))}
    </View>
  );
}

class Stat {
  label: string = '';
  extent: string = '';
  icon: Icon = new Icon({provider: '', name: ''});
}