import { SceneText, SceneAction } from '../models/scene';
import { scenes, sceneTexts, sceneActions } from '../instances/scenes';

// Todo: Check for sceneActions with no .next
// Todo: Check for .nexts with more than one sceneText
// Todo: Check for orphan sceneActions and sceneTexts
const testScenes = () => {
  let sceneCounts: SceneCounts = {
    scenes: 0,
    sceneTexts: 0,
    sceneActions: 0
  }
  const timestamp = new Date(Date.now()).valueOf();
  Object.keys(scenes).forEach((sceneId) => {
    const scene = scenes[sceneId];
    if (!scene) { console.log(`Missing scene, id:${sceneId}`); }
    sceneCounts.scenes++;
    scene.next?.ids.forEach((id) => {
      sceneCounts = testOneSceneObject({ id, type: scene.next?.type || 'SceneText', sceneCounts });
    });
  });
  const duration = new Date(Date.now()).valueOf() - timestamp;
  console.log(`In ${duration}ms tested ${sceneCounts.scenes} scenes, ${sceneCounts.sceneTexts} sceneTexts, and ${sceneCounts.sceneActions} sceneActions.`);
}

const testOneSceneObject = (args: { id: string, type: string,
  sceneCounts: SceneCounts }) => {
  const { id, type, sceneCounts } = args;
  let newSceneCounts = { ...sceneCounts };
  switch(type) {
    case 'SceneText': newSceneCounts.sceneTexts++; break;
    case 'SceneAction': newSceneCounts.sceneActions++; break;
  }
  const sceneObj = getSceneObj({ id, type });
  sceneObj?.next?.ids.forEach((id) => {
    newSceneCounts = testOneSceneObject({
      id,
      type: sceneObj.next?.type || 'SceneText',
      sceneCounts: newSceneCounts
    });
  });
  return newSceneCounts;
}

const getSceneObj = (args: { id: string, type: string }) => {
  const { id, type } = args;
  let sceneObj: SceneText|SceneAction|null = null;
  switch(type) {
    case 'SceneText':
    sceneObj = sceneTexts[id];
    break;

    case 'SceneAction':
    sceneObj = sceneActions[id];
    break;
  }
  if (!sceneObj) { console.log(`Missing ${type}, id: "${id}"`); }

  return sceneObj;
}

interface SceneCounts {
  scenes: number;
  sceneTexts: number;
  sceneActions: number;
}

export default testScenes;