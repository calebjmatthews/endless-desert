import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import ProgressBarComponent from './progress_bar';
import { displayModal } from '../actions/ui';

import Building from '../models/building';
import Timer from '../models/timer';
import { buildingTypes } from '../instances/building_types';
import { MODALS } from '../enums/modals';

export default function BuildingsComponent() {
  const dispatch = useDispatch();
  const buildings = useTypedSelector(state => state.buildings);
  const buildTimer = useTypedSelector(state => state.timers['Build']);
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
        <IconComponent provider="FontAwesome5" name="building" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Buildings'}</Text>
      </View>
      <View style={{display: 'flex', alignItems: 'flex-start', width: '100%',
        marginLeft: 10}}>
        <TouchableOpacity style={styles.buttonLarge}
          onPress={() => startBuilding()} >
          <IconComponent provider="FontAwesome5" name="hammer" color="#fff" size={16}
            style={styles.headingIcon} />
          <Text style={styles.buttonTextLarge}>{' Build'}</Text>
        </TouchableOpacity>
      </View>
      {renderBuildTimer(buildTimer)}
      <FlatList
        data={buildingsArray}
        renderItem={renderBuilding}
        keyExtractor={building => building.id.toString()}>
      </FlatList>
    </View>
  );

  function renderBuildTimer(timer: Timer) {
    if (timer) {
      if (timer.buildingToBuild) {
        return (
          <View style={styles.panelFlexColumn}>
            <Text>{'Building ' + timer.buildingToBuild}</Text>
            <ProgressBarComponent startingProgress={timer.progress}
              endingProgress={1}
              duration={timer.endsAt - new Date(Date.now()).valueOf()}
              label={timer.remainingLabel} />
          </View>
        )
      }
    }
    return null;
  }
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
