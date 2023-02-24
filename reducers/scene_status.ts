import { SET_SCENE, ADD_SCENE_STEP, PAY_SCENE_COST, GAIN_SCENE_RESOURCES }
  from '../actions/scene_status';
import SceneStatus from '../models/scene_status';

export default function (sceneStatus: SceneStatus = new SceneStatus(null),
  action: any = null) {
	switch(action.type) {
    case SET_SCENE:
    return new SceneStatus({
      sceneId: action.sceneId,
      steps: [],
      costsPaid: {},
      resourcesGained: {},
      expeditionId: action.expeditionId
    });

    case ADD_SCENE_STEP:
    return new SceneStatus({
      ...sceneStatus,
      steps: [...sceneStatus.steps, action.step]
    });

    case PAY_SCENE_COST:
    const pscCostsPaid = { ...sceneStatus.costsPaid };
    if (!pscCostsPaid[action.sceneActionId]) { pscCostsPaid[action.sceneActionId] = []; }
    pscCostsPaid[action.sceneActionId][action.costIndex] = action.resource;
    return new SceneStatus({
      ...sceneStatus,
      costsPaid: pscCostsPaid
    });

    case GAIN_SCENE_RESOURCES:
    return new SceneStatus({
      ...sceneStatus,
      resourcesGained: {
        ...sceneStatus.resourcesGained,
        [action.sceneActionId]: action.resources
      }
    });

		default:
		return sceneStatus;
	}
};
