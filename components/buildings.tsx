import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, Button } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import { displayModal } from '../actions/ui';

import Building from '../models/building';
import { buildingTypes } from '../instances/building_types';
import { MODALS } from '../enums/modals';

export default function BuildingsComponent() {
  const dispatch = useDispatch();
  const buildings = useTypedSelector(state => state.buildings);
  const buildingsArray = Object.keys(buildings).map((id) => {
    return buildings[id];
  });

  function startBuilding() {
    dispatch(displayModal(MODALS.BUILD));
  }

  function renderBuilding(building: any) {
    return <BuildingDescription building={building} />
  }
  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading1}>Buildings</Text>
      </View>
      <View style={{display: 'flex', alignItems: 'flex-start', width: '100%',
        marginLeft: 10}}>
        <Button title="+ Build" color="#071f56"
          onPress={() => startBuilding()} />
      </View>
      <FlatList
        data={buildingsArray}
        renderItem={renderBuilding}
        keyExtractor={building => building.id.toString()}>
      </FlatList>
    </View>
  );
}

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
