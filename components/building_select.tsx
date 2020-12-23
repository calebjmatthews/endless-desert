import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet }
  from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import { assignToBuilding } from '../actions/leaders';
import { displayModalValue } from '../actions/ui';

import Building from '../models/building';
import Leader from '../models/leader';
import Positioner from '../models/positioner';
import { buildingTypes } from '../instances/building_types';
import { MODALS } from '../enums/modals';

export default function BuildingSelectComponent() {
  const dispatch = useDispatch();
  const buildings = useTypedSelector(state => state.buildings);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const modalValue: {type: string, leader: Leader} =
    useTypedSelector(state => state.ui.modalValue);
  let buildingsArray = Object.keys(buildings).map((buildingId) => {
    return buildings[buildingId];
  });
  buildingsArray = buildingsArray.filter((building) => {
    if (modalValue.type == MODALS.LEADER_DETAIL) {
      const buildingType = buildingTypes[building.buildingType];
      if (buildingType.recipes) { return building; }
    }
    else { return building; }
  });

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
        <View style={styles.buttonRow}>
          {renderSubmitButton()}
        </View>
      </View>
    </View>
  );

  function renderBuildings(buildingArray: Building[],
    setBuildingSelected: Function) {
    return buildingArray.map((building) => {
      return <BuildingSelector key={building.id} building={building}
        buildingSelected={buildingSelected}
        setBuildingSelected={setBuildingSelected}
        positioner={positioner} />;
    });
  }

  function renderSubmitButton() {
    let isDisabled = false;
    let buttonStyle: any = StyleSheet.flatten([styles.buttonLarge,
      styles.buttonRowItem]);
    if (buildingSelected == null) {
      isDisabled = true;
      buttonStyle = StyleSheet.flatten([styles.buttonLarge,
        styles.buttonRowItem, styles.buttonDisabled]);
    }
    return (
      <TouchableOpacity style={buttonStyle}
        disabled={isDisabled}
        onPress={() => {submit()}} >
        <IconComponent provider="FontAwesome5" name="check-square" color="#fff"
          size={16} style={styles.headingIcon} />
        <Text style={styles.buttonTextLarge}>{' Go'}</Text>
      </TouchableOpacity>
    )
  }

  function submit() {
    if (buildingSelected) {
      dispatch(assignToBuilding(modalValue.leader, buildingSelected));
      dispatch(displayModalValue(MODALS.LEADER_DETAIL, 'open', modalValue.leader));
    }
  }
}

function BuildingSelector(props: {building: Building, buildingSelected: string|null,
  setBuildingSelected: Function, positioner: Positioner}) {
  let buildingType = buildingTypes[props.building.buildingType];
  let optionTextStyle = {paddingLeft: 4, paddingRight: 4};
  return (
    <View style={StyleSheet.flatten([styles.panelTile,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])}>
      <BadgeComponent
        provider={buildingType.icon.provider}
        name={buildingType.icon.name}
        foregroundColor={buildingType.foregroundColor}
        backgroundColor={buildingType.backgroundColor}
        iconSize={18} />
      <View>
        <Text style={optionTextStyle}>{buildingType.name}</Text>
        {renderButton(props.building, props.buildingSelected,
          props.setBuildingSelected)}
      </View>
    </View>
  );

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
