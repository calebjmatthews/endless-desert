import Memo from './memo';
import Icon from './icon';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { EXPLORATION_CHALLENGES } from '../enums/exploration_challenges';

export default class Exploration {
  id: string = '';
  name: string = '';
  size: [number, number][] = [[0, 0]];
  challenges: { type: string, difficulty: number, frequency?: number }[] = [];
  treasuresInitial: { specificity: RESOURCE_SPECIFICITY, type: string, weight?: number, 
    quality?: number }[] = [];
  treasures: { specificity: RESOURCE_SPECIFICITY, type: string, weight?: number, quality?: number }[]
    = [];
  treasureValue: number = 0;
  getTreasureCount: () => number = () => 0;
  description: string = '';
  icon: Icon = new Icon({provider: '', name: ''});
  memoSuccessInitial?: Memo;
  memoSuccess?: Memo;

  constructor(exploration: Exploration) {
    Object.assign(this, exploration);
  }
}