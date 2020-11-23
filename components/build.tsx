import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import { displayModal } from '../actions/ui';
import { addBuilding } from '../actions/buildings';
import { consumeResources } from '../actions/vault';
import { setRates } from '../actions/rates';
import { addTimer } from '../actions/timers';

import Building from '../models/building';
import BuildingType from '../models/building_type';
import Hourglass from '../models/hourglass';
import Timer from '../models/timer';
import { buildingTypes } from '../instances/building_types';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { MODALS } from '../enums/modals';

export default function BuildComponent() {
  const dispatch = useDispatch();
  const buildings = useTypedSelector(state => state.buildings);
  const vault = useTypedSelector(state => state.vault);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  let buildingsArray = Object.keys(buildingTypes).map((id) => {
    return buildingTypes[id];
  });
  buildingsArray = buildingsArray.filter((buildingType) => {
    if (buildingType.cost != null
      && researchStatus.buildingsAvailable[buildingType.name]) {
      return buildingType;
    }
  });

  function build(buildingType: BuildingType) {
    let enoughResources = true;
    if (buildingType.cost == null) { return null; }
    let resourceCost: {type: string, quantity: number}[] = [];
    let totalValue = 0;
    buildingType.cost.map((aCost) => {
      if (vault.resources[aCost.resource].quantity < aCost.quantity) {
        enoughResources = false;
      }
      resourceCost.push({type: aCost.resource, quantity: aCost.quantity});
    });
    if (enoughResources && buildingType.duration) {
      dispatch(addTimer(new Timer({
        name: 'Build',
        startedAt: new Date(Date.now()).valueOf(),
        endsAt: (new Date(Date.now()).valueOf() + buildingType.duration * 1000),
        progress: 0,
        remainingLabel: '',
        resourcesToConsume: resourceCost,
        buildingToBuild: buildingType.name,
        messageToDisplay: ('You built a new ' + buildingType.name + '.'),
        iconToDisplay: buildingType.icon,
        iconForegroundColor: buildingType.foregroundColor,
        iconBackgroundColor: buildingType.backgroundColor
      })));
      dispatch(displayModal(null));
    }
    else {
      console.log('Not enough resources!');
    }
  }

  function renderBuilding(building: any) {
    return <BuildingDescription building={building} build={build} />
  }
  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="hammer" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Build'}</Text>
      </View>
      {renderNothingMessage(buildingsArray)}
      <FlatList
        data={buildingsArray}
        renderItem={renderBuilding}
        keyExtractor={building => building.name}>
      </FlatList>
    </View>
  );

  function renderNothingMessage(buildingsArray: BuildingType[]) {
    if (buildingsArray.length == 0) {
      return (
        <Text style={styles.bareText}>{'- Nothing available to build -'}</Text>
      );
    }
    return null;
  }
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
          <TouchableOpacity style={styles.buttonRowItem}
            onPress={() => props.build(buildingType)}  >
            <IconComponent provider="MaterialIcons" name="build"
              color="#fff" size={16} style={styles.headingIcon} />
            <Text style={styles.buttonText}>{' Start'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRowItem}>
            <IconComponent provider="FontAwesome5" name="angle-down"
              color="#fff" size={16} style={styles.headingIcon} />
            <Text style={styles.buttonText}>{' Info'}</Text>
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
