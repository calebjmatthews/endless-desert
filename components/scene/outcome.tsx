import React, { useRef } from 'react';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, Animated } from 'react-native';
import { styles } from '../../styles';

import BadgeComponent from '../badge';
import IconComponent from '../icon';

import { SceneOutcome } from '../../models/scene';
import ExpeditionStatus from '../../models/expedition_status';
import Leader from '../../models/leader';
import Icon from '../../models/icon';
import Positioner from '../../models/positioner';
import { leaderTypes } from '../../instances/leader_types';
import { researches } from '../../instances/researches';
import { quests } from '../../instances/quests';
import { leaderQualities } from '../../instances/leader_qualities';
import { utils } from '../../utils';
import { FADE_IN_DELAY } from '../../constants';
import SvgComponent from '../svg';

const SceneOutcomeComponent = (props: SceneOutcomeProps) => {
  const sceneStatus = useTypedSelector(state => state.sceneStatus);
  const { id, sceneOutcome, animate, expeditionStatus, leaders, pos } = props;
  const { affectLeader, changeLocation, gainResources, leaderJoins, questsBegin, completeResearch }
    = sceneOutcome;

  let outcomes: React.ReactFragment[] = [];

  if (gainResources) {
    const resourcesGained = sceneStatus.resourcesGained?.[id];
    const expedition = expeditionStatus.expeditions[sceneStatus.expeditionId || ''];
    outcomes.push(
      <View key={`${id}-gainResources`} style={[styles.columns, {paddingHorizontal: 10, marginTop: 5,
        minWidth: pos.modalMajor, maxWidth: pos.modalMajor}]}>
        <View style={styles.rows}>
          <View style={{marginRight: 3}}>
            <IconComponent provider="FontAwesome" name="cube" color="#444" size={16} />
          </View>
          <Text style={styles.heading3}>
            {(expedition) ? "The expedition gained:" : "Your town gained:"}
          </Text>
        </View>
        {resourcesGained?.map((resource) => {
          const resourceType = utils.getResourceType(resource);
          return (
            <View key={`${resource.type}|${resource.quality}`}
              style={[styles.containerStretchRow, {marginLeft: 10}]}>
              <View style={{marginRight: 3}}>
                <SvgComponent icon={new Icon({...resourceType.icon, size: 18})} />
              </View>
              <Text>
                {`+${utils.formatNumberShort(resource.quantity)} ${utils.getResourceName(resource)}`}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }
  const leaderJoining = leaderJoins ? leaderTypes[leaderJoins] : null;
  if (leaderJoining) {
    outcomes.push(
      <View key={`${id}-leaderJoining`} style={[styles.rows, {paddingHorizontal: 10, marginTop: 5,
        minWidth: pos.modalMajor, maxWidth: pos.modalMajor}]}>
        <BadgeComponent icon={leaderJoining.icon} size={37} />
        <Text>
          {` ${leaderJoining.name} joined you!`}
        </Text>
      </View>
    );
  }
  if (questsBegin) {
    outcomes.push(
      <View key={`${id}-questsBegin`} style={[styles.columns, {paddingHorizontal: 10, marginTop: 5,
        minWidth: pos.modalMajor, maxWidth: pos.modalMajor}]}>
        <View style={styles.rows}>
          <View style={{marginRight: 3}}>
            <IconComponent provider="FontAwesome" name="medal" color="#444" size={16} />
          </View>
          <Text>
            {(questsBegin.length == 1) ? "You began the quest:" : "You began the quests:"}
          </Text>
        </View>
        {questsBegin.map((questName) => {
          const quest = quests[questName];
          return (
            <View key={quest.id} style={styles.rows}>
              <BadgeComponent icon={quest.icon} size={37} />
              <Text>
                {`${quest.subtitle}: ${quest.name}`}
              </Text>
            </View>
          )
        })}
      </View>
    );
  }
  if (completeResearch) {
    outcomes.push(
      <View key={`${id}-completeResearch`} style={[styles.columns, {paddingHorizontal: 10, marginTop: 5,
        minWidth: pos.modalMajor, maxWidth: pos.modalMajor}]}>
        {completeResearch.map((researchName) => {
          const research = researches[researchName];
          return (
            <View key={researchName} style={styles.rows}>
              <BadgeComponent icon={research.icon} size={37} />
              <Text>{research.unlocks}</Text>
            </View>
          )
        })}
      </View>
    );
  }
  if (affectLeader) {
    outcomes.push(
      <View key={`${id}-affectLeader`} style={[styles.rows, {paddingHorizontal: 10, marginTop: 5,
        minWidth: pos.modalMajor, maxWidth: pos.modalMajor}]}>
        {affectLeader.map((anEffect) => {
          const expedition = expeditionStatus.expeditions[sceneStatus.expeditionId || ''];
          const leader = leaders[expedition?.leader];
          const leaderLabel = leader ? utils.makePossessive(leader.name) : `The leader's`;
          const extent = anEffect.change || anEffect.percentage || 1;
          let label = (extent > 0) ? 'increased by' : 'decreased by';
          label = `${label} ${Math.abs(extent)}${(anEffect.percentage) ? '%.' : '.'}`;
          return (
            <View key={JSON.stringify(anEffect)} style={styles.rows}>
              <View style={{marginRight: 3}}>
                <IconComponent {...leaderQualities[anEffect.quality].icon} size={16} />
              </View>
              <Text>{`${leaderLabel} ${anEffect.quality} ${label}`}</Text>
            </View>
          )
        })}
      </View>
    );
  }
  if (changeLocation) {
    const { towardsDestination, distance, percentage } = changeLocation;
    let label = 'The destination is';
    let extent = distance || percentage || 1;
    const expedition = expeditionStatus.expeditions[sceneStatus.expeditionId || ''];
    if (percentage && expedition) {
      extent = utils.distanceBetweenPoints([0, 0], expedition.targetCoordinates);
    }
    switch (true) {
      case extent <= 200:
      label = `${label} a little`; break;
      case extent > 200 && extent <= 500:
      label = `${label} quite a bit`; break;
      case extent > 500:
      label = `${label} much`; break;
    }
    let icon = new Icon({ provider: "FontAwesome5", name: "route", color: '#071f56' });
    if (towardsDestination) {
      label = `${label} closer now.`;
    }
    else {
      label = `${label} farther away now.`;
      icon.color = '#ff2222';
    }
    outcomes.push(
      <View key={`${id}-changeLocation`} style={[styles.columns, {paddingHorizontal: 10, marginTop: 5,
        minWidth: pos.modalMajor, maxWidth: pos.modalMajor}]}>
        <View style={styles.rows}>
          <View style={{marginRight: 3}}>
            <IconComponent {...icon} size={16} />
          </View>
          <Text>{label}</Text>
        </View>
      </View>
    );
  }

  if (outcomes.length === 0) { return null; }
  if (animate) {
    return <SceneOutcomeAnimated {...props} outcomes={outcomes} />;
  }
  return (
    <View style={[styles.panelFlexColumn, {minWidth: pos.modalMajor, maxWidth: pos.modalMajor,
      minHeight: 0}]}>
      {outcomes.map((outcome) => outcome)}
    </View>
  )
}

const SceneOutcomeAnimated = (props: SceneOutcomeAnimatedProps) => {
  const { id, type, doneAnimating, outcomes, pos } = props;
  const outcomeOpacity = useRef(new Animated.Value(0)).current;
  React.useEffect(() => { Animated.timing(outcomeOpacity,
    { toValue: 0.9, duration: (FADE_IN_DELAY*2), useNativeDriver: true }
  ).start(() => {
    doneAnimating({ id, type });
  })});

  return (
    <Animated.View style={{opacity: outcomeOpacity}}>
      <View style={[styles.panelFlexColumn, {minWidth: pos.modalMajor, maxWidth: pos.modalMajor,
        minHeight: 0}]}>
        {outcomes.map((outcome) => outcome)}
      </View>
    </Animated.View>
  )
}

interface SceneOutcomeProps {
  id: string;
  type: string;
  sceneOutcome: SceneOutcome;
  animate: boolean;
  doneAnimating: (args: { id: string, type: string }) => void;

  expeditionStatus: ExpeditionStatus;
  leaders: { [id: string] : Leader };
  pos: Positioner;
}

interface SceneOutcomeAnimatedProps extends SceneOutcomeProps {
  outcomes: React.ReactFragment[];
}

export default SceneOutcomeComponent;