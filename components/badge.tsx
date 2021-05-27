import React from 'react';
import { View, StyleSheet } from 'react-native';
import { styles } from '../styles';
import IconComponent from './icon';
import BadgeIconComponent from './badge_icon';
import SvgComponent from './svg';

import Icon from '../models/icon';

export default function BadgeComponent(props: BadgeProps) {
  if (props.icon) {
    if (props.icon.provider == 'svg') {
      let badgeStyle = getBadgeStyle(props.icon.size, props.icon.borderless,
        props.icon.quality);
      return (
        <View style={badgeStyle}>
          <SvgComponent icon={props.icon} />
        </View>
      );
    }
  }

  if (props.provider) {
    let name = props.name || '';
    let foregroundColor = props.foregroundColor
      || (props.icon ? props.icon.color : '#000');
    let backgroundColor = props.backgroundColor || '#fff';
    return <BadgeIconComponent provider={props.provider} name={name}
      foregroundColor={foregroundColor} backgroundColor={backgroundColor}
      iconSize={props.iconSize} borderless={props.borderless}
      quality={props.quality} />
  }

  return null;

  function getBadgeStyle(iconSize: number|undefined, borderless: boolean|undefined,
    quality: number|undefined) {
    let backgroundColor = props.backgroundColor;
    if (props.icon) { backgroundColor = props.icon.backgroundColor; }
    let badgeStyle: any = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      width: 30,
      margin: 5,
      backgroundColor: backgroundColor,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: '#071f56',
      borderRadius: 2
    };

    if (iconSize) {
      if (iconSize < 21) {
        badgeStyle.height = iconSize + 3;
        badgeStyle.width = iconSize + 3;
        badgeStyle.margin = 2;
      }
      else if (iconSize > 41) {
        badgeStyle.height = iconSize + 9;
        badgeStyle.width = iconSize + 9;
      }
      else if (iconSize > 21) {
        badgeStyle.height = iconSize + 6;
        badgeStyle.width = iconSize + 6;
      }
    }
    if (borderless) {
      badgeStyle.borderWidth = 0;
    }
    if (quality) {
      badgeStyle.borderStyle = 'outset';
      badgeStyle.borderWidth = 3;
      badgeStyle.borderColor = '#aecae0';
    }
    return badgeStyle;
  }
}

interface BadgeProps {
  icon?: Icon,
  provider?: string,
  name?: string,
  foregroundColor?: string,
  backgroundColor?: string,
  iconSize?: number|undefined,
  borderless?: boolean,
  quality?: number
}
