import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet }
  from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import { ASSIGN_TO_BUILDING, assignToBuilding, LIVE_AT_BUILDING, setLeaders }
  from '../actions/leaders';
import { setRates } from '../actions/rates';
import { displayModalValue } from '../actions/ui';

import Leader from '../models/leader';
import Building from '../models/building';
import Hourglass from '../models/hourglass';
import Positioner from '../models/positioner';
import { buildingTypes } from '../instances/building_types';

export default function LeaderSelectComponent() {
  const dispatch = useDispatch();
  const leaders = useTypedSelector(state => state.leaders);
  const buildings = useTypedSelector(state => state.buildings);
  const equipment = useTypedSelector(state => state.equipment);
  const vault = useTypedSelector(state => state.vault);
  const modalValue: {type: string, subType: string, building: Building} =
    useTypedSelector(state => state.ui.modalValue);
  const positioner = useTypedSelector(state => state.ui.positioner);

  let leadersArray = Object.keys(leaders).map((leaderId) => {
    return leaders[leaderId];
  });
  function setStartingSelected(): string|null {
    return null;
  }
  const [leaderSelected, setLeaderSelected] = useState(setStartingSelected());

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
  let buildingsArray = Object.keys(buildings).map((buildingId) => {
    return buildings[buildingId];
  });

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
      <IconComponent provider="FontAwesome5" name="user-circle" color="#fff" size={20}
        style={styles.headingIcon} />
      <Text style={styles.heading1}>{' Select Leader'}</Text>
      </View>
      <ScrollView>
        <View style={styles.tileContainer}>
          {renderLeaders()}
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

  function renderLeaders() {
    return leadersArray.map((leader) => {
      return <LeaderSelector key={leader.id} leader={leader} buildings={buildings}
        subType={modalValue.subType} leaderSelected={leaderSelected}
        setLeaderSelected={setLeaderSelected} positioner={positioner}  />;
    });
  }

  function renderAboveButton() {
    return null;
  }

  function renderSubmitButton() {
    let isDisabled = true;
    let caption = ' Go';
    let buttonStyle: any = StyleSheet.flatten([styles.buttonLarge,
        styles.buttonRowItem, styles.buttonDisabled]);
    if (leaderSelected != null) {
      isDisabled = false;
      buttonStyle = StyleSheet.flatten([styles.buttonLarge,
        styles.buttonRowItem]);
    }

    return (
      <TouchableOpacity style={buttonStyle}
        disabled={isDisabled}
        onPress={() => { submit() }} >
        <IconComponent provider="FontAwesome5" name="check-square" color="#fff"
          size={16} style={styles.headingIcon} />
        <Text style={styles.buttonTextLarge}>{caption}</Text>
      </TouchableOpacity>
    );
  }

  function submit() {
    if (leaderSelected) {
      const leader = leaders[leaderSelected];
      if (modalValue.subType == ASSIGN_TO_BUILDING) {
        let tempLeaders = Object.assign({}, leaders);
        if (buildingsLeader[modalValue.building.id]) {
          dispatch(assignToBuilding(buildingsLeader[modalValue.building.id], null));
          tempLeaders[buildingsLeader[modalValue.building.id].id].assignedTo = null;
        }
        dispatch(assignToBuilding(leader, modalValue.building.id));
        tempLeaders[leader.id].assignedTo = modalValue.building.id;
        let newRates = new Hourglass().calcRates(buildings, tempLeaders, vault);
        dispatch(setRates(newRates));
        dispatch(displayModalValue(null, 'closed', null));
      }
      else if (modalValue.subType == LIVE_AT_BUILDING) {
        let newLeaders = Object.assign({}, leaders);
        if (buildingsLeader[modalValue.building.id]) {
          newLeaders[buildingsLeader[modalValue.building.id].id].livingAt = null;
          newLeaders[buildingsLeader[modalValue.building.id].id]
            .calcEffects(equipment, buildings);
        }
        newLeaders[leader.id].livingAt = modalValue.building.id;
        newLeaders[leader.id].calcEffects(equipment, buildings);
        dispatch(setLeaders(newLeaders));
        let newRates = new Hourglass().calcRates(buildings, newLeaders, vault);
        dispatch(setRates(newRates));
        dispatch(displayModalValue(null, 'closed', null));
      }
    }
  }
}

function LeaderSelector(props: {leader: Leader, buildings: { [id: string] : Building },
  subType: string, leaderSelected: string|null, setLeaderSelected: Function,
  positioner: Positioner}) {
  const optionTextStyle = {paddingLeft: 4, paddingRight: 4};
  const panelStyle = StyleSheet.flatten([styles.panelTile,
    {minWidth: props.positioner.majorWidth,
      maxWidth: props.positioner.majorWidth}]);

  return (
    <View style={panelStyle}>
      <BadgeComponent icon={props.leader.icon} size={29} />
      <View>
        <Text style={optionTextStyle}>{props.leader.name}</Text>
        {renderBuilding()}
        {renderButton(props.leader, props.leaderSelected,
          props.setLeaderSelected)}
      </View>
    </View>
  );

  function renderBuilding() {
    let building : Building|null = null;
    let label = '';
    if (props.subType == ASSIGN_TO_BUILDING && props.leader.assignedTo) {
      building = props.buildings[props.leader.assignedTo];
      label = ' working at ';
    }
    else if (props.subType == LIVE_AT_BUILDING && props.leader.livingAt) {
      building = props.buildings[props.leader.livingAt];
      label = ' living at ';
    }
    if (!building) { return null; }
    const buildingType = buildingTypes[building.buildingType];
    return (
      <View style={styles.spacedRows}>
        <BadgeComponent icon={buildingType.icon} size={19} />
        <Text style={{fontSize: 12}}>
          {label + building.name}
        </Text>
      </View>
    );
  }

  function renderButton(leader: Leader,
    leaderSelected: string|null, setLeaderSelected: Function) {

    if (leaderSelected == leader.id) {
      let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, { width: 74 }]);
      return (
        <TouchableOpacity style={buttonStyle}
          onPress={() => {leaderIdUnSelect(setLeaderSelected)}} >
          <Text style={styles.buttonText}>{'Selected'}</Text>
        </TouchableOpacity>
      );
    }
    let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, styles.buttonLight,
      { width: 74 }]);
    return (
      <TouchableOpacity style={buttonStyle}
      onPress={() => {leaderIdSelect(leader, setLeaderSelected)}} >
        <Text style={StyleSheet.flatten([styles.buttonText,
          styles.buttonTextDark])}>{'Select'}</Text>
      </TouchableOpacity>
    );
  }

  function leaderIdUnSelect(setLeaderSelected: Function) {
    setLeaderSelected(null);
  }
  function leaderIdSelect(leader: Leader, setLeaderSelected: Function) {
    setLeaderSelected(leader.id);
  }
}
