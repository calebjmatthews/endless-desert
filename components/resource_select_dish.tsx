import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet }
  from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import ProgressBarComponent from '../components/progress_bar';
import { consumeResources, increaseResources } from '../actions/vault';
import { setBuildingSpecificRecipe } from '../actions/buildings';
import { displayModalValue } from '../actions/ui';

import Resource from '../models/resource';
import ResourceType from '../models/resource_type';
import Building from '../models/building';
import BuildingRecipe from '../models/building_recipe';
import Positioner from '../models/positioner';
import Icon from '../models/icon';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { BUILDING_TYPES } from '../enums/building_types';
import { MODALS } from '../enums/modals';
import { DEFAULT_DISH_COST, DEFAULT_SPICE_COST } from '../constants';

export default function ResourceSelectDishComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const modalValue: {type?: string,
    building: Building} = useTypedSelector(state => state.ui.modalValue);
  const ingredientMax = (modalValue.building.buildingType ===
    BUILDING_TYPES.KITCHEN_BOUNTIFUL) ? 5 : 3;
  const positioner = useTypedSelector(state => state.ui.positioner);
  let resourcesArray = getResourcesArray();

  const [resourcesSelected, setResourcesSelected] = useState<Resource[]>([]);
  const [experimenting, setExperimenting] = useState<boolean>(false);
  const [dish, setDish] = useState<{resource: Resource, recipe: BuildingRecipe}
    | null>(null);
  let dishResourceType : ResourceType|null = null;
  if (dish) { dishResourceType = utils.getResourceType(dish.resource); }

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="MaterialCommunityIcons" name="silverware-fork-knife"
          color="#fff" size={20} style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Cooking'}</Text>
      </View>
      <ScrollView>
        <View style={styles.tileContainer}>
          {renderResources(resourcesArray)}
        </View>
      </ScrollView>
      <View style={StyleSheet.flatten([styles.panelFlexColumn,
        {alignItems: 'flex-start', minWidth: positioner.modalMajor,
        maxWidth: positioner.modalMajor,
        maxHeight: positioner.confirmationRowHeight}])} >
        <Text style={StyleSheet.flatten([styles.heading2, {alignSelf: 'center'}])}>
          {'Ingredients:'}
        </Text>
        {renderDish(dishResourceType)}
        <View style={styles.buttonRow}>
          {renderSubmitButton()}
        </View>
      </View>
    </View>
  );

  function getResourcesArray() {
    return rSort([...filterOutZero(vault.getTagResources(RESOURCE_TAGS.INGREDIENT)),
      ...filterOutZero(vault.getTagResources(RESOURCE_TAGS.SPICE))]);

    function filterOutZero(resources: Resource[]) {
      return resources.filter((resource) => {
        if (Math.floor(resource.quantity) >= 1) { return resource; }
      });
    }

    function rSort(resources: Resource[]) {
      return resources.sort((a, b) => {
        if (Math.floor(a.quantity) != Math.floor(b.quantity)) {
          return b.quantity - a.quantity;
        }
        const aType = utils.getResourceType(a);
        const bType = utils.getResourceType(b);
        return aType.value - bType.value;
      });
    }
  }

  function renderResources(resourceArray: Resource[]) {
    return resourceArray.map((resource) => {
      return <ResourceSelector key={`${resource.type}|${resource.quality}`} resource={resource}
        resourcesSelected={resourcesSelected} ingredientMax={ingredientMax}
        pressResource={pressResource} positioner={positioner} />;
    });
  }

  function renderTypeQualityName(typeQuality: string, index: number,
    resourcesSelected: Resource[]) {
    if (index < (resourcesSelected.length-1)) {
      return (' ' + utils.typeQualityName(typeQuality) + ', ');
    }
    return (' ' + utils.typeQualityName(typeQuality));
  }

  function renderDish(dish: ResourceType | null) {
    if (resourcesSelected.length < 2) {
      return <Text>{'Select two to five ingredients'}</Text>;
    }
    if (dish) {
      return (
          <View style={styles.rows}>
          <Text>{' '}</Text>
          <IconComponent provider="FontAwesome" name="arrow-right"
            color="#000" size={16} />
          <Text>{' '}</Text>
          <BadgeComponent icon={dish.icon} size={21} />
          <Text>
            {' ' + dish.displayName }
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.rows}>
        <Text>{' '}</Text>
        <IconComponent provider="FontAwesome" name="arrow-right"
          color="#000" size={16} />
        <Text>{' '}</Text>
        <BadgeComponent icon={new Icon({ provider: 'FontAwesome5', name: 'question',
          color: '#000', size: 21 })} />
        <Text>
          {' Unknown dish'}
        </Text>
      </View>
    );
  }

  function renderSubmitButton() {
    if (experimenting) {
      return (
        <ProgressBarComponent startingProgress={0}
          width={positioner.majorWidth - positioner.minorPadding}
          endingProgress={1} duration={5000}
          label={'Experimenting...'} />
      );
    }
    let buttonStyle: any = StyleSheet.flatten([styles.buttonLarge,
      styles.buttonRowItem, {alignSelf: 'flex-end', height: 32}]);
    if (resourcesSelected.length < 2) {
      buttonStyle = StyleSheet.flatten([styles.buttonLarge, styles. buttonRowItem,
        styles.buttonDisabled, {alignSelf: 'flex-end', height: 32}]);
    }
    if (!dish) {
      return (
        <TouchableOpacity style={buttonStyle} disabled={(resourcesSelected.length < 2)}
          onPress={() => experimentPress()} >
          <IconComponent provider="MaterialCommunityIcons" name="silverware-fork-knife"
            color="#fff" size={16} style={styles.headingIcon} />
          <Text style={styles.buttonTextLarge}>{' Experiment'}</Text>
        </TouchableOpacity>
      );
    }
    let buttonStyleLight: any = StyleSheet.flatten([styles.buttonLarge,
      styles.buttonRowItem, styles.buttonLight, {alignSelf: 'flex-end', height: 32}]);
    let buttonTextLight = StyleSheet.flatten([styles.buttonTextLarge,
      styles.buttonTextDark]);
    return (
      <View style={styles.buttonRow}>
        <TouchableOpacity style={buttonStyle}
          onPress={() => confirmPress()} >
          <IconComponent provider="MaterialCommunityIcons" name="chef-hat"
            color="#fff" size={16} />
          <Text style={styles.buttonTextLarge}>{' Use this'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyleLight}
          onPress={() => cancelPress()} >
          <IconComponent provider="FontAwesome" name="arrow-left"
            color="#071f56" size={16} />
          <Text style={buttonTextLight}>{' Cancel'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  function experimentPress() {
    const ingredientTypes = resourcesSelected.map((resource) => {
      return utils.getResourceType(resource);
    });
    const cResources = resourcesSelected.map((resource) => {
      return new Resource({type: resource.type, quality: resource.quality,
        quantity: getExperimentCost(resource)});
    });
    const dishRes = modalValue.building.getDishFromIngredients(ingredientTypes,
      resourceTypes);
    setExperimenting(true);
    setTimeout(() => {
      setDish(dishRes);
      consumeResources(vault, cResources);
      setExperimenting(false);
    }, 5000);
  }

  function confirmPress() {
    if (dish) {
      dispatch(increaseResources(vault, [
        new Resource({ ...dish.resource, quantity: 0.01 })
      ]));
      dispatch(setBuildingSpecificRecipe(modalValue.building, dish.recipe, 0));
      dispatch(displayModalValue(MODALS.BUILDING_DETAIL, 'open', modalValue.building));
    }
  }

  function cancelPress() {
    setResourcesSelected([]);
    setDish(null);
  }

  function pressResource(resource: Resource) {
    let selected = false;
    resourcesSelected.forEach((resourceSelected) => {
      if (resource.type == resourceSelected.type
        && resource.quality == resourceSelected.quality) {
        selected = true;
      }
    });

    let newResourcesSelected = [...resourcesSelected];
    if (selected) {
      newResourcesSelected = resourcesSelected.filter((sResource) => {
        if (sResource.type != resource.type || sResource.quality != resource.quality) {
          return resource;
        }
      });
    }
    else {
      newResourcesSelected.push(resource);
    }

    const ingredientTypes = newResourcesSelected.map((resource) => {
      return utils.getResourceType(resource);
    });
    const dishRes = modalValue.building.getDishFromIngredients(ingredientTypes,
      resourceTypes);
    const vaultMatch = vault.getCustomResourceMatch(dishRes.resource);
    const result = (vaultMatch ? {
      recipe: { ...dishRes.recipe,
        produces: [{ ...dishRes.recipe.produces[0], type: vaultMatch.type }] },
      resource: vaultMatch } : null);

    setDish(result);
    setResourcesSelected(newResourcesSelected);
  }
}

function ResourceSelector(props: {resource: Resource, resourcesSelected: Resource[],
  ingredientMax: number, pressResource: (resource: Resource) => void, positioner: Positioner}) {
  const { resource, resourcesSelected, ingredientMax, pressResource, positioner } = props;
  const resourceType = utils.getResourceType(resource);
  let optionTextStyle: any = {paddingLeft: 4, paddingRight: 4};
  if (resource.quality == 1) {
    optionTextStyle = { paddingLeft: 4, paddingRight: 4,
      color: '#6a7791', textShadowColor: '#a3bcdb', textShadowRadius: 1 };
  }
  return (
    <View style={StyleSheet.flatten([styles.panelTile, styles.columns,
      {minWidth: positioner.minorWidth,
        maxWidth: positioner.minorWidth}])}>
      <Text style={optionTextStyle}>
        {utils.typeQualityName(resource.type + '|' + resource.quality)}
      </Text>
      <View style={styles.rows}>
        <BadgeComponent icon={resourceType.icon} size={21} />
        <View>
          <Text style={{paddingLeft: 4, paddingRight: 4, textAlign: 'right'}}>
            {utils.formatNumberShort(resource.quantity)}
          </Text>
          {renderButton(resource, resourcesSelected, ingredientMax, pressResource)}
        </View>
      </View>
    </View>
  );

  function renderButton(resource: Resource, resourcesSelected: Resource[], ingredientMax: number,
    pressResource: (resource: Resource) => void) {
    if (ingredientsInclude(resourcesSelected, resource)) {
      let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, { width: 74 }]);
      return (
        <TouchableOpacity style={buttonStyle}
          onPress={() => { pressResource(resource)} } >
          <Text style={styles.buttonText}>
            {`Use ${getExperimentCost(resource)}`}
          </Text>
        </TouchableOpacity>
      );
    }
    else if (resourcesSelected.length >= ingredientMax) {
      let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, styles.buttonDisabled,
        { width: 74 }]);
      return (
        <TouchableOpacity style={buttonStyle} disabled>
          <Text style={StyleSheet.flatten([styles.buttonText])}>{'Select'}</Text>
        </TouchableOpacity>
      );
    }
    let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, styles.buttonLight,
      { width: 74 }]);
    return (
      <TouchableOpacity style={buttonStyle}
        onPress={() => { pressResource(resource)} } >
        <Text style={StyleSheet.flatten([styles.buttonText,
          styles.buttonTextDark])}>{'Select'}</Text>
      </TouchableOpacity>
    );
  }

  function ingredientsInclude(ingredients: Resource[], resource: Resource) {
    let included: boolean = false;
    for (let index = 0; index < ingredients.length; index++) {
      const ingredient = ingredients[index];
      if (ingredient.type == resource.type && ingredient.quality == resource.quality) {
        return true;
      }
    }
    return false;
  }
}

function getExperimentCost(resource: Resource, multiplier: number = 1) {
  const resourceType = utils.getResourceType(resource);
  if (resource.type == RESOURCE_TYPES.WATER) {
    return (DEFAULT_SPICE_COST * multiplier);
  }
  for (let index = 0; index < resourceType.tags.length; index++) {
    const tag = resourceType.tags[index];
    if (tag == RESOURCE_TAGS.SPICE) {
      return (DEFAULT_SPICE_COST * multiplier);
    }
  }
  return (DEFAULT_DISH_COST * multiplier);
}
