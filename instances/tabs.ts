import Tab from '../models/tab';
import { TABS } from '../enums/tabs';

let tabs: { [name: string] : Tab } = {};

tabs[TABS.RESOURCES] = new Tab({
  name: TABS.RESOURCES,
  order: 0,
  icon: {provider: "FontAwesome", name: "cube"},
  settings: []
});

tabs[TABS.BUILDINGS] = new Tab({
  name: TABS.BUILDINGS,
  order: 1,
  icon: {provider: "FontAwesome5", name: "building"},
  settings: []
});

tabs[TABS.RESEARCH] = new Tab({
  name: TABS.RESEARCH,
  order: 2,
  icon: {provider: "FontAwesome", name: "book"},
  settings: [{
    name: 'showCompletedResearches',
    displayName: 'Toggle completed researches',
    type: 'toggle',
    icon: {provider: 'MaterialIcons', name: 'book'} }
  ]
});

tabs[TABS.TRADING] = new Tab({
  name: TABS.TRADING,
  order: 3,
  icon: {provider: "Entypo", name: "address"},
  settings: []
});

let tabsArray: Tab[] = Object.keys(tabs).map((tabName) => {
  return tabs[tabName];
});
tabsArray.sort((a, b) => {
  if (a.order < b.order) { return -1; }
  return 1;
});

export { tabs, tabsArray };
