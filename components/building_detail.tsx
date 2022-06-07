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
import { displayModal, displayModalValue } from '../actions/ui';
import { addMessage } from '../actions/messages';
import { consumeResources } from '../actions/vault';
import { addToActivityQueue } from '../actions/quest_status';
import { ASSIGN_TO_BUILDING, LIVE_AT_BUILDING } from '../actions/leaders';

import Building from '../models/building';
import BuildingRecipe from '../models/building_recipe';
import BuildingType from '../models/building_type';
import Hourglass from '../models/hourglass';
import Vault from '../models/vault';
import Timer from '../models/timer';
import Resource from '../models/resource';
import QuestActivity from '../models/quest_activity';
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
import { ACTIVITIES } from '../enums/activities';

export default function BuildDetailComponent() {
  const dispatch = useDispatch();
  const buildings = useTypedSelector(state => state.buildings);
  const buildingsConstruction = useTypedSelector(state => state.buildingsConstruction);
  const introState = useTypedSelector(state => state.account.introState);
  const modalDisplayed = useTypedSelector(state => state.ui.modalDisplayed);
  const modalValue: Building = useTypedSelector(state => state.ui.modalValue);
  let building: Building = buildings[modalValue.id];
  const vault: Vault = useTypedSelector(state => state.vault);
  const buildTimer: Timer = useTypedSelector(state => state.timers['Build']);
  const leaders = useTypedSelector(state => state.leaders);
  let leaderId = Object.keys(leaders).filter((aLeaderId) => (
    leaders[aLeaderId].assignedTo === building.id
  ))[0];
  if (!leaderId) {
    leaderId = Object.keys(leaders).filter((aLeaderId) => (
      leaders[aLeaderId].livingAt === building.id
    ))[0];
  }
  const leader = leaderId ? leaders[leaderId] : null;
  const researchStatus = useTypedSelector(state => state.researchStatus);
  const positioner = useTypedSelector(state => state.ui.positioner);
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
        <View style={styles.spacedRows}>
          {renderLeader()}
          {renderToStorageButton()}
        </View>
        {renderUpgradeCostContainer()}
        {renderRecipeContainer()}
        {renderKitchenButton()}
      </ScrollView>
    </View>
  );

  function renderToStorageButton() {
    return !buildingType.cannotStore && (
      <TouchableOpacity onPress={() => { toStoragePress(building) }}
        style={StyleSheet.flatten([styles.buttonSubtle, styles.buttonAway,
          { alignSelf: 'stretch' }])}>
        <IconComponent provider="FontAwesome5" name="level-down-alt" color="#fff"
          size={16} />
        <Text style={styles.buttonTextLarge}>{' Into storage'}</Text>
      </TouchableOpacity>
    );
  }

  function renderUpgradeCostContainer() {
    const brokenBuildings = [BTY.BROKEN_CISTERN, BTY.FALLOW_FIELD,
      BTY.DECAYING_STUDY, BTY.MARKET_ABANDONED, BTY.RUINED_HUTS, BTY.SHATTERED_DOME];

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
      && buildingType.name != BTY.MARKET_ABANDONED) {
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
    dispatch(addToActivityQueue(new QuestActivity({ id: utils.randHex(16),
      actionPerformed: { kind: ACTIVITIES.BUILDING_INTO_STORAGE,
      value: buildingType.name } })));
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
          buildingToBuild: {
            type: building.buildingType,
            coords: (building.coords || [-1, -1])
          },
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

  function leaderAssign(building: Building) {
    const subType = (buildingType.category === BUILDING_CATEGORIES.HOUSING)
      ? LIVE_AT_BUILDING : ASSIGN_TO_BUILDING;
    dispatch(displayModalValue(MODALS.LEADER_SELECT, 'open',
      {type: MODALS.LEADER_DETAIL, subType, building: building, fromBuildingDetail: true}));
  }

  function renderLeader() {
    const label = (buildingType.category === BUILDING_CATEGORIES.HOUSING)
      ? 'living' : 'working';
    if (leader) {
      return (
        <TouchableOpacity style={[styles.buttonSubtle,
          {opacity: 0.9, marginBottom: 6}]}
          onPress={() => leaderAssign(building)}>
          <BadgeComponent icon={leader.icon} size={24} borderless />
          <Text>
            {`${leader.name} ${label}`}
          </Text>
        </TouchableOpacity>
      );
    }
    else {
      const icon = new Icon({ provider: 'FontAwesome5', name: 'minus-circle',
        color: '#cec3e4', size: 14 });
      return (
        <TouchableOpacity style={[styles.buttonSubtle,
          {opacity: 0.9, marginBottom: 6}]} onPress={() => leaderAssign(building)}>
          <IconComponent provider='FontAwesome5' name='minus-circle' color='#cec3e4'
            size={14} />
          <Text>
            {` No leader ${label}`}
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
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

  function inexactRateOpen(building: Building, specTypeQuality: string, rate: number) {
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_RATE, 'open',
      {type: MODALS.RESOURCE_SELECT_RATE, building, specTypeQuality, rate,
        fromBuildingDetail: true}));
  }

  function renderRate(rate: {specificity: string, type: string, quantity: number}) {
    let resourceKind = utils.getMatchingResourceKind(rate.specificity, rate.type);
    let inexact = false;
    if (rate.specificity === RESOURCE_SPECIFICITY.TAG
      || rate.specificity === RESOURCE_SPECIFICITY.SUBCATEGORY
      || rate.specificity === RESOURCE_SPECIFICITY.CATEGORY) {
      inexact = true;
    }
    let name = resourceKind.name;
    if (rate.type.includes('-')) {
      const resource = vault.resources[rate.type + '|0'];
      if (resource) {
        resourceKind = new Resource(resource).toResourceType(resourceTypes);
        name = resource.name || name;
      }
    }

    let sign = '+';
    let rateStyle: any = { backgroundColor: '#b8ccfb', paddingHorizontal: 4,
      minWidth: positioner.modalMinor, maxWidth: positioner.modalMinor };
    if (rate.quantity < 0) {
      sign = '';
      rateStyle.backgroundColor = '#ffb4b1';
    }
    if (!inexact) {
      return (
        <View key={resourceKind.name} style={[styles.rows, rateStyle]}>
          <Text>{sign + rate.quantity}</Text>
          <BadgeComponent icon={resourceKind.icon} size={21} />
          <Text>{ name + '/m ' }</Text>
        </View>
      );
    }
    let icon = resourceKind.icon;
    const specType = rate.specificity + '|' + rate.type;
    let label = `${rate.quantity / (resourceKind.value || 1)}(~)`;
    let quality = 0;
    name = `Any ${name}`;
    rateStyle = {...rateStyle, borderStyle: 'solid', borderWidth: 1,
      borderColor: '#444', borderRadius: 4, marginVertical: 1, marginLeft: 2,
      backgroundColor: '#ffe0de'};
    if (building.resourcesSelected[specType]) {
      const resource = new Resource(building.resourcesSelected[specType]);
      const resourceType = resourceTypes[resource.type];
      quality = resource.quality;
      const rRate = rate.quantity / resourceType.value;
      label = ((rRate > 0 ? '+' : '') + utils.formatNumberShort(rRate));
      icon = resourceType.icon;
      name = utils.getResourceName(resource);
      rateStyle = {...rateStyle, backgroundColor: '#ffccca'};
    }
    return (
      <TouchableOpacity key={resourceKind.name} style={[styles.rows, rateStyle]}
        onPress={() => inexactRateOpen(building, `${specType}|0`, rate.quantity)}>
        <Text>{label}</Text>
        <BadgeComponent icon={icon}
          quality={quality}
          size={21} />
        <Text>{`${name}/m `}</Text>
      </TouchableOpacity>
    );
  }

  function renderKitchenButton() {
    if (building.buildingType.includes(BTY.KITCHEN)) {
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
