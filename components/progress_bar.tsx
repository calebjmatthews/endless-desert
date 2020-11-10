import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { styles } from '../styles';

const MAX_WIDTH = 262;

// When the duration is expected to change every tick (staticDuration == false),
//  only use the initially given props and ignore future updates
export default function ProgressBarComponent(props: ProgressBarProps) {
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarWrapper}>
        <Bar staticDuration={props.staticDuration}
          startingProgress={props.startingProgress}
          endingProgress={props.endingProgress}
          duration={props.duration} />
      </View>
      <View style={styles.progressBarLabel}>
        <Text>{props.label}</Text>
      </View>
    </View>
  );
}

function Bar(props: BarProps) {
  const initBarProps: BarProps = { startingProgress: 0, endingProgress: 0,
    duration: 0, starting: true };
  const [barProps, setBarProps] = useState(initBarProps);
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
    .Value(barProps.startingProgress * MAX_WIDTH)).current;

  useEffect(() => {
    Animated.timing(
      widthAnim, {
        toValue: (barProps.endingProgress * MAX_WIDTH),
        duration: barProps.duration,
        useNativeDriver: true }
    ).start();
  }, [barProps.endingProgress, widthAnim]);
  
  return (
    <Animated.View style={{...StyleSheet.flatten([styles.progressBar]),
      width: widthAnim}} />
  );
}

interface ProgressBarProps {
  startingProgress: number;
  endingProgress: number;
  duration: number;
  label: string;
  color?: string;
  staticDuration?: boolean;
  starting?: boolean;
}
interface BarProps {
  startingProgress: number;
  endingProgress: number;
  duration: number;
  color?: string;
  staticDuration?: boolean;
  starting?: boolean;
}
