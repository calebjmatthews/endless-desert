import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import IconComponent from '../icon';
import SvgComponent from '../svg';

import Icon from '../../models/icon';
import { destinations } from '../../instances/destinations';
import { dromedaryTypes } from '../../instances/dromedary_types';
import { utils } from '../../utils';

export default function ExpeditionProgressComponent(props: { expeditionId: string }) {
  const { expeditionId } = props;
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const destination = expedition.customDestination || destinations[expedition.mainDestinationId || ''];
  const pos = useTypedSelector(state => state.ui.positioner);

  if (!destination) { return null; }
  return (

  )
}