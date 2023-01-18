import React, { useEffect, useRef, useState } from 'react';
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
        <AnimatedDromedaryIcon key={index} icon={icon} index={index} count={icons.length} />)
      )}
      {(paused) && icons.map((icon, index) => (
        <SvgComponent key={index} icon={icon} />
      ))}
    </View>
  )
}

function AnimatedDromedaryIcon(props: { icon: Icon, index: number, count: number }) {
  const { icon, index, count } = props;
  const yAnim = useRef(new Animated.Value(0)).current;
  const [intervals, setIntervals] = useState<NodeJS.Timer[]>([]);

  const moveDown = () => {
    Animated.timing(yAnim,
      { toValue: 3, duration: DROMEDARY_ICON_SPEED, useNativeDriver: true }
    ).start();
  }
  const startMovingDown = () => {
    moveDown();
    const interval = setInterval(() => moveDown(), (DROMEDARY_ICON_SPEED * 2));
    setIntervals([...intervals, interval]);
  }

  const moveUp = () => {
    Animated.timing(yAnim,
      { toValue: -3, duration: DROMEDARY_ICON_SPEED, useNativeDriver: true }
    ).start();
  }
  const startMovingUp = () => {
    moveUp();
    const interval = setInterval(() => moveUp(), (DROMEDARY_ICON_SPEED * 2));
    setIntervals([...intervals, interval]);
  }

  useEffect(() => {
    const timeoutDown = setTimeout(() => {
      startMovingDown()
    }, ((DROMEDARY_ICON_SPEED / 4) * (count-1 - index)));
    const timeoutUp = setTimeout(() => {
      startMovingUp()
    }, ((DROMEDARY_ICON_SPEED / 4) * (count-1 - index) + (DROMEDARY_ICON_SPEED)));
    
    return (() => {
      clearTimeout(timeoutDown);
      clearTimeout(timeoutUp);
      intervals.forEach((interval) => clearInterval(interval));
    });
  }, []);

  return (
    <Animated.View style={{ transform: [{translateY: yAnim}] }} >
      <SvgComponent icon={icon} />
    </Animated.View>
  ) 
}