import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';

import SvgComponent from './svg';

import Equipment from '../models/equipment';
import Icon from '../models/icon';
import { SVGS } from '../enums/svgs';
import { EQUIPMENT_TIER_DATA } from '../constants';

export default function EquipmentNameComponent(props: {anEquipment: Equipment,
  size?: 'large'|'medium'|'small', altColor?: boolean, suffix?: string}) {
  const { anEquipment, suffix } = props;
  const size = props.size || 'large';
  const altColor = props.altColor || false;
  const td = EQUIPMENT_TIER_DATA[anEquipment.tier];

  let nameStyle: any[] = (size === 'large') ? [styles.heading2, {color: td.headingColor, 
    fontWeight: '500'}] : [{color: td.headingColor}];
  if (altColor) { nameStyle.push({color: (td.altColor || td.color)}); }
  if (size === 'small') { nameStyle.push({fontSize: 12}); }
  const starSize = (size === 'large') ? 25 : 16;
  const suffixStyle = { fontSize: (size === 'small') ? 12 : 14 };

  return (
    <View style={styles.columns}>
      {size === 'large' && (
        <Text style={{color: (!altColor ? '#535353' : '#ddd'), fontSize: 12}}>{`Rarity: `}
          <Text style={{color: (!altColor ? td.color : (td.altColor || td.color))}}>{td.label}</Text>
        </Text>
      )}
      <View style={styles.rows}>
        <Text style={nameStyle}>
          {size === 'small' && (
            <Text>{` `}</Text>
          )}
          {`${anEquipment.typeName} `}
        </Text>
        {td.iconName && (
          <>
            <SvgComponent icon={new Icon({provider: 'svg', name: td.iconName, color: td.color, 
              secondaryColor: '#555', size: starSize})} />
            <Text>{` `}</Text>
          </>
        )}
        {suffix && (
          <Text style={suffixStyle}>{suffix}</Text>
        )}
      </View>
    </View>
  );
}

class EquipmentNameComponentProps {
  anEquipment: Equipment;
  size: 'large'|'medium'|'small';

  constructor(equipmentNameComponentProps: { anEquipment: Equipment; size?: 'large'|'medium'; }) {
    this.anEquipment = equipmentNameComponentProps.anEquipment;
    this.size = equipmentNameComponentProps.size || 'large';
  }
}