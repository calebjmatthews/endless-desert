import React, { useState, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
const flat = StyleSheet.flatten;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import EquipmentNameComponent from './equipment_name';
import EquipmentEffectComponent from './equipment_effect';
import ProgressBarComponent from './progress_bar';
import { increaseResources } from '../actions/vault';
import { removeEquipment } from '../actions/equipment';
import { DON_EQUIPMENT } from '../actions/leaders';
import { displayModalValue } from '../actions/ui';

import Resource from '../models/resource';
import Equipment from '../models/equipment';
import Leader from '../models/leader';
import Icon from '../models/icon';
import { resourceTypes } from '../instances/resource_types';
import { resourceTags } from '../instances/resource_tags';
import { equipmentTypes } from '../instances/equipment_types';
import { utils } from '../utils';
import { MODALS } from '../enums/modals';

export default function EquipmentDetailComponent() {
  const dispatch = useDispatch();
  const anEquipment: Equipment = useTypedSelector(state => state.ui.modalValue);
  const vault = useTypedSelector(state => state.vault);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const leaders = useTypedSelector(state => state.leaders);

  const equipmentType = equipmentTypes[anEquipment.typeName];
  const resourceType = resourceTypes[`${anEquipment.typeName} (U)`];
  const slotTag = resourceTags[resourceType.tags[resourceType.tags.length-1]];

  const [state, setState] = useState('clean');
  const [timeouts, setTimeouts] = useState <NodeJS.Timeout[]> ([]);
  const [rfd, setRfd] = useState <Resource[]> ([]); // Resources from deconstruction
  const [leader, setLeader] = useState <Leader|null> (null);

  useEffect(() => {
    if (state === 'clean') {
      setState('initializing');
      Object.keys(leaders).forEach((id) => {
        const leader = leaders[id];
        if (leader.toolEquipped === anEquipment.id || leader.clothingEquipped === anEquipment.id
            || leader.backEquipped === anEquipment.id) { setLeader(leader); }
      });
      setState('initialized');
    }
  }, [state, anEquipment, leaders])

  if (rfd?.length > 0 && state === 'deconstructed') {
    return <ResourcesFromDeconstruction anEquipment={anEquipment} rfd={rfd} />;
  }

  return (
    <View style={styles.modalContent}>
      <View style={styles.headingWrapper}>
        <BadgeComponent icon={equipmentType.icon} size={55} />
        <EquipmentNameComponent anEquipment={anEquipment} size='large' altColor />
      </View>
      <View style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
        <View style={styles.centeredRows}>
          <IconComponent provider={slotTag.icon.provider}
            name={slotTag.icon.name} color={slotTag.icon.color}
            size={19} style={styles.bareText} />
          <Text style={styles.bareText}>
            {' ' + slotTag.name}
          </Text>
        </View>
        <View style={flat([styles.descriptionBand,
          {minWidth: positioner.modalWidth, maxWidth: positioner.modalWidth}])}>
          <Text style={styles.descriptionBandText}>
            {equipmentType.description || 'A mysterious Equipment'}
          </Text>
        </View>
        <View style={styles.equipmentDetailEffects}>
          {anEquipment.effects.map((anEffect, index) => (
            <EquipmentEffectComponent key={`equip-${index}`} anEffect={anEffect} />
          ))}
        </View>
        <View style={styles.break} />
        <TouchableOpacity style={[styles.buttonMedium, styles.buttonLight, { opacity: 0.9 }]}
            onPress={() => leaderPress()}>
            {leader && <BadgeComponent icon={leader.icon} size={28} />}
            {!leader && <BadgeComponent icon={new Icon({ provider: 'FontAwesome5',
              name: 'minus-circle', color: '#cec3e4' })} size={28} />}
            {leader && <Text>{` Equipped by: ${leader.name} `}</Text>}
            {!leader && <Text>{` Equip on a leader `}</Text>}
          </TouchableOpacity>
        {(!leader && (state === 'initialized' || state === 'confirmDeconstruct')) && (
          <TouchableOpacity style={[styles.buttonMedium, styles.buttonAway,
            {alignSelf: 'center', marginTop: 10}]} onPress={() => deconstructPress()} >
            <IconComponent provider="FontAwesome5" name="bomb" color="#fff" size={12}
              style={styles.headingIcon} />
            <Text style={styles.buttonText}>
              {state === 'confirmDeconstruct' ? ' Really Deconstruct?' : ' Deconstruct'}
            </Text>
          </TouchableOpacity>
        )}
        {(state === 'deconstructing') && (
          <View style={{marginTop: 10}}>
            <ProgressBarComponent startingProgress={0}
              width={positioner.majorWidth - positioner.minorPadding}
              endingProgress={1} duration={2000}
              labelStyle={styles.bareText}
              color={'#9e3733'}
              label={'Deconstructing...'} />
          </View>
        )}
        <View style={styles.break} />
      </View>
    </View>
  );

  function deconstructPress() {
    if (state === 'confirmDeconstruct') {
      setState('deconstructing');

      const rti: Resource[] = [];
      if (equipmentType.recipeConsumes) {
        equipmentType.recipeConsumes.forEach((resource) => {
          rti.push(new Resource({ ...resource, quantity: (resource.quantity * 0.1), quality: 0 }));
        });
        dispatch(increaseResources(vault, rti));
      }
      setRfd(rti);
      dispatch(removeEquipment([anEquipment]));

      const progressTimeout = setTimeout(() => {
        setState('deconstructed');
      }, 2500);
      setTimeouts([...timeouts, progressTimeout]);
    }
    else {
      setState('confirmDeconstruct');
    }
  }

  function leaderPress() {
    dispatch(displayModalValue(MODALS.LEADER_SELECT, 'open', { subType: DON_EQUIPMENT, anEquipment }));
  }
}

function ResourcesFromDeconstruction(props: { anEquipment: Equipment, rfd: Resource[] }) {
  const { anEquipment, rfd } = props;
  const equipmentType = equipmentTypes[anEquipment.typeName];
  return (
    <View style={styles.modalContent}>
      <View style={styles.headingWrapper}>
        <BadgeComponent icon={equipmentType.icon} size={55} />
        <Text style={styles.heading1}>{` Equipment Deconstructed`}</Text>
      </View>
      <View style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
        <View style={styles.panelFlexColumn}>
          <Text style={styles.bodyText}>
            {`Taking the ${anEquipment.typeName} apart yielded:`}
          </Text>
          {rfd.map((resource, index) => {
            const resourceType = utils.getResourceType(resource);
            if (Math.floor(resource.quantity) === 0) { return null; }
            return (
              <View key={index} style={styles.containerStretchRow}>
                <BadgeComponent icon={resourceType.icon} size={21} />
                <Text style={styles.bodyText}>
                  {` +${utils.formatNumberShort(resource.quantity)} ${utils.getResourceName(resource)}`}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  )
}