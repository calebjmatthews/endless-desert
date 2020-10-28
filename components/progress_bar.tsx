import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { styles } from '../styles';

export default function ProgressBarComponent(props: ProgressBarProps) {
  let percent = (props.progress + '%');
  let widthStyle = {width: percent};
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarWrapper}>
        <View style={StyleSheet.flatten([styles.progressBar, widthStyle])} />
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
