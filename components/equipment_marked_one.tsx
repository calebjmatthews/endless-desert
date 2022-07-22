import React, { useEffect, useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import EquipmentNameComponent from './equipment_name';
import EquipmentEffectComponent from './equipment_effect';
import ProgressBarComponent from './progress_bar';
import { displayModal } from '../actions/ui';
import { addEquipment } from '../actions/equipment';
import { clearEquipmentMarked } from '../actions/equipment_marked';
import { increaseResources, consumeResources } from '../actions/vault';

import Icon from '../models/icon';
import Resource from '../models/resource';
import { equipmentTypes } from '../instances/equipment_types';
import { utils } from '../utils';

export default function EquipmentMarkedOneComponent() {
  const dispatch = useDispatch();
  const equipment = useTypedSelector(state => state.equipmentMarked.equipment);
  const anEquipment = equipment[Object.keys(equipment)[0]];
  const equipmentType = equipmentTypes[anEquipment.typeName];
  const vault = useTypedSelector(state => state.vault);
  const positioner = useTypedSelector(state => state.ui.positioner);

  const [state, setState] = useState('init');
  const [timeouts, setTimeouts] = useState <NodeJS.Timeout[]> ([]);
  const [rfd, setRfd] = useState <Resource[]> ([]); // Resources from deconstruction

  useEffect(() => {
    timeouts.forEach((timeout) => clearTimeout(timeout));
  }, []);

  if (!anEquipment) { return null; }

  return (
    <View style={styles.modalContent}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="stamp"
          color="#fff" size={20} style={styles.headingIcon} />
        <Text style={styles.heading1}>{` Marked Equipment`}</Text>
      </View>
      
      <ScrollView contentContainerStyle={{display: 'flex', alignItems: 'center'}}>
        {(state !== 'deconstructed') && (
          <View style={[styles.panelFlexColumn, {alignItems: 'flex-start'}]}>
            <View style={styles.rows}>
              <BadgeComponent icon={new Icon({...equipmentType.icon, size: 38})} />
              <EquipmentNameComponent anEquipment={anEquipment} />
            </View>
            <View style={styles.columns}>
              {anEquipment.effects.map((anEffect, index) => (
                <EquipmentEffectComponent key={index} anEffect={anEffect} />
              ))}
            </View>
          </View>
        )}
        
        {(state === 'init' || state === 'confirmDeconstruct') && (
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
        {(rfd?.length > 0 && state === 'deconstructed') && (
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
        )}
        {(state === 'init' || state === 'confirmDeconstruct' || state === 'deconstructed') && (
          <TouchableOpacity style={[styles.buttonLarge, {alignSelf: 'center', marginTop: 5}]}
            onPress={() => nextPress()} >
            <IconComponent provider="FontAwesome" color="#fff" size={16} style={styles.headingIcon}
              name={state !== 'deconstructed' ? "arrow-down" : "arrow-right"} />
            <Text style={styles.buttonTextLarge}>
              {state !== 'deconstructed' ? ' Keep' : ' Next'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
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
      dispatch(consumeResources(vault, [new Resource({
        type: `${anEquipment.typeName} (U)`,
        quality: anEquipment.originalQuality,
        quantity: 1
      })]));

      const progressTimeout = setTimeout(() => {
        setState('deconstructed');
      }, 2500);
      setTimeouts([...timeouts, progressTimeout]);
    }
    else {
      setState('confirmDeconstruct');
    }
  }

  function nextPress() {
    if (state !== 'deconstructed') {
      dispatch(consumeResources(vault, [new Resource({
        type: `${anEquipment.typeName} (U)`,
        quality: anEquipment.originalQuality,
        quantity: 1
      })]));
      dispatch(addEquipment([anEquipment]));
    }
    dispatch(clearEquipmentMarked());
    dispatch(displayModal(null));
  }
}
