import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';

import BuildingType from '../models/building_type';
import BuildingRecipe from '../models/building_recipe';
import { resourceTypes } from '../instances/resource_types';
import { buildingTypes } from '../instances/building_types';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';

const RATE_ADJ = 10;

export default function ValueCheckComponent() {
  return (
    <View style={StyleSheet.flatten([styles.container, {width: 800}])}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome" name="plus" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Values'}</Text>
      </View>
      <View style={StyleSheet.flatten([styles.panelFlexColumn,
        {alignItems: 'flex-start', minWidth: 780}])}>
        {renderHeader()}
      </View>
      <ScrollView>
        <View style={StyleSheet.flatten([styles.panelFlexColumn,
          {alignItems: 'flex-start', minWidth: 780}])}>
          {renderDisplay()}
        </View>
      </ScrollView>
    </View>
  );

  function renderHeader() {
    return (
      <View style={styles.rows}>
        <View style={{minWidth: 100, maxWidth: 100}}>
          <Text>{"Name"}</Text>
        </View>
        <View style={{minWidth: 50, maxWidth: 50}}>
          <Text>{"T Val"}</Text>
        </View>
        <View style={{minWidth: 50, maxWidth: 50}}>
          <Text>{"C Val"}</Text>
        </View>
        <View style={{minWidth: 100, maxWidth: 100}}>
          <Text>{"Building"}</Text>
        </View>
        <View style={{minWidth: 50, maxWidth: 50}}>
          <Text>{"B Val"}</Text>
        </View>
        <View style={{minWidth: 50, maxWidth: 50}}>
          <Text>{"Rate"}</Text>
        </View>
        <View style={{minWidth: 200, maxWidth: 200}}>
          <Text>{"Ingredients"}</Text>
        </View>
      </View>
    );
  }

  function renderDisplay() {
    const displayArray = createDisplayArray();

    return displayArray.map((valueDisplay, index) => {
      return (
        <View style={StyleSheet.flatten([styles.rows, { borderBottomStyle: 'solid',
          borderBottomWidth: 1, borderBottomColor: '#000' }])}>
          <View style={{minWidth: 100, maxWidth: 100}}>
            <Text>{valueDisplay.resourceName}</Text>
          </View>
          <View style={{minWidth: 50, maxWidth: 50}}>
            <Text>{valueDisplay.currentValue}</Text>
          </View>
          <View style={{minWidth: 50, maxWidth: 50}}>
            <Text>{utils.formatNumberShort(valueDisplay.computedValue)}</Text>
          </View>
          <View style={{minWidth: 100, maxWidth: 100}}>
            <Text>{valueDisplay.building}</Text>
          </View>
          <View style={{minWidth: 50, maxWidth: 50}}>
            <Text>{valueDisplay.buildingValue}</Text>
          </View>
          <View style={{minWidth: 50, maxWidth: 50}}>
            <Text>{valueDisplay.rate}</Text>
          </View>
          {renderIngredients(valueDisplay.ingredients)}
        </View>
      );
    });
  }

  function renderIngredients(ingredients: { specificity: string, type: string,
    quantity: number }[] | null) {
    if (ingredients == null) {
      return (
        <View style={{minWidth: 200, maxWidth: 200}}></View>
      );
    }
    return (
      <View style={StyleSheet.flatten([styles.rows,
        {flexWrap: 'wrap', minWidth: 200, maxWidth: 200}])}>
        {ingredients.map((ingredient, index) => {
          let comma = ', ';
          if (index == ingredients.length-1) { comma = ''; }
          return (
            <Text>{(ingredient.type + ' x' + ingredient.quantity + comma)}</Text>
          );
        })}
      </View>
    );
  }

  function createDisplayArray() {
    let displayArray: ValueDisplay[] = [];
    const upgradeCostMap = formUpgradeCostMap();

    Object.keys(buildingTypes).map((typeName) => {
      const buildingType = buildingTypes[typeName];
      if (buildingType.recipes) {
        buildingType.recipes.map((recipe) => {
          if (recipe.produces) {
            recipe.produces.map((p) => {
              displayArray.push(createOneValueDisplay(p, buildingType, recipe,
                upgradeCostMap));
            });
          }
        });
      }
    });

    return displayArray;
  }

  function createOneValueDisplay(p: { specificity: string, type: string,
    quantity: number, probability: number }, bt: BuildingType, br: BuildingRecipe,
    ucm: { [type: string] : number }) {
    let currentValue = 0;
    const rt = utils.getMatchingResourceKind(p.specificity, p.type);
    if (rt) {
      if (rt.value) { currentValue = rt.value; }
    }
    let buildingValue = 0;
    if (bt.cost) {
      bt.cost.map((cost) => {
        const bct = utils.getMatchingResourceKind(cost.specificity, cost.type);
        if (bct) {
          if (bct.value) { buildingValue += (bct.value * cost.quantity); }
        }
      });
    }
    if (buildingValue == 0 && ucm[bt.name]) {
      buildingValue = ucm[bt.name];
    }
    let computedValue = 1;
    if (br.consumes) {
      br.consumes.map((consume) => {
        const crt = utils.getMatchingResourceKind(consume.specificity, consume.type);
        let value = 1;
        if (consume.specificity === RESOURCE_SPECIFICITY.EXACT && crt.value) {
          value = crt.value;
        }
        computedValue += (value * (consume.quantity / RATE_ADJ));
      });
    }
    computedValue *= (RATE_ADJ / p.quantity);
    computedValue += (buildingValue * 0.0001);
    let newValueDisplay = new ValueDisplay({ resourceName: p.type, currentValue,
      building: bt.name, buildingValue, rate: p.quantity,
      ingredients: br.consumes, computedValue });
    return newValueDisplay;
  }

  function formUpgradeCostMap() {
    let upgradeCostMap: { [type: string] : number } = {};
    Object.keys(buildingTypes).forEach((typeName) => {
      const buildingType = buildingTypes[typeName];
      if (buildingType.upgradeCost && buildingType.upgradesInto) {
        let upgradeCost = 0;
        buildingType.upgradeCost.map((cost) => {
          const bct = utils.getMatchingResourceKind(cost.specificity, cost.type);
          if (bct) {
            if (bct.value) { upgradeCost += (bct.value * cost.quantity); }
          }
        });
        upgradeCostMap[buildingType.upgradesInto] = upgradeCost;
      }
    });
    return upgradeCostMap;
  }
}

class ValueDisplay {
  resourceName: string = '';
  currentValue: number = 0;
  building: string = '';
  buildingValue: number = 0;
  rate: number = 0;
  ingredients: { specificity: string, type: string, quantity: number }[]|null = [];
  computedValue: number = 0;

  constructor(valueDisplay: any) {
    Object.assign(this, valueDisplay);
  }
}
