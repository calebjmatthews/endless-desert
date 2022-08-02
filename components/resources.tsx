import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
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
    if ((catBranch.resources || []).length > 0) {
      uiArray.push({ type: 'category', id: category.name, category });
      catBranch.resources?.map((resource) => {
        const id = (resource.type + '|' + resource.quality);
        uiArray.push({ type: 'resource', id, resource });
      });
    }
  });

  function renderUiItem(data: any) {
    switch(data.item.type) {
      case 'resource':
      return <ResourceDescription resource={data.item.resource} rates={rates}
        resourceDetailOpen={resourceDetailOpen} positioner={positioner} />

      case 'category':
      return <CategoryDescription category={data.item.category} rates={rates}
        resourceDetailOpen={resourceDetailOpen} positioner={positioner} />

      default:
      return null;
    }
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

function ResourceDescription(props: UiItemProps) {
  const { resource, category, rates, resourceDetailOpen, positioner } = props;
  if (!resource) { return null; }
  let resourceType = utils.getResourceType(resource);
  const typeQuality = (resource.type + '|' + resource.quality);
  const rate = rates.netRates[typeQuality];
  let rateString = '';
  if (rate) {
    rateString = utils.formatNumberShort(rate);
    let sign = '+';
    if (rate < 0) { sign = ''; }
    rateString = (sign + rateString + '/m');
  }
  let exhaustionString: string|null = null;
  const exhaustion = rates.exhaustions[typeQuality];
  if (exhaustion) {
    const diff = exhaustion - new Date(Date.now()).valueOf();
    exhaustionString = `Out in ${utils.formatDuration(diff)}`
  }
  let textStyle: any[] = [{ color: '#000', maxWidth: positioner.bodyMedTextWidth, 
    minWidth: positioner.bodyMedTextWidth }];
  if (resource.quality == 1) {
    textStyle.push({ color: '#6a7791', textShadowColor: '#a3bcdb', textShadowRadius: 1 });
  }
  return (
    <TouchableOpacity style={StyleSheet.flatten([styles.panelFlex,
      {minWidth: positioner.majorWidth, maxWidth: positioner.majorWidth}])}
      onPress={() => { resourceDetailOpen(resource) }}>
      <BadgeComponent icon={resourceType.icon} quality={resource.quality} size={29} />
      <View style={styles.containerStretchRow}>
        <View>
          <Text style={textStyle}>
            {utils.getResourceName(resource)}
          </Text>
          <Text>
            {rateString}
          </Text>
          {exhaustionString && (
            <Text>
              {exhaustionString}
            </Text>
          )}
        </View>
        <View style={styles.quantityContainer}>
          <Text style={{fontSize: 20}}>
            {utils.formatNumberShort(resource.quantity)}
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
