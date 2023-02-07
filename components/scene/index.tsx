import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { ScrollView } from 'react-native';
import { styles } from '../../styles';

import SceneSegmentComponent from './segment';

import SceneStatus from '../../models/scene_status';
import Leader from '../../models/leader';
import Positioner from '../../models/positioner';
import { scenes, sceneTexts } from '../../instances/scenes';

const SceneComponent = () => {
  const sceneStatus = useTypedSelector(state => state.sceneStatus);
  const leaders = useTypedSelector(state => state.leaders);
  const pos = useTypedSelector(state => state.ui.positioner);

  return useMemo(() => (
    <SceneStatic sceneStatus={sceneStatus} leaders={leaders} pos={pos} />
  ), [pos]);
}

const SceneStatic = (props: SceneProps) => {
  const { sceneStatus } = props;
  let scrollView : React.RefObject<ScrollView> = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [segments, setSegments] = useState<Segment[]>([]);

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      if (sceneStatus.steps.length === 0) {
        const scene = scenes[sceneStatus.sceneId];
        setSegments([{ id: scene.next?.[0] || '', type: 'SceneText', animate: true }]);
      }
      // setSegments from sceneState here
    }
  }, [initialized]);

  const doneAnimating = (args: { id: string, type: string }) => {
    // SceneText => add to sceneStatus.steps, render SceneActions, SceneOutcome, or NextButton

    // SceneOutcome => render NextButton
  };

  const handlePress = (args: { id: string, type: string }) => {
    // SceneText => skip animation, perform doneAnimating

    // SceneAction => add to sceneStatus.steps, remove SceneActions, 
    // add SceneActed, render .next SceneText

    // NextButton => remove NextButton, render .next SceneText, using previous' id

    // FinalButton => perform endScene()
  }

  return (
    <ScrollView style={styles.columns}
      ref={scrollView}
      onContentSizeChange={() => {
        if (scrollView.current) { scrollView.current.scrollToEnd({animated: true}); }
      }}>
      {segments.map((segment) => (
        <SceneSegmentComponent key={segment.id} {...props} id={segment.id} type={segment.type}
        animate={segment.animate} doneAnimating={doneAnimating} handlePress={handlePress} />
      ))}
    </ScrollView>
  );
}



interface SceneProps {
  sceneStatus: SceneStatus;
  leaders: { [id: string] : Leader };
  pos: Positioner;
}

interface Segment {
  id: string;
  type: string;
  animate: boolean;
}

export default SceneComponent;