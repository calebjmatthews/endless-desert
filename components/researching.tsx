import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import { displayModal } from '../actions/ui';

import ResearchOption from '../models/research_option';
import ResourceType from '../models/resource_type';
import ResourceTag from '../models/resource_tag';
import ResourceCategory from '../models/resource_category';
import { researches } from '../instances/researches';
import { researchOptions } from '../instances/research_options';
import { resourceTypes } from '../instances/resource_types';
import { resourceTags } from '../instances/resource_tags';
import { resourceCategories } from '../instances/resource_categories';
import { OPTION_SPECIFICITY } from '../enums/option_specificity';

export default function ResearchingComponent() {
  const dispatch = useDispatch();
  const researchOptionDecks = useTypedSelector(state => state.researchOptionDecks);
  const valueSelected = useTypedSelector(state => state.ui.valueSelected);
  const research = researches[valueSelected];
  const rod = researchOptionDecks[valueSelected];
  console.log('rod');
  console.log(rod);
  let optionsArray: ResearchOption[] = Object.keys(rod.currentOptions).map((name) => {
    return researchOptions[name];
  });
  console.log('optionsArray');
  console.log(optionsArray);

  function renderOption(option: any) {
    return <OptionDescription option={option} />
  }
  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="MaterialCommunityIcons" name="feather"
          color="#fff" size={20} style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Step ' + (rod.stepsCompleted+1)}</Text>
      </View>
      <View style={styles.panelFlexColumn}>
        <View style={styles.row}>
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
}

function OptionDescription(props: any) {
  console.log('props');
  console.log(props);
  let option: ResearchOption = props.option.item;
  return (
    <View style={styles.panelFlexColumn}>
      <Text style={styles.heading2}>
        {'#' + (props.option.index+1) + ': ' + option.name}
      </Text>
      <View>
        <Text style={styles.bodyText}>{option.description}</Text>
        <Text>{'Cost:'}</Text>
        <View style={styles.buttonRow}>
          {renderCost(option.cost)}
        </View>
      </View>
    </View>
  );

  function renderCost(cost: {specificity: string, type: string, quantity: number}[]) {
    return cost.map((aCost) => {
      let resource = getMatchingResource(aCost.specificity, aCost.type);
      return (
        <TouchableOpacity key={aCost.type} style={styles.buttonRowItem}
          onPress={() => {}}  >
          <BadgeComponent
            provider={resource.icon.provider}
            name={resource.icon.name}
            foregroundColor={resource.foregroundColor}
            backgroundColor={resource.backgroundColor}
            iconSize={16} />
          <Text style={styles.buttonText}>{aCost.quantity + ' ' + resource.name}</Text>
        </TouchableOpacity>
      );
    })
    return null;
  }

  function getMatchingResource(specificity: string, type: string):
    ResourceType|ResourceTag|ResourceCategory {
    switch(specificity) {
      case OPTION_SPECIFICITY.EXACT:
      return resourceTypes[type];

      case OPTION_SPECIFICITY.TAG:
      return resourceTags[type];

      case OPTION_SPECIFICITY.CATEGORY:
      return resourceCategories[type];

      default:
      return resourceTypes[type];
    }
  }
}
