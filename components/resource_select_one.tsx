import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, TextInput }
  from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import SvgComponent from './svg';
import IconComponent from './icon';
import { displayModalValue } from '../actions/ui';
import { consumeResources, increaseResources } from '../actions/vault';
import { studyResource } from '../actions/research_status';
import { completeTrade } from '../actions/trading_status';
import { addTimer } from '../actions/timers';
import { SET_EATING, SET_DRINKING, setLeader } from '../actions/leaders';
import { addToActivityQueue } from '../actions/quest_status';
import { setRates } from '../actions/rates';
import { DISPLAY_TREASURE, displayTreasure } from '../actions/account';

import Resource from '../models/resource';
import Vault from '../models/vault';
import Timer from '../models/timer';
import TradingPartnerVisit from '../models/trading_partner_visit';
import Trade from '../models/trade';
import Icon from '../models/icon';
import QuestActivity from '../models/quest_activity';
import Hourglass from '../models/hourglass';
import Positioner from '../models/positioner';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESEARCHES } from '../enums/researches';
import { MODALS } from '../enums/modals';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { ACTIVITIES } from '../enums/activities';
import { QUALITY_VALUES, ANALYSIS_TREASURES_KNOWLEDGE, ANALYSIS_TREASURES_SPEED } from '../constants';
const QV = QUALITY_VALUES;
import { EQUIPMENT_SLOTS } from '../enums/equipment_slots';
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
import { RESEARCH_OPTION_ACTIONS } from '../enums/research_option_actions';

export default function ResourceSelectOneComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const leaders = useTypedSelector(state => state.leaders);
  const equipment = useTypedSelector(state => state.equipment);
  const buildings = useTypedSelector(state => state.buildings);
  const modalValue: any = useTypedSelector(state => state.ui.modalValue);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const tradingStatus = useTypedSelector(state => state.tradingStatus);
  const treasuresDisplayed = useTypedSelector(state => state.account.treasuresDisplayed);
  const treasureEffects = useTypedSelector(state => state.account.treasureEffects);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let resourcesArray = getResourcesArray();

  const [resourceSelected, setResourceSelected] = useState(setStartingSelected());
  function setStartingSelected(): Resource|null {
    if (resourcesArray.length == 1) { return resourcesArray[0]; }
    return null;
  }
  function setStartingQuantityS(): string {
    if (modalValue.type == 'Trading') {
      const visit = tradingStatus.visits[modalValue.slot];
      if (resourcesArray.length == 1 && visit) {
        let tInt = visit.acceptQuantity;
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
    const visit = tradingStatus.visits[modalValue.slot];
    if (visit !== null) {
      return calcQuantityGiven(selectedQuantity, modalValue, resourceSelected, visit);
    }
    return 0;
  }
  const [quantityGiven, setQuantityGiven] = useState(setStartingQuantityG());
  const titleMap: { [type: string] : string } = {
    Trading: ' Select Resource to Trade',
    [DISPLAY_TREASURE]: ' Display New Treasure'
  }
  let descriptionBand: JSX.Element|null = null;
  if (modalValue.type === 'Trading') {
    const visit = tradingStatus.visits[modalValue.slot];
    const mult = visit?.trades[modalValue.tradeId].multiplier || 0;
    let color = '#bbb';
    if (mult < 1) { color = '#ff0024'; }
    else if (mult > 1) { color = '#427bff'; }
    descriptionBand = (
      <Text style={[styles.descriptionBandText, {fontSize: 12}]}>
        {'This trade is '}
        <Text style={{color}}>
          {`${Math.abs(Math.round((mult-1) * 100))}% ${(mult >= 1) ? 'more' : 'less'} favorable`}
        </Text>
        {' than average.'}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome" name="cube" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>
          {titleMap[modalValue.type] || ' Select Resource'}
        </Text>
      </View>
      {descriptionBand && (
        <View style={[styles.descriptionBand,
          {minWidth: positioner.modalWidth, maxWidth: positioner.modalWidth}]}>
          {descriptionBand}
        </View>
      )}
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
    const visit = tradingStatus.visits[modalValue.slot];
    if (visit === null) { return null; }
    return resourceArray.map((resource) => {
      return <ResourceSelector key={(resource.type + '|' + resource.quality)}
        resource={resource} resourceSelected={resourceSelected} vault={vault}
        analysisMax={researchStatus.getAnalysisMax(treasuresDisplayed)}
        setResourceSelected={setResourceSelected} 
        setQuantitySelected={setQuantitySelected} setQuantityGiven={setQuantityGiven} 
        visit={visit} modalValue={modalValue} positioner={positioner} />;
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
          <Text>{` (Max ${researchStatus.getAnalysisMax(treasuresDisplayed)})`}</Text>
          </View>
          <View style={styles.spacedRows}>
            {renderQuantitySelected()}
          </View>
        </View>
      );
    }
    else if (modalValue.type == 'Trading') {
      const visit = tradingStatus.visits[modalValue.slot];
      if (visit === null) { return null; }
      const trade = visit.trades[modalValue.tradeId];
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
                changeTradeQuantity(Math.floor(visit.acceptQuantity/2).toString())
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
      const { knowledge, duration } = calcExamination(RESEARCHES.STUDY, treasuresDisplayed);

      return (
        <>
          <View style={styles.rows}>
            <Text>{'Gain '}</Text>
            <SvgComponent icon={new Icon({...resourceTypes[RTY.KNOWLEDGE].icon, size: 21})} />
            <Text>{' Knowledge x' + utils.formatNumberShort(knowledge)}</Text>
          </View>
          <View style={styles.rows}>
            <Text>{' by studying '}</Text>
          </View>
          <View style={styles.rows}>
            <SvgComponent icon={new Icon({...resourceType.icon, size: 21})} />
            <Text>{' ' + utils.getResourceName(resourceSelected)}</Text>
          </View>
          <View style={styles.rows}>
            <Text>{' for '}</Text>
            <IconComponent provider='FontAwesome' name='clock-o' color='#8390da' size={21} />
            <Text>{' ' + utils.formatDuration(duration) + '.'}</Text>
          </View>
        </>
      );
    }
    else if (modalValue.type == RESEARCHES.ANALYSIS) {
      const resourceType = utils.getResourceType(resourceSelected);
      const { knowledge, duration } = calcExamination(RESEARCHES.ANALYSIS, treasuresDisplayed);
      const costs = getAnalysisCost(treasuresDisplayed);

      return (
        <>
          <View style={styles.rows}>
            <Text>{'Gain '}</Text>
            <SvgComponent icon={new Icon({...resourceTypes[RTY.KNOWLEDGE].icon, size: 21})} />
            <Text>{' Knowledge x' + utils.formatNumberShort(knowledge)}</Text>
          </View>
          <View style={styles.rows}>
            <Text>{' by analyzing '}</Text>
          </View>
          <View style={styles.rows}>
            <SvgComponent icon={new Icon({...resourceType.icon, size: 21})} />
            <Text>{' ' + utils.getResourceName(resourceSelected) +' x'
              + utils.formatNumberShort(parseInt(quantitySelected))}</Text>
          </View>
          <View style={styles.rows}>
            <Text>{' for '}</Text>
          </View>
          {costs.map((cost, index) => {
            const costResourceType = utils.getResourceType(cost);
            return (
              <View key={`analysis-${cost.type}`} style={styles.rows}>
                <SvgComponent icon={new Icon({...costResourceType.icon, size: 21})} />
                <Text>{' ' + utils.getResourceName(cost) +' x'
                  + utils.formatNumberShort(cost.quantity)}</Text>
                {(index < costs.length-1) && (
                  <Text>{`, `}</Text>
                )}
                {(costs.length === 1) && (
                  <Text>{` and `}</Text>
                )}
                {(costs.length > 1 && index === costs.length-1) && (
                  <Text>{`, and `}</Text>
                )}
              </View>
            );
          })}
          <View style={styles.rows}>
            <IconComponent provider='FontAwesome' name='clock-o' color='#8390da' size={21} />
            <Text>{' ' + utils.formatDuration(duration) + '.'}</Text>
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
    const visit = tradingStatus.visits[modalValue.slot];
    if (visit !== null) {
      const trade = visit.trades[modalValue.tradeId];
      let tInt = parseInt(text);

      if (resourceSelected != null) {
        const key = (resourceSelected.type + '|' + resourceSelected.quality);
        if (tInt > vault.resources[key].quantity) {
          tInt = Math.floor(vault.resources[key].quantity);
        }
        if (tInt > visit.acceptQuantity) {
          tInt = visit.acceptQuantity;
        }
      }

      let pText = '0';
      if (tInt ? true : false) { pText = tInt.toString(); }
      setQuantitySelected(pText);
      setQuantityGiven(calcQuantityGiven(pText, modalValue, resourceSelected,
        visit));
    }
  }

  function renderSubmitButton() {
    let isDisabled = false;
    let buttonStyle: any = StyleSheet.flatten([styles.buttonLarge,
      styles.buttonRowItem]);
    let label = ' Go';
    if (resourceSelected == null) {
      isDisabled = true;
    }
    else if (modalValue.type === RESEARCHES.ANALYSIS) {
      const costs = getAnalysisCost(treasuresDisplayed);
      costs.forEach((cost) => {
        if (vault.resources[`${cost.type}|${cost.quality}`].quantity < cost.quantity) {
          isDisabled = true;
          label = ` Missing ${cost.type}`;
        }
      })
    }
    if (isDisabled) {
      buttonStyle = StyleSheet.flatten([styles.buttonLarge,
        styles.buttonRowItem, styles.buttonDisabled]);
    }
    return (
      <TouchableOpacity style={buttonStyle}
        disabled={isDisabled}
        onPress={() => {submit()}} >
        <IconComponent provider="FontAwesome5" name="check-square" color="#fff"
          size={16} style={styles.headingIcon} />
        <Text style={styles.buttonTextLarge}>{label}</Text>
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
        actionSetLeaderConsuming('eating');
      }
      else if (modalValue.subType == SET_DRINKING) {
        actionSetLeaderConsuming('drinking');
      }
      break;

      case DISPLAY_TREASURE:
      actionDisplayTreasure();
      break;
    }
  }

  function actionStudy() {
    if (resourceSelected != null) {
      const resourceType = utils.getResourceType(resourceSelected);
      if (resourceType.value != null) {
        const { knowledge, duration } = calcExamination(RESEARCHES.STUDY, treasuresDisplayed);
        const typeQuality = (resourceSelected.type.split('-')[0] + '|'
          + resourceSelected.quality);
        const rsIncrease = [new Resource({type: RTY.KNOWLEDGE, quality: 0,
          quantity: (knowledge)})];
        const rsConsume = [new Resource({...resourceSelected, quantity: 1})];
        let messageToDisplay = `You studied ${utils.getResourceName(resourceSelected)} for ${utils.formatNumberShort(knowledge)} knowledge.`;
        if (resourceType.tags.includes(EQUIPMENT_SLOTS.TOOL)) {
          messageToDisplay = `${messageToDisplay} It can now be made in a Fabricatory!`;
        }
        if (resourceType.tags.includes(EQUIPMENT_SLOTS.CLOTHING)) {
          messageToDisplay = `${messageToDisplay} It can now be made in a Tailors!`;
        }
        if (resourceType.tags.includes(EQUIPMENT_SLOTS.BACK)) {
          messageToDisplay = `${messageToDisplay} It can now be made in an Outfitters!`;
        }
        let timer = new Timer({
          name: RESEARCHES.STUDY,
          endsAt: (new Date(Date.now()).valueOf() + duration),
          resourcesToIncrease: rsIncrease,
          resourcesToConsume: rsConsume,
          questActivity: new QuestActivity({ id: utils.randHex(16),
            actionPerformed: { kind: RESEARCHES.STUDY, quantity: 1 } }),
          messageToDisplay,
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
        const { knowledge, duration } = calcExamination(RESEARCHES.ANALYSIS, treasuresDisplayed);
        const costs = getAnalysisCost(treasuresDisplayed);
        const rsIncrease = [new Resource({type: RTY.KNOWLEDGE, quality: 0,
          quantity: knowledge})];
        const rsConsume = [new Resource({...resourceSelected, quantity: parseInt(quantitySelected)}), 
          ...costs];
        let timer = new Timer({
          name: RESEARCHES.ANALYSIS,
          endsAt: (new Date(Date.now()).valueOf() + duration),
          resourcesToIncrease: rsIncrease,
          resourcesToConsume: rsConsume,
          questActivity: new QuestActivity({ id: utils.randHex(16),
            resourceAnalyzed: { type: resourceSelected.type,
            quantity: parseInt(quantitySelected) } }),
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

  function calcExamination(kind: RESEARCHES.STUDY|RESEARCHES.ANALYSIS,
    treasuresDisplayed: { [typeName: string] : number }) {
    let knowledge = 0;
    let duration = 0;
    const quantity = (kind === RESEARCHES.STUDY) ? 1 : parseInt(quantitySelected);
    if (resourceSelected != null) {
      const resourceType = utils.getResourceType(resourceSelected);
      if (resourceType.value != null) {
        knowledge = ((resourceType.value * QV[resourceSelected.quality]
          * quantity) / ((kind === RESEARCHES.STUDY) ? 1 : 4));
        duration = (knowledge / Math.pow(2.5, Math.log10(knowledge))) * 1.5 * 1000;
        if (duration < 1000) { duration = 1000; }
      }
    }

    let knowledgeMult = 1;
    ANALYSIS_TREASURES_KNOWLEDGE.forEach((t) => {
      if (treasuresDisplayed[t.typeName]) {
        knowledgeMult *= t.multiplier;
      }
    });
    knowledge *= knowledgeMult;

    let durationMult = kind === RESEARCHES.STUDY ? 1 : 1.5;
    ANALYSIS_TREASURES_SPEED.forEach((t) => {
      if (treasuresDisplayed[t.typeName]) {
        durationMult *= t.multiplier;
      }
    });
    duration *= durationMult;
    return { knowledge, duration };
  }

  function getAnalysisCost(treasuresDisplayed: { [typeName: string] : number }) {
    const costs: Resource[] = [];
    ANALYSIS_TREASURES_KNOWLEDGE.forEach((t) => {
      if (treasuresDisplayed[t.typeName]) {
        costs.push(t.cost);
      }
    });
    ANALYSIS_TREASURES_SPEED.forEach((t) => {
      if (treasuresDisplayed[t.typeName]) {
        costs.push(t.cost);
      }
    });
    
    return costs.sort((a, b) => (b.quantity - a.quantity));
  }

  function actionTrading() {
    if (resourceSelected != null) {
      const visit = tradingStatus.visits[modalValue.slot];
      if (visit !== null) {
        const trade = visit.trades[modalValue.tradeId];
        dispatch(increaseResources(vault, [new Resource({type: trade.give.type,
          quality: trade.give.quality, quantity: quantityGiven})]));
        let rc = new Resource(resourceSelected).getResourceWithoutQuantity();
        rc.quantity = parseInt(quantitySelected);
        dispatch(consumeResources(vault, [rc]));
        dispatch(completeTrade({
          id: trade.id,
          slot: modalValue.slot,
          given: new Resource({ type: trade.give.type, quality: trade.give.quality,
            quantity: quantityGiven }),
          received: new Resource({ type: resourceSelected.type,
            quality: resourceSelected.quality,
            quantity: parseInt(quantitySelected) })
        }));
        dispatch(addToActivityQueue(new QuestActivity({ id: utils.randHex(16),
          tradedWith: { typeName: trade.tradingPartnerType, quantity: quantityGiven } })));
        dispatch(addToActivityQueue(new QuestActivity({ id: utils.randHex(16),
          resourceGained: { type: trade.give.type, quantity: quantityGiven } })));
        dispatch(displayModalValue(null, 'closed', null));
      }
    }
  }

  function actionSetLeaderConsuming(kind: 'eating'|'drinking') {
    if (resourceSelected != null) {
      const typeQuality = (resourceSelected.type + '|' + resourceSelected.quality);
      let newLeaders = { ...leaders };
      if (kind === 'eating') {
        newLeaders[modalValue.leader.id].eating = typeQuality;
      }
      else if (kind === 'drinking') {
        newLeaders[modalValue.leader.id].drinking = typeQuality;
      }
      newLeaders[modalValue.leader.id].calcEffects(equipment, buildings, vault, treasureEffects);
      dispatch(setLeader(newLeaders[modalValue.leader.id]));
      const newRates = new Hourglass().calcRates(buildings, newLeaders, treasureEffects, vault);
      dispatch(setRates(newRates));
      dispatch(addToActivityQueue(new QuestActivity({ id: utils.randHex(16),
        actionPerformed: { kind: (kind === 'eating' ? ACTIVITIES.LEADER_SET_EATING
          : ACTIVITIES.LEADER_SET_DRINKING), value: resourceSelected.type } })));
      dispatch(displayModalValue(MODALS.LEADER_DETAIL, 'open',
        newLeaders[modalValue.leader.id]));
    }
  }

  function actionDisplayTreasure() {
    if (resourceSelected != null) {
      dispatch(consumeResources(vault, [new Resource({...resourceSelected, quantity: 1})]));
      dispatch(displayTreasure(resourceSelected.type));
      
      dispatch(addToActivityQueue(new QuestActivity({ id: utils.randHex(16),
        actionPerformed: { kind: ACTIVITIES.DISPLAY_TREASURE, value: resourceSelected.type } })));
      dispatch(displayModalValue(MODALS.BUILDING_DETAIL, 'open', {id: modalValue.buildingId}));
    }
  }

  function getResourcesArray() {
    switch(modalValue.type) {
      case RESEARCHES.STUDY:
      return rSort(utils.filterOutZero(researchStatus.getResourcesToStudy(vault)));

      case RESEARCHES.ANALYSIS:
      return rSort(utils.filterOutZero(vault.getStudyableResources()));

      case 'Trading':
      const visit = tradingStatus.visits[modalValue.slot];
      if (visit !== null) {
        const trade = visit.trades[modalValue.tradeId];
        switch(trade.receive.specificity) {
          case RESOURCE_SPECIFICITY.EXACT:
          return rSort(utils.filterOutZero(vault.getExactResources(trade.receive.type)));

          case RESOURCE_SPECIFICITY.TAG:
          return rSort(utils.filterOutZero(vault.getTagResources(trade.receive.type)));

          case RESOURCE_SPECIFICITY.SUBCATEGORY:
          return rSort(utils.filterOutZero(vault.getSubcategoryResources(trade.receive.type)));

          case RESOURCE_SPECIFICITY.CATEGORY:
          return rSort(utils.filterOutZero(vault.getCategoryResources(trade.receive.type)));
        }
      }
      return [];

      case MODALS.LEADER_DETAIL:
      if (modalValue.subType == SET_EATING) {
        return rSort(utils.filterOutZero(vault.getTagResources(RESOURCE_TAGS.FOOD)));
      }
      else if (modalValue.subType == SET_DRINKING) {
        return rSort(utils.filterOutZero(vault.getTagResources(RESOURCE_TAGS.DRINK)));
      }

      case DISPLAY_TREASURE:
      const tr = rSort(utils.filterOutZero(vault.getCategoryResources(RESOURCE_CATEGORIES.TREASURE)));
      return tr.filter((resource) => (!utils.arrayIncludes(Object.keys(treasuresDisplayed),
        resource.type) ));

      default:
      return [];
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
  resourceSelected: Resource|null, visit: TradingPartnerVisit) {
  if (!modalValue) { return 0; }
  if (modalValue.type == 'Trading' && resourceSelected) {
    const trade = visit.trades[modalValue.tradeId];
    const rResourceType = utils.getResourceType(resourceSelected);
    const gResourceType = resourceTypes[trade.give.type];

    if (rResourceType.value != null && gResourceType.value != null
      && (parseInt(qSelected) ? true : false)) {
      let qGiven = Math.floor((rResourceType.value * QV[resourceSelected.quality]
        * parseInt(qSelected) * trade.multiplier) / (gResourceType.value * QV[trade.give.quality]));
      return qGiven;
    }
  }
  return 0;
}

function ResourceSelector(props: {resource: Resource, resourceSelected: Resource|null,
  vault: Vault, modalValue: any,  visit: TradingPartnerVisit, analysisMax: number,
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
      {justifyContent: 'space-between', minWidth: props.positioner.minorWidth,
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
            props.vault, props.visit, props.modalValue,
            props.setResourceSelected, props.setQuantitySelected,
            props.setQuantityGiven)}
        </View>
      </View>
    </View>
  );

  function renderButton(resource: Resource, resourceSelected: Resource|null,
    vault: Vault, visit: TradingPartnerVisit, modalValue: any,
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
      onPress={() => {typeQualitySelect(resource, visit, modalValue,
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
  function typeQualitySelect(resource: Resource, visit: TradingPartnerVisit,
    modalValue: any,
    setResourceSelected: (resourceSelected: Resource|null) => void,
    setQuantitySelected: (quantity: string) => void,
    setQuantityGiven: (quantity: number) => void
  ) {
    setResourceSelected(resource);
    const typeQuality = resource.type + '|' + resource.quality;
    let quantity = Math.floor(props.vault.resources[typeQuality].quantity);
    if (visit) {
      if (quantity > visit.acceptQuantity) { quantity = visit.acceptQuantity; }
      setQuantitySelected(quantity.toString());
      setQuantityGiven(calcQuantityGiven(quantity.toString(), modalValue, resource,
        visit));
    }
    if (modalValue.type == RESEARCHES.ANALYSIS) {
      if (quantity > props.analysisMax) { quantity = props.analysisMax; }
      setQuantitySelected(quantity.toString());
    }
  }
}
