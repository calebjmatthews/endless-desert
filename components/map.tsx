import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import SVGComponent from './svg';

import Terrain from '../models/terrain';
import Icon from '../models/icon';
import { buildingTypes } from '../instances/building_types';
import { TERRAIN_TYPES } from '../enums/terrain_types';
import { SVGS } from '../enums/svgs';

export default function MapComponent(props: { terrain: Terrain,
  buildingMap: { [typeName: string] : [number, number] } }) {
  const dispatch = useDispatch();
  const t = props.terrain;
  const buildingsCoords: string[][] = [];
  t.spots.forEach((spotColumn, col) => {
    buildingsCoords[col] = [];
  });
  Object.keys(props.buildingMap).forEach((typeName) => {
    const coords = props.buildingMap[typeName];
    buildingsCoords[coords[0]][coords[1]] = typeName;
  });

  return (
    <View style={styles.rows}>
      {t.spots.map((spotColumn, col) => (
        <View key={`col|${col}`} style={styles.mapColumn}>
          {spotColumn.map((spot, row) => (
            <Spot spot={spot} coords={[col, row]}
              buildingTypeName={buildingsCoords[col][row]} />
          ))}
        </View>
      ))}
    </View>
  )
}

function Spot(props: { spot: { type: string }, coords: [number, number],
    buildingTypeName?: string }) {
  const icons: { [type: string] : Icon } = {
    [TERRAIN_TYPES.WATER]: new Icon({ provider: 'svg', name: SVGS.TERRAIN_WATER,
      color: "#4b83c0", shadow: "#b9c4ed", size: 50 }),
    [TERRAIN_TYPES.RIVERBANK]: new Icon({ provider: 'svg', name: SVGS.TERRAIN_RIVERBANK,
      color: "#ac9992", shadow: "#e3dacb", size: 50 }),
    [TERRAIN_TYPES.SAND]: new Icon({ provider: 'svg', name: SVGS.TERRAIN_SAND,
      color: "#ffd7b3", shadow: "#fff5cc", size: 50 })
  };
  const buildingType = props.buildingTypeName ? buildingTypes[props.buildingTypeName]
    : null;
  return (
    <View style={styles.container} key={props.coords.join('|')}>
      <View style={{ margin: 1, opacity: 0.9 }}>
        <SVGComponent icon={icons[props.spot.type]} />
      </View>
      {buildingType && (
        <View style={{ position: 'absolute' }}>
          <SVGComponent icon={new Icon({...buildingType.icon, size: 40})}  />
        </View>
      )}
    </View>
  );
}
