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

import Expedition from '../../models/expedition';
import { utils } from '../../utils';

export default function ExpeditionsComponent() {
  const dispatch = useDispatch();
  const expeditionStatus = useTypedSelector(state => state.expeditionStatus);
  const expeditionArray = expeditionStatus.getExpeditionsArray();

  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [firstPreparing, setFirstPreparing] = useState('none');

  useEffect(() => {
    let initFirstPreparing = 'none';
    for (let index = expeditionArray.length-1; index >= 0; index--) {
      const expedition = expeditionArray[index];
      if (expedition.state === 'preparing') { initFirstPreparing = expedition.id; }
    }
    setFirstPreparing(initFirstPreparing);
  }, []);

  const startExpeditionPress = () => {
    setDestinationsOpen(true);

    let expedition = expeditionStatus.expeditions[firstPreparing];
    if (firstPreparing === 'none') {
      expedition = new Expedition(null);
      const expeditionId = utils.randHex(8);
      expedition.id = expeditionId;
      dispatch(upsertExpedition(expedition));
      setFirstPreparing(expeditionId);
    }
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
          <ExpeditionComponent key={expedition.id} expeditionId={expedition.id}
            firstPreparing={firstPreparing} destinationsOpen={destinationsOpen}
            setDestinationsOpen={setDestinationsOpen} />
        ))}
        {(firstPreparing === 'none' && !destinationsOpen) && (
          <StartExpeditionButton onPress={startExpeditionPress} />
        )}
      </ScrollView>
    </View>
  );
}

