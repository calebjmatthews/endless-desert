import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../../styles';

import SceneSegmentComponent from './segment';
import { addSceneStep, gainSceneResources } from '../../actions/scene_status';

import SceneStatus from '../../models/scene_status';
import Leader from '../../models/leader';
import Vault from '../../models/vault';
import QuestStatus from '../../models/quest_status';
import ExpeditionStatus from '../../models/expedition_status';
import Resource from '../../models/resource';
import Positioner from '../../models/positioner';
import { scenes, sceneTexts, sceneActions } from '../../instances/scenes';
import { utils } from '../../utils';

const SceneComponent = () => {
  const sceneStatus = useTypedSelector(state => state.sceneStatus);
  const leaders = useTypedSelector(state => state.leaders);
  const vault = useTypedSelector(state => state.vault);
  const expeditionStatus = useTypedSelector(state => state.expeditionStatus);
  const questStatus = useTypedSelector(state => state.questStatus);
  const pos = useTypedSelector(state => state.ui.positioner);

  return useMemo(() => (
    <SceneStatic sceneStatus={sceneStatus} leaders={leaders} vault={vault}
      expeditionStatus={expeditionStatus} questStatus={questStatus} pos={pos} />
  ), [pos]);
}

const SceneStatic = (props: SceneProps) => {
  const { sceneStatus, leaders, vault, expeditionStatus, questStatus } = props;
  const dispatch = useDispatch();
  let scrollView : React.RefObject<ScrollView> = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [segments, setSegments] = useState<Segment[]>([]);

  const scene = scenes[sceneStatus.sceneId];

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      if (sceneStatus.steps.length === 0) {
        setSegments([{ id: scene.next?.ids[0] || '', type: 'SceneText', animate: true }]);
      }
      // setSegments from sceneState here
    }
  }, [initialized]);

  const doneAnimating = (args: { id: string, type: string }) => {
    const { id, type } = args;
    const newSegments: Segment[] = [...segments];
    let segmentsChanged: boolean = false;

    switch(type) {
      case 'SceneText':
      const sceneText = sceneTexts[id];
      dispatch(addSceneStep(id));

      sceneText.next?.ids.forEach((nextId) => {
        if (sceneText.next?.type === 'SceneAction') {
          newSegments.push({ id: nextId, type: 'SceneAction', animate: true });
          segmentsChanged = true;
        }
        else if (sceneText.next?.type === 'SceneText') {
          const nextSceneText = sceneTexts[sceneText.next?.ids[0]];
          if (nextSceneText) {
            // If two narrations in a row, a WaitButton should be used
            // to leave a "..." SceneActed behind
            const type = (sceneText.subType !== 'narration' || nextSceneText.subType !== 'narration')
              ? 'NextButton' : 'WaitButton';
            newSegments.push({ id, type, animate: true });
            segmentsChanged = true;
          }
        }
      });

      if (sceneText.outcome) {
        let gainedResources: Resource[] = [];
        sceneText.outcome.gainResources?.map((gainResource) => {
          const gainedResource = utils.getResourceMatchingSelector(gainResource);
          if (gainedResource) { gainedResources.push(gainedResource); }
          else { console.log(`No matching resource found for: `, gainResource); }
        });
        if (gainedResources.length > 0) {
          console.log(`gainResources`, gainedResources);
          dispatch(gainSceneResources({ sceneActionId: sceneText.id, resources: gainedResources }));
        }
        newSegments.push({ id, type: 'SceneOutcome', animate: true });
        segmentsChanged = true;
      }

      if (!sceneText.next) {
        newSegments.push({ id, type: 'FinalButton', animate: true });
        segmentsChanged = true;
      }
      break;

      case 'SceneOutcome':
      // render NextButton
      break;
    }

    if (segmentsChanged) {
      setSegments(newSegments);
    }
  };

  const handlePress = (args: { id: string, type: string }) => {
    const { id, type } = args;
    console.log(`handlePress { id, type }`, { id, type });
    let newSegments: Segment[] = [...segments];
    let segmentsChanged: boolean = false;

    switch(type) {
      case 'SceneAction':
      // SceneAction => add to sceneStatus.steps, remove SceneActions, add SceneActed, 
      // render .next SceneText
      const sceneAction = sceneActions[id];
      dispatch(addSceneStep(id));
      newSegments = newSegments.filter((segment) => (segment.type !== 'SceneAction'));
      newSegments.push({ id, type: 'SceneActed', animate: false });
      segmentsChanged = true;
      sceneAction.next?.ids.forEach((nextId) => {
        newSegments.push({ id: nextId, type: sceneAction.next?.type || 'SceneText', animate: true });
      });
      break;

      case 'NextButton':
      // NextButton => remove NextButton, render .next SceneText using previous' id
      newSegments = newSegments.filter((segment) => (segment.type !== 'NextButton'));
      segmentsChanged = true;
      const sceneTextNB = sceneTexts[id];
      sceneTextNB.next?.ids.forEach((nextId) => {
        newSegments.push({ id: nextId, type: sceneAction.next?.type || 'SceneText', animate: true });
      });
      break;

      case 'WaitButton':
      // WaitButton => remove WaitButton, add "..." SceneActed, render .next SceneText using previous' id
      newSegments = newSegments.filter((segment) => (segment.type !== 'WaitButton'));
      segmentsChanged = true;
      newSegments.push({ id, type: 'SceneActed', animate: false });
      const sceneTextWB = sceneTexts[id];
      sceneTextWB.next?.ids.forEach((nextId) => {
        newSegments.push({ id: nextId, type: sceneTextWB.next?.type || 'SceneText', animate: true });
      });
      break;

      case 'FinalButton':
      // FinalButton => perform endScene()
      break;
    }

    if (segmentsChanged) {
      setSegments(newSegments);
    }
  }

  return (
    <View style={styles.modalContent}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading1}>{scene.name}</Text>
      </View>
      <ScrollView style={styles.columns}
        ref={scrollView}
        onContentSizeChange={() => {
          if (scrollView.current) { scrollView.current.scrollToEnd({animated: true}); }
        }}>
        {segments.map((segment) => (
          <SceneSegmentComponent key={`${segment.type}-${segment.id}`} {...props} id={segment.id}
          type={segment.type} animate={segment.animate} doneAnimating={doneAnimating}
          handlePress={handlePress} leaders={leaders} vault={vault} 
          expeditionStatus={expeditionStatus} />
        ))}
      </ScrollView>
    </View>
  );
}



interface SceneProps {
  sceneStatus: SceneStatus;
  leaders: { [id: string] : Leader };
  vault: Vault;
  questStatus: QuestStatus;
  expeditionStatus: ExpeditionStatus;
  pos: Positioner;
}

interface Segment {
  id: string;
  type: 'SceneText'|'SceneAction'|'SceneActed'|'NextButton'|'WaitButton'|'FinalButton'|'SceneOutcome';
  animate: boolean;
}

export default SceneComponent;