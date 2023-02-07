import Resource from "../models/resource";

export const SET_SCENE = "SET_SCENE";
export const setScene = (sceneId: string) => ({
  type: SET_SCENE,
  sceneId
});

export const ADD_SCENE_STEP = "ADD_SCENE_STEP";
export const addSceneStep = (stepId: string) => ({
  type: ADD_SCENE_STEP,
  stepId
});

export const PAY_SCENE_COST = "PAY_SCENE_COST";
export const paySceneCost = (args: {sceneActionId: string, costIndex: number, resource: Resource}) => ({
  type: PAY_SCENE_COST,
  sceneActionId: args.sceneActionId,
  costIndex: args.costIndex,
  resource: args.resource
});

// Todo: Add END_SCENE