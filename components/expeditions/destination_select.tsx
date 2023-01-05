import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import IconComponent from '../icon';
import DestinationComponent from './destination';
import { removeFromDestinations, setDestination } from '../../actions/expedition_status';

import { destinations } from '../../instances/destinations';
import { explorations } from '../../instances/explorations';
import { utils } from '../../utils';
import { displayModalValue } from '../../actions/ui';

export default function DestinationSelectComponent() {
  const dispatch = useDispatch();
  const positioner = useTypedSelector(state => state.ui.positioner);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const modalValue = useTypedSelector(state => state.ui.modalValue);
  const { expeditionId, position, exclude } = modalValue;
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);

  const destinationPress = (destinationId: string) => {
    const destination = destinations[destinationId];
    if (position === 'main') {
      dispatch(removeFromDestinations({ expeditionId, destinationId }));
    }
    if (position === 'embarking'
      || (position === 'main' && expedition.embarkingDestinationIds.length === 0)) {
      dispatch(setDestination({ expeditionId, position, destinationId,
        targetCoordinates: destination.coordinates }));
    }
    else {
      dispatch(setDestination({ expeditionId, position, destinationId }));
    }
    dispatch(displayModalValue(null, 'closed', null));
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="route" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Select Destination'}</Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
          {Object.keys(destinations).map((id) => {
            if (utils.arrayIncludes(exclude, id)) { return null; }
            const destination = destinations[id];
            const exploration = explorations[destination.atFinish.id];
            if (!researchStatus.destinationsAvailable[id] || !exploration) { return null; }
            return <DestinationComponent key={destination.name} destination={destination}
              exploration={exploration} destinationPress={destinationPress} positioner={positioner} />
          })}
        </ScrollView>
      </View>
    </View>
  );
}