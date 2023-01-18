import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { styles } from '../../styles';

import SvgComponent from '../svg';

import Resource from '../../models/resource';
import Icon from '../../models/icon';
import { resourceTypes } from '../../instances/resource_types'; 
import { utils } from '../../utils';
import { DROMEDARY_ICON_SPEED } from '../../constants';

export default function DromedaryProgressIcons(props: {
  dromedaries: { [typeQuality: string] : Resource },
  paused: boolean
}) {
  const { dromedaries, paused } = props;

  // Round up for each dromedary kind, round down for the remaining
  // so that the total number of icons is correct.
  // E.g. One hill, eleven riverine, thirty four plains =>
  // No hill icons, one riverine icon, three plains icons
  const icons: Icon[] = [];
  const dromedaryArray: Resource[] = [];
  let dromedaryCount: number = 0;
  Object.keys(dromedaries).forEach((typeQuality) => {
    const dromedary = dromedaries[typeQuality];
    dromedaryArray.push(dromedary);
    dromedaryCount += dromedary.quantity;
  });
  dromedaryArray.sort((a, b) => (b.quantity -  a.quantity));
  let iconsRemaining = Math.floor(dromedaryCount / 10) || 1;
  dromedaryArray.forEach((dromedary) => {
    const resourceType = resourceTypes[dromedary.type];
    utils.range(0, Math.floor(dromedary.quantity / 10)).forEach(() => {
      if (iconsRemaining > 0) {
        icons.unshift(resourceType.icon);
        iconsRemaining--;
      }
    });
  });

  return (
    <View style={styles.rows}>
      {(!paused) && icons.map((icon, index) => (
        <AnimatedDromedaryIcon key={index} index={index} icon={icon} />)
      )}
      {(paused) && icons.map((icon, index) => (
        <SvgComponent key={index} icon={icon} />
      ))}
    </View>
  )
}

function AnimatedDromedaryIcon(props: { icon: Icon, index: number }) {
  const { icon, index } = props;
  const yAnim = useRef(new Animated.Value(0)).current;

  const moveDown = () => {
    Animated.timing(yAnim,
      { toValue: 5, duration: DROMEDARY_ICON_SPEED, useNativeDriver: true }
    ).start(moveUp);
  }

  const moveUp = () => {
    Animated.timing(yAnim,
      { toValue: -5, duration: DROMEDARY_ICON_SPEED, useNativeDriver: true }
    ).start(moveDown);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      moveDown()
    }, ((DROMEDARY_ICON_SPEED / 4) * index));
    
    return (() => clearTimeout(timeout));
  }, []);

  return (
    <Animated.View style={{ transform: [{translateY: yAnim}] }} >
      <SvgComponent icon={icon} />
    </Animated.View>
  ) 
}