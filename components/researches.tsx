import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { styles } from '../styles';

import Research from '../models/research';

function ResearchDescription(props: any) {
  return (
    <View>
      <Text>{props.research.item.name}</Text>
    </View>
  );
}

export default function ResearchesComponent(props: ResearchProps) {
  const researchesArray = Object.keys(props.researches).map((name) => {
    return props.researches[name];
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
        data={researchesArray}
        renderItem={renderResearch}
        keyExtractor={research => research.name}>
      </FlatList>
    </View>
  );
}

interface ResearchProps {
  researches: { [name: string] : Research }
}
