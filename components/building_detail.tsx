import React, { useState, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import { selectBuildingRecipe, setBuildingSpecificRecipe, payBuildingUpgradeCost }
  from '../actions/buildings';
import { payBuildingCost, removeBuildingConstruction }
  from '../actions/buildings_construction';
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
import { buildingTypes } from '../instances/building_types';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { INTRO_STATES } from '../enums/intro_states';
import { BUILDING_TYPES } from '../enums/building_types';
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
  const equipment = useTypedSelector(state => state.equipment);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let building: Building = modalValue;
  const buildingType = new BuildingType(buildingTypes[building.buildingType]);

  const [initializing, setInitializing] = useState<boolean>(true);
  const [fuelSelected, setFuelSelected] = useState<Resource | null>(null);
  const [recipes, setRecipes] = useState<BuildingRecipe[] | null>(null);
  const [recipeSelected, setRecipeSelected] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (initializing) {
      setInitializing(false);

      let aFuelIsSelected = false;
      if (buildingType.name.includes(BUILDING_TYPES.FURNACE)) {
        let fuelType: string|null = null;
        if (building.recipe) {
          if (building.recipe.consumes) {
            building.recipe.consumes.map((resource) => {
              const fullResource = Object.assign({quality: 0}, resource);
              const consumableType = utils.getResourceType(fullResource);
              if (consumableType) {
                if (utils.arrayIncludes(consumableType.tags, RESOURCE_TAGS.FUEL)) {
                  const fuelResources = vault.getExactResources(resource.type);
                  if (fuelResources[0]) {
                    if (fuelResources[0].quantity > 1) {
                      aFuelIsSelected = true;
                      setFuelSelected(fuelResources[0]);
                    }
                  }
                }
              }
            });
          }
        }
      }

      if (buildingType.recipes) {
        setRecipes(buildingType.recipes);
      }

      if (building.recipeSelected != undefined) {
        if (!buildingType.name.includes(BUILDING_TYPES.FURNACE) || aFuelIsSelected) {
          setRecipeSelected(building.recipeSelected);
        }
      }
    }
  }, []);

  useEffect(() => {
    const newBuildingType = new BuildingType(buildingTypes[building.buildingType]);
    if (fuelSelected != null) {
      const resourceType = utils.getResourceType(fuelSelected);
      setRecipes(building.modifyRecipesFromFuel(resourceType, fuelSelected.quality,
        newBuildingType));
    }
    else if (!initializing) {
      setRecipes(newBuildingType.recipes);
      setRecipeSelected(undefined);
    }
  }, [fuelSelected]);

  useEffect(() => {
    if (buildings[building.id]) {
      let tempBuildings: { [id: string] : Building } = {};
      Object.keys(buildings).map((id) => {
        tempBuildings[id] = new Building(buildings[id]);
      });

      tempBuildings[building.id].recipeSelected = recipeSelected;
      if (buildingType.name.includes(BUILDING_TYPES.FURNACE) && recipes
        && recipeSelected != undefined) {
        const recipe = recipes[recipeSelected];
        dispatch(setBuildingSpecificRecipe(building, recipe, recipeSelected));
        tempBuildings[building.id].recipe = recipe;
      }
      else {
        dispatch(selectBuildingRecipe(building, recipeSelected));
      }
      const newRates = new Hourglass().calcRates(tempBuildings, leaders, vault);
      dispatch(setRates(newRates));
    }
  }, [recipeSelected])

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
      <ScrollView contentContainerStyle={{display: 'flex', alignItems: 'center'}}>
        <View style={StyleSheet.flatten([styles.descriptionBand,
          {minWidth: positioner.modalWidth,
            maxWidth: positioner.modalWidth}])}>
          <Text style={styles.descriptionBandText}>{buildingType.description}</Text>
        </View>
        {renderUpgradeCostContainer()}
        {renderFuelContainer()}
        {renderRecipeContainer()}
        {renderKitchenButton()}
      </ScrollView>
    </View>
  );

  function renderUpgradeCostContainer() {
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
      let resource = utils.getMatchingResourceKind(aCost.specificity, aCost.type);
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
      dispatch(consumeResources(vault, [{type: qtSplit[0],
        quality: parseInt(qtSplit[1]), quantity: aCost.quantity}]));
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

  function renderFuelContainer() {
    if (buildingType.name.includes(BUILDING_TYPES.FURNACE)) {
      const resources = vault.getTagResources(RESOURCE_TAGS.FUEL);
      if (resources.length > 0) {
        return (
          <View style={{minWidth: positioner.minorWidth,
            maxWidth: positioner.minorWidth}}>
            <Text style={styles.bareText}>{'Using fuel:'}</Text>
            <View style={styles.tileContainer}>
              {renderFuels(resources)}
            </View>
          </View>
        );
      }
      else {
        return (
          <View style={{minWidth: positioner.minorWidth,
            maxWidth: positioner.minorWidth}}>
            <Text style={styles.bareText}>{'Using fuel:'}</Text>
            <View style={styles.break}></View>
            <Text style={styles.bareText}>
              {'No fuels avaialble! Try growing reeds.'}
            </Text>
          </View>
        );
      }
    }
    return null;
  }

  function renderFuels(resources: Resource[]) {
    return resources.map((resource) => {
      const resourceType = utils.getResourceType(resource);
      let optionTextStyle: any = {paddingLeft: 4, paddingRight: 4};
      if (resource.quality == 1) {
        optionTextStyle = { paddingLeft: 4, paddingRight: 4,
          color: '#6a7791', textShadowColor: '#a3bcdb', textShadowRadius: 1 };
      }
      return (
        <View key={(resource.type + '|' + resource.quality)}
          style={StyleSheet.flatten([styles.panelTile, styles.columns,
          {minWidth: positioner.minorWidth,
            maxWidth: positioner.minorWidth}])}>
          <Text style={optionTextStyle}>
            {utils.typeQualityName(resource.type + '|' + resource.quality)}
          </Text>
          <View style={styles.rows}>
            <BadgeComponent
              provider={resourceType.icon.provider}
              name={resourceType.icon.name}
              foregroundColor={resourceType.foregroundColor}
              backgroundColor={resourceType.backgroundColor}
              iconSize={18}
              quality={resource.quality} />
            <View>
              <Text style={{paddingLeft: 4, paddingRight: 4, textAlign: 'right'}}>
                {utils.formatNumberShort(resource.quantity)}
              </Text>
              {renderButton(resource, fuelSelected)}
            </View>
          </View>
        </View>
      );
    })
  }

  function renderButton(resource: Resource, fuelSelected: Resource|null) {
    if (fuelSelected) {
      if (fuelSelected.type == resource.type
        && fuelSelected.quality == resource.quality) {
        let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, { width: 74 }]);
        return (
          <TouchableOpacity style={buttonStyle}
            onPress={() => {typeQualityUnSelect(setFuelSelected)}} >
            <Text style={styles.buttonText}>{'Selected'}</Text>
          </TouchableOpacity>
        );
      }
    }
    let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, styles.buttonLight,
      { width: 74 }]);
    return (
      <TouchableOpacity style={buttonStyle}
      onPress={() => {typeQualitySelect(resource, setFuelSelected)}} >
        <Text style={StyleSheet.flatten([styles.buttonText,
          styles.buttonTextDark])}>{'Select'}</Text>
      </TouchableOpacity>
    );
  }

  function typeQualityUnSelect(setFuelSelected: (resource: Resource|null) => void) {
    setFuelSelected(null);
  }
  function typeQualitySelect(resource: Resource,
    setFuelSelected: (resource: Resource|null) => void) {
    setFuelSelected(resource);
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
    return recipes.map((recipe) => {
      if (recipes.length == 1) {
        return (
          <View key={recipe.index}>
            <Text style={styles.bareText}>{'Producing:'}</Text>
            {renderRecipe(recipe)}
            <View style={styles.break}></View>
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
    const type = utils.getMatchingResourceKind(rate.specificity, rate.type);
    let sign = '+';
    let rateStyle = { background: '#b8ccfb', paddingHorizontal: 4 };
    if (rate.quantity < 0) {
      sign = '';
      rateStyle.background = '#ffb4b1';
    }
    return (
      <View key={type.name} style={StyleSheet.flatten([styles.rows, rateStyle]) }>
        <Text>{sign + rate.quantity}</Text>
        <BadgeComponent
          provider={type.icon.provider}
          name={type.icon.name}
          foregroundColor={type.foregroundColor}
          backgroundColor={type.backgroundColor}
          iconSize={12} />
        <Text>{ type.name + '/m ' }</Text>
      </View>
    );
  }

  function renderKitchenButton() {
    if (building.buildingType == BUILDING_TYPES.KITCHEN) {
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
