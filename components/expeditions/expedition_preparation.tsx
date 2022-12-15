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
import DromedaryStatsComponent from './dromedary_stats';
import LeaderStatsComponent from './leader_stats';
import AddResourceButton from './add_resource';
import ResourcesComponent from './resources';
import AdviceComponent from './advice';

import { destinations } from '../../instances/destinations';
import { dromedaryTypes } from '../../instances/dromedary_types';
import { utils } from '../../utils';

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
              <IconComponent provider='FontAwesome5' name='user-circle' color={'#444'} size={16} />
              <Text style={styles.heading3}>{` Leader:`}</Text>
            </View>
            <LeaderButton leaderId={expedition.leader} expeditionId={expedition.id} />
            {expedition.leader?.length > 0 && (
              <>
                <View style={styles.breakSmall} />
                <LeaderStatsComponent expeditionId={expedition.id} />
              </>
            )}
          </View>

          <View style={[styles.panelFlexColumn, {alignItems: 'flex-start',
            minWidth: pos.embeddedWidth, maxWidth: pos.embeddedWidth}]}>
            <View style={styles.rows}>
              <IconComponent provider='FontAwesome5' name='horse-head' color={'#444'} size={16} />
              <Text style={styles.heading3}>{` Dromedaries`}</Text>
              <Text style={styles.mutedText}>{` (${expedition.getCurrentDromedaryCount()}/100):`}</Text>
            </View>
            <DromedariesComponent expeditionId={expedition.id} />
            <AddDromedariesButton expeditionId={expedition.id} />
            {Object.keys(expedition.dromedaries).length > 0 && (
              <>
                <View style={styles.breakSmall} />
                <DromedaryStatsComponent expeditionId={expedition.id} />
              </>
            )}
          </View>

          <View style={[styles.panelFlexColumn, {alignItems: 'flex-start',
            minWidth: pos.embeddedWidth, maxWidth: pos.embeddedWidth}]}>
            <View style={styles.rows}>
              <IconComponent provider="FontAwesome" name="cube" color={'#444'} size={16} />
              <Text style={styles.heading3}>{` Supplies`}</Text>
              <Text style={styles.mutedText}>{` (${utils.formatNumberShort(expedition.getCurrentResourceCount())}/${utils.formatNumberShort(expedition.getTotalResourceSpace(dromedaryTypes))}):`}</Text>
            </View>
            <ResourcesComponent expeditionId={expedition.id} />
            <AddResourceButton expeditionId={expedition.id} />
            {Object.keys(expedition.resources).length > 0 && (
              <>
                <View style={styles.breakSmall} />
                
              </>
            )}
          </View>

          <View style={[styles.panelFlexColumn, {alignItems: 'flex-start',
            minWidth: pos.embeddedWidth, maxWidth: pos.embeddedWidth}]}>
            <View style={styles.rows}>
              <IconComponent provider="FontAwesome5" name="info-circle" color={'#444'} size={16} />
              <Text style={styles.heading3}>{` Advice:`}</Text>
            </View>
            <AdviceComponent expeditionId={expedition.id} />
          </View>
        </>
      </View>
    </View>
  )
}