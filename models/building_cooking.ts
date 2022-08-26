import ResourceType from './resource_type';
import Resource from './resource';
import Icon from './icon';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_TAGS } from '../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
const RSC = RESOURCE_SUBCATEGORIES;
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
const RCA = RESOURCE_CATEGORIES;

import { DEFAULT_DISH_COST, DEFAULT_SPICE_COST } from '../constants';

export default function getDishFromIngredients(ingredients: ResourceType[],
  resourceTypes: { [typeName: string] : ResourceType }, multiplier: number) {
  const dishTypes: DishType[] = [
    new DishType({name: RTY.MISTAKE, valueChange: -90, tags: [ RTA.FOOD ],
      contains: [ ]}),
    new DishType({name: RTY.SOUP, valueChange: 10, tags: [ RTA.FOOD ], contains: [
      { specificity: RSP.EXACT, type: RTY.WATER, quantity: DEFAULT_SPICE_COST },
      { specificity: RSP.TAG, type: RTA.INGREDIENT, quantity: DEFAULT_DISH_COST },
    ]}),
    new DishType({name: RTY.TEA_CELADON, valueChange: 15, tags: [ RTA.DRINK ],
      contains: [
      { specificity: RSP.EXACT, type: RTY.TEA_LEAVES_CELADON, quantity: DEFAULT_SPICE_COST },
      { specificity: RSP.EXACT, type: RTY.WATER, quantity: DEFAULT_DISH_COST }
    ]}),
    new DishType({name: RTY.TEA_VIRIDIAN, valueChange: 15, tags: [ RTA.DRINK ],
      contains: [
      { specificity: RSP.EXACT, type: RTY.TEA_LEAVES_VIRIDIAN, quantity: DEFAULT_SPICE_COST },
      { specificity: RSP.EXACT, type: RTY.WATER, quantity: DEFAULT_DISH_COST }
    ]}),
    new DishType({name: RTY.TEA_JASMINE, valueChange: 15, tags: [ RTA.DRINK ],
      contains: [
      { specificity: RSP.EXACT, type: RTY.TEA_JASMINE, quantity: DEFAULT_SPICE_COST },
      { specificity: RSP.EXACT, type: RTY.WATER, quantity: DEFAULT_DISH_COST }
    ]}),
    new DishType({name: RTY.CHILLED_WATER, valueChange: 10, tags: [ RTA.DRINK ],
      contains: [
      { specificity: RSP.EXACT, type: RTY.ICE,
        quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.WATER, quantity: DEFAULT_DISH_COST }
    ]}),
    new DishType({name: RTY.JUICE_BLUEBERRY, valueChange: 20, tags: [ RTA.DRINK ],
      contains: [
      { specificity: RSP.EXACT, type: RTY.BLUEBERRY, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.WATER, quantity: DEFAULT_SPICE_COST }
    ]}),
    new DishType({name: RTY.JUICE_TOMATO, valueChange: 20, tags: [ RTA.DRINK ],
      contains: [
      { specificity: RSP.EXACT, type: RTY.TOMATO, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.WATER, quantity: DEFAULT_SPICE_COST }
    ]}),
    new DishType({name: RTY.BREAD, valueChange: 10, tags: [ RTA.FOOD ], contains: [
      { specificity: RSP.EXACT, type: RTY.FLOUR, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.WATER, quantity: DEFAULT_SPICE_COST }
    ]}),
    new DishType({name: RTY.WAYBREAD, valueChange: 15, tags: [ RTA.FOOD, RTA.PROVISION ], contains: [
      { specificity: RSP.EXACT, type: RTY.FLOUR, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.SALT, quantity: DEFAULT_SPICE_COST },
      { specificity: RSP.EXACT, type: RTY.WATER, quantity: DEFAULT_SPICE_COST }
    ]}),
    new DishType({name: RTY.DRIED_FRUIT, valueChange: 20, tags: [ RTA.FOOD, RTA.PROVISION ],
      contains: [
      { specificity: RSP.TAG, type: RTA.FRUIT, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.SALT, quantity: DEFAULT_SPICE_COST }
    ]}),
    new DishType({name: RTY.SALTFISH, valueChange: 20, tags: [ RTA.FOOD, RTA.PROVISION ],
      contains: [
      { specificity: RSP.SUBCATEGORY, type: RSC.FISH, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.SALT, quantity: DEFAULT_SPICE_COST }
    ]}),
    new DishType({name: RTY.SALTED_MEAT, valueChange: 30, tags: [ RTA.FOOD, RTA.PROVISION ],
      contains: [
      { specificity: RSP.EXACT, type: RTY.QUAIL_MEAT, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.SALT, quantity: DEFAULT_SPICE_COST }
    ]}),
    new DishType({name: RTY.SALTED_MEAT, valueChange: 30, tags: [ RTA.FOOD, RTA.PROVISION ],
      contains: [
      { specificity: RSP.EXACT, type: RTY.AUROCH_MEAT, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.EXACT, type: RTY.SALT, quantity: DEFAULT_SPICE_COST }
    ]}),
    new DishType({name: RTY.OMELET, valueChange: 20, tags: [ RTA.FOOD ], contains: [
      { specificity: RSP.EXACT, type: RTY.EGG, quantity: DEFAULT_DISH_COST },
      { specificity: RSP.TAG, type: RTA.INGREDIENT, quantity: DEFAULT_DISH_COST }
    ]}),
    new DishType({name: RTY.STEW, valueChange: 40, tags: [ RTA.FOOD ], contains: [
      { specificity: RSP.EXACT, type: RTY.MILK, quantity: DEFAULT_SPICE_COST },
      { specificity: RSP.TAG, type: RTA.INGREDIENT, quantity: DEFAULT_DISH_COST },
    ]}),
    new DishType({name: RTY.PIE, valueChange: 30, tags: [ RTA.FOOD ], contains: [
      { specificity: RSP.EXACT, type: RTY.FLOUR, quantity: DEFAULT_SPICE_COST },
      { specificity: RSP.EXACT, type: RTY.OLIVE_OIL, quantity: DEFAULT_SPICE_COST },
      { specificity: RSP.EXACT, type: RTY.WATER, quantity: DEFAULT_SPICE_COST },
      { specificity: RSP.TAG, type: RTA.INGREDIENT, quantity: DEFAULT_DISH_COST }
    ]}),
    new DishType({name: RTY.CAKE, valueChange: 50, tags: [ RTA.FOOD ], contains: [
      { specificity: RSP.EXACT, type: RTY.FLOUR, quantity: DEFAULT_SPICE_COST },
      { specificity: RSP.EXACT, type: RTY.MILK, quantity: DEFAULT_SPICE_COST },
      { specificity: RSP.EXACT, type: RTY.EGG, quantity: DEFAULT_SPICE_COST },
      { specificity: RSP.TAG, type: RTA.INGREDIENT, quantity: DEFAULT_DISH_COST }
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
    'Savory' : 2, 'Sweet' : 2, 'Bitter' : 2, 'Tart' : 2, 'Seasoned' : 2, 'Spicy' : 2,
    'Mint' : 2, 'Herbed' : 2, 'Spiced' : 3 };
  let adjective = 'Plain';
  // Main Tier Map: For determining the tier of the current main ingredient:
  // lower tiers are overwritten by higher tiers
  const mtm : { [name : string] : number } = { [RTY.LENTIL] : 1, [RTY.GRAPE] : 2,
    [RTY.BLUEBERRY] : 3, [RTY.SQUASH] : 2, [RTY.TOMATO] : 3, [RTY.KUMQUAT] : 2,
    [RTY.LEMON] : 3, [RTY.SPINACH]: 2, [RTY.RADISH] : 3, [RTY.ONION] : 2,
    [RTY.CHILLI_PEPPER] : 3, [RTY.POTATO] : 2, [RTY.LOTUS_ROOT] : 3, [RTY.DATE] : 2,
    [RTY.FIG] : 3,[RSC.SEEDS] : 2, [RTY.QUAIL_MEAT] : 4, [RTY.AUROCH_MEAT] : 5,
    [RTY.MUSSEL]: 3, [RTY.MINNOW]: 4, [RTY.CARP] : 4, [RTY.BARRAMUNDI] : 4 };
  let main = '';
  let mainColors: { color: string, shadow: string }|null = null;
  const tagBlacklist: string[] = [RTA.INGREDIENT, RTA.SPICE, RTA.DRINK, RTA.TRADE_GOOD,
    RTA.POWDER, RTA.PRESSED];

  let dishTypeIndex = 0;
  dishTypes.map((dishType, index) => {
    if (dishType.matches(ingredients)) {
      dishTypeIndex = index;
    }
  });
  const dishType = dishTypes[dishTypeIndex];

  let tags = dishType.tags.slice();

  let dishValue = dishType.valueChange;
  let consumes: { specificity: string, type: string, quantity: number }[] = [];
  let matched: { [kind: string] : boolean } = {};
  for (let index = 0; index < ingredients.length; index++) {
    const ingredient = ingredients[index];
    let quantity: number = DEFAULT_DISH_COST;
    let anyMatch: boolean = false;
    dishType.contains.forEach((contain) => {
      switch(contain.specificity) {
        case RSP.EXACT:
        if (ingredient.name == contain.type && !matched[contain.type]) {
          matched[contain.type] = true;
          anyMatch = true;
          quantity = contain.quantity;
        }
        break;

        case RSP.SUBCATEGORY:
        if (ingredient.subcategory == contain.type && !matched[contain.type]) {
          matched[contain.type] = true;
          anyMatch = true;
          quantity = contain.quantity;
        }
        break;

        case RSP.TAG:
        if (utils.arrayIncludes(ingredient.tags, contain.type)
          && !matched[contain.type]) {
          matched[contain.type] = true;
          anyMatch = true;
          quantity = contain.quantity;
        }
        break;
      }
    });
    if (!anyMatch && (utils.arrayIncludes(ingredient.tags, RTA.SPICE)
      || ingredient.name == RTY.WATER)) {
      quantity = DEFAULT_SPICE_COST;
    }
    consumes.push({ specificity: RSP.EXACT, type: ingredient.name,
      quantity: (quantity * multiplier) });

    if (utils.arrayIncludes(ingredient.tags, RTA.SPICE)) {
      if (ingredient.name == RTY.OLIVE_OIL) {
        dishValue += (ingredient.value * 0.5);
        if (atm[adjective] < atm['Tasty']) { adjective = 'Tasty'; }
      }
      else if (dishType.contains.filter((contain) =>
        (contain.type === ingredient.name)).length === 0) {
        const ingAdjective = getSpiceAdjective(ingredient);
        // Spice-specific adjective replacing "Plain" or "Tasty"
        if (atm[adjective] < atm[ingAdjective]) {
          dishValue += (ingredient.value * 0.5);
          adjective = ingAdjective;
        }
        // Two spice-specific adjectives, combined into "Spiced" and add only
        // its exact value (7/20)
        else if (atm[adjective] == atm[ingAdjective]) {
          dishValue += (ingredient.value * 0.35);
          adjective = 'Spiced';
        }
        // Two or more spices already used, keep "Spiced" adjective and add only
        // its exact value (7/20)
        else if (atm[adjective] > atm[ingAdjective]) {
          dishValue += (ingredient.value * 0.35);
        }
      }
    }
    else {
      dishValue += ingredient.value;
    }

    if (mtm[ingredient.name] > mtm[main] ||
      (mtm[main] == undefined && mtm[ingredient.name] != undefined)) {
      main = ingredient.name;
      mainColors = { color: ingredient.icon.color,
        shadow: ingredient.icon.shadow };
    }

    ingredient.tags.map((tag) => {
      if (!utils.arrayIncludes(tags, tag) && !utils.arrayIncludes(tagBlacklist, tag)) {
        tags.push(tag);
      }
    });
  }
  dishValue *= ((dishType.valueChange + 100) / 100);

  let name = dishType.name;
  if (dishType.name !== 'Mistake' && !dishType.name.includes('Juice')) {
    if (main.length > 0) { name = (getMainName(main) + ' ' + name); }
    name = (adjective + ' ' + name);
  }
  const id = utils.randHex(8);
  const drt = resourceTypes[dishType.name];

  const dishResource = new Resource({
    type: (dishType.name + '-' + id),
    quality: 0,
    quantity: DEFAULT_DISH_COST,
    id: id,
    name: name,
    category: RCA.DISH,
    subcategory: dishType.name,
    tags: tags,
    value: dishValue,
    icon: new Icon({ ...drt.icon,
      color: (mainColors ? mainColors.color : drt.icon.color),
      shadow: (mainColors ? mainColors.shadow : drt.icon.shadow) })
  });

  const dishRecipe = { index: 0,
    produces: [{ specificity: RSP.EXACT,  type: (dishType.name + '-' + id),
      quantity: (DEFAULT_DISH_COST * multiplier) }],
    consumes: consumes };

  return { resource: dishResource, recipe: dishRecipe };

  function getSpiceAdjective(ingredient: ResourceType) {
    const spiceTagNames = ['Savory', 'Sweet', 'Bitter', 'Sour', 'Brackish',
      'Spicy', 'Cooling', 'Herbal'];
    const spiceAdjectiveMap: { [tagName : string] : string } = {
      [RTA.SAVORY] : 'Savory', [RTA.SWEET] : 'Sweet', [RTA.BITTER] : 'Bitter',
      [RTA.SOUR] : 'Tart', [RTA.BRACKISH] : 'Seasoned', [RTA.SPICY] : 'Spicy',
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
    const mainNameMap: { [typeName : string] : string } = { [RSC.SEEDS] : 'Seed',
      [RTY.QUAIL_MEAT] : 'Quail', [RTY.AUROCH_MEAT] : 'Beef' ,
      [RTY.MUSSEL] : 'Seafood' };
    return (mainNameMap[typeName] ? mainNameMap[typeName] : typeName);
  }
}

class DishType implements DishTypeInterface {
  name: string = '';
  valueChange: number = 0;
  tags: string[] = [];
  contains: { specificity: string, type: string, quantity: number }[] = [];

  constructor(dishType: DishTypeInterface) {
    Object.assign(this, dishType);
  }

  matches(ingredients: ResourceType[]) {
    let allMatch: boolean = true;
    let ingredientsUsed: string[] = [];
    let containsMatched: string[] = [];
    this.contains.map((contain) => {
      let thisMatch = false;
      ingredients.map((ingredient) => {
        switch(contain.specificity) {
          case RSP.TAG:
          if (utils.arrayIncludes(ingredient.tags, contain.type)
            && !utils.arrayIncludes(ingredientsUsed, ingredient.name)
            && !utils.arrayIncludes(containsMatched, contain.type)) {
            thisMatch = true;
            ingredientsUsed.push(ingredient.name);
            containsMatched.push(contain.type);
          }
          break;

          case RSP.SUBCATEGORY:
          if (ingredient.subcategory == contain.type
            && !utils.arrayIncludes(ingredientsUsed, ingredient.name)
            && !utils.arrayIncludes(containsMatched, contain.type)) {
            thisMatch = true;
            ingredientsUsed.push(ingredient.name);
            containsMatched.push(contain.type);
          }
          break;

          case RSP.EXACT:
          if (ingredient.name == contain.type
            && !utils.arrayIncludes(ingredientsUsed, ingredient.name)
            && !utils.arrayIncludes(containsMatched, contain.type)) {
            thisMatch = true;
            ingredientsUsed.push(ingredient.name);
            containsMatched.push(contain.type);
          }
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
  tags: string[];
  contains: { specificity: string, type: string, quantity: number }[];
}
