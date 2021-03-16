import React, { useState, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import ProgressBarComponent from './progress_bar';
import { displayModal, displayModalValue } from '../actions/ui';
import { payBuildingUpgradeCost } from '../actions/buildings';
import { payBuildingCost } from '../actions/buildings_construction';
import { addTimer } from '../actions/timers';

import Building from '../models/building';
import Timer from '../models/timer';
import BuildingType from '../models/building_type';
import Leader from '../models/leader';
import { buildingTypes } from '../instances/building_types';
import { buildingCategories } from '../instances/building_categories';
import { resourceTypes } from '../instances/resource_types';
import { MODALS } from '../enums/modals';
import { BUILDING_TYPES } from '../enums/building_types';
import { INTRO_STATES } from '../enums/intro_states';
import { utils } from '../utils';

export default function BuildingsComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const buildings = useTypedSelector(state => state.buildings);
  const buildTimer = useTypedSelector(state => state.timers['Build']);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const introState = useTypedSelector(state => state.account.introState);
  const rates = useTypedSelector(state => state.rates);
  const leaders = useTypedSelector(state => state.leaders);
  const modalStage = useTypedSelector(state => state.ui.modalStage);
  const modalValue = useTypedSelector(state => state.ui.modalValue);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let buildingsArray = Object.keys(buildings).map((id) => {
    return buildings[id];
  });
  buildingsArray.sort((a, b) => {
    const bta = buildingTypes[a.buildingType];
    const btb = buildingTypes[b.buildingType];
    if (bta.order && !btb.order) { return -1; }
    if (!bta.order && btb.order) { return 1; }
    if (bta.order && btb.order) {
      return bta.order - btb.order;
    }
    const bcoa = buildingCategories[bta.category].order;
    const bcob = buildingCategories[btb.category].order;
    if (bcoa != bcob) {
      return bcoa - bcob;
    }
    return ((a.name || bta.name) < (b.name || btb.name)) ? -1 : 1;
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

  let leaderLivingMap: { [buildingId: string] : Leader } = {};
  let leaderAssignedMap: { [buildingId: string] : Leader } = {};
  Object.keys(leaders).map((id) => {
    const leader = leaders[id];
    if (leader.livingAt) {
      leaderLivingMap[leader.livingAt] = leader;
    }
    if (leader.assignedTo) {
      leaderAssignedMap[leader.assignedTo] = leader;
    }
  });

  useEffect(() => {
    if (modalStage == 'resolving Building detail') {
      dispatch(payBuildingUpgradeCost(modalValue.building, modalValue.aCost,
        modalValue.resources));
      dispatch(displayModalValue(MODALS.BUILDING_DETAIL, 'open', modalValue.building));
    }
    else if (modalStage == 'resolving Build detail') {
      dispatch(payBuildingCost(modalValue.building, modalValue.aCost,
        modalValue.resources));
      dispatch(displayModalValue(MODALS.BUILD_DETAIL, 'open', modalValue.building));
    }
  }, [modalStage]);

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

  function renderBuilding(building: any) {
    return <BuildingDescription building={building} introState={introState}
      vault={vault} buildTimer={buildTimer} rates={rates} morePress={morePress}
      leaderLivingMap={leaderLivingMap} leaderAssignedMap={leaderAssignedMap}
      positioner={positioner} />
  }

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

  function startBuilding() {
    dispatch(displayModal(MODALS.BUILD));
  }

  function renderBuildTimer(timer: Timer) {
    if (timer) {
      if (timer.buildingToBuild || timer.buildingToUpgrade) {
        let label = ('Building ' + timer.buildingToBuild);
        if (timer.buildingToUpgrade) {
          const building = buildings[timer.buildingToUpgrade];
          const buildingType = buildingTypes[building.buildingType];
          label = ('Upgrading ' + (building.name || buildingType.name));
        }
        return (
          <View style={StyleSheet.flatten([styles.panelFlexColumn,
            {minWidth: positioner.majorWidth,
              maxWidth: positioner.majorWidth}])}>
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

  function morePress(building: Building) {
    dispatch(displayModalValue(MODALS.BUILDING_DETAIL, 'open', building));
  }
}

function BuildingDescription(props: any) {
  const building: Building = props.building.item;
  const buildingType: BuildingType = buildingTypes[building.buildingType];

  return (
    <View style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])}>
      <BadgeComponent
        provider={buildingType.icon.provider}
        name={buildingType.icon.name}
        foregroundColor={buildingType.foregroundColor}
        backgroundColor={buildingType.backgroundColor}
        iconSize={18} />
      <View style={styles.containerStretchColumn}>
        <View style={StyleSheet.flatten([styles.buttonTextRow, {minWidth: 230}])}>
          <Text>{(props.building.item.name || buildingType.name)}</Text>
          {renderMoreButton()}
        </View>
        {renderLivingAt(building, props.leaderLivingMap)}
        {renderAssignedTo(building, props.leaderAssignedMap)}
        <Text>{renderRateContainer()}</Text>
      </View>
    </View>
  );

  function renderMoreButton() {
    let buttonStyle = StyleSheet.flatten([styles.buttonRowItemSmall,
      styles.buttonLight]);
    let textStyle = StyleSheet.flatten([styles.buttonTextSmall,
      styles.buttonTextDark]);
    let iconColor = '#17265d';
    let iconName = 'angle-down';
    if (areResourcesEnough(building)) {
      buttonStyle = styles.buttonRowItemSmall;
      textStyle = styles.buttonTextSmall;
      iconName = 'exclamation-circle';
      iconColor = '#fff';
    }
    return (
      <TouchableOpacity style={buttonStyle} onPress={() => props.morePress(building)}>
        <IconComponent provider="FontAwesome5" name={iconName}
          color={iconColor} size={14} />
        <Text style={textStyle}>
          {' More'}
        </Text>
      </TouchableOpacity>
    );

    // To do: look at entire category when cost is other than "exact"
    function areResourcesEnough(building: Building) {
      let buildingType = buildingTypes[building.buildingType];
      let enoughResources = true;
      if (buildingType.upgradeCost == null) { return false; }
      let resourceCost: {type: string, quantity: number}[] = [];
      let totalValue = 0;
      buildingType.upgradeCost.map((aCost) => {
        const resource = utils.getMatchingResourceType(aCost.specificity, aCost.type);
        if (props.vault.resources[resource.name]) {
          if (props.vault.resources[resource.name].quantity < aCost.quantity) {
            enoughResources = false;
          }
        }
        else {
          enoughResources = false;
        }
      });
      return enoughResources;
    }
  }

  function renderLivingAt(building: Building,
    leaderLivingMap: { [buildingId: string] : Leader }) {
    if (leaderLivingMap[building.id]) {
      const leader = leaderLivingMap[building.id];
      return (
        <View style={styles.spacedRows}>
          <BadgeComponent
            provider={leader.icon.provider}
            name={leader.icon.name}
            foregroundColor={leader.foregroundColor}
            backgroundColor={leader.backgroundColor}
            iconSize={14} />
          <Text style={{fontSize: 12}}>
            {leader.name + ' living'}
          </Text>
        </View>
      );
    }
    return null;
  }

  function renderAssignedTo(building: Building,
    leaderAssignedMap: { [buildingId: string] : Leader }) {
    if (leaderAssignedMap[building.id]) {
      const leader = leaderAssignedMap[building.id];
      return (
        <View style={styles.spacedRows}>
          <BadgeComponent
            provider={leader.icon.provider}
            name={leader.icon.name}
            foregroundColor={leader.foregroundColor}
            backgroundColor={leader.backgroundColor}
            iconSize={14} />
          <Text style={{fontSize: 12}}>
            {leader.name + ' working'}
          </Text>
        </View>
      );
    }
    return null;
  }

  function renderRateContainer() {
    let rates: { [typeQuality: string] : number } =
      props.rates.buildingRates[building.id];
    if (rates) {
      return (
        <View style={styles.spacedRows}>
          {renderRates(rates)}
        </View>
      );
    }
    else {
      return null;
    }
  }

  function renderRates(rates: { [typeQuality: string] : number }) {
    return Object.keys(rates).map((typeQuality) => {
      return renderRate(typeQuality, rates[typeQuality])
    });
  }

  function renderRate(typeQuality: string, rate: number) {
    const tqSplit = typeQuality.split('|');
    const resourceType = resourceTypes[tqSplit[0]];
    let sign = '+';
    let rateStyle = { background: '#b8ccfb', paddingHorizontal: 4, maxHeight: 19 };
    if (rate < 0) {
      sign = '';
      rateStyle.background = '#ffb4b1';
    }
    return (
      <View key={typeQuality} style={StyleSheet.flatten([styles.rows, rateStyle]) }>
        <Text>{sign + utils.formatNumberShort(rate)}</Text>
        <BadgeComponent
          provider={resourceType.icon.provider}
          name={resourceType.icon.name}
          foregroundColor={resourceType.foregroundColor}
          backgroundColor={resourceType.backgroundColor}
          iconSize={12}
          quality={parseInt(tqSplit[1])} />
        <Text>{'/m '}</Text>
      </View>
    );
  }
}
