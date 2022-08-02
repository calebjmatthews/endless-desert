import React from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
const flat = StyleSheet.flatten;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import EquipmentEffectComponent from './equipment_effect';
import { addToActivityQueue } from '../actions/quest_status';
import { setEquipmentMarked } from '../actions/equipment_marked';
import { displayModal } from '../actions/ui';

import Resource from '../models/resource';
import Equipment from '../models/equipment';
import Vault from '../models/vault';
import QuestActivity from '../models/quest_activity';
import EquipmentEffect from '../models/equipment_effect';
import Icon from '../models/icon';
import { resourceTypes } from '../instances/resource_types';
import { resourceTags } from '../instances/resource_tags';
import { resourceCategories } from '../instances/resource_categories';
import { equipmentTypes } from '../instances/equipment_types';
import { treasures } from '../instances/treasures';
import { renderValue } from './utils_react';
import { utils } from '../utils';
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
import { MODALS } from '../enums/modals';

export default function ResourceDetailComponent() {
  const modalValue: string = useTypedSelector(state => state.ui.modalValue);
  const vault = useTypedSelector(state => state.vault);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const resource = vault.resources[modalValue];
  const resourceType = new Resource(resource).toResourceType(resourceTypes);
  const resourceCategory = resourceCategories[resourceType.category];
  const count = utils.formatNumberShort(resource.quantity);

  const name = utils.getResourceName(resource).replace(' (U)', ', Unmarked');

  let description = resourceType.description;
  const equipmentDescription = equipmentTypes[resourceType.name
    .replace(' (U)', '')]?.description;
  if (equipmentDescription) {
    description = `${equipmentDescription}; it'll need to be stamped with the town symbol to be used by leaders`;
  }
  if (!description) { description = `A mysterious ${resourceCategory.name}`; }

  return (
    <View style={styles.modalContent}>
      <View style={styles.headingWrapper}>
        <BadgeComponent icon={resourceType.icon} quality={resource.quality}
          size={55} />
        <Text style={styles.heading1}>{name}</Text>
      </View>
      <View style={{flex: 1, display: 'flex', alignItems: 'center'}}>
        <View style={styles.centeredRows}>
          <IconComponent provider={resourceCategory.icon.provider}
            name={resourceCategory.icon.name} color={resourceCategory.icon.color}
            size={19} style={styles.bareText} />
          <Text style={styles.bareText}>
            {' ' + resourceCategory.name}
          </Text>
        </View>
        <View style={flat([styles.descriptionBand,
          {minWidth: positioner.modalWidth,
            maxWidth: positioner.modalWidth}])}>
          <Text style={styles.descriptionBandText}>
            {description}
          </Text>
        </View>
        <View style={StyleSheet.flatten([styles.container, {paddingHorizontal: 5,
          justifyContent: 'space-between'}])}>
          <View style={StyleSheet.flatten([styles.spacedRows,
            {justifyContent: 'center'}])}>
            {resourceType.tags.map((tagName) => {return renderTag(tagName)})}
          </View>
          {resourceCategory.name === RESOURCE_CATEGORIES.TREASURE && (
            <TreasureEffects {...treasures[resource.type]} />
          )}
          <View style={styles.break} />
          <View style={flat([styles.rows, {justifyContent: 'space-between',
            alignItems: 'flex-end', minWidth: positioner.modalMajor,
            maxWidth: positioner.modalMajor}])}>
            <View style={flat([styles.rows, {alignItems: 'flex-end'}])}>
              {renderValue(resourceType.value, 20, styles.bareText)}
              <Text style={styles.bareText}>{' value'}</Text>
            </View>
            <View style={flat([styles.rows, {alignItems: 'flex-end'}])}>
              <Text style={styles.bareText}>{'total (x' + count + ') '}</Text>
              {renderValue((resourceType.value * resource.quantity), 25, styles.bareText)}
            </View>
          </View>
        </View>
        {resourceCategory.name === RESOURCE_CATEGORIES.EQUIPMENT && (
          <MarkEquipmentButtons resource={resource} vault={vault} />
        )}
        <View style={styles.break} />
      </View>
    </View>
  );

  function renderTag(tagName: string) {
    const tag = resourceTags[tagName];
    if (tag) {
      return (
        <View key={tag.name} style={flat([styles.infoBar, {marginHorizontal: 5}])}>
          <View style={styles.rows}>
            <IconComponent provider={tag.icon.provider} name={tag.icon.name}
              color={tag.icon.color} size={16} />
            <Text style={{fontSize: 12}}>{' ' + tag.name}</Text>
          </View>
        </View>
      );
    }
  }
}

function MarkEquipmentButtons(props: {resource: Resource, vault: Vault}) {
  const dispatch = useDispatch();
  const { resource, vault } = props;
  const equipmentType = equipmentTypes[resource.type.split(' (')[0]];
  return (
    <>
      <View style={styles.break} />
      <TouchableOpacity style={styles.buttonLarge}
        onPress={() => { markEquipment(1) }}>
        <IconComponent provider="FontAwesome5" name="stamp" color="#fff" size={18}
          style={styles.headingIcon} />
        <Text style={[styles.buttonText, {fontSize: 16}]}>{` Mark One`}</Text>
      </TouchableOpacity>
      {resource.quantity > 1 && (
        <>
          <View style={styles.break} />
          <TouchableOpacity style={styles.buttonLarge}
            onPress={() => { markEquipment(resource.quantity) }}>
            <IconComponent provider="FontAwesome5" name="layer-group" color="#fff" size={18}
              style={styles.headingIcon} />
            <Text style={[styles.buttonText, {fontSize: 16}]}>{` Mark All`}</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );

  function markEquipment(count: number) {
    const newEquipmentMarked: { [id: string] : Equipment} = {};
    for (let loop = 0; loop < count; loop++) {
      const anEquipment = equipmentType.createEquipment(resource.quality, vault, resourceTypes);
      newEquipmentMarked[anEquipment.id] = anEquipment;
    }
    const equipmentTypeName = props.resource.type.split(' (')[0];
    const tier = 0;
    dispatch(addToActivityQueue(new QuestActivity({ id: utils.randHex(16),
      equipmentMarked: { typeName: equipmentTypeName, tier, quantity: count } })));
    dispatch(setEquipmentMarked(newEquipmentMarked));
    if (count > 1) {
      dispatch(displayModal(MODALS.EQUIPMENT_MARKED_ALL));
    }
    else {
      dispatch(displayModal(MODALS.EQUIPMENT_MARKED_ONE));
    }
  }
}

function TreasureEffects(props: {equipmentEffects?: EquipmentEffect[],
  otherEffects?: { icon: Icon, label: string }[]}) {
  const { equipmentEffects, otherEffects } = props;
  if (!equipmentEffects && !otherEffects) { return null; }
  return (
    <View style={styles.columns}>
      <View style={styles.break} />
      <Text style={styles.bareText}>{`Effects:`}</Text>
      {equipmentEffects?.map((equipmentEffect) => (
        <EquipmentEffectComponent key={`eec-${equipmentEffect.type}`} anEffect={equipmentEffect} />
      ))}
      {otherEffects?.map((otherEffect) => (
        <View key={`ooc-${otherEffect.label}`} style={styles.infoBar}>
          <IconComponent {...otherEffect.icon} size={16} />
          <Text style={{fontSize: 12, marginLeft: 5}}>{otherEffect.label}</Text>
        </View>
      ))}
    </View>
  )
}