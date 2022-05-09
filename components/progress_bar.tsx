import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { styles } from '../styles';

const DEFAULT_WIDTH = 262;

// When the duration is expected to change every tick (staticDuration == false),
//  only use the initially given props and ignore future updates
export default function ProgressBarComponent(props: ProgressBarProps) {
  let labelStyle = {};
  if (props.labelStyle) { labelStyle = props.labelStyle; }
  const maxWidth = (props.width || DEFAULT_WIDTH);

  return (
    <View style={styles.progressBarContainer}>
      <View style={StyleSheet.flatten([styles.progressBarWrapper,
        { minWidth: maxWidth, maxWidth: maxWidth }])}>
        <Bar staticDuration={props.staticDuration} width={props.width}
          startingProgress={props.startingProgress}
          endingProgress={props.endingProgress} duration={props.duration}
          color={props.color} labelStyle={props.labelStyle} />
      </View>
      <View style={styles.progressBarLabel}>
        <Text style={labelStyle}>{props.label}</Text>
      </View>
    </View>
  );
}

function Bar(props: BarProps) {
  const [barProps, setBarProps] = useState(props);
  useEffect(() => {
    let staticDuration = false;
    if (props.staticDuration != undefined) { staticDuration = props.staticDuration; }
    if (staticDuration) {
      if (barProps.starting == true) {
        setBarProps(props);
      }
    }
    else {
      setBarProps(props);
    }
  }, [props]);

  const widthAnim = useRef(new Animated
    .Value(barProps.startingProgress*2/100)).current;

  const maxWidth = props.width ? props.width - 4 : DEFAULT_WIDTH;

  useEffect(() => {
    Animated.timing(
      widthAnim, {
        toValue: (barProps.endingProgress * 2),
        duration: barProps.duration,
        useNativeDriver: true }
    ).start();
  }, [barProps.endingProgress, widthAnim]);

  let color = '#071f56';
  if (props.color) { color = props.color; }

  return (
    <Animated.View style={StyleSheet.flatten([styles.progressBar,
      {minWidth: maxWidth, maxWidth: maxWidth, backgroundColor: color,
        marginLeft: (-0.5 * maxWidth), transform: [{ scaleX: widthAnim }] }])} />
  );
}

interface ProgressBarProps {
  startingProgress: number;
  endingProgress: number;
  duration: number;
  label: string;
  width?: number;
  color?: string;
  labelStyle?: any;
  staticDuration?: boolean;
  starting?: boolean;
}
interface BarProps {
  startingProgress: number;
  endingProgress: number;
  duration: number;
  width?: number;
  color?: string;
  labelStyle?: any;
  staticDuration?: boolean;
  starting?: boolean;
}
