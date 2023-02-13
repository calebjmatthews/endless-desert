import React from 'react';
import SceneNarrationComponent from './narration';
import SceneActionComponent from './action';
import SceneActedComponent from './acted';
import NextButtonComponent from './next_button';
import SceneOutcomeComponent from './outcome';

import SceneStatus from '../../models/scene_status';
import Leader from '../../models/leader';
import Vault from '../../models/vault';
import QuestStatus from '../../models/quest_status';
import ExpeditionStatus from '../../models/expedition_status';
import Positioner from '../../models/positioner';
import { sceneTexts, sceneActions } from '../../instances/scenes/index';
import { SceneAction } from '../../models/scene';
import { utils } from '../../utils';

const SceneSegmentComponent = (props: SceneSegmentProps) => {
  const { id, type, pos } = props;
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
    const sceneActed = sceneActions[id]
      || new SceneAction({ id: utils.randHex(8), subType: 'action', label: '...' });
    return <SceneActedComponent sceneAction={sceneActed} pos={pos} />

    case 'NextButton':
    case 'WaitButton':
    case 'FinalButton':
    return <NextButtonComponent {...props} />;

    case 'SceneOutcome':
    const sceneOutcome = sceneTexts[id].outcome;
    console.log(`sceneOutcome`, sceneOutcome);
    if (sceneOutcome) {
      return <SceneOutcomeComponent {...props} sceneOutcome={sceneOutcome} />;
    }

    default:
    return null;
  }
}

export interface SceneSegmentProps {
  id: string;
  type: 'SceneText'|'SceneAction'|'SceneActed'|'NextButton'|'WaitButton'|'FinalButton'|'SceneOutcome';
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