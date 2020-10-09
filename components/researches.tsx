import React from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { consumeResource } from '../actions/vault';
import { styles } from '../styles';

import Research from '../models/research';
import ResearchStatus from '../models/research_status';
import Vault from '../models/vault';
import { researches } from '../instances/researches';
import { RESOURCE_TYPES } from '../enums/resource_types';

export default function ResearchesComponent(props: ResearchProps) {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault)
  const researchArray = Object.keys(props.researchStatus.status).map((name) => {
    return {name: name, status: props.researchStatus.status[name]}
  });

  function startClick(researchStatus: {name: string, status: string}, vault: Vault) {
    let research = researches[researchStatus.name];
    let quantity = vault.resources[RESOURCE_TYPES.KNOWLEDGE].quantity;
    if (quantity >= research.knowledgeReq) {
      dispatch(consumeResource(vault, {
        type: RESOURCE_TYPES.KNOWLEDGE,
        quantity: research.knowledgeReq
      }));
      researchStatus.status = 'completed';
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
      <View><Text style={styles.heading1}>Research</Text></View>
      <View><Text>{vault.resources[RESOURCE_TYPES.KNOWLEDGE].quantity
          + ' available knowledge'}</Text></View>
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
  const researchStatus = props.research.item;

  function renderButton(researchStatus: {name: string, status: string}, vault: Vault) {
    if (researchStatus.status == 'completed') {
      return (
        <View style={styles.buttonResearchWrapper}>
          <Button title="Completed" color="#841584" disabled onPress={() => {}} />
        </View>
      );
    }
    return (
      <View style={styles.buttonResearchWrapper}>
        <Button title="Ready" color="#841584"
          onPress={() => props.startClick(researchStatus, vault)} />
      </View>
    );
  }

  function renderCost(researchStatus: {name: string, status: string}) {
    const research = researches[researchStatus.name];
    if (researchStatus.status == 'visible') {
      return <View><Text>{'Cost: ' + research.knowledgeReq + ' knowledge'}</Text></View>;
    }
    return null;
  }

  return (
    <View style={styles.panelFlex}>
      {renderButton(researchStatus, props.vault)}
      <View>
        <View><Text>{researchStatus.name}</Text></View>
        {renderCost(researchStatus)}
      </View>
    </View>
  );
}

interface ResearchProps {
  researchStatus: ResearchStatus,
  vault: Vault
}
