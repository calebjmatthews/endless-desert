import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { createStore } from 'redux';
import { StyleSheet, Text, View } from 'react-native';

import rootReducer from './reducers';
const store = createStore(rootReducer);
import HourglassComponent from './components/hourglass';
import BuildingsComponent from './components/buildings';
import ResourcesComponent from './components/resources';
import ResearchesComponent from './components/researches';
import { styles } from './styles';

import { buildingsStarting } from './instances/buildings';

export default function App() {
  const [selectedTab, selectTab] = useState('Resources');
  let tab = <ResourcesComponent />;

  useEffect(() => {
    switch(selectedTab) {
      case 'Buildings':
      tab = <BuildingsComponent buildings={buildingsStarting} />;
      case 'Resources':
      tab = <ResourcesComponent />
      break;
    }
  }, [selectedTab])

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <HourglassComponent />
        <StatusBar style="auto" />
        <View style={styles.statusBarSpacer}></View>
        {tab}
      </View>
    </Provider>
  );
}
