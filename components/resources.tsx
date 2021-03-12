import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';

import ResourceType from '../models/resource_type';
import Resource from '../models/resource';
import Vault from '../models/vault';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';

export default function ResourcesComponent() {
  const vault = useTypedSelector(state => state.vault);
  const rates = useTypedSelector(state => state.rates);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const resourcesArray = Object.keys(vault.resources).map((typeQuality) => {
    return vault.resources[typeQuality];
  });
  function renderResource(resource: any) {
    return <ResourceDescription resource={resource} rates={rates}
      positioner={positioner} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome" name="cube" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Resources'}</Text>
      </View>
      <FlatList
        data={resourcesArray}
        renderItem={renderResource}
        keyExtractor={resource => (resource.type + '|' + resource.quality)}>
      </FlatList>
    </View>
  );
}

function ResourceDescription(props: any) {
  const resource: Resource = props.resource.item;
  let resourceType = resourceTypes[resource.type];
  let rate = props.rates.netRates[resource.type + '|' + resource.quality];
  if (rate) {
    let sign = '+';
    if (rate < 0) { sign = ''; }
    rate = (sign + (Math.round(rate)) + '/m');
  }
  else {
    rate = '';
  }
  return (
    <View style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])}>
      <BadgeComponent
        provider={resourceType.icon.provider}
        name={resourceType.icon.name}
        foregroundColor={resourceType.foregroundColor}
        backgroundColor={resourceType.backgroundColor}
        iconSize={18} />
      <View style={styles.containerStretchRow}>
        <View>
          <Text>
            {props.resource.item.type}
          </Text>
          <Text>
            {rate}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={{fontSize: 20}}>
            {utils.formatNumberShort(props.resource.item.quantity)}
          </Text>
        </View>
      </View>

    </View>
  );
}
