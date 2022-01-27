import ResearchOption from '../models/research_option';
import { RESEARCH_OPTIONS } from '../enums/research_options';
import { RESEARCHES } from '../enums/researches';
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_TAGS } from '../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
const RSC = RESOURCE_SUBCATEGORIES;
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
const RCA = RESOURCE_CATEGORIES;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;

let researchOptions: { [name: string] : ResearchOption } = {};

researchOptions[RESEARCH_OPTIONS.AN_INKLING] = new ResearchOption({
  name: RESEARCH_OPTIONS.AN_INKLING,
  appliesTo: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  description: ('Progress isn\'t difficult, at this stage. '
    + 'And looking at this problem, you\'re reminded of a scrap of information '
    +  'you once happened across...'),
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 5}]
});

researchOptions[RESEARCH_OPTIONS.A_GUESS] = new ResearchOption({
  name: RESEARCH_OPTIONS.A_GUESS,
  appliesTo: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  description: ('It\'s not exactly that you\'ve thought this through before, '
    + 'but you know the answer can\'t be too far away.'),
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 8}]
});

researchOptions[RESEARCH_OPTIONS.PRODUCTIVE_DESTRUCTION] = new ResearchOption({
  name: RESEARCH_OPTIONS.PRODUCTIVE_DESTRUCTION,
  appliesTo: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  description: ('You\'ve learned there\'s a wealth of information you can '
    + 'gain by smashing things apart and seeing what happens.'),
  cost: [{specificity: RSP.CATEGORY, type: RCA.MATERIAL, quantity: 100}]
});

researchOptions[RESEARCH_OPTIONS.VARIETY_IN_APPROACH] = new ResearchOption({
  name: RESEARCH_OPTIONS.VARIETY_IN_APPROACH,
  appliesTo: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  description: ('A single substance can be changed and studied '
    + 'in a vast number of different ways. Water, for example: it can be frozen, '
    + 'evaporated, mixed into a suspension, purified, etc, etc.'),
  cost: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 60}]
});

researchOptions[RESEARCH_OPTIONS.A_SNACK] = new ResearchOption({
  name: RESEARCH_OPTIONS.A_SNACK,
  appliesTo: RESEARCHES.SCHOLARSHIP,
  difficulty: 0,
  description: ('Food and drink make your mind work faster. '
    + 'Even if all you have at hand is cold, soaked lentils.'),
  cost: [{specificity: RSP.TAG, type: RTA.FOOD, quantity: 10},
    {specificity: RSP.TAG, type: RTA.DRINK, quantity: 10}]
});

researchOptions[RESEARCH_OPTIONS.CASUAL_INSPECTION] = new ResearchOption({
  name: RESEARCH_OPTIONS.CASUAL_INSPECTION,
  appliesTo: RESEARCHES.STUDY,
  difficulty: 0,
  description: ('At least it starts as a casual inspection. '
    + 'The closer you look at these lentils, this single bushel of dried beans, '
    + 'the more you discover. Who knew?'),
  cost: [{specificity: RSP.EXACT, type: RTY.LENTIL, quantity: 1}]
});

researchOptions[RESEARCH_OPTIONS.SAND_VARIETY] = new ResearchOption({
  name: RESEARCH_OPTIONS.SAND_VARIETY,
  appliesTo: RESEARCHES.GATE_EXPANSION,
  difficulty: 0,
  description: (`Varieties of sand come in an array colors, caused by impurities from their source: you find bits of clay, flecks of rust, and tiny clumps of a greenish metal.`),
  cost: [{specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 200},
    {specificity: RSP.EXACT, type: RTY.SAND_DUNE, quantity: 50},
    {specificity: RSP.EXACT, type: RTY.SAND_OLIVINE, quantity: 50}]
});

researchOptions[RESEARCH_OPTIONS.CLAY_VARIETY] = new ResearchOption({
  name: RESEARCH_OPTIONS.CLAY_VARIETY,
  appliesTo: RESEARCHES.GATE_EXPANSION,
  difficulty: 0,
  description: (`Clay from different lands behaves in entiely distict ways. A shame that the clay from your town is mostly mud.`),
  cost: [{specificity: RSP.EXACT, type: RTY.CLAY_MUDDY, quantity: 40},
    {specificity: RSP.EXACT, type: RTY.CLAY_BLUE, quantity: 10},
    {specificity: RSP.EXACT, type: RTY.CLAY_RICH, quantity: 10}]
});

researchOptions[RESEARCH_OPTIONS.BRICK_VARIETY] = new ResearchOption({
  name: RESEARCH_OPTIONS.BRICK_VARIETY,
  appliesTo: RESEARCHES.GATE_EXPANSION_BRICKWORK,
  difficulty: 0,
  description: (`Mud bricks come easy but crumble quickly, brownstone bricks are strong but dense. You'll need a variety to expand your town's walls into the increasingly unstable sands.`),
  cost: [{specificity: RSP.EXACT, type: RTY.BRICKS_MUD, quantity: 20},
    {specificity: RSP.EXACT, type: RTY.BRICKS_SANDLIME, quantity: 50},
    {specificity: RSP.EXACT, type: RTY.BRICKS_BROWNSTONE, quantity: 50},
    {specificity: RSP.EXACT, type: RTY.BRICKS_RED, quantity: 50}]
});

researchOptions[RESEARCH_OPTIONS.EXCESSIVE_NOTE_TAKING] = new ResearchOption({
  name: RESEARCH_OPTIONS.EXCESSIVE_NOTE_TAKING,
  appliesTo: RESEARCHES.FIELD_NOTES,
  difficulty: 1,
  description: ('Your notes will need to be thorough, yet readable. You do '
    + 'know you letters, although it\'s been a long time since you\'ve written. '
    + 'Better practice, and practice a lot.'),
  cost: [{specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 400},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, quantity: 20}]
});

researchOptions[RESEARCH_OPTIONS.METAL_VARIETY] = new ResearchOption({
  name: RESEARCH_OPTIONS.METAL_VARIETY,
  appliesTo: RESEARCHES.GATE_EXPANSION_METAL_CLAD,
  difficulty: 1,
  description: (`By using a combination of sturdy metals, your town wall should stand up to any combination of dust storms and shifting sands. You'll need some metal powders to play around with the proportions.`),
  cost: [{specificity: RSP.EXACT, type: RTY.IRON_POWDER, quantity: 100},
    {specificity: RSP.EXACT, type: RTY.COPPER_POWDER, quantity: 60},
    {specificity: RSP.EXACT, type: RTY.TIN_POWDER, quantity: 20},
    {specificity: RSP.EXACT, type: RTY.ZINC_POWDER, quantity: 20}]
});

researchOptions[RESEARCH_OPTIONS.WOOD_VARIETY] = new ResearchOption({
  name: RESEARCH_OPTIONS.WOOD_VARIETY,
  appliesTo: RESEARCHES.GATE_EXPANSION_METAL_CLAD,
  difficulty: 1,
  description: (`Although metal plating will be doing most of the work, you'll still need to identify the right kind of wood and the proper shape to support a more magnificent town wall.`),
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_EARTH, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.WOOD_OAK, quantity: 120},
    {specificity: RSP.EXACT, type: RTY.WOOD_ALDER, quantity: 120},
    {specificity: RSP.EXACT, type: RTY.WOOD_ROWAN, quantity: 120}]
});

researchOptions[RESEARCH_OPTIONS.LEGUME_DISSECTION] = new ResearchOption({
  name: RESEARCH_OPTIONS.LEGUME_DISSECTION,
  appliesTo: RESEARCHES.BIOLOGY,
  difficulty: 1,
  description: ('You\'ll need a fair number of lentils you can use as '
    + 'study subjects. And to grow other crops you\'ll need to know about '
    + 'watering patterns, light preference, growth times...'),
  cost: [{specificity: RSP.EXACT, type: RTY.LENTIL, quantity: 50}]
});

researchOptions[RESEARCH_OPTIONS.WATER_UNDER_THE_SUN] = new ResearchOption({
  name: RESEARCH_OPTIONS.WATER_UNDER_THE_SUN,
  appliesTo: RESEARCHES.BIOLOGY,
  difficulty: 1,
  description: ('Growing food in a desert means water is your most valuable '
    + 'resource, and the relentlessly burning sun is your greatest enemy.'),
  cost: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 200}]
});

researchOptions[RESEARCH_OPTIONS.BOTANICAL_HEARSAY] = new ResearchOption({
  name: RESEARCH_OPTIONS.BOTANICAL_HEARSAY,
  appliesTo: RESEARCHES.BIOLOGY,
  difficulty: 1,
  description: ('In the course of your recent research you\'ve picked up an '
    + 'array of general plant knowledge. Now you just need to put it together '
    + 'and make it applicable.'),
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 50}]
});

researchOptions[RESEARCH_OPTIONS.GERMINATION] = new ResearchOption({
  name: RESEARCH_OPTIONS.GERMINATION,
  appliesTo: RESEARCHES.BIOLOGY,
  difficulty: 1,
  description: ('Many of the seeds you plant never do anything, and you don\'t '
    + 'know why. But with enough experimentation, you could figure '
    + 'it out.'),
  cost: [{specificity: RSP.SUBCATEGORY, type: RSC.SEEDS, quantity: 2},
    {specificity: RSP.EXACT, type: RTY.WATER, quantity: 50}]
});

researchOptions[RESEARCH_OPTIONS.CROP_COMPARISON] = new ResearchOption({
  name: RESEARCH_OPTIONS.CROP_COMPARISON,
  appliesTo: RESEARCHES.BIOLOGY,
  difficulty: 2,
  description: ('Different crops have different needs, and require different '
    + 'approaches. But you\'re continually increasing your material for comparison.'),
  cost: [{specificity: RSP.EXACT, type: RTY.LENTIL, quantity: 400},
    {specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 400},
    {specificity: RSP.EXACT, type: RTY.OLIVE, quantity: 400}]
});

researchOptions[RESEARCH_OPTIONS.SOIL_QUALITY] = new ResearchOption({
  name: RESEARCH_OPTIONS.SOIL_QUALITY,
  appliesTo: RESEARCHES.BIOLOGY,
  difficulty: 2,
  description: ('Some detailed notes on the properties of desert soil '
    + 'could give you options for growing crops faster, better, and more efficiently.'),
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_EARTH, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 4800},
    {specificity: RSP.EXACT, type: RTY.CLAY_MUDDY, quantity: 560}]
});

researchOptions[RESEARCH_OPTIONS.FROM_DOMESTICATION] = new ResearchOption({
  name: RESEARCH_OPTIONS.FROM_DOMESTICATION,
  appliesTo: RESEARCHES.BIOLOGY,
  difficulty: 2,
  description: ('Tending to pregnant livestock, treating animal sickness, foods '
    + 'that are preffered and foods that are rejected, it\'s all here in your notes.'),
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_CULTIVATION, quantity: 1},
    {specificity: RSP.SUBCATEGORY, type: RSC.FISH, quantity: 580},
    {specificity: RSP.SUBCATEGORY, type: RSC.ANIMAL, quantity: 460}]
});

researchOptions[RESEARCH_OPTIONS.FINAL_EDIBILITY] = new ResearchOption({
  name: RESEARCH_OPTIONS.FINAL_EDIBILITY,
  appliesTo: RESEARCHES.BIOLOGY,
  difficulty: 2,
  description: ('Flavor in your town\'s food is important, but so is efficiency '
    + 'and effect. You\'ve begun to study and compare foods from different sources.'),
  cost: [{specificity: RSP.CATEGORY, type: RCA.DISH, quantity: 1000}]
});

researchOptions[RESEARCH_OPTIONS.REMEMBERED_MEETINGS] = new ResearchOption({
  name: RESEARCH_OPTIONS.REMEMBERED_MEETINGS,
  appliesTo: RESEARCHES.ANTHROPOLOGY,
  difficulty: 1,
  description: ('You\'ve never been an especially social person, but in your '
    + 'father\'s hookah lounge you unavoidably met a number of colorful people. '
    + 'If you had known you\'d eventually need the knowledge you would have paid '
    + 'better attention.'),
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 60}]
});

researchOptions[RESEARCH_OPTIONS.LINGUISTIC_GUESSWORK] = new ResearchOption({
  name: RESEARCH_OPTIONS.LINGUISTIC_GUESSWORK,
  appliesTo: RESEARCHES.ANTHROPOLOGY,
  difficulty: 1,
  description: ('Now that you have need of some knowledge of languages, you try '
    + 'to remember every example of unfamiliar speech you\'ve heard. The curse words '
    + 'come back easily enough.'),
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 40}]
});

researchOptions[RESEARCH_OPTIONS.FAMILIAR_CUISINE] = new ResearchOption({
  name: RESEARCH_OPTIONS.FAMILIAR_CUISINE,
  appliesTo: RESEARCHES.ANTHROPOLOGY,
  difficulty: 1,
  description: ('You\'ve only got simple materials on hand, but a culinary '
    + 'exploration of the cultures you recall could be useful.'),
  cost: [{specificity: RSP.TAG, type: RTA.FOOD, quantity: 20}]
});

researchOptions[RESEARCH_OPTIONS.SANDY_LIMERICKS] = new ResearchOption({
  name: RESEARCH_OPTIONS.SANDY_LIMERICKS,
  appliesTo: RESEARCHES.ANTHROPOLOGY,
  difficulty: 1,
  description: ('There\'s a series of playful limericks you\'ve heard repeated '
    + 'a hundred times in a dozen different languages. They describe an ugly man '
    + 'who tries to make himself a wife out of sand; now how do they start?'),
  cost: [{specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 50}]
});

researchOptions[RESEARCH_OPTIONS.EARLY_PRINCIPLES] = new ResearchOption({
  name: RESEARCH_OPTIONS.EARLY_PRINCIPLES,
  appliesTo: RESEARCHES.PHYSICS,
  difficulty: 1,
  description: ('Combing through your past wanderings, you can recall '
    + 'a variety of simple patterns: repeating dark whorls in sandstone, '
    + 'the consistent bell-shape of a nomad\'s tent, and the ark a hawk makes '
    + 'as it flies toward prey.'),
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 80}]
});

researchOptions[RESEARCH_OPTIONS.SAND_AND_SOIL] = new ResearchOption({
  name: RESEARCH_OPTIONS.SAND_AND_SOIL,
  appliesTo: RESEARCHES.PHYSICS,
  difficulty: 1,
  description: ('In this part of the desert, you\'ve got sand, and clay under that. '
    + 'Time to start seeing what you can make with blends of the two.'),
  cost: [{specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 10},
    {specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 10},
    {specificity: RSP.EXACT, type: RTY.WATER, quantity: 10}]
});

researchOptions[RESEARCH_OPTIONS.BORROWED_CLUES] = new ResearchOption({
  name: RESEARCH_OPTIONS.BORROWED_CLUES,
  appliesTo: RESEARCHES.PHYSICS,
  difficulty: 1,
  description: ('You don\'t have much of a connection with the great scholars elsewhere '
    + 'in the desert, but you\'ve heard rumors of some of their conclusions: '
    + 'laws that can predict both the path of stars through the skies and the '
    + 'path of water in a basin.'),
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 100}]
});

researchOptions[RESEARCH_OPTIONS.TO_BUILD_A_HOME] = new ResearchOption({
  name: RESEARCH_OPTIONS.TO_BUILD_A_HOME,
  appliesTo: RESEARCHES.PHYSICS,
  difficulty: 1,
  description: ('You can do better than a loose collection of scrap to hide from '
    + 'the sun and wind. Time to experiment with tools and materials to build '
    + 'something more comfortable.'),
  cost: [{specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 2},
    {specificity: RSP.EXACT, type: RTY.REEDS, quantity: 40}]
});

researchOptions[RESEARCH_OPTIONS.MIDDLE_PRICIPLES] = new ResearchOption({
  name: RESEARCH_OPTIONS.MIDDLE_PRICIPLES,
  appliesTo: RESEARCHES.PHYSICS,
  difficulty: 2,
  description: ('The numbers that govern everything around you can be understood '
    + 'from deep observation. Not necessarily observation of anything at all... '
    + 'But close.'),
  cost: [{specificity: RSP.CATEGORY, type: RCA.FIELD_NOTES, quantity: 2}]
});

researchOptions[RESEARCH_OPTIONS.GRAVITY_UPON_STATE] = new ResearchOption({
  name: RESEARCH_OPTIONS.GRAVITY_UPON_STATE,
  appliesTo: RESEARCHES.PHYSICS,
  difficulty: 2,
  description: ('In order to build larger, grander, and more complex buildings '
    + 'you\'ll need a keen understanding of the force that pulls '
    + 'everything toward the greedy earth, and it\'s effects on materials '
    + 'of all kinds.'),
  cost: [{specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 2000},
    {specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 2000},
    {specificity: RSP.EXACT, type: RTY.WATER, quantity: 2000}]
});

researchOptions[RESEARCH_OPTIONS.AIR_AND_FLOW] = new ResearchOption({
  name: RESEARCH_OPTIONS.AIR_AND_FLOW,
  appliesTo: RESEARCHES.PHYSICS,
  difficulty: 2,
  description: ('You\'ve observed that the flows of air and water are '
    + 'surprisingly similar in style, although different in speed. '
    + 'Understanding their differences may help you harness both more effectively.'),
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_WATER, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.WATER, quantity: 10000}]
});

researchOptions[RESEARCH_OPTIONS.MATERIAL_CONJUNCTION] = new ResearchOption({
  name: RESEARCH_OPTIONS.MATERIAL_CONJUNCTION,
  appliesTo: RESEARCHES.PHYSICS,
  difficulty: 2,
  description: ('Your building materials are less strong when different types meet: '
    + 'brick against wood is never as stable and brick against brick. There may be '
    + 'a way around this, and you know where to start.'),
  cost: [{specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 1000},
    {specificity: RSP.SUBCATEGORY, type: RSC.WOOD, quantity: 200}]
});

researchOptions[RESEARCH_OPTIONS.HINTS_FROM_ALCHEMY] = new ResearchOption({
  name: RESEARCH_OPTIONS.HINTS_FROM_ALCHEMY,
  appliesTo: RESEARCHES.CHEMISTRY,
  difficulty: 1,
  description: ('For centuries, alchemists have been trying to turn lead into gold '
    + 'and create elixers that give everlasting youth. You think it\'s mostly '
    + 'nonsense, but you have learned a few useful things from their attempts.'),
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 90}]
});

researchOptions[RESEARCH_OPTIONS.DISTILLATION] = new ResearchOption({
  name: RESEARCH_OPTIONS.DISTILLATION,
  appliesTo: RESEARCHES.CHEMISTRY,
  difficulty: 1,
  description: ('Your attempts to purity water have primarily resulted in '
    + 'wasting large amounts of water, but have revealed some interesting '
    + 'salts and minerals left behind.'),
  cost: [{specificity: RSP.EXACT, type: RTY.WATER, quantity: 200}]
});

researchOptions[RESEARCH_OPTIONS.FIRE_STARTING] = new ResearchOption({
  name: RESEARCH_OPTIONS.FIRE_STARTING,
  appliesTo: RESEARCHES.CHEMISTRY,
  difficulty: 1,
  description: ('Fire is the oldest (and most interesting) chemical change. '
    + 'Starting one isn\'t hard, but you want to learn how to start one quickly, '
    + 'and to make it burn hot and fast.'),
  cost: [{specificity: RSP.EXACT, type: RTY.REEDS, quantity: 50}]
});

researchOptions[RESEARCH_OPTIONS.HIDDEN_IN_THE_SAND] = new ResearchOption({
  name: RESEARCH_OPTIONS.HIDDEN_IN_THE_SAND,
  appliesTo: RESEARCHES.CHEMISTRY,
  difficulty: 1,
  description: ('The sand around you looks clean and white, but studying it '
    + 'further shows a spectrum of impurities. There are metals, salts, '
    + 'minerals, bits of bone, and things you don\'t even have a name for.'),
  cost: [{specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 100}]
});

researchOptions[RESEARCH_OPTIONS.ZYMOLOGY] = new ResearchOption({
  name: RESEARCH_OPTIONS.ZYMOLOGY,
  appliesTo: RESEARCHES.CHEMISTRY,
  difficulty: 2,
  description: ('There\'s a curious chemical change that happens to wet grain '
    + 'left alone. The water becomes beer, you know that much. But you\'d '
    + 'love to figure out exactly how that delightful switch happens.'),
  cost: [{specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 400},
    {specificity: RSP.EXACT, type: RTY.WATER, quantity: 400}]
});

researchOptions[RESEARCH_OPTIONS.VENTILATION_OF_FLAME] = new ResearchOption({
  name: RESEARCH_OPTIONS.VENTILATION_OF_FLAME,
  appliesTo: RESEARCHES.CHEMISTRY,
  difficulty: 2,
  description: ('Making a fire as hot and concentrated as possible is more difficult '
    + 'than expected. It\'s all about fuel and airflow, but the fire itself '
    + 'creates its own updraft that throws everything off.'),
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_HEAT, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.REEDS, quantity: 1200},
    {specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 320}]
});

researchOptions[RESEARCH_OPTIONS.BITTER_FUMES] = new ResearchOption({
  name: RESEARCH_OPTIONS.BITTER_FUMES,
  appliesTo: RESEARCHES.CHEMISTRY,
  difficulty: 2,
  description: ('You\'ve heard interesting things about a yellow-ish powder '
    + 'called sulfur, and the ways it can change solid objects into liquids '
    + 'with completely different properties. But it sure isn\'t pleasant '
    + 'to work with.'),
  cost: [{specificity: RSP.EXACT, type: RCA.FIELD_NOTES, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.SULFUR, quantity: 40},
    {specificity: RSP.EXACT, type: RTY.WATER, quantity: 400}]
});

researchOptions[RESEARCH_OPTIONS.CHEMICAL_FIXATION] = new ResearchOption({
  name: RESEARCH_OPTIONS.CHEMICAL_FIXATION,
  appliesTo: RESEARCHES.CHEMISTRY,
  difficulty: 2,
  description: ('Metals, clay, glass, and materials of all kinds change with time, '
    + 'becoming dull or brittle. There must be a way to make them, if not '
    + 'unchangeable, at least better able to resist this decay from the air.'),
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_EARTH, quantity: 1},
    {specificity: RSP.SUBCATEGORY, type: RSC.METAL_INGOT, quantity: 20},
    {specificity: RSP.EXACT, type: RSC.GLASS, quantity: 200}]
});

researchOptions[RESEARCH_OPTIONS.WRITERS_UPON_WRITERS] = new ResearchOption({
  name: RESEARCH_OPTIONS.WRITERS_UPON_WRITERS,
  appliesTo: RESEARCHES.MYSTICISM,
  difficulty: 0,
  description: `The Tome has been written in layers, with deliberate space left between each writer's contribution. Is this a way to coordinate research over time? Regardless, it will take effort and skill to decifer any kind of meaning.`,
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 3333}]
});

researchOptions[RESEARCH_OPTIONS.OBLIQUE_REFERENCES] = new ResearchOption({
  name: RESEARCH_OPTIONS.OBLIQUE_REFERENCES,
  appliesTo: RESEARCHES.MYSTICISM,
  difficulty: 0,
  description: `The Tome is part poetry, part history, and part instruction manual. You also suspect a significant amount might be outright lies, designed to mislead outsiders who managed to get ahold of the book. You, in other words.`,
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 4444}]
});

researchOptions[RESEARCH_OPTIONS.NEWBORN_LANGUAGE] = new ResearchOption({
  name: RESEARCH_OPTIONS.NEWBORN_LANGUAGE,
  appliesTo: RESEARCHES.MYSTICISM,
  difficulty: 0,
  description: `Large portions of the Tome are outright painful reading. You eventually deduce the reason: the first five authors lived hundred of years ago, when the language you speak was new. You have to work backwards, extrapolating the meaning of long dead words.`,
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 5555}]
});

export { researchOptions };
