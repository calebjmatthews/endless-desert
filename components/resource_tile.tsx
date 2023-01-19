import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';

import Resource from '../models/resource';
import Positioner from '../models/positioner';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';

export default function ResourceTileComponent(props: { resource: Resource, rate?: number,
  pos: Positioner }) {
  const { resource, rate, pos } = props;
  const resourceType = resourceTypes[resource.type];

  return (
    <View style={[styles.resourceTile, {minWidth: pos.thirdWidth, maxWidth: pos.thirdWidth}]}>
      <BadgeComponent icon={resourceType.icon} quality={resource.quality} size={29} />
      <View style={[styles.resourceTileText, {minWidth: pos.thirdWidth, maxWidth: pos.thirdWidth}]}>
        <Text style={{fontSize: 12}}>
          {utils.formatNumberShort(resource.quantity)}
          </Text>
        {rate && <Text style={{fontSize: 12}}>
          {`${(rate > 0) ? '+' : ''}${utils.formatNumberShort(rate)}/m`}
        </Text>}
      </View>
    </View>
  );
}