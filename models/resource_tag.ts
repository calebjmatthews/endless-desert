export default class ResourceTag {
  name: string = '';
  icon: {provider: string, name: string} = {provider: '', name: ''};
  foregroundColor: string = '#000';
  backgroundColor: string = '#fff';

  constructor(resourceTag: ResourceTag) {
    Object.assign(this, resourceTag);
  }
}
