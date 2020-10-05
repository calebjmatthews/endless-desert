import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BuildingsComponent from './components/buildings';
import ResourcesComponent from './components/resources';
import ResearchesComponent from './components/researches';
import { styles } from './styles';

import Hourglass from './models/hourglass';
import Vault from './models/vault';
import Resource from './models/resource';
import { buildingsStarting } from './instances/buildings_starting';
import { researches } from './instances/researches';

export default function App() {
  const [lastTimestamp, setLastTimestamp] = useState(new Date(Date.now()).valueOf());
  const [vault, setVault] = useState(new Vault({ resources: {} }));
  const [selectedTab, selectTab] = useState('Researches');
  let tab = <ResearchesComponent researches={researches} />;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const hourglass = new Hourglass();
      const results = hourglass.calculate(buildingsStarting, lastTimestamp);
      let newVault = new Vault(vault);
      Object.keys(results.productionSum).map((type) => {
        let quantity = results.productionSum[type];
        newVault.increaseResource(new Resource({ type, quantity }));
      });
      setVault(newVault);
      setLastTimestamp(new Date(Date.now()).valueOf());
    }, 100);
  }, [lastTimestamp]);

  useEffect(() => {
    switch(selectedTab) {
      case 'Buildings':
      tab = <BuildingsComponent buildings={buildingsStarting} />;
      case 'Resources':
      tab = <ResourcesComponent vault={vault} />
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
