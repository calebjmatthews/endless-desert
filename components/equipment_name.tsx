import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';

import SvgComponent from './svg';

import Equipment from '../models/equipment';
import Icon from '../models/icon';
import { SVGS } from '../enums/svgs';

const tierData: { label: string, headingColor: string, color?: string, iconName?: string }[] = [
  { label: 'Basic', headingColor: '#555555' },
  { label: 'Notable', headingColor: '#a02c75', color: '#e9358b', iconName: SVGS.STAR },
  { label: 'Eminent', headingColor: '#ad6924', color: '#ff9812', iconName: SVGS.STARS_TWO },
  { label: 'Superior', headingColor: '#35654b', color: '#64c37d', iconName: SVGS.STARS_THREE },
  { label: 'Peerless', headingColor: '#448d9c', color: '#00d7df', iconName: SVGS.STARS_FOUR },
  { label: 'Transcendent', headingColor: '#6c319a', color: '#933ec5', iconName: SVGS.STARS_FIVE }
];

export default function EquipmentTierComponent(props: { anEquipment: Equipment }) {
  const { anEquipment } = props;
  const td = tierData[anEquipment.tier];
  return (
    <View style={styles.columns}>
      <Text style={{color: '#535353', fontSize: 12}}>{`Rarity: `}
        <Text style={{color: td.color}}>{td.label}</Text>
      </Text>
      <View style={styles.rows}>
        <Text style={[styles.heading2, {color: td.headingColor, fontWeight: '500'}]}>
          {`${anEquipment.typeName} `}
        </Text>
        {td.iconName && (
          <SvgComponent icon={new Icon({provider: 'svg', name: td.iconName, color: td.color, 
            secondaryColor: '#555', size: 25})} />
        )}
      </View>
    </View>
  );
}