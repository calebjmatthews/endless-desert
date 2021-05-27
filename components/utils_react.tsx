import React from 'react';
import { Text, StyleSheet } from 'react-native';
const flat = StyleSheet.flatten;

import BadgeComponent from './badge';
import Icon from '../models/icon';
import { utils } from '../utils';

export function renderBadge(objWithIcon: ObjWithIconProps,
  quality: number = 0, size?: number) {
  if (objWithIcon.icon.provider == 'svg') {
    if (size) {
      objWithIcon.icon = new Icon(Object.assign(objWithIcon.icon, { size }));
    }
    return (
      <BadgeComponent icon={objWithIcon.icon} />
    );
  }
  return (
    <BadgeComponent
      provider={objWithIcon.icon.provider}
      name={objWithIcon.icon.name}
      foregroundColor={objWithIcon.foregroundColor
        || (objWithIcon.icon ? objWithIcon.icon.color : '#000')}
      backgroundColor={objWithIcon.backgroundColor || '#fff'}
      iconSize={18}
      quality={quality} />
  );
}
interface ObjWithIconProps {
  icon: Icon,
  foregroundColor?: string,
  backgroundColor?: string
}

export function renderValue(value: number, size: number, style: any) {
  const fValue = utils.formatNumberShort(value);
  const wSize = Math.round(size * 0.8);
  return (
    <>
      <Text style={flat([style, {fontSize: wSize, alignSelf: 'flex-start',
        lineHeight: wSize}])}>
        {'ש'}</Text>
      <Text style={flat([style, {fontSize: size}])}>{fValue}</Text>
    </>
  )
}
