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
import Trade from '../models/trade';
import Icon from '../models/icon';
import Positioner from '../models/positioner';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESEARCHES } from '../enums/researches';
import { MODALS } from '../enums/modals';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { QUALITY_VALUES } from '../constants';
const QV = QUALITY_VALUES;

export default function ResourceSelectOneComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const modalValue: any = useTypedSelector(state => state.ui.modalValue);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const tradingStatus = useTypedSelector(state => state.tradingStatus);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let resourcesArray = getResourcesArray();

  const [resourceSelected, setResourceSelected] = useState(setStartingSelected());
  function setStartingSelected(): Resource|null {
    if (resourcesArray.length == 1) { return resourcesArray[0]; }
    return null;
  }
  function setStartingQuantityS(): string {
    if (modalValue.type == 'Trading') {
      const tPartner = tradingStatus.tradingPartners[modalValue.tradingPartner];
      if (resourcesArray.length == 1 && tPartner) {
        let tInt = tPartner.acceptQuantity;
        const key = (resourcesArray[0].type + '|' + resourcesArray[0].quality);
        if (tInt > vault.resources[key].quantity) {
          tInt = Math.floor(vault.resources[key].quantity);
        }
        return tInt.toString();
      }
    }
    return '0';
  }
  const [quantitySelected, setQuantitySelected] = useState(setStartingQuantityS());
  function setStartingQuantityG(): number {
    const selectedQuantity = setStartingQuantityS();
    return calcQuantityGiven(selectedQuantity, modalValue, resourceSelected,
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
          {renderResources(resourcesArray, setResourceSelected, setQuantitySelected,
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
    setResourceSelected:(resourceSelected: Resource|null) => void,
    setQuantitySelected: (quantity: string) => void,
    setQuantityGiven: (quantity: number) => void) {
    const tPartner = tradingStatus.tradingPartners[modalValue.tradingPartner];
    return resourceArray.map((resource) => {
      return <ResourceSelector key={(resource.type + '|' + resource.quality)}
        resource={resource} resourceSelected={resourceSelected} vault={vault}
        setResourceSelected={setResourceSelected}
        setQuantitySelected={setQuantitySelected}
        setQuantityGiven={setQuantityGiven}
        tPartner={tPartner} modalValue={modalValue}
        positioner={positioner} />;
    });
  }

  function renderQuantityInput() {
    if (modalValue.type == RESEARCHES.ANALYSIS) {
      return (
        <View style={styles.columns}>
          <View style={styles.rows}>
          <Text>{'Selecting: '}</Text>
          <TextInput style={styles.inputBox} value={quantitySelected}
            editable={(resourceSelected != null)}
            onChangeText={ (text) => setQuantitySelected(text) } />
          <Text>{' (Max 100)'}</Text>
          </View>
          <View style={styles.spacedRows}>
            {renderQuantitySelected()}
          </View>
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
              editable={(resourceSelected != null)}
              onChangeText={ (text) => changeTradeQuantity(text) } />
            <Text>{' '}</Text>
            <TouchableOpacity style={styles.buttonRowItemSmall}
              onPress={() => {
                changeTradeQuantity(Math.floor(tPartner.acceptQuantity/2).toString())
              }}>
              <Text style={styles.buttonTextSmall}>{'1/2'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spacedRows}>
            {renderQuantitySelected()}
            {renderQuantityGiven(trade)}
          </View>
        </View>
      );
    }
    return null;
  }

  function renderQuantitySelected() {
    if (!resourceSelected) { return null; }
    if (modalValue.type == RESEARCHES.ANALYSIS) {
      const resourceType = utils.getResourceType(resourceSelected);
      const { knowledge, duration } = calcAnalysis();

      return (
        <>
          <View style={styles.rows}>
            <Text>{'Gain '}</Text>
            <BadgeComponent icon={resourceTypes[RTY.KNOWLEDGE].icon} size={21} />
            <Text>{'Knowledge x' + utils.formatNumberShort(knowledge)}</Text>
          </View>
          <View style={styles.rows}>
            <Text>{' by analyzing '}</Text>
          </View>
          <View style={styles.rows}>
            <BadgeComponent icon={resourceType.icon} size={21} />
            <Text>{utils.getResourceName(resourceSelected) +' x'
              + utils.formatNumberShort(parseInt(quantitySelected))}</Text>
          </View>
          <View style={styles.rows}>
            <Text>{' for '}</Text>
            <BadgeComponent icon={new Icon({ provider: 'FontAwesome',
              name: 'clock-o', color: '#8390da' })} size={21} />
            <Text>{utils.formatDuration(duration) + '.'}</Text>
          </View>
        </>
      );
    }
    else if (modalValue.type == 'Trading' && parseInt(quantitySelected) > 0) {
      const resourceType = utils.getResourceType(resourceSelected);
      return (
        <View style={styles.rows}>
          <BadgeComponent icon={resourceType.icon} quality={resourceSelected.quality}
            size={21} />
          <Text>{' ' + utils.getResourceName(resourceSelected) + ' x'
            + utils.formatNumberShort(parseInt(quantitySelected))}</Text>
        </View>
      );
    }
    return null;
  }

  function renderQuantityGiven(trade: Trade) {
    const resourceType = resourceTypes[trade.give.type];
    const typeQuality = (trade.give.type + '|' + trade.give.quality);
    return (
      <View style={styles.rows}>
        <Text>{ ' for '}</Text>
        <BadgeComponent icon={resourceType.icon} quality={trade.give.quality}
          size={21} />
        <Text>{' ' + utils.typeQualityName(typeQuality) + ' x'
          + utils.formatNumberShort(quantityGiven)}</Text>
      </View>
    );
  }

  function changeTradeQuantity(text: string) {
    const tPartner = tradingStatus.tradingPartners[modalValue.tradingPartner];
    const trade = tPartner.trades[modalValue.tradeId];
    let tInt = parseInt(text);

    if (resourceSelected != null) {
      const key = (resourceSelected.type + '|' + resourceSelected.quality);
      if (tInt > vault.resources[key].quantity) {
        tInt = Math.floor(vault.resources[key].quantity);
      }
      if (tInt > tPartner.acceptQuantity) {
        tInt = tPartner.acceptQuantity;
      }
    }

    let pText = '0';
    if (tInt ? true : false) { pText = tInt.toString(); }
    setQuantitySelected(pText);
    setQuantityGiven(calcQuantityGiven(pText, modalValue, resourceSelected,
      tPartner));
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
    if (resourceSelected != null) {
      const resourceType = utils.getResourceType(resourceSelected);
      if (resourceType.value != null) {
        const rValue = resourceType.value * QV[resourceSelected.quality];
        const typeQuality = (resourceSelected.type + '|' + resourceSelected.quality);
        const rsIncrease = [new Resource({type: RTY.KNOWLEDGE, quality: 0,
          quantity: (rValue)})];
        const rsConsume = [new Resource({type: resourceSelected.type,
          quality: resourceSelected.quality, quantity: 1})]
        let duration = (resourceType.value / 10) * 1000;
        if (duration < 1000) { duration = 1000; }
        let timer = new Timer({
          name: RESEARCHES.STUDY,
          startedAt: new Date(Date.now()).valueOf(),
          endsAt: (new Date(Date.now()).valueOf() + duration),
          progress: 0,
          remainingLabel: '',
          resourcesToIncrease: rsIncrease,
          resourcesToConsume: rsConsume,
          messageToDisplay: ('You studied '
            + utils.getResourceName(resourceSelected) + ' for '
            + utils.formatNumberShort(rValue) + ' knowledge.'),
          iconToDisplay: resourceType.icon
        });
        dispatch(addTimer(timer));
        dispatch(studyResource(typeQuality));
        dispatch(displayModalValue(null, 'closed', null));
      }
    }
  }

  function actionAnalysis() {
    if (resourceSelected != null) {
      const resourceType = utils.getResourceType(resourceSelected);
      if (resourceType.value != null) {
        const { knowledge, duration } = calcAnalysis();
        const typeQuality = (resourceSelected.type + '|' + resourceSelected.quality);
        const rsIncrease = [new Resource({type: RTY.KNOWLEDGE, quality: 0,
          quantity: knowledge})];
        const rsConsume = [new Resource({type: resourceSelected.type,
          quality: resourceSelected.quality, quantity: parseInt(quantitySelected)})];
        let timer = new Timer({
          name: RESEARCHES.ANALYSIS,
          startedAt: new Date(Date.now()).valueOf(),
          endsAt: (new Date(Date.now()).valueOf() + duration),
          progress: 0,
          remainingLabel: '',
          resourcesToIncrease: rsIncrease,
          resourcesToConsume: rsConsume,
          messageToDisplay: ('You analyzed '
            + utils.formatNumberShort(parseInt(quantitySelected)) + ' '
            + utils.getResourceName(resourceSelected) + ' for '
            + utils.formatNumberShort(knowledge) + ' knowledge.'),
          iconToDisplay: resourceType.icon
        });
        dispatch(addTimer(timer));
        dispatch(displayModalValue(null, 'closed', null));
      }
    }
  }

  function calcAnalysis() {
    let knowledge = 0;
    let duration = 0;
    if (resourceSelected != null) {
      const resourceType = utils.getResourceType(resourceSelected);
      if (resourceType.value != null) {
        knowledge = ((resourceType.value * QV[resourceSelected.quality]
          * parseInt(quantitySelected)) / 4);
        duration = (resourceType.value * parseInt(quantitySelected) / 10) * 1000;
        if (duration < 1000) { duration = 1000; }
      }
    }
    return { knowledge, duration };
  }

  function actionTrading() {
    if (resourceSelected != null) {
      const trade = tradingStatus.tradingPartners[modalValue.tradingPartner]
        .trades[modalValue.tradeId];
      dispatch(increaseResources(vault, [new Resource({type: trade.give.type,
        quality: trade.give.quality, quantity: quantityGiven})]));
      let rc = new Resource(resourceSelected).getResourceWithoutQuantity();
      rc.quantity = parseInt(quantitySelected);
      dispatch(consumeResources(vault, [rc]));
      dispatch(completeTrade({
        id: trade.id,
        tradingPartnerType: trade.tradingPartnerType,
        given: new Resource({ type: trade.give.type, quality: trade.give.quality,
          quantity: quantityGiven }),
        received: new Resource({ type: resourceSelected.type,
          quality: resourceSelected.quality,
          quantity: parseInt(quantitySelected) })
      }));
      dispatch(displayModalValue(null, 'closed', null));
    }
  }

  function actionSetEating() {
    if (resourceSelected != null) {
      const typeQuality = (resourceSelected.type + '|' + resourceSelected.quality);
      dispatch(setEating(modalValue.leader, typeQuality));
      dispatch(displayModalValue(null, 'closed', null));
    }
  }

  function actionSetDrinking() {
    if (resourceSelected != null) {
      const typeQuality = (resourceSelected.type + '|' + resourceSelected.quality);
      dispatch(setDrinking(modalValue.leader, typeQuality));
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
  resourceSelected: Resource|null, tPartner: TradingPartner) {
  if (!modalValue) { return 0; }
  if (modalValue.type == 'Trading' && resourceSelected) {
    const trade = tPartner.trades[modalValue.tradeId];
    const rResourceType = utils.getResourceType(resourceSelected);
    const gResourceType = resourceTypes[trade.give.type];

    if (rResourceType.value != null && gResourceType.value != null
      && (parseInt(qSelected) ? true : false)) {
      let qGiven = Math.floor((rResourceType.value * QV[resourceSelected.quality]
        * parseInt(qSelected)) / (gResourceType.value * QV[trade.give.quality]));
      return qGiven;
    }
  }
  return 0;
}

function ResourceSelector(props: {resource: Resource, resourceSelected: Resource|null,
  vault: Vault, modalValue: any,  tPartner: TradingPartner,
  setResourceSelected: (resourceSelected: Resource|null) => void,
  setQuantitySelected: (quantity: string) => void,
  setQuantityGiven: (quantity: number) => void,
  positioner: Positioner}) {
  const resourceType = utils.getResourceType(props.resource);
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
            {utils.formatNumberShort(props.resource.quantity)}
          </Text>
          {renderButton(props.resource, props.resourceSelected,
            props.vault, props.tPartner, props.modalValue,
            props.setResourceSelected, props.setQuantitySelected,
            props.setQuantityGiven)}
        </View>
      </View>
    </View>
  );

  function renderButton(resource: Resource, resourceSelected: Resource|null,
    vault: Vault, tPartner: TradingPartner, modalValue: any,
    setResourceSelected: (resourceSelected: Resource|null) => void,
    setQuantitySelected: (quantity: string) => void,
    setQuantityGiven: (quantity: number) => void) {

    if (resourceSelected) {
      if (resourceSelected.type == resource.type
        && resourceSelected.quality == resource.quality) {
        let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, { width: 74 }]);
        return (
          <TouchableOpacity style={buttonStyle}
            onPress={() => {typeQualityUnSelect(setResourceSelected,
            setQuantitySelected, setQuantityGiven)}} >
            <Text style={styles.buttonText}>{'Selected'}</Text>
          </TouchableOpacity>
        );
      }
    }
    let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, styles.buttonLight,
      { width: 74 }]);
    return (
      <TouchableOpacity style={buttonStyle}
      onPress={() => {typeQualitySelect(resource, tPartner, modalValue,
        setResourceSelected, setQuantitySelected, setQuantityGiven)}} >
        <Text style={StyleSheet.flatten([styles.buttonText,
          styles.buttonTextDark])}>{'Select'}</Text>
      </TouchableOpacity>
    );
  }

  function typeQualityUnSelect(setResourceSelected:
    (resourceSelected: Resource|null) => void,
    setQuantitySelected: (quantity: string) => void,
    setQuantityGiven: (quantity: number) => void) {
    setResourceSelected(null);
    setQuantitySelected('0');
    setQuantityGiven(0);
  }
  function typeQualitySelect(resource: Resource, tPartner: TradingPartner,
    modalValue: any,
    setResourceSelected: (resourceSelected: Resource|null) => void,
    setQuantitySelected: (quantity: string) => void,
    setQuantityGiven: (quantity: number) => void
  ) {
    setResourceSelected(resource);
    if (tPartner) {
      const qSelected = tPartner.acceptQuantity.toString();
      setQuantitySelected(qSelected);
      setQuantityGiven(calcQuantityGiven(qSelected, modalValue, resource, tPartner));
    }
    if (modalValue.type == RESEARCHES.ANALYSIS) {
      const typeQuality = resource.type + '|' + resource.quality;
      let quantity = Math.floor(props.vault.resources[typeQuality].quantity);
      if (quantity > 100) { quantity = 100; }
      setQuantitySelected(quantity.toString());
    }
  }
}
