import React from 'react';
import SceneNarrationComponent from './narration';

import SceneStatus from '../../models/scene_status';
import Leader from '../../models/leader';
import Positioner from '../../models/positioner';
import { sceneTexts } from '../../instances/scenes/index';

const SceneSegmentComponent = (props: SceneSegmentProps) => {
  const { id, type } = props;
  switch(type) {
    case 'SceneText':
    const sceneText = sceneTexts[id];
    if (sceneText.subType === 'narration') {
      return <SceneNarrationComponent {...props} sceneText={sceneText} />;
    }
    else {

    }
    
    case 'SceneAction':
    return null;

    case 'SceneActed':
    return null;

    case 'NextButton':
    case 'FinalButton':
    return null;

    case 'SceneOutcome':
    return null;

    default:
    return null;
  }
}

export interface SceneSegmentProps {
  id: string;
  type: string;
  animate: boolean;
  doneAnimating: (args: { id: string, type: string }) => void;
  handlePress: (args: { id: string, type: string }) => void;

  sceneStatus: SceneStatus;
  leaders: { [id: string] : Leader };
  pos: Positioner;
}

export default SceneSegmentComponent;