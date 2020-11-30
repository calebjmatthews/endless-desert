import React, { useState, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import ProgressBarComponent from './progress_bar';
import { displayModalValue, selectTab, addMessage } from '../actions/ui';
import { consumeResources } from '../actions/vault';
import { updateResearchOptionDeck } from '../actions/research_option_decks';
import { completeResearch } from '../actions/research_status';
import { unlockTab } from '../actions/account';

import ResearchOption from '../models/research_option';
import ResourceType from '../models/resource_type';
import ResourceTag from '../models/resource_tag';
import ResourceSubcategory from '../models/resource_subcategory';
import ResourceCategory from '../models/resource_category';
import Vault from '../models/vault';
import ResearchOptionDeck from '../models/research_option_deck';
import Message from '../models/message';
import { researches } from '../instances/researches';
import { researchOptions } from '../instances/research_options';
import { resourceTypes } from '../instances/resource_types';
import { resourceTags } from '../instances/resource_tags';
import { resourceSubcategories } from '../instances/resource_subcategories';
import { utils } from '../utils';
import { resourceCategories } from '../instances/resource_categories';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { MODALS } from '../enums/modals';
import { TABS } from '../enums/tabs';

export default function ResearchingComponent() {
  const dispatch = useDispatch();
  const researchOptionDecks = useTypedSelector(state => state.researchOptionDecks);
  const valueSelected = useTypedSelector(state => state.ui.valueSelected);
  const modalStage = useTypedSelector(state => state.ui.modalStage);
  const modalValue = useTypedSelector(state => state.ui.modalValue);
  const vault = useTypedSelector(state => state.vault);
  const research = researches[valueSelected];
  const rod = researchOptionDecks[valueSelected];
  let optionsArray: ResearchOption[] = Object.keys(rod.currentOptions).map((name) => {
    return researchOptions[name];
  });

  useEffect(() => {
    if (modalStage == 'resolving') {
      afterApplyCost(modalValue.aCost, modalValue.optionName);
      dispatch(displayModalValue(null, 'closed', null));
    }
  }, [modalStage]);

  let title = (' Step ' + (rod.stepsCompleted+1));
  if (rod.stepsCompleted >= rod.stepsNeeded) {
    title = 'Completed!';
  }
  let lastProgress = (rod.stepsCompleted - 1) / rod.stepsNeeded;
  if (lastProgress < 0) { lastProgress = 0; }
  let progress = rod.stepsCompleted / rod.stepsNeeded;
  let pBarLabel = (Math.floor(progress * 100).toString() + '% (' + rod.stepsCompleted
    + '/' + rod.stepsNeeded + ')');

  return (
    <View style={StyleSheet.flatten([styles.container,
      {'justifyContent': 'flex-start'}])}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="MaterialCommunityIcons" name="feather"
          color="#fff" size={20} style={styles.headingIcon} />
        <Text style={styles.heading1}>{title}</Text>
      </View>
      <View style={styles.panelFlexColumn}>
        <View style={styles.rows}>
          <BadgeComponent
            provider={research.icon.provider}
            name={research.icon.name}
            foregroundColor={research.foregroundColor}
            backgroundColor={research.backgroundColor}
            iconSize={18} />
          <Text style={styles.heading2}>{rod.researchName}</Text>
        </View>
        <View>
          <View>
            <Text style={styles.emphasis}>{research.unlocks}</Text>
            <View style={styles.break} />
            <Text style={styles.bodyText}>{research.description}</Text>
          </View>
        </View>
        <ProgressBarComponent startingProgress={lastProgress}
          endingProgress={progress} duration={1000}
          label={pBarLabel} />
      </View>
      <View style={styles.break}></View>
      {renderOptions()}
    </View>
  );

  function renderOptions() {
    if (rod.stepsCompleted < rod.stepsNeeded) {
      return (
        <>
          <Text style={styles.bareText}>{'- Options -'}</Text>
          <FlatList
            data={optionsArray}
            renderItem={renderOption}
            keyExtractor={option => option.name}>
          </FlatList>
        </>
      );
    }
    return (
      <View style={styles.panelFlex}>
        <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
          {'justifyContent': 'center'}])}
          onPress={() => { backClick(); }} >
          <IconComponent provider="FontAwesome5" name="arrow-left"
            color="#fff" size={16} style={styles.headingIcon} />
          <Text style={styles.buttonText}>
            {' Back'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  function renderOption(option: any) {
    return <OptionDescription option={option} vault={vault} applyCost={applyCost}
      rod={rod} />
  }

  function applyCost(aCost: {specificity: string, type: string, quantity: number},
    optionName: string) {
    if (aCost.specificity == RESOURCE_SPECIFICITY.EXACT) {
      dispatch(consumeResources(vault, [{type: aCost.type, quantity: aCost.quantity}]));
      afterApplyCost(aCost, optionName);
    }
    else {
      dispatch(displayModalValue(MODALS.RESOURCE_SELECT, 'open', {aCost, optionName}));
    }
  }

  function afterApplyCost(aCost: {specificity: string, type: string, quantity: number},
    optionName: string) {
    let rod = researchOptionDecks[valueSelected];
    let research = researches[rod.researchName];
    const oResult = rod.costPaid(aCost.type, optionName);
    if (oResult == 'option completed') {
      const sResult = rod.completeStep();
      if (sResult == 'step completed') {
        if (rod.stepsNeeded <= rod.stepsCompleted) {
          callCompleteResearch();
        }
      }
      else {
        rod.beginStep(1);
      }
    }
    dispatch(updateResearchOptionDeck(rod));
  }

  function callCompleteResearch() {
    dispatch(completeResearch(valueSelected));
    dispatch(addMessage(new Message({
      text: ('You finished researching ' + research.name + '.'),
      type: '',
      timestamp: new Date(Date.now()),
      icon: research.icon,
      foregroundColor: research.foregroundColor,
      backgroundColor: research.backgroundColor
    })));

    switch (research.unlocksTab) {
      case TABS.TRADING:
      dispatch(unlockTab(TABS.TRADING));
    }
  }

  function backClick() {
    dispatch(selectTab(TABS.RESEARCH));
  }
}

function OptionDescription(props: any) {
  let option: ResearchOption = props.option.item;
  return (
    <View style={styles.panelFlexColumn}>
      <Text style={styles.heading2}>
        {'#' + (props.option.index+1) + ': ' + option.name}
      </Text>
      <View>
        <Text style={styles.bodyText}>{option.description}</Text>
        <Text>{'Cost:'}</Text>
        <View>
          {renderCost(option.cost, props.vault, props.applyCost, option.name,
            props.rod)}
        </View>
      </View>
    </View>
  );

  function renderCost(cost: {specificity: string, type: string, quantity: number}[],
    vault: Vault, applyCost: Function, optionName: string, rod: ResearchOptionDeck) {
    return cost.map((aCost) => {
      let resource = getMatchingResource(aCost.specificity, aCost.type);
      let resourceQuantity =
        Math.floor(vault.getQuantity(aCost.specificity, aCost.type));
      let buttonStyle = styles.buttonRowItem;
      let buttonDisabled = false;
      let paidCost = false;
      if (rod.paidCosts[optionName]) {
        rod.paidCosts[optionName].map((cn) => {if (cn == aCost.type) paidCost = true});
      }

      if (resourceQuantity < aCost.quantity || paidCost) {
        // @ts-ignore
        buttonStyle = StyleSheet.compose(styles.buttonRowItem, styles.buttonDisabled);
        buttonDisabled = true;
      }
      let costText = (utils.formatNumberShort(aCost.quantity) + ' (of '
        + Math.floor(resourceQuantity) + ') ' + resource.name);
      if (paidCost) { costText = 'Paid'; }
      return (
        <TouchableOpacity key={aCost.type} style={buttonStyle}
          disabled={buttonDisabled} onPress={() => { applyCost(aCost, optionName); }} >
          <BadgeComponent
            provider={resource.icon.provider}
            name={resource.icon.name}
            foregroundColor={resource.foregroundColor}
            backgroundColor={resource.backgroundColor}
            iconSize={16} />
          <Text style={styles.buttonText}>
            {costText}
          </Text>
        </TouchableOpacity>
      );
    })
    return null;
  }

  function getMatchingResource(specificity: string, type: string):
    ResourceType|ResourceTag|ResourceSubcategory|ResourceCategory {
    switch(specificity) {
      case RESOURCE_SPECIFICITY.EXACT:
      return resourceTypes[type];

      case RESOURCE_SPECIFICITY.TAG:
      return resourceTags[type];

      case RESOURCE_SPECIFICITY.SUBCATEGORY:
      return resourceSubcategories[type];

      case RESOURCE_SPECIFICITY.CATEGORY:
      return resourceCategories[type];

      default:
      return resourceTypes[type];
    }
  }
}
