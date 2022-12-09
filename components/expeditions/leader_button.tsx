import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import BadgeComponent from '../badge';
import IconComponent from '../icon';
import { UPSERT_EXPEDITION } from '../../actions/expedition_status';
import { displayModalValue } from '../../actions/ui';
import { MODALS } from '../../enums/modals';
import { RootState } from '../../models/root_state';

export default function LeaderButton(props: { leaderId: string, expeditionId: string }) {
  const { leaderId, expeditionId } = props;
  const pos = useTypedSelector(state => state.ui.positioner);
  const dispatch = useDispatch();
  const leader = useTypedSelector(state => state.leaders[leaderId]);

  const leaderAssign = () => {
    dispatch(displayModalValue(MODALS.LEADER_SELECT, 'open',
      { type: MODALS.LEADER_DETAIL, subType: UPSERT_EXPEDITION, expeditionId: expeditionId }));
  };
  
  if (leader) {
    return (
      <TouchableOpacity style={[styles.buttonSubtle, {opacity: 0.9, marginBottom: 6, 
        justifyContent: 'flex-start', minWidth: pos.buttonInEmbedded, maxWidth: pos.buttonInEmbedded}]}
        onPress={() => leaderAssign()}>
        <BadgeComponent icon={leader.icon} size={24} borderless />
        <Text>{leader.name}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={[styles.buttonSubtle,
      {opacity: 0.9, marginBottom: 6}]} onPress={() => leaderAssign()}>
      <IconComponent provider='FontAwesome5' name='minus-circle' color='#cec3e4'
        size={14} />
      <Text>
        {` No leader`}
      </Text>
    </TouchableOpacity>
  );
}