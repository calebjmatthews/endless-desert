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

function ResourceDescription(props: any) {
  let resourceType = resourceTypes[props.resource.item.type];
  return (
    <View style={styles.panelFlex}>
      <BadgeComponent
        provider={resourceType.icon.provider}
        name={resourceType.icon.name}
        foregroundColor={resourceType.foregroundColor}
        backgroundColor={resourceType.backgroundColor}
        iconSize={18} />
      <Text>
        {props.resource.item.type} x {Math.floor(props.resource.item.quantity)}
      </Text>
    </View>
  );
}

export default function ResourcesComponent() {
  const vault = useTypedSelector(state => state.vault);
  const resourcesArray = Object.keys(vault.resources).map((type) => {
    return vault.resources[type];
  });
  function renderResource(resource: any) {
    return <ResourceDescription resource={resource} />
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
