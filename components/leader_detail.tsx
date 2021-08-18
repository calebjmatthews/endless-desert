import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity, StyleSheet, ScrollView }
  from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import SvgComponent from './svg';
import EquipmentEffectComponent from './equipment_effect';
import ProgressBarComponent from '../components/progress_bar';
import { SET_EATING, SET_DRINKING, ASSIGN_TO_BUILDING, LIVE_AT_BUILDING }
  from '../actions/leaders';
import { displayModalValue } from '../actions/ui';

import Leader from '../models/leader';
import Icon from '../models/icon';
import { buildingTypes } from '../instances/building_types';
import { equipmentTypes } from '../instances/equipment_types';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { MODALS } from '../enums/modals';
import { LEADER_QUALITIES } from '../enums/leader_qualities';

enum SLOTS { TOOL = 'Tool', CLOTHING = 'Clothing', BACK = 'Back' };

const noFood = {
  icon: new Icon({ provider: 'FontAwesome5', name: 'paw', color: '#000' }),
  text: 'Foraging',
  style: StyleSheet.flatten([styles.buttonRowItem, styles.buttonDisabled]),
  disabled: true
};
const noDrink = {
  icon: new Icon({ provider: 'MaterialCommunityIcons', name: 'water-off',
    color: '#000' }),
  text: 'Scavenging',
  style: StyleSheet.flatten([styles.buttonRowItem, styles.buttonDisabled]),
  disabled: true
};
const noHome = {
  icon: new Icon({ provider: 'MaterialCommunityIcons', name: 'tent', color: '#000' }),
  text: 'Camping',
  style: StyleSheet.flatten([styles.buttonRowItem, styles.buttonDisabled]),
  disabled: true
};
const rest = {
  icon: new Icon({ provider: 'MaterialCommunityIcons', name: 'sleep', color: '#000' }),
  text: 'Resting',
  style: styles.buttonRowItem,
  disabled: false
};

export default function LeaderDetailComponent() {
  const dispatch = useDispatch();
  const modalValue: Leader = useTypedSelector(state => state.ui.modalValue);
  const leader = modalValue;
  const buildings = useTypedSelector(state => state.buildings);
  const equipment = useTypedSelector(state => state.equipment);
  const vault = useTypedSelector(state => state.vault);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const slots: string[] = [SLOTS.TOOL, SLOTS.CLOTHING, SLOTS.BACK];

  const [happinessExpanded, setHappinessExpanded] = useState(true);

  return (
    <View style={styles.modalContent}>
      <View style={styles.headingWrapper}>
        <BadgeComponent icon={leader.icon} size={55} />
        <Text style={styles.heading1}>{leader.name}</Text>
      </View>
      <ScrollView contentContainerStyle={{display: 'flex', alignItems: 'center'}}>
        <View style={StyleSheet.flatten([styles.descriptionBand,
          {minWidth: positioner.modalWidth,
            maxWidth: positioner.modalWidth}])}>
          <Text style={styles.descriptionBandText}>{leader.description}</Text>
        </View>
        <View style={{width: (positioner.modalWidth - 40)}}>
          <Text style={styles.bareText}>Happiness:</Text>
          {renderHappinessExplanation()}
          <ProgressBarComponent startingProgress={0}
            endingProgress={(leader.happiness / 100)} duration={1000}
            labelStyle={styles.bareText}
            color={'#de0202'} label={(leader.happiness + '%')} />
        </View>
        <View style={styles.break} />
        <View style={StyleSheet.flatten([{minWidth: positioner.modalMajor,
            maxWidth: positioner.modalMajor}])}>
          <Text style={styles.bareText}>{'Work Effects:'}</Text>
          <View style={StyleSheet.flatten([styles.panelFlexColumn,
            {minWidth: positioner.modalMajor, maxWidth: positioner.modalMajor,
            alignItems: 'flex-start'}])}>
            {leader.effects.map((anEffect, index) => {
              return <EquipmentEffectComponent key={index} anEffect={anEffect} />;
            })}
          </View>
        </View>
        <View style={styles.break} />
        <View style={styles.rows}>
          <View style={StyleSheet.flatten([{minWidth: positioner.modalHalf,
              maxWidth: positioner.modalHalf}])}>
            <Text style={styles.bareText}>{'Eating:'}</Text>
            {renderEating()}
          </View>
          <View style={StyleSheet.flatten([{minWidth: positioner.modalHalf,
              maxWidth: positioner.modalHalf}])}>
            <Text style={styles.bareText}>{'Drinking:'}</Text>
            {renderDrinking()}
          </View>
        </View>
        <View style={styles.rows}>
          <View style={StyleSheet.flatten([{minWidth: positioner.modalHalf,
              maxWidth: positioner.modalHalf}])}>
            <Text style={styles.bareText}>{'Living at:'}</Text>
            {renderLivingAt()}
          </View>
          <View style={StyleSheet.flatten([{minWidth: positioner.modalHalf,
              maxWidth: positioner.modalHalf}])}>
            <Text style={styles.bareText}>{'Working at:'}</Text>
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
    </View>
  );

  function renderHappinessExplanation() {
    const happinessExplanation = leader.explanations[LEADER_QUALITIES.HAPPINESS];
    if (happinessExpanded && happinessExplanation) {
      const full = {width: ((positioner.modalWidth - 40) - 2)};
      const half = {width: (((positioner.modalWidth - 40) / 2) - 2)};
      const halfStyle: any = StyleSheet.flatten([half, styles.pseudoCell,
        styles.rows]);
      const quarter = {width: (((positioner.modalWidth - 40) / 4) - 2)};
      const qatrStyle = StyleSheet.flatten([quarter, styles.pseudoCell]);
      const textBold: any = {fontSize: 12, fontWeight: "bold"};
      const text = {fontSize: 12, flexShrink: 10} ;
      return (
        <View style={full}>
          <View style={styles.break} />
          <View style={styles.pseudoCellRow}>
            <View style={halfStyle}><Text style={textBold}>{'Source'}</Text></View>
            <View style={qatrStyle}><Text style={textBold}>{'Change'}</Text></View>
            <View style={qatrStyle}><Text style={textBold}>{'Total'}</Text></View>
          </View>
          {happinessExplanation.map((row, index) =>
            <View key={index} style={styles.pseudoCellRow}>
              <View style={halfStyle}>
                {row.sourceIcon && (
                  <>
                    <SvgComponent icon={new Icon({...row.sourceIcon, size: 18})} />
                    <Text>{' '}</Text>
                  </>
                )}
                <Text style={text}>{row.source}</Text>
              </View>
              <View style={qatrStyle}><Text style={text}>{row.change}</Text></View>
              <View style={qatrStyle}><Text style={text}>{row.total}</Text></View>
            </View>
          )}
          <View style={styles.break} />
        </View>
      );
    }
    return null;
  }

  function renderEating() {
    if (leader.eating) {
      const resource = vault.resources[leader.eating];
      const resourceType = utils.getResourceType(resource);
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { eatingPress() }} >
          <BadgeComponent icon={resourceType.icon} quality={resource.quality}
            size={21} />
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
          <BadgeComponent icon={noFood.icon} />
          <Text style={styles.buttonText}>
            {noFood.text}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  function renderDrinking() {
    if (leader.drinking) {
      const resource = vault.resources[leader.drinking];
      const resourceType = utils.getResourceType(resource);
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { drinkingPress() }} >
          <BadgeComponent icon={resourceType.icon} quality={resource.quality}
            size={21} />
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
          <BadgeComponent icon={noDrink.icon} />
          <Text style={styles.buttonText}>
            {noDrink.text}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  function renderAssignedTo() {
    let assignedToState: { icon: Icon, text: string, style: any,
      disabled: boolean } = rest;
    if (!leader.eating) {
      assignedToState = noFood;
    }
    else if (!leader.drinking) {
      assignedToState = noDrink;
    }
    else if (!leader.livingAt) {
      assignedToState = noHome;
    }
    else if (leader.assignedTo) {
      const building = buildings[leader.assignedTo];
      const buildingType = buildingTypes[building.buildingType];
      assignedToState = {
        icon: buildingType.icon,
        text: buildingType.name,
        style: styles.buttonRowItem,
        disabled: false
      };
    }

    return (
      <TouchableOpacity style={assignedToState.style}
        onPress={() => { assignedToPress() }} disabled={assignedToState.disabled} >
        <BadgeComponent icon={assignedToState.icon} size={21} />
        <Text style={styles.buttonText}>
          {assignedToState.text}
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
          <BadgeComponent icon={buildingType.icon} size={21} />
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
            size={21} />
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
            alignItems: 'flex-start'}])}
            onPress={() => { equipmentPress(slot) }} >
            <View style={styles.rows}>
              <BadgeComponent icon={equipmentType.icon} size={29} />
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
            onPress={() => { equipmentPress(slot) }} >
            <BadgeComponent
              provider='FontAwesome5'
              name='minus-circle'
              foregroundColor='#b1b1b1'
              backgroundColor='#fff'
              size={21} />
            <Text style={styles.buttonText}>{'Nothing'}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  function renderEquipmentEffects(equipmentSlot: string) {
    if (equipmentSlot) {
      const anEquipment = equipment[equipmentSlot];
      if (anEquipment.effects) {
        return (
          <View style={styles.columns}>
            {anEquipment.effects.map((anEffect, index) => {
              return <EquipmentEffectComponent key={index} anEffect={anEffect} />;
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

  function equipmentPress(slot: string) {
    dispatch(displayModalValue(MODALS.EQUIPMENT_SELECT, 'open',
      {type: MODALS.LEADER_DETAIL, subType: slot, leader: leader}));
  }
}
