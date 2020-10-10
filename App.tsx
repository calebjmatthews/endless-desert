import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { createStore } from 'redux';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity }
  from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import IconEntypo from 'react-native-vector-icons/Entypo';

import rootReducer from './reducers';
const store = createStore(rootReducer);
import HourglassComponent from './components/hourglass';
import BuildingsComponent from './components/buildings';
import ResourcesComponent from './components/resources';
import ResearchesComponent from './components/researches';
import IconComponent from './components/icon';
import { styles } from './styles';

import { buildingsStarting } from './instances/buildings';

export default function App() {
  const [selectedTab, selectTab] = useState("Resources");
  const [dropdownExpanded, dropdownSet] = useState(false);

  function renderDropdown(expanded: boolean, dropdownPress: Function) {
    if (expanded) {
      return (
        <FlatList
          style={styles.dropdownList}
          data={["Buildings", "Resources", "Researches"]}
          renderItem={(item) => renderDropdownItem(item, dropdownPress)}
          keyExtractor={item => item}>
        </FlatList>
      );
    }
    return null;
  }

  function renderDropdownItem(itemData: any, dropdownPress: Function) {
    return (
      <TouchableOpacity style={styles.dropdownListItem}
        onPress={() => dropdownPress(itemData.item)} >
        <Text>{itemData.item}</Text>
      </TouchableOpacity>
    );
  }

  function dropdownPress(tabName: string) {
    selectTab(tabName);
    dropdownSet(false);
  }

  function renderTab(tabName: string) {
    switch(tabName) {
      case "Buildings":
      return <BuildingsComponent buildings={buildingsStarting} />;
      case "Resources":
      return <ResourcesComponent />
      case "Researches":
      return <ResearchesComponent />
      default:
      return null;
    }
  }

  return (
    <Provider store={store}>
      <LinearGradient
        colors={["#f58f7d", "#6a41b4", "#0034aa"]}
        style={styles.container}>
        <HourglassComponent />
        <StatusBar style="auto" />
        <View style={styles.statusBarSpacer}></View>
        {renderTab(selectedTab)}
        <View style={styles.buttonTabWrapper}>
          <TouchableOpacity style={styles.button}
            onPress={() => { dropdownSet(!dropdownExpanded) }} >
            <IconComponent provider="Entypo" name="menu" color="#fff" size={30} />
          </TouchableOpacity>
        </View>
        {renderDropdown(dropdownExpanded, dropdownPress)}
      </LinearGradient>
    </Provider>
  );
}
