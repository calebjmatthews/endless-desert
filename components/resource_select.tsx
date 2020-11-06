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
import { resourceTypes } from '../instances/resource_types';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';

export default function ResourceSelectComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const modalValue: {aCost: {specificity: string, type: string, quantity: number},
    optionName: string} = useTypedSelector(state => state.ui.modalValue);
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
        {alignItems: 'flex-start'}])}>
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
        setResourcesSelected={setResourcesSelected} />;
    });
  }

  function renderSelected(resourcesSelected: {[resourceName: string] : number},
    vault: Vault) {
    if (Object.keys(resourcesSelected).length > 0) {
      return Object.keys(resourcesSelected).map((resourceName) => {
        let resource = resourceTypes[resourceName];
        return (
          <View key={resourceName} style={styles.rows}>
            <BadgeComponent
              provider={resource.icon.provider}
              name={resource.icon.name}
              foregroundColor={resource.foregroundColor}
              backgroundColor={resource.backgroundColor}
              iconSize={16} />
            <Text>
              {resourcesSelected[resourceName] + ' (of '
                + Math.floor(vault.resources[resourceName].quantity) + ') '
                + resourceName}
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
    Object.keys(resourcesSelected).map((resourceName) => {
      resourceSum += resourcesSelected[resourceName];
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
    let rs: {type: string, quantity: number}[] = []
    Object.keys(resourcesSelected).map((resourceName) => {
      rs.push({type: resourceName, quantity: resourcesSelected[resourceName]});
    });
    dispatch(consumeResources(vault, rs));
    dispatch(displayModalValue(null, 'resolving', modalValue));
  }

  function getResourcesArray() {
    switch (modalValue.aCost.specificity) {
      case RESOURCE_SPECIFICITY.TAG:
      return vault.getTagResources(modalValue.aCost.type);

      case RESOURCE_SPECIFICITY.CATEGORY:
      return vault.getCategoryResources(modalValue.aCost.type);

      default:
      return [];
    }
  }

  function setStartingSelected(resourcesArray: Resource[],
    aCost: {specificity: string, type: string, quantity: number}) {
    let startingSelected: {[resourceName: string] : number} = {};
    if (resourcesArray.length == 1) {
      startingSelected[resourcesArray[0].type] = aCost.quantity;
    }
    return startingSelected;
  }
}

function ResourceSelector(props: {resource: Resource,
  resourcesSelected: {[resourceName: string] : number},
  aCost: {specificity: string, type: string, quantity: number},
  vault: Vault, setResourcesSelected: Function}) {
  let resourceType = resourceTypes[props.resource.type];
  let optionTextStyle = {paddingLeft: 4, paddingRight: 4};
  return (
    <View style={styles.panelTile} >
      <BadgeComponent
        provider={resourceType.icon.provider}
        name={resourceType.icon.name}
        foregroundColor={resourceType.foregroundColor}
        backgroundColor={resourceType.backgroundColor}
        iconSize={18} />
      <View>
        <Text style={optionTextStyle}>{resourceType.name}</Text>
        <Text style={StyleSheet.flatten([{textAlign: 'right'}, optionTextStyle])}>
          {Math.floor(props.resource.quantity)}
        </Text>
        {renderButton(props.resource, props.resourcesSelected, props.aCost,
          props.vault, props.setResourcesSelected)}
      </View>
    </View>
  );

  function renderButton(resource: Resource,
    resourcesSelected: {[resourceName: string] : number},
    aCost: {specificity: string, type: string, quantity: number},
    vault: Vault, setResourcesSelected: Function) {

    if (resourcesSelected[resource.type]) {
      let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, { width: 74 }]);
      return (
        <TouchableOpacity style={buttonStyle}
          onPress={() => {resourceNameUnSelect(resource, resourcesSelected, aCost,
          vault, setResourcesSelected)}} >
          <Text style={styles.buttonText}>{'Selected'}</Text>
        </TouchableOpacity>
      );
    }
    let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, styles.buttonLight,
      { width: 74 }]);
    return (
      <TouchableOpacity style={buttonStyle}
      onPress={() => {resourceNameSelect(resource, resourcesSelected, aCost,
      vault, setResourcesSelected)}} >
        <Text style={StyleSheet.flatten([styles.buttonText,
          styles.buttonTextDark])}>{'Select'}</Text>
      </TouchableOpacity>
    );
  }

  function resourceNameUnSelect(resource: Resource,
    resourcesSelected: {[resourceName: string] : number},
    aCost: {specificity: string, type: string, quantity: number},
    vault: Vault, setResourcesSelected: Function) {
    let resourceNames = Object.keys(resourcesSelected);
    resourceNames = resourceNames.filter((resourceName) => {
      if (resourceName != resource.type) { return resourceName; }
    });

    let rSelected = balanceResources(resourceNames, aCost, vault);
    setResourcesSelected(rSelected);
  }
  function resourceNameSelect(resource: Resource,
    resourcesSelected: {[resourceName: string] : number},
    aCost: {specificity: string, type: string, quantity: number},
    vault: Vault, setResourcesSelected: Function) {
    let resourceNames = Object.keys(resourcesSelected);
    resourceNames.push(resource.type);

    let rSelected = balanceResources(resourceNames, aCost, vault);
    setResourcesSelected(rSelected);
  }

  function balanceResources(resourceNames: string[],
    aCost: {specificity: string, type: string, quantity: number},
    vault: Vault) {
    resourceNames.sort((a, b) => {
      if (vault.resources[a].quantity <= vault.resources[b].quantity) {
        return -1;
      }
      return 1;
    });

    let rSelected: {[resourceName: string] : number} = {};
    let remainingQty = aCost.quantity;
    resourceNames.map((resourceName, index) => {
      let rQuantity = 0;
      if (index < (resourceNames.length-1)) {
        rQuantity = Math.floor(remainingQty / (resourceNames.length - index));
      }
      else {
        rQuantity = remainingQty;
      }
      if (rQuantity > vault.resources[resourceName].quantity) {
        rQuantity = Math.floor(vault.resources[resourceName].quantity);
      }
      remainingQty -= rQuantity;
      rSelected[resourceName] = rQuantity;
    });
    return rSelected;
  }
}
