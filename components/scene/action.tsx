import React, { useRef, useEffect, ReactElement } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { styles } from '../../styles';

import BadgeComponent from '../badge';

import { SceneAction } from '../../models/scene';
import SceneStatus from '../../models/scene_status';
import Vault from '../../models/vault';
import QuestStatus from '../../models/quest_status';
import ExpeditionStatus from '../../models/expedition_status';
import Positioner from '../../models/positioner';
import { utils } from '../../utils';
import { FADE_IN_DELAY } from '../../constants';

const SceneActionComponent = (props: SceneActionProps) => {
  console.log(`props`, props);
  const { animate } = props;

  return (animate)
    ? <SceneActionAnimatedComponent {...props} />
    : <View style={styles.container}><SceneActionButton {...props} /></View>;
}

const SceneActionAnimatedComponent = (props: SceneActionProps) => {
  const { sceneAction } = props;
  const opacityAnim = { [sceneAction.id] : useRef(new Animated.Value(0)).current};
  useEffect(() => { Animated.timing(opacityAnim[sceneAction.id],
    { toValue: 1, duration: FADE_IN_DELAY, useNativeDriver: true }
  ).start(); }, []);

  return (
    <Animated.View style={[styles.container, { opacity: opacityAnim[sceneAction.id] }]}>
      <SceneActionButton {...props} />
    </Animated.View>
  )
}

const SceneActionButton = (props: SceneActionProps) => {
  const { sceneAction, sceneStatus, expeditionStatus } = props;
  const expedition = expeditionStatus.expeditions[sceneStatus.expeditionId || ''];
  const difficulty = expedition ? expedition.getDifficulty() : 1;
  const cost = sceneAction.getCost(difficulty);
  // if (cost?.length > 1) {
  //   return <SceneActionButtonMultiCost {...props} cost={cost} />;
  // }
  // else if (cost?.length === 1) {
  //   return <SceneActionButtonCost {...props} cost={cost} />;
  // }
  return <SceneActionButtonSimple {...props} />;
}

const SceneActionButtonSimple = (props: SceneActionProps) => {
  const { sceneAction, handlePress, pos } = props;

  let requirement: ReactElement|null = null;
  if (sceneAction.requirementLabel) {
    requirement = (
      <View style={styles.columns}>
        <Text style={[styles.buttonText, { alignSelf: 'flex-start', opacity: 0.75 }]}>
          {'Requires:'}
        </Text>
        <View style={styles.rows}>
          {sceneAction.requirementIcon && (
            <BadgeComponent icon={sceneAction.requirementIcon} size={19} />
          )}
          <Text style={styles.buttonText}>
            {sceneAction.requirementLabel}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <TouchableOpacity style={[styles.button, styles.sceneActionButton, {minWidth: pos.speechButtonWidth, 
      maxWidth: pos.speechButtonWidth, }]}
      onPress={() => handlePress({ id: sceneAction.id, type: 'SceneAction' })} >
      <View style={[styles.columns,
        { paddingVertical: 5, alignItems: 'flex-start' }]}>
        <Text style={styles.buttonText}>
          {sceneAction.label}
        </Text>
        {sceneAction.speechType && (
          <Text style={[styles.buttonText, { opacity: 0.75 }]}>
            {`(${sceneAction.speechType})`}
          </Text>
        )}
      </View>
      {requirement}
    </TouchableOpacity>
  )
}

const SceneActionButtonCost = (props: SceneActionCostProps) => {
  
  return null;
}

const SceneActionButtonMultiCost = (props: SceneActionCostProps) => {

  return null;
}

interface SceneActionProps {
  id: string;
  type: string;
  animate: boolean;
  sceneAction: SceneAction;
  handlePress: (args: { id: string, type: string }) => void;

  sceneStatus: SceneStatus;
  vault: Vault;
  questStatus: QuestStatus;
  expeditionStatus: ExpeditionStatus;
  pos: Positioner;
}

interface SceneActionCostProps extends SceneActionProps {
  cost: {specificity: string, kind: string, value: number}[];
}

export default SceneActionComponent;