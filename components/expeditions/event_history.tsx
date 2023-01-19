import React from 'react';
import { Text, View } from 'react-native';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import { utils } from '../../utils';

export default function EventHistoryComponent(props: { expeditionId: string, index: number }) {
  const { expeditionId, index } = props;
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  // const pos = useTypedSelector(state => state.ui.positioner);
  const eeh = expedition.eventHistory[index];
  if (!eeh) { return null; }

  return (
    <>
      <Text style={[styles.descriptionBandText, styles.mutedText, {fontSize: 11}]}>
        {`On ${utils.getDateString(eeh.occurredAt)} at ${utils.getTimeString(eeh.occurredAt)}`}
      </Text>
      <Text style={styles.descriptionBandText}>
        {eeh.description}
      </Text>
    </>
  );
}