import React from 'react';
import { Text, View } from 'react-native';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import Icon from '../../models/icon';
import IconComponent from '../icon';
import SvgComponent from '../svg';
import LeaderButton from './leader_button';
import AddDromedariesButton from './add_dromedaries';
import DromedariesComponent from './dromedaries';
import DromedaryStatusComponent from './dromedary_stats';

import { destinations } from '../../instances/destinations';

export default function ExpeditionPreparationComponent(props: { expeditionId: string }) {
  const { expeditionId } = props;
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const destination = expedition.customDestination || destinations[expedition.destinationId || ''];
  const pos = useTypedSelector(state => state.ui.positioner);

  if (!destination) { return null; }
  return (
    <View style={[styles.panelFlex, {overflow: 'hidden', minHeight: 300, 
      backgroundColor: (destination.icon.backgroundColor || '#fff'), 
      minWidth: pos.majorWidth, maxWidth: pos.majorWidth}]}>
      <View style={styles.landscapeWrapper}>
        <SvgComponent icon={new Icon({ ...destination.icon, size: 300 })} />
      </View>
      <View style={[styles.columns, {justifyContent: 'space-between'}]}>
        <>
          <Text style={[styles.bareText, styles.emphasis, {fontSize: 12}]}>
            {`Samannoud's journey to the`}
            </Text>
          <Text style={styles.heading1}>{destination.name}</Text>
        </>
        <>
          <View style={[styles.panelFlexColumn, {alignItems: 'flex-start',
            minWidth: pos.embeddedWidth, maxWidth: pos.embeddedWidth}]}>
            <View style={styles.rows}>
              <IconComponent provider='FontAwesome5' name='user-circle'
                color={'#444'} size={16} />
              <Text style={styles.heading3}>{` Leader:`}</Text>
            </View>
            
            <LeaderButton leaderId={expedition.leader} expeditionId={expedition.id} />
          </View>
          <View style={[styles.panelFlexColumn, {alignItems: 'flex-start',
            minWidth: pos.embeddedWidth, maxWidth: pos.embeddedWidth}]}>
            <View style={styles.rows}>
              <IconComponent provider='FontAwesome5' name='horse-head'
                color={'#444'} size={16} />
              <Text style={styles.heading3}>{` Dromedaries`}</Text>
              <Text style={styles.mutedText}>{` (${expedition.getCurrentDromedaryCount()}/100):`}</Text>
            </View>

            <DromedariesComponent expeditionId={expedition.id} />
            <AddDromedariesButton expeditionId={expedition.id} />
            {Object.keys(expedition.dromedaries).length > 0 && (
              <>
                <View style={styles.breakSmall} />
                <DromedaryStatusComponent expeditionId={expedition.id} />
              </>
            )}
          </View>
        </>
      </View>
    </View>
  )
}