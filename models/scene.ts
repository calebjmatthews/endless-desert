import Icon from './icon';
import RichText from './rich_text';
import { GameState } from './game_state';

export class Scene {
  id: string = '';
  name: string = '';
  // Can reference SceneDialogue|SceneNarration|SceneAction[]
  next?: { kind: string, values: string[] };

  constructor(scene: Scene) {
    Object.assign(this, scene);
  }
}

export class SceneAction implements SceneActionInterface {
  id: string = '';
  type: 'action'|'speech' = 'action';
  speechType?: 'Calm'|'Aggressive'|'Humorous';
  label: string = '';
  description?: RichText;
  requirementIcon?: Icon;
  requirementLabel?: string;
  cost?: {specificity: string, type: string, quantity: number}[];

  constructor(sceneAction: SceneActionInterface) {
    Object.assign(this, sceneAction);
  }

  available(fState?: GameState) {
    return true;
  }
}

interface SceneActionInterface {
  id: string;
  type: 'action'|'speech';
  speechType?: 'Calm'|'Aggressive'|'Humorous';
  label: string;
  description?: RichText;
  requirementIcon?: Icon;
  requirementLabel?: string;
  cost?: {specificity: string, type: string, quantity: number}[];
}

export class SceneText {
  id: string = '';
  speakerId: string = '';
  text: RichText = new RichText({ type: 'Text' });
}