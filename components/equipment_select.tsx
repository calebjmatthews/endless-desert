import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet }
  from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import { DON_EQUIPMENT, donEquipment } from '../actions/leaders';
import { setRates } from '../actions/rates';
import { displayModalValue } from '../actions/ui';

import Leader from '../models/leader';
import Equipment from '../models/equipment';
import EquipmentType from '../models/equipment_type';
import Hourglass from '../models/hourglass';
import Positioner from '../models/positioner';
import { equipmentTypes } from '../instances/equipment_types';
import { MODALS } from '../enums/modals';
import { EQUIPMENT_SLOTS } from '../enums/equipment_slots';

export default function EquipmentSelectComponent() {
  const dispatch = useDispatch();
  const equipment = useTypedSelector(state => state.equipment);
  const leaders = useTypedSelector(state => state.leaders);
  const buildings = useTypedSelector(state => state.buildings);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const modalValue: {type: string, subType: string, leader: Leader} =
    useTypedSelector(state => state.ui.modalValue);
  let equipmentArray = Object.keys(equipment).map((equipmentId) => {
    return equipment[equipmentId];
  });
  equipmentArray = equipmentArray.filter((equipment) => {
    const equipmentType = equipmentTypes[equipment.typeName];
    if (equipmentType.slot == modalValue.subType) { return equipment; }
  });

  function setStartingSelected(): string|null {
    if (equipmentArray.length == 1) { return equipmentArray[0].id; }
    return null;
  }
  const [equipmentSelected, equipmentSelect] = useState(setStartingSelected());

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="hammer"
          color="#fff" size={20} style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Select ' + modalValue.subType}</Text>
      </View>
      <ScrollView>
        <View style={styles.tileContainer}>
          {renderEquipment(equipmentArray, equipmentSelect)}
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

  function renderEquipment(equipmentArray: Equipment[],
    setEquipmentSelected: Function) {
    return equipmentArray.map((anEquipment) => {
      return <EquipmentSelector key={anEquipment.id} anEquipment={anEquipment}
        equipmentSelected={equipmentSelected}
        setEquipmentSelected={setEquipmentSelected}
        positioner={positioner} />;
    });
  }

  function renderSubmitButton() {
    let isDisabled = false;
    let buttonStyle: any = StyleSheet.flatten([styles.buttonLarge,
      styles.buttonRowItem]);
    if (equipmentSelected == null) {
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
    if (equipmentSelected) {
      const anEquipment = equipment[equipmentSelected];
      let tempLeaders = Object.assign({}, leaders);
      if (modalValue.subType == EQUIPMENT_SLOTS.TOOL) {
        tempLeaders[modalValue.leader.id].toolEquipped = equipmentSelected;
      }
      else if (modalValue.subType == EQUIPMENT_SLOTS.CLOTHING) {
        tempLeaders[modalValue.leader.id].clothingEquipped = equipmentSelected;
      }
      else if (modalValue.subType == EQUIPMENT_SLOTS.BACK) {
        tempLeaders[modalValue.leader.id].backEquipped = equipmentSelected;
      }
      tempLeaders[modalValue.leader.id].setPluses(equipment);
      let newRates = new Hourglass().setRates(buildings, tempLeaders);

      dispatch(donEquipment(modalValue.leader, anEquipment));
      dispatch(setRates(newRates));
      dispatch(displayModalValue(MODALS.LEADER_DETAIL, 'open', modalValue.leader));
    }
  }
}

function EquipmentSelector(props: {anEquipment: Equipment,
  equipmentSelected: string|null, setEquipmentSelected: Function,
  positioner: Positioner}) {
  let equipmentType = equipmentTypes[props.anEquipment.typeName];
  let optionTextStyle = {paddingLeft: 4, paddingRight: 4};
  return (
    <View style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: props.positioner.modalMajor,
        maxWidth: props.positioner.modalMajor}])}>
      <BadgeComponent
        provider={equipmentType.icon.provider}
        name={equipmentType.icon.name}
        foregroundColor={equipmentType.foregroundColor}
        backgroundColor={equipmentType.backgroundColor}
        iconSize={18} />
      <View>
        <Text style={optionTextStyle}>{equipmentType.name}</Text>
        {renderEquipmentEffects(equipmentType)}
        {renderButton(props.anEquipment, props.equipmentSelected,
          props.setEquipmentSelected)}
      </View>
    </View>
  );

  function renderButton(anEquipment: Equipment,
    equipmentSelected: string|null, setEquipmentSelected: Function) {

    if (equipmentSelected == anEquipment.id) {
      let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, { width: 74 }]);
      return (
        <TouchableOpacity style={buttonStyle}
          onPress={() => {equipmentIdUnSelect(setEquipmentSelected)}} >
          <Text style={styles.buttonText}>{'Selected'}</Text>
        </TouchableOpacity>
      );
    }
    let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, styles.buttonLight,
      { width: 74 }]);
    return (
      <TouchableOpacity style={buttonStyle}
      onPress={() => {equipmentIdSelect(anEquipment, setEquipmentSelected)}} >
        <Text style={StyleSheet.flatten([styles.buttonText,
          styles.buttonTextDark])}>{'Select'}</Text>
      </TouchableOpacity>
    );
  }

  function renderEquipmentEffects(equipmentType: EquipmentType) {
    let effectTextStyle = {paddingLeft: 12, paddingRight: 4, fontSize: 12};
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
                <View key={index}>
                  <Text style={effectTextStyle}>
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

  function equipmentIdUnSelect(setEquipmentSelected: Function) {
    setEquipmentSelected(null);
  }
  function equipmentIdSelect(anEquipment: Equipment, setEquipmentSelected: Function) {
    setEquipmentSelected(anEquipment.id);
  }
}
