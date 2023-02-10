import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

import SvgComponent from './svg';

import Icon from '../models/icon';
import { SVGS } from '../enums/svgs';

export default function EpauletteComponent(props: EpauletteProps) {
  const icon = new Icon({provider: 'svg', name: SVGS.EPAULETTE, color: props.color});
  return (
    <View style={[styles.container, {width: 32}]}>
      <View style={{position: 'absolute', opacity: props.bgOpacity}}>
        <SvgComponent icon={icon} />
      </View>
      <Text style={styles.epauletteText}>{props.text}</Text>
    </View>
  )
}

interface EpauletteProps {
  color: string;
  text: string;
  bgOpacity: number;
}
