import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, TouchableOpacity, StyleSheet, ScrollView }
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
import EquipmentEffect from '../models/equipment_effect';
import Icon from '../models/icon';
import { buildingTypes } from '../instances/building_types';
import { equipmentTypes } from '../instances/equipment_types';
import { resourceTags } from '../instances/resource_tags';
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
  const leaders = useTypedSelector(state => state.leaders);
  const leader = leaders[modalValue.id];
  const buildings = useTypedSelector(state => state.buildings);
  const equipment = useTypedSelector(state => state.equipment);
  const vault = useTypedSelector(state => state.vault);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const slots: string[] = [SLOTS.TOOL, SLOTS.CLOTHING, SLOTS.BACK];

  const [happinessExpanded, setHappinessExpanded] = useState(false);
  const [effectsExpanded, setEffectsExpanded] = useState(false);

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
        <View style={{minWidth: positioner.modalMajor,
            maxWidth: positioner.modalMajor}}>
          <View style={styles.buttonTextRow}>
            <Text style={styles.bareText}>{'Happiness:'}</Text>
            {renderMoreButton(happinessExpanded, setHappinessExpanded)}
          </View>
          {happinessExpanded && renderExplanation(LEADER_QUALITIES.HAPPINESS)}
          <View style={styles.break} />
          <ProgressBarComponent startingProgress={0}
            width={positioner.majorWidth - positioner.majorPadding}
            endingProgress={(leader.happiness / 100)} duration={1000}
            labelStyle={styles.bareText}
            color={'#de0202'} label={(leader.happiness + '%')} />
        </View>
        <View style={styles.break} />
        <View style={{minWidth: positioner.modalMajor,
            maxWidth: positioner.modalMajor}}>
          <View style={styles.buttonTextRow}>
            <Text style={styles.bareText}>{'Effects:'}</Text>
            {renderMoreButton(effectsExpanded, setEffectsExpanded)}
          </View>
          {effectsExpanded && (
            leader.effects.map((anEffect) => {
              return renderExplanation(`${anEffect.quality}|${anEffect.specificity || 'null'}|${anEffect.type || 'null'}`, anEffect)
            })
          )}
          <View style={StyleSheet.flatten([styles.panelFlexColumn,
            {minWidth: positioner.modalMajor - positioner.minorPadding,
              maxWidth: positioner.modalMajor - positioner.minorPadding,
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
        <View>
          <Text style={styles.bareText}>{'Equipment:'}</Text>
          <View style={StyleSheet.flatten([styles.panelFlexColumn,
            {minWidth: positioner.modalMajor - positioner.minorPadding,
              maxWidth: positioner.modalMajor - positioner.minorPadding}])}>
            {slots.map((slot, index) => {
              return renderSlot(slot);
            })}
          </View>
        </View>

      </ScrollView>
    </View>
  );

  function renderMoreButton(expanded: boolean,
    setExpanded: (expanded: boolean) => void) {
      let iconName = 'angle-down';
      let text = 'More'
      if (expanded) {
        iconName = 'angle-up';
        text = 'Hide';
      }
      return (
        <TouchableOpacity style={styles.buttonRowItemSmall}
          onPress={() => setExpanded(!expanded)}>
          <IconComponent provider='FontAwesome5' name={iconName}
            color={'#fff'} size={14} />
          <Text style={styles.buttonTextSmall}>
            {` ${text}`}
          </Text>
        </TouchableOpacity>
      );
  }

  function renderExplanation(quality: string, anEffect?: EquipmentEffect) {
    const explanation = leader.explanations[quality];
    if (!explanation) { return null; }
    const full = {width: ((positioner.modalMajor) - 2)};
    const half = {width: (((positioner.modalMajor) / 2) - 2)};
    const fullStyle: any = StyleSheet.flatten([full, styles.pseudoCell,
      {display: 'flex', alignItems: 'center'}]);
    const halfStyle: any = StyleSheet.flatten([half, styles.pseudoCell,
      styles.rows]);
    const quarter = {width: (((positioner.modalMajor) / 4) - 2)};
    const qatrStyle = StyleSheet.flatten([quarter, styles.pseudoCell]);
    const textBold: any = {fontSize: 12, fontWeight: 'bold'};
    const text = {fontSize: 12, flexShrink: 100} ;
    return (
      <View key={quality} style={full}>
        <View style={styles.break} />
        {anEffect && (
          <View style={styles.pseudoCellRow}>
            <View style={fullStyle}>
              <EquipmentEffectComponent anEffect={anEffect} size={'large'} />
            </View>
          </View>
        )}
        <View style={styles.pseudoCellRow}>
          <View style={halfStyle}><Text style={textBold}>{'Source'}</Text></View>
          <View style={qatrStyle}><Text style={textBold}>{'Change'}</Text></View>
          <View style={qatrStyle}><Text style={textBold}>{'Total'}</Text></View>
        </View>
        {explanation.map((row, index) =>
          <View key={index} style={styles.pseudoCellRow}>
            <View style={halfStyle}>
              {row.sourceIcon?.provider === 'svg' && (
                <>
                  <SvgComponent icon={new Icon({...row.sourceIcon, size: 18})} />
                  <Text>{' '}</Text>
                </>
              )}
              {row.sourceIcon?.provider !== 'svg' && (
                <>
                  <IconComponent size={18} provider={row.sourceIcon?.provider || ''}
                    name={row.sourceIcon?.name || ''} color={row.sourceIcon?.color || ''} />
                  <Text>{' '}</Text>
                </>
              )}
              <Text style={text}>{row.source}</Text>
            </View>
            <View style={qatrStyle}><Text style={text}>{row.change}</Text></View>
            <View style={qatrStyle}><Text style={text}>{row.total}</Text></View>
          </View>
        )}
      </View>
    );
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
            {utils.getResourceName(resource)}
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
            {utils.getResourceName(resource)}
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
        text: (building.name || buildingType.name),
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
            {(building.name || buildingType.name)}
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

    const iconName = resourceTags[slot].icon.name;

    if (equipmentSlot) {
      const anEquipment = equipment[equipmentSlot];
      const equipmentType = equipmentTypes[anEquipment.typeName];
      return (
        <View style={StyleSheet.flatten([styles.columns,
          {minWidth: positioner.modalMajor - positioner.minorPadding,
          maxWidth: positioner.modalMajor - positioner.minorPadding}])} key={slot}>
          <View style={styles.break} />
          <View style={StyleSheet.flatten([styles.rows, {paddingLeft: 5}])}>
            <IconComponent provider='FontAwesome5' name={iconName}
              color={'#686874'} size={14} />
            <Text style={{fontSize: 12}}> {slot + ':'}</Text>
          </View>
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
        <View style={StyleSheet.flatten([styles.columns,
          {minWidth: positioner.modalMajor - positioner.minorPadding,
          maxWidth: positioner.modalMajor - positioner.minorPadding}])} key={slot}>
          <View style={styles.break} />
          <View style={StyleSheet.flatten([styles.rows, {paddingLeft: 5}])}>
            <IconComponent provider='FontAwesome5' name={iconName}
              color={'#686874'} size={14} />
            <Text style={{fontSize: 12}}> {slot + ':'}</Text>
          </View>
          <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
            {alignSelf: 'stretch', flexDirection: 'column',
            alignItems: 'flex-start'}])}
            onPress={() => { equipmentPress(slot) }} >
            <View style={styles.rows}>
              <BadgeComponent
                provider='FontAwesome5'
                name='minus-circle'
                foregroundColor='#b1b1b1'
                backgroundColor='#fff'
                size={21} />
              <Text style={styles.buttonText}>{'Nothing'}</Text>
            </View>
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
