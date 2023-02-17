import React, { useRef, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, Animated } from 'react-native';
import { styles } from '../../styles';

import BadgeComponent from '../badge';

import { SceneOutcome } from '../../models/scene';
import Resource from '../../models/resource';
import ExpeditionStatus from '../../models/expedition_status';
import SceneStatus from '../../models/scene_status';
import Leader from '../../models/leader';
import Positioner from '../../models/positioner';
import { leaderTypes } from '../../instances/leader_types';
import { researches } from '../../instances/researches';
import { quests } from '../../instances/quests';
import { utils } from '../../utils';
import { FADE_IN_DELAY } from '../../constants';
import { scenes } from '../../instances/scenes';

const SceneOutcomeComponent = (props: SceneOutcomeProps) => {
  const sceneStatus = useTypedSelector(state => state.sceneStatus);
  const { id, sceneOutcome, animate, expeditionStatus, leaders, pos } = props;
  const { affectLeader, changeLocation, gainResources, leaderJoins, questsBegin, completeResearch }
    = sceneOutcome;

  let outcomes: React.ReactFragment[] = [];

  const leaderJoining = leaderJoins ? leaderTypes[leaderJoins] : null;
  if (leaderJoining) {
    outcomes.push(
      <View style={[styles.panelFlexColumn, {minWidth: pos.modalMajor, maxWidth: pos.modalMajor}]}>
        <BadgeComponent icon={leaderJoining.icon} size={37} />
        <Text>
          {` ${leaderJoining.name} joined you!`}
        </Text>
      </View>
    );
  }
  if (questsBegin) {
    outcomes.push(
      <View style={[styles.panelFlexColumn, {minWidth: pos.modalMajor, maxWidth: pos.modalMajor}]}>
        <Text>
          {(questsBegin.length == 1) ? "You began the quest:"
            : "You began the quests:"}
        </Text>
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
  if (gainResources) {
    const resourcesGained = sceneStatus.resourcesGained?.[id];
    const expedition = expeditionStatus.expeditions[sceneStatus.expeditionId || ''];
    outcomes.push(
      <View style={[styles.panelFlexColumn, {minWidth: pos.modalMajor, maxWidth: pos.modalMajor}]}>
        <Text style={styles.heading3}>
          {(expedition) ? "The expedition gained:" : "Your town gained:"}
          </Text>
        {resourcesGained?.map((resource) => {
          const resourceType = utils.getResourceType(resource);
          return (
            <View key={`${resource.type}|${resource.quality}`}
              style={styles.containerStretchRow}>
              <BadgeComponent icon={resourceType.icon} size={21} />
              <Text>
                {` +${utils.formatNumberShort(resource.quantity)}  ${utils.getResourceName(resource)}`}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }
  if (completeResearch) {
    outcomes.push(
      <View style={[styles.panelFlexColumn, {minWidth: pos.modalMajor, maxWidth: pos.modalMajor}]}>
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
      <View style={[styles.panelFlexColumn, {minWidth: pos.modalMajor, maxWidth: pos.modalMajor}]}>
        {affectLeader.map((anEffect) => {
          const expedition = expeditionStatus.expeditions[sceneStatus.expeditionId || ''];
          const leader = leaders[expedition?.leader];
          const leaderLabel = leader ? utils.makePossessive(leader.name) : `The leader's`;
          const extent = anEffect.change || anEffect.percentage || 1;
          let label = (extent > 0) ? 'increased by' : 'decreased by';
          label = `${label} ${Math.abs(extent)}${(anEffect.percentage) ? '%' : ''}`;
          return (
            <View key={JSON.stringify(anEffect)} style={styles.rows}>
              <Text>{`${leaderLabel} ${anEffect.quality} ${label}`}</Text>
            </View>
          )
        })}
      </View>
    );
  }
  if (changeLocation) {
    const { towardsDestination, distance, percentage } = changeLocation;
    const extent = changeLocation.distance || changeLocation.percentage || 1;
    let label = (extent > 0) ? 'increased by' : 'decreased by';
    label = `${label} ${Math.abs(extent)}${(anEffect.percentage) ? '%' : ''}`;
    outcomes.push(
      <View style={[styles.panelFlexColumn, {minWidth: pos.modalMajor, maxWidth: pos.modalMajor}]}>
        <View style={styles.rows}>
              <Text>{`${leaderLabel} ${anEffect.quality} ${label}`}</Text>
            </View>
      </View>
    );
  }

  if (outcomes.length === 0) { return null; }
  if (animate) {
    return <SceneOutcomeAnimated {...props} outcomes={outcomes} />;
  }
  return (
    <View>
      {outcomes.map((outcome, index) => (
        <View key={index}>
          {outcome}
        </View>
      ))}
    </View>
  )
}

const SceneOutcomeAnimated = (props: SceneOutcomeAnimatedProps) => {
  const { id, type, doneAnimating, outcomes } = props;
  const outcomeOpacity = useRef(new Animated.Value(0)).current;
  React.useEffect(() => { Animated.timing(outcomeOpacity,
    { toValue: 0.9, duration: (FADE_IN_DELAY*2), useNativeDriver: true }
  ).start(() => {
    doneAnimating({ id, type });
  })});

  return (
    <Animated.View style={{opacity: outcomeOpacity}}>
      {outcomes.map((outcome, index) => (
        <View key={index}>
          {outcome}
        </View>
      ))}
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