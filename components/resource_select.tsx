import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet }
  from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import { displayModalValue } from '../actions/ui';
import { consumeResources } from '../actions/vault';

import Resource from '../models/resource';
import ResourceType from '../models/resource_type';
import Vault from '../models/vault';
import Positioner from '../models/positioner';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';

export default function ResourceSelectComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const modalValue: {type?: string,
    aCost: {specificity: string, type: string, quantity: number},
    resources?: {type: string, quantity: number}[],
    optionName?: string} = useTypedSelector(state => state.ui.modalValue);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let resourcesArray = getResourcesArray();

  const [resourcesSelected, resourcesSelect] =
    useState(setStartingSelected(resourcesArray, modalValue.aCost));

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome" name="cube" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Select Resources'}</Text>
      </View>
      <ScrollView>
        <View style={styles.tileContainer}>
          {renderResources(resourcesArray, resourcesSelect)}
        </View>
      </ScrollView>
      <View style={StyleSheet.flatten([styles.panelFlexColumn,
        {minWidth: positioner.majorWidth, maxWidth: positioner.majorWidth,
          alignItems: 'flex-start'}])} >
        <Text style={StyleSheet.flatten([styles.heading2, {alignSelf: 'center'}])}>
          {'Using:'}
        </Text>
        {renderSelected(resourcesSelected, vault)}
        <View style={styles.break} />
        <View style={styles.buttonRow}>
          {renderSubmitButton()}
        </View>
      </View>
    </View>
  );

  function renderResources(resourceArray: Resource[],
    setResourcesSelected: Function) {
    return resourceArray.map((resource) => {
      return <ResourceSelector key={resource.type} resource={resource}
        aCost={modalValue.aCost} resourcesSelected={resourcesSelected} vault={vault}
        setResourcesSelected={setResourcesSelected} positioner={positioner} />;
    });
  }

  function renderSelected(resourcesSelected: {[typeQuality: string] : number},
    vault: Vault) {
    if (Object.keys(resourcesSelected).length > 0) {
      return Object.keys(resourcesSelected).map((typeQuality) => {
        let resource = resourceTypes[typeQuality.split('|')[0]];
        return (
          <View key={typeQuality} style={styles.rows}>
            <BadgeComponent
              provider={resource.icon.provider}
              name={resource.icon.name}
              foregroundColor={resource.foregroundColor}
              backgroundColor={resource.backgroundColor}
              iconSize={16} />
            <Text>
              {resourcesSelected[typeQuality] + ' (of '
                + utils.formatNumberShort(vault.resources[typeQuality].quantity)
                + ') ' + utils.typeQualityName(typeQuality)}
            </Text>
          </View>
        );
      })
    }
    return <Text>{'- Nothing selected -'}</Text>;
  }

  function renderSubmitButton() {
    let isDisabled = false;
    let buttonStyle: any = StyleSheet.flatten([styles.buttonLarge,
      styles.buttonRowItem]);
    let resourceSum = 0;
    Object.keys(resourcesSelected).map((typeQuality) => {
      resourceSum += resourcesSelected[typeQuality];
    })
    if (resourceSum < modalValue.aCost.quantity) {
      isDisabled = true;
      buttonStyle = StyleSheet.flatten([styles.buttonLarge,
        styles.buttonRowItem, styles.buttonDisabled]);
    }
    return (
      <TouchableOpacity style={buttonStyle}
        disabled={isDisabled}
        onPress={() => {submit()}} >
        <IconComponent provider="FontAwesome5" name="check-square" color="#fff"
          size={16} style={styles.headingIcon} />
        <Text style={styles.buttonTextLarge}>{' Go'}</Text>
      </TouchableOpacity>
    )
  }

  function submit() {
    let rs: Resource[] = []
    Object.keys(resourcesSelected).map((typeQuality) => {
      const tqSplit = typeQuality.split('|');
      rs.push({type: tqSplit[0], quality: parseInt(tqSplit[1]),
        quantity: resourcesSelected[typeQuality]});
    });
    dispatch(consumeResources(vault, rs));

    if (modalValue.type) {
      switch (modalValue.type) {
        case 'Building detail':
        case 'Build detail':
        modalValue.resources = rs;
        dispatch(displayModalValue(null, ('resolving ' + modalValue.type), modalValue));
        break;
      }
    }
    else {
      dispatch(displayModalValue(null, 'resolving', modalValue));
    }
  }

  function getResourcesArray() {
    switch (modalValue.aCost.specificity) {
      case RESOURCE_SPECIFICITY.TAG:
      return filterOutZero(vault.getTagResources(modalValue.aCost.type));

      case RESOURCE_SPECIFICITY.SUBCATEGORY:
      return filterOutZero(vault.getSubcategoryResources(modalValue.aCost.type));

      case RESOURCE_SPECIFICITY.CATEGORY:
      return filterOutZero(vault.getCategoryResources(modalValue.aCost.type));

      default:
      return [];
    }

    function filterOutZero(resources: Resource[]) {
      return resources.filter((resource) => {
        if (Math.ceil(resource.quantity) > 0) { return resource; }
      });
    }
  }

  function setStartingSelected(resourcesArray: Resource[],
    aCost: {specificity: string, type: string, quantity: number}) {
    let startingSelected: {[typeQuality: string] : number} = {};
    if (resourcesArray.length == 1) {
      startingSelected[resourcesArray[0].type + '|' + resourcesArray[0].quality] =
        aCost.quantity;
    }
    return startingSelected;
  }
}

function ResourceSelector(props: {resource: Resource,
  resourcesSelected: {[typeQuality: string] : number},
  aCost: {specificity: string, type: string, quantity: number},
  vault: Vault, setResourcesSelected: Function, positioner: Positioner}) {
  let resourceType = resourceTypes[props.resource.type];
  let optionTextStyle: any = {paddingLeft: 4, paddingRight: 4};
  if (props.resource.quality == 1) {
    optionTextStyle = { paddingLeft: 4, paddingRight: 4,
      color: '#6a7791', textShadowColor: '#a3bcdb', textShadowRadius: 1 };
  }
  return (
    <View style={StyleSheet.flatten([styles.panelTile, styles.columns,
      {minWidth: props.positioner.minorWidth,
        maxWidth: props.positioner.minorWidth}])}>
      <Text style={optionTextStyle}>
        {utils.typeQualityName(props.resource.type + '|' + props.resource.quality)}
      </Text>
      <View style={styles.rows}>
        <BadgeComponent
          provider={resourceType.icon.provider}
          name={resourceType.icon.name}
          foregroundColor={resourceType.foregroundColor}
          backgroundColor={resourceType.backgroundColor}
          iconSize={18} />
        <View>
          <Text style={{paddingLeft: 4, paddingRight: 4, textAlign: 'right'}}>
            {utils.formatNumberShort(props.resource.quantity)}
          </Text>
          {renderButton(props.resource, props.resourcesSelected, props.aCost,
            props.vault, props.setResourcesSelected)}
        </View>
      </View>
    </View>
  );

  function renderButton(resource: Resource,
    resourcesSelected: {[typeQuality: string] : number},
    aCost: {specificity: string, type: string, quantity: number},
    vault: Vault, setResourcesSelected: Function) {

    if (resourcesSelected[(resource.type + '|' + resource.quality)]) {
      let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, { width: 74 }]);
      return (
        <TouchableOpacity style={buttonStyle}
          onPress={() => {typeQualityUnSelect(resource, resourcesSelected, aCost,
          vault, setResourcesSelected)}} >
          <Text style={styles.buttonText}>{'Selected'}</Text>
        </TouchableOpacity>
      );
    }
    let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, styles.buttonLight,
      { width: 74 }]);
    return (
      <TouchableOpacity style={buttonStyle}
      onPress={() => {typeQualitySelect(resource, resourcesSelected, aCost,
      vault, setResourcesSelected)}} >
        <Text style={StyleSheet.flatten([styles.buttonText,
          styles.buttonTextDark])}>{'Select'}</Text>
      </TouchableOpacity>
    );
  }

  function typeQualityUnSelect(resource: Resource,
    resourcesSelected: {[typeQuality: string] : number},
    aCost: {specificity: string, type: string, quantity: number},
    vault: Vault, setResourcesSelected: Function) {
    let typeQualities = Object.keys(resourcesSelected);
    typeQualities = typeQualities.filter((typeQuality) => {
      if (typeQuality != (resource.type + '|' + resource.quality)) {
        return typeQuality;
      }
    });

    let rSelected = balanceResources(typeQualities, aCost, vault);
    setResourcesSelected(rSelected);
  }
  function typeQualitySelect(resource: Resource,
    resourcesSelected: {[typeQuality: string] : number},
    aCost: {specificity: string, type: string, quantity: number},
    vault: Vault, setResourcesSelected: Function) {
    let typeQualities = Object.keys(resourcesSelected);
    typeQualities.push(resource.type + '|' + resource.quality);

    let rSelected = balanceResources(typeQualities, aCost, vault);
    setResourcesSelected(rSelected);
  }

  function balanceResources(typeQualities: string[],
    aCost: {specificity: string, type: string, quantity: number},
    vault: Vault) {
    typeQualities.sort((a, b) => {
      if (vault.resources[a].quantity <= vault.resources[b].quantity) {
        return -1;
      }
      return 1;
    });

    let rSelected: {[typeQuality: string] : number} = {};
    let remainingQty = aCost.quantity;
    typeQualities.map((typeQuality, index) => {
      let rQuantity = 0;
      if (index < (typeQualities.length-1)) {
        rQuantity = Math.floor(remainingQty / (typeQualities.length - index));
      }
      else {
        rQuantity = remainingQty;
      }
      if (rQuantity > vault.resources[typeQuality].quantity) {
        rQuantity = Math.floor(vault.resources[typeQuality].quantity);
      }
      remainingQty -= rQuantity;
      rSelected[typeQuality] = rQuantity;
    });
    return rSelected;
  }
}
