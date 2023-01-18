import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import IconComponent from '../icon';
import StartExpeditionButton from './start_expedition';
import ExpeditionComponent from './expedition';
import { upsertExpedition } from '../../actions/expedition_status';
import { displayModalValue } from '../../actions/ui';

import Expedition from '../../models/expedition';
import { utils } from '../../utils';
import { MODALS } from '../../enums/modals';

const MAX_EXPEDITION_COUNT = 2;

export default function ExpeditionsComponent() {
  const dispatch = useDispatch();
  const expeditionStatus = useTypedSelector(state => state.expeditionStatus);
  const expeditionArray = expeditionStatus.getExpeditionsArray();

  const [canStartExpedition, setCanStartExpedition] = useState(false);
  const [startExpeditionId, setStartExpeditionId] = useState<string|null>(null);

  useEffect(() => {
    let startExpId = null;
    let cannotStartCount = 0;
    Object.keys(expeditionStatus.expeditions).forEach((id) => {
      const expedition = expeditionStatus.expeditions[id];
      if (!expedition.mainDestinationId && !expedition.customDestination) {
        startExpId = id;
      }
      else { cannotStartCount++; }
    });
    setStartExpeditionId(startExpId);
    if (cannotStartCount < MAX_EXPEDITION_COUNT) { setCanStartExpedition(true); }
    else { setCanStartExpedition(false); }
  }, [JSON.stringify(expeditionStatus.expeditions)]);

  const startExpeditionPress = () => {
    let expedition = expeditionStatus.expeditions[startExpeditionId || ''];
    if (startExpeditionId === null) {
      expedition = new Expedition(null);
      const expeditionId = utils.randHex(8);
      expedition.id = expeditionId;
      dispatch(upsertExpedition(expedition));
    }
    dispatch(displayModalValue(MODALS.DESTINATION_SELECT, 'open',
      { expeditionId: expedition.id, position: 'main', exclude: [] }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="route"
          color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Expeditions'}</Text>
      </View>
      <ScrollView>
        {expeditionArray.map((expedition) => (
          <ExpeditionComponent key={expedition.id} expeditionId={expedition.id} />
        ))}
        {(canStartExpedition) && (
          <StartExpeditionButton onPress={startExpeditionPress} />
        )}
      </ScrollView>
    </View>
  );
}

