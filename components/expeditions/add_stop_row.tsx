import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import { displayModalValue } from '../../actions/ui';

import IconComponent from '../icon';
import { MODALS } from '../../enums/modals';

export default function AddStopRow(props: { expeditionId: string, position: 'embarking'|'returning' }) {
  const { expeditionId, position } = props;
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const pos = useTypedSelector(state => state.ui.positioner);
  const dispatch = useDispatch();

  return (
    <View style={styles.rows}>
      <>
        <View style={[styles.routeLine, {height: 18}]} />
        <View style={styles.routeIconWrapper} />
      </>
      <TouchableOpacity style={[styles.buttonSubtle, {justifyContent: 'flex-start', marginLeft: 0,
        minWidth: pos.buttonWithCancelOnSide,  maxWidth: pos.buttonWithCancelOnSide, opacity: 0.9}]}
        onPress={() => dispatch(displayModalValue(MODALS.DESTINATION_SELECT, 'open',
        { expeditionId: expedition.id, position,
          exclude: expedition.getDestinationIdsToExclude(position) }))}>
        <IconComponent provider='FontAwesome5' name='plus-circle' color='#888'
          size={12} />
        <Text style={[styles.mutedText, { fontSize: 12 }]}>
          {` Add stop`}
        </Text>
      </TouchableOpacity>
    </View>
    
  );
}