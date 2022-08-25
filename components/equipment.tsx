import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import EquipmentEffectComponent from './equipment_effect';
import EquipmentNameComponent from './equipment_name';
import { removeEquipment } from '../actions/equipment';
import { increaseResources } from '../actions/vault';
import { addToActivityQueue } from '../actions/quest_status';
import { setEquipmentMarked } from '../actions/equipment_marked';
import { displayModal, displayModalValue } from '../actions/ui';

import Resource from '../models/resource';
import Equipment from '../models/equipment';
import Leader from '../models/leader';
import Vault from '../models/vault';
import QuestActivity from '../models/quest_activity';
import Positioner from '../models/positioner';
import { resourceTypes } from '../instances/resource_types';
import { equipmentTypes } from '../instances/equipment_types';
import { utils } from '../utils';
import { EQUIPMENT_SLOTS } from '../enums/equipment_slots';
const EQS = EQUIPMENT_SLOTS;
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
import { MODALS } from '../enums/modals';

export default function EquipmentComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const equipment = useTypedSelector(state => state.equipment);
  const leaders = useTypedSelector(state => state.leaders);
  const positioner = useTypedSelector(state => state.ui.positioner);

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

  const uiArray: UiItem[] = getUiArray(leaderMap);

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="hammer"
          color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Equipment'}</Text>
      </View>
      <FlatList
        data={uiArray}
        renderItem={renderUiArray}
        keyExtractor={anEquipment => anEquipment.id}>
      </FlatList>
    </View>
  );

  function renderUiArray(data: { item: UiItem }) {
    switch(data.item.type) {
      case 'category':
      return <CategoryDescription name={data.item.id}
        deconstructNotEquipped={deconstructNotEquipped} positioner={positioner} />;

      case 'resource':
      if (data.item.resource) {
        return <CleanEquipmentDescription resource={data.item.resource}
          positioner={positioner} vault={vault} />;
      } break;

      case 'equipment':
      if (data.item.anEquipment) {
        return <MarkedEquipmentDescription anEquipment={data.item.anEquipment}
          positioner={positioner} equipment={equipment} leaderMap={leaderMap} />;
      } break;
    }
    return null;
  }

  function getUiArray(leaderMap: { [equipmentId: string] : Leader }) {
    let uiArray: UiItem[] = [];

    let resourceArray: UiItem[] = [];
    Object.keys(vault.resources).forEach((typeQuality) => {
      const resource = vault.resources[typeQuality];
      const resourceType = utils.getResourceType(resource);
      if (resourceType.category == RESOURCE_CATEGORIES.EQUIPMENT
        && resource.quantity >= 1) {
        resourceArray.push({ type: 'resource', id: resource.type, resource });
      }
    });
    resourceArray = resourceArray.sort((a, b) => {
      const rTypeA = resourceTypes[a.id];
      const rTypeB = resourceTypes[b.id];
      return rTypeA.value - rTypeB.value;
    });
    uiArray = [...resourceArray];

    if (uiArray.length > 0) {
      uiArray.unshift({ type: 'category', id: 'resource' });
    }

    if (Object.keys(equipment).length > 0) {
      uiArray.push({ type: 'category', id: 'equipment' });
    }

    let equipmentArray: UiItem[] = [];
    Object.keys(equipment).forEach((id) => {
      const anEquipment = equipment[id];
      equipmentArray.push({ type: 'equipment', id, anEquipment });
    });
    equipmentArray = equipmentArray.sort((a, b) => {
      if (leaderMap[a.id] && !leaderMap[b.id]) { return -1; }
      if (leaderMap[b.id] && !leaderMap[a.id]) { return 1; }

      if (!a.anEquipment || !b.anEquipment) { return 0; }

      const eTypeA = equipmentTypes[a.anEquipment.typeName];
      const eTypeB = equipmentTypes[b.anEquipment.typeName];
      if (eTypeA.slot != eTypeB.slot) {
        const slotSort: { [name: string] : number } =
          { [EQS.TOOL] : 0, [EQS.CLOTHING] : 1, [EQS.BACK] : 2 };
        return slotSort[eTypeA.slot] - slotSort[eTypeB.slot];
      }

      const rTypeA = resourceTypes[a.anEquipment.typeName + ' (U)'];
      const rTypeB = resourceTypes[b.anEquipment.typeName + ' (U)'];
      if (rTypeA.value !== rTypeB.value) {
        return rTypeA.value - rTypeB.value;
      }
      
      return b.anEquipment.tier - a.anEquipment.tier;
    });

    uiArray = [...uiArray, ...equipmentArray];

    return uiArray;
  }

  function deconstructNotEquipped() {
    const etd: Equipment[] = [];
    const rti: Resource[] = [];
    Object.keys(equipment).forEach((id) => {
      const anEquipment = equipment[id];
      if (!leaderMap[id]) {
        etd.push(anEquipment);
        const equipmentType = equipmentTypes[anEquipment.typeName];
        if (equipmentType.recipeConsumes) {
          equipmentType.recipeConsumes.forEach((resource) => {
            rti.push(new Resource({ ...resource, quality: 0 }));
          })
        }
      }
    });
    if (etd.length > 0) {
      dispatch(removeEquipment(etd));
      if (rti.length > 0) {
        dispatch(increaseResources(vault, rti));
      }
    }
  }
}

function CleanEquipmentDescription(props: { resource: Resource, vault: Vault,
    positioner: Positioner }) {
  const dispatch = useDispatch();
  const resource = props.resource;
  const resourceType = resourceTypes[resource.type];
  return (
    <View style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])}>
      <TouchableOpacity onPress={() => resourceDetailOpen(resource)}>
        <BadgeComponent icon={resourceType.icon} size={29} />
      </TouchableOpacity>
      <View style={styles.containerStretchColumn}>
        <View style={StyleSheet.flatten([styles.buttonTextRow,
          {minWidth: props.positioner.bodyMedWidth,
            maxWidth: props.positioner.bodyMedWidth}])}>
          <Text>{resource.type}</Text>
          <TouchableOpacity
            style={StyleSheet.flatten([styles.buttonRowItemSmall, styles.buttonLight])}
            onPress={() => resourceDetailOpen(resource)}>
            <IconComponent provider="FontAwesome5" name="angle-down"
              color="#17265d" size={14} />
            <Text style={StyleSheet.flatten([styles.buttonTextSmall,
              styles.buttonTextDark])}>
              {' More'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={StyleSheet.flatten([styles.buttonTextRow,
          {minWidth: props.positioner.bodyMedWidth,
            maxWidth: props.positioner.bodyMedWidth, minHeight: 24}])}>
          {renderMarkButtons()}
          <Text style={{fontSize: 20}}>
            {"x" + utils.formatNumberShort(resource.quantity)}
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
          onPress={() => markEquipment(1)}>
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
    const resource = props.resource;
    markEquipment(Math.floor(resource.quantity));
  }

  function markEquipment(count: number) {
    const equipmentType = equipmentTypes[resource.type.split(' (')[0]];
    const newEquipmentMarked: { [id: string] : Equipment} = {};
    for (let loop = 0; loop < count; loop++) {
      const anEquipment = equipmentType.createEquipment(resource.quality, props.vault, resourceTypes);
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

  function resourceDetailOpen(resource: Resource) {
    const typeQuality = resource.type + '|' + resource.quality;
    dispatch(displayModalValue(MODALS.RESOURCE_DETAIL, 'open', { typeQuality }));
  }
}

function MarkedEquipmentDescription(props: { anEquipment: Equipment,
  positioner: Positioner, equipment: { [id: string] : Equipment},
  leaderMap: { [equipmentId: string] : Leader } }) {
  const dispatch = useDispatch();
  const anEquipment: Equipment = props.equipment[props.anEquipment.id];
  const equipmentType = equipmentTypes[anEquipment.typeName];

  return (
    <View style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])}>
      <TouchableOpacity onPress={() => morePress(anEquipment)}>
        <BadgeComponent icon={equipmentType.icon} size={29} />
      </TouchableOpacity>
      <View style={styles.containerStretchColumn}>
        <View style={StyleSheet.flatten([styles.buttonTextRow,
          {minWidth: props.positioner.bodyMedWidth,
            maxWidth: props.positioner.bodyMedWidth}])}>
          <EquipmentNameComponent anEquipment={anEquipment} size='medium' />
          <TouchableOpacity
            style={StyleSheet.flatten([styles.buttonRowItemSmall, styles.buttonLight])}
            onPress={() => morePress(anEquipment)}>
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
        <View style={[styles.equipmentEffectSmallContainer, {minWidth: props.positioner.bodyMedWidth,
          maxWidth: props.positioner.bodyMedWidth}]}>
          {anEquipment.effects.map((anEffect, index) => {
            return (
              <EquipmentEffectComponent key={index} anEffect={anEffect} size='small' />
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

  function morePress(anEquipment: Equipment) {
    dispatch(displayModalValue(MODALS.EQUIPMENT_DETAIL, 'open', anEquipment));
  }
}

const display: { [name: string] : { provider: string, name: string, label: string }} = {
  'resource': { provider: 'FontAwesome', name: 'cube', label: 'Unmarked' },
  'equipment': { provider: "FontAwesome5", name: "stamp", label: 'Marked' }
}
function CategoryDescription(props: { name: string,
  deconstructNotEquipped: () => void, positioner: Positioner }) {
  const width = props.positioner.majorWidth - 5;
  return (
    <View style={StyleSheet.flatten([styles.rows,
      {marginLeft: 10, marginTop: 10, minWidth: width, maxWidth: width}])} >
      <IconComponent provider={display[props.name].provider} style={styles.headingIcon}
        name={display[props.name].name} color="#fff" size={20} />
      <View style={StyleSheet.flatten([styles.containerStretchRow,
        {justifyContent: 'space-between'}])}>
        <View>
          <Text style={styles.bareText}>
            {` ${display[props.name].label}`}
          </Text>
        </View>
        {props.name == 'equipment' && renderDeconstructButton()}
      </View>

    </View>
  );

  function renderDeconstructButton() {
    return (
      <TouchableOpacity
        style={StyleSheet.flatten([styles.buttonRowItemSmall])}
        onPress={() => { props.deconstructNotEquipped() }}>
        <Text style={styles.buttonTextSmall}>{`Deconstruct`}</Text>
      </TouchableOpacity>
    );
  }
}

interface UiItem {
  type: string;
  id: string;
  resource?: Resource;
  anEquipment?: Equipment;
}
