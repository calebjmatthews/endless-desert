import Icon from './icon';
import RichText from './rich_text';
import Expedition from './expedition';
import { GameState } from './game_state';

export class Scene {
  id: string = '';
  name: string = '';
  next?: string[];

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
  invisible?: boolean;
  next?: string[];

  constructor(sceneAction: SceneActionInterface) {
    Object.assign(this, sceneAction);
  }

  available(args: { expedition?: Expedition, gState?: GameState }) {
    return true;
  }

  getCost(difficulty: number = 1): {specificity: string, kind: string, value: number}[] {
    return [];
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
  next?: string[];

  available?: (args: { expedition?: Expedition, gState?: GameState }) => boolean;
  getCost?: (difficulty: number) => {specificity: string, kind: string, value: number}[];
}

export class SceneOutcome {
  gainResources?: {specificity: string, kind: string, value: number|[number, number]}[];
  affectLeader?: {quality: string, change?: number, percentage?: number}[];
  changeLocation?: {towardsDestination?: boolean, distance?: number, percentage?: number};
  leaderJoins?: string;
  questsBegin?: string[];
  completeResearch?: string[];

  constructor(sceneOutcome: SceneOutcome) {
    Object.assign(this, sceneOutcome);
  }
}

export class SceneText {
  id: string = '';
  subType: 'speech'|'narration' = 'speech';
  speakerId?: string;
  text: RichText = new RichText({ type: 'Text' });
  next?: string[];
  outcome?: SceneOutcome;

  constructor(sceneText: SceneText) {
    Object.assign(this, sceneText);
  }
}