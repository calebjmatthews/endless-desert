export default class Tab {
  name: string = '';
  order: number = 0;
  icon: {provider: string, name: string} = {provider: '', name: ''};
  settings: {name: string, displayName: string, type: string,
    icon: {provider: string, name: string}}[] = [];

  constructor(tab: Tab) {
    Object.assign(this, tab);
  }
}
