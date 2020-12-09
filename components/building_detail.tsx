import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import { selectBuildingRecipe, payBuildingUpgradeCost } from '../actions/buildings';
import { setRates } from '../actions/rates';
import { addTimer } from '../actions/timers';
import { displayModal, displayModalValue, addMessage } from '../actions/ui';
import { consumeResources } from '../actions/vault';

import Building from '../models/building';
import BuildingRecipe from '../models/building_recipe';
import Hourglass from '../models/hourglass';
import Vault from '../models/vault';
import Timer from '../models/timer';
import { buildingTypes } from '../instances/building_types';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { INTRO_STATES } from '../enums/intro_states';
import { BUILDING_TYPES } from '../enums/building_types';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { MODALS } from '../enums/modals';

export default function BuildDetailComponent() {
  const dispatch = useDispatch();
  const buildings = useTypedSelector(state => state.buildings);
  const introState = useTypedSelector(state => state.account.introState);
  const modalValue: Building = useTypedSelector(state => state.ui.modalValue);
  const vault: Vault = useTypedSelector(state => state.vault);
  const buildTimer: Timer = useTypedSelector(state => state.timers['Build']);
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
      {renderUpgradeCostContainer()}
      {renderRecipeContainer()}
    </View>
  );

  function renderUpgradeCostContainer() {
    const buildingType = buildingTypes[building.buildingType];

    if (!buildingType.upgradesInto || !buildingType.upgradeCost) { return null; }

    let disabledMessage: string|null = null;
    let upgradeStyle: any = styles.buttonRowItem;
    if (buildTimer) {
      disabledMessage = ('We can\'t upgrade this, we\'re already building '
        + 'something else');
    }
    else if (introState == INTRO_STATES.REPAIR_CISTERN
      && buildingType.name != BUILDING_TYPES.BROKEN_CISTERN) {
      disabledMessage = ('I shouldn\'t spend time on this, '
        + 'a source of water is more important.');
    }
    else if (introState == INTRO_STATES.RESTORE_FIELD
      && buildingType.name != BUILDING_TYPES.FALLOW_FIELD) {
        disabledMessage = ('I shouldn\'t spend time on this, '
          + 'reliable food is more important.');
    }
    else if (introState == INTRO_STATES.REFURBISH_STUDY
      && buildingType.name != BUILDING_TYPES.DECAYING_STUDY) {
        disabledMessage = ('I shouldn\'t spend time on this, '
          + 'I need somewhere to sleep and plan.');
    }

    if (!disabledMessage) {
      return (
        <View>
          <Text style={styles.bareText}>{'To upgrade:'}</Text>
          <View style={styles.rows}>
            {renderUpgradeButton()}
            <View>
              {renderUpgradeCosts()}
            </View>
          </View>
        </View>
      );
    }
    return (
      <Text style={styles.bareText}>{disabledMessage}</Text>
    );
  }

  function renderUpgradeButton() {
    const buildingType = buildingTypes[building.buildingType];

    let costsPaid = true;
    if (buildingType.upgradeCost) {
      buildingType.upgradeCost.map((aCost) => {
        if (!building.paidUpgradeCosts[aCost.type]) {
          costsPaid = false;
        }
      });

      if (costsPaid) {
        return (
          <TouchableOpacity style={styles.buttonLarge}
            onPress={() => upgradePress(building)} >
            <IconComponent provider="FontAwesome5" name="hammer" color="#fff" size={16}
              style={styles.headingIcon} />
            <Text style={styles.buttonTextLarge}>{' Upgrade'}</Text>
          </TouchableOpacity>
        );
      }
    }
    return null;
  }

  function renderUpgradeCosts() {
    const buildingType = buildingTypes[building.buildingType];
    if (!buildingType.upgradeCost) { return null; }

    return buildingType.upgradeCost.map((aCost) => {
      let resource = utils.getMatchingResource(aCost.specificity, aCost.type);
      let resourceQuantity =
        Math.floor(vault.getQuantity(aCost.specificity, aCost.type));
      let buttonStyle = styles.buttonRowItem;
      let buttonDisabled = false;
      let paidCost = building.paidUpgradeCosts[aCost.type];

      if (resourceQuantity < aCost.quantity || paidCost) {
        // @ts-ignore
        buttonStyle = StyleSheet.compose(styles.buttonRowItem, styles.buttonDisabled);
        buttonDisabled = true;
      }
      let costText = (utils.formatNumberShort(aCost.quantity) + ' (of '
        + utils.formatNumberShort(resourceQuantity) + ') ' + resource.name);
      if (paidCost) { costText = 'Paid'; }
      return (
        <TouchableOpacity key={aCost.type} style={buttonStyle}
          disabled={buttonDisabled} onPress={() => { applyCost(aCost); }} >
          <BadgeComponent
            provider={resource.icon.provider}
            name={resource.icon.name}
            foregroundColor={resource.foregroundColor}
            backgroundColor={resource.backgroundColor}
            iconSize={16} />
          <Text style={styles.buttonText}>
            {costText}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  function applyCost(aCost: {specificity: string, type: string, quantity: number}) {
    if (aCost.specificity == RESOURCE_SPECIFICITY.EXACT) {
      dispatch(consumeResources(vault, [{type: aCost.type, quantity: aCost.quantity}]));
      dispatch(payBuildingUpgradeCost(building, aCost, [aCost]));
    }
    else {
      dispatch(displayModalValue(MODALS.RESOURCE_SELECT, 'open',
        {type: 'Building detail', aCost, building}));
    }
  }

  function upgradePress(building: Building) {
    let buildingType = buildingTypes[building.buildingType];
    let enoughResources = true;
    if (buildingType.upgradeCost == null) { return null; }
    let resourceCost: {type: string, quantity: number}[] = [];

    if (buildingType.upgradesInto && buildingTypes[buildingType.upgradesInto]) {
      let upgType = buildingTypes[buildingType.upgradesInto];
      if (upgType.upgradeDuration) {
        if (enoughResources && buildingType.duration) {
          dispatch(addTimer(new Timer({
            name: 'Build',
            startedAt: new Date(Date.now()).valueOf(),
            endsAt: (new Date(Date.now()).valueOf() + upgType.upgradeDuration * 1000),
            progress: 0,
            remainingLabel: '',
            buildingToUpgrade: building.id,
            messageToDisplay: ('You upgraded ' + buildingType.name + ' into '
              + upgType.name + '.'),
            iconToDisplay: buildingType.icon,
            iconForegroundColor: buildingType.foregroundColor,
            iconBackgroundColor: buildingType.backgroundColor
          })));
          dispatch(displayModal(null));
        }
      }
    }
    else {
      console.log('Not enough resources!');
    }
  }

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
