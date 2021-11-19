import Quest from '../models/quest';
import QuestTask from '../models/quest_task';
import Resource from '../models/resource';
import ResourceTag from '../models/resource_tag';
import ResourceSubcategory from '../models/resource_subcategory';
import { GameState } from '../models/game_state';
import { resourceTypes } from '../instances/resource_types';
import { resourceTags } from '../instances/resource_tags';
import { resourceSubcategories } from '../instances/resource_subcategories';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';

const TASK_VALUE = 1000;

export function questGen(gState: GameState) : Quest|null {
  if (!gState.vault) { return null; }
  const gens = [
    { name: 'produce_type', weight: 10,
      prefixes: [`Producing`, `How to Make`, `Creating`] },
    { name: 'produce_tag', weight: 20,
      prefixes: [`Producing`, `How to Make`, `Creating`] },
    { name: 'produce_subcategory', weight: 10,
      prefixes: [`Producing`, `How to Make`, `Creating`] },
    { name: 'analyze_type', weight: 5,
      prefixes: [`Analyzing`, `What's Inside`, `Picking Apart`] },
    { name: 'analyze_tag', weight: 10,
      prefixes: [`Analyzing`, `What's Inside`, `Picking Apart`] },
    { name: 'analyze_subcategory', weight: 5,
      prefixes: [`Analyzing`, `What's Inside`, `Picking Apart`] },
    // { name: 'cook', weight: 25 },
    // { name: 'trade', weight: 10 },
    // { name: 'mark', weight: 20 },
    // { name: 'mark_tier', weight: 10 }
  ];
  const gen = utils.randomWeightedSelect(gens);
  console.log('gen.name');
  console.log(gen.name);
  let resources: Resource[] = [];
  let name: string = '';
  let kindName: string = '';
  let description: string = '';
  let finishText: string = '';
  let totalValue: number = 0;

  let forbidden: { tags: string[], categories: string[] } =
    { tags: [RESOURCE_TAGS.MIND], categories: [RESOURCE_CATEGORIES.SPECIAL] };
  if (gen.name.includes('produce')) { forbidden.tags.push(RESOURCE_TAGS.TRADE_GOOD); }

  if (gen.name.includes('type')) {
    let options = Object.keys(gState.vault.resources).map((typeQuality) => {
      if (gState.vault) {
        const resourceType = resourceTypes[typeQuality.split('|')[0]];
        if (!utils.isForbidden(resourceType, forbidden.tags, [],
          forbidden.categories)) {
          return gState.vault.resources[typeQuality];
        }
      }
      return new Resource(null);
    });
    options = options.filter((resource) => {
      if (resource.type.length > 0) { return resource; }
    });
    resources = [options[Math.floor(utils.random() * options.length)]];
    kindName = resources[0].type;
    name = `${utils.randomSelect(gen.prefixes)} ${resources[0].type}`;
  }

  if (gen.name.includes('tag')) {
    const tagCount = gState.vault.getAllTagsCount
      (forbidden.tags, [], forbidden.categories);
    const tags = Object.keys(tagCount).map((name) => {
      return { name, weight: tagCount[name] };
    });
    kindName = utils.randomWeightedSelect(tags).name;
    name = `${utils.randomSelect(gen.prefixes)} ${resourceTags[kindName].plural}`;
    resources = gState.vault.getTagResources(kindName, forbidden.tags, [],
      forbidden.categories);
  }

  if (gen.name.includes('subcategory')) {
    const subcategoryCount = gState.vault.getAllSubcategoriesCount
      (forbidden.tags, [], forbidden.categories);
    const subcategories = Object.keys(subcategoryCount).map((name) => {
      return { name, weight: subcategoryCount[name] };
    });
    kindName = utils.randomWeightedSelect(subcategories).name;
    name = `${utils.randomSelect(gen.prefixes)} ${resourceSubcategories[kindName].plural}`;
    resources = gState.vault.getSubcategoryResources(kindName, forbidden.tags,
      [], forbidden.categories);
  }

  if (gen.name.includes('produce') || gen.name.includes('analyze')) {
    resources = utils.arrayGaussianTruncate(resources, 2, 6);
    resources = resources.map((resource) => {
      const resourceType = resourceTypes[resource.type];
      const quantity = Math.ceil((TASK_VALUE *
        (1 + (0.2 * resources.length))) / resourceType.value);
      totalValue += (quantity * resourceType.value);
      return new Resource({ ...resource, quantity });
    });
    resources = resources.sort((a, b) => {
      if (a.quantity > b.quantity) { return -1; }
      return 1;
    });
    console.log('kindName');
    console.log(kindName);
    console.log('resources');
    console.log(resources);
    const questId = utils.randHex(8);
    let tasks: QuestTask[] = [];
    if (gen.name.includes('produce')) {
      description = `The Firefly wants to watch while your town makes "${kindName}-sorts-of-things".`;
      finishText = `The Firefly watched closely while your town produced ${utils.addCommaAnd(resources.map((resource) => (utils.getResourceName(resource))))}. Its body language isn't easy to read, but from the way it bobs from side to side you think it's satisfied.`;
      tasks = resources.map((resource, index) => {
        const resourceType = resourceTypes[resource.type];
        return new QuestTask({ index, parentId: questId, icon: resourceType.icon,
          label: `Produce ${resource.quantity} ${resource.type}`,
          resourceToProduce: {
            specType: `${RESOURCE_SPECIFICITY.EXACT}|${resource.type}`,
            quantity: resource.quantity
          } });
      });
    }
    if (gen.name.includes('analyze')) {
      description = `The Firefly has asked to learn from you as you analyze "${kindName}-like stuff".`;
      finishText = `The Firefly wiggled with excitement while you broke down and inspected ${utils.addCommaAnd(resources.map((resource) => (utils.getResourceName(resource))))}.`;
      tasks = resources.map((resource, index) => {
        const resourceType = resourceTypes[resource.type];
        return new QuestTask({ index, parentId: questId, icon: resourceType.icon,
          label: `Analyze ${resource.quantity} ${resource.type}`,
          resourceToAnalyze: {
            specificity: RESOURCE_SPECIFICITY.EXACT,
            type: resource.type,
            quantity: resource.quantity
          } });
      });
    }
    return new Quest({
      id: questId,
      name: name,
      givenBy: 'Firefly',
      icon: resourceTypes[resources[0].type].icon,
      description: description,
      finishText: finishText,
      tasks: tasks,
      isDaily: true,
      gainResources: [genReward(gState, totalValue)]
    });
  }
  return null;
}

function genReward(gState: GameState, value: number):
  {specificity: string, type: string, value: number} {
  let options: { type: string, weight: number }[] = [];
  if (gState.vault) {
    let resources = gState.vault.getTagResources(RESOURCE_TAGS.TRADE_GOOD);
    resources.filter((resource) => {
      const resourceType = resourceTypes[resource.type];
      if (resourceType.value <= value) { return resource; }
    });
    options = resources.map((resource) => {
      return { type: resource.type, weight: 1 };
    });
    options.push({
      type: RESOURCE_TYPES.KNOWLEDGE,
      weight: Math.floor(resources.length / 4)
    });
  }
  const rewardTypeName = utils.randomWeightedSelect(options).type;
  const resourceType = resourceTypes[rewardTypeName];
  return { specificity: RESOURCE_SPECIFICITY.EXACT, type: rewardTypeName, value };
}
