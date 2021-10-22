import React, { useState, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
const flat = StyleSheet.flatten;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';

import Resource from '../models/resource';
import ResourceType from '../models/resource_type';
import ResourceTag from '../models/resource_tag';
import Vault from '../models/vault';
import { resourceTypes } from '../instances/resource_types';
import { resourceTags } from '../instances/resource_tags';
import { resourceCategories } from '../instances/resource_categories';
import { renderValue } from './utils_react';
import { utils } from '../utils';

export default function ResourceDetailComponent() {
  const dispatch = useDispatch();
  const modalValue: string = useTypedSelector(state => state.ui.modalValue);
  const vault = useTypedSelector(state => state.vault);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const resource = vault.resources[modalValue];
  const rtSplit = resource.type.split('-');
  const resourceType = new Resource(resource).toResourceType(resourceTypes);
  const resourceCategory = resourceCategories[resourceType.category];
  const value = utils.formatNumberShort(resourceType.value);
  const count = utils.formatNumberShort(resource.quantity);
  const total = utils.formatNumberShort(resourceType.value * resource.quantity);

  return (
    <View style={styles.modalContent}>
      <View style={styles.headingWrapper}>
        <BadgeComponent icon={resourceType.icon} quality={resource.quality}
          size={55} />
        <Text style={styles.heading1}>{utils.getResourceName(resource)}</Text>
      </View>
      <View style={{flex: 1, display: 'flex', alignItems: 'center'}}>
        <View style={flat([styles.descriptionBand,
          {minWidth: positioner.modalWidth,
            maxWidth: positioner.modalWidth}])}>
          <View style={styles.centeredRows}>
            <Text style={styles.descriptionBandText}>
              {'Category: '}
            </Text>
            <IconComponent provider={resourceCategory.icon.provider}
              name={resourceCategory.icon.name} color={resourceCategory.icon.color}
              size={19} />
            <Text style={styles.descriptionBandText}>
              {' ' + resourceCategory.name}
            </Text>
          </View>

        </View>
        <View style={StyleSheet.flatten([styles.container, {paddingHorizontal: 5,
          justifyContent: 'space-between'}])}>
          <View style={StyleSheet.flatten([styles.spacedRows,
            {justifyContent: 'center'}])}>
            {resourceType.tags.map((tagName) => {return renderTag(tagName)})}
          </View>
          <View style={styles.break} />
          <View style={flat([styles.rows, {justifyContent: 'space-between',
            alignItems: 'flex-end', minWidth: positioner.modalMajor,
            maxWidth: positioner.modalMajor}])}>
            <View style={flat([styles.rows, {alignItems: 'flex-end'}])}>
              {renderValue(resourceType.value, 20, styles.bareText)}
              <Text style={styles.bareText}>{' value'}</Text>
            </View>
            <View style={flat([styles.rows, {alignItems: 'flex-end'}])}>
              <Text style={styles.bareText}>{'total (x' + count + ') '}</Text>
              {renderValue((resourceType.value * resource.quantity), 25, styles.bareText)}
            </View>
          </View>
        </View>
        <View style={styles.break} />
      </View>
    </View>
  );

  function renderTag(tagName: string) {
    const tag = resourceTags[tagName];
    if (tag) {
      return (
        <View key={tag.name} style={flat([styles.infoBar, {marginHorizontal: 5}])}>
          <View style={styles.rows}>
            <IconComponent provider={tag.icon.provider} name={tag.icon.name}
              color={tag.icon.color} size={16} />
            <Text style={{fontSize: 12}}>{' ' + tag.name}</Text>
          </View>
        </View>
      );
    }
  }
}
