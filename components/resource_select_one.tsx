import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, TextInput }
  from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import { displayModalValue } from '../actions/ui';
import { consumeResources, increaseResources } from '../actions/vault';
import { studyResource } from '../actions/research_status';
import { completeTrade } from '../actions/trading_status';
import { addTimer } from '../actions/timers';

import Resource from '../models/resource';
import ResourceType from '../models/resource_type';
import Vault from '../models/vault';
import Timer from '../models/timer';
import { resourceTypes } from '../instances/resource_types';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { RESEARCHES } from '../enums/researches';

export default function ResourceSelectOneComponent() {
  const [quantitySelected, setQuantitySelected] = useState('1');
  const [quantityGiven, setQuantityGiven] = useState(calcQuantityGiven('1'));
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const modalValue: any = useTypedSelector(state => state.ui.modalValue);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const tradingStatus = useTypedSelector(state => state.tradingStatus);
  let resourcesArray = getResourcesArray();

  function setStartingSelected(): string|null {
    if (resourcesArray.length == 1) {
      return resourcesArray[0].type;
    }
    return null;
  }
  const [resourceSelected, resourceSelect] = useState(setStartingSelected());

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
      <View style={styles.panelFlexColumn}>
        {renderQuantityInput()}
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

  function renderQuantityInput() {
    if (modalValue.type == RESEARCHES.ANALYSIS) {
      return (
        <View style={styles.rows}>
          <Text>{'Selecting: '}</Text>
          <TextInput style={styles.inputBox} value={quantitySelected}
            onChangeText={ (text) => setQuantitySelected(text) } />
        </View>
      );
    }
    else if (modalValue.type == 'Trading') {
      const trade = tradingStatus.tradingPartners[modalValue.tradingPartner]
        .trades[modalValue.tradeId];
      return (
        <View style={styles.columns}>
          <View style={styles.rows}>
            <Text>{'Offer: '}</Text>
            <TextInput style={styles.inputBox} value={quantitySelected}
              onChangeText={ (text) => changeTradeQuantity(text) } />
          </View>
          <Text>{quantitySelected + ' ' + resourceSelected + ' for ' +
            quantityGiven + ' ' + trade.give.type }</Text>
        </View>
      );
    }
    return null;
  }

  function changeTradeQuantity(text: string) {
    const trade = tradingStatus.tradingPartners[modalValue.tradingPartner]
      .trades[modalValue.tradeId];
    let tInt = parseInt(text);

    if (resourceSelected != null) {
      if (tInt > vault.resources[resourceSelected].quantity) {
        tInt = vault.resources[resourceSelected].quantity;
      }

      const rResourceType = resourceTypes[resourceSelected];
      const gResourceType = resourceTypes[trade.give.type];
      if (rResourceType.value != null && gResourceType.value != null
        && (tInt ? true : false)) {
        let qReceived = Math.ceil((gResourceType.value * trade.give.quantity)
          / (rResourceType.value));
        if (tInt > qReceived) {
          tInt = qReceived;
        }
      }
    }

    let pText = '0';
    if (tInt ? true : false) { pText = tInt.toString(); }
    setQuantitySelected(pText);
    setQuantityGiven(calcQuantityGiven(pText));

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
    switch(modalValue.type) {
      case RESEARCHES.STUDY:
      actionStudy();
      break;

      case RESEARCHES.ANALYSIS:
      actionAnalysis();
      break;

      case 'Trading':
      actionTrading();
      break;
    }
  }

  function actionStudy() {
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
          buildingToBuild: null,
          tradingPartnerToArrive: null,
          messageToDisplay: ('You studied ' + resourceSelected + ' for '
            + resourceType.value + ' knowledge.'),
          iconToDisplay: resourceType.icon,
          iconForegroundColor: resourceType.foregroundColor,
          iconBackgroundColor: resourceType.backgroundColor
        });
        dispatch(addTimer(timer));
        dispatch(studyResource(resourceSelected));
        dispatch(displayModalValue(null, 'closed', null));
      }
    }
  }

  function actionAnalysis() {
    if (resourceSelected != null) {
      let resourceType = resourceTypes[resourceSelected];
      if (resourceType.value != null) {
        let rValue = ((resourceType.value * parseInt(quantitySelected)) / 4);
        let rsIncrease = [{type: RESOURCE_TYPES.KNOWLEDGE, quantity: rValue}];
        let duration = (resourceType.value * parseInt(quantitySelected) / 10) * 1000;
        if (duration < 1000) { duration = 1000; }
        let timer = new Timer({
          name: RESEARCHES.ANALYSIS,
          startedAt: new Date(Date.now()).valueOf(),
          endsAt: (new Date(Date.now()).valueOf() + duration),
          progress: 0,
          remainingLabel: '',
          resourcesToIncrease: rsIncrease,
          resourcesToConsume: [{type: resourceSelected,
            quantity: parseInt(quantitySelected)}],
          buildingToBuild: null,
          tradingPartnerToArrive: null,
          messageToDisplay: ('You analyzed ' + quantitySelected + ' ' + resourceSelected
            + ' for ' + rValue + ' knowledge.'),
          iconToDisplay: resourceType.icon,
          iconForegroundColor: resourceType.foregroundColor,
          iconBackgroundColor: resourceType.backgroundColor
        });
        dispatch(addTimer(timer));
        dispatch(studyResource(resourceSelected));
        dispatch(displayModalValue(null, 'closed', null));
      }
    }
  }

  function actionTrading() {
    if (resourceSelected != null) {
      const trade = tradingStatus.tradingPartners[modalValue.tradingPartner]
        .trades[modalValue.tradeId];
      dispatch(increaseResources(vault, [{type: trade.give.type,
        quantity: quantityGiven}]));
      dispatch(consumeResources(vault, [{type: resourceSelected,
        quantity: parseInt(quantitySelected)}]));
      dispatch(completeTrade({
        id: trade.id,
        tradingPartnerType: trade.tradingPartnerType,
        given: { type: trade.give.type, quantity: quantityGiven },
        received: { type: resourceSelected, quantity: parseInt(quantitySelected) }
      }));
      dispatch(displayModalValue(null, 'closed', null));
    }
  }

  function getResourcesArray() {
    switch(modalValue.type) {
      case RESEARCHES.STUDY:
      return researchStatus.getResourcesToStudy(vault);

      case RESEARCHES.ANALYSIS:
      return vault.getValuedResources();

      case 'Trading':
      const trade = tradingStatus.tradingPartners[modalValue.tradingPartner]
        .trades[modalValue.tradeId];
      switch(trade.receive.specificity) {
        case RESOURCE_SPECIFICITY.EXACT:
        return vault.getExactResources(trade.receive.type);

        case RESOURCE_SPECIFICITY.TAG:
        return vault.getTagResources(trade.receive.type);

        case RESOURCE_SPECIFICITY.CATEGORY:
        return vault.getCategoryResources(trade.receive.type);
      }

      default:
      return [];
    }
  }

  function calcQuantityGiven(qSelected: string) {
    if (!modalValue) { return 0; }
    if (modalValue.type == 'Trading' && resourceSelected) {
      const trade = tradingStatus.tradingPartners[modalValue.tradingPartner]
        .trades[modalValue.tradeId];
      const rResourceType = resourceTypes[resourceSelected];
      const gResourceType = resourceTypes[trade.give.type];

      if (rResourceType.value != null && gResourceType.value != null
        && (parseInt(qSelected) ? true : false)) {
        let qGiven = Math.floor((rResourceType.value * parseInt(qSelected))
          / (gResourceType.value));
        if (qGiven > trade.give.quantity) {
          qGiven = trade.give.quantity;
        }
        return qGiven;
      }
    }
    return 0;
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
