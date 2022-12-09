import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import { UPSERT_DROMEDARIES } from '../../actions/expedition_status';
import { displayModalValue } from '../../actions/ui';

import IconComponent from '../icon';
import { MODALS } from '../../enums/modals';

export default function AddDromedariesButton(props: { expeditionId: string }) {
  const { expeditionId } = props;
  const pos = useTypedSelector(state => state.ui.positioner);
  const dispatch = useDispatch();

  const upsertDromedaries = () => {
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_ONE, 'open',
      {type: UPSERT_DROMEDARIES, expeditionId, excludes: [], maximum: 100}));
  };

  return (
    <TouchableOpacity style={[styles.buttonSubtle, {justifyContent: 'flex-start',
      minWidth: pos.buttonInEmbedded,  maxWidth: pos.buttonInEmbedded, opacity: 0.9, marginBottom: 6}]}
      onPress={() => upsertDromedaries()}>
      <IconComponent provider='FontAwesome5' name='plus-circle' color='#444'
        size={14} />
      <Text>
        {` Add dromedaries`}
      </Text>
    </TouchableOpacity>
  );
}