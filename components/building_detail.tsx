import React, { useState, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import { selectBuildingRecipe, setBuildingSpecificRecipe, payBuildingUpgradeCost,
  removeBuilding } from '../actions/buildings';
import { payBuildingCost, removeBuildingConstruction }
  from '../actions/buildings_construction';
import { addBuildingToStorage } from '../actions/buildings_storage';
import { setRates } from '../actions/rates';
import { addTimer } from '../actions/timers';
import { displayModal, displayModalValue, addMessage } from '../actions/ui';
import { consumeResources } from '../actions/vault';

import Building from '../models/building';
import BuildingRecipe from '../models/building_recipe';
import BuildingType from '../models/building_type';
import Hourglass from '../models/hourglass';
import Vault from '../models/vault';
import Timer from '../models/timer';
import Resource from '../models/resource';
import Icon from '../models/icon';
import { buildingTypes } from '../instances/building_types';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { INTRO_STATES } from '../enums/intro_states';
import { BUILDING_TYPES } from '../enums/building_types';
const BTY = BUILDING_TYPES;
import { BUILDING_CATEGORIES } from '../enums/building_categories';
import { RESOURCE_TAGS } from '../enums/resource_tags';
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
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let building: Building = modalValue;
  const buildingType = new BuildingType(buildingTypes[building.buildingType]);

  const [initializing, setInitializing] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<BuildingRecipe[] | null>(null);
  const [recipeSelected, setRecipeSelected] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (initializing) {
      setInitializing(false);

      if (buildingType.recipes) {
        setRecipes(buildingType.recipes);
      }

      if (building.recipe) {
        setRecipes([building.recipe]);
      }

      if (building.recipeSelected != undefined) {
        setRecipeSelected(building.recipeSelected);
      }
      else {
        setRecipeSelected(0);
      }
    }
  }, []);

  useEffect(() => {
    if (buildings[building.id]) {
      let tempBuildings: { [id: string] : Building } = {};
      Object.keys(buildings).map((id) => {
        tempBuildings[id] = new Building(buildings[id]);
      });

      tempBuildings[building.id].recipeSelected = recipeSelected;
      dispatch(selectBuildingRecipe(building, recipeSelected));
      const newRates = new Hourglass().calcRates(tempBuildings, leaders, vault);
      dispatch(setRates(newRates));
    }
  }, [recipeSelected])

  return (
    <View style={styles.modalContent}>
      <View style={styles.headingWrapper}>
        <BadgeComponent icon={buildingType.icon} size={55} />
        <Text style={styles.heading1}>{building.name}</Text>
      </View>
      <ScrollView contentContainerStyle={{display: 'flex', alignItems: 'center'}}>
        <View style={StyleSheet.flatten([styles.descriptionBand,
          {minWidth: positioner.modalWidth,
            maxWidth: positioner.modalWidth}])}>
          <Text style={styles.descriptionBandText}>{buildingType.description}</Text>
        </View>
        {renderToStorageButton()}
        {renderUpgradeCostContainer()}
        {renderRecipeContainer()}
        {renderKitchenButton()}
      </ScrollView>
    </View>
  );

  function renderToStorageButton() {
    return !buildingType.cannotStore && (
      <TouchableOpacity onPress={() => { toStoragePress(building) }}
        style={StyleSheet.flatten([styles.button, styles.buttonAway])}>
        <IconComponent provider="FontAwesome5" name="level-down-alt" color="#fff"
          size={12} />
        <Text style={styles.buttonText}>{' Into storage'}</Text>
      </TouchableOpacity>
    );
  }

  function renderUpgradeCostContainer() {
    const brokenBuildings = [BTY.BROKEN_CISTERN, BTY.FALLOW_FIELD,
      BTY.DECAYING_STUDY, BTY.ABANDONED_MARKET, BTY.RUINED_HUTS, BTY.SHATTERED_DOME];

    if (modalDisplayed == MODALS.BUILDING_DETAIL && (!buildingType.upgradesInto
      || !buildingType.upgradeCost)) { return null; }
    if (buildingType.upgradesInto && modalDisplayed != MODALS.BUILD_DETAIL
      && !utils.arrayIncludes(brokenBuildings, buildingType.name)) {
      if (!researchStatus.upgradesAvailable[buildingType.upgradesInto]) {
        return null;
      }
    }
    if (modalDisplayed == MODALS.BUILD_DETAIL && !buildingType.cost) { return null; }

    let disabledMessage: string|null = null;
    if (buildTimer) {
      disabledMessage = ('We can\'t work on this, we\'re already building '
        + 'something else');
    }
    else if (introState == INTRO_STATES.REPAIR_CISTERN
      && buildingType.name != BTY.BROKEN_CISTERN) {
      disabledMessage = ('You shouldn\'t spend time on this, '
        + 'a source of water is more important.');
    }
    else if (introState == INTRO_STATES.RESTORE_FIELD
      && buildingType.name != BTY.FALLOW_FIELD) {
        disabledMessage = ('You shouldn\'t spend time on this, '
          + 'reliable food is more important.');
    }
    else if (introState == INTRO_STATES.REFURBISH_STUDY
      && buildingType.name != BTY.DECAYING_STUDY) {
        disabledMessage = ('You shouldn\'t spend time on this, '
          + 'you need somewhere to sleep and plan.');
    }
    else if (introState == INTRO_STATES.REVAMP_MARKET
      && buildingType.name != BTY.ABANDONED_MARKET) {
        disabledMessage = ('You shouldn\'t spend time on this, '
          + 'somewhere to meet with trading partners is more important.');
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
      <Text style={StyleSheet.flatten([styles.bareText, { textAlign: 'center'}])}>
        {disabledMessage}
      </Text>
    );
  }

  function renderBuildButton() {
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
    let cost = buildingType.upgradeCost;
    if (modalDisplayed == MODALS.BUILD_DETAIL) {
      cost = buildingType.cost;
    }
    if (!cost) { return null; }

    return cost.map((aCost) => {
      let resourceKind = utils.getMatchingResourceKind(aCost.specificity, aCost.type);

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
        + utils.formatNumberShort(resourceQuantity) + ') ' + resourceKind.name);
      if (paidCost) { costText = 'Paid'; }
      return (
        <TouchableOpacity key={aCost.type} style={buttonStyle}
          disabled={buttonDisabled} onPress={() => { applyCost(aCost); }} >
          <BadgeComponent icon={resourceKind.icon} size={21} />
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
      rTypePool = [(aCost.type + '|0')];
      break;

      case RESOURCE_SPECIFICITY.TAG:
      let tagPool = vault.getTagResources(aCost.type);
      rTypePool = tagPool.map((resource) => {
        return (resource.type + '|' + resource.quality);
      });
      break;

      case RESOURCE_SPECIFICITY.SUBCATEGORY:
      let scPool = vault.getSubcategoryResources(aCost.type);
      rTypePool = scPool.map((resource) => {
        return (resource.type + '|' + resource.quality);
      });
      break;

      case RESOURCE_SPECIFICITY.CATEGORY:
      let catPool = vault.getCategoryResources(aCost.type);
      rTypePool = catPool.map((resource) => {
        return (resource.type + '|' + resource.quality);
      });
      break;
    }

    if (rTypePool.length == 1) {
      const qtSplit = rTypePool[0].split('|');
      dispatch(consumeResources(vault, [new Resource({type: qtSplit[0],
        quality: parseInt(qtSplit[1]), quantity: aCost.quantity})]));
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

  function toStoragePress(building: Building) {
    dispatch(addBuildingToStorage(building));
    dispatch(removeBuilding(building));
    let tempBuildings: { [id: string] : Building } = {};
    Object.keys(buildings).map((id) => {
      tempBuildings[id] = new Building(buildings[id]);
    });
    delete tempBuildings[building.id];
    const newRates = new Hourglass().calcRates(tempBuildings, leaders, vault);
    dispatch(setRates(newRates));
    dispatch(displayModal(null));
  }

  function buildPress(building: Building) {
    let buildingType = buildingTypes[building.buildingType];

    if (modalDisplayed == MODALS.BUILDING_DETAIL && buildingType.upgradesInto
      && buildingTypes[buildingType.upgradesInto]) {
      let upgType = buildingTypes[buildingType.upgradesInto];
      if (buildingType.upgradeDuration) {
        dispatch(addTimer(new Timer({
          name: 'Build',
          endsAt: (new Date(Date.now()).valueOf()
            + buildingType.upgradeDuration * 1000),
          buildingToUpgrade: building.id,
          messageToDisplay: ('You upgraded ' + buildingType.name + ' into '
            + upgType.name + '.'),
          iconToDisplay: buildingType.icon
        })));
        dispatch(displayModal(null));
      }
    }
    else if (modalDisplayed == MODALS.BUILD_DETAIL) {
      if (buildingType.duration) {
        dispatch(addTimer(new Timer({
          name: 'Build',
          endsAt: (new Date(Date.now()).valueOf() + buildingType.duration * 1000),
          buildingToBuild: building.buildingType,
          messageToDisplay: ('You built a new ' + buildingType.name + '.'),
          iconToDisplay: buildingType.icon
        })));
        dispatch(removeBuildingConstruction(building));
        dispatch(displayModal(null));
      }
    }
  }

  function renderRecipeContainer() {
    if (recipes) {
      return (
        <View style={{minWidth: positioner.majorWidth,
          maxWidth: positioner.majorWidth}}>
          {renderRecipes(recipes)}
        </View>
      );
    }
    else {
      return null;
    }
  }

  function renderRecipes(recipes: BuildingRecipe[]) {
    const recipesToRender: BuildingRecipe[] = [
      new BuildingRecipe({ index: -1, produces: null, consumes: null }),
      ...recipes
    ];
    return recipesToRender.map((recipe) => {
      return (
        <View key={recipe.index}>
          <View style={styles.break}></View>
          <View style={styles.sideButtonContainer}>
            {renderSelectButton(recipe)}
            {renderRecipe(recipe)}
          </View>
        </View>
      );
    });
  }

  function renderSelectButton(recipe: BuildingRecipe) {
    if (recipeSelected == recipe.index) {
      return (
        <TouchableOpacity style={StyleSheet.flatten([styles.button,
          styles.sideButton])}
          onPress={() => { pressSelectRecipe(building, recipe.index) }} >
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
    if (recipeIndex != recipeSelected) {
      setRecipeSelected(recipeIndex);
    }
    else {
      setRecipeSelected(undefined);
    }
  }

  function renderRecipe(recipe: BuildingRecipe) {
    let rates: {specificity: string, type: string, quantity: number}[] = [];
    if (recipe.index == -1) {
      const rateStyle = { backgroundColor: '#cec3e4', paddingHorizontal: 4,
        minWidth: positioner.modalMinor, maxWidth: positioner.modalMinor };
      const icon = new Icon({ provider: 'FontAwesome5', name: 'minus-circle',
        color: '#cec3e4', size: 21 });
      return (
        <View style={StyleSheet.flatten([styles.rows, rateStyle]) }>
          <BadgeComponent icon={icon} size={21} />
          <Text>{ ' Rest' }</Text>
        </View>
      )
    }
    if (recipe.produces) {
      recipe.produces.map((produce) => {
        rates.push({ specificity: produce.specificity, type: produce.type,
          quantity: produce.quantity});
      });
    }
    if (recipe.consumes) {
      recipe.consumes.map((consume) => {
        rates.push({ specificity: consume.specificity, type: consume.type,
          quantity: (consume.quantity * -1)});
      });
    }
    return (
      <View>
        {rates.map((rate) => renderRate(rate))}
      </View>
    );
  }

  function renderRate(rate: {specificity: string, type: string, quantity: number}) {
    let resourceKind = utils.getMatchingResourceKind(rate.specificity, rate.type);
    let name = resourceKind.name;
    if (rate.type.includes('-')) {
      const resource = vault.resources[rate.type + '|0'];
      if (resource) {
        resourceKind = new Resource(resource).toResourceType(resourceTypes);
        name = resource.name || name;
      }
    }

    let sign = '+';
    let rateStyle = { backgroundColor: '#b8ccfb', paddingHorizontal: 4,
      minWidth: positioner.modalMinor, maxWidth: positioner.modalMinor };
    if (rate.quantity < 0) {
      sign = '';
      rateStyle.backgroundColor = '#ffb4b1';
    }
    return (
      <View key={resourceKind.name} style={StyleSheet.flatten([styles.rows, rateStyle]) }>
        <Text>{sign + rate.quantity}</Text>
        <BadgeComponent icon={resourceKind.icon} size={21} />
        <Text>{ name + '/m ' }</Text>
      </View>
    );
  }

  function renderKitchenButton() {
    if (building.buildingType == BTY.KITCHEN) {
      return (
        <TouchableOpacity style={styles.buttonLarge}
          onPress={() => openDishSelection()} >
          <IconComponent provider="MaterialCommunityIcons" name="silverware-fork-knife"
            color="#fff" size={16} style={styles.headingIcon} />
          <Text style={styles.buttonTextLarge}>{' Cook something new'}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  function openDishSelection() {
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_DISH, 'open',
      {type: 'Building detail', building}))
  }
}
