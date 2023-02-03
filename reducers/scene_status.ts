import { SET_SCENE, CHOOSE_SCENE_STEP, PAY_SCENE_COST } from '../actions/scene_status';
import SceneStatus from '../models/scene_status';

export default function (sceneStatus: SceneStatus = new SceneStatus(null),
  action: any = null) {
	switch(action.type) {
    case SET_SCENE:
    return new SceneStatus({
      sceneId: action.sceneId,
      steps: [],
      costsPaid: {}
    });

    case CHOOSE_SCENE_STEP:
    return new SceneStatus({
      ...sceneStatus,
      steps: [...sceneStatus.steps, action.stepId]
    });

    case PAY_SCENE_COST:
    const pscCostsPaid = { ...sceneStatus.costsPaid };
    pscCostsPaid[action.sceneActionId][action.costIndex] = action.resource;
    return new SceneStatus({
      ...sceneStatus,
      costsPaid: pscCostsPaid
    })

		default:
		return sceneStatus;
	}
};
