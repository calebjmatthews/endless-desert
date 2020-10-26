import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { styles } from '../styles';

export default function ProgressBarComponent(props: ProgressBarProps) {
  let percent = (Math.floor(props.numer/props.denom * 100).toString() + '%');
  let widthStyle = {width: percent};
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarWrapper}>
        <View style={StyleSheet.flatten([styles.progressBar, widthStyle])} />
      </View>
      <View style={styles.progressBarLabel}>
        <Text>
          {percent + ' (' + props.numer + '/' + props.denom + ')'}
        </Text>
      </View>
    </View>
  );
}

interface ProgressBarProps {
  numer: number;
  denom: number;
  color?: string;
}
