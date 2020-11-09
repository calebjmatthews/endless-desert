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

export { researchOptions };
