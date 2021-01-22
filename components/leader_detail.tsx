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
import { SET_EATING, SET_DRINKING, ASSIGN_TO_BUILDING, LIVE_AT_BUILDING }
  from '../actions/leaders';
import { displayModalValue } from '../actions/ui';

import Leader from '../models/leader';
import { buildingTypes } from '../instances/building_types';
import { equipmentTypes } from '../instances/equipment_types';
import { resourceTypes } from '../instances/resource_types';
import { MODALS } from '../enums/modals';

enum SLOTS { TOOL = 'Tool', CLOTHING = 'Clothing', BACK = 'Back' };

export default function LeaderDetailComponent() {
  const dispatch = useDispatch();
  const modalValue: Leader = useTypedSelector(state => state.ui.modalValue);
  const leader = modalValue;
  const buildings = useTypedSelector(state => state.buildings);
  const equipment = useTypedSelector(state => state.equipment);
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
          <Text>+{Math.round(leader.productionPlus) + '%'}</Text>
        </View>
        <View style={StyleSheet.flatten([styles.panelTile, {minWidth:
          positioner.modalThird, maxWidth: positioner.modalThird,
          flexDirection: 'column'}])}>
          <Text>Quality</Text>
          <Text>+{Math.round(leader.qualityPlus) + '%'}</Text>
        </View>
        <View style={StyleSheet.flatten([styles.panelTile, {minWidth:
          positioner.modalThird, maxWidth: positioner.modalThird,
          flexDirection: 'column'}])}>
          <Text>Efficiency</Text>
          <Text>+{Math.round(leader.efficiencyPlus) + '%'}</Text>
        </View>
      </View>
      <View style={styles.break} />
      <View style={styles.rows}>
        <View style={StyleSheet.flatten([{minWidth: positioner.modalHalf,
            maxWidth: positioner.modalHalf}])}>
          <Text style={styles.bareText}>Eating:</Text>
          {renderEating()}
        </View>
        <View style={StyleSheet.flatten([{minWidth: positioner.modalHalf,
            maxWidth: positioner.modalHalf}])}>
          <Text style={styles.bareText}>Drinking:</Text>
          {renderDrinking()}
        </View>
      </View>
      <View style={styles.rows}>
        <View style={StyleSheet.flatten([{minWidth: positioner.modalHalf,
            maxWidth: positioner.modalHalf}])}>
          <Text style={styles.bareText}>Living at:</Text>
          {renderLivingAt()}
        </View>
        <View style={StyleSheet.flatten([{minWidth: positioner.modalHalf,
            maxWidth: positioner.modalHalf}])}>
          <Text style={styles.bareText}>Working at:</Text>
          {renderAssignedTo()}
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

  function renderEating() {
    if (leader.eating) {
      let resourceType = resourceTypes[leader.eating];
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { eatingPress() }} >
          <BadgeComponent
            provider={resourceType.icon.provider}
            name={resourceType.icon.name}
            foregroundColor={resourceType.foregroundColor}
            backgroundColor={resourceType.backgroundColor}
            iconSize={16} />
          <Text style={styles.buttonText}>
            {resourceType.name}
          </Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { eatingPress() }} >
          <BadgeComponent
            provider='FontAwesome5'
            name='paw'
            foregroundColor='#000'
            backgroundColor='#fff'
            iconSize={16} />
          <Text style={styles.buttonText}>
            {'Scavenging'}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  function renderDrinking() {
    if (leader.drinking) {
      let resourceType = resourceTypes[leader.drinking];
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { drinkingPress() }} >
          <BadgeComponent
            provider={resourceType.icon.provider}
            name={resourceType.icon.name}
            foregroundColor={resourceType.foregroundColor}
            backgroundColor={resourceType.backgroundColor}
            iconSize={16} />
          <Text style={styles.buttonText}>
            {resourceType.name}
          </Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { drinkingPress() }} >
          <BadgeComponent
            provider='MaterialCommunityIcons'
            name='water-off'
            foregroundColor='#000'
            backgroundColor='#fff'
            iconSize={16} />
          <Text style={styles.buttonText}>
            {'Scavenging'}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  function renderAssignedTo() {
    let buttonObj: any = {
      iconProvider: 'MaterialCommunityIcons',
      iconName: 'sleep',
      iconForegroundColor: '#000',
      iconBackgroundColor: '#fff',
      text: 'Resting',
      style: styles.buttonRowItem,
      disabled: false
    };
    if (!leader.eating) {
      buttonObj = {
        iconProvider: 'FontAwesome5',
        iconName: 'paw',
        iconForegroundColor: '#000',
        iconBackgroundColor: '#fff',
        text: 'Scavenging',
        style: StyleSheet.flatten([styles.buttonRowItem, styles.buttonDisabled]),
        disabled: true
      };
    }
    else if (!leader.drinking) {
      buttonObj = {
        iconProvider: 'MaterialCommunityIcons',
        iconName: 'water-off',
        iconForegroundColor: '#000',
        iconBackgroundColor: '#fff',
        text: 'Scavenging',
        style: StyleSheet.flatten([styles.buttonRowItem, styles.buttonDisabled]),
        disabled: true
      };
    }
    else if (!leader.livingAt) {
      buttonObj = {
        iconProvider: 'MaterialCommunityIcons',
        iconName: 'tent',
        iconForegroundColor: '#000',
        iconBackgroundColor: '#fff',
        text: 'Camping',
        style: StyleSheet.flatten([styles.buttonRowItem, styles.buttonDisabled]),
        disabled: true
      };
    }
    else if (leader.assignedTo) {
      const building = buildings[leader.assignedTo];
      const buildingType = buildingTypes[building.buildingType];
      buttonObj = {
        iconProvider: buildingType.icon.provider,
        iconName: buildingType.icon.name,
        iconForegroundColor: buildingType.foregroundColor,
        iconBackgroundColor: buildingType.backgroundColor,
        text: buildingType.name,
        style: styles.buttonRowItem,
        disabled: false
      };
    }

    return (
      <TouchableOpacity style={buttonObj.style}
        onPress={() => { assignedToPress() }} disabled={buttonObj.disabled} >
        <BadgeComponent
          provider={buttonObj.iconProvider}
          name={buttonObj.iconName}
          foregroundColor={buttonObj.iconForegroundColor}
          backgroundColor={buttonObj.iconBackgroundColor}
          iconSize={16} />
        <Text style={styles.buttonText}>
          {buttonObj.text}
        </Text>
      </TouchableOpacity>
    );
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
      const anEquipment = equipment[equipmentSlot];
      const equipmentType = equipmentTypes[anEquipment.typeName];
      return (
        <View style={StyleSheet.flatten([styles.rows, {minWidth: positioner.modalMajor,
          maxWidth: positioner.modalMajor}])} key={slot}>
          <Text style={{minWidth: 90, maxWidth: 90, textAlign: 'right'}}>
            {slot + ':'}
          </Text>
          <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
            {alignSelf: 'stretch', flexDirection: 'column',
            alignItems: 'flex-start'}])} onPress={() => { }} >
            <View style={styles.rows}>
              <BadgeComponent
                provider={equipmentType.icon.provider}
                name={equipmentType.icon.name}
                foregroundColor={equipmentType.foregroundColor}
                backgroundColor={equipmentType.backgroundColor}
                iconSize={16} />
              <Text style={styles.buttonText}>
                {equipmentType.name}
              </Text>
            </View>
            {renderEquipmentEffects(equipmentSlot)}
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return (
        <View style={StyleSheet.flatten([styles.rows, {minWidth: positioner.modalMajor,
          maxWidth: positioner.modalMajor}])} key={slot}>
          <Text style={{minWidth: 90, maxWidth: 90, textAlign: 'right'}}>
            {slot + ':'}
          </Text>
          <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
            {alignSelf: 'stretch', justifyContent: 'flex-start'}])}
            onPress={() => { }} >
            <BadgeComponent
              provider='FontAwesome5'
              name='minus-circle'
              foregroundColor='#888'
              backgroundColor='#fff'
              iconSize={16} />
            <Text style={styles.buttonText}>{'Nothing'}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  function renderEquipmentEffects(equipmentSlot: string) {
    if (equipmentSlot) {
      const anEquipment = equipment[equipmentSlot];
      const equipmentType = equipmentTypes[anEquipment.typeName];
      if (equipmentType.effects) {
        const effectArray = Object.keys(equipmentType.effects).map((quality) => {
          if (equipmentType.effects) {
            return equipmentType.effects[quality];
          }
        });
        return (
          <View style={styles.columns}>
            {effectArray.map((effect, index) => {
              if (effect) {
                return (
                  <View key={index} style={styles.buttonRowDetail}>
                    <Text style={styles.buttonRowDetailText}>
                      {effect.quality + ' +' + effect.change + '%'}
                    </Text>
                  </View>
                );
              }
              return null;
            })}
          </View>
        );
      }
    }
    return null;
  }

  function eatingPress() {
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_ONE, 'open',
      {type: MODALS.LEADER_DETAIL, subType: SET_EATING, leader: leader}));
  }

  function drinkingPress() {
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_ONE, 'open',
      {type: MODALS.LEADER_DETAIL, subType: SET_DRINKING, leader: leader}));
  }

  function assignedToPress() {
    dispatch(displayModalValue(MODALS.BUILDING_SELECT, 'open',
      {type: MODALS.LEADER_DETAIL, subType: ASSIGN_TO_BUILDING, leader: leader}));
  }

  function livingAtPress() {
    dispatch(displayModalValue(MODALS.BUILDING_SELECT, 'open',
      {type: MODALS.LEADER_DETAIL, subType: LIVE_AT_BUILDING, leader: leader}));
  }

  function toolPress() {

  }

  function clothingPress() {

  }

  function backPress() {

  }
}
