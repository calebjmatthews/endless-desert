import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { styles } from '../styles';

import ResourceType from '../models/resource_type';
import Resource from '../models/resource';
import Vault from '../models/vault';

function ResourceDescription(props: any) {
  return (
    <View>
      <Text>{props.resource.item.type} x {Math.floor(props.resource.item.quantity)}</Text>
    </View>
  );
}

export default function ResourcesComponent(props: ResourcesProps) {
  const resourcesArray = Object.keys(props.vault.resources).map((type) => {
    return props.vault.resources[type];
  });
  function renderResource(resource: any) {
    return <ResourceDescription resource={resource} />
  }

  return (
    <View style={styles.container}>
      <View>
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

interface ResourcesProps {
  vault: Vault;
}
