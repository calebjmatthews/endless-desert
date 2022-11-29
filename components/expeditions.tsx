import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import SvgComponent from './svg';

import Icon from '../models/icon';
import { destinations } from '../instances/destinations';
import { explorations } from '../instances/explorations';
import { utils } from '../utils';

export default function ExpeditionsComponent() {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="route"
          color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Expeditions'}</Text>
      </View>
      <ScrollView>
        <Destinations />
      </ScrollView>
    </View>
  );
}

function Destinations() {
  const positioner = useTypedSelector(state => state.ui.positioner);
  const researchStatus = useTypedSelector(state => state.researchStatus);

  return <View style={styles.rows}>
    {Object.keys(destinations).map((name) => {
      const destination = destinations[name];
      const exploration = explorations[destination.atFinish.id];
      if (!researchStatus.destinationsAvailable[name]) { return null; }
      return (
        <TouchableOpacity key={destination.name} style={StyleSheet.flatten([styles.panelFlex,
          {minWidth: positioner.majorWidth, maxWidth: positioner.majorWidth}])}
          onPress={() => {}}>
          <SvgComponent icon={new Icon({ ...destination.icon, size: 40 })} />
          <View style={[styles.containerStretchColumn, { marginLeft: 5 }]}>
            <Text>{destination.name}</Text>
            <View style={styles.breakSmall} />
            <Text style={{fontSize: 12, fontStyle: 'italic', minWidth: positioner.bodyMedWidth, 
              maxWidth: positioner.bodyMedWidth}}>
              {exploration.description}
            </Text>
            <View style={styles.breakSmall} />
            <View style={styles.rows}>
              <Text>{`Rewards: `}</Text>
              {exploration.treasures.map((treasure) => {
                const resourceKind = utils.getMatchingResourceKind(treasure.specificity, treasure.type);
                return (
                  <IconOrSvg key={`${destination.name}-${treasure.type}`}
                    icon={new Icon({...resourceKind.icon, size: 18})} />
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      );
    })}
  </View>
}

function IconOrSvg(props: {icon: Icon}) {
  const { icon } = props;

  switch(icon.provider) {
    case 'svg':
    return <SvgComponent icon={icon} />;

    default:
    return <IconComponent {...icon} />;
  }
}