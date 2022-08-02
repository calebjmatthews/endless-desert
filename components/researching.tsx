import React, { useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import ProgressBarComponent from './progress_bar';
import { displayModalValue, selectTab } from '../actions/ui';
import { addMessage } from '../actions/messages';
import { consumeResources } from '../actions/vault';
import { updateResearchOptionDeck } from '../actions/research_option_decks';
import { completeResearch } from '../actions/research_status';
import { addToActivityQueue } from '../actions/quest_status';
import { unlockTab } from '../actions/account';
import { increaseResources } from '../actions/vault';

import ResearchOption from '../models/research_option';
import Resource from '../models/resource';
import Vault from '../models/vault';
import ResearchOptionDeck from '../models/research_option_deck';
import QuestActivity from '../models/quest_activity';
import Message from '../models/message';
import Positioner from '../models/positioner';
import { researches } from '../instances/researches';
import { researchOptions } from '../instances/research_options';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { MODALS } from '../enums/modals';
import { TABS } from '../enums/tabs';
import { ACTIVITIES } from '../enums/activities';
import { RESEARCH_OPTION_ACTIONS } from '../enums/research_option_actions';
const ROA = RESEARCH_OPTION_ACTIONS;

export default function ResearchingComponent() {
  const dispatch = useDispatch();
  const researchOptionDecks = useTypedSelector(state => state.researchOptionDecks);
  const valueSelected = useTypedSelector(state => state.ui.valueSelected);
  const modalStage = useTypedSelector(state => state.ui.modalStage);
  const modalValue = useTypedSelector(state => state.ui.modalValue);
  const vault = useTypedSelector(state => state.vault);
  const research = researches[valueSelected];
  const rod = researchOptionDecks[valueSelected];
  const positioner = useTypedSelector(state => state.ui.positioner);

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
      <ScrollView>
        <View style={StyleSheet.flatten([styles.panelFlexColumn,
          {minWidth: positioner.majorWidth,
            maxWidth: positioner.majorWidth}])}>
          <View style={styles.rows}>
            <BadgeComponent icon={research.icon} size={29} />
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
            width={positioner.majorWidth - positioner.majorPadding}
            endingProgress={progress} duration={1000}
            label={pBarLabel} />
        </View>
        <View style={styles.break} />
        {renderOptions()}
      </ScrollView>
    </View>
  );

  function renderOptions() {
    if (rod.stepsCompleted < rod.stepsNeeded) {
      return (
        <>
          <Text style={StyleSheet.flatten([styles.heading2, styles.bareText, styles.centeredRows])}>
            {'- Options -'}
          </Text>
          {rod.currentOptions.map((option) => renderOption(option))}
        </>
      );
    }
    return (
      <View style={StyleSheet.flatten([styles.panelFlex,
        {minWidth: positioner.majorWidth,
          maxWidth: positioner.majorWidth}])}>
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

  function renderOption(option: string) {
    return <OptionDescription key={option} optionName={option} vault={vault} applyCost={applyCost} rod={rod} positioner={positioner} />
  }

  function applyCost(aCost: {specificity: string, type: string, quantity: number},
    optionName: string) {
    let rTypePool: string[] = [];
    switch(aCost.specificity) {
      case RESOURCE_SPECIFICITY.EXACT:
      rTypePool = [(aCost.type + '|0')];
      break;

      case RESOURCE_SPECIFICITY.TAG:
      let tagPool = vault.getTagResources(aCost.type);
      rTypePool = tagPool.map((resource) => {
        return (resource.type + '|' + resource.quality);
      });
      break;

      case RESOURCE_SPECIFICITY.SUBCATEGORY:
      let scPool = vault.getSubcategoryResources(aCost.type);
      rTypePool = scPool.map((resource) => {
        return (resource.type + '|' + resource.quality);
      });
      break;

      case RESOURCE_SPECIFICITY.CATEGORY:
      let catPool = vault.getCategoryResources(aCost.type);
      rTypePool = catPool.map((resource) => {
        return (resource.type + '|' + resource.quality);
      });
      break;
    }

    if (rTypePool.length == 1) {
      const qtSplit = rTypePool[0].split('|');
      let resource = new Resource({type: qtSplit[0],
        quality: parseInt(qtSplit[1]), quantity: aCost.quantity});
      Object.keys(vault.resources).map((typeQuality) => {
        if (typeQuality == rTypePool[0]) {
          resource = new Resource({...vault.resources[typeQuality],
            quantity: aCost.quantity});
        }
      });
      dispatch(consumeResources(vault, [resource]));
      afterApplyCost(aCost, optionName);
    }
    else {
      dispatch(displayModalValue(MODALS.RESOURCE_SELECT, 'open', {aCost, optionName}));
    }
  }

  function afterApplyCost(aCost: {specificity: string, type: string, quantity: number},
    optionName: string) {
    const newRod = new ResearchOptionDeck(rod);
    const option = researchOptions[optionName];
    const oResult = newRod.costPaid(aCost.type, optionName);
    if (oResult == 'option completed') {
      option.actions.forEach((actionName) => {
        switch(actionName) {
          case ROA.INCREASE_OPTION_SLOTS:
          newRod.increaseOptionSlots();
          break;

          case ROA.DECREASE_OPTION_SLOTS:
          newRod.decreaseOptionSlots();
          break;

          case ROA.DISCARD_OPTIONS:
          newRod.discardOptions();
          break;

          case ROA.COMPLETE_STEP:
          const sResult = newRod.completeStep();
          if (sResult == 'step completed') { callCompleteResearch(); }
          else { newRod.replaceOption(optionName); }
          break;

          case ROA.RETRACT_STEP:
          newRod.retractStep();
          break;
        }
      });
      newRod.finishOption(optionName);
    }
    dispatch(updateResearchOptionDeck(newRod));
  }

  function callCompleteResearch() {
    dispatch(completeResearch(valueSelected));
    dispatch(addMessage(new Message({
      text: ('You finished researching ' + research.name + '.'),
      type: '',
      timestamp: new Date(Date.now()),
      icon: research.icon
    })));

    if (research.unlocksTab) {
      dispatch(unlockTab(research.unlocksTab));
    }
    if (research.givesTreasure) {
      dispatch(increaseResources(vault, [
        new Resource({ type: research.givesTreasure, quality: 0, quantity: 1 })
      ]));
    }
    dispatch(addToActivityQueue(new QuestActivity({ id: utils.randHex(16),
      actionPerformed: { kind: ACTIVITIES.RESEARCH, value: research.name } })));
  }

  function backClick() {
    dispatch(selectTab(TABS.RESEARCH));
  }
}

function OptionDescription(props: { optionName: string, vault: Vault,
  rod: ResearchOptionDeck, applyCost: Function, positioner: Positioner }) {
  let option: ResearchOption = researchOptions[props.optionName];
  return (
    <View style={StyleSheet.flatten([styles.panelFlexColumn,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])}>
      <View>
        <Text style={styles.heading2}>
          {option.name}
        </Text>
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
      let resource = utils.getMatchingResourceKind(aCost.specificity, aCost.type);
      let resourceQuantity =
        Math.floor(vault.getQuantity(aCost.specificity, aCost.type));
      let buttonStyle: any = styles.button;
      let buttonDisabled = false;
      let paidCost = false;
      if (rod.paidCosts[optionName]) {
        rod.paidCosts[optionName].map((cn) => {if (cn == aCost.type) paidCost = true});
      }

      if (resourceQuantity < aCost.quantity || paidCost) {
        buttonStyle = StyleSheet.compose(styles.button, styles.buttonDisabled);
        buttonDisabled = true;
      }
      let costText = (utils.formatNumberShort(aCost.quantity) + ' (of '
        + utils.formatNumberShort(resourceQuantity) + ') ' + resource.name);
      if (paidCost) { costText = 'Paid'; }
      return (
        <TouchableOpacity key={aCost.type} style={buttonStyle}
          disabled={buttonDisabled} onPress={() => { applyCost(aCost, optionName); }} >
          <BadgeComponent icon={resource.icon} size={21} />
          <Text style={styles.buttonText}>
            {costText}
          </Text>
        </TouchableOpacity>
      );
    });
  }


}
