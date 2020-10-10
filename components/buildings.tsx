import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';

import Building from '../models/building';
import { buildingTypes } from '../instances/building_types';

function BuildingDescription(props: any) {
  let buildingType = buildingTypes[props.building.item.buildingType];
  return (
    <View style={styles.panelFlex}>
      <BadgeComponent
        provider={buildingType.icon.provider}
        name={buildingType.icon.name}
        foregroundColor={buildingType.foregroundColor}
        backgroundColor={buildingType.backgroundColor}
        iconSize={18} />
      <Text>{props.building.item.buildingType}</Text>
    </View>
  );
}

export default function BuildingsComponent(props: BuildingsProps) {
  const buildingsArray = Object.keys(props.buildings).map((id) => {
    return props.buildings[id];
  });
  function renderBuilding(building: any) {
    return <BuildingDescription building={building} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading1}>Buildings</Text>
      </View>
      <FlatList
        data={buildingsArray}
        renderItem={renderBuilding}
        keyExtractor={building => building.id.toString()}>
      </FlatList>
    </View>
  );
}

interface BuildingsProps {
  buildings: { [id: string] : Building }
}
