import React from 'react';
import { View } from 'react-native';
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
      <AddStopRow expeditionId={expeditionId} position="embarking" />
      {expedition.embarkingDestinationIds.map((destinationId) => (
        <StopRow key={`embarking-${destinationId}`} expeditionId={expeditionId} 
          destination={destinations[destinationId]} position="embarking" />
      ))}
      <StopRow expeditionId={expeditionId} destination={destination} position="main" />
      {expedition.returningDestinationIds.map((destinationId) => (
        <StopRow key={`returning-${destinationId}`} expeditionId={expeditionId} 
          destination={destinations[destinationId]} position="returning" />
      ))}
      <AddStopRow expeditionId={expeditionId} position="returning" />
      <View style={styles.breakSmall} />
    </View>
  )
};