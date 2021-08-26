import ResourceType from './resource_type';
import Resource from './resource';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_TAGS } from '../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
const RCA = RESOURCE_CATEGORIES;

import { DEFAULT_DISH_COST, DEFAULT_SPICE_COST } from '../constants';

export default function getDishFromIngredients(ingredients: ResourceType[],
  resourceTypes: { [typeName: string] : ResourceType }) {
  const dishTypes: DishType[] = [
    new DishType({name: 'Mistake', valueChange: -90, contains: [

    ]}),
    new DishType({name: 'Soup', valueChange: 10, contains: [
      { specificity: RSP.TAG, type: RTA.INGREDIENT, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.WATER, quantity: DEFAULT_DISH_COST }
    ]}),
    new DishType({name: 'Bread', valueChange: 30, contains: [
      { specificity: RSP.EXACT, type: RTY.FLOUR, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.WATER, quantity: DEFAULT_DISH_COST }
    ]}),
    new DishType({name: 'Pie', valueChange: 60, contains: [
      { specificity: RSP.TAG, type: RTA.INGREDIENT, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.FLOUR, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.WATER, quantity: DEFAULT_DISH_COST }
    ]}),
    new DishType({name: 'Omelet', valueChange: 60, contains: [
      { specificity: RSP.TAG, type: RTA.INGREDIENT, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.EGG, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.WATER, quantity: DEFAULT_DISH_COST }
    ]}),
    new DishType({name: 'Stew', valueChange: 80, contains: [
      { specificity: RSP.TAG, type: RTA.INGREDIENT, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.MILK, quantity: DEFAULT_DISH_COST }
    ]}),
    new DishType({name: 'Cake', valueChange: 120, contains: [
      { specificity: RSP.TAG, type: RTA.INGREDIENT, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.FLOUR, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.MILK, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.EGG, quantity: DEFAULT_DISH_COST }
    ]})
  ];

  // Sort the ingredients so the most valuable are first (this matters for spice
  // diminishing returns)
  ingredients = ingredients.sort((a, b) => {
    if (a.value > b.value) { return -1; }
    return 1;
  });

  // Adjective Tier Map: For determining the tier of the current adjective: lower tiers
  // are overwritten by higher tiers
  const atm : { [adjective: string] : number } = { 'Plain' : 0, 'Tasty' : 1,
    'Savory' : 2, 'Sweet' : 2, 'Bitter' : 2, 'Tart' : 2, 'Salted' : 2, 'Spicy' : 2,
    'Mint' : 2, 'Herbed' : 2, 'Spiced' : 3 };
  let adjective = 'Plain';
  // Main Tier Map: For determining the tier of the current main ingredient: lower tiers
  // are overwritten by higher tiers
  const mtm : { [name : string] : number } = { [RTY.FLOUR] : 1, [RTY.LENTIL] : 3,
    [RTY.SEEDS] : 3, [RTY.QUAIL] : 4 };
  let main = '';
  let mainColors: { foreground: string, background: string }|null = null;
  const tagBlacklist: string[] = [RTA.INGREDIENT, RTA.SPICE, RTA.DRINK, RTA.TRADE_GOOD];
  let tags: string[] = [RTA.FOOD];

  let dishTypeIndex = 0;
  dishTypes.map((dishType, index) => {
    if (dishType.matches(ingredients)) {
      dishTypeIndex = index;
    }
  });
  const dishType = dishTypes[dishTypeIndex];

  let dishValue = 0;
  let consumes: { specificity: string, type: string, quantity: number }[] = [];
  ingredients.map((ingredient) => {
    let containMatch: boolean = false;
    let quantity: number = DEFAULT_DISH_COST;
    dishType.contains.map((contain) => {
      switch(contain.specificity) {
        case RSP.TAG:
        if (utils.arrayIncludes(ingredient.tags, contain.type) && !containMatch) {
          containMatch = true;
          quantity = contain.quantity;
        }
        break;

        case RSP.EXACT:
        if (ingredient.name == contain.type && !containMatch) {
          containMatch = true;
          quantity = contain.quantity;
        }
        break;
      }
    });
    if (!containMatch && utils.arrayIncludes(ingredient.tags, RTA.SPICE)) {
      quantity = DEFAULT_SPICE_COST;
    }
    consumes.push({ specificity: RSP.EXACT, type: ingredient.name,
      quantity: quantity });

    if (utils.arrayIncludes(ingredient.tags, RTA.SPICE)) {
      if (ingredient.name == RTY.OLIVE_OIL) {
        dishValue += ingredient.value;
        if (atm[adjective] < atm['Tasty']) { adjective = 'Tasty'; }
      }
      else {
        const ingAdjective = getSpiceAdjective(ingredient);
        // Spice-specific adjective replacing "Plain" or "Tasty"
        if (atm[adjective] < atm[ingAdjective]) {
          dishValue += ingredient.value;
          adjective = ingAdjective;
        }
        // Two spice-specific adjectives, combined into "Spiced" and add only
        // half the value of the new spice
        else if (atm[adjective] == atm[ingAdjective]) {
          dishValue += (ingredient.value * 0.5);
          adjective = 'Spiced';
        }
        // Two or more spices already used, keep "Spiced" adjective and add only one
        // quarter the value of the new spice
        else if (atm[adjective] > atm[ingAdjective]) {
          dishValue += (ingredient.value * 0.5);
        }
      }
    }
    else {
      dishValue += ingredient.value;
    }

    if (mtm[ingredient.name] > mtm[main] ||
      (mtm[main] == undefined && mtm[ingredient.name] != undefined)) {
      main = ingredient.name;
      mainColors = { foreground: ingredient.foregroundColor,
        background: ingredient.backgroundColor };
    }

    ingredient.tags.map((tag) => {
      if (!utils.arrayIncludes(tags, tag) && !utils.arrayIncludes(tagBlacklist, tag)) {
        tags.push(tag);
      }
    });
  });
  dishValue *= ((dishType.valueChange + 100) / 100);

  let name = dishType.name;
  if (dishType.name != 'Mistake') {
    if (main.length > 0) { name = (getMainName(main) + ' ' + name); }
    name = (adjective + ' ' + name);
  }
  const id = utils.randHex(8);
  const drt = resourceTypes[dishType.name];

  const dishResource = new Resource({
    type: (dishType.name + '-' + id),
    quality: 0,
    quantity: 0,
    id: id,
    name: name,
    category: RCA.DISH,
    tags: tags,
    value: dishValue,
    icon: drt.icon,
    // @ts-ignore
    foregroundColor: (mainColors ? mainColors.foreground : drt.foregroundColor),
    // @ts-ignore
    backgroundColor: (mainColors ? mainColors.background : drt.backgroundColor)
  });

  const dishRecipe = { index: 0,
    produces: [{ specificity: RSP.EXACT,  type: (dishType.name + '-' + id),
      quantity: DEFAULT_DISH_COST, probability: 1 }],
    consumes: consumes };

  return { resource: dishResource, recipe: dishRecipe };

  function getSpiceAdjective(ingredient: ResourceType) {
    const spiceTagNames = ['Savory', 'Sweet', 'Bitter', 'Sour', 'Brackish',
      'Spicy', 'Cooling', 'Herbal'];
    const spiceAdjectiveMap: { [tagName : string] : string } = {
      [RTA.SAVORY] : 'Savory', [RTA.SWEET] : 'Sweet', [RTA.BITTER] : 'Bitter',
      [RTA.SOUR] : 'Tart', [RTA.BRACKISH] : 'Salted', [RTA.SPICY] : 'Spicy',
      [RTA.COOLING] : 'Mint', [RTA.HERBAL] : 'Herbed' };
    let matchingAdjective = 'Plain';
    ingredient.tags.map((tag) => {
      if (utils.arrayIncludes(spiceTagNames, tag)) {
        matchingAdjective = spiceAdjectiveMap[tag];
      }
    });
    return matchingAdjective;
  }

  function getMainName(typeName: string) {
    const mainNameMap: { [typeName : string] : string } = { [RTY.LENTIL] : 'Lentil',
      [RTY.SEEDS] : 'Seed', [RTY.QUAIL] : 'Quail' };
    return (mainNameMap[typeName] ? mainNameMap[typeName] : typeName);
  }
}

class DishType implements DishTypeInterface {
  name: string = '';
  valueChange: number = 0;
  contains: { specificity: string, type: string, quantity: number }[] = [];

  constructor(dishType: DishTypeInterface) {
    Object.assign(this, dishType);
  }

  matches(ingredients: ResourceType[]) {
    let allMatch: boolean = true;
    this.contains.map((contain) => {
      let thisMatch = false;
      ingredients.map((ingredient) => {
        switch(contain.specificity) {
          case RSP.TAG:
          if (utils.arrayIncludes(ingredient.tags, contain.type)) { thisMatch = true; }
          break;

          case RSP.EXACT:
          if (ingredient.name == contain.type) { thisMatch = true; }
          break;
        }
      });
      if (!thisMatch) { allMatch = false; }
    });
    return allMatch;
  }
}

interface DishTypeInterface {
  name: string;
  valueChange: number;
  contains: { specificity: string, type: string, quantity: number }[];
}
