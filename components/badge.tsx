import React from 'react';
import { View, StyleSheet } from 'react-native';
import { styles } from '../styles';
import IconComponent from './icon';

export default function BadgeComponent(props: BadgeProps) {
  let style = getBadgeStyle(props.iconSize);
  return (
    <View style={style.badge} >
      <IconComponent
        provider={props.provider}
        name={props.name}
        color={props.foregroundColor}
        size={props.iconSize} />
    </View>
  );

  function getBadgeStyle(iconSize: number|undefined) {
    if (iconSize) {
      if (iconSize < 18) {
        return StyleSheet.create({
          badge: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 24,
            width: 24,
            margin: 2,
            backgroundColor: props.backgroundColor,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#071f56',
            borderRadius: 2
        }});

      }
    }
    return StyleSheet.create({
      badge: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        margin: 5,
        backgroundColor: props.backgroundColor,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#071f56',
        borderRadius: 2
    }});
  }
}

interface BadgeProps {
  provider: string,
  name: string,
  foregroundColor: string,
  backgroundColor: string,
  iconSize: number|undefined
}
