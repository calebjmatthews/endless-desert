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
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { MODALS } from '../enums/modals';
import { DEFAULT_DISH_COST, DEFAULT_SPICE_COST } from '../constants';

export default function ResourceSelectDishComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const modalValue: {type?: string,
    building: Building} = useTypedSelector(state => state.ui.modalValue);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let resourcesArray = getResourcesArray();

  const [resourcesSelected, resourcesSelect] = useState<Resource[]>([]);
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
          {renderResources(resourcesArray, resourcesSelect)}
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
    return [...filterOutZero(vault.getTagResources(RESOURCE_TAGS.INGREDIENT)),
      ...filterOutZero(vault.getTagResources(RESOURCE_TAGS.SPICE))];

    function filterOutZero(resources: Resource[]) {
      return resources.filter((resource) => {
        if (Math.floor(resource.quantity) > 0) { return resource; }
      });
    }
  }

  function renderResources(resourceArray: Resource[],
    setResourcesSelected: Function) {
    return resourceArray.map((resource) => {
      return <ResourceSelector key={resource.type} resource={resource}
        resourcesSelected={resourcesSelected}
        setResourcesSelected={setResourcesSelected} setDish={setDish}
        positioner={positioner} />;
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
    console.log('dishRes');
    console.log(dishRes);
    setExperimenting(true);
    setTimeout(() => {
      setDish(dishRes);
      consumeResources(vault, cResources);
      setExperimenting(false);
    }, 5000);
  }

  function confirmPress() {
    if (dish) {
      dispatch(increaseResources(vault, [dish.resource]));
      dispatch(setBuildingSpecificRecipe(modalValue.building, dish.recipe, 0));
      dispatch(displayModalValue(MODALS.BUILDING_DETAIL, 'open', modalValue.building));
    }
  }

  function cancelPress() {
    resourcesSelect([]);
    setDish(null);
  }
}

function ResourceSelector(props: {resource: Resource, resourcesSelected: Resource[],
  setResourcesSelected: Function, setDish: Function, positioner: Positioner}) {
  const resourceType = utils.getResourceType(props.resource);
  let optionTextStyle: any = {paddingLeft: 4, paddingRight: 4};
  if (props.resource.quality == 1) {
    optionTextStyle = { paddingLeft: 4, paddingRight: 4,
      color: '#6a7791', textShadowColor: '#a3bcdb', textShadowRadius: 1 };
  }
  return (
    <View style={StyleSheet.flatten([styles.panelTile, styles.columns,
      {minWidth: props.positioner.minorWidth,
        maxWidth: props.positioner.minorWidth}])}>
      <Text style={optionTextStyle}>
        {utils.typeQualityName(props.resource.type + '|' + props.resource.quality)}
      </Text>
      <View style={styles.rows}>
        <BadgeComponent icon={resourceType.icon} size={21} />
        <View>
          <Text style={{paddingLeft: 4, paddingRight: 4, textAlign: 'right'}}>
            {utils.formatNumberShort(props.resource.quantity)}
          </Text>
          {renderButton(props.resource, props.resourcesSelected,
            props.setResourcesSelected, props.setDish)}
        </View>
      </View>
    </View>
  );

  function renderButton(resource: Resource, resourcesSelected: Resource[],
    setResourcesSelected: Function, setDish: Function) {
    if (ingredientsInclude(resourcesSelected, resource)) {
      let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, { width: 74 }]);
      return (
        <TouchableOpacity style={buttonStyle}
          onPress={() => {typeQualityUnSelect(resource, resourcesSelected,
            setResourcesSelected, setDish)}} >
          <Text style={styles.buttonText}>{'Use ' + getExperimentCost(resource)}</Text>
        </TouchableOpacity>
      );
    }
    else if (resourcesSelected.length >= 5) {
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
        onPress={() => {typeQualitySelect(resource, resourcesSelected,
          setResourcesSelected, setDish)}} >
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

  function typeQualityUnSelect(resource: Resource,
    resourcesSelected: Resource[], setResourcesSelected: Function, setDish: Function) {
    resourcesSelected = resourcesSelected.filter((sResource) => {
      if (sResource.type != resource.type || sResource.quality != resource.quality) {
        return resource;
      }
    });
    setDish(null);
    setResourcesSelected(resourcesSelected);
  }

  function typeQualitySelect(resource: Resource,
    resourcesSelected: Resource[], setResourcesSelected: Function, setDish: Function) {
    resourcesSelected.push(resource);
    setDish(null);
    setResourcesSelected(resourcesSelected);
  }
}

function getExperimentCost(resource: Resource) {
  const resourceType = utils.getResourceType(resource);
  for (let index = 0; index < resourceType.tags.length; index++) {
    const tag = resourceType.tags[index];
    if (tag == RESOURCE_TAGS.SPICE) { return 1; }
  }
  return Math.ceil(DEFAULT_DISH_COST / DEFAULT_SPICE_COST);
}
