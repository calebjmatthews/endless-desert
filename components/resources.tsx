import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';

import ResourceType from '../models/resource_type';
import Resource from '../models/resource';
import Vault from '../models/vault';
import { resourceTypes } from '../instances/resource_types';
import { resourceCategories } from '../instances/resource_categories';
import { resourceSubcategories } from '../instances/resource_subcategories';
import { utils } from '../utils';

export default function ResourcesComponent() {
  const vault = useTypedSelector(state => state.vault);
  const rates = useTypedSelector(state => state.rates);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let resourcesArray = Object.keys(vault.resources).map((typeQuality) => {
    return vault.resources[typeQuality];
  });
  resourcesArray = resourcesArray.filter((resource) => {
    if (Math.floor(resource.quantity) > 0) {
       return resource;
    }
  });
  resourcesArray.sort((a, b) => {
    const rta = resourceTypes[a.type];
    const rcoa = resourceCategories[rta.category].order;
    const rtb = resourceTypes[b.type];
    const rcob = resourceCategories[rtb.category].order;
    if (rcoa != rcob) {
      return rcoa - rcob;
    }
    const rateA = rates.netRates[a.type + '|' + a.quality];
    const rateB = rates.netRates[b.type + '|' + b.quality];
    if (rateA && !rateB) { return -1; }
    if (!rateA && rateB) { return 1; }
    let rsoa = 99;
    if (rta.subcategory) { rsoa = resourceSubcategories[rta.subcategory].order; }
    let rsob = 99;
    if (rtb.subcategory) { rsob = resourceSubcategories[rtb.subcategory].order; }
    if (rsoa != rsob) {
      return rsoa - rsob;
    }
    return (rta.name < rtb.name) ? -1 : 1;
  });

  function renderResource(resource: any) {
    return <ResourceDescription resource={resource} rates={rates}
      positioner={positioner} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome" name="cube" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Resources'}</Text>
      </View>
      <FlatList
        data={resourcesArray}
        renderItem={renderResource}
        keyExtractor={resource => (resource.type + '|' + resource.quality)}>
      </FlatList>
    </View>
  );
}

function ResourceDescription(props: any) {
  const resource: Resource = props.resource.item;
  let resourceType = resourceTypes[resource.type];
  let rate = props.rates.netRates[resource.type + '|' + resource.quality];
  if (rate) {
    let sign = '+';
    if (rate < 0) { sign = ''; }
    rate = (sign + (Math.round(rate)) + '/m');
  }
  else {
    rate = '';
  }
  let textStyle: any = { color: '#000' };
  if (resource.quality == 1) {
    textStyle = { color: '#6a7791', textShadowColor: '#a3bcdb',
      textShadowRadius: 1 };
  }
  return (
    <View style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])}>
      <BadgeComponent
        provider={resourceType.icon.provider}
        name={resourceType.icon.name}
        foregroundColor={resourceType.foregroundColor}
        backgroundColor={resourceType.backgroundColor}
        iconSize={18}
        quality={resource.quality} />
      <View style={styles.containerStretchRow}>
        <View>
          <Text style={textStyle}>
            {utils.typeQualityName(resource.type + '|' + resource.quality) }
          </Text>
          <Text>
            {rate}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={{fontSize: 20}}>
            {utils.formatNumberShort(props.resource.item.quantity)}
          </Text>
        </View>
      </View>

    </View>
  );
}
