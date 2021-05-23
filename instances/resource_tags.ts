import ResourceTag from '../models/resource_tag';
import Icon from '../models/icon';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { EQUIPMENT_SLOTS } from '../enums/equipment_slots';

let resourceTags: { [name: string] : ResourceTag } = {};

resourceTags[RESOURCE_TAGS.FUEL] = new ResourceTag({
  name: RESOURCE_TAGS.FUEL,
  value: 5,
  extract: false,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'fireplace',
    color:'#ff0000'})});

resourceTags[RESOURCE_TAGS.CONSTRUCTION] = new ResourceTag({
  name: RESOURCE_TAGS.CONSTRUCTION,
  value: 5,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'hammer', 
    color:'#8a4949'})});

resourceTags[RESOURCE_TAGS.DRINK] = new ResourceTag({
  name: RESOURCE_TAGS.DRINK,
  value: 5,
  extract: false,
  icon: new Icon({provider: 'MaterialIcons', name: 'local-drink',
    color:'#03a9f4'})});

resourceTags[RESOURCE_TAGS.FOOD] = new ResourceTag({
  name: RESOURCE_TAGS.FOOD,
  value: 5,
  extract: false,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'food-apple',
    color:'#f44336'})});

resourceTags[RESOURCE_TAGS.LIQUID] = new ResourceTag({
  name: RESOURCE_TAGS.LIQUID,
  value: 5,
  extract: false,
  icon: new Icon({provider: 'Entypo', name: 'drop',
    color:'#3f51b5'})});

resourceTags[RESOURCE_TAGS.MIND] = new ResourceTag({
  name: RESOURCE_TAGS.MIND,
  value: 5,
  extract: false,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'brain',
    color:'#b10101'})});

resourceTags[RESOURCE_TAGS.PLANT] = new ResourceTag({
  name: RESOURCE_TAGS.PLANT,
  value: 5,
  extract: false,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'sprout',
    color:'#008000'})});

resourceTags[RESOURCE_TAGS.ANIMAL] = new ResourceTag({
  name: RESOURCE_TAGS.ANIMAL,
  value: 5,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'paw',
    color:'#881919'})});

resourceTags[RESOURCE_TAGS.ANIMAL_PRODUCT] = new ResourceTag({
  name: RESOURCE_TAGS.ANIMAL_PRODUCT,
  value: 5,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'feather-alt',
    color:'#01b101'})});

resourceTags[RESOURCE_TAGS.EARTH] = new ResourceTag({
  name: RESOURCE_TAGS.EARTH,
  value: 5,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'globe-africa',
    color:'#986127'})});

resourceTags[RESOURCE_TAGS.INGREDIENT] = new ResourceTag({
  name: RESOURCE_TAGS.INGREDIENT,
  value: 50,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'shopping-bag',
    color:'#4caf50'})});

resourceTags[RESOURCE_TAGS.POTTERY] = new ResourceTag({
  name: RESOURCE_TAGS.POTTERY,
  value: 60,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'glass-whiskey',
    color:'#942c14'})});

resourceTags[RESOURCE_TAGS.SPICE] = new ResourceTag({
  name: RESOURCE_TAGS.SPICE,
  value: 50,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'mortar-pestle',
    color:'#ca8826'})});

resourceTags[RESOURCE_TAGS.SAVORY] = new ResourceTag({
  name: RESOURCE_TAGS.SAVORY,
  value: 5,
  extract: true,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'food-drumstick',
    color:'#ca8826'})});

resourceTags[RESOURCE_TAGS.SWEET] = new ResourceTag({
  name: RESOURCE_TAGS.SWEET,
  value: 5,
  extract: true,
  icon: new Icon({provider: 'FontAwesome5', name: 'cubes',
    color:'#ff7373'})});

resourceTags[RESOURCE_TAGS.BITTER] = new ResourceTag({
  name: RESOURCE_TAGS.BITTER,
  value: 5,
  extract: true,
  icon: new Icon({provider: 'FontAwesome5', name: 'times-circle',
    color:'#7b27b0'})});

resourceTags[RESOURCE_TAGS.SOUR] = new ResourceTag({
  name: RESOURCE_TAGS.SOUR,
  value: 5,
  extract: true,
  icon: new Icon({provider: 'FontAwesome5', name: 'lemon',
    color:'#ffeb3b'})});

resourceTags[RESOURCE_TAGS.BRACKISH] = new ResourceTag({
  name: RESOURCE_TAGS.BRACKISH,
  value: 5,
  extract: true,
  icon: new Icon({provider: 'FontAwesome5', name: 'water',
    color:'#3f51b5'})});

resourceTags[RESOURCE_TAGS.SPICY] = new ResourceTag({
  name: RESOURCE_TAGS.SPICY,
  value: 5,
  extract: true,
  icon: new Icon({provider: 'FontAwesome5', name: 'pepper-hot',
    color:'#ff2222'})});

resourceTags[RESOURCE_TAGS.COOLING] = new ResourceTag({
  name: RESOURCE_TAGS.COOLING,
  value: 5,
  extract: true,
  icon: new Icon({provider: 'FontAwesome5', name: 'snowflake',
    color:'#83d8ff'})});

resourceTags[RESOURCE_TAGS.HERBAL] = new ResourceTag({
  name: RESOURCE_TAGS.HERBAL,
  value: 5,
  extract: true,
  icon: new Icon({provider: 'FontAwesome5', name: 'leaf',
    color:'#4caf50'})});

resourceTags[EQUIPMENT_SLOTS.TOOL] = new ResourceTag({
  name: EQUIPMENT_SLOTS.TOOL,
  value: 3000,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'tools',
    color:'#6d6d6d'})});

resourceTags[EQUIPMENT_SLOTS.CLOTHING] = new ResourceTag({
  name: EQUIPMENT_SLOTS.CLOTHING,
  value: 2000,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'tshirt',
    color:'#6d6d6d'})});

resourceTags[EQUIPMENT_SLOTS.BACK] = new ResourceTag({
  name: EQUIPMENT_SLOTS.BACK,
  value: 2000,
  extract: false,
  icon: new Icon({provider: 'FontAwesome5', name: 'toolbox',
    color:'#6d6d6d'})});

export { resourceTags }
