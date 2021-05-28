import Resource from './resource';
import Icon from './icon';

export interface CategoryBranch {
  name: string;
  value: number|null;
  order: number;
  icon: Icon;
  resources: Resource[];
}
