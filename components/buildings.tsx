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
import { resourceTypes } from '../instances/resource_types';
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
  const rates = useTypedSelector(state => state.rates);
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
      upgradePress={upgradePress} buildTimer={buildTimer} rates={rates} />
  }
  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="building" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Buildings'}</Text>
      </View>
      {renderBuildHeader()}
      <FlatList
        data={buildingsArray}
        renderItem={renderBuilding}
        keyExtractor={building => building.id.toString()}>
      </FlatList>
    </View>
  );

  function renderBuildHeader() {
    if (buildTimer) {
      return <>{renderBuildTimer(buildTimer)}</>;
    }
    else {
      return <>{renderBuildButton()}</>;
    }
  }

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
  const building: Building = props.building.item;
  const buildingType: BuildingType = buildingTypes[building.buildingType];
  let upgradeLabel = ' Upgrade';
  if (utils.arrayIncludes(BUILDINGS_TO_REPAIR, buildingType.name)) {
    upgradeLabel = ' Repair';
  }
  let upgradeDisabled = false;
  let upgradeStyle: any = styles.buttonRowItem;
  if (props.buildTimer) {
    setDisabled();
  }
  else if (props.introState == INTRO_STATES.REPAIR_CISTERN
    && buildingType.name != BUILDING_TYPES.BROKEN_CISTERN) {
    setDisabled();
  }
  else if (props.introState == INTRO_STATES.RESTORE_FIELD
    && buildingType.name != BUILDING_TYPES.FALLOW_FIELD) {
    setDisabled();
  }
  else if (props.introState == INTRO_STATES.REFURBISH_STUDY
    && buildingType.name != BUILDING_TYPES.DECAYING_STUDY) {
    setDisabled();
  }
  function setDisabled() {
    upgradeDisabled = true;
    upgradeStyle = StyleSheet.flatten([styles.buttonRowItem, styles.buttonDisabled]);
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
        <View style={StyleSheet.flatten([styles.buttonTextRow, {minWidth: 230}])}>
          <Text>{props.building.item.buildingType}</Text>
          <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItemSmall,
            styles.buttonLight])}>
            <IconComponent provider="FontAwesome5" name="angle-down"
              color="#17265d" size={14} />
            <Text style={StyleSheet.flatten([styles.buttonTextSmall,
              styles.buttonTextDark])}>
              {' More'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text>{renderCost(buildingType.upgradeCost)}</Text>
        <Text>{renderRateContainer()}</Text>
      </View>
    </View>
  );

  function renderCost(cost: {resource: string, quantity: number}[]|null|undefined) {
    if (!cost) {
      return null;
    }
    let costString = 'Cost: ';
    cost.map((aCost) => {
      costString += (utils.formatNumberShort(aCost.quantity) + ' '
      + aCost.resource + ', ');
    });
    costString = costString.slice(0, -2);
    return (
      <Text>{costString}</Text>
    )
  }

  function renderRateContainer() {
    let rates: { [resourceName: string] : number } =
      props.rates.buildingRates[building.id];
    if (rates) {
      return (
        <View style={styles.rows}>
          {renderRates(rates)}
        </View>
      );
    }
    else {
      return null;
    }
  }

  function renderRates(rates: { [resourceName: string] : number }) {
    return Object.keys(rates).map((resourceName) => {
      return renderRate(resourceName, rates[resourceName])
    });
  }

  function renderRate(resourceName: string, rate: number) {
    const resource = resourceTypes[resourceName];
    let sign = '+';
    let rateStyle = { background: '#b8ccfb', paddingHorizontal: 4, maxHeight: 19 };
    if (rate < 0) {
      sign = '';
      rateStyle.background = '#ffb4b1';
    }
    return (
      <View key={resourceName} style={StyleSheet.flatten([styles.rows, rateStyle]) }>
        <Text>{sign + rate}</Text>
        <BadgeComponent
          provider={resource.icon.provider}
          name={resource.icon.name}
          foregroundColor={resource.foregroundColor}
          backgroundColor={resource.backgroundColor}
          iconSize={12} />
        <Text>{'/m '}</Text>
      </View>
    )

  }
}
