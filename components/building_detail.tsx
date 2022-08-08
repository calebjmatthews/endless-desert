import React, { useState, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import BuildingDetailGateComponent from './building_detail_gate';
import { selectBuildingRecipe, payBuildingUpgradeCost, removeBuilding } from '../actions/buildings';
import { payBuildingCost, removeBuildingConstruction } from '../actions/buildings_construction';
import { addBuildingToStorage } from '../actions/buildings_storage';
import { setRates } from '../actions/rates';
import { addTimer } from '../actions/timers';
import { displayModal, displayModalValue, selectTab } from '../actions/ui';
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
  let unbuilt = !building;
  if (!building) {
    building = buildingsConstruction[modalValue.id] || modalValue;
  }
  const vault: Vault = useTypedSelector(state => state.vault);
  const buildTimer: Timer = useTypedSelector(state => state.timers['Build']);
  const leaders = useTypedSelector(state => state.leaders);
  const rates = useTypedSelector(state => state.rates);
  const problems = useTypedSelector(state => state.rates.problems[building.id]);
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
  const treasureEffects = useTypedSelector(state => state.account.treasureEffects);
  const positioner = useTypedSelector(state => state.ui.positioner);
  const buildingType = new BuildingType(buildingTypes[building.buildingType] || null);

  const [initializing, setInitializing] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<BuildingRecipe[] | null>(null);
  const [recipeSelected, setRecipeSelected] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (initializing) {
      setInitializing(false);

      if (buildingType.recipes) {
        setRecipes(buildingType.getRecipes(researchStatus.resourcesStudied) || []);
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
      const newRates = new Hourglass().calcRates(tempBuildings, leaders, treasureEffects, vault);
      dispatch(setRates(newRates));
    }
  }, [recipeSelected]);

  return (
    <View style={styles.modalContent}>

      <View style={styles.headingWrapper}>
        <BadgeComponent icon={buildingType.icon} size={55} />
        <View style={styles.columns}>
          <Text style={styles.heading1}>{building.name}</Text>
          {problems && (
            <View>
              <View style={styles.breakSmall} />
              {problems.map((problem) => {
                return (
                  <View key={problem} style={[styles.infoBar,
                    { backgroundColor: '#b9313a', borderColor: '#860009',
                      borderRadius: 10 }]}>
                    <IconComponent provider="FontAwesome5" name="exclamation-circle"
                      color="#fff"  size={12} />
                    <Text style={{fontSize: 12, color: '#ffffff'}}>
                      {' ' + problem}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}
        </View>
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
        {!unbuilt && renderKitchenButton()}
        {buildingType.opensTab && (
          <TouchableOpacity style={styles.buttonLarge} onPress={() => {
            dispatch(selectTab(buildingType.opensTab?.tabName||''));
            dispatch(displayModal(null));
          }}>
            <IconComponent
              provider={buildingType.opensTab.icon.provider}
              name={buildingType.opensTab.icon.name}
              color="#fff" size={18} style={styles.headingIcon} />
            <Text style={[styles.buttonText, {fontSize: 16}]}>
              {` ${buildingType.opensTab.label}`}
            </Text>
          </TouchableOpacity>
        )}
        {building.buildingType.includes('Gate') && (
          <BuildingDetailGateComponent buildingId={modalValue.id} />
        )}
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
    const newRates = new Hourglass().calcRates(tempBuildings, leaders, treasureEffects, vault);
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
          {unbuilt && (
            <>
              <View style={styles.break} />
              <Text style={styles.bareText}>Can produce:</Text>
            </>
          )}
          {renderRecipes(recipes)}
        </View>
      );
    }
    else {
      return null;
    }
  }

  function renderRecipes(recipes: BuildingRecipe[]) {
    const recipesToRender: BuildingRecipe[] = unbuilt ? [...recipes] : [
      new BuildingRecipe({ index: -1, produces: null, consumes: null }),
      ...recipes
    ];
    return recipesToRender.map((recipe, index) => {
      return (
        <View key={recipe.index}>
          <View style={styles.break}></View>
          <View style={styles.sideButtonContainer}>
            {!unbuilt && renderSelectButton(recipe)}
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
    else if (buildingType.category !== BUILDING_CATEGORIES.GENERAL) {
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
    const width = !unbuilt ? positioner.modalMinor : positioner.modalMajor;
    let buildingRates: BuildingRate[] = [];
    if (recipe.index == -1) {
      const rateStyle = { backgroundColor: '#cec3e4', paddingHorizontal: 4,
        minWidth: width, maxWidth: width };
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
      recipe.produces.forEach((produce) => {
        buildingRates.push({ ...produce });
      });
    }
    if (recipe.consumes) {
      recipe.consumes.forEach((consume) => {
        let newRate: BuildingRate = { specificity: consume.specificity,
          type: consume.type, quantity: (consume.quantity * -1)};
        let typeQuality = `${consume.type}|0`;

        let inexact = false;
        if (consume.specificity !== RESOURCE_SPECIFICITY.EXACT) {
          newRate.inexact = true;
        }
        const specType = `${consume.specificity}|${consume.type}`;
        newRate.originalSpecType = specType;
        if (building.resourcesSelected[specType]) {
          const resource = new Resource(building.resourcesSelected[specType]);
          const resourceType = resourceTypes[resource.type];
          newRate.specificity = RESOURCE_SPECIFICITY.EXACT;
          newRate.type = resource.type;
          newRate.quantity = (consume.quantity / resourceType.value) * -1;
          newRate.quality = resource.quality;
          newRate.inexactSelected = true;
          typeQuality = `${resource.type}|${resource.quality}`;
        }

        if (consume.type.includes('-')) {
          newRate.type = consume.type + '|0';
          newRate.specificity = RESOURCE_SPECIFICITY.EXACT;
        }

        if (rates.exhaustions[typeQuality]) {
          newRate.exhaustion = rates.exhaustions[typeQuality];
        }

        buildingRates.push(newRate);
      });
    }
    const recipeRate = rates.recipesRates[building.id]?.[recipe.index];
    if (recipeRate) {
      Object.keys(recipeRate).forEach((specTypeQuality, index) => {
        const [ rrSpec, rrType, rrQuality ] = specTypeQuality.split('|');
        buildingRates[index] = { ...buildingRates[index], type: rrType,
          quality: parseInt(rrQuality), quantity: recipeRate[specTypeQuality] };
      });
    }

    return (
      <View>
        {buildingRates.map((rate) => renderRate(rate))}
      </View>
    );
  }

  function inexactRateOpen(building: Building, specTypeQuality: string, rate: number) {
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_RATE, 'open',
      {type: MODALS.RESOURCE_SELECT_RATE, building, specTypeQuality, rate,
        fromBuildingDetail: true}));
  }

  function renderRate(rate: BuildingRate) {
    const width = !unbuilt ? positioner.modalMinor : positioner.modalMajor;
    let typeQuality = `${rate.type}|0`;
    let resourceKind = utils.getMatchingResourceKind(rate.specificity, rate.type);
    let name = `${resourceKind.name}/m`;
    if (rate.type.includes('-')) {
      const resourceType = new Resource(vault.resources[`${rate.type}|0`])
      .toResourceType(resourceTypes);
      resourceKind = resourceType;
      name = (resourceType.displayName || name);
    }
    let quantity = '';
    if (vault.resources[typeQuality]) {
      quantity = `(of ${utils.formatNumberShort(vault.resources[typeQuality].quantity)})`;
    }

    let sign = '+';
    let rateStyle: any = { backgroundColor: '#b8ccfb', paddingHorizontal: 4,
      minWidth: width, maxWidth: width };
    if (rate.quantity < 0) {
      sign = '';
      rateStyle.backgroundColor = '#ffb4b1';
    }
    let exhaustionString: string|null = null;
    if (rate.exhaustion) {
      const diff = rate.exhaustion - new Date(Date.now()).valueOf();
      exhaustionString = `Out in ${utils.formatDuration(diff)}`;
    }
    if (!rate.inexact) {
      return (
        <View key={`${sign}${resourceKind.name}`} style={[styles.rows, rateStyle]}>
          <Text style={{minWidth: 33, textAlign: 'right'}}>
            {sign + utils.formatNumberShort(rate.quantity)}
          </Text>
          <BadgeComponent icon={resourceKind.icon} size={21} />
          <View style={[styles.columns, {maxWidth: positioner.recipeTextWidth}]}>
            <Text>{name}<Text style={{opacity: 0.6}}>{` ${quantity}`}</Text></Text>
            {exhaustionString && (
              <Text style={{fontSize: 12, opacity: 0.6}}>{exhaustionString}</Text>
            )}
          </View>
        </View>
      );
    }
    let label = `${utils.formatNumberShort(rate.quantity / (resourceKind.value || 1))}(~)`;
    let quality = 0;
    name = `Any ${name}/m`;
    let btnRateStyle = {...rateStyle, borderStyle: 'solid', borderWidth: 1,
      borderColor: '#444', borderRadius: 4, marginVertical: 1, marginLeft: 2,
      backgroundColor: '#ffe0de'};
    const specType = `${rate.specificity}|${rate.type}`;
    if (rate.inexactSelected) {
      const resource = new Resource({...rate, quality: (rate.quality || 0)});
      const resourceType = resourceTypes[resource.type];
      typeQuality = `${resource.type}|${resource.quality || 0}`;
      quality = resource.quality;
      label = `${(rate.quantity > 0 ? '+' : '')}${utils.formatNumberShort(rate.quantity)}`;
      name = `${utils.getResourceName(resource)}/m`;
      quantity = `(of ${utils.formatNumberShort(vault.resources[typeQuality].quantity)})`;
      btnRateStyle = {...btnRateStyle, backgroundColor: '#ffccca'};
    }
    const contents = (
      <>
        <Text style={{minWidth: 33, textAlign: 'right'}}>
          {sign + utils.formatNumberShort(rate.quantity)}
        </Text>
        <BadgeComponent icon={resourceKind.icon} size={21} />
        <View style={[styles.columns, {maxWidth: positioner.recipeTextWidth}]}>
          <Text>{name}<Text style={{opacity: 0.6}}>{` ${quantity}`}</Text></Text>
          {exhaustionString && (
            <Text style={{fontSize: 12, opacity: 0.6}}>{exhaustionString}</Text>
          )}
        </View>
      </>
    );
    if (unbuilt) {
      return (
        <View key={`${sign}${resourceKind.name}`} style={[styles.rows, rateStyle]}>
          {contents}
        </View>
      );
    }
    return (
      <TouchableOpacity key={`${sign}${resourceKind.name}`}
        style={[styles.rows, btnRateStyle]}
        onPress={() => inexactRateOpen(building,
          (rate.originalSpecType || `${specType}|0`), rate.quantity)}>
        {contents}
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

interface BuildingRate {
  specificity: string;
  type: string;
  quantity: number;
  originalSpecType?: string;
  quality?: number;
  inexact?: boolean;
  inexactSelected?: boolean;
  exhaustion?: number;
};
