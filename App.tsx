import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BuildingsComponent from './components/buildings';
import { styles } from './styles';

import Hourglass from './models/hourglass';
import { buildingsStarting } from './instances/buildings_starting';

export default function App() {
  const [lastTimestamp, setLastTimestamp] = useState(new Date(Date.now()).valueOf());
  const [selectedTab, selectTab] = useState('Buildings');
  let tab = <BuildingsComponent buildings={buildingsStarting} />;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const hourglass = new Hourglass();
      const results = hourglass.calculate(buildingsStarting, lastTimestamp);
      setLastTimestamp(new Date(Date.now()).valueOf());
    }, 100);
  }, [lastTimestamp]);

  useEffect(() => {
    switch(selectedTab) {
      case 'Buildings':
      tab = <BuildingsComponent buildings={buildingsStarting} />;
      break;
    }
  }, [selectedTab])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.statusBarSpacer}></View>
      {tab}
    </View>
  );
}
