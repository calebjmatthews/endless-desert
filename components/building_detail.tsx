import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import { selectBuildingRecipe } from '../actions/buildings';
import { setRates } from '../actions/rates';
import { displayModal } from '../actions/ui';

import Building from '../models/building';
import BuildingRecipe from '../models/building_recipe';
import Hourglass from '../models/hourglass';
import { buildingTypes } from '../instances/building_types';
import { resourceTypes } from '../instances/resource_types';

export default function BuildDetailComponent() {
  const dispatch = useDispatch();
  const buildings = useTypedSelector(state => state.buildings);
  const modalValue: Building = useTypedSelector(state => state.ui.modalValue);
  const building = buildings[modalValue.id];
  const buildingType = buildingTypes[building.buildingType];

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <BadgeComponent
          provider={buildingType.icon.provider}
          name={buildingType.icon.name}
          foregroundColor={buildingType.foregroundColor}
          backgroundColor={buildingType.backgroundColor}
          iconSize={24} />
        <Text style={styles.heading1}>{building.name}</Text>
      </View>
      <View style={styles.descriptionBand}>
        <Text style={styles.descriptionBandText}>{buildingType.description}</Text>
      </View>
      {renderRecipeContainer()}
    </View>
  );

  function renderRecipeContainer() {
    const buildingType = buildingTypes[building.buildingType];
    if (buildingType.recipes) {
      return (
        <View style={{width: 250}}>
          {renderRecipes(buildingType.recipes)}
        </View>
      );
    }
    else {
      return null;
    }
  }

  function renderRecipes(recipes: BuildingRecipe[]) {
    return recipes.map((recipe) => {
      if (recipes.length == 1) {
        return (
          <View key={recipe.index}>
            {renderRecipe(recipe)}
          </View>
        );
      }
      return (
        <View key={recipe.index}>
          <Text style={styles.bareText}>{'Option #' + (recipe.index + 1)}</Text>
          <View style={styles.sideButtonContainer}>
            {renderSelectButton(recipe)}
            {renderRecipe(recipe)}
          </View>
        </View>
      );
    });
  }

  function renderSelectButton(recipe: BuildingRecipe) {
    if (building.recipeSelected == recipe.index) {
      return (
        <TouchableOpacity style={StyleSheet.flatten([styles.button,
          styles.sideButton])} >
          <IconComponent provider="FontAwesome5" name="check-square" color="#fff"
            size={20} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={StyleSheet.flatten([styles.button,
        styles.sideButton, styles.buttonLight])}
        onPress={() => { pressSelectRecipe(building, recipe.index) }} >
        <IconComponent provider="FontAwesome5" name="square" color="#071f56"
          size={20} />
      </TouchableOpacity>
    );
  }

  function pressSelectRecipe(building: Building, recipeIndex: number) {
    dispatch(selectBuildingRecipe(building, recipeIndex));
    let tempBuildings: { [id: string] : Building } = {};
    Object.keys(buildings).map((id) => {
      tempBuildings[id] = new Building(buildings[id]);
    });
    tempBuildings[building.id].recipeSelected = recipeIndex;
    const newRates = new Hourglass().setRates(tempBuildings);
    dispatch(setRates(newRates));
  }

  function renderRecipe(recipe: BuildingRecipe) {
    let rates: {resourceName: string, rate: number}[] = [];
    if (recipe.produces) {
      recipe.produces.map((produce) => {
        rates.push({resourceName: produce.type, rate: produce.quantity});
      });
    }
    if (recipe.consumes) {
      recipe.consumes.map((consume) => {
        rates.push({resourceName: consume.type, rate: (consume.quantity * -1)});
      });
    }
    return (
      <View>
        {rates.map((rate) => renderRates(rate.resourceName, rate.rate))}
      </View>
    );
  }

  function renderRates(resourceName: string, rate: number) {
    const resource = resourceTypes[resourceName];
    let sign = '+';
    let rateStyle = { background: '#b8ccfb', paddingHorizontal: 4 };
    if (rate < 0) {
      sign = '';
      rateStyle.background = '#ffb4b1';
    }
    return (
      <View key={resourceName} style={StyleSheet.flatten([styles.rows, rateStyle]) }>
        <Text>{sign + rate}</Text>
        <BadgeComponent
          provider={resource.icon.provider}
          name={resource.icon.name}
          foregroundColor={resource.foregroundColor}
          backgroundColor={resource.backgroundColor}
          iconSize={12} />
        <Text>{ resource.name + '/m ' }</Text>
      </View>
    );
  }
}
