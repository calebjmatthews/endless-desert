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
import { consumeResources, increaseResources } from '../actions/vault';
import { studyResource } from '../actions/research_status';
import { addTimer } from '../actions/timers';

import Resource from '../models/resource';
import ResourceType from '../models/resource_type';
import Vault from '../models/vault';
import Timer from '../models/timer';
import { resourceTypes } from '../instances/resource_types';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { RESEARCHES } from '../enums/researches';

export default function ResourceSelectComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const modalValue: string = useTypedSelector(state => state.ui.modalValue);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  let resourcesArray = getResourcesArray();

  function setStartingSelected(): string|null { return null; }
  const [resourceSelected, resourceSelect] = useState(setStartingSelected());

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="cubes" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Select Resources'}</Text>
      </View>
      <ScrollView>
        <View style={styles.tileContainer}>
          {renderResources(resourcesArray, resourceSelect)}
        </View>
      </ScrollView>
      <View style={styles.panelFlex}>
        <View style={styles.buttonRow}>
          {renderSubmitButton()}
        </View>
      </View>
    </View>
  );

  function renderResources(resourceArray: Resource[],
    setResourceSelected: Function) {
    return resourceArray.map((resource) => {
      return <ResourceSelector key={resource.type} resource={resource}
        resourceSelected={resourceSelected} vault={vault}
        setResourceSelected={setResourceSelected} />;
    });
  }

  function renderSubmitButton() {
    let isDisabled = false;
    let buttonStyle: any = StyleSheet.flatten([styles.buttonLarge,
      styles.buttonRowItem]);
    if (resourceSelected == null) {
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
    if (resourceSelected != null) {
      let resourceType = resourceTypes[resourceSelected];
      if (resourceType.value != null) {
        let rsIncrease = [{type: RESOURCE_TYPES.KNOWLEDGE,
          quantity: (resourceType.value)}];
        let duration = (resourceType.value / 10) * 1000;
        if (duration < 1000) { duration = 1000; }
        let timer = new Timer({
          name: RESEARCHES.STUDY,
          startedAt: new Date(Date.now()).valueOf(),
          endsAt: (new Date(Date.now()).valueOf() + duration),
          progress: 0,
          remainingLabel: '',
          resourcesToIncrease: rsIncrease,
          resourcesToConsume: [{type: resourceSelected, quantity: 1}],
          messageToDisplay: (resourceSelected + ' studied for '
            + resourceType.value + ' knowledge.')
        });
        dispatch(addTimer(timer));
        dispatch(studyResource(resourceSelected));
        dispatch(displayModalValue(null, 'closed', null));
      }
    }
  }

  function getResourcesArray() {
    switch(modalValue) {
      case RESEARCHES.STUDY:
      return researchStatus.getResourcesToStudy(vault);

      default:
      return [];
    }
  }
}

function ResourceSelector(props: {resource: Resource,
  resourceSelected: string|null,
  vault: Vault, setResourceSelected: Function}) {
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
        {renderButton(props.resource, props.resourceSelected,
          props.vault, props.setResourceSelected)}
      </View>
    </View>
  );

  function renderButton(resource: Resource,
    resourceSelected: string|null,
    vault: Vault, setResourcesSelected: Function) {

    if (resourceSelected == resource.type) {
      let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, { width: 74 }]);
      return (
        <TouchableOpacity style={buttonStyle}
          onPress={() => {resourceNameUnSelect(setResourcesSelected)}} >
          <Text style={styles.buttonText}>{'Selected'}</Text>
        </TouchableOpacity>
      );
    }
    let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, styles.buttonLight,
      { width: 74 }]);
    return (
      <TouchableOpacity style={buttonStyle}
      onPress={() => {resourceNameSelect(resource, setResourcesSelected)}} >
        <Text style={StyleSheet.flatten([styles.buttonText,
          styles.buttonTextDark])}>{'Select'}</Text>
      </TouchableOpacity>
    );
  }

  function resourceNameUnSelect(setResourceSelected: Function) {
    setResourceSelected(null);
  }
  function resourceNameSelect(resource: Resource, setResourceSelected: Function) {
    setResourceSelected(resource.type);
  }
}
