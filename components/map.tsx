import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import BuildingsComponent from './buildings';
import SVGComponent from './svg';
import IconComponent from './icon';
import { displayModalValue } from '../actions/ui';

import Terrain from '../models/terrain';
import Building from '../models/building';
import Icon from '../models/icon';
import Timer from '../models/timer';
import { buildingTypes } from '../instances/building_types';
import { TERRAIN_TYPES } from '../enums/terrain_types';
import { MODALS } from '../enums/modals';
import { SVGS } from '../enums/svgs';

export default function MapComponent() {
  const dispatch = useDispatch();
  const terrain = useTypedSelector(state => state.terrain);
  const buildings = useTypedSelector(state => state.buildings);
  const buildTimer = useTypedSelector(state => state.timers['Build']);
  const timerCoords = (buildTimer?.buildingToBuild?.coords
    || buildings[(buildTimer?.buildingToUpgrade || 0)]?.coords);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const buildingsCoords: Building[][] = [];
  terrain.spots.forEach((spotColumn, col) => {
    buildingsCoords[col] = [];
  });
  Object.keys(buildings).forEach((id) => {
    const coords = buildings[id].coords;
    if (coords) { buildingsCoords[coords[0]][coords[1]] = buildings[id]; }
  });

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="map" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Town'}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.columns}>
        <View style={[styles.centeredRows, {marginBottom: 30}]}>
          {terrain.spots.map((spotColumn, col) => (
            <View key={`col#${col}`} style={styles.mapColumn}>
              {spotColumn.map((spot, row) => (
                <Spot key={`${col}|${row}`} spot={spot} coords={[col, row]}
                  building={buildingsCoords[col][row]} buildTimer={buildTimer}
                  timerCoords={timerCoords} />
              ))}
            </View>
          ))}
        </View>
        <BuildingsComponent />
      </ScrollView>
    </View>
  )
}

function Spot(props: { spot: { type: string }, coords: [number, number],
  building?: Building, buildTimer: Timer, timerCoords?: [number, number] }) {
  const dispatch = useDispatch();
  const icons: { [type: string] : Icon } = {
    [TERRAIN_TYPES.WATER]: new Icon({ provider: 'svg', name: SVGS.TERRAIN_WATER,
      color: "#4b83c0", shadow: "#b9c4ed", size: 50 }),
    [TERRAIN_TYPES.RIVERBANK]: new Icon({ provider: 'svg', name: SVGS.TERRAIN_RIVERBANK,
      color: "#ac9992", shadow: "#f4ebdd", size: 50 }),
    [TERRAIN_TYPES.SAND]: new Icon({ provider: 'svg', name: SVGS.TERRAIN_SAND,
      color: "#ffd7b3", shadow: "#fff5cc", size: 50 })
  };
  const buildingType = props.building ? buildingTypes[props.building.buildingType]
    : null;
  const underConstruction = (props.coords[0] === props.timerCoords?.[0]
    && props.coords[1] === props.timerCoords?.[1]);

  return (
    <TouchableOpacity style={styles.container}
      onPress={() => { spotPress({ spot: props.spot, coords: props.coords,
        building: props.building }) }}>
      <View style={{ margin: 1, opacity: 0.9 }}>
        <SVGComponent icon={icons[props.spot.type]} />
      </View>
      {buildingType && (
        <View style={{ position: 'absolute' }}>
          <SVGComponent icon={new Icon({...buildingType.icon, size: 40})}  />
        </View>
      )}
      {underConstruction && (
        <View style={{ position: 'absolute' }}>
          <SVGComponent icon={new Icon({ provider: 'svg', name: SVGS.HAMMERS,
            size: 30})}  />
        </View>
      )}
    </TouchableOpacity>
  );

  function spotPress(props: { spot: { type: string}, coords: [number, number],
    building?: Building }) {
    const { spot, coords, building } = props;
    if (building) {
      dispatch(displayModalValue(MODALS.BUILDING_DETAIL, 'open', building));
    }
    else {
      dispatch(displayModalValue(MODALS.SPOT, 'open',
        { spot, coords, subType: 'from_storage' }));
    }
  }
}
