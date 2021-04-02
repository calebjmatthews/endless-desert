import React, { useState } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet }
  from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import ProgressBarComponent from '../components/progress_bar';
import { displayModalValue } from '../actions/ui';

import Resource from '../models/resource';
import Building from '../models/building';
import BuildingRecipe from '../models/building_recipe';
import Positioner from '../models/positioner';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { RESOURCE_TAGS } from '../enums/resource_tags';

export default function ResourceSelectDishComponent() {
  const dispatch = useDispatch();
  const vault = useTypedSelector(state => state.vault);
  const modalValue: {type?: string,
    building: Building} = useTypedSelector(state => state.ui.modalValue);
  const positioner = useTypedSelector(state => state.ui.positioner);
  let resourcesArray = getResourcesArray();

  const [resourcesSelected, resourcesSelect] = useState<string[]>([]);
  const [experimenting, setExperimenting] = useState<boolean>(false);
  const [dish, setDish] = useState<BuildingRecipe | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="MaterialCommunityIcons" name="silverware-fork-knife"
          color="#fff" size={20} style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Cooking'}</Text>
      </View>
      <ScrollView contentContainerStyle={{minHeight: positioner.modalHeightMajor,
        maxHeight: positioner.modalHeightMajor}}>
        <View style={styles.tileContainer}>
          {renderResources(resourcesArray, resourcesSelect)}
        </View>
      </ScrollView>
      <ScrollView contentContainerStyle={{minWidth: positioner.modalMajor,
        maxWidth: positioner.modalMajor, minHeight: positioner.modalHeightMinor,
        maxHeight: positioner.modalHeightMinor, alignItems: 'flex-start'}} >
        <View style={StyleSheet.flatten([styles.panelFlexColumn,
          {alignItems: 'flex-start', minWidth: positioner.modalMajor,
            minHeight: (positioner.modalHeightMinor - positioner.minorPadding)}])} >
          <Text style={StyleSheet.flatten([styles.heading2, {alignSelf: 'center'}])}>
            {'Ingredients:'}
          </Text>
          <View style={StyleSheet.flatten([styles.spacedRows,
            {minWidth: (positioner.modalMajor - positioner.majorPadding),
              maxWidth: (positioner.modalMajor - positioner.majorPadding)}])}>
            {renderSelected(resourcesSelected)}
            {renderDish(dish)}
          </View>
          <View style={styles.buttonRow}>
            {renderSubmitButton()}
          </View>
        </View>
      </ScrollView>
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
        setResourcesSelected={setResourcesSelected} positioner={positioner} />;
    });
  }

  function renderSelected(resourcesSelected: string[]) {
    if (resourcesSelected.length > 0) {
      return resourcesSelected.map((typeQuality, index) => {
        let resource = resourceTypes[typeQuality.split('|')[0]];
        return (
          <View key={typeQuality} style={styles.rows}>
            <BadgeComponent
              provider={resource.icon.provider}
              name={resource.icon.name}
              foregroundColor={resource.foregroundColor}
              backgroundColor={resource.backgroundColor}
              iconSize={16} />
            <Text>
              {renderTypeQualityName(typeQuality, index, resourcesSelected)}
            </Text>
          </View>
        );
      })
    }
    return <Text>{'Select two to five ingredients'}</Text>;
  }

  function renderTypeQualityName(typeQuality: string, index: number,
    resourcesSelected: string[]) {
    if (index < (resourcesSelected.length-1)) {
      return (' ' + utils.typeQualityName(typeQuality) + ', ');
    }
    return (' ' + utils.typeQualityName(typeQuality));
  }

  function renderDish(dish: BuildingRecipe | null) {
    if (resourcesSelected.length < 2) {
      return null;
    }
    if (dish && dish.produces) {
      const dishType = resourceTypes[dish.produces[0].type];
      return (
          <View style={styles.rows}>
          <Text>{' '}</Text>
          <IconComponent provider="FontAwesome" name="arrow-right"
            color="#000" size={16} />
          <Text>{' '}</Text>
          <BadgeComponent
            provider={dishType.icon.provider}
            name={dishType.icon.name}
            foregroundColor={dishType.foregroundColor}
            backgroundColor={dishType.backgroundColor}
            iconSize={16} />
          <Text>
            {' ' + dish.produces[0].name}
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
        <BadgeComponent
          provider={'FontAwesome5'}
          name={'question'}
          foregroundColor={'#000'}
          backgroundColor={'#fff'}
          iconSize={16} />
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
    let label = ' Experiment';
    if (dish) { label = ' Try something else'; }
    return (
      <TouchableOpacity style={buttonStyle} disabled={(resourcesSelected.length < 2)}
        onPress={() => experimentPress()} >
        <IconComponent provider="MaterialCommunityIcons" name="silverware-fork-knife"
          color="#fff" size={16} style={styles.headingIcon} />
        <Text style={styles.buttonTextLarge}>{' Experiment'}</Text>
      </TouchableOpacity>
    );
  }

  function experimentPress() {
    const ingredientTypes = resourcesSelected.map((typeQuality) => {
      return resourceTypes[typeQuality.split('|')[0]];
    });
    let dish = modalValue.building.getDishFromIngredients(ingredientTypes,
      resourceTypes);
    setExperimenting(true);
    setTimeout(() => {
      setDish(dish);
      setExperimenting(false);
    }, 5000);
  }
}

function ResourceSelector(props: {resource: Resource, resourcesSelected: string[],
  setResourcesSelected: Function, positioner: Positioner}) {
  let resourceType = resourceTypes[props.resource.type];
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
        <BadgeComponent
          provider={resourceType.icon.provider}
          name={resourceType.icon.name}
          foregroundColor={resourceType.foregroundColor}
          backgroundColor={resourceType.backgroundColor}
          iconSize={18} />
        <View>
          <Text style={{paddingLeft: 4, paddingRight: 4, textAlign: 'right'}}>
            {utils.formatNumberShort(props.resource.quantity)}
          </Text>
          {renderButton(props.resource, props.resourcesSelected,
            props.setResourcesSelected)}
        </View>
      </View>
    </View>
  );

  function renderButton(resource: Resource, resourcesSelected: string[],
    setResourcesSelected: Function) {
    const key = (resource.type + '|' + resource.quality);
    if (utils.arrayIncludes(resourcesSelected, key)) {
      let buttonStyle = StyleSheet.flatten([styles.buttonRowItem, { width: 74 }]);
      return (
        <TouchableOpacity style={buttonStyle}
          onPress={() => {typeQualityUnSelect(resource, resourcesSelected,
            setResourcesSelected)}} >
          <Text style={styles.buttonText}>{'Selected'}</Text>
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
          setResourcesSelected)}} >
        <Text style={StyleSheet.flatten([styles.buttonText,
          styles.buttonTextDark])}>{'Select'}</Text>
      </TouchableOpacity>
    );
  }

  function typeQualityUnSelect(resource: Resource,
    resourcesSelected: string[], setResourcesSelected: Function) {
    resourcesSelected = resourcesSelected.filter((typeQuality) => {
      if (typeQuality != (resource.type + '|' + resource.quality)) {
        return typeQuality;
      }
    });
    setResourcesSelected(resourcesSelected);
  }

  function typeQualitySelect(resource: Resource,
    resourcesSelected: string[], setResourcesSelected: Function) {
    resourcesSelected.push((resource.type + '|' + resource.quality));
    setResourcesSelected(resourcesSelected);
  }
}
