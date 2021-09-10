import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet }
  from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import { setBuildingResourceSelected } from '../actions/buildings';
import { setRates } from '../actions/rates';
import { displayModalValue } from '../actions/ui';

import Resource from '../models/resource';
import ResourceType from '../models/resource_type';
import Building from '../models/building';
import Vault from '../models/vault';
import Hourglass from '../models/hourglass';
import Positioner from '../models/positioner';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';

export default function ResourceSelectRateComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const leaders = useTypedSelector(state => state.leaders);
  const buildings = useTypedSelector(state => state.buildings);
  const modalValue: {building: Building, specTypeQuality: string, rate: number} =
    useTypedSelector(state => state.ui.modalValue);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let resourcesArray = getResourcesArray();

  const [resourceSelected, resourceSelect] =
    useState(setStartingSelected(resourcesArray, modalValue.specTypeQuality));

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome" name="cube" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Select Resources'}</Text>
      </View>
      <ScrollView>
        <View style={styles.tileContainer}>
          {renderResources(resourcesArray, resourceSelect)}
        </View>
      </ScrollView>
      <View style={StyleSheet.flatten([styles.panelFlexColumn,
        {minWidth: positioner.majorWidth, maxWidth: positioner.majorWidth,
          alignItems: 'flex-start'}])} >
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
        rate={modalValue.rate} resourceSelected={resourceSelected}
        resourceSelect={resourceSelect} positioner={positioner} />;
    });
  }

  function renderSubmitButton() {
    let isDisabled = false;
    let buttonStyle: any = StyleSheet.flatten([styles.buttonLarge,
      styles.buttonRowItem]);
    if (!resourceSelected) {
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

  function getResourcesArray() {
    const stqSplit = modalValue.specTypeQuality.split('|');
    switch (stqSplit[0]) {
      case RESOURCE_SPECIFICITY.TAG:
      return filterOutZero(vault.getTagResources(stqSplit[1]));

      case RESOURCE_SPECIFICITY.SUBCATEGORY:
      return filterOutZero(vault.getSubcategoryResources(stqSplit[1]));

      case RESOURCE_SPECIFICITY.CATEGORY:
      return filterOutZero(vault.getCategoryResources(stqSplit[1]));

      default:
      return [];
    }

    function filterOutZero(resources: Resource[]) {
      return resources.filter((resource) => {
        if (Math.ceil(resource.quantity) > 0) { return resource; }
      });
    }
  }

  function setStartingSelected(resourcesArray: Resource[], specTypeQuality: string) {
    let startingSelected: Resource|null = null;
    if (resourcesArray.length == 1) {
      startingSelected = resourcesArray[0];
    }
    return startingSelected;
  }

  function submit() {
    if (resourceSelected) {
      const stqSplit = modalValue.specTypeQuality.split('|');
      const specType = stqSplit[0] + '|' + stqSplit[1];
      dispatch(setBuildingResourceSelected(modalValue.building, specType,
        resourceSelected));
      let tempBuildings = Object.assign({}, buildings);
      let newBuilding = new Building(modalValue.building);
      newBuilding.resourcesSelected[specType] = resourceSelected;
      tempBuildings[newBuilding.id] = newBuilding;
      let newRates = new Hourglass().calcRates(tempBuildings, leaders, vault);
      dispatch(setRates(newRates));
      dispatch(displayModalValue(null, 'closed', null));
    }
  }
}

function ResourceSelector(props: {resource: Resource,
  resourceSelected: Resource|null, rate: number,
  resourceSelect: (resource: Resource|null) => void,
  positioner: Positioner}) {
  let resourceType = utils.getResourceType(props.resource);
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
        <BadgeComponent icon={resourceType.icon} quality={props.resource.quality}
          size={21} />
        <View>
          <Text style={{paddingLeft: 4, paddingRight: 4, textAlign: 'right'}}>
            {utils.formatNumberShort(props.rate / resourceType.value) + '/m'}
          </Text>
          <Text style={{paddingLeft: 4, paddingRight: 4, textAlign: 'right'}}>
            {'(of ' + utils.formatNumberShort(props.resource.quantity) + ')'}
          </Text>
          {renderButton(props.resource, props.resourceSelected, props.resourceSelect)}
        </View>
      </View>
    </View>
  );

  function renderButton(resource: Resource, resourceSelected: Resource|null,
    resourceSelect: (resource: Resource|null) => void) {
    if (resource.type == resourceSelected?.type
      && resource.quality == resourceSelected?.quality) {
      let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, { width: 74 }]);
      return (
        <TouchableOpacity style={buttonStyle}
          onPress={() => {resourceSelect(null)}} >
          <Text style={styles.buttonText}>{'Selected'}</Text>
        </TouchableOpacity>
      );
    }
    let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, styles.buttonLight,
      { width: 74 }]);
    return (
      <TouchableOpacity style={buttonStyle}
      onPress={() => {resourceSelect(resource)}} >
        <Text style={StyleSheet.flatten([styles.buttonText,
          styles.buttonTextDark])}>{'Select'}</Text>
      </TouchableOpacity>
    );
  }
}
