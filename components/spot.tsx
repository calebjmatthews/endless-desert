import React, { useState, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import BuildComponent from './build';
import { BuildingSelectContents } from './building_select';

import { utils } from '../utils';

export default function SpotComponent() {
  const [tabSelected, setTabSelected] = useState('Build');
  return (
    <View style={styles.container}>
      <View style={styles.tabsWrapper}>
        <TouchableOpacity onPress={() => setTabSelected('Build')} style={[styles.tab,
          (tabSelected === 'Build' ? {backgroundColor: '#0434a9' } : null)]}>
          <IconComponent provider="FontAwesome5" name="hammer" color="#fff"
            size={14} style={styles.headingIcon} />
          <Text style={[styles.heading2, styles.bareText]}>{' Build'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTabSelected('Storage')} style={[styles.tab,
          (tabSelected === 'Storage' ? {backgroundColor: '#0434a9' } : null)]}>
          <IconComponent provider="FontAwesome5" name="level-up-alt" color="#fff"
            size={14} style={styles.headingIcon} />
          <Text style={[styles.heading2, styles.bareText]}>{' Storage'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.break} />
      {tabSelected === 'Build' && (
        <BuildComponent />
      )}
      {tabSelected === 'Storage' && (
        <BuildingSelectContents />
      )}
    </View>
  );
}
