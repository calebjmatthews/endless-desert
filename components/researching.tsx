import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import { displayModal } from '../actions/ui';

import ResearchOption from '../models/research_option';
import { researches } from '../instances/researches';
import { researchOptions } from '../instances/research_options';

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
        <Text style={styles.heading1}>{' ' + rod.researchName}</Text>
      </View>
      <View style={styles.panelFlex}>
        <BadgeComponent
          provider={research.icon.provider}
          name={research.icon.name}
          foregroundColor={research.foregroundColor}
          backgroundColor={research.backgroundColor}
          iconSize={18} />
        <Text>{'A description goes here.'}</Text>
      </View>
    </View>
  );
}

function OptionDescription(props: any) {
  let option: any = props.item.option;
  return (
    <View style={styles.panelFlex}>
      <Text>{option.name}</Text>
    </View>
  );
}
