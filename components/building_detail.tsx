import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import { selectBuildingRecipe, payBuildingUpgradeCost } from '../actions/buildings';
import { payBuildingCost, removeBuildingConstruction }
  from '../actions/buildings_construction';
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
  const buildingsConstruction = useTypedSelector(state => state.buildingsConstruction);
  const introState = useTypedSelector(state => state.account.introState);
  const modalDisplayed = useTypedSelector(state => state.ui.modalDisplayed);
  const modalValue: Building = useTypedSelector(state => state.ui.modalValue);
  const vault: Vault = useTypedSelector(state => state.vault);
  const buildTimer: Timer = useTypedSelector(state => state.timers['Build']);
  const leaders = useTypedSelector(state => state.leaders);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let building: Building = modalValue;
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
      <View style={StyleSheet.flatten([styles.descriptionBand,
        {minWidth: positioner.modalWidth,
          maxWidth: positioner.modalWidth}])}>
        <Text style={styles.descriptionBandText}>{buildingType.description}</Text>
      </View>
      {renderUpgradeCostContainer()}
      {renderRecipeContainer()}
    </View>
  );

  function renderUpgradeCostContainer() {
    const buildingType = buildingTypes[building.buildingType];

    if (modalDisplayed == MODALS.BUILDING_DETAIL && (!buildingType.upgradesInto
      || !buildingType.upgradeCost)) { return null; }
    if (modalDisplayed == MODALS.BUILD_DETAIL && !buildingType.cost) { return null; }

    let disabledMessage: string|null = null;
    if (buildTimer) {
      disabledMessage = ('We can\'t work on this, we\'re already building '
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
      let text = 'To upgrade:';
      if (modalDisplayed == MODALS.BUILD_DETAIL) { text = 'To build:'; }
      return (
        <View>
          <Text style={styles.bareText}>{text}</Text>
          <View style={styles.rows}>
            {renderBuildButton()}
            <View>
              {renderBuildCosts()}
            </View>
          </View>
        </View>
      );
    }
    return (
      <Text style={styles.bareText}>{disabledMessage}</Text>
    );
  }

  function renderBuildButton() {
    const buildingType = buildingTypes[building.buildingType];

    let costsPaid = true;
    let cost = buildingType.upgradeCost;
    let buttonText = ' Upgrade';
    if (modalDisplayed == MODALS.BUILD_DETAIL) {
      cost = buildingType.cost;
      buttonText = ' Build';
    }
    if (cost) {
      cost.map((aCost) => {
        if (modalDisplayed == MODALS.BUILDING_DETAIL
          && !building.paidUpgradeCosts[aCost.type]) {
          costsPaid = false;
        }
        else if (modalDisplayed == MODALS.BUILD_DETAIL
          && !building.paidCosts[aCost.type]) {
          costsPaid = false;
        }
      });

      if (costsPaid) {
        return (
          <TouchableOpacity style={styles.buttonLarge}
            onPress={() => buildPress(building)} >
            <IconComponent provider="FontAwesome5" name="hammer" color="#fff" size={16}
              style={styles.headingIcon} />
            <Text style={styles.buttonTextLarge}>{buttonText}</Text>
          </TouchableOpacity>
        );
      }
    }
    return null;
  }

  function renderBuildCosts() {
    const buildingType = buildingTypes[building.buildingType];
    let cost = buildingType.upgradeCost;
    if (modalDisplayed == MODALS.BUILD_DETAIL) {
      cost = buildingType.cost;
    }
    if (!cost) { return null; }

    return cost.map((aCost) => {
      let resource = utils.getMatchingResourceType(aCost.specificity, aCost.type);
      let resourceQuantity =
        Math.floor(vault.getQuantity(aCost.specificity, aCost.type));
      let buttonStyle = styles.buttonRowItem;
      let buttonDisabled = false;
      let paidCost = false;
      if (modalDisplayed == MODALS.BUILDING_DETAIL) {
        paidCost = building.paidUpgradeCosts[aCost.type];
      }
      else if (modalDisplayed == MODALS.BUILD_DETAIL) {
        paidCost = building.paidCosts[aCost.type];
      }

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
    let rTypePool: string[] = [];
    switch(aCost.specificity) {
      case RESOURCE_SPECIFICITY.EXACT:
      rTypePool = [aCost.type];
      break;

      case RESOURCE_SPECIFICITY.TAG:
      let tagPool = vault.getTagResources(aCost.type);
      rTypePool = tagPool.map((resource) => { return resource.type; });
      break;

      case RESOURCE_SPECIFICITY.SUBCATEGORY:
      let scPool = vault.getSubcategoryResources(aCost.type);
      rTypePool = scPool.map((resource) => { return resource.type; });
      break;

      case RESOURCE_SPECIFICITY.CATEGORY:
      let catPool = vault.getCategoryResources(aCost.type);
      rTypePool = catPool.map((resource) => { return resource.type; });
      break;
    }

    if (rTypePool.length == 1) {
      dispatch(consumeResources(vault, [{type: rTypePool[0], quantity: aCost.quantity}]));
      if (modalDisplayed == MODALS.BUILDING_DETAIL) {
        dispatch(payBuildingUpgradeCost(building, aCost, [aCost]));
      }
      else if (modalDisplayed == MODALS.BUILD_DETAIL) {
        dispatch(payBuildingCost(building, aCost, [aCost]));
      }
    }
    else {
      if (modalDisplayed == MODALS.BUILDING_DETAIL) {
        dispatch(displayModalValue(MODALS.RESOURCE_SELECT, 'open',
          {type: 'Building detail', aCost, building}));
      }
      else if (modalDisplayed == MODALS.BUILD_DETAIL) {
        dispatch(displayModalValue(MODALS.RESOURCE_SELECT, 'open',
          {type: 'Build detail', aCost, building}));
      }
    }
  }

  function buildPress(building: Building) {
    let buildingType = buildingTypes[building.buildingType];

    if (modalDisplayed == MODALS.BUILDING_DETAIL && buildingType.upgradesInto
      && buildingTypes[buildingType.upgradesInto]) {
      let upgType = buildingTypes[buildingType.upgradesInto];
      if (upgType.upgradeDuration) {
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
    else if (modalDisplayed == MODALS.BUILD_DETAIL) {
      const buildingType = buildingTypes[building.buildingType];
      if (buildingType.duration) {
        dispatch(addTimer(new Timer({
          name: 'Build',
          startedAt: new Date(Date.now()).valueOf(),
          endsAt: (new Date(Date.now()).valueOf() + buildingType.duration * 1000),
          progress: 0,
          remainingLabel: '',
          buildingToBuild: building.buildingType,
          messageToDisplay: ('You built a new ' + buildingType.name + '.'),
          iconToDisplay: buildingType.icon,
          iconForegroundColor: buildingType.foregroundColor,
          iconBackgroundColor: buildingType.backgroundColor
        })));
        dispatch(removeBuildingConstruction(building));
        dispatch(displayModal(null));
      }
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
    const newRates = new Hourglass().setRates(tempBuildings, leaders);
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
