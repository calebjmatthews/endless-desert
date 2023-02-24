import React, { useState, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import BadgeComponent from './badge';
import { paySceneCost, PAY_SCENE_COST } from '../actions/scene_status';
import { displayModal } from '../actions/ui';
import { renderValue } from './utils_react';

import Resource from '../models/resource';
import ResourceType from '../models/resource_type';
import { sceneActions } from '../instances/scenes';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { MODALS } from '../enums/modals';
import { QUALITY_VALUES, MAX_QUANTITY_GUESS } from '../constants';

export default function ResourceSelectValueComponent() {
  const dispatch = useDispatch();
  const modalValue: ModalValue = useTypedSelector(state => state.ui.modalValue);
  const expeditionStatus = useTypedSelector(state => state.expeditionStatus);
  const sceneStatus = useTypedSelector(state => state.sceneStatus);
  const vault = useTypedSelector(state => state.vault);
  const pos = useTypedSelector(state => state.ui.positioner);

  const [resourcesArray, setResourcesArray] = useState <Resource[]> ([]);
  const [resource, setResource] = useState <Resource|null> (null);
  const [resourceType, setResourceType] = useState <ResourceType|null> (null);
  const [quantitySelected, setQuantitySelected] = useState('0');
  const [submittable, setSubmittable] = useState(false)
  const [title, setTitle] = useState('');

  const expedition = expeditionStatus.expeditions[sceneStatus.expeditionId || ''];
  const difficulty = expedition ? expedition.getDifficulty() : 1;
  const sceneAction = sceneActions[modalValue.sceneActionId];
  const costs = sceneAction ? sceneAction.getCost(difficulty) : null;
  const aCost = costs ? costs[modalValue.costIndex] : null;
  const costKind = aCost ? utils.getMatchingResourceKind(aCost.specificity, aCost.kind) : null;

  const getResourcesArray = () => {
    switch(modalValue.type) {
      case PAY_SCENE_COST:
      const expedition = expeditionStatus.expeditions[sceneStatus.expeditionId || ''];
      const resources = (expedition) ? expedition.resources : vault.resources;
      const difficulty = expedition ? expedition.getDifficulty() : 1;
      const costs = sceneActions[modalValue.sceneActionId].getCost(difficulty);
      const aCost = costs[modalValue.costIndex];
      switch(aCost.specificity) {
        case RESOURCE_SPECIFICITY.EXACT:
        return utils.rSort(utils.filterOutZero(
          utils.getExactResources({ resources, typeName: aCost.kind })
        ));

        case RESOURCE_SPECIFICITY.TAG:
        return utils.rSort(utils.filterOutZero(
          utils.getTagResources({ resources, tagName: aCost.kind })
        ));

        case RESOURCE_SPECIFICITY.SUBCATEGORY:
        return utils.rSort(utils.filterOutZero(
          utils.getSubcategoryResources({ resources, subcatName: aCost.kind })
        ));

        case RESOURCE_SPECIFICITY.CATEGORY:
        return utils.rSort(utils.filterOutZero(
          utils.getCategoryResources({ resources, catName: aCost.kind })
        ));
      }
      break;
    }

    return [];
  }

  const getLimitedQuantity = (args: { quantity: number, resource: Resource }) => {
    const { quantity, resource } = args;
    let newQuantity = quantity;
    if (aCost) {
      const resourceType = resourceTypes[resource.type]
      newQuantity = aCost.value
        / (resourceType.value * QUALITY_VALUES[resource.quality]);
      const typeQuality = (resource.type + '|' + resource.quality);
      const resources = (expedition) ? expedition.resources : vault.resources;
      if (newQuantity > resources[typeQuality].quantity) {
        newQuantity = resources[typeQuality].quantity;
      }
    }
    return Math.ceil(newQuantity);
  }
  
  const getDefaultQuantitySelected = (resource: Resource|null): string => {
    if (!resource) { return '0'; }
    
    return getLimitedQuantity({ quantity: MAX_QUANTITY_GUESS, resource }).toString();
  }

  const getTitle = (modalValue: ModalValue) => {
    switch(modalValue.type) {
      case PAY_SCENE_COST:
      return `Select ${(aCost?.kind || '').replace('Action: ', '')}`;
    }
    return 'Select Resource';
  }

  const getSubmittable = (args: { quantitySelected: string, resource: Resource,
    resourceType: ResourceType }) => {
    const { quantitySelected, resource, resourceType } = args;
    let submittable = true;
    if (aCost) {
      submittable = ((parseInt(quantitySelected) * resourceType.value * QUALITY_VALUES
        [resource.quality]) / aCost.value) >= 1;
    }
    return submittable;
  }

  useEffect(() => {
    const resourcesArray = getResourcesArray();
    const resource = resourcesArray[0];
    const resourceType = utils.getResourceType(resource);
    const quantitySelected = getDefaultQuantitySelected(resource);
    setResourcesArray(resourcesArray);
    setResource(resource);
    setResourceType(resourceType);
    setQuantitySelected(quantitySelected);
    setTitle(getTitle(modalValue));
    setSubmittable(getSubmittable({ quantitySelected, resource, resourceType }));
  }, []);

  const pressResource = (resource: Resource) => {
    const resourceType = utils.getResourceType(resource);
    const quantitySelected = getDefaultQuantitySelected(resource);
    setResource(resource);
    setResourceType(resourceType);
    setQuantitySelected(quantitySelected);
    setSubmittable(getSubmittable({ quantitySelected, resource, resourceType }));
  }

  const submit = () => {
    if (resource) {
      dispatch(paySceneCost({
        sceneActionId: modalValue.sceneActionId,
        costIndex: modalValue.costIndex,
        resource
      }));
      dispatch(displayModal(MODALS.SCENE));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome" name="cube" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{` ${title}`}</Text>
      </View>
      <ScrollView>
        <View style={styles.tileContainer}>
          {resourcesArray.map((aResource) => {
            const aResourceType = utils.getResourceType(aResource);
            let isSelected = false;
            if (resource) {
              isSelected = (`${aResource.type}|${aResource.quality}`
              === `${resource.type}|${resource.quality}`)
            }
            return (
              <ResourceSelectorComponent key={`${aResource.type}|${aResource.quality}`}
                resource={aResource} resourceType={aResourceType} isSelected={isSelected} 
                pressResource={pressResource} width={pos.minorWidth} />
            );
          })}
        </View>
      </ScrollView>
      <View style={[styles.panelFlexColumn, {alignItems: 'flex-start',
        minWidth: pos.majorWidth, maxWidth: pos.majorWidth}]}>
        {(aCost && costKind) && (
          <View style={styles.spacedRows}>
            <Text>{`Cost: `}</Text>
            <BadgeComponent icon={costKind.icon} size={17} />
            <Text>{` ${aCost.kind.replace('Action: ', '')} `}</Text>
            {renderValue(aCost.value, 15, {})}
          </View>
        )}       
        {(resource && resourceType) && (
          <View style={styles.spacedRows}>
            <Text>{`Selected: `}</Text>
            <BadgeComponent icon={resourceType.icon} quality={resource.quality}
              size={17} />
            <Text>{`${utils.getResourceName(resource)} x${utils.formatNumberShort(parseInt(quantitySelected))} (`}</Text>
            {renderValue((resourceType.value * parseInt(quantitySelected)), 15, {})}
            <Text>{`)`}</Text>
          </View>
        )}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.buttonLarge, styles.buttonRowItem,
            (!submittable && styles.buttonDisabled)]} disabled={!submittable}
            onPress={() => submit()} >
            <IconComponent provider="FontAwesome5" name="check-square" color="#fff"
              size={16} style={styles.headingIcon} />
            <Text style={styles.buttonTextLarge}>{submittable ? ` Go` : ` Not enough`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const ResourceSelectorComponent = (props: ResourceSelectorComponentInterface) => (
  <View style={StyleSheet.flatten([styles.panelTile, styles.columns,
    {justifyContent: 'space-between', minWidth: props.width, maxWidth: props.width}])}>
    <Text style={utils.getQualityText(props.resource.quality)}>
      {utils.getResourceName(props.resource)}
    </Text>
    <View style={styles.rows}>
      <BadgeComponent icon={props.resourceType.icon} quality={props.resource.quality} size={21} />
      <View>
        <Text style={{paddingLeft: 4, paddingRight: 4, textAlign: 'right'}}>
          {utils.formatNumberShort(props.resource.quantity)}
        </Text>
        <TouchableOpacity style={[styles.buttonRowItem, { width: 74 },
          (props.isSelected ? {} : styles.buttonLight)]}
          onPress={() => props.pressResource(props.resource)} >
            <Text style={(props.isSelected ? styles.buttonText 
              : [styles.buttonText, styles.buttonTextDark])}>
              {(props.isSelected) ? 'Selected' : 'Select'}
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  </View>
);

interface ModalValue {
  type: string;
  expeditionId: string;
  sceneActionId: string;
  costIndex: number;
}

interface ResourceSelectorComponentInterface {
  resource: Resource;
  resourceType: ResourceType;
  isSelected: boolean;
  pressResource: (resource: Resource) => void;
  width: number;
}