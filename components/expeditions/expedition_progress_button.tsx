import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import IconComponent from '../icon';

import { scenes } from '../../instances/scenes';

export default function ExpeditionProgressButtonComponent(props: { expeditionId: string }) {
  const { expeditionId } = props;
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const currentEvent = scenes[expedition.currentEvent || ''];
  const pos = useTypedSelector(state => state.ui.positioner);

  return (
    <>
      <View style={styles.break} />
      <TouchableOpacity style={[styles.buttonLarge, ((!currentEvent) ? styles.buttonOutline : null), 
        {justifyContent: 'center', maxWidth: pos.embeddedMajor}]}
        onPress={() => {  }}>
        <IconComponent provider="FontAwesome5" name={(!currentEvent) ? "walking" : "exclamation-circle"}
          color="#fff" size={16} style={styles.headingIcon} />
        <Text style={[styles.buttonText, {marginLeft: 5, maxWidth: pos.majorWidth}]}>
          {(!currentEvent) ? 'Journeying' : currentEvent.name}
        </Text>
      </TouchableOpacity>
    </>
  );
}