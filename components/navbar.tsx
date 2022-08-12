import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import { selectTab, addMemos } from '../actions/ui';
import { increaseResources } from '../actions/vault';
import { addBuilding } from '../actions/buildings';
import IconComponent from './icon';

import Tab from '../models/tab';
import Memo from '../models/memo';
import Resource from '../models/resource';
import Building from '../models/building';
import { tabs } from '../instances/tabs';
import { resourceTypes } from '../instances/resource_types';
import { buildingTypes } from '../instances/building_types';
import { tradingPartnerTypes } from '../instances/trading_partner_types';
import { utils } from '../utils';
import { CONVERSATIONS } from '../enums/conversations';
import { FORTUITIES } from '../enums/fortuities';
import { TRADING_PARTNERS } from '../enums/trading_partners';

export default function  NavbarComponent() {
  const dispatch = useDispatch();
  const tabsUnloked = useTypedSelector(state => state.account.tabsUnloked);
  const tabSelected = useTypedSelector(state => state.ui.tabSelected);
  const tradingPartners = useTypedSelector(state => state.tradingStatus.tradingPartners);

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
    if (tabName === 'debug') {
      const tradingPartnerType = tradingPartnerTypes[TRADING_PARTNERS.TREFOIL_ISLANDS];
      const visit = tradingPartnerType.createTradingPartnerVisit(tradingPartners[TRADING_PARTNERS.TREFOIL_ISLANDS]);
      console.log('visit.trades', visit.trades);
    }
    else {
      dispatch(selectTab(tabName));
    }
  }
}
