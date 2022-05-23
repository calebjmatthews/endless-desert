import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import { selectTab } from '../actions/ui';
import IconComponent from './icon';

import Tab from '../models/tab';
import { tabs } from '../instances/tabs';
import { utils } from '../utils';

export default function  NavbarComponent() {
  const dispatch = useDispatch();
  const tabsUnloked = useTypedSelector(state => state.account.tabsUnloked);
  const tabSelected = useTypedSelector(state => state.ui.tabSelected);

  let tabsArray = Object.keys(tabs).map((tabName) => {
    return tabs[tabName];
  });
  tabsArray = tabsArray.filter((tab) => {
    if (utils.arrayIncludes(tabsUnloked, tab.name)) {
      return tab;
    }
  });
  tabsArray = [new Tab({
    name: 'debug',
    order: -2,
    icon: {provider: 'FontAwesome5', name: 'bug'},
    settings: []
  }), ...tabsArray];

  return (
    <>
      <View style={styles.tabsWrapper}>
        {tabsArray.map((tab) => (
          <TouchableOpacity key={tab.name} style={[styles.tab,
            (tabSelected === tab.name) ? {backgroundColor: '#2237ac'} : null]}
            onPress={() => dropdownPress(tab.name)} >
            <IconComponent provider={tab.icon.provider} name={tab.icon.name}
              color="#fff" size={14} />
          </TouchableOpacity>
        ))}
      </View>
    </>
  )

  function dropdownPress(tabName: string) {
    dispatch(selectTab(tabName));
  }
}
