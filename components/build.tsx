import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import { displayModal, displayModalValue } from '../actions/ui';
import { addBuilding } from '../actions/buildings';
import { addBuildingConstruction } from '../actions/buildings_construction';
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
  const buildingsConstruction = useTypedSelector(state => state.buildingsConstruction);
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

  function renderBuilding(building: any) {
    return <BuildingDescription building={building} buildPress={buildPress} />
  }

  function renderNothingMessage(buildingsArray: BuildingType[]) {
    if (buildingsArray.length == 0) {
      return (
        <Text style={styles.bareText}>{'- Nothing available to build -'}</Text>
      );
    }
    return null;
  }

  function buildPress(buildingType: BuildingType) {
    let buildingCon = buildingsConstruction[buildingType.name];
    if (!buildingCon) {
      let count = countBuildings(buildingType.name, buildings);
      let suffix = 1;
      let name = buildingType.name;
      if (count > 0) {
        suffix = count+1;
        name += (' ' + utils.numberToRoman(suffix));
      }
      buildingCon = new Building({
        id: utils.randHex(16),
        buildingType: buildingType.name,
        suffix: suffix,
        name: name,
        paidCosts: {},
        paidResources: [],
        paidUpgradeCosts: {},
        paidUpgradeResources: []
      });
      dispatch(addBuildingConstruction(buildingCon));
    }

    dispatch(displayModalValue(MODALS.BUILD_DETAIL, 'open', buildingCon));
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
            onPress={() => props.buildPress(buildingType)}  >
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

function renderCost(cost: {specificity: string, type: string,
  quantity: number}[]|null) {
  if (cost == null) {
    return null;
  }
  let costString = 'Cost: ';
  cost.map((aCost) => {
    costString += (utils.formatNumberShort(aCost.quantity) + ' '
    + aCost.type + ', ');
  });
  costString = costString.slice(0, -2);
  return (
    <Text>{costString}</Text>
  )
}

function countBuildings(buildingName: string,
  buildings: { [id: string] : Building }) {
  let count = 0;
  Object.keys(buildings).map((id) => {
    if (buildings[id].buildingType == buildingName) {
      count++;
    }
  });
  return count;
}
