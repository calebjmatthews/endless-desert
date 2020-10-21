import React, { useState, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import { displayModalValue } from '../actions/ui';
import { consumeResources } from '../actions/vault';
import { updateResearchOptionDeck } from '../actions/research_option_decks';
import { completeResearch } from '../actions/research_status';

import ResearchOption from '../models/research_option';
import ResourceType from '../models/resource_type';
import ResourceTag from '../models/resource_tag';
import ResourceCategory from '../models/resource_category';
import Vault from '../models/vault';
import { researches } from '../instances/researches';
import { researchOptions } from '../instances/research_options';
import { resourceTypes } from '../instances/resource_types';
import { resourceTags } from '../instances/resource_tags';
import { resourceCategories } from '../instances/resource_categories';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { MODALS } from '../enums/modals';

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
      console.log('modalValue');
      console.log(modalValue);
      afterApplyCost(modalValue.aCost, modalValue.optionName);
      dispatch(displayModalValue(null, 'closed', null));
    }
  }, [modalStage]);

  function renderOption(option: any) {
    return <OptionDescription option={option} vault={vault} applyCost={applyCost} />
  }
  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="MaterialCommunityIcons" name="feather"
          color="#fff" size={20} style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Step ' + (rod.stepsCompleted+1)}</Text>
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
      </View>
      <View style={styles.break}></View>
      <Text style={styles.bareText}>{'- Options -'}</Text>
      <FlatList
        data={optionsArray}
        renderItem={renderOption}
        keyExtractor={option => option.name}>
      </FlatList>
    </View>
  );

  function applyCost(aCost: {specificity: string, type: string, quantity: number},
    optionName: string) {
    console.log('aCost');
    console.log(aCost);
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
    console.log('inside afterApplyCost');
    let rod = researchOptionDecks[valueSelected];
    console.log('rod');
    console.log(rod);
    const oResult = rod.costPaid(aCost.type, optionName);
    console.log('oResult');
    console.log(oResult);
    if (oResult == 'option completed') {
      const sResult = rod.completeStep();
      console.log('sResult');
      console.log(sResult);
      if (sResult == 'step completed') {
        if (rod.stepsNeeded <= rod.stepsCompleted) {
          dispatch(completeResearch(valueSelected));
        }
      }
    }
    dispatch(updateResearchOptionDeck(rod));
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
          {renderCost(option.cost, props.vault, props.applyCost, option.name)}
        </View>
      </View>
    </View>
  );

  function renderCost(cost: {specificity: string, type: string, quantity: number}[],
    vault: Vault, applyCost: Function, optionName: string) {
    return cost.map((aCost) => {
      let resource = getMatchingResource(aCost.specificity, aCost.type);
      let resourceQuantity =
        Math.floor(vault.getQuantity(aCost.specificity, aCost.type));
      let buttonStyle = styles.buttonRowItem;
      let buttonDisabled = false;
      if (resourceQuantity < aCost.quantity) {
        // @ts-ignore
        buttonStyle = StyleSheet.compose(styles.buttonRowItem, styles.buttonDisabled);
        buttonDisabled = true;
      }
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
            {aCost.quantity + ' (of ' + Math.floor(resourceQuantity) + ') '
              + resource.name}
          </Text>
        </TouchableOpacity>
      );
    })
    return null;
  }

  function getMatchingResource(specificity: string, type: string):
    ResourceType|ResourceTag|ResourceCategory {
    switch(specificity) {
      case RESOURCE_SPECIFICITY.EXACT:
      return resourceTypes[type];

      case RESOURCE_SPECIFICITY.TAG:
      return resourceTags[type];

      case RESOURCE_SPECIFICITY.CATEGORY:
      return resourceCategories[type];

      default:
      return resourceTypes[type];
    }
  }
}
