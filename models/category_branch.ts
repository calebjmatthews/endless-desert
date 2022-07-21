import Resource from './resource';
import Equipment from './equipment';
import Icon from './icon';

export interface CategoryBranch {
  name: string;
  value: number|null;
  order: number;
  icon: Icon;
  resources?: Resource[];
  equipment?: Equipment[];
}
