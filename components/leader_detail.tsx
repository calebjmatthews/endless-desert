import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity, StyleSheet, ScrollView }
  from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import ProgressBarComponent from '../components/progress_bar';
import { ASSIGN_TO_BUILDING, LIVE_AT_BUILDING } from '../actions/leaders';
import { displayModalValue } from '../actions/ui';

import Leader from '../models/leader';
import { buildingTypes } from '../instances/building_types';
import { equipmentTypes } from '../instances/equipment_types';
import { equipmentStarting } from '../instances/leaders';
import { MODALS } from '../enums/modals';

enum SLOTS { TOOL = 'Tool', CLOTHING = 'Clothing', BACK = 'Back' };

export default function LeaderDetailComponent() {
  const dispatch = useDispatch();
  const modalValue: Leader = useTypedSelector(state => state.ui.modalValue);
  const leader = modalValue;
  const buildings = useTypedSelector(state => state.buildings);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const slots: string[] = [SLOTS.TOOL, SLOTS.CLOTHING, SLOTS.BACK];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headingWrapper}>
        <BadgeComponent
          provider={leader.icon.provider}
          name={leader.icon.name}
          foregroundColor={leader.foregroundColor}
          backgroundColor={leader.backgroundColor}
          iconSize={24} />
        <Text style={styles.heading1}>{leader.name}</Text>
      </View>
      <View style={StyleSheet.flatten([styles.descriptionBand,
        {minWidth: positioner.modalWidth,
          maxWidth: positioner.modalWidth}])}>
        <Text style={styles.descriptionBandText}>{leader.description}</Text>
      </View>
      <View style={{width: (positioner.modalWidth - 40)}}>
        <Text style={styles.bareText}>Happiness:</Text>
        <ProgressBarComponent startingProgress={0}
          endingProgress={(leader.happiness / 100)} duration={1000}
          labelStyle={styles.bareText}
          color={'#de0202'} label={(leader.happiness + '%')} />
      </View>
      <View style={styles.break} />
      <View style={styles.rows}>
        <View style={StyleSheet.flatten([styles.panelTile, {minWidth:
          positioner.modalThird, maxWidth: positioner.modalThird,
          flexDirection: 'column'}])}>
          <Text>Production</Text>
          <Text>+50%</Text>
        </View>
        <View style={StyleSheet.flatten([styles.panelTile, {minWidth:
          positioner.modalThird, maxWidth: positioner.modalThird,
          flexDirection: 'column'}])}>
          <Text>Quality</Text>
          <Text>+0%</Text>
        </View>
        <View style={StyleSheet.flatten([styles.panelTile, {minWidth:
          positioner.modalThird, maxWidth: positioner.modalThird,
          flexDirection: 'column'}])}>
          <Text>Efficiency</Text>
          <Text>+0%</Text>
        </View>
      </View>
      <View style={styles.break} />
      <View style={styles.rows}>
        <View style={StyleSheet.flatten([{minWidth: positioner.modalHalf,
            maxWidth: positioner.modalHalf}])}>
          <Text style={styles.bareText}>Working at:</Text>
          {renderAssignedTo()}
        </View>
        <View style={StyleSheet.flatten([{minWidth: positioner.modalHalf,
            maxWidth: positioner.modalHalf}])}>
          <Text style={styles.bareText}>Living at:</Text>
          {renderLivingAt()}
        </View>
      </View>
      <View style={styles.break} />
      <View style={StyleSheet.flatten([{minWidth: positioner.modalMajor,
          maxWidth: positioner.modalMajor}])}>
        <Text style={styles.bareText}>{'Equipment:'}</Text>
        <View style={StyleSheet.flatten([styles.panelFlexColumn,
          {minWidth: positioner.modalMajor, maxWidth: positioner.modalMajor}])}>
          {slots.map((slot) => {
            return renderSlot(slot);
          })}
        </View>
      </View>
    </ScrollView>
  );

  function renderAssignedTo() {
    if (leader.assignedTo) {
      const building = buildings[leader.assignedTo];
      const buildingType = buildingTypes[building.buildingType];
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { assignedToPress() }} >
          <BadgeComponent
            provider={buildingType.icon.provider}
            name={buildingType.icon.name}
            foregroundColor={buildingType.foregroundColor}
            backgroundColor={buildingType.backgroundColor}
            iconSize={16} />
          <Text style={styles.buttonText}>
            {buildingType.name}
          </Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { assignedToPress() }} >
          <BadgeComponent
            provider='MaterialCommunityIcons'
            name='sleep'
            foregroundColor='#000'
            backgroundColor='#fff'
            iconSize={16} />
          <Text style={styles.buttonText}>
            {'Resting'}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  function renderLivingAt() {
    if (leader.livingAt) {
      const building = buildings[leader.livingAt];
      const buildingType = buildingTypes[building.buildingType];
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { livingAtPress() }} >
          <BadgeComponent
            provider={buildingType.icon.provider}
            name={buildingType.icon.name}
            foregroundColor={buildingType.foregroundColor}
            backgroundColor={buildingType.backgroundColor}
            iconSize={16} />
          <Text style={styles.buttonText}>
            {buildingType.name}
          </Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { livingAtPress() }} >
          <BadgeComponent
            provider='MaterialCommunityIcons'
            name='tent'
            foregroundColor='#000'
            backgroundColor='#fff'
            iconSize={16} />
          <Text style={styles.buttonText}>
            {'Nowhere'}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  function renderSlot(slot: string) {
    let equipmentSlot = leader.toolEquipped;
    if (slot == SLOTS.CLOTHING) { equipmentSlot = leader.clothingEquipped; }
    else if (slot == SLOTS.BACK) { equipmentSlot = leader.backEquipped; }

    if (equipmentSlot) {
      const equipment = equipmentStarting[equipmentSlot];
      const equipmentType = equipmentTypes[equipment.typeName];
      return (
        <View style={StyleSheet.flatten([styles.rows, {minWidth: positioner.modalMajor,
          maxWidth: positioner.modalMajor}])} key={slot}>
          <Text style={{minWidth: 90, maxWidth: 90, textAlign: 'right'}}>
            {slot + ':'}
          </Text>
          <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
            {alignSelf: 'stretch'}])} onPress={() => { }} >
            <BadgeComponent
              provider={equipmentType.icon.provider}
              name={equipmentType.icon.name}
              foregroundColor={equipmentType.foregroundColor}
              backgroundColor={equipmentType.backgroundColor}
              iconSize={16} />
            <Text style={styles.buttonText}>
              {equipmentType.name}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return (
        <View style={StyleSheet.flatten([styles.rows, {minWidth: positioner.modalMajor,
          maxWidth: positioner.modalMajor}])} key={slot}>
          <Text style={{minWidth: 90, maxWidth: 90}}>{slot + ':'}</Text>
          <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
            {alignSelf: 'stretch'}])} onPress={() => { }} >
            <BadgeComponent
              provider="FontAwesome5"
              name="minus-circle"
              foregroundColor="#000"
              backgroundColor="#fff"
              iconSize={16} />
            <Text style={styles.buttonText}>{'Nothing'}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  function assignedToPress() {
    dispatch(displayModalValue(MODALS.BUILDING_SELECT, 'open',
      {type: MODALS.LEADER_DETAIL, subType: ASSIGN_TO_BUILDING, leader: leader}));
  }

  function livingAtPress() {
    dispatch(displayModalValue(MODALS.BUILDING_SELECT, 'open',
      {type: MODALS.LEADER_DETAIL, subType: LIVE_AT_BUILDING, leader: leader}));
  }
}
