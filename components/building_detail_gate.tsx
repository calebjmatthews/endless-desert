import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet }
  from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import TreasureEffects from './treasure_effects';
import { displayModalValue } from '../actions/ui';
import { DISPLAY_TREASURE } from '../actions/account';

import { treasures } from '../instances/treasures';
import { resourceTypes } from '../instances/resource_types';
import { MODALS } from '../enums/modals';
import Resource from '../models/resource';

export default function BuildingDetailGateComponent(props: { buildingId: string }) {
  const { buildingId } = props;
  const dispatch = useDispatch();
  const treasuresDisplayed = useTypedSelector(state => state.account.treasuresDisplayed);
  const unsortedArray = Object.keys(treasuresDisplayed).map((name) =>
    ({ name, timestamp: treasuresDisplayed[name] }));
  const treasuresArray = unsortedArray.sort((a, b) => (a.timestamp - b.timestamp));
  const positioner = useTypedSelector(state => state.ui.positioner);

  return (
    <View style={styles.columns}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonLarge} onPress={() => {
          dispatch(displayModalValue(MODALS.RESOURCE_SELECT_ONE, 'open',
            {type: DISPLAY_TREASURE, buildingId}));}}>
          <IconComponent
            provider='MaterialCommunityIcons' name='treasure-chest'
            color="#fff" size={18} style={styles.headingIcon} />
          <Text style={[styles.buttonText, {fontSize: 16}]}>
            {` Display New Treasure`}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.break} />
      {treasuresArray.map((treasureObj) => {
        const treasure = treasures[treasureObj.name];
        const resourceType = resourceTypes[treasureObj.name];
        return (
          <TouchableOpacity key={treasureObj.name} style={StyleSheet.flatten([styles.panelFlexColumn,
            {minWidth: positioner.majorWidth, maxWidth: positioner.majorWidth, alignItems: 'flex-start'}])}
            onPress={() => { resourceDetailOpen(new Resource({
              type: treasure.typeName, quality: 0, quantity: 0
            })) }}>
            <View style={styles.rows}>
              <BadgeComponent icon={resourceType.icon} size={29} />
              <View style={[styles.containerStretchColumn,
                {minWidth: positioner.bodyMedWidth, maxWidth: positioner.bodyMedWidth}]}>
                <Text>{resourceType.name}</Text>
                <TreasureEffects {...treasures[treasure.typeName]} hideEffectsLabel />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  function resourceDetailOpen(resource: Resource) {
    const typeQuality = resource.type + '|' + resource.quality;
    dispatch(displayModalValue(MODALS.RESOURCE_DETAIL, 'open',
      { typeQuality, displayedTreasure: true, buildingId }));
  }
}