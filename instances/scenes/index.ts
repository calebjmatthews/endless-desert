import { Scene, SceneText } from '../../models/scene';
import { nnScenes, nnSceneTexts } from './near_north';

const scenes: { [id: string] : Scene } = { ...nnScenes };
const sceneTexts: { [id: string] : SceneText } = { ...nnSceneTexts };

