import React from 'react';
import { Text, View } from 'react-native';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import IconComponent from '../icon';

export default function AdviceComponent(props: { expeditionId: string }) {
  const { expeditionId } = props;
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const pos = useTypedSelector(state => state.ui.positioner);
  console.log(`expedition.advice`, expedition.advice);

  return (
    <View style={styles.columns}>
      {(expedition.advice || []).map((anAdvice) => (
        <View key={anAdvice.text} style={[styles.rows, {paddingHorizontal: 6, 
          minWidth: pos.embeddedWidth, maxWidth: pos.embeddedWidth}]}>
          <IconComponent {...anAdvice.icon} />
          <Text style={{marginLeft: 4, fontSize: 12}}>{anAdvice.text}</Text>
        </View>
      ))}
    </View>
  );
}