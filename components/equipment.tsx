import React from 'react';
import { Text, View, ScrollView, FlatList, TouchableOpacity, StyleSheet }
  from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import { addEquipment } from '../actions/equipment';
import { consumeResources } from '../actions/vault';

import Resource from '../models/resource';
import ResourceType from '../models/resource_type';
import { resourceTypes } from '../instances/resource_types';
import { equipmentTypes } from '../instances/equipment_types';
import { utils } from '../utils';
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';

export default function EquipmentComponent() {
  const vault = useTypedSelector(state => state.vault);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let cleanEquipmentArray: Resource[] = [];
  Object.keys(vault.resources).map((typeName) => {
    const resourceType = resourceTypes[typeName];
    const quantity = vault.resources[typeName].quantity;
    if (resourceType.category == RESOURCE_CATEGORIES.EQUIPMENT
      && quantity >= 1) {
      cleanEquipmentArray.push(vault.resources[typeName]);
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="hammer"
          color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Equipment'}</Text>
      </View>
      <FlatList
        data={cleanEquipmentArray}
        renderItem={renderCleanEquipment}
        keyExtractor={equipment => equipment.type}>
      </FlatList>
    </View>
  );

  function renderCleanEquipment(info: any) {
    return <CleanEquipmentDescription info={info} positioner={positioner}
      vault={vault} />
  }
}

function CleanEquipmentDescription(props: any) {
  const dispatch = useDispatch();
  const equipment = props.info.item;
  const equipmentType = resourceTypes[equipment.type];
  return (
    <View style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])}>
      <BadgeComponent
        provider={equipmentType.icon.provider}
        name={equipmentType.icon.name}
        foregroundColor={equipmentType.foregroundColor}
        backgroundColor={equipmentType.backgroundColor}
        iconSize={18} />
      <View style={styles.containerStretchColumn}>
        <View style={StyleSheet.flatten([styles.buttonTextRow, {minWidth: 230}])}>
          <Text>{equipment.type}</Text>
          <TouchableOpacity
            style={StyleSheet.flatten([styles.buttonRowItemSmall, styles.buttonLight])}
            onPress={() => {}}>
            <IconComponent provider="FontAwesome5" name="angle-down"
              color="#17265d" size={14} />
            <Text style={StyleSheet.flatten([styles.buttonTextSmall,
              styles.buttonTextDark])}>
              {' More'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={StyleSheet.flatten([styles.buttonTextRow, {minWidth: 230,
          minHeight: 24}])}>
          {renderMarkButtons()}
          <Text style={{fontSize: 20}}>
            {"x" + utils.formatNumberShort(equipment.quantity)}
          </Text>
        </View>
      </View>

    </View>
  );

  function renderMarkButtons() {
    return (
      <View style={styles.rows}>
        <Text>{"Mark: "}</Text>
        <TouchableOpacity
          style={StyleSheet.flatten([styles.buttonRowItemSmall])}
          onPress={() => markOneEquipment()}>
          <Text style={styles.buttonTextSmall}>{'1'}</Text>
        </TouchableOpacity>
        <Text>{" "}</Text>
        <TouchableOpacity
          style={StyleSheet.flatten([styles.buttonRowItemSmall])}
          onPress={() => markAllEquipment()}>
          <Text style={styles.buttonTextSmall}>{'All'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function markAllEquipment() {
    const equipment = props.info.item;
    for (let loop = 0; loop <= Math.floor(equipment.quantity); loop++) {
      markOneEquipment();
    }
  }

  function markOneEquipment() {
    const equipmentResource: Resource = props.info.item;
    const equipmentTypeName = equipmentResource.type.split(' (')[0];
    const equipmentType = equipmentTypes[equipmentTypeName];
    const newEquipment = equipmentType.createEquipment(1, props.vault);
    console.log('newEquipment');
    console.log(newEquipment);
    dispatch(addEquipment(newEquipment));
    dispatch(consumeResources(props.vault,
      [{type: equipmentResource.type, quantity: 1}]));
  }
}
