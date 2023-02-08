import React from 'react';
import SceneNarrationComponent from './narration';
import SceneActionComponent from './action';

import SceneStatus from '../../models/scene_status';
import Leader from '../../models/leader';
import Vault from '../../models/vault';
import QuestStatus from '../../models/quest_status';
import ExpeditionStatus from '../../models/expedition_status';
import Positioner from '../../models/positioner';
import { sceneTexts, sceneActions } from '../../instances/scenes/index';

const SceneSegmentComponent = (props: SceneSegmentProps) => {
  const { id, type } = props;
  switch(type) {
    case 'SceneText':
    const sceneText = sceneTexts[id];
    if (sceneText.subType === 'narration') {
      return <SceneNarrationComponent {...props} sceneText={sceneText} />;
    }
    else {
      // render SceneDialogueComponent
    }
    
    case 'SceneAction':
    const sceneAction = sceneActions[id];
    return <SceneActionComponent {...props} sceneAction={sceneAction} />;

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
  type: 'SceneText'|'SceneAction'|'SceneActed'|'NextButton'|'FinalButton'|'SceneOutcome';
  animate: boolean;
  doneAnimating: (args: { id: string, type: string }) => void;
  handlePress: (args: { id: string, type: string }) => void;

  sceneStatus: SceneStatus;
  leaders: { [id: string] : Leader };
  vault: Vault;
  questStatus: QuestStatus;
  expeditionStatus: ExpeditionStatus;
  pos: Positioner;
}

export default SceneSegmentComponent;