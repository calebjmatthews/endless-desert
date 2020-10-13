import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Text, View, FlatList, Button, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import { displayModal } from '../actions/ui';

import Building from '../models/building';
import BuildingType from '../models/building_type';
import { buildingTypes } from '../instances/building_types';
import { resourceTypes } from '../instances/resource_types';
import { MODALS } from '../enums/modals';

export default function BuildComponent() {
  const dispatch = useDispatch();
  let buildingsArray = Object.keys(buildingTypes).map((id) => {
    return buildingTypes[id];
  });
  buildingsArray = buildingsArray.filter((buildingType) => {
    if (buildingType.cost != null) {
      return buildingType;
    }
  });

  function renderBuilding(building: any) {
    return <BuildingDescription building={building} />
  }
  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading1}>
          Build
        </Text>
      </View>
      <FlatList
        data={buildingsArray}
        renderItem={renderBuilding}
        keyExtractor={building => building.name}>
      </FlatList>
    </View>
  );
}

function BuildingDescription(props: any) {
  let buildingType: BuildingType = props.building.item;
  return (
    <View style={styles.panelFlex}>
      <BadgeComponent
        provider={buildingType.icon.provider}
        name={buildingType.icon.name}
        foregroundColor={buildingType.foregroundColor}
        backgroundColor={buildingType.backgroundColor}
        iconSize={18} />
      <View style={styles.containerStretchColumn}>
        <Text>{buildingType.name}</Text>
        <Text>{renderCost(buildingType.cost)}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonRowItem}>
            <Text style={styles.buttonText}>Build</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRowItem}>
            <Text style={styles.buttonText}>Info</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function renderCost(cost: {resource: string, quantity: number}[]|null) {
  if (cost == null) {
    return null;
  }
  let costString = 'Cost: ';
  cost.map((aCost) => {
    costString += (aCost.quantity + ' ' + aCost.resource + ', ');
  });
  costString = costString.slice(0, -2);
  return (
    <Text>{costString}</Text>
  )
}
