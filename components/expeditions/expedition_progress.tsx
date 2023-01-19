import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../../styles';

import IconComponent from '../icon';
import SvgComponent from '../svg';
import DromedaryProgressIcons from './dromedary_progress_icons';
import ProgressBarComponent from '../progress_bar';
import EventHistoryComponent from './event_history';

import Icon from '../../models/icon';
import { destinations } from '../../instances/destinations';
import { utils } from '../../utils';

export default function ExpeditionProgressComponent(props: { expeditionId: string }) {
  const { expeditionId } = props;
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const destination = expedition.customDestination || destinations[expedition.mainDestinationId || ''];
  const pos = useTypedSelector(state => state.ui.positioner);
  const timer = expedition.timers[expedition.getTimerId('arrival') || ''];

  if (!destination) { return null; }
  return (
    <View style={[styles.panelFlex, {overflow: 'hidden', alignItems: 'flex-start',
      backgroundColor: (destination.icon.backgroundColor || '#fff'), 
      minHeight: (pos.bodyHeight * 0.6), minWidth: pos.majorWidth, maxWidth: pos.majorWidth}]}>
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
        
        <View style={styles.breakLarge} />
        <DromedaryProgressIcons dromedaries={expedition.dromedaries} paused={false}
          width={pos.majorWidth} />

        {timer && (
          <ProgressBarComponent staticDuration={true}
            width={pos.majorWidth - pos.minorPadding}
            startingProgress={timer.progress} endingProgress={1}
            duration={timer.endsAt - new Date(Date.now()).valueOf()}
            label={timer.remainingLabel} />
        )}

        <View style={styles.breakLarge} />
        <View style={[styles.descriptionBand,
          {marginLeft: -5, minWidth: pos.majorWidth, maxWidth: pos.majorWidth}]}>
          <EventHistoryComponent expeditionId={expedition.id} index={0} />
        </View>

      </View>
    </View>
  )
}