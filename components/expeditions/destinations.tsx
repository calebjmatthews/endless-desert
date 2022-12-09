import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import IconOrSvg from '../icon_or_svg';
import SvgComponent from '../svg';
import { setDestination } from '../../actions/expedition_status';

import Icon from '../../models/icon';
import Destination from '../../models/destination';
import Expedition from '../../models/expedition';
import { destinations } from '../../instances/destinations';
import { explorations } from '../../instances/explorations';
import { utils } from '../../utils';

export default function DestinationsComponent(props: { expedition: Expedition,
  setDestinationsOpen: (destinationsOpen: boolean) => void }) {
  const dispatch = useDispatch();
  const { expedition, setDestinationsOpen } = props;
  const positioner = useTypedSelector(state => state.ui.positioner);
  const researchStatus = useTypedSelector(state => state.researchStatus);

  const destinationPress = (destination: Destination) => {
    dispatch(setDestination({
      expeditionId: expedition.id,
      destinationId: destination.id,
      endCoordinates: destination.coordinates
    }));
    setDestinationsOpen(false);
  }

  return (
    <View style={styles.columns}>
      <Text style={[styles.heading2, styles.bareText]}>{`Pick a destination: `}</Text>
      {Object.keys(destinations).map((name) => {
        const destination = destinations[name];
        const exploration = explorations[destination.atFinish.id];
        if (!researchStatus.destinationsAvailable[name] || !exploration) { return null; }
        return (
          <TouchableOpacity key={destination.name} style={[styles.panelFlex,
            {minWidth: positioner.majorWidth, maxWidth: positioner.majorWidth}]}
            onPress={() => destinationPress(destination)}>
            <SvgComponent icon={new Icon({ ...destination.icon, size: 40 })} />
            <View style={[styles.containerStretchColumn, { marginLeft: 5 }]}>
              <Text>{destination.name}</Text>
              <View style={styles.breakSmall} />
              <Text style={{fontSize: 12, fontStyle: 'italic', minWidth: positioner.bodyMedWidth, 
                maxWidth: positioner.bodyMedWidth}}>
                {exploration.description}
              </Text>
              <View style={styles.breakSmall} />
              <View style={styles.rows}>
                <Text>{`Rewards: `}</Text>
                {exploration.treasures.map((treasure) => {
                  const resourceKind = utils.getMatchingResourceKind(treasure.specificity, treasure.type);
                  return (
                    <View key={`${destination.name}-${treasure.type}`} style={{marginRight: 2}}>
                      <IconOrSvg icon={new Icon({...resourceKind.icon, size: 18})} />
                    </View>
                  );
                })}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}