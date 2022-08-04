import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import EquipmentEffectComponent from './equipment_effect';

import EquipmentEffect from '../models/equipment_effect';
import Icon from '../models/icon';

export default function TreasureEffects(props: {equipmentEffects?: EquipmentEffect[],
  otherEffects?: { icon: Icon, label: string }[], hideEffectsLabel?: boolean}) {
  const { equipmentEffects, otherEffects, hideEffectsLabel } = props;
  if (!equipmentEffects && !otherEffects) { return null; }
  return (
    <View style={styles.columns}>
      {!hideEffectsLabel && (
        <Text style={styles.bareText}>{`Effects:`}</Text>
      )}
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