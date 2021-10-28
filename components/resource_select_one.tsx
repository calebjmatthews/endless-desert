import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
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
import TradingPartnerVisit from '../models/trading_partner_visit';
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
      const tpVisit = tradingStatus.tradingPartnerVisits[modalValue.tradingPartner];
      if (resourcesArray.length == 1 && tpVisit) {
        let tInt = tpVisit.acceptQuantity;
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
      tradingStatus.tradingPartnerVisits[modalValue.tradingPartner]);
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
    const tpVisit = tradingStatus.tradingPartnerVisits[modalValue.tradingPartner];
    return resourceArray.map((resource) => {
      return <ResourceSelector key={(resource.type + '|' + resource.quality)}
        resource={resource} resourceSelected={resourceSelected} vault={vault}
        setResourceSelected={setResourceSelected}
        setQuantitySelected={setQuantitySelected}
        setQuantityGiven={setQuantityGiven}
        tpVisit={tpVisit} modalValue={modalValue}
        positioner={positioner} />;
    });
  }

  function renderQuantityInput() {
    if (modalValue.type == RESEARCHES.STUDY) {
      return (
        <View style={styles.spacedRows}>
          {renderQuantitySelected()}
        </View>
      );
    }
    else if (modalValue.type == RESEARCHES.ANALYSIS) {
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
      const tpVisit = tradingStatus.tradingPartnerVisits[modalValue.tradingPartner];
      const trade = tpVisit.trades[modalValue.tradeId];
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
                changeTradeQuantity(Math.floor(tpVisit.acceptQuantity/2).toString())
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
    if (modalValue.type == RESEARCHES.STUDY) {
      const resourceType = utils.getResourceType(resourceSelected);
      const { knowledge, duration } = calcStudy();

      return (
        <>
          <View style={styles.rows}>
            <Text>{'Gain '}</Text>
            <BadgeComponent icon={resourceTypes[RTY.KNOWLEDGE].icon} size={21} />
            <Text>{'Knowledge x' + utils.formatNumberShort(knowledge)}</Text>
          </View>
          <View style={styles.rows}>
            <Text>{' by studying '}</Text>
          </View>
          <View style={styles.rows}>
            <BadgeComponent icon={resourceType.icon} size={21} />
            <Text>{utils.getResourceName(resourceSelected)}</Text>
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
    else if (modalValue.type == RESEARCHES.ANALYSIS) {
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
    const resource = vault.resources[typeQuality];
    const name = resource ? utils.getResourceName(resource)
      : utils.typeQualityName(typeQuality);
    return (
      <View style={styles.rows}>
        <Text>{ ' for '}</Text>
        <BadgeComponent icon={resourceType.icon} quality={trade.give.quality}
          size={21} />
        <Text>{' ' + name + ' x' + utils.formatNumberShort(quantityGiven)}</Text>
      </View>
    );
  }

  function changeTradeQuantity(text: string) {
    const tpVisit = tradingStatus.tradingPartnerVisits[modalValue.tradingPartner];
    const trade = tpVisit.trades[modalValue.tradeId];
    let tInt = parseInt(text);

    if (resourceSelected != null) {
      const key = (resourceSelected.type + '|' + resourceSelected.quality);
      if (tInt > vault.resources[key].quantity) {
        tInt = Math.floor(vault.resources[key].quantity);
      }
      if (tInt > tpVisit.acceptQuantity) {
        tInt = tpVisit.acceptQuantity;
      }
    }

    let pText = '0';
    if (tInt ? true : false) { pText = tInt.toString(); }
    setQuantitySelected(pText);
    setQuantityGiven(calcQuantityGiven(pText, modalValue, resourceSelected,
      tpVisit));
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
        const { knowledge, duration } = calcStudy();
        const typeQuality = (resourceSelected.type.split('-')[0] + '|'
          + resourceSelected.quality);
        const rsIncrease = [new Resource({type: RTY.KNOWLEDGE, quality: 0,
          quantity: (knowledge)})];
        const rsConsume = [new Resource({...resourceSelected, quantity: 1})]
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
            + utils.formatNumberShort(knowledge) + ' knowledge.'),
          iconToDisplay: resourceType.icon
        });
        dispatch(addTimer(timer));
        dispatch(studyResource(typeQuality));
        dispatch(displayModalValue(null, 'closed', null));
      }
    }
  }

  function calcStudy() {
    let knowledge = 0;
    let duration = 0;
    if (resourceSelected != null) {
      const resourceType = utils.getResourceType(resourceSelected);
      knowledge = resourceType.value * QV[resourceSelected.quality];
      duration = (knowledge / Math.pow(2, Math.log10(knowledge))) * 1000;
      if (duration < 1000) { duration = 1000; }
    }
    return { knowledge, duration };
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
        duration = ((knowledge / Math.pow(2, Math.log10(knowledge))) * 1.5) * 1000;
        if (duration < 1000) { duration = 1000; }
      }
    }
    return { knowledge, duration };
  }

  function actionTrading() {
    if (resourceSelected != null) {
      const trade = tradingStatus.tradingPartnerVisits[modalValue.tradingPartner]
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
      dispatch(displayModalValue(MODALS.LEADER_DETAIL, 'open', modalValue.leader));
    }
  }

  function actionSetDrinking() {
    if (resourceSelected != null) {
      const typeQuality = (resourceSelected.type + '|' + resourceSelected.quality);
      dispatch(setDrinking(modalValue.leader, typeQuality));
      dispatch(displayModalValue(MODALS.LEADER_DETAIL, 'open', modalValue.leader));
    }
  }

  function getResourcesArray() {
    switch(modalValue.type) {
      case RESEARCHES.STUDY:
      return rSort(filterOutZero(researchStatus.getResourcesToStudy(vault)));

      case RESEARCHES.ANALYSIS:
      return rSort(filterOutZero(vault.getStudyableResources()));

      case 'Trading':
      const trade = tradingStatus.tradingPartnerVisits[modalValue.tradingPartner]
        .trades[modalValue.tradeId];
      switch(trade.receive.specificity) {
        case RESOURCE_SPECIFICITY.EXACT:
        return rSort(filterOutZero(vault.getExactResources(trade.receive.type)));

        case RESOURCE_SPECIFICITY.TAG:
        return rSort(filterOutZero(vault.getTagResources(trade.receive.type)));

        case RESOURCE_SPECIFICITY.SUBCATEGORY:
        return rSort(filterOutZero(vault.getSubcategoryResources(trade.receive.type)));

        case RESOURCE_SPECIFICITY.CATEGORY:
        return rSort(filterOutZero(vault.getCategoryResources(trade.receive.type)));
      }

      case MODALS.LEADER_DETAIL:
      if (modalValue.subType == SET_EATING) {
        return rSort(filterOutZero(vault.getTagResources(RESOURCE_TAGS.FOOD)));
      }
      else if (modalValue.subType == SET_DRINKING) {
        return rSort(filterOutZero(vault.getTagResources(RESOURCE_TAGS.DRINK)));
      }

      default:
      return [];
    }

    function filterOutZero(resources: Resource[]) {
      return resources.filter((resource) => {
        if (Math.floor(resource.quantity) >= 1) { return resource; }
      });
    }

    function rSort(resources: Resource[]) {
      return resources.sort((a, b) => {
        if (Math.floor(a.quantity) != Math.floor(b.quantity)) {
          return b.quantity - a.quantity;
        }
        const aType = utils.getResourceType(a);
        const bType = utils.getResourceType(b);
        return aType.value - bType.value;
      });
    }
  }
}

function calcQuantityGiven(qSelected: string, modalValue: any,
  resourceSelected: Resource|null, tpVisit: TradingPartnerVisit) {
  if (!modalValue) { return 0; }
  if (modalValue.type == 'Trading' && resourceSelected) {
    const trade = tpVisit.trades[modalValue.tradeId];
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
  vault: Vault, modalValue: any,  tpVisit: TradingPartnerVisit,
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
        {utils.getResourceName(props.resource)}
      </Text>
      <View style={styles.rows}>
        <BadgeComponent icon={resourceType.icon} quality={props.resource.quality}
          size={21} />
        <View>
          <Text style={{paddingLeft: 4, paddingRight: 4, textAlign: 'right'}}>
            {utils.formatNumberShort(props.resource.quantity)}
          </Text>
          {renderButton(props.resource, props.resourceSelected,
            props.vault, props.tpVisit, props.modalValue,
            props.setResourceSelected, props.setQuantitySelected,
            props.setQuantityGiven)}
        </View>
      </View>
    </View>
  );

  function renderButton(resource: Resource, resourceSelected: Resource|null,
    vault: Vault, tpVisit: TradingPartnerVisit, modalValue: any,
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
      onPress={() => {typeQualitySelect(resource, tpVisit, modalValue,
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
  function typeQualitySelect(resource: Resource, tpVisit: TradingPartnerVisit,
    modalValue: any,
    setResourceSelected: (resourceSelected: Resource|null) => void,
    setQuantitySelected: (quantity: string) => void,
    setQuantityGiven: (quantity: number) => void
  ) {
    setResourceSelected(resource);
    const typeQuality = resource.type + '|' + resource.quality;
    let quantity = Math.floor(props.vault.resources[typeQuality].quantity);
    if (tpVisit) {
      if (quantity > tpVisit.acceptQuantity) { quantity = tpVisit.acceptQuantity; }
      setQuantitySelected(quantity.toString());
      setQuantityGiven(calcQuantityGiven(quantity.toString(), modalValue, resource,
        tpVisit));
    }
    if (modalValue.type == RESEARCHES.ANALYSIS) {
      if (quantity > 100) { quantity = 100; }
      setQuantitySelected(quantity.toString());
    }
  }
}
