import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import IconComponent from '../icon';
import SvgComponent from '../svg';
import RouteComponent from './route';
import LeaderButton from './leader_button';
import AddDromedariesButton from './add_dromedaries';
import DromedariesComponent from './dromedaries';
import DromedaryStatsComponent from './dromedary_stats';
import LeaderStatsComponent from './leader_stats';
import AddResourceButton from './add_resource';
import ResourcesComponent from './resources';
import AdviceComponent from './advice';
import { upsertExpedition } from '../../actions/expedition_status';

import Icon from '../../models/icon';
import { destinations } from '../../instances/destinations';
import { dromedaryTypes } from '../../instances/dromedary_types';
import { utils } from '../../utils';

export default function ExpeditionPreparationComponent(props: { expeditionId: string }) {
  const { expeditionId } = props;
  const dispatch = useDispatch();
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const destination = expedition.customDestination || destinations[expedition.mainDestinationId || ''];
  const leaders = useTypedSelector(state => state.leaders);
  const pos = useTypedSelector(state => state.ui.positioner);

  function beginPress() {
    const newExpedition = expedition.beginExpedition({ dromedaryTypes, leaders, destinations });
    dispatch(upsertExpedition(newExpedition));
  }

  if (!destination) { return null; }
  return (
    <View style={[styles.panelFlex, {overflow: 'hidden', alignItems: 'flex-start',
      backgroundColor: (destination.icon.backgroundColor || '#fff'), 
      minHeight: (pos.bodyHeight * 0.85), minWidth: pos.majorWidth, maxWidth: pos.majorWidth}]}>
      <View style={styles.landscapeWrapper}>
        <SvgComponent icon={new Icon({ ...destination.icon, size: 300 })} />
      </View>
      <View style={styles.columns}>
        <>
          <Text style={[styles.bareText, styles.emphasis, {fontSize: 12}]}>
            {expedition.subTitle}
          </Text>
          <Text style={styles.heading1}>{destination.name}</Text>
        </>
        <>
          <View style={[styles.panelFlexColumn, {alignItems: 'flex-start',
            minWidth: pos.embeddedWidth, maxWidth: pos.embeddedWidth}]}>
            <View style={styles.rows}>
              <IconComponent provider="FontAwesome5" name="route" color={'#444'} size={16} />
              <Text style={styles.heading3}>{` Route`}</Text>
              <Text style={styles.mutedText}>
                {` (${utils.formatNumberShort(expedition.getExpeditionLength({destinations}))} leagues):`}
              </Text>
            </View>
            <View style={styles.breakSmall} />
            <RouteComponent expeditionId={expeditionId} />
          </View>

          {(expedition.mainDestinationId) && (
            <View style={[styles.panelFlexColumn, {alignItems: 'flex-start',
              minWidth: pos.embeddedWidth, maxWidth: pos.embeddedWidth}]}>
              <View style={styles.rows}>
                <IconComponent provider='FontAwesome5' name='user-circle' color={'#444'} size={16} />
                <Text style={styles.heading3}>{` Leader:`}</Text>
              </View>
              <View style={styles.breakSmall} />
              <LeaderButton leaderId={expedition.leader} expeditionId={expedition.id} />
              {expedition.leader?.length > 0 && (
                <>
                  <View style={styles.breakSmall} />
                  <LeaderStatsComponent expeditionId={expedition.id} />
                </>
              )}
            </View>
          )}

          {(expedition.leader) && (
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
          )}

          {(Object.keys(expedition.dromedaries || {}).length > 0) && (
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
              <Text style={{fontStyle: 'italic', fontSize: 12, color: '#222'}}>
                * The most valuable supplies are used up first.
              </Text>
            </View>
          )}

          <View style={[styles.panelFlexColumn, {alignItems: 'flex-start',
            minWidth: pos.embeddedWidth, maxWidth: pos.embeddedWidth}]}>
            <View style={styles.rows}>
              <IconComponent provider="FontAwesome5" name="info-circle" color={'#444'} size={16} />
              <Text style={styles.heading3}>{` Advice:`}</Text>
            </View>
            <AdviceComponent expeditionId={expedition.id} />
          </View>

          {(expedition.subState === 3) && (
            <TouchableOpacity style={[styles.buttonLarge, {alignSelf: 'center', marginTop: 5}]}
              onPress={() => beginPress()} >
              <IconComponent provider="FontAwesome" color="#fff" size={16} style={styles.headingIcon}
                name="arrow-right" />
              <Text style={styles.buttonTextLarge}>
                {` Begin!`}
              </Text>
            </TouchableOpacity>
          )}
        </>
      </View>
    </View>
  )
}