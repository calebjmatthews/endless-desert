import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { createStore } from 'redux';
import { StyleSheet, Text, View } from 'react-native';

import rootReducer from './reducers';
const store = createStore(rootReducer);
import BuildingsComponent from './components/buildings';
import ResourcesComponent from './components/resources';
import ResearchesComponent from './components/researches';
import { styles } from './styles';

import Hourglass from './models/hourglass';
import Vault from './models/vault';
import Resource from './models/resource';
import { buildingsStarting } from './instances/buildings';
import { researchStatusStarting } from './instances/research_status';
import { vaultStarting } from './instances/vault';

export default function App() {
  const [lastTimestamp, setLastTimestamp] = useState(new Date(Date.now()).valueOf());
  const [vault, setVault] = useState(vaultStarting);
  const [selectedTab, selectTab] = useState('Researches');
  let tab = <ResearchesComponent />;

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
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.statusBarSpacer}></View>
        {tab}
      </View>
    </Provider>
  );
}
