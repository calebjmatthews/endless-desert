import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import IconComponent from '../icon';
import SvgComponent from '../svg';
import { UPSERT_RESOURCE, removeResource } from '../../actions/expedition_status';
import { displayModalValue } from '../../actions/ui';
import { increaseResources } from '../../actions/vault';

import Resource from '../../models/resource';
import Icon from '../../models/icon';
import { resourceTypes } from '../../instances/resource_types';
import { utils } from '../../utils';
import { MODALS } from '../../enums/modals';
import { dromedaryTypes } from '../../instances/dromedary_types';

export default function ResourcesComponent(props: { expeditionId: string }) {
  const { expeditionId } = props;
  const dispatch = useDispatch();
  const pos = useTypedSelector(state => state.ui.positioner);
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const vault = useTypedSelector(state => state.vault);
  const resourcesArrray = Object.keys(expedition.resources).map((id) => {
    return expedition.resources[id];
  });
  if (resourcesArrray.length === 0) { return null; }

  const editResourcePress = (resource: Resource) => {
    const exclude = Object.keys(expedition.resources).filter((expeditionResource) => {
      if (expeditionResource !== `${resource.type}|${resource.quality}`) {
        return true;
      }
    });
    dispatch(increaseResources(vault, [new Resource(resource)]));
    dispatch(removeResource({
      expeditionId, 
      typeQuality: `${resource.type}|${resource.quality}`
    }));
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_ONE, 'open', {
      type: UPSERT_RESOURCE,
      expeditionId, exclude,
      maximum: expedition.getRemainingResourceSpace(dromedaryTypes,
        `${resource.type}|${resource.quality}`)
    }));
  };

  const removeResourcePress = (resource: Resource) => {
    dispatch(increaseResources(vault, [new Resource(resource)]));
    dispatch(removeResource({
      expeditionId, 
      typeQuality: `${resource.type}|${resource.quality}`
    }));
  }

  return (
    <View style={styles.columns}>
      {resourcesArrray.map((resource) => {
        const resourceType = resourceTypes[resource.type];
        return (
          <View key={`${resource.type}|${resource.quality}`} style={styles.rows}>
            <TouchableOpacity style={[styles.buttonSubtle, {justifyContent: 'flex-start',
              minWidth: pos.buttonWithCancelOnSide, maxWidth: pos.buttonWithCancelOnSide}]}
              onPress={() => editResourcePress(resource)}>
              <SvgComponent icon={new Icon({...resourceType.icon, size: 20})} />
              <Text>
                {` ${resource.type} x${utils.formatNumberShort(resource.quantity)}`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSubtleAway}
              onPress={() => removeResourcePress(resource)}>
              <IconComponent provider="FontAwesome" name="times-circle" color="#fff"
                size={18} style={styles.headingIcon} />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  )
}