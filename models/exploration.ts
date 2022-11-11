import Memo from './memo';
import Icon from './icon';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { EXPLORATION_CHALLENGES } from '../enums/exploration_challenges';

export default class Exploration {
  id: string = '';
  name: string = '';
  size: [number, number] = [0, 0];
  challenges: { type: EXPLORATION_CHALLENGES, difficulty: number, frequency?: number }[] = [];
  treasuresPrimary: { specificity: RESOURCE_SPECIFICITY, type: string, weight?: number }[] = [];
  treasuresSecondary: { specificity: RESOURCE_SPECIFICITY, type: string, weight?: number }[] = [];
  treasureValue: number = 0;
  getTreasureCount: () => number = () => 0;
  description: string = '';
  icon: Icon = new Icon({provider: '', name: ''});
  memoSuccessPrimary?: Memo;
  memoSuccessSecondary?: Memo;

  constructor(exploration: Exploration) {
    Object.assign(this, exploration);
  }
}