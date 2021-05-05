import Icon from './icon';

export default class ResourceType {
  name: string = '';
  category: string = '';
  subcategory?: string|null = null;
  tags: string[] = [];
  value: number = 0;
  icon: Icon = new Icon({provider: '', name: ''});
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';

  constructor(resourceType: ResourceTypeInterface) {
    if (!resourceType.foregroundColor) { resourceType.foregroundColor = '#000'; }
    if (!resourceType.backgroundColor) { resourceType.backgroundColor = '#fff'; }
    Object.assign(this, resourceType);
  }
}

interface ResourceTypeInterface {
  name: string;
  category: string;
  subcategory?: string|null;
  tags: string[];
  value: number;
  icon: Icon;
  foregroundColor?: string;
  backgroundColor?: string;
}
