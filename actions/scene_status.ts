import Resource from "../models/resource";

export const SET_SCENE = "SET_SCENE";
export const setScene = (sceneId: string) => ({
  type: SET_SCENE,
  sceneId
});

export const CHOOSE_SCENE_STEP = "CHOOSE_SCENE_STEP";
export const chooseStep = (stepId: string) => ({
  type: CHOOSE_SCENE_STEP,
  stepId
});

export const PAY_SCENE_COST = "PAY_SCENE_COST";
export const paySceneCost = (args: {sceneActionId: string, costIndex: number, resource: Resource}) => ({
  type: PAY_SCENE_COST,
  sceneActionId: args.sceneActionId,
  costIndex: args.costIndex,
  resource: args.resource
});