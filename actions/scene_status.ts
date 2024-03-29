import Resource from "../models/resource";

export const SET_SCENE = "SET_SCENE";
export const setScene = (args: {sceneId: string, expeditionId?: string}) => ({
  type: SET_SCENE,
  sceneId: args.sceneId,
  expeditionId: args.expeditionId
});

export const ADD_SCENE_STEP = "ADD_SCENE_STEP";
export const addSceneStep = (step: { id: string, type: string }) => ({
  type: ADD_SCENE_STEP,
  step
});

export const PAY_SCENE_COST = "PAY_SCENE_COST";
export const paySceneCost = (args: {sceneActionId: string, costIndex: number, resource: Resource}) => ({
  type: PAY_SCENE_COST,
  sceneActionId: args.sceneActionId,
  costIndex: args.costIndex,
  resource: args.resource
});

export const GAIN_SCENE_RESOURCES = "GAIN_SCENE_RESOURCES";
export const gainSceneResources = (args: {sceneActionId: string, resources: Resource[]}) => ({
  type: GAIN_SCENE_RESOURCES,
  sceneActionId: args.sceneActionId,
  resources: args.resources
})

// Todo: Add END_SCENE