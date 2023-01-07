import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';

import IconOrSvg from '../icon_or_svg';
import SvgComponent from '../svg';

import Icon from '../../models/icon';
import Destination from '../../models/destination';
import Exploration from '../../models/exploration';
import Positioner from '../../models/positioner';
import { utils } from '../../utils';

export default function DestinationComponent(props: { destination: Destination,
  exploration: Exploration, destinationPress: (destinationId: string) => void,
  addedLength: number, positioner: Positioner }) {
  const { destination, exploration, destinationPress, addedLength, positioner: pos } = props;

  return (
    <TouchableOpacity key={destination.name} style={[styles.panelFlex,
      {minWidth: pos.majorWidth, maxWidth: pos.majorWidth}]}
      onPress={() => destinationPress(destination.id)}>
      <SvgComponent icon={new Icon({ ...destination.icon, size: 40 })} />
      <View style={[styles.containerStretchColumn, { marginLeft: 5 }]}>
        <Text>{destination.name}</Text>
        <View style={styles.breakSmall} />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
          minWidth: pos.bodyMedWidth, maxWidth: pos.bodyMedWidth }}>
          <Text style={[styles.mutedText, {fontSize: 12}]}>
            {`(${destination.getFriendlyCoordinates()})`}
          </Text>
          {addedLength ? (
            <Text style={[styles.mutedText, {fontSize: 12}]}>
              {`+${utils.formatNumberShort(addedLength)} le`}
            </Text>
          ) : null}
        </View>
        <View style={styles.breakSmall} />
        <Text style={{fontSize: 12, fontStyle: 'italic', minWidth: pos.bodyMedWidth, 
          maxWidth: pos.bodyMedWidth}}>
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
}