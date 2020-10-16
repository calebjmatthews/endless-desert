import React from 'react';
import { Text, View, FlatList, Button, TouchableOpacity, StyleSheet }
  from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

import { consumeResources } from '../actions/vault';
import { completeResearch } from '../actions/research_status';
import { startResearch } from '../actions/research_option_decks';
import { selectTab } from '../actions/ui';
import BadgeComponent from './badge';
import IconComponent from './icon';
import { styles } from '../styles';

import Research from '../models/research';
import ResearchStatus from '../models/research_status';
import Vault from '../models/vault';
import { researches } from '../instances/researches';
import { RESOURCE_TYPES } from '../enums/resource_types';

export default function ResearchesComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const researchOptionDecks =
    useTypedSelector(state => state.researchOptionDecks);
  let researchArray = Object.keys(researchStatus.status).map((name) => {
    return {name: name, status: researchStatus.status[name]}
  });
  researchArray = researchArray.filter((r) => {
    if (r.status == 'visible' || r.status == 'completed') {
      return r;
    }
  });

  function startClick(researchStatus: {name: string, status: string}, vault: Vault) {
    let research = researches[researchStatus.name];
    let quantity = vault.resources[RESOURCE_TYPES.KNOWLEDGE].quantity;
    if (quantity >= research.knowledgeReq) {
      dispatch(consumeResources(vault, [{
        type: RESOURCE_TYPES.KNOWLEDGE,
        quantity: research.knowledgeReq
      }]));
      dispatch(startResearch(researchStatus.name));
      dispatch(selectTab("Researching", researchStatus.name));
    }
    else {
      console.log('Not enough knowledge!');
    }
  }

  function renderResearch(research: any, vault: Vault, startClick: Function) {
    return <ResearchDescription research={research} vault={vault}
      startClick={startClick} />
  }
  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome" name="book" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Research'}</Text>
      </View>
      <View>
        <Text style={styles.bareText}>
          {vault.resources[RESOURCE_TYPES.KNOWLEDGE].quantity
            + ' available knowledge'}
        </Text>
      </View>
      <FlatList
        data={researchArray}
        renderItem={(item) => renderResearch(item, vault, startClick)}
        keyExtractor={research => research.name}>
      </FlatList>
    </View>
  );
}

function ResearchDescription(props: {research: any, vault: Vault,
  startClick: Function}) {
  const researchStatus: {name: string, status: string} = props.research.item;
  const research = researches[researchStatus.name];

  return (
    <View style={styles.panelFlex}>
      <BadgeComponent
        provider={research.icon.provider}
        name={research.icon.name}
        foregroundColor={research.foregroundColor}
        backgroundColor={research.backgroundColor}
        iconSize={18} />
      <View style={styles.containerStretchColumn}>
        <Text>{research.name}</Text>
        <Text>{renderCost(researchStatus)}</Text>
        <View style={styles.buttonRow}>
          {renderStart()}
          <TouchableOpacity style={styles.buttonRowItem}>
            <IconComponent provider="FontAwesome5" name="angle-down"
              color="#fff" size={16} />
            <Text style={styles.buttonText}>{' Info'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  function renderCost(researchStatus: {name: string, status: string}) {
    const research = researches[researchStatus.name];
    if (researchStatus.status == 'visible') {
      return <View><Text>{'To start: ' + research.knowledgeReq + ' knowledge'}</Text></View>;
    }
    return null;
  }

  function renderStart() {
    if (researchStatus.status == 'visible') {
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => {props.startClick(researchStatus, props.vault)}} >
          <IconComponent provider="MaterialCommunityIcons" name="feather"
            color="#fff" size={16} />
          <Text style={styles.buttonText}>{' Start'}</Text>
        </TouchableOpacity>
      );
    }
    let buttonStyle = StyleSheet.compose(styles.buttonRowItem, styles.buttonDisabled);
    return (
      <TouchableOpacity style={buttonStyle}
        onPress={() => {}} disabled >
        <IconComponent provider="FontAwesome5" name="check"
          color="#fff" size={16} />
        <Text style={styles.buttonText}>{' Done'}</Text>
      </TouchableOpacity>
    );
  }
}
