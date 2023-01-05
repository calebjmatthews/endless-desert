import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import IconComponent from '../icon';
import SvgComponent from '../svg';
import { displayModalValue } from '../../actions/ui';

import Destination from '../../models/destination';
import Icon from '../../models/icon';
import { MODALS } from '../../enums/modals';

export default function StopRow(props: {
  expeditionId: string,
  destination: Destination,
  position: 'embarking'|'main'|'returning'
}) {
  const dispatch = useDispatch();
  const { expeditionId, destination, position } = props;
  const pos = useTypedSelector(state => state.ui.positioner);

  return (
    <View key={destination.id} style={styles.rows}>
      {(position === 'embarking' || position === 'returning') && (
        <>
          <View style={styles.routeLine} />
          <View style={styles.routeIconWrapper}>
            <IconComponent provider="FontAwesome" name="circle-o" color="#888888" size={14}
              style={{textShadowColor: '#fff', textShadowRadius: 5}} />
          </View>
        </>
      )}
      {(position === 'main') && (
        <>
          <View style={styles.routeLine} />
          <View style={styles.routeIconWrapper}>
            <IconComponent provider="FontAwesome5" name="map-marker-alt" color="#d60000" size={20}
              style={{textShadowColor: '#fff', textShadowRadius: 5}} />
          </View>
        </>

      )}
      <TouchableOpacity style={[styles.buttonSubtle, {justifyContent: 'flex-start',
        minWidth: pos.buttonWithCancelOnSide, maxWidth: pos.buttonWithCancelOnSide,
        marginLeft: 0}]}
        onPress={() => dispatch(displayModalValue(MODALS.DESTINATION_SELECT, 'open', { expeditionId, 
          position, exclude: [] }))}>
        <SvgComponent icon={new Icon(destination.icon)} />
        <Text style={{display: 'flex', flexDirection: 'column', marginLeft: 4}}>
          <Text>{destination.name}</Text>
          <Text style={[styles.mutedText, {fontSize: 12}]}>
            {`(${destination.getFriendlyCoordinates()})`}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}