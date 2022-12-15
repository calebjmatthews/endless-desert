import React from 'react';
import { Text, View } from 'react-native';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import IconComponent from '../icon';

import Resource from '../../models/resource';
import Icon from '../../models/icon';
import { dromedaryTypes } from '../../instances/dromedary_types';
import { utils } from '../../utils';

export default function DromedaryStatsComponent(props: { expeditionId: string }) {
  const { expeditionId } = props;
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const pos = useTypedSelector(state => state.ui.positioner);

  const getStats = (dromedaries: { [typeQuality: string] : Resource }) : Stat[] => {
    let speedTotal = 0;
    let capacity = 0;
    let count = 0;
    Object.keys(dromedaries).forEach((typeQuality) => {
      const dromedaryResource = dromedaries[typeQuality];
      const dromedaryType = dromedaryTypes[dromedaryResource.type];
      count += dromedaryResource.quantity;
      speedTotal += dromedaryType.speed * dromedaryResource.quantity;
      capacity += dromedaryType.capacity * dromedaryResource.quantity;
    });
    const speed = speedTotal / count;
    return [
      {
        label: 'Speed',
        extent: `${utils.formatNumberShort(speed, true)} le/hr`,
        icon: new Icon({ provider: 'FontAwesome', name: 'clock-o', color: '#444'})
      },
      {
        label: 'Capacity',
        extent: `${utils.formatNumberShort(capacity)}`,
        icon: new Icon({ provider: 'FontAwesome5', name: 'shopping-bag', color: '#444'})
      },
    ];
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