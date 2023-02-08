import Resource from './resource';

export default class SceneStatus {
  sceneId: string = '';
  // Corresponds to the IDs of SceneTexts viewed and SceneActions chosen
  steps: string[] = [];
  costsPaid: { [sceneActionId: string]: Resource[] } = {};
  expeditionId?: string;

  constructor(sceneStatus: SceneStatus|null) {
    if (sceneStatus) {
      Object.assign(this, sceneStatus);
    }
  }
}