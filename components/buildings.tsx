import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import ProgressBarComponent from './progress_bar';
import { displayModal } from '../actions/ui';
import { addTimer } from '../actions/timers';

import Building from '../models/building';
import Timer from '../models/timer';
import BuildingType from '../models/building_type';
import { buildingTypes } from '../instances/building_types';
import { MODALS } from '../enums/modals';
import { BUILDING_TYPES } from '../enums/building_types';
import { INTRO_STATES } from '../enums/intro_states';
import { utils } from '../utils';

const BUILDINGS_TO_REPAIR = [BUILDING_TYPES.ABANDONED_MARKET,
  BUILDING_TYPES.BROKEN_CISTERN, BUILDING_TYPES.DECAYING_STUDY,
  BUILDING_TYPES.FALLOW_FIELD, BUILDING_TYPES.RUINED_HUTS,
  BUILDING_TYPES.SHATTERED_GATE];

export default function BuildingsComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const buildings = useTypedSelector(state => state.buildings);
  const buildTimer = useTypedSelector(state => state.timers['Build']);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const introState = useTypedSelector(state => state.account.introState);
  const buildingsArray = Object.keys(buildings).map((id) => {
    return buildings[id];
  });
  let toBuildArray = Object.keys(buildingTypes).map((id) => {
    return buildingTypes[id];
  });
  toBuildArray = toBuildArray.filter((buildingType) => {
    if (buildingType.cost != null
      && researchStatus.buildingsAvailable[buildingType.name]) {
      return buildingType;
    }
  });

  function startBuilding() {
    dispatch(displayModal(MODALS.BUILD));
  }

  function renderBuilding(building: any) {
    return <BuildingDescription building={building} introState={introState}
      upgradePress={upgradePress} />
  }
  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="building" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Buildings'}</Text>
      </View>
      {renderBuildTimer(buildTimer)}
      <FlatList
        data={buildingsArray}
        renderItem={renderBuilding}
        keyExtractor={building => building.id.toString()}>
      </FlatList>
    </View>
  );

  function renderBuildButton() {
    if (toBuildArray.length > 0) {
      return (
        <View style={{display: 'flex', alignItems: 'flex-start', width: '100%',
          marginLeft: 10}}>
          <TouchableOpacity style={styles.buttonLarge}
            onPress={() => startBuilding()} >
            <IconComponent provider="FontAwesome5" name="hammer" color="#fff" size={16}
              style={styles.headingIcon} />
            <Text style={styles.buttonTextLarge}>{' Build'}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return null;
    }
  }

  function renderBuildTimer(timer: Timer) {
    if (timer) {
      if (timer.buildingToBuild || timer.buildingToUpgrade) {
        let label = ('Building ' + timer.buildingToBuild);
        if (timer.buildingToUpgrade) {
          let buildingType =
            buildingTypes[buildings[timer.buildingToUpgrade].buildingType]
          label = ('Upgrading ' + buildingType.name);
        }
        return (
          <View style={styles.panelFlexColumn}>
            <Text>{label}</Text>
            <ProgressBarComponent staticDuration={true}
              startingProgress={timer.progress} endingProgress={1}
              duration={timer.endsAt - new Date(Date.now()).valueOf()}
              label={timer.remainingLabel} />
          </View>
        )
      }
    }
    return null;
  }

  function upgradePress(building: Building) {
    let buildingType = buildingTypes[building.buildingType];
    let enoughResources = true;
    if (buildingType.upgradeCost == null) { return null; }
    let resourceCost: {type: string, quantity: number}[] = [];
    let totalValue = 0;
    buildingType.upgradeCost.map((aCost) => {
      if (vault.resources[aCost.resource].quantity < aCost.quantity) {
        enoughResources = false;
      }
      resourceCost.push({type: aCost.resource, quantity: aCost.quantity});
    });
    if (buildingType.upgradesInto && buildingTypes[buildingType.upgradesInto]) {
      let upgType = buildingTypes[buildingType.upgradesInto];
      if (upgType.upgradeDuration) {
        if (enoughResources && buildingType.duration) {
          dispatch(addTimer(new Timer({
            name: 'Build',
            startedAt: new Date(Date.now()).valueOf(),
            endsAt: (new Date(Date.now()).valueOf() + upgType.upgradeDuration * 1000),
            progress: 0,
            remainingLabel: '',
            resourcesToConsume: resourceCost,
            buildingToUpgrade: building.id,
            messageToDisplay: ('You upgraded ' + buildingType.name + ' into '
              + upgType.name + '.'),
            iconToDisplay: buildingType.icon,
            iconForegroundColor: buildingType.foregroundColor,
            iconBackgroundColor: buildingType.backgroundColor
          })));
          dispatch(displayModal(null));
        }
      }
    }
    else {
      console.log('Not enough resources!');
    }
  }
}

function BuildingDescription(props: any) {
  const buildingType = buildingTypes[props.building.item.buildingType];
  let upgradeLabel = ' Upgrade';
  if (utils.arrayIncludes(BUILDINGS_TO_REPAIR, buildingType.name)) {
    upgradeLabel = ' Repair';
  }
  let upgradeDisabled = false;
  let upgradeStyle: any = styles.buttonRowItem;
  if (props.introState == INTRO_STATES.REPAIR_CISTERN
    && buildingType.name != BUILDING_TYPES.BROKEN_CISTERN) {
    upgradeDisabled = true;
    upgradeStyle = StyleSheet.flatten([styles.buttonRowItem, styles.buttonDisabled]);
  }
  if (!buildingType.upgradesInto) {
    upgradeStyle = StyleSheet.flatten([styles.buttonRowItem, {opacity: 0}]);
  }

  return (
    <View style={styles.panelFlex}>
      <BadgeComponent
        provider={buildingType.icon.provider}
        name={buildingType.icon.name}
        foregroundColor={buildingType.foregroundColor}
        backgroundColor={buildingType.backgroundColor}
        iconSize={18} />
      <View style={styles.containerStretchColumn}>
        <Text>{props.building.item.buildingType}</Text>
        <Text>{renderCost(buildingType.upgradeCost)}</Text>
        <View style={styles.buttonRow}>
        <TouchableOpacity style={upgradeStyle} disabled={upgradeDisabled}
          onPress={() => props.upgradePress(props.building.item)} >
          <IconComponent provider="FontAwesome5" name="hammer"
            color="#fff" size={16} />
          <Text style={styles.buttonText}>{upgradeLabel}</Text>
        </TouchableOpacity>
          <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
            styles.buttonLight])}>
            <IconComponent provider="FontAwesome5" name="angle-down"
              color="#17265d" size={16} />
            <Text style={styles.buttonTextDark}>{' Info'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  function renderCost(cost: {resource: string, quantity: number}[]|null|undefined) {
    if (!cost) {
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
}
