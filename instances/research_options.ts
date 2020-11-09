import ResearchOption from '../models/research_option';
import { RESEARCH_OPTIONS } from '../enums/research_options';
import { RESEARCHES } from '../enums/researches';
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
const RCA = RESOURCE_CATEGORIES;
import { RESOURCE_TAGS } from '../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const OS = RESOURCE_SPECIFICITY;

let researchOptions: { [name: string] : ResearchOption } = {};

researchOptions[RESEARCH_OPTIONS.AN_INKLING] = new ResearchOption({
  name: RESEARCH_OPTIONS.AN_INKLING,
  appliesTo: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  description: ('Progress isn\'t difficult, at this stage. '
    + 'And looking at this problem, you\'re reminded of a scrap of information '
    +  'you once happened across...'),
  cost: [{specificity: OS.EXACT, type: RTY.KNOWLEDGE, quantity: 5}]
});

researchOptions[RESEARCH_OPTIONS.A_GUESS] = new ResearchOption({
  name: RESEARCH_OPTIONS.A_GUESS,
  appliesTo: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  description: ('It\'s not exactly that you\'ve thought this through before, '
    + 'but you know the answer can\'t be too far away.'),
  cost: [{specificity: OS.EXACT, type: RTY.KNOWLEDGE, quantity: 8}]
});

researchOptions[RESEARCH_OPTIONS.PRODUCTIVE_DESTRUCTION] = new ResearchOption({
  name: RESEARCH_OPTIONS.PRODUCTIVE_DESTRUCTION,
  appliesTo: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  description: ('You\'ve learned there\'s a wealth of information you can '
    + 'gain by smashing things apart and seeing what happens.'),
  cost: [{specificity: OS.CATEGORY, type: RCA.MATERIAL, quantity: 100}]
});

researchOptions[RESEARCH_OPTIONS.VARIETY_IN_APPROACH] = new ResearchOption({
  name: RESEARCH_OPTIONS.VARIETY_IN_APPROACH,
  appliesTo: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  description: ('A sigle substance can be changed and studied '
    + 'in a vast number of different ways. Water, for example: it can be frozen, '
    + 'evaporated, mixed into a suspension, purified, etc, etc.'),
  cost: [{specificity: OS.EXACT, type: RTY.WATER, quantity: 60}]
});

researchOptions[RESEARCH_OPTIONS.A_SNACK] = new ResearchOption({
  name: RESEARCH_OPTIONS.A_SNACK,
  appliesTo: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  description: ('Food and drink make your mind work faster. '
    + 'Even if all you have at hand is cold, soaked lentils.'),
  cost: [{specificity: OS.TAG, type: RTA.FOOD, quantity: 10},
    {specificity: OS.TAG, type: RTA.DRINK, quantity: 10}]
});

researchOptions[RESEARCH_OPTIONS.CASUAL_INSPECTION] = new ResearchOption({
  name: RESEARCH_OPTIONS.CASUAL_INSPECTION,
  appliesTo: RESEARCHES.STUDY,
  difficulty: 0,
  description: ('At least it starts as a casual inspection. '
    + 'The closer you look at these lentils, this single bushel of dried beans, '
    + 'the more you discover. Who knew?'),
  cost: [{specificity: OS.EXACT, type: RTY.LENTILS, quantity: 1}]
});

researchOptions[RESEARCH_OPTIONS.LEGUME_DISSECTION] = new ResearchOption({
  name: RESEARCH_OPTIONS.LEGUME_DISSECTION,
  appliesTo: RESEARCHES.BIOLOGY,
  difficulty: 1,
  description: ('You\'ll need a fair number of lentils you can use as '
    + 'study subjects. And to grow other crops you\'ll need to know about '
    + 'watering patterns, light preference, growth times...'),
  cost: [{specificity: OS.EXACT, type: RTY.LENTILS, quantity: 50}]
});

researchOptions[RESEARCH_OPTIONS.WATER_UNDER_THE_SUN] = new ResearchOption({
  name: RESEARCH_OPTIONS.WATER_UNDER_THE_SUN,
  appliesTo: RESEARCHES.BIOLOGY,
  difficulty: 1,
  description: ('Growing food in a desert means water is your most valuable '
    + 'resource, and the relentlessly burning sun is your greatest enemy.'),
  cost: [{specificity: OS.EXACT, type: RTY.WATER, quantity: 200}]
});

researchOptions[RESEARCH_OPTIONS.BOTANICAL_HEARSAY] = new ResearchOption({
  name: RESEARCH_OPTIONS.BOTANICAL_HEARSAY,
  appliesTo: RESEARCHES.BIOLOGY,
  difficulty: 1,
  description: ('In the course of your recent research you\'ve picked up an '
    + 'array of general plant knowledge. Now you just need to put it together '
    + 'and make it applicable.'),
  cost: [{specificity: OS.EXACT, type: RTY.KNOWLEDGE, quantity: 50}]
});

researchOptions[RESEARCH_OPTIONS.GERMINATION] = new ResearchOption({
  name: RESEARCH_OPTIONS.GERMINATION,
  appliesTo: RESEARCHES.BIOLOGY,
  difficulty: 1,
  description: ('Many of the seeds you plant never do anything, and you don\'t '
    + 'know why. But with enough experimentation, you could figure '
    + 'it out.'),
  cost: [{specificity: OS.EXACT, type: RTY.SEEDS, quantity: 2},
    {specificity: OS.EXACT, type: RTY.WATER, quantity: 50}]
});

researchOptions[RESEARCH_OPTIONS.EARLY_PRINCIPLES] = new ResearchOption({
  name: RESEARCH_OPTIONS.EARLY_PRINCIPLES,
  appliesTo: RESEARCHES.PHYSICS,
  difficulty: 1,
  description: ('Combing through your past wanderings, you can recall '
    + 'a variety of simple patterns: repeating dark whorls in sandstone, '
    + 'the consistent bell-shape of a nomad\'s tent, and the ark a hawk makes '
    + 'as it flies toward prey.'),
  cost: [{specificity: OS.EXACT, type: RTY.KNOWLEDGE, quantity: 80}]
});

researchOptions[RESEARCH_OPTIONS.SAND_AND_SOIL] = new ResearchOption({
  name: RESEARCH_OPTIONS.SAND_AND_SOIL,
  appliesTo: RESEARCHES.PHYSICS,
  difficulty: 1,
  description: ('In this part of the desert, you\'ve got sand, and clay under that. '
    + 'Time to start seeing what you can make with blends of the two.'),
  cost: [{specificity: OS.TAG, type: RTA.SAND, quantity: 10},
    {specificity: OS.TAG, type: RTA.CLAY, quantity: 10},
    {specificity: OS.EXACT, type: RTY.WATER, quantity: 10}]
});

researchOptions[RESEARCH_OPTIONS.BORROWED_CLUES] = new ResearchOption({
  name: RESEARCH_OPTIONS.BORROWED_CLUES,
  appliesTo: RESEARCHES.PHYSICS,
  difficulty: 1,
  description: ('You don\'t have much of a connection with the great scholars elsewhere '
    + 'in the desert, but you\'ve heard rumors of some of their conclusions: '
    + 'laws that can predict both the path of stars through the skies and the '
    + 'path of water in a basin.'),
  cost: [{specificity: OS.EXACT, type: RTY.KNOWLEDGE, quantity: 100}]
});

researchOptions[RESEARCH_OPTIONS.TO_BUILD_A_HOME] = new ResearchOption({
  name: RESEARCH_OPTIONS.TO_BUILD_A_HOME,
  appliesTo: RESEARCHES.PHYSICS,
  difficulty: 1,
  description: ('You can do better than a loose collection of scrap to hide from '
    + 'the sun and wind. Time to experiment with tools and materials to build '
    + 'something more comfortable.'),
  cost: [{specificity: OS.TAG, type: RTA.WOOD, quantity: 10},
    {specificity: OS.EXACT, type: RTY.REEDS, quantity: 40}]
});

researchOptions[RESEARCH_OPTIONS.HINTS_FROM_ALCHEMY] = new ResearchOption({
  name: RESEARCH_OPTIONS.HINTS_FROM_ALCHEMY,
  appliesTo: RESEARCHES.CHEMISTRY,
  difficulty: 1,
  description: ('For centuries, alchemists have been trying to turn lead into gold '
    + 'and create elixers that give everlasting youth. You think it\'s mostly '
    + 'nonsense, but you have learned a few useful things from their attempts.'),
  cost: [{specificity: OS.EXACT, type: RTY.KNOWLEDGE, quantity: 90}]
});

researchOptions[RESEARCH_OPTIONS.DISTILLATION] = new ResearchOption({
  name: RESEARCH_OPTIONS.DISTILLATION,
  appliesTo: RESEARCHES.CHEMISTRY,
  difficulty: 1,
  description: ('Your attempts to purity water have primarily resulted in '
    + 'wasting large amounts of water, but have revealed some interesting '
    + 'salts and minerals left behind.'),
  cost: [{specificity: OS.EXACT, type: RTY.WATER, quantity: 200}]
});

researchOptions[RESEARCH_OPTIONS.FIRE_STARTING] = new ResearchOption({
  name: RESEARCH_OPTIONS.FIRE_STARTING,
  appliesTo: RESEARCHES.CHEMISTRY,
  difficulty: 1,
  description: ('Fire is the oldest (and most interesting) chemical change. '
    + 'Starting one isn\'t hard, but you want to learn how to start one quickly, '
    + 'and to make it burn hot and fast.'),
  cost: [{specificity: OS.EXACT, type: RTY.REEDS, quantity: 50}]
});

researchOptions[RESEARCH_OPTIONS.HIDDEN_IN_THE_SAND] = new ResearchOption({
  name: RESEARCH_OPTIONS.HIDDEN_IN_THE_SAND,
  appliesTo: RESEARCHES.CHEMISTRY,
  difficulty: 1,
  description: ('The sand around you looks clean and white, but studying it '
    + 'further shows a spectrum of impurities. There are metals, salts, '
    + 'minerals, bits of bone, and things you don\'t even have a name for.'),
  cost: [{specificity: OS.EXACT, type: RTA.SAND, quantity: 100}]
});

export { researchOptions };
