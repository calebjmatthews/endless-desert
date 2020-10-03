import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Buildings from './components/buildings';
import { styles } from './styles';

import Hourglass from './models/hourglass';
import { buildingsStarting } from './instances/buildings_starting';

export default function App() {
  const [lastTimestamp, setLastTimestamp] = useState(new Date(Date.now()).valueOf());
  useEffect(() => {
    const timeout = setTimeout(() => {
      const hourglass = new Hourglass();
      const results = hourglass.calculate(buildingsStarting, lastTimestamp);
      setLastTimestamp(new Date(Date.now()).valueOf());
    }, 100);
  }, [lastTimestamp]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.statusBarSpacer}></View>
      <Buildings />
    </View>
  );
}
