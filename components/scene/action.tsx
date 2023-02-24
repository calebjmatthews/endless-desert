import React, { useRef, useEffect, ReactElement } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { styles } from '../../styles';

import BadgeComponent from '../badge';
import { displayModalValue } from '../../actions/ui';
import { PAY_SCENE_COST } from '../../actions/scene_status';

import { SceneAction } from '../../models/scene';
import Vault from '../../models/vault';
import QuestStatus from '../../models/quest_status';
import ExpeditionStatus from '../../models/expedition_status';
import SceneStatus from '../../models/scene_status';
import Positioner from '../../models/positioner';
import { utils } from '../../utils';
import { FADE_IN_DELAY } from '../../constants';
import { MODALS } from '../../enums/modals';

const SceneActionComponent = (props: SceneActionProps) => {
  const dispatch = useDispatch();
  const sceneStatus = useTypedSelector(state => state.sceneStatus);
  const { animate } = props;

  const pressCost = (args: { sceneActionId: string, costIndex: number }) => {
    const { sceneActionId, costIndex } = args;
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_VALUE, 'open',
      { type: PAY_SCENE_COST, expeditionId: sceneStatus.expeditionId, sceneActionId, costIndex }));
  }

  return (animate)
    ? <SceneActionAnimatedComponent {...props} pressCost={pressCost} sceneStatus={sceneStatus} />
    : <View style={styles.container}>
      <SceneActionButton {...props} pressCost={pressCost} sceneStatus={sceneStatus} />
    </View>;
}

const SceneActionAnimatedComponent = (props: SceneActionSubProps) => {
  const { sceneAction } = props;
  const opacityAnim = { [sceneAction.id] : useRef(new Animated.Value(0)).current};
  useEffect(() => { Animated.timing(opacityAnim[sceneAction.id],
    { toValue: 1, duration: FADE_IN_DELAY, useNativeDriver: true }
  ).start(); }, []);

  return (
    <Animated.View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
      opacity: opacityAnim[sceneAction.id] }}>
      <SceneActionButton {...props} />
    </Animated.View>
  )
}

const SceneActionButton = (props: SceneActionSubProps) => {
  const { sceneAction, expeditionStatus, sceneStatus } = props;
  const expedition = expeditionStatus.expeditions[sceneStatus.expeditionId || ''];
  const difficulty = expedition ? expedition.getDifficulty() : 1;
  const cost = sceneAction.getCost(difficulty);
  if (cost?.length > 1) {
    return <SceneActionButtonMultiCost {...props} cost={cost} />;
  }
  if (cost?.length === 1) {
    return <SceneActionButtonCost {...props} cost={cost} />;
  }
  return <SceneActionButtonSimple {...props} />;
}

const SceneActionButtonSimple = (props: SceneActionSubProps) => {
  const { sceneAction, handlePress, pos } = props;

  let requirement: ReactElement|null = null;
  if (sceneAction.requirementLabel) {
    requirement = (
      <View style={styles.columns}>
        <Text style={[styles.buttonText, { alignSelf: 'flex-start', fontSize: 12 }]}>
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
      maxWidth: pos.speechButtonWidth}]}
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
  );
}

const SceneActionButtonCost = (props: SceneActionCostProps) => {
  const { sceneAction, cost, pressCost, pos } = props;
  const costKind = utils.getMatchingResourceKind(cost[0].specificity, cost[0].kind);
  
  return (
    <TouchableOpacity style={[styles.button, styles.sceneActionButton, {minWidth: pos.speechButtonWidth, 
      maxWidth: pos.speechButtonWidth}]}
      onPress={() => pressCost({ sceneActionId: sceneAction.id, costIndex: 0 })} >
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
      <View style={styles.columns}>
        <Text style={[styles.buttonText, { alignSelf: 'flex-start', fontSize: 12 }]}>
          {'Cost:'}
        </Text>
        <View style={styles.rows}>
          <BadgeComponent icon={costKind.icon} size={19} />
          <Text style={styles.buttonText}>
            {`${costKind.name.replace('Action: ', '')} (≦${utils.formatNumberShort(Math.ceil(cost[0].value / (costKind.value || 1)))})`}
          </Text>
        </View>
      </View>
      <View style={styles.breakSmall} />
    </TouchableOpacity>
  );
}

const SceneActionButtonMultiCost = (props: SceneActionCostProps) => {
  const { sceneAction, cost, pos } = props;
  
  return (
    <View style={[styles.button, styles.sceneActionButton, styles.sceneActionButtonCost,
      {minWidth: pos.speechButtonWidth, maxWidth: pos.speechButtonWidth}]} >
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
      <View style={styles.columns}>
        <Text style={[styles.buttonText, { alignSelf: 'flex-start', fontSize: 12 }]}>
          {'Cost:'}
        </Text>
        {cost.map((aCost) => {
          const costKind = utils.getMatchingResourceKind(aCost.specificity, aCost.kind);
          return (
            <TouchableOpacity style={[styles.button, styles.sceneActionButtonSubcost,
              {minWidth: pos.speechBubbleEmbeddedWidth, maxWidth: pos.speechBubbleEmbeddedWidth}]}>
              <BadgeComponent icon={costKind.icon} size={19} />
              <Text style={styles.buttonText}>
                {`${costKind.name.replace('Action: ', '')} (≦${utils.formatNumberShort(aCost.value / (costKind.value || 1))})`}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <View style={styles.breakSmall} />
    </View>
  );
}

interface SceneActionProps {
  id: string;
  type: string;
  animate: boolean;
  sceneAction: SceneAction;
  handlePress: (args: { id: string, type: string }) => void;

  vault: Vault;
  questStatus: QuestStatus;
  expeditionStatus: ExpeditionStatus;
  pos: Positioner;
}

interface SceneActionSubProps extends SceneActionProps {
  pressCost: (args: { sceneActionId: string, costIndex: number }) => void;
  sceneStatus: SceneStatus;
}

interface SceneActionCostProps extends SceneActionSubProps {
  cost: {specificity: string, kind: string, value: number, paid?: boolean}[];
}

export default SceneActionComponent;