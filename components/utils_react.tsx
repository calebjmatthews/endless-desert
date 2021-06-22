import React from 'react';
import { Text, StyleSheet } from 'react-native';
const flat = StyleSheet.flatten;

import BadgeComponent from './badge';
import Icon from '../models/icon';
import { utils } from '../utils';

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
