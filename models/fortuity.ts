import Memo from './memo';
import { FortuityState } from './fortuity_state';

export default class Fortuity implements FortuityInterface {
  name: string = '';
  openLine: string = '';
  memos: Memo[] = [];
  type: string = '';
  repeatable: boolean = false;
  weight: number = 100;
  leaderJoins?: string;

  constructor(fortuity: FortuityInterface) {
    Object.assign(this, fortuity);
  }

  available(fState: FortuityState) {
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
  leaderJoins?: string;

  available(fState: FortuityState): boolean;
}
