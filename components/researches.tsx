import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { styles } from '../styles';

import Research from '../models/research';
import ResearchStatus from '../models/research_status';
import { researches } from '../instances/researches';

function ResearchDescription(props: any) {
  let researchStatus = props.research.item;
  function renderBox(researchStatus: {name: string, status: string}) {
    if (researchStatus.status == 'completed') {
      return <>{'[x] '}</>
    }
    return <>{'[ ] '}</>
  }
  return (
    <View>
      <Text>{renderBox(researchStatus)}{researchStatus.name}</Text>
    </View>
  );
}

export default function ResearchesComponent(props: ResearchProps) {
  const researchArray = Object.keys(props.researchStatus.status).map((name) => {
    return {name: name, status: props.researchStatus.status[name]}
  });
  function renderResearch(research: any) {
    return <ResearchDescription research={research} />
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading1}>Research</Text>
      </View>
      <FlatList
        data={researchArray}
        renderItem={renderResearch}
        keyExtractor={research => research.name}>
      </FlatList>
    </View>
  );
}

interface ResearchProps {
  researchStatus: ResearchStatus
}
