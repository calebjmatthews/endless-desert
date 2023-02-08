import Icon from './icon';
import RichText from './rich_text';
import Expedition from './expedition';
import { GameState } from './game_state';

export class Scene {
  id: string = '';
  name: string = '';
  next?: {ids: string[], type: string};
  
  constructor(scene: Scene) {
    Object.assign(this, scene);
  }
}

export class SceneAction implements SceneActionInterface {
  id: string = '';
  subType: 'action'|'dialogue' = 'action';
  speechType?: 'Calm'|'Aggressive'|'Humorous';
  label: string = '';
  description?: RichText;
  requirementIcon?: Icon;
  requirementLabel?: string;
  invisible?: boolean;
  next?: {ids: string[], type: string};

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
  subType: 'action'|'dialogue';
  speechType?: 'Calm'|'Aggressive'|'Humorous';
  label: string;
  requirementIcon?: Icon;
  requirementLabel?: string;
  next?: {ids: string[], type: string};

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
  subType: 'dialogue'|'narration' = 'dialogue';
  speakerId?: string;
  text: RichText = new RichText({ type: 'Text' });
  next?: {ids: string[], type: string};
  outcome?: SceneOutcome;

  constructor(sceneText: SceneText) {
    Object.assign(this, sceneText);
  }
}