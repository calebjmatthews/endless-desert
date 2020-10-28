import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { styles } from '../styles';

const MAX_WIDTH = 262;

export default function ProgressBarComponent(props: ProgressBarProps) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      widthAnim, { toValue: MAX_WIDTH, duration: 1000, useNativeDriver: false }
    ).start();
  }, [widthAnim])

  let percent = (props.progress + '%');
  let widthStyle = {width: percent};
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarWrapper}>
        <Animated.View style={{...StyleSheet.flatten([styles.progressBar]),
          width: widthAnim}} />
      </View>
      <View style={styles.progressBarLabel}>
        <Text>{props.label}</Text>
      </View>
    </View>
  );
}

interface ProgressBarProps {
  progress: number;
  label: string;
  color?: string;
}
