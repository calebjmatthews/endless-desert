import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import SvgComponent from './svg';
import BadgeComponent from './badge';
import { upsertExpedition, setDestination, removeDromedaries, UPSERT_EXPEDITION, UPSERT_DROMEDARIES }
  from '../actions/expedition_status';
import { displayModalValue } from '../actions/ui';

import Icon from '../models/icon';
import Destination from '../models/destination';
import Expedition from '../models/expedition';
import Resource from '../models/resource';
import { destinations } from '../instances/destinations';
import { explorations } from '../instances/explorations';
import { resourceTypes } from '../instances/resource_types';
import { utils } from '../utils';
import { MODALS } from '../enums/modals';

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
          <ExpeditionComponent key={expedition.id} expedition={expedition}
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

function StartExpeditionButton(props: { onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.buttonLarge, {alignSelf: 'center', marginTop: 5}]}
      onPress={() => props.onPress()} >
      <IconComponent provider="FontAwesome5" color="#fff" size={16} style={styles.headingIcon}
        name={"walking"} />
      <Text style={styles.buttonTextLarge}>
        {' Start a new expedition'}
      </Text>
    </TouchableOpacity>
  )
}

function ExpeditionComponent(props: { expedition: Expedition, firstPreparing: string,
  destinationsOpen: boolean, setDestinationsOpen: (destinationsOpen: boolean) => void }) {
  const { expedition, firstPreparing, destinationsOpen, setDestinationsOpen } = props;
  if (destinationsOpen && firstPreparing === expedition.id) {
    return <DestinationsComponent expedition={expedition} setDestinationsOpen={setDestinationsOpen} />;
  }
  
  if (expedition.state === 'preparing') {
    return <ExpeditionPreparation expedition={expedition} />;
  }

  return null;
}

function DestinationsComponent(props: { expedition: Expedition,
  setDestinationsOpen: (destinationsOpen: boolean) => void }) {
  const dispatch = useDispatch();
  const { expedition, setDestinationsOpen } = props;
  const positioner = useTypedSelector(state => state.ui.positioner);
  const researchStatus = useTypedSelector(state => state.researchStatus);

  const destinationPress = (destination: Destination) => {
    dispatch(setDestination({
      expeditionId: expedition.id,
      destinationId: destination.id,
      endCoordinates: destination.coordinates
    }));
    setDestinationsOpen(false);
  }

  return (
    <View style={styles.columns}>
      <Text style={[styles.heading2, styles.bareText]}>{`Pick a destination: `}</Text>
      {Object.keys(destinations).map((name) => {
        const destination = destinations[name];
        const exploration = explorations[destination.atFinish.id];
        if (!researchStatus.destinationsAvailable[name] || !exploration) { return null; }
        return (
          <TouchableOpacity key={destination.name} style={[styles.panelFlex,
            {minWidth: positioner.majorWidth, maxWidth: positioner.majorWidth}]}
            onPress={() => destinationPress(destination)}>
            <SvgComponent icon={new Icon({ ...destination.icon, size: 40 })} />
            <View style={[styles.containerStretchColumn, { marginLeft: 5 }]}>
              <Text>{destination.name}</Text>
              <View style={styles.breakSmall} />
              <Text style={{fontSize: 12, fontStyle: 'italic', minWidth: positioner.bodyMedWidth, 
                maxWidth: positioner.bodyMedWidth}}>
                {exploration.description}
              </Text>
              <View style={styles.breakSmall} />
              <View style={styles.rows}>
                <Text>{`Rewards: `}</Text>
                {exploration.treasures.map((treasure) => {
                  const resourceKind = utils.getMatchingResourceKind(treasure.specificity, treasure.type);
                  return (
                    <View key={`${destination.name}-${treasure.type}`} style={{marginRight: 2}}>
                      <IconOrSvg icon={new Icon({...resourceKind.icon, size: 18})} />
                    </View>
                  );
                })}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function IconOrSvg(props: {icon: Icon}) {
  const { icon } = props;

  switch(icon.provider) {
    case 'svg':
    return <SvgComponent icon={icon} />;

    default:
    return <IconComponent {...icon} />;
  }
}

function ExpeditionPreparation(props: { expedition: Expedition }) {
  const { expedition } = props;
  const destination = expedition.customDestination || destinations[expedition.destinationId || ''];
  const pos = useTypedSelector(state => state.ui.positioner);
  if (!destination) { return null; }
  return (
    <View style={StyleSheet.flatten([styles.panelFlex, {overflow: 'hidden', minHeight: 300, 
      backgroundColor: (destination.icon.backgroundColor || '#fff'), 
      minWidth: pos.majorWidth, maxWidth: pos.majorWidth}])}>
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
              <Text style={styles.mutedText}>{` (max 100):`}</Text>
            </View>

            <DromedariesComponent expeditionId={expedition.id} />
            <AddDromedariesButton expeditionId={expedition.id} />
          </View>
        </>
      </View>
    </View>
  )
}

function LeaderButton(props: { leaderId: string, expeditionId: string }) {
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

function DromedariesComponent(props: { expeditionId: string }) {
  const { expeditionId } = props;
  const dispatch = useDispatch();
  const pos = useTypedSelector(state => state.ui.positioner);
  const expedition = useTypedSelector(state => state.expeditionStatus.expeditions[expeditionId]);
  const dromedariesArrray = Object.keys(expedition.dromedaries).map((id) => {
    return expedition.dromedaries[id];
  });
  if (dromedariesArrray.length === 0) { return null; }

  const editDromedariesPress = () => {
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_ONE, 'open',
      {type: UPSERT_DROMEDARIES, expeditionId, excludes: [], maximum: 100}));
  };

  const removeDromedariesPress = (dromedaries: Resource) => {
    dispatch(removeDromedaries({
      expeditionId, 
      dromedariesTypeQuality: `${dromedaries.type}|${dromedaries.quality}`
    }));
  }

  return (
    <View style={styles.columns}>
      {dromedariesArrray.map((dromedaries) => {
        const dromedaryResourceType = resourceTypes[dromedaries.type];
        return (
          <View key={dromedaries.type} style={styles.rows}>
            <TouchableOpacity style={[styles.buttonSubtle, {justifyContent: 'flex-start',
              minWidth: pos.buttonWithCancelOnSide, maxWidth: pos.buttonWithCancelOnSide}]}
              onPress={() => editDromedariesPress()}>
              <SvgComponent icon={new Icon({...dromedaryResourceType.icon, size: 20})} />
              <Text>
                {` ${dromedaries.type} x${dromedaries.quantity}`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSubtleAway}
              onPress={() => removeDromedariesPress(dromedaries)}>
              <IconComponent provider="FontAwesome" name="times-circle" color="#fff"
                size={18} style={styles.headingIcon} />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  )
}

function AddDromedariesButton(props: { expeditionId: string }) {
  const { expeditionId } = props;
  const pos = useTypedSelector(state => state.ui.positioner);
  const dispatch = useDispatch();

  const upsertDromedaries = () => {
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_ONE, 'open',
      {type: UPSERT_DROMEDARIES, expeditionId, excludes: [], maximum: 100}));
  };

  return (
    <TouchableOpacity style={[styles.buttonSubtle, {justifyContent: 'flex-start',
      minWidth: pos.buttonInEmbedded,  maxWidth: pos.buttonInEmbedded, opacity: 0.9, marginBottom: 6}]}
      onPress={() => upsertDromedaries()}>
      <IconComponent provider='FontAwesome5' name='plus-circle' color='#444'
        size={14} />
      <Text>
        {` Add dromedaries`}
      </Text>
    </TouchableOpacity>
  );
}