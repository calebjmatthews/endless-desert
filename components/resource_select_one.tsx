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
import { SET_EATING, setEating, SET_DRINKING, setDrinking } from '../actions/leaders';

import Resource from '../models/resource';
import ResourceType from '../models/resource_type';
import Vault from '../models/vault';
import Timer from '../models/timer';
import TradingPartner from '../models/trading_partner';
import Positioner from '../models/positioner';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { RESEARCHES } from '../enums/researches';
import { MODALS } from '../enums/modals';
import { RESOURCE_TAGS } from '../enums/resource_tags';

const VALUES = [1, 4, 16];

export default function ResourceSelectOneComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const modalValue: any = useTypedSelector(state => state.ui.modalValue);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const tradingStatus = useTypedSelector(state => state.tradingStatus);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let resourcesArray = getResourcesArray();

  function setStartingSelected(): string|null {
    if (resourcesArray.length == 1) {
      return (resourcesArray[0].type + '|' + resourcesArray[0].quality);
    }
    return null;
  }
  const [typeQualitySelected, setTypeQualitySelected] = useState(setStartingSelected());
  function setStartingQuantityS(): string {
    const tPartner = tradingStatus.tradingPartners[modalValue.tradingPartner];
    if (resourcesArray.length == 1) {
      let tInt = tPartner.acceptQuantity;
      const key = (resourcesArray[0].type + '|' + resourcesArray[0].quality);
      if (tInt > vault.resources[key].quantity) {
        tInt = Math.floor(vault.resources[key].quantity);
      }
      return tInt.toString();
    }
    return '0';
  }
  const [quantitySelected, setQuantitySelected] = useState(setStartingQuantityS());
  function setStartingQuantityG(): number {
    const selectedQuantity = setStartingQuantityS();
    return calcQuantityGiven(selectedQuantity, modalValue, typeQualitySelected,
      tradingStatus.tradingPartners[modalValue.tradingPartner]);
  }
  const [quantityGiven, setQuantityGiven] = useState(setStartingQuantityG());

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome" name="cube" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Select Resource'}</Text>
      </View>
      <ScrollView>
        <View style={styles.tileContainer}>
          {renderResources(resourcesArray, setTypeQualitySelected, setQuantitySelected,
            setQuantityGiven)}
        </View>
      </ScrollView>
      <View style={StyleSheet.flatten([styles.panelFlexColumn,
        {minWidth: positioner.majorWidth,
          maxWidth: positioner.majorWidth}])}>
        {renderQuantityInput()}
        <View style={styles.buttonRow}>
          {renderSubmitButton()}
        </View>
      </View>
    </View>
  );

  function renderResources(resourceArray: Resource[],
    setTypeQualitySelected:(typeQuality: string|null) => void,
    setQuantitySelected: (quantity: string) => void,
    setQuantityGiven: (quantity: number) => void) {
    const tPartner = tradingStatus.tradingPartners[modalValue.tradingPartner];
    return resourceArray.map((resource) => {
      return <ResourceSelector key={(resource.type + '|' + resource.quality)}
        resource={resource} typeQualitySelected={typeQualitySelected} vault={vault}
        setTypeQualitySelected={setTypeQualitySelected}
        setQuantitySelected={setQuantitySelected}
        setQuantityGiven={setQuantityGiven}
        tPartner={tPartner} modalValue={modalValue}
        positioner={positioner} />;
    });
  }

  function renderQuantityInput() {
    if (modalValue.type == RESEARCHES.ANALYSIS) {
      return (
        <View style={styles.rows}>
          <Text>{'Selecting: '}</Text>
          <TextInput style={styles.inputBox} value={quantitySelected}
            editable={(typeQualitySelected != null)}
            onChangeText={ (text) => setQuantitySelected(text) } />
        </View>
      );
    }
    else if (modalValue.type == 'Trading') {
      const tPartner = tradingStatus.tradingPartners[modalValue.tradingPartner];
      const trade = tPartner.trades[modalValue.tradeId];
      return (
        <View style={styles.columns}>
          <View style={styles.spacedRows}>
            <Text>{'Offer: '}</Text>
            <TextInput style={styles.inputBox} value={quantitySelected}
              editable={(typeQualitySelected != null)}
              onChangeText={ (text) => changeTradeQuantity(text) } />
            <Text>{' '}</Text>
            <TouchableOpacity style={styles.buttonRowItemSmall}
              onPress={() => {
                changeTradeQuantity(Math.floor(tPartner.acceptQuantity/2).toString())
              }}>
              <Text style={styles.buttonTextSmall}>{'1/2'}</Text>
            </TouchableOpacity>
          </View>
          <Text>{utils.formatNumberShort(parseInt(quantitySelected)) + ' '
            + utils.typeQualityName(typeQualitySelected)  + ' for '
            + utils.formatNumberShort(quantityGiven)
            + ' ' + trade.give.type }</Text>
        </View>
      );
    }
    return null;
  }

  function changeTradeQuantity(text: string) {
    const tPartner = tradingStatus.tradingPartners[modalValue.tradingPartner];
    const trade = tPartner.trades[modalValue.tradeId];
    let tInt = parseInt(text);

    if (typeQualitySelected != null) {
      if (tInt > vault.resources[typeQualitySelected].quantity) {
        tInt = Math.floor(vault.resources[typeQualitySelected].quantity);
      }
      if (tInt > tPartner.acceptQuantity) {
        tInt = tPartner.acceptQuantity;
      }
    }

    let pText = '0';
    if (tInt ? true : false) { pText = tInt.toString(); }
    setQuantitySelected(pText);
    setQuantityGiven(calcQuantityGiven(pText, modalValue, typeQualitySelected,
      tPartner));
  }

  function renderSubmitButton() {
    let isDisabled = false;
    let buttonStyle: any = StyleSheet.flatten([styles.buttonLarge,
      styles.buttonRowItem]);
    if (typeQualitySelected == null) {
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

      case MODALS.LEADER_DETAIL:
      if (modalValue.subType == SET_EATING) {
        actionSetEating();
      }
      else if (modalValue.subType == SET_DRINKING) {
        actionSetDrinking();
      }
      break;
    }
  }

  function actionStudy() {
    if (typeQualitySelected != null) {
      const tsSplit = typeQualitySelected.split('|');
      const resourceType = resourceTypes[tsSplit[0]];
      if (resourceType.value != null) {
        const rValue = resourceType.value * VALUES[parseInt(tsSplit[1])];
        let rsIncrease = [{type: RESOURCE_TYPES.KNOWLEDGE, quality: 0,
          quantity: (rValue)}];
        let duration = (resourceType.value / 10) * 1000;
        if (duration < 1000) { duration = 1000; }
        let timer = new Timer({
          name: RESEARCHES.STUDY,
          startedAt: new Date(Date.now()).valueOf(),
          endsAt: (new Date(Date.now()).valueOf() + duration),
          progress: 0,
          remainingLabel: '',
          resourcesToIncrease: rsIncrease,
          resourcesToConsume: [{type: tsSplit[0], quality: parseInt(tsSplit[1]),
            quantity: 1}],
          messageToDisplay: ('You studied '
            + utils.typeQualityName(typeQualitySelected) + ' for '
            + utils.formatNumberShort(rValue) + ' knowledge.'),
          iconToDisplay: resourceType.icon,
          iconForegroundColor: resourceType.foregroundColor,
          iconBackgroundColor: resourceType.backgroundColor
        });
        dispatch(addTimer(timer));
        dispatch(studyResource(typeQualitySelected));
        dispatch(displayModalValue(null, 'closed', null));
      }
    }
  }

  function actionAnalysis() {
    if (typeQualitySelected != null) {
      const tqSplit = typeQualitySelected.split('|');
      const resourceType = resourceTypes[tqSplit[0]];
      if (resourceType.value != null) {
        let rValue = ((resourceType.value * VALUES[parseInt(tqSplit[1])]
          * parseInt(quantitySelected)) / 4);
        console.log('rValue');
        console.log(rValue);
        let rsIncrease = [{type: RESOURCE_TYPES.KNOWLEDGE, quality: 0,
          quantity: rValue}];
        let duration = (resourceType.value * parseInt(quantitySelected) / 10) * 1000;
        if (duration < 1000) { duration = 1000; }
        let timer = new Timer({
          name: RESEARCHES.ANALYSIS,
          startedAt: new Date(Date.now()).valueOf(),
          endsAt: (new Date(Date.now()).valueOf() + duration),
          progress: 0,
          remainingLabel: '',
          resourcesToIncrease: rsIncrease,
          resourcesToConsume: [{type: tqSplit[0], quality: parseInt(tqSplit[1]),
            quantity: parseInt(quantitySelected)}],
          messageToDisplay: ('You analyzed '
            + utils.formatNumberShort(parseInt(quantitySelected)) + ' '
            + utils.typeQualityName(typeQualitySelected) + ' for '
            + utils.formatNumberShort(rValue) + ' knowledge.'),
          iconToDisplay: resourceType.icon,
          iconForegroundColor: resourceType.foregroundColor,
          iconBackgroundColor: resourceType.backgroundColor
        });
        dispatch(addTimer(timer));
        dispatch(studyResource(typeQualitySelected));
        dispatch(displayModalValue(null, 'closed', null));
      }
    }
  }

  function actionTrading() {
    if (typeQualitySelected != null) {
      const trade = tradingStatus.tradingPartners[modalValue.tradingPartner]
        .trades[modalValue.tradeId];
      const tqSplit = typeQualitySelected.split('|');
      dispatch(increaseResources(vault, [{type: trade.give.type,
        quality: trade.give.quality, quantity: quantityGiven}]));
      dispatch(consumeResources(vault, [{type: tqSplit[0],
        quality: parseInt(tqSplit[1]), quantity: parseInt(quantitySelected)}]));
      dispatch(completeTrade({
        id: trade.id,
        tradingPartnerType: trade.tradingPartnerType,
        given: { type: trade.give.type, quality: trade.give.quality,
          quantity: quantityGiven },
        received: { type: tqSplit[0], quality: parseInt(tqSplit[1]),
          quantity: parseInt(quantitySelected) }
      }));
      dispatch(displayModalValue(null, 'closed', null));
    }
  }

  function actionSetEating() {
    if (typeQualitySelected != null) {
      dispatch(setEating(modalValue.leader, typeQualitySelected));
      dispatch(displayModalValue(null, 'closed', null));
    }
  }

  function actionSetDrinking() {
    if (typeQualitySelected != null) {
      dispatch(setDrinking(modalValue.leader, typeQualitySelected));
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

        case RESOURCE_SPECIFICITY.SUBCATEGORY:
        return vault.getSubcategoryResources(trade.receive.type);

        case RESOURCE_SPECIFICITY.CATEGORY:
        return vault.getCategoryResources(trade.receive.type);
      }

      case MODALS.LEADER_DETAIL:
      if (modalValue.subType == SET_EATING) {
        return vault.getTagResources(RESOURCE_TAGS.FOOD);
      }
      else if (modalValue.subType == SET_DRINKING) {
        return vault.getTagResources(RESOURCE_TAGS.DRINK);
      }

      default:
      return [];
    }
  }
}

function calcQuantityGiven(qSelected: string, modalValue: any,
  typeQualitySelected: string|null, tPartner: TradingPartner) {
  if (!modalValue) { return 0; }
  if (modalValue.type == 'Trading' && typeQualitySelected) {
    const trade = tPartner.trades[modalValue.tradeId];
    const tqSplit = typeQualitySelected.split('|');
    const rResourceType = resourceTypes[tqSplit[0]];
    const gResourceType = resourceTypes[trade.give.type];

    if (rResourceType.value != null && gResourceType.value != null
      && (parseInt(qSelected) ? true : false)) {
      let qGiven = Math.floor((rResourceType.value * VALUES[parseInt(tqSplit[1])]
        * parseInt(qSelected)) / (gResourceType.value * VALUES[trade.give.quality]));
      return qGiven;
    }
  }
  return 0;
}

function ResourceSelector(props: {resource: Resource,
  typeQualitySelected: string|null,
  vault: Vault, modalValue: any, tPartner: TradingPartner,
  setTypeQualitySelected: (typeQuality: string|null) => void,
  setQuantitySelected: (quantity: string) => void,
  setQuantityGiven: (quantity: number) => void,
  positioner: Positioner}) {
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
          iconSize={18}
          quality={props.resource.quality} />
        <View>
          <Text style={{paddingLeft: 4, paddingRight: 4, textAlign: 'right'}}>
            {utils.formatNumberShort(props.resource.quantity)}
          </Text>
          {renderButton(props.resource, props.typeQualitySelected,
            props.vault, props.tPartner, props.modalValue,
            props.setTypeQualitySelected, props.setQuantitySelected,
            props.setQuantityGiven)}
        </View>
      </View>
    </View>
  );

  function renderButton(resource: Resource, typeQualitySelected: string|null,
    vault: Vault, tPartner: TradingPartner, modalValue: any,
    setTypeQualitySelected: (typeQuality: string|null) => void,
    setQuantitySelected: (quantity: string) => void,
    setQuantityGiven: (quantity: number) => void) {

    if (typeQualitySelected == (resource.type + '|' + resource.quality)) {
      let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, { width: 74 }]);
      return (
        <TouchableOpacity style={buttonStyle}
          onPress={() => {typeQualityUnSelect(setTypeQualitySelected,
          setQuantitySelected, setQuantityGiven)}} >
          <Text style={styles.buttonText}>{'Selected'}</Text>
        </TouchableOpacity>
      );
    }
    let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, styles.buttonLight,
      { width: 74 }]);
    return (
      <TouchableOpacity style={buttonStyle}
      onPress={() => {typeQualitySelect(resource, tPartner, modalValue,
        setTypeQualitySelected, setQuantitySelected, setQuantityGiven)}} >
        <Text style={StyleSheet.flatten([styles.buttonText,
          styles.buttonTextDark])}>{'Select'}</Text>
      </TouchableOpacity>
    );
  }

  function typeQualityUnSelect(setTypeQualitySelected: (typeQuality: string|null) => void,
    setQuantitySelected: (quantity: string) => void,
    setQuantityGiven: (quantity: number) => void) {
    setTypeQualitySelected(null);
    setQuantitySelected('0');
    setQuantityGiven(0);
  }
  function typeQualitySelect(resource: Resource, tPartner: TradingPartner,
    modalValue: any,
    setTypeQualitySelected: (typeQuality: string|null) => void,
    setQuantitySelected: (quantity: string) => void,
    setQuantityGiven: (quantity: number) => void
  ) {
    const key = (resource.type + '|' + resource.quality);
    const qSelected = tPartner.acceptQuantity.toString();
    setTypeQualitySelected(key);
    setQuantitySelected(qSelected);
    setQuantityGiven(calcQuantityGiven(qSelected, modalValue, key, tPartner));
  }
}
