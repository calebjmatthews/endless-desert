import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Provider, useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { createStore } from 'redux';
import { Text, View, Button, FlatList, TouchableOpacity, ScrollView }
  from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { selectTab } from '../actions/ui';

import HourglassComponent from '../components/hourglass';
import BuildingsComponent from '../components/buildings';
import ResourcesComponent from '../components/resources';
import ResearchesComponent from '../components/researches';
import ResearchingComponent from '../components/researching';
import ModalHandlerComponent from '../components/modal_handler';
import MessageBarComponent from '../components/message_bar';
import TradingComponent from '../components/trading';
import IconComponent from '../components/icon';
import StorageHandlerComponent from '../components/storage_handler';
import { styles } from '../styles';

export default function App() {
  const dispatch = useDispatch();
  const tabSelected = useTypedSelector(state => state.ui.tabSelected);
  const globalState = useTypedSelector(state => state.ui.globalState);
  const [dropdownExpanded, dropdownSet] = useState(false);

  if (globalState == 'loading') {
    return (
      <LinearGradient
        colors={["#0034aa", "#6a41b4", "#f58f7d"]}
        style={styles.mainContainer}>
        <StorageHandlerComponent />
        <StatusBar style="auto" />
        <View style={styles.statusBarSpacer}></View>
        <View style={styles.scrollWrapper}>
          <ScrollView contentContainerStyle={{flexGrow: 1, height: 473}}>
            <Text style={styles.bareText}>{'Loading...'}</Text>
          </ScrollView>
        </View>
        <MessageBarComponent />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#0034aa", "#6a41b4", "#f58f7d"]}
      style={styles.mainContainer}>
      <HourglassComponent />
      <ModalHandlerComponent />
      <StorageHandlerComponent />
      <StatusBar style="auto" />
      <View style={styles.statusBarSpacer}></View>
      <View style={styles.scrollWrapper}>
        <ScrollView contentContainerStyle={{flexGrow: 1, height: 473}}>
          {renderTab(tabSelected)}
        </ScrollView>
      </View>
      <MessageBarComponent />
      <View style={styles.buttonTabWrapper}>
        <TouchableOpacity style={styles.button}
          onPress={() => { dropdownSet(!dropdownExpanded) }} >
          <IconComponent provider="Entypo" name="menu" color="#fff" size={30} />
        </TouchableOpacity>
      </View>
      {renderDropdown(dropdownExpanded, dropdownPress)}
    </LinearGradient>
  );

  function renderDropdown(expanded: boolean, dropdownPress: Function) {
    if (expanded) {
      return (
        <FlatList
          style={styles.dropdownList}
          data={[
            {name: "Buildings", provider: "FontAwesome5", icon: "building"},
            {name: "Resources", provider: "FontAwesome", icon: "cube"},
            {name: "Researches", provider: "FontAwesome", icon: "book"},
            {name: "Trading", provider: "Entypo", icon: "address"}
          ]}
          renderItem={(item) => renderDropdownItem(item, dropdownPress)}
          keyExtractor={item => item.name}>
        </FlatList>
      );
    }
    return null;
  }

  function renderDropdownItem(itemData: any, dropdownPress: Function) {
    let i = itemData.item;
    return (
      <TouchableOpacity style={styles.dropdownListItem}
        onPress={() => dropdownPress(i.name)} >
        <IconComponent provider={i.provider} name={i.icon} color="#000" size={14} />
        <Text>{' ' + i.name}</Text>
      </TouchableOpacity>
    );
  }

  function dropdownPress(tabName: string) {
    dispatch(selectTab(tabName));
    dropdownSet(false);
  }

  function renderTab(tabName: string) {
    switch(tabName) {
      case "Buildings":
      return <BuildingsComponent />;
      case "Resources":
      return <ResourcesComponent />
      case "Researches":
      return <ResearchesComponent />
      case "Researching":
      return <ResearchingComponent />
      case "Trading":
      return <TradingComponent />
      default:
      return null;
    }
  }
}
