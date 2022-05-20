import ResourceTag from '../models/resource_tag';
import Icon from '../models/icon';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { EQUIPMENT_SLOTS } from '../enums/equipment_slots';

let resourceTags: { [name: string] : ResourceTag } = {};

resourceTags[RESOURCE_TAGS.FUEL] = new ResourceTag({
  name: RESOURCE_TAGS.FUEL,
  plural: 'Fuels',
  value: 5,
  extract: false,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'fireplace',
    color:'#ff0000'})});

resourceTags[RESOURCE_TAGS.FUEL_POTENT] = new ResourceTag({
  name: RESOURCE_TAGS.FUEL_POTENT,
  plural: 'Potent Fuels',
  value: 60,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'fire-alt', color:'#ff0000'})});

resourceTags[RESOURCE_TAGS.CONSTRUCTION] = new ResourceTag({
  name: RESOURCE_TAGS.CONSTRUCTION,
  plural: 'Construction Goods',
  value: 5,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'hammer',
    color:'#8a4949'})});

resourceTags[RESOURCE_TAGS.DRINK] = new ResourceTag({
  name: RESOURCE_TAGS.DRINK,
  plural: 'Drinks',
  value: 5,
  extract: false,
  icon: new Icon({provider: 'MaterialIcons', name: 'local-drink',
    color:'#03a9f4'})});

resourceTags[RESOURCE_TAGS.FOOD] = new ResourceTag({
  name: RESOURCE_TAGS.FOOD,
  plural: 'Foods',
  value: 5,
  extract: false,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'food-apple',
    color:'#f44336'})});

resourceTags[RESOURCE_TAGS.PROVISION] = new ResourceTag({
  name: RESOURCE_TAGS.PROVISION,
  plural: 'Provisions',
  value: 60,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'map',
    color:'#986127'})});

resourceTags[RESOURCE_TAGS.MIND] = new ResourceTag({
  name: RESOURCE_TAGS.MIND,
  plural: 'Pursuits of the Mind',
  value: 5,
  extract: false,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'brain',
    color:'#b10101'})});

resourceTags[RESOURCE_TAGS.CROP] = new ResourceTag({
  name: RESOURCE_TAGS.CROP,
  plural: 'Crops',
  value: 5,
  extract: false,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'sprout',
    color:'#008000'})});

resourceTags[RESOURCE_TAGS.ANIMAL] = new ResourceTag({
  name: RESOURCE_TAGS.ANIMAL,
  plural: 'Animal Products',
  value: 5,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'paw',
    color:'#881919'})});

resourceTags[RESOURCE_TAGS.EARTH] = new ResourceTag({
  name: RESOURCE_TAGS.EARTH,
  plural: 'Earthy Material',
  value: 5,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'globe-africa',
    color:'#986127'})});

resourceTags[RESOURCE_TAGS.PRECIOUS] = new ResourceTag({
  name: RESOURCE_TAGS.PRECIOUS,
  plural: 'Precious Material',
  value: 5,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'gem',
    color:'#8a4949'})});

resourceTags[RESOURCE_TAGS.INGREDIENT] = new ResourceTag({
  name: RESOURCE_TAGS.INGREDIENT,
  plural: 'Cooking Ingredients',
  value: 50,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'shopping-bag',
    color:'#4caf50'})});

resourceTags[RESOURCE_TAGS.CERAMIC] = new ResourceTag({
  name: RESOURCE_TAGS.CERAMIC,
  plural: 'Ceramics',
  value: 60,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'glass-whiskey',
    color:'#942c14'})});

resourceTags[RESOURCE_TAGS.SPICE] = new ResourceTag({
  name: RESOURCE_TAGS.SPICE,
  plural: 'Spices',
  value: 50,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'mortar-pestle',
    color:'#ca8826'})});

resourceTags[RESOURCE_TAGS.TRADE_GOOD] = new ResourceTag({
  name: RESOURCE_TAGS.TRADE_GOOD,
  plural: 'Trade Goods',
  value: 40,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'exchange-alt',
    color:'#666'})});

resourceTags[RESOURCE_TAGS.PRESSED] = new ResourceTag({
  name: RESOURCE_TAGS.PRESSED,
  plural: 'Pressed Material',
  value: 50,
  extract: false,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'inbox-multiple',
    color:'#ca8826'})});

resourceTags[RESOURCE_TAGS.DRIED] = new ResourceTag({
  name: RESOURCE_TAGS.DRIED,
  plural: 'Dried Material',
  value: 5,
  extract: false,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'waves',
    color:'#ff2222'})});

resourceTags[RESOURCE_TAGS.POWDER] = new ResourceTag({
  name: RESOURCE_TAGS.POWDER,
  plural: 'Powders',
  value: 25,
  extract: false,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'triangle',
    color:'#666'})});

resourceTags[RESOURCE_TAGS.SMELTED] = new ResourceTag({
  name: RESOURCE_TAGS.SMELTED,
  plural: 'Smelted Material',
  value: 5,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'fire',
    color:'#ff2222'})});

resourceTags[RESOURCE_TAGS.TEXTILE] = new ResourceTag({
  name: RESOURCE_TAGS.TEXTILE,
  plural: 'Textiles',
  value: 200,
  extract: false,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'grid',
    color:'#3f51b5'})});

resourceTags[RESOURCE_TAGS.GLASS] = new ResourceTag({
  name: RESOURCE_TAGS.GLASS,
  plural: 'Glass',
  value: 180,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'glass-whiskey',
    color:'#3f51b5'})});

resourceTags[RESOURCE_TAGS.SYNTHESIZED] = new ResourceTag({
  name: RESOURCE_TAGS.SYNTHESIZED,
  plural: 'Synthesized Items',
  value: 160,
  extract: false,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'flask',
    color:'#4caf50'})});

resourceTags[RESOURCE_TAGS.SAVORY] = new ResourceTag({
  name: RESOURCE_TAGS.SAVORY,
  plural: 'Savory Goods',
  value: 5,
  extract: true,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'triangle',
    color:'#ca8826'})});

resourceTags[RESOURCE_TAGS.SWEET] = new ResourceTag({
  name: RESOURCE_TAGS.SWEET,
  plural: 'Sweet Things',
  value: 5,
  extract: true,
  icon: new Icon({provider: 'FontAwesome5', name: 'cubes',
    color:'#ff7373'})});

resourceTags[RESOURCE_TAGS.BITTER] = new ResourceTag({
  name: RESOURCE_TAGS.BITTER,
  plural: 'Bitter Goods',
  value: 5,
  extract: true,
  icon: new Icon({provider: 'FontAwesome5', name: 'times-circle',
    color:'#7b27b0'})});

resourceTags[RESOURCE_TAGS.SOUR] = new ResourceTag({
  name: RESOURCE_TAGS.SOUR,
  plural: 'Sour Goods',
  value: 5,
  extract: true,
  icon: new Icon({provider: 'FontAwesome5', name: 'lemon',
    color:'#ffeb3b'})});

resourceTags[RESOURCE_TAGS.BRACKISH] = new ResourceTag({
  name: RESOURCE_TAGS.BRACKISH,
  plural: 'Brackish Goods',
  value: 5,
  extract: true,
  icon: new Icon({provider: 'FontAwesome5', name: 'water',
    color:'#3f51b5'})});

resourceTags[RESOURCE_TAGS.SPICY] = new ResourceTag({
  name: RESOURCE_TAGS.SPICY,
  plural: 'Spicy Goods',
  value: 5,
  extract: true,
  icon: new Icon({provider: 'FontAwesome5', name: 'pepper-hot',
    color:'#ff2222'})});

resourceTags[RESOURCE_TAGS.COOLING] = new ResourceTag({
  name: RESOURCE_TAGS.COOLING,
  plural: 'Cooling Goods',
  value: 5,
  extract: true,
  icon: new Icon({provider: 'FontAwesome5', name: 'snowflake',
    color:'#83d8ff'})});

resourceTags[RESOURCE_TAGS.HERBAL] = new ResourceTag({
  name: RESOURCE_TAGS.HERBAL,
  plural: 'Herbal Goods',
  value: 5,
  extract: true,
  icon: new Icon({provider: 'FontAwesome5', name: 'leaf',
    color:'#4caf50'})});

resourceTags[RESOURCE_TAGS.ACTION_SEEK] = new ResourceTag({
  name: RESOURCE_TAGS.ACTION_SEEK,
  plural: 'Implements for Seeking',
  value: 200,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'sun',
    color:'#efbd03'})});

resourceTags[RESOURCE_TAGS.ACTION_BREAK] = new ResourceTag({
  name: RESOURCE_TAGS.ACTION_BREAK,
  plural: 'Implements for Breaking',
  value: 200,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'bomb',
    color:'#b7241e'})});

resourceTags[RESOURCE_TAGS.ACTION_TRAP] = new ResourceTag({
  name: RESOURCE_TAGS.ACTION_TRAP,
  plural: 'Implements for Trapping',
  value: 200,
  extract: false,
  icon: new Icon({provider: 'FontAwesome', name: 'gears',
    color:'#9b6a03'})});

resourceTags[RESOURCE_TAGS.ACTION_LOOSE] = new ResourceTag({
  name: RESOURCE_TAGS.ACTION_LOOSE,
  plural: 'Implements for Loosing',
  value: 200,
  extract: false,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'sword',
    color:'#1e66b7'})});

resourceTags[RESOURCE_TAGS.ACTION_HEAL] = new ResourceTag({
  name: RESOURCE_TAGS.ACTION_HEAL,
  plural: 'Implements for Healing',
  value: 200,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'heart',
    color:'#69b71e'})});

resourceTags[EQUIPMENT_SLOTS.TOOL] = new ResourceTag({
  name: EQUIPMENT_SLOTS.TOOL,
  plural: 'Tools',
  value: 3000,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'tools',
    color:'#6d6d6d'})});

resourceTags[EQUIPMENT_SLOTS.CLOTHING] = new ResourceTag({
  name: EQUIPMENT_SLOTS.CLOTHING,
  plural: 'Clothing',
  value: 2000,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'tshirt',
    color:'#6d6d6d'})});

resourceTags[EQUIPMENT_SLOTS.BACK] = new ResourceTag({
  name: EQUIPMENT_SLOTS.BACK,
  plural: 'Back Equipment',
  value: 2000,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'toolbox',
    color:'#6d6d6d'})});

export { resourceTags }
