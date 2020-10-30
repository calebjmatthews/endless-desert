import React from 'react';
import { View, StyleSheet } from 'react-native';
import { styles } from '../styles';
import IconComponent from './icon';

export default function BadgeComponent(props: BadgeProps) {
  let badgeStyle = getBadgeStyle(props.iconSize, props.borderless);
  return (
    <View style={badgeStyle} >
      <IconComponent
        provider={props.provider}
        name={props.name}
        color={props.foregroundColor}
        size={props.iconSize} />
    </View>
  );

  function getBadgeStyle(iconSize: number|undefined, borderless: boolean|undefined) {
    let badgeStyle: any = {
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
    };

    if (iconSize) {
      if (iconSize < 18) {
        badgeStyle.height = 24;
        badgeStyle.width = 24;
        badgeStyle.margin = 2;
      }
    }
    if (borderless) {
      badgeStyle.borderWidth = 0;
    }
    return badgeStyle;
  }
}

interface BadgeProps {
  provider: string,
  name: string,
  foregroundColor: string,
  backgroundColor: string,
  iconSize: number|undefined,
  borderless?: boolean
}
