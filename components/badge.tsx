import React from 'react';
import { View } from 'react-native';
import IconComponent from './icon';
import BadgeIconComponent from './badge_icon';
import SvgComponent from './svg';

import Icon from '../models/icon';

export default function BadgeComponent(props: BadgeProps) {
  if (props.icon) {
    let icon = new Icon({...props.icon});
    if (props.size) {
      icon.size = props.size;
      icon.width = `${props.size}px`;
      icon.height = `${props.size}px`;
    }
    if (props.quality) { icon.quality = props.quality; }
    if (props.borderless) { icon.borderless = props.borderless; }
    let badgeStyle = getBadgeStyle(icon.size,
      icon.borderless, props.marginless, icon.quality);
    if (icon.provider == 'svg') {
      return (
        <View style={badgeStyle}>
          <SvgComponent icon={icon} />
        </View>
      );
    }
    else {
      let size = icon.size;
      if (size > 28) {
        size -= 4;
      }
      else if (size > 21) {
        size -= 2;
      }

      return (
        <View style={badgeStyle}>
          <IconComponent provider={props.icon.provider} name={props.icon.name}
            color={props.icon.color} size={size} />
        </View>
      );
    }
  }

  if (props.provider) {
    let name = props.name || '';
    let foregroundColor = props.foregroundColor || '#000';
    let backgroundColor = props.backgroundColor || '#fff';
    return <BadgeIconComponent provider={props.provider} name={name}
      foregroundColor={foregroundColor} backgroundColor={backgroundColor}
      size={props.size} borderless={props.borderless}
      quality={props.quality} />
  }

  return null;

  function getBadgeStyle(rawSize: number|undefined, borderless: boolean|undefined,
    marginless: boolean|undefined, quality: number|undefined) {
    let size = rawSize || 20;
    let backgroundColor = '#fff';
    if (props.backgroundColor) { backgroundColor = props.backgroundColor; }
    if (props.icon?.backgroundColor) { backgroundColor = props.icon.backgroundColor; }
    const margin = marginless ? 0 : 5;
    let badgeStyle: any = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      width: 30,
      margin: margin,
      backgroundColor: backgroundColor,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#737f9c',
      borderRadius: 2
    };

    if (quality) {
      badgeStyle.borderStyle = 'outset';
      badgeStyle.borderWidth = 2;
      badgeStyle.borderColor = '#aecae0';

      size += 2;
    }

    if (size) {
      if (size < 21) {
        badgeStyle.height = size + 4;
        badgeStyle.width = size + 4;
        badgeStyle.margin = 2;
      }
      else if (size > 41) {
        badgeStyle.height = size + 9;
        badgeStyle.width = size + 9;
      }
      else if (size > 21) {
        badgeStyle.height = size + 6;
        badgeStyle.width = size + 6;
      }
    }
    if (borderless) {
      // badgeStyle.borderWidth = 0;
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
  size?: number|undefined,
  borderless?: boolean,
  marginless?: boolean,
  quality?: number
}
