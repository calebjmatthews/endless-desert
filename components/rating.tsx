import React from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';

import Icon from '../models/icon';
import { utils } from '../utils';

// When the duration is expected to change every tick (staticDuration == false),
//  only use the initially given props and ignore future updates
export default function RatingComponent(props: RatingComponentProps) {
  return (
    <View style={StyleSheet.flatten([styles.spacedRows,
      {height: props.emptyIcon.size, width: props.width}])}>
      <RatingIcons
        iconCount={props.iconCount}
        icon={props.emptyIcon}
        width={props.width} />
      <RatingIcons
        iconCount={props.iconCount}
        icon={props.filledIcon}
        width={(props.numerator / props.denominator) * props.width} />
    </View>
  );
}

function RatingIcons(props: RatingIconProps) {
  return (
    <View style={StyleSheet.flatten([styles.rows, styles.ratingRow,
      {width: props.width}])}>
      {utils.range(1, props.iconCount).map((index) => {
        return (
          <IconComponent key={index} name={props.icon.name} color={props.icon.color}
            size={props.icon.size} provider={props.icon.provider} />
        );
      })}
    </View>
  );
}

interface RatingComponentProps {
  numerator: number;
  denominator: number;
  iconCount: number;
  emptyIcon: Icon;
  filledIcon: Icon;
  width: number;
}

interface RatingIconProps {
  iconCount: number;
  icon: Icon;
  width: number;
}
