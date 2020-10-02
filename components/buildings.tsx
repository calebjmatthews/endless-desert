import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { styles } from '../styles';

function BuildingDescription(props: any) {
  return (
    <View>
      <Text>{props.building.item.name}</Text>
    </View>
  );
}

export default function Building() {
  const buildings = [
    { id: 0, name: "Trading Post", quantity: 1 },
    { id: 1, name: "House", quantity: 1 },
    { id: 2, name: "Cistern", quantity: 1 },
    { id: 3, name: "Lentil Field", quantity: 1 }
  ];

  function renderBuilding(building: any) {
    return <BuildingDescription building={building} />
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading1}>Buildings</Text>
      </View>
      <FlatList
        data={buildings}
        renderItem={renderBuilding}
        keyExtractor={building => building.id.toString()}>
      </FlatList>
    </View>
  );
}
