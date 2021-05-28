import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import { displayModalValue } from '../actions/ui';

import ResourceType from '../models/resource_type';
import ResourceCategory from '../models/resource_category';
import Resource from '../models/resource';
import Vault from '../models/vault';
import Rates from '../models/rates';
import Positioner from '../models/positioner';
import { CategoryBranch } from '../models/category_branch';
import { resourceTypes } from '../instances/resource_types';
import { resourceCategories } from '../instances/resource_categories';
import { resourceSubcategories } from '../instances/resource_subcategories';
import { renderBadge } from './utils_react';
import { utils } from '../utils';
import { MODALS } from '../enums/modals';

export default function ResourcesComponent() {
  const dispatch = useDispatch();
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

  const catTree = vault.getCategoryTree(resourcesArray);
  let uiArray: UiItem[] = [];
  Object.keys(catTree).map((catName) => {
    const catBranch = catTree[catName];
    let category = Object.assign( {}, catBranch );
    delete category.resources;
    if (catBranch.resources.length > 0) {
      uiArray.push({ type: 'category', id: category.name, category });
      catBranch.resources.map((resource) => {
        const id = (resource.type + '|' + resource.quality);
        uiArray.push({ type: 'resource', id, resource });
      });
    }
  });

  function renderUiItem(data: any) {
    return <UiSplitter data={data} rates={rates}
      resourceDetailOpen={resourceDetailOpen} positioner={positioner} />
  }

  function resourceDetailOpen(resource: Resource) {
    const typeQuality = resource.type + '|' + resource.quality;
    dispatch(displayModalValue(MODALS.RESOURCE_DETAIL, 'open', typeQuality));
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome" name="cube" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Resources'}</Text>
      </View>
      <FlatList
        data={uiArray}
        renderItem={renderUiItem}
        keyExtractor={uiItem => uiItem.id }>
      </FlatList>
    </View>
  );
}

function UiSplitter(props: any) {
  switch(props.data.item.type) {
    case 'resource':
    return <ResourceDescription resource={props.data.item.resource} rates={props.rates}
      resourceDetailOpen={props.resourceDetailOpen} positioner={props.positioner} />

    case 'category':
    return <CategoryDescription category={props.data.item.category} rates={props.rates}
      resourceDetailOpen={props.resourceDetailOpen} positioner={props.positioner} />

    default:
    return null;
  }

}

function ResourceDescription(props: UiItemProps) {
  if (!props.resource) { return null; }
  const resource: Resource = props.resource;
  let resourceType = utils.getResourceType(resource);
  const rate = props.rates.netRates[resource.type + '|' + resource.quality];
  let rateString = '';
  if (rate) {
    rateString = rate.toString();
    let sign = '+';
    if (rate < 0) { sign = ''; }
    rateString = (sign + (Math.round(rate)) + '/m');
  }
  let textStyle: any = { color: '#000' };
  if (resource.quality == 1) {
    textStyle = { color: '#6a7791', textShadowColor: '#a3bcdb',
      textShadowRadius: 1 };
  }
  return (
    <TouchableOpacity style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])}
      onPress={() => { props.resourceDetailOpen(resource) }}>
      {renderBadge(resourceType, resource.quality, 29)}
      <View style={styles.containerStretchRow}>
        <View>
          <Text style={textStyle}>
            {utils.getResourceName(resource)}
          </Text>
          <Text>
            {rateString}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={{fontSize: 20}}>
            {utils.formatNumberShort(props.resource.quantity)}
          </Text>
        </View>
      </View>

    </TouchableOpacity>
  );
}

function CategoryDescription(props: UiItemProps) {
  if (!props.category) { return null; }
  const rCat = resourceCategories[props.category.name];

  return (
    <View style={StyleSheet.flatten([styles.rows,
      {marginLeft: 10, marginTop: 10, minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])} >
      <IconComponent provider={rCat.icon.provider} name={rCat.icon.name}
        color="#fff" size={20}
        style={styles.headingIcon} />
      <View style={styles.containerStretchRow}>
        <View>
          <Text style={styles.bareText}>
            {' ' + rCat.name}
          </Text>
        </View>
      </View>

    </View>
  );
}

interface UiItemProps {
  resource?: Resource;
  category?: ResourceCategory;
  rates: Rates;
  resourceDetailOpen: (resource: Resource) => void;
  positioner: Positioner;
}

interface UiItem {
  type: string;
  id: string;
  resource?: Resource;
  category?: CategoryBranch;
}
