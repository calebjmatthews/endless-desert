import React from 'react';
import { Text, View, ScrollView, FlatList, TouchableOpacity, StyleSheet }
  from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import EquipmentEffectComponent from './equipment_effect';
import { addEquipment } from '../actions/equipment';
import { consumeResources } from '../actions/vault';

import Resource from '../models/resource';
import ResourceType from '../models/resource_type';
import ResourceTag from '../models/resource_tag';
import ResourceSubcategory from '../models/resource_subcategory';
import ResourceCategory from '../models/resource_category';
import Equipment from '../models/equipment';
import Leader from '../models/leader';
import EquipmentEffect from '../models/equipment_effect';
import { resourceTypes } from '../instances/resource_types';
import { resourceTags } from '../instances/resource_tags';
import { resourceSubcategories } from '../instances/resource_subcategories';
import { resourceCategories } from '../instances/resource_categories';
import { equipmentTypes } from '../instances/equipment_types';
import { leaderQualities } from '../instances/leader_qualities';
import { utils } from '../utils';
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';

export default function EquipmentComponent() {
  const vault = useTypedSelector(state => state.vault);
  const equipment = useTypedSelector(state => state.equipment);
  const leaders = useTypedSelector(state => state.leaders);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let equipmentArray: any[] = [];
  Object.keys(vault.resources).map((typeQuality) => {
    const resource = vault.resources[typeQuality];
    const resourceType = utils.getResourceType(resource);
    const quantity = vault.resources[typeQuality].quantity;
    if (resourceType.category == RESOURCE_CATEGORIES.EQUIPMENT
      && quantity >= 1) {
      let obj: any = vault.resources[typeQuality];
      obj.marked = false;
      obj.key = obj.type;
      equipmentArray.push(obj);
    }
  });
  Object.keys(equipment).map((id) => {
    let obj: any = equipment[id];
    obj.marked = true;
    obj.key = obj.id;
    equipmentArray.push(obj);
  });
  let leaderMap: { [equipmentId: string] : Leader } = {};
  Object.keys(leaders).map((id) => {
    const leader = leaders[id];
    if (leader.toolEquipped) {
      leaderMap[leader.toolEquipped] = leader;
    }
    if (leader.clothingEquipped) {
      leaderMap[leader.clothingEquipped] = leader;
    }
    if (leader.backEquipped) {
      leaderMap[leader.backEquipped] = leader;
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
        data={equipmentArray}
        renderItem={renderAllEquipment}
        keyExtractor={anEquipment => anEquipment.key}>
      </FlatList>
    </View>
  );

  function renderAllEquipment(info: any) {
    if (info.item.marked == true) {
      return <MarkedEquipmentDescription info={info} positioner={positioner}
        equipment={equipment} leaderMap={leaderMap} />
    }
    else {
      return <CleanEquipmentDescription info={info} positioner={positioner}
        vault={vault} />
    }
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
      <BadgeComponent icon={equipmentType.icon} size={29} />
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
    const newEquipment = equipmentType.createEquipment(1, props.vault, resourceTypes);
    console.log('newEquipment');
    console.log(newEquipment);
    dispatch(addEquipment(newEquipment));
    dispatch(consumeResources(props.vault,
      [new Resource({type: equipmentResource.type, quality: equipmentResource.quality,
        quantity: 1})]));
  }
}

function MarkedEquipmentDescription(props: any) {
  const anEquipment: Equipment = props.equipment[props.info.item.id];
  const equipmentType = equipmentTypes[anEquipment.typeName];
  return (
    <View style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])}>
      <BadgeComponent icon={equipmentType.icon} size={29} />
      <View style={styles.containerStretchColumn}>
        <View style={StyleSheet.flatten([styles.buttonTextRow, {minWidth: 230}])}>
          <Text>{anEquipment.typeName}</Text>
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
        {renderEquipmentEffects(anEquipment)}
        {renderEquippedBy(anEquipment, props.leaderMap)}
      </View>
    </View>
  );

  function renderEquipmentEffects(anEquipment: Equipment) {
    if (anEquipment.effects) {
      return (
        <View style={styles.columns}>
          {anEquipment.effects.map((anEffect, index) => {
            return (
              <EquipmentEffectComponent key={index} anEffect={anEffect} />
            );
          })}
        </View>
      );
    }
    return null;
  }

  function renderEquippedBy(anEquipment: Equipment,
    leaderMap: { [equipmentId: string] : Leader }) {
    const leader = leaderMap[anEquipment.id];
    if (leader) {
      return (
        <View style={styles.rows}>
          <BadgeComponent icon={leader.icon} size={19} />
          <Text style={{fontSize: 12}}>{' ' + leader.name + ' equipped'}</Text>
        </View>
      );
    }
    return null;
  }
}
