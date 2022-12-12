import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import { UPSERT_RESOURCE } from '../../actions/expedition_status';
import { displayModalValue } from '../../actions/ui';

import IconComponent from '../icon';
import { MODALS } from '../../enums/modals';
import { dromedaryTypes } from '../../instances/dromedary_types';

export default function AddResourceButton(props: { expeditionId: string }) {
  const { expeditionId } = props;
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const pos = useTypedSelector(state => state.ui.positioner);
  const dispatch = useDispatch();

  const upsertResource = () => {
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_ONE, 'open', {
      type: UPSERT_RESOURCE, 
      expeditionId, 
      exclude: Object.keys(expedition.resources), 
      maximum: expedition.getRemainingResourceSpace(dromedaryTypes)
    }));
  };

  if (expedition.getRemainingResourceSpace(dromedaryTypes) === 0) { return null; }
  return (
    <TouchableOpacity style={[styles.buttonSubtle, {justifyContent: 'flex-start',
      minWidth: pos.buttonInEmbedded,  maxWidth: pos.buttonInEmbedded, opacity: 0.9, marginBottom: 6}]}
      onPress={() => upsertResource()}>
      <IconComponent provider='FontAwesome5' name='plus-circle' color='#444'
        size={14} />
      <Text>
        {` Add supplies`}
      </Text>
    </TouchableOpacity>
  );
}