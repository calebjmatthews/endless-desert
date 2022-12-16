import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import AddStopRow from './add_stop_row';
import StopRow from './stop_row';

import { destinations } from '../../instances/destinations';

export default function RouteComponent(props: { expeditionId: string }) {
  const { expeditionId } = props;
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const destination = expedition.customDestination || destinations[expedition.mainDestinationId || ''];

  return (
    <View style={styles.columns}>
      <AddStopRow expeditionId={expeditionId} position="before" />
      <StopRow expeditionId={expeditionId} destination={destination} position="main" />
      <AddStopRow expeditionId={expeditionId} position="after" />
      <View style={styles.breakSmall} />
    </View>
  )
};