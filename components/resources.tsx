import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import BadgeComponent from './badge';

import ResourceType from '../models/resource_type';
import Resource from '../models/resource';
import Vault from '../models/vault';
import { resourceTypes } from '../instances/resource_types';

export default function ResourcesComponent() {
  const vault = useTypedSelector(state => state.vault);
  const rates = useTypedSelector(state => state.rates);
  const resourcesArray = Object.keys(vault.resources).map((type) => {
    return vault.resources[type];
  });
  function renderResource(resource: any) {
    return <ResourceDescription resource={resource} rates={rates} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading1}>Resources</Text>
      </View>
      <FlatList
        data={resourcesArray}
        renderItem={renderResource}
        keyExtractor={resource => resource.type}>
      </FlatList>
    </View>
  );
}

function ResourceDescription(props: any) {
  let resourceType = resourceTypes[props.resource.item.type];
  let rate = props.rates.netRates[props.resource.item.type]
  if (props.rates.netRates[props.resource.item.type]) {
    let sign = '+';
    if (rate < 0) { sign = '-'; }
    rate = (sign + (rate / 60).toFixed(1) + '/s');
  }
  else {
    rate = '-';
  }
  return (
    <View style={styles.panelFlex}>
      <BadgeComponent
        provider={resourceType.icon.provider}
        name={resourceType.icon.name}
        foregroundColor={resourceType.foregroundColor}
        backgroundColor={resourceType.backgroundColor}
        iconSize={18} />
      <View style={styles.containerStretch}>
        <View>
          <Text>
            {props.resource.item.type}
          </Text>
          <Text>
            {rate}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={{fontSize: 20}}>{Math.floor(props.resource.item.quantity)}</Text>
        </View>
      </View>

    </View>
  );
}
