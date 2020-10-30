import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { styles } from '../styles';

const MAX_WIDTH = 262;

export default function ProgressBarComponent(props: ProgressBarProps) {
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarWrapper}>
        <Bar startingProgress={props.startingProgress}
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
  const widthAnim = useRef(new Animated
    .Value(props.startingProgress * MAX_WIDTH)).current;

  useEffect(() => {
    Animated.timing(
      widthAnim, {
        toValue: (props.endingProgress * MAX_WIDTH),
        duration: props.duration,
        useNativeDriver: true }
    ).start();
  }, [props.endingProgress, widthAnim]);

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
}
interface BarProps {
  startingProgress: number;
  endingProgress: number;
  duration: number;
  color?: string;
}
