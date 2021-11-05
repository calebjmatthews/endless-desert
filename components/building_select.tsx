import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet }
  from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import SvgComponent from './svg';
import { ASSIGN_TO_BUILDING, assignToBuilding, LIVE_AT_BUILDING, setLeaders }
  from '../actions/leaders';
import { setRates } from '../actions/rates';
import { addBuilding } from '../actions/buildings';
import { removeBuildingFromStorage } from '../actions/buildings_storage';
import { addTimer } from '../actions/timers';
import { displayModalValue } from '../actions/ui';

import Building from '../models/building';
import Leader from '../models/leader';
import Resource from '../models/resource';
import Hourglass from '../models/hourglass';
import Positioner from '../models/positioner';
import Timer from '../models/timer';
import { buildingTypes } from '../instances/building_types';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { MODALS } from '../enums/modals';
import { RESEARCHES } from '../enums/researches';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { BUILDING_TYPES } from '../enums/building_types';

export default function BuildingSelectComponent() {
  const dispatch = useDispatch();
  const buildings = useTypedSelector(state => state.buildings);
  const buildingsStorage = useTypedSelector(state => state.buildingsStorage);
  const leaders = useTypedSelector(state => state.leaders);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const equipment = useTypedSelector(state => state.equipment);
  const vault = useTypedSelector(state => state.vault);
  const modalValue: {type: string, subType: string, leader: Leader} =
    useTypedSelector(state => state.ui.modalValue);
  let buildingsLeader: {[buildingId: string] : Leader} = {};
  Object.keys(leaders).map((leaderId) => {
    const leader = leaders[leaderId];
    if (modalValue.subType == ASSIGN_TO_BUILDING && leader.assignedTo) {
      buildingsLeader[leader.assignedTo] = leader;
    }
    else if (modalValue.subType == LIVE_AT_BUILDING && leader.livingAt) {
      buildingsLeader[leader.livingAt] = leader;
    }
  });
  const buildingsArray = getBuildingsArray();

  function setStartingSelected(): string|null {
    if (buildingsArray.length == 1) { return buildingsArray[0].id; }
    return null;
  }
  const [buildingSelected, buildingSelect] = useState(setStartingSelected());

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="building" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Select Building'}</Text>
      </View>
      <ScrollView>
        <View style={styles.tileContainer}>
          {renderBuildings(buildingsArray, buildingSelect)}
        </View>
      </ScrollView>
      <View style={StyleSheet.flatten([styles.panelFlexColumn,
        {minWidth: positioner.majorWidth,
          maxWidth: positioner.majorWidth}])}>
        {renderAboveButton()}
        <View style={styles.buttonRow}>
          {renderSubmitButton()}
        </View>
      </View>
    </View>
  );

  function renderBuildings(buildingArray: Building[],
    setBuildingSelected: Function) {
    return buildingArray.map((building) => {
      let buildingLeader: Leader|null = null;
      if (buildingsLeader[building.id]) {
        buildingLeader = buildingsLeader[building.id];
      }
      return <BuildingSelector key={building.id} building={building}
        buildingSelected={buildingSelected}
        setBuildingSelected={setBuildingSelected} buildingLeader={buildingLeader}
        subType={(modalValue.subType)} positioner={positioner}  />;
    });
  }

  function renderAboveButton() {
    let costs = null;
    let sBuildings = buildings;
    if (modalValue.subType == 'from_storage') {
      sBuildings = buildingsStorage;
    }
    if (buildingSelected) {
      let building = sBuildings[buildingSelected];
      if (building) {
        costs = buildingTypes[building.buildingType].noteCost;
      }
      else {
        costs = buildingTypes[buildingSelected].noteCost;
      }
    }
    if (modalValue.subType == RESEARCHES.FIELD_NOTES && costs) {
      return (
        <View style={StyleSheet.flatten([styles.rows,
          {minWidth: positioner.majorWidth,
            maxWidth: positioner.majorWidth, padding: 5, flexWrap: 'wrap'}])}>
          <Text>{"Cost: "}</Text>
          {costs.map((cost, index) => {
            let comma = ', ';
            let quantity = 0;
            if (vault.resources[(cost.type + '|0')]) {
              quantity = vault.resources[(cost.type + '|0')].quantity;
            }
            if (index+1 == costs.length) { comma = ' '; }
            return (
              <View key={cost.type} style={styles.rows}>
                <Text>{utils.formatNumberShort(cost.quantity)}</Text>
                <SvgComponent icon={{...resourceTypes[cost.type].icon,
                  height: '21', width: '21'}} />
                <Text>{cost.type + ' (of ' + utils.formatNumberShort(quantity)
                  + ')' + comma}</Text>
              </View>
            );
          })}
        </View>
      );
    }
    return null;
  }

  function renderSubmitButton() {
    let isDisabled = true;
    let caption = ' Go';
    let buttonStyle: any = StyleSheet.flatten([styles.buttonLarge,
        styles.buttonRowItem, styles.buttonDisabled]);
    if (buildingSelected != null) {
      isDisabled = false;
      buttonStyle = StyleSheet.flatten([styles.buttonLarge,
        styles.buttonRowItem]);
    }
    let sBuildings = buildings;
    if (modalValue.subType == 'from_storage') {
      sBuildings = buildingsStorage;
    }

    let resourceMissing: string|null = null;
    if (modalValue.subType == RESEARCHES.FIELD_NOTES && buildingSelected) {
      let building = sBuildings[buildingSelected];
      let costs: any[] = [];
      if (building) {
        costs = buildingTypes[building.buildingType].noteCost;
      }
      else {
        costs = buildingTypes[buildingSelected].noteCost;
      }
      costs.map((cost) => {
        if (vault.resources[(cost.type + '|0')]) {
          if (vault.resources[(cost.type + '|0')].quantity < cost.quantity) {
            resourceMissing = cost.type;
          }
        }
        else { resourceMissing = cost.type; }
      });
    }
    if (resourceMissing) {
      isDisabled = true;
      buttonStyle = StyleSheet.flatten([styles.buttonLarge,
          styles.buttonRowItem, styles.buttonDisabled]);
      caption = (' Missing ' + resourceMissing + ' ');
    }
    return (
      <TouchableOpacity style={buttonStyle}
        disabled={isDisabled}
        onPress={() => {submit()}} >
        <IconComponent provider="FontAwesome5" name="check-square" color="#fff"
          size={16} style={styles.headingIcon} />
        <Text style={styles.buttonTextLarge}>{caption}</Text>
      </TouchableOpacity>
    )
  }

  function submit() {
    if (buildingSelected) {
      if (modalValue.subType == ASSIGN_TO_BUILDING) {
        dispatch(assignToBuilding(modalValue.leader, buildingSelected));
        let tempLeaders = Object.assign({}, leaders);
        tempLeaders[modalValue.leader.id].assignedTo = buildingSelected;
        if (buildingsLeader[buildingSelected]) {
          dispatch(assignToBuilding(buildingsLeader[buildingSelected], null));
          tempLeaders[buildingsLeader[buildingSelected].id].assignedTo = null;
        }
        let newRates = new Hourglass().calcRates(buildings, tempLeaders, vault);
        dispatch(setRates(newRates));
        dispatch(displayModalValue(MODALS.LEADER_DETAIL, 'open', modalValue.leader));
      }

      else if (modalValue.subType == LIVE_AT_BUILDING) {
        let newLeaders = Object.assign({}, leaders);
        newLeaders[modalValue.leader.id].livingAt = buildingSelected;
        newLeaders[modalValue.leader.id].calcEffects(equipment, buildings, vault);
        if (buildingsLeader[buildingSelected]) {
          newLeaders[buildingsLeader[buildingSelected].id].livingAt = null;
          newLeaders[buildingsLeader[buildingSelected].id]
            .calcEffects(equipment, buildings, vault);
        }
        dispatch(setLeaders(newLeaders));
        let newRates = new Hourglass().calcRates(buildings, newLeaders, vault);
        dispatch(setRates(newRates));
        dispatch(displayModalValue(MODALS.LEADER_DETAIL, 'open', modalValue.leader));
      }

      else if (modalValue.subType == RESEARCHES.FIELD_NOTES) {
        let buildingName = buildingSelected;
        let buildingType = buildingTypes[buildingSelected];
        if (buildings[buildingSelected]) {
          buildingType = buildingTypes[buildings[buildingSelected].buildingType];
          buildingName = buildings[buildingSelected].name || buildingType.name;
        }
        const noteType = resourceTypes[buildingType.givesNote];
        const rsIncrease = [new Resource({ type: buildingType.givesNote,
          quality: 0, quantity: 1 })];
        const rsConsume = buildingType.noteCost.map((cost) => {
          return new Resource({ type: cost.type, quality: 0,
            quantity: cost.quantity });
        })
        let timer = new Timer({
          name: RESEARCHES.FIELD_NOTES,
          endsAt: (new Date(Date.now()).valueOf() + 3600000),
          resourcesToIncrease: rsIncrease,
          resourcesToConsume: rsConsume,
          messageToDisplay: ('Your notes on the ' + buildingName + ' are finished.'),
          iconToDisplay: noteType.icon
        });
        dispatch(addTimer(timer));
        dispatch(displayModalValue(null, 'closed', null));
      }

      else if (modalValue.subType == 'from_storage') {
        const building = buildingsStorage[buildingSelected];
        dispatch(removeBuildingFromStorage(building));
        dispatch(addBuilding(building));
        let tempBuildings: { [id: string] : Building } = {};
        Object.keys(buildings).map((id) => {
          tempBuildings[id] = new Building(buildings[id]);
        });
        tempBuildings[building.id] = building;
        const newRates = new Hourglass().calcRates(tempBuildings, leaders, vault);
        dispatch(setRates(newRates));
        dispatch(displayModalValue(null, 'closed', null));
      }
    }
  }

  function getBuildingsArray() {
    let buildingsArray = Object.keys(buildings).map((buildingId) => {
      return buildings[buildingId];
    });
    if (modalValue.subType == 'from_storage') {
      buildingsArray = Object.keys(buildingsStorage).map((buildingId) => {
        return buildingsStorage[buildingId];
      });
    }
    else {
      buildingsArray = buildingsArray.filter((building) => {
        if (modalValue.subType == ASSIGN_TO_BUILDING) {
          const buildingType = buildingTypes[building.buildingType];
          if (buildingType.recipes || building.recipe) { return building; }
        }
        else if (modalValue.subType == LIVE_AT_BUILDING) {
          const buildingType = buildingTypes[building.buildingType];
          if (buildingType.livingHappiness != undefined) { return building; }
        }
        else { return building; }
      });
      if (modalValue.subType == RESEARCHES.FIELD_NOTES) {
        buildingsArray = [new Building({ id: BUILDING_TYPES.SKY,
          buildingType: BUILDING_TYPES.SKY, suffix: 0, name: BUILDING_TYPES.SKY,
          resourcesSelected: {}, recipe: null }), ...buildingsArray];
      }
    }
    return buildingsArray;
  }
}

function BuildingSelector(props: {building: Building, buildingSelected: string|null,
  setBuildingSelected: Function, buildingLeader: Leader|null, subType: string,
  positioner: Positioner}) {
  let buildingType = buildingTypes[props.building.buildingType];
  let optionTextStyle = {paddingLeft: 4, paddingRight: 4};
  let panelStyle = StyleSheet.flatten([styles.panelTile,
    {minWidth: props.positioner.majorWidth,
      maxWidth: props.positioner.majorWidth}]);
  if (props.subType == RESEARCHES.FIELD_NOTES || props.subType == 'from_storage') {
    panelStyle = StyleSheet.flatten([styles.panelTile,
      {minWidth: props.positioner.minorWidth,
        maxWidth: props.positioner.minorWidth}]);
  }

  return (
    <View style={panelStyle}>
      <BadgeComponent icon={buildingType.icon} size={21} />
      <View>
        <Text style={optionTextStyle}>{buildingType.name}</Text>
        {renderBuildingLeader(props.buildingLeader, props.subType)}
        {renderButton(props.building, props.buildingSelected,
          props.setBuildingSelected)}
      </View>
    </View>
  );

  function renderBuildingLeader(buildingLeader: Leader|null, subType: string) {
    let caption = ' is here';
    if (subType == ASSIGN_TO_BUILDING) { caption = ' is working here'; }
    else if (subType == LIVE_AT_BUILDING) { caption = ' is living here'; }
    if (buildingLeader) {
      return (
        <View style={styles.rows}>
          <BadgeComponent icon={buildingLeader.icon} size={16} />
          <Text style={optionTextStyle}>
            {buildingLeader.name + caption}
          </Text>
        </View>
      )
    }
    return null;
  }

  function renderButton(building: Building,
    buildingSelected: string|null, setBuildingSelected: Function) {

    if (buildingSelected == building.id) {
      let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, { width: 74 }]);
      return (
        <TouchableOpacity style={buttonStyle}
          onPress={() => {buildingIdUnSelect(setBuildingSelected)}} >
          <Text style={styles.buttonText}>{'Selected'}</Text>
        </TouchableOpacity>
      );
    }
    let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, styles.buttonLight,
      { width: 74 }]);
    return (
      <TouchableOpacity style={buttonStyle}
      onPress={() => {buildingIdSelect(building, setBuildingSelected)}} >
        <Text style={StyleSheet.flatten([styles.buttonText,
          styles.buttonTextDark])}>{'Select'}</Text>
      </TouchableOpacity>
    );
  }

  function buildingIdUnSelect(setBuildingSelected: Function) {
    setBuildingSelected(null);
  }
  function buildingIdSelect(building: Building, setBuildingSelected: Function) {
    setBuildingSelected(building.id);
  }
}
