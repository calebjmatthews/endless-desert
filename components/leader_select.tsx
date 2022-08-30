import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet }
  from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import EquipmentNameComponent from './equipment_name';
import { ASSIGN_TO_BUILDING, assignToBuilding, LIVE_AT_BUILDING, DON_EQUIPMENT, setLeaders }
  from '../actions/leaders';
import { setRates } from '../actions/rates';
import { displayModalValue } from '../actions/ui';

import Leader from '../models/leader';
import Building from '../models/building';
import Hourglass from '../models/hourglass';
import Equipment from '../models/equipment';
import Positioner from '../models/positioner';
import { buildingTypes } from '../instances/building_types';
import { equipmentTypes } from '../instances/equipment_types';
import { MODALS } from '../enums/modals';
import { EQUIPMENT_SLOTS } from '../enums/equipment_slots';
const ES = EQUIPMENT_SLOTS;

export default function LeaderSelectComponent() {
  const dispatch = useDispatch();
  const leaders = useTypedSelector(state => state.leaders);
  const buildings = useTypedSelector(state => state.buildings);
  const equipment = useTypedSelector(state => state.equipment);
  const vault = useTypedSelector(state => state.vault);
  const treasureEffects = useTypedSelector(state => state.account.treasureEffects);
  const modalValue: {type: string, subType: string, building: Building, fromBuildingDetail?: boolean, 
    anEquipment? : Equipment} = useTypedSelector(state => state.ui.modalValue);
  const { subType, building, fromBuildingDetail, anEquipment } = modalValue;
  const equipmentType = anEquipment ? equipmentTypes[anEquipment?.typeName] : null;
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
    if (subType == ASSIGN_TO_BUILDING && leader.assignedTo) {
      buildingsLeader[leader.assignedTo] = leader;
    }
    else if (subType == LIVE_AT_BUILDING && leader.livingAt) {
      buildingsLeader[leader.livingAt] = leader;
    }
  });
  Object.keys(leaders).forEach((leaderId) => {
    const leader = leaders[leaderId];
    if (leader.toolEquipped === anEquipment?.id || leader.clothingEquipped === anEquipment?.id
        || leader.backEquipped === anEquipment?.id) {
        if (!leaderSelected) { setLeaderSelected(leaderId); }
      }
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
      const equipmentType = (anEquipment) ? equipmentTypes[anEquipment.typeName] : null;
      let leadersEquipment = null;
      if (equipmentType?.slot === ES.TOOL) {
        leadersEquipment = equipment[leader.toolEquipped || ''];
      }
      if (equipmentType?.slot === ES.CLOTHING) {
        leadersEquipment = equipment[leader.clothingEquipped || ''];
      }
      if (equipmentType?.slot === ES.BACK) {
        leadersEquipment = equipment[leader.backEquipped || ''];
      }
      return <LeaderSelector key={leader.id} leader={leader} buildings={buildings}
        subType={subType} leaderSelected={leaderSelected} anEquipment={leadersEquipment}
        setLeaderSelected={setLeaderSelected} positioner={positioner} />;
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
      if (subType === ASSIGN_TO_BUILDING) {
        const tempLeaders = Object.assign({}, leaders);
        if (buildingsLeader[building.id]) {
          dispatch(assignToBuilding(buildingsLeader[building.id], null));
          tempLeaders[buildingsLeader[building.id].id].assignedTo = null;
        }
        dispatch(assignToBuilding(leader, building.id));
        tempLeaders[leader.id].assignedTo = building.id;
        const newRates = new Hourglass().calcRates(buildings, tempLeaders, treasureEffects, vault);
        dispatch(setRates(newRates));
      }
      else if (subType === LIVE_AT_BUILDING) {
        const newLeaders = Object.assign({}, leaders);
        if (buildingsLeader[building.id]) {
          newLeaders[buildingsLeader[building.id].id].livingAt = null;
          newLeaders[buildingsLeader[building.id].id]
            .calcEffects(equipment, buildings, vault, treasureEffects);
        }
        newLeaders[leader.id].livingAt = building.id;
        newLeaders[leader.id].calcEffects(equipment, buildings, vault, treasureEffects);
        dispatch(setLeaders(newLeaders));
        const newRates = new Hourglass().calcRates(buildings, newLeaders, treasureEffects, vault);
        dispatch(setRates(newRates));
      }
      else if (subType === DON_EQUIPMENT) {
        const newLeaders = Object.assign({}, leaders);
        const equipmentType = equipmentTypes[anEquipment?.typeName || ''];
        
        if (equipmentType.slot === ES.TOOL) {
          Object.keys(leaders).forEach((id) => {
            if (leaders[id].toolEquipped === anEquipment?.id) {
              newLeaders[id].toolEquipped = null;
            }
          });
          newLeaders[leader.id].toolEquipped = anEquipment?.id || '';
        }
        else if (equipmentType.slot === ES.CLOTHING) {
          Object.keys(leaders).forEach((id) => {
            if (leaders[id].clothingEquipped === anEquipment?.id) {
              newLeaders[id].clothingEquipped = null;
            }
          });
          newLeaders[leader.id].clothingEquipped = anEquipment?.id || '';
        }
        else if (equipmentType.slot === ES.BACK) {
          Object.keys(leaders).forEach((id) => {
            if (leaders[id].backEquipped === anEquipment?.id) {
              newLeaders[id].backEquipped = null;
            }
          });
          newLeaders[leader.id].backEquipped = anEquipment?.id || '';
        }

        newLeaders[leader.id].calcEffects(equipment, buildings, vault, treasureEffects);
        dispatch(setLeaders(newLeaders));
        const newRates = new Hourglass().calcRates(buildings, newLeaders, treasureEffects, vault);
        dispatch(setRates(newRates));
      }
      if (fromBuildingDetail) {
        dispatch(displayModalValue(MODALS.BUILD_DETAIL, 'open', building));
      }
      else if (subType === DON_EQUIPMENT) {
        dispatch(displayModalValue(MODALS.EQUIPMENT_DETAIL, 'open', anEquipment));
      }
      else {
        dispatch(displayModalValue(null, 'closed', null));
      }
    }
  }
}

function LeaderSelector(props: {leader: Leader, buildings: { [id: string] : Building },
  subType: string, leaderSelected: string|null, anEquipment: Equipment|null,
  setLeaderSelected: Function, positioner: Positioner}) {
  const { leader, buildings, subType, leaderSelected, anEquipment,  setLeaderSelected, positioner}
    = props;
  const optionTextStyle = {paddingLeft: 4, paddingRight: 4};
  const panelStyle = StyleSheet.flatten([styles.panelTile,
    {minWidth: positioner.majorWidth, maxWidth: positioner.majorWidth}]);

  return (
    <View style={panelStyle}>
      <BadgeComponent icon={leader.icon} size={29} />
      <View>
        <Text style={optionTextStyle}>{leader.name}</Text>
        {renderBuilding()}
        {renderEquipment()}
        {renderButton(leader, leaderSelected, setLeaderSelected)}
      </View>
    </View>
  );

  function renderBuilding() {
    let building : Building|null = null;
    let label = '';
    if (subType == ASSIGN_TO_BUILDING && leader.assignedTo) {
      building = buildings[leader.assignedTo];
      label = ' working at ';
    }
    else if (subType == LIVE_AT_BUILDING && leader.livingAt) {
      building = buildings[leader.livingAt];
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

  function renderEquipment() {
    if (!anEquipment) { return null; }

    const equipmentType = equipmentTypes[anEquipment.typeName];
    return (
      <View style={styles.spacedRows}>
        <BadgeComponent icon={equipmentType.icon} size={19} />
        <EquipmentNameComponent anEquipment={anEquipment} size='small' suffix='equipped' />
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
