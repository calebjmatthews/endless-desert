import Memo from './memo';
import { GameState } from './game_state';

export default class Fortuity implements FortuityInterface {
  name: string = '';
  openLine: string = '';
  memos: Memo[] = [];
  type: string = '';
  repeatable: boolean = false;
  weight: number = 100;
  gainResources?: {specificity: string, type: string, value: number}[];
  leaderJoins?: string;

  constructor(fortuity: FortuityInterface) {
    Object.assign(this, fortuity);
  }

  available(fState: GameState) {
    console.log('Fortuity available function not properly set');
    return false;
  }
}

interface FortuityInterface {
  name: string;
  openLine: string;
  memos: Memo[];
  type: string;
  repeatable: boolean;
  weight: number;
  gainResources?: {specificity: string, type: string, value: number}[];
  leaderJoins?: string;

  available(fState: GameState): boolean;
}
