import React from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import { styles } from '../styles';

import Research from '../models/research';
import ResearchStatus from '../models/research_status';
import Vault from '../models/vault';
import { researches } from '../instances/researches';
import { RESOURCE_TYPES } from '../enums/resource_types';

function ResearchDescription(props: {research: any, vault: Vault}) {
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
        <Button title="Start" color="#841584"
          onPress={() => startClick(researchStatus, vault)} />
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

  function startClick(researchStatus: {name: string, status: string}, vault: Vault) {
    console.log('researchStatus');
    console.log(researchStatus);
    console.log('vault');
    console.log(vault);
    let research = researches[researchStatus.name];
    let quantity = props.vault.resources[RESOURCE_TYPES.KNOWLEDGE].quantity;
    if (quantity >= research.knowledgeReq) {
      vault.consumeResource({
        type: RESOURCE_TYPES.KNOWLEDGE,
        quantity: research.knowledgeReq
      });
      researchStatus.status = 'completed';
    }
    else {
      console.log('Not enough knowledge!');
    }
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

export default function ResearchesComponent(props: ResearchProps) {
  const researchArray = Object.keys(props.researchStatus.status).map((name) => {
    return {name: name, status: props.researchStatus.status[name]}
  });
  function renderResearch(research: any, vault: Vault) {
    return <ResearchDescription research={research} vault={vault} />
  }

  return (
    <View style={styles.container}>
      <View><Text style={styles.heading1}>Research</Text></View>
      <View><Text>{props.vault.resources[RESOURCE_TYPES.KNOWLEDGE].quantity
          + ' available knowledge'}</Text></View>
      <FlatList
        data={researchArray}
        renderItem={(item) => renderResearch(item, props.vault)}
        keyExtractor={research => research.name}>
      </FlatList>
    </View>
  );
}

interface ResearchProps {
  researchStatus: ResearchStatus,
  vault: Vault
}
