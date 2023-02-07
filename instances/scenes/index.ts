import { Scene, SceneText, SceneAction } from '../../models/scene';
import { nnScenes, nnSceneTexts, nnSceneActions } from './near_north';

const scenes: { [id: string] : Scene } = { ...nnScenes };
const sceneTexts: { [id: string] : SceneText } = { ...nnSceneTexts };
const sceneActions: { [id: string] : SceneAction } = { ...nnSceneActions };

export { scenes, sceneTexts, sceneActions };