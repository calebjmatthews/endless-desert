import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import IconComponent from '../icon';
import SvgComponent from '../svg';
import { UPSERT_DROMEDARIES, removeDromedaries } from '../../actions/expedition_status';
import { displayModalValue } from '../../actions/ui';

import Resource from '../../models/resource';
import Icon from '../../models/icon';
import { resourceTypes } from '../../instances/resource_types';
import { MODALS } from '../../enums/modals';
import { increaseResources } from '../../actions/vault';

export default function DromedariesComponent(props: { expeditionId: string }) {
  const { expeditionId } = props;
  const dispatch = useDispatch();
  const pos = useTypedSelector(state => state.ui.positioner);
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const vault = useTypedSelector(state => state.vault);
  const dromedariesArrray = Object.keys(expedition.dromedaries).map((id) => {
    return expedition.dromedaries[id];
  });
  if (dromedariesArrray.length === 0) { return null; }

  const editDromedariesPress = (dromedaries: Resource) => {
    const exclude = Object.keys(expedition.dromedaries).filter((expeditionDromedaries) => {
      if (expeditionDromedaries !== `${dromedaries.type}|${dromedaries.quality}`) {
        return true;
      }
    });
    dispatch(increaseResources(vault, [new Resource(dromedaries)]));
    dispatch(removeDromedaries({
      expeditionId, 
      dromedariesTypeQuality: `${dromedaries.type}|${dromedaries.quality}`
    }));
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_ONE, 'open', {
      type: UPSERT_DROMEDARIES,
      expeditionId, exclude,
      maximum: expedition.getRemainingDromedarySpace(`${dromedaries.type}|${dromedaries.quality}`)
    }));
  };

  const removeDromedariesPress = (dromedaries: Resource) => {
    dispatch(increaseResources(vault, [new Resource(dromedaries)]));
    dispatch(removeDromedaries({
      expeditionId, 
      dromedariesTypeQuality: `${dromedaries.type}|${dromedaries.quality}`
    }));
  }

  return (
    <View style={styles.columns}>
      {dromedariesArrray.map((dromedaries) => {
        const dromedaryResourceType = resourceTypes[dromedaries.type];
        return (
          <View key={dromedaries.type} style={styles.rows}>
            <TouchableOpacity style={[styles.buttonSubtle, {justifyContent: 'flex-start',
              minWidth: pos.buttonWithCancelOnSide, maxWidth: pos.buttonWithCancelOnSide}]}
              onPress={() => editDromedariesPress(dromedaries)}>
              <SvgComponent icon={new Icon({...dromedaryResourceType.icon, size: 20})} />
              <Text>
                {` ${dromedaries.type} x${dromedaries.quantity}`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSubtleAway}
              onPress={() => removeDromedariesPress(dromedaries)}>
              <IconComponent provider="FontAwesome" name="times-circle" color="#fff"
                size={18} style={styles.headingIcon} />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  )
}