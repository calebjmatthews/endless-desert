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
import { RESEARCH_OPTION_ACTIONS } from '../enums/research_option_actions';
const ROA = RESEARCH_OPTION_ACTIONS;

let researchOptions: { [name: string] : ResearchOption } = {};

researchOptions[RESEARCH_OPTIONS.FRUSTRUATION] = new ResearchOption({
  name: RESEARCH_OPTIONS.FRUSTRUATION,
  appliesTo: RESEARCH_OPTIONS.SECONDARY,
  difficulty: 0,
  description: (`Everything is difficult today; your notes are a mess, the lighting is terrible, and you feel like pulling out your hair. Sometimes its better to throw away potential avenues and start over. *This will remove all current research options and replace them with new ones*`),
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 200}],
  actions: [ ROA.DISCARD_OPTIONS ],
  weight: 25
});

researchOptions[RESEARCH_OPTIONS.EXPLORING_POSSIBILITIES] = new ResearchOption({
  name: RESEARCH_OPTIONS.EXPLORING_POSSIBILITIES,
  appliesTo: RESEARCH_OPTIONS.SECONDARY,
  difficulty: 0,
  description: (`Time to slow down, ennumerate a list of strategies, and write out a set of approaches. *This will add an extra option slot for the rest of this research*`),
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 100},
    {specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 10},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, quantity: 1}],
  actions: [ ROA.INCREASE_OPTION_SLOTS ],
  weight: 25
});

researchOptions[RESEARCH_OPTIONS.RECKLESS_CONCENTRATION] = new ResearchOption({
  name: RESEARCH_OPTIONS.RECKLESS_CONCENTRATION,
  appliesTo: RESEARCH_OPTIONS.SECONDARY,
  difficulty: 0,
  description: (`Select a possible solution and burn away all other options. Is this incautious? Don't stop to think about that. *This will give research progress, but will both remove all current options and give one fewer slot for the rest of this research*`),
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 50}],
  actions: [ ROA.COMPLETE_STEP, ROA.DISCARD_OPTIONS, ROA.DECREASE_OPTION_SLOTS ],
  weight: 25
});

researchOptions[RESEARCH_OPTIONS.AGGRIVATION] = new ResearchOption({
  name: RESEARCH_OPTIONS.AGGRIVATION,
  appliesTo: RESEARCH_OPTIONS.SECONDARY,
  difficulty: 1,
  description: (`Prototype after prototype fails, theory after theory goes nowhere. But you'll pull this research back together, even if it means writing and cursing all night long. *This will remove all current research options and replace them with new ones*`),
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 500},
    { specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 80 },
    { specificity: RSP.EXACT, type: RTY.INK_FERROUS, quantity: 4 }],
  actions: [ ROA.DISCARD_OPTIONS ],
  weight: 25
});

researchOptions[RESEARCH_OPTIONS.A_WORTHWHILE_DISTRACTION] = new ResearchOption({
  name: RESEARCH_OPTIONS.A_WORTHWHILE_DISTRACTION,
  appliesTo: RESEARCH_OPTIONS.SECONDARY,
  difficulty: 1,
  description: (`You've found a compelling idea that isn't connected at all to the topic at hand. Exploring it would set you back significantly, but the temptation... *This will give a rare item, but will both remove all current options and give one fewer slot for the rest of this research*`),
  cost: [{ specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 4000 },
    { specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 400 },
    { specificity: RSP.EXACT, type: RTY.INK_FERROUS, quantity: 20 }],
  gain: [{ specificity: RSP.EXACT, type: RTY.NOTES_DIALECTIC, quantity: 1 }],
  actions: [ ROA.DISCARD_OPTIONS, ROA.DECREASE_OPTION_SLOTS ],
  weight: 25
});

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
  cost: [{specificity: RSP.EXACT, type: RTY.LENTIL, quantity: 1}],
  manditory: true
});

researchOptions[RESEARCH_OPTIONS.SAND_VARIETY] = new ResearchOption({
  name: RESEARCH_OPTIONS.SAND_VARIETY,
  appliesTo: RESEARCHES.GATE_EXPANSION,
  difficulty: 0,
  description: (`Varieties of sand come in an array colors, caused by impurities from their source: you find bits of clay, flecks of rust, and tiny clumps of a greenish metal.`),
  cost: [{specificity: RSP.EXACT, type: RTY.SAND_YELLOW, quantity: 200},
    {specificity: RSP.EXACT, type: RTY.SAND_DUNE, quantity: 50},
    {specificity: RSP.EXACT, type: RTY.SAND_OLIVINE, quantity: 50}],
  manditory: true
});

researchOptions[RESEARCH_OPTIONS.CLAY_VARIETY] = new ResearchOption({
  name: RESEARCH_OPTIONS.CLAY_VARIETY,
  appliesTo: RESEARCHES.GATE_EXPANSION,
  difficulty: 0,
  description: (`Clay from different lands behaves in entiely distict ways. A shame that the clay from your town is mostly mud.`),
  cost: [{specificity: RSP.EXACT, type: RTY.CLAY_MUDDY, quantity: 40},
    {specificity: RSP.EXACT, type: RTY.CLAY_BLUE, quantity: 10},
    {specificity: RSP.EXACT, type: RTY.CLAY_RICH, quantity: 10}],
  manditory: true
});

researchOptions[RESEARCH_OPTIONS.BRICK_VARIETY] = new ResearchOption({
  name: RESEARCH_OPTIONS.BRICK_VARIETY,
  appliesTo: RESEARCHES.GATE_EXPANSION_BRICKWORK,
  difficulty: 0,
  description: (`Mud bricks come easy but crumble quickly, brownstone bricks are strong but dense. You'll need a variety to expand your town's walls into the increasingly unstable sands.`),
  cost: [{specificity: RSP.EXACT, type: RTY.BRICKS_MUD, quantity: 200},
    {specificity: RSP.EXACT, type: RTY.BRICKS_SANDLIME, quantity: 50},
    {specificity: RSP.EXACT, type: RTY.BRICKS_SABLE, quantity: 50},
    {specificity: RSP.EXACT, type: RTY.BRICKS_RED, quantity: 50}],
  manditory: true
});

researchOptions[RESEARCH_OPTIONS.EXCESSIVE_NOTE_TAKING] = new ResearchOption({
  name: RESEARCH_OPTIONS.EXCESSIVE_NOTE_TAKING,
  appliesTo: RESEARCHES.FIELD_NOTES,
  difficulty: 1,
  description: ('Your notes will need to be thorough, yet readable. You do '
    + 'know your letters, although it\'s been a long time since you\'ve written. '
    + 'Better practice, and practice a lot.'),
  cost: [{specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 400},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, quantity: 20}],
  manditory: true
});

researchOptions[RESEARCH_OPTIONS.METAL_VARIETY] = new ResearchOption({
  name: RESEARCH_OPTIONS.METAL_VARIETY,
  appliesTo: RESEARCHES.GATE_EXPANSION_METAL_CLAD,
  difficulty: 1,
  description: (`By using a combination of sturdy metals, your town wall should stand up to any combination of dust storms and shifting sands. You'll need some metal powders to play around with the proportions.`),
  cost: [{specificity: RSP.EXACT, type: RTY.IRON_POWDER, quantity: 100},
    {specificity: RSP.EXACT, type: RTY.COPPER_POWDER, quantity: 60},
    {specificity: RSP.EXACT, type: RTY.TIN_POWDER, quantity: 20},
    {specificity: RSP.EXACT, type: RTY.ZINC_POWDER, quantity: 20}],
  manditory: true
});

researchOptions[RESEARCH_OPTIONS.WOOD_VARIETY] = new ResearchOption({
  name: RESEARCH_OPTIONS.WOOD_VARIETY,
  appliesTo: RESEARCHES.GATE_EXPANSION_METAL_CLAD,
  difficulty: 1,
  description: (`Although metal plating will be doing most of the work, you'll still need to identify the right kind of wood and the proper shape to support a more magnificent town wall.`),
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_EARTH, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.WOOD_OAK, quantity: 120},
    {specificity: RSP.EXACT, type: RTY.WOOD_ALDER, quantity: 120},
    {specificity: RSP.EXACT, type: RTY.WOOD_ROWAN, quantity: 120}],
  manditory: true
});

researchOptions[RESEARCH_OPTIONS.SYSTEMS_OF_KNOWLEDGE] = new ResearchOption({
  name: RESEARCH_OPTIONS.SYSTEMS_OF_KNOWLEDGE,
  appliesTo: RESEARCHES.SCHOLARSHIP,
  difficulty: 1,
  description: `To devise an effective improvement to your own research methods, you'll need potentially dizzying notes on your own process. You have a hunch that these could be found while researching, after upgrading the Study.`,
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_DIALECTIC, quantity: 1}],
  manditory: true
});

researchOptions[RESEARCH_OPTIONS.BRACHYGRAPHIC_SYMBOLS] = new ResearchOption({
  name: RESEARCH_OPTIONS.BRACHYGRAPHIC_SYMBOLS,
  appliesTo: RESEARCHES.BRACHYGRAPHY,
  difficulty: 2,
  description: `Your system of representative shortened sylables will need to be easily distinguished and intuitive.`,
  cost: [{specificity: RSP.CATEGORY, type: RCA.FIELD_NOTES, quantity: 2},
    {specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 800},
    {specificity: RSP.EXACT, type: RTY.INK_FERROUS, quantity: 40}],
  manditory: true
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
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_CULTIVATION, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.LENTIL, quantity: 200},
    {specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 100},
    {specificity: RSP.EXACT, type: RTY.OLIVE, quantity: 50}]
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
  cost: [{specificity: RSP.CATEGORY, type: RCA.FIELD_NOTES, quantity: 1},
    {specificity: RSP.CATEGORY, type: RCA.DISH, quantity: 400}]
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

researchOptions[RESEARCH_OPTIONS.CULINARY_INSIGHTS] = new ResearchOption({
  name: RESEARCH_OPTIONS.CULINARY_INSIGHTS,
  appliesTo: RESEARCHES.ANTHROPOLOGY,
  difficulty: 2,
  description: `It pays to have tiny bribes when interacting with other cultures, especially food and drink. And it must be shared correctly; it's far too easy to offer an accidental insult.`,
  cost: [{specificity: RSP.CATEGORY, type: RCA.FIELD_NOTES, quantity: 1},
    {specificity: RSP.SUBCATEGORY, type: RSC.SOUP, quantity: 100},
    {specificity: RSP.SUBCATEGORY, type: RSC.BREAD, quantity: 100},
    {specificity: RSP.SUBCATEGORY, type: RSC.PIE, quantity: 100}]
});

researchOptions[RESEARCH_OPTIONS.CURRENCY_IS_A_CONCEPT] = new ResearchOption({
  name: RESEARCH_OPTIONS.CURRENCY_IS_A_CONCEPT,
  appliesTo: RESEARCHES.ANTHROPOLOGY,
  difficulty: 2,
  description: `You've heard the Spring-Autumn Kingdom has a concept called "currency", whereby any goods can be excanged for small Jade Tokens. The practice seems bizarrely restrictive, but is worth a closer look.`,
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_EARTH, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.JADE_TOKEN, quantity: 10}]
});

researchOptions[RESEARCH_OPTIONS.WIDE_OPEN_SPACES] = new ResearchOption({
  name: RESEARCH_OPTIONS.WIDE_OPEN_SPACES,
  appliesTo: RESEARCHES.ANTHROPOLOGY,
  difficulty: 2,
  description: `The most difficult thing about bringing together travelers of various provenance is the ubiquitous preference for the open sky. There must be ways you can make your spaces feel more open and more relaxing to your visitors.`,
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_SKY, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 5000}]
});

researchOptions[RESEARCH_OPTIONS.LINGUISTIC_PROGRESSION] = new ResearchOption({
  name: RESEARCH_OPTIONS.LINGUISTIC_PROGRESSION,
  appliesTo: RESEARCHES.ANTHROPOLOGY,
  difficulty: 2,
  description: `You've made some progress in learning the myriad languages of the desert. But the sheer amount of regional dialects, colloquialisms, and differences in pronunciation is eye-watering. You've still got a lot of work to do.`,
  cost: [{specificity: RSP.CATEGORY, type: RCA.FIELD_NOTES, quantity: 1},
    { specificity: RSP.EXACT, type: RTY.PAPYRUS, quantity: 200 },
    { specificity: RSP.EXACT, type: RTY.INK_FERROUS, quantity: 10 }]
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
  description: (`The numbers that govern everything around you can be understood from deep observation. Since you began collating notes you've been seeing them wherever you look.`),
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
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_EARTH, quantity: 1},
    {specificity: RSP.SUBCATEGORY, type: RSC.CLAY, quantity: 400},
    {specificity: RSP.SUBCATEGORY, type: RSC.SAND, quantity: 400},
    {specificity: RSP.EXACT, type: RTY.WATER, quantity: 400}]
});

researchOptions[RESEARCH_OPTIONS.AIR_AND_FLOW] = new ResearchOption({
  name: RESEARCH_OPTIONS.AIR_AND_FLOW,
  appliesTo: RESEARCHES.PHYSICS,
  difficulty: 2,
  description: ('You\'ve observed that the flows of air and water are '
    + 'surprisingly similar in style, although different in speed. '
    + 'Understanding their differences may help you harness both more effectively.'),
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_WATER, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.WATER, quantity: 4000}]
});

researchOptions[RESEARCH_OPTIONS.MATERIAL_CONJUNCTION] = new ResearchOption({
  name: RESEARCH_OPTIONS.MATERIAL_CONJUNCTION,
  appliesTo: RESEARCHES.PHYSICS,
  difficulty: 2,
  description: ('Your building materials are less strong when different types meet: '
    + 'brick against wood is never as stable and brick against brick. There may be '
    + 'a way around this, and you know where to start.'),
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_HEAT, quantity: 1},
    {specificity: RSP.SUBCATEGORY, type: RSC.BRICK, quantity: 1000},
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
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_WATER, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.GRAIN, quantity: 200},
    {specificity: RSP.EXACT, type: RTY.WATER, quantity: 200}]
});

researchOptions[RESEARCH_OPTIONS.VENTILATION_OF_FLAME] = new ResearchOption({
  name: RESEARCH_OPTIONS.VENTILATION_OF_FLAME,
  appliesTo: RESEARCHES.CHEMISTRY,
  difficulty: 2,
  description: ('Making a fire as hot and concentrated as possible is more difficult '
    + 'than expected. It\'s all about fuel and airflow, but the fire itself '
    + 'creates its own updraft that throws everything off.'),
  cost: [{specificity: RSP.EXACT, type: RTY.NOTES_HEAT, quantity: 1},
    {specificity: RSP.EXACT, type: RTY.REEDS, quantity: 800},
    {specificity: RSP.EXACT, type: RTY.CHARCOAL, quantity: 40}]
});

researchOptions[RESEARCH_OPTIONS.BITTER_FUMES] = new ResearchOption({
  name: RESEARCH_OPTIONS.BITTER_FUMES,
  appliesTo: RESEARCHES.CHEMISTRY,
  difficulty: 2,
  description: ('You\'ve heard interesting things about a yellow-ish powder '
    + 'called sulfur, and the ways it can change solid objects into liquids '
    + 'with completely different properties. But it sure isn\'t pleasant '
    + 'to work with.'),
  cost: [{specificity: RSP.CATEGORY, type: RCA.FIELD_NOTES, quantity: 1},
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
  description: `Large portions of the Tome are outright painful reading. You eventually deduce the reason: the first five authors lived hundreds of years ago, when the language you speak was new. You have to work backwards, extrapolating the meaning of long dead words.`,
  cost: [{specificity: RSP.EXACT, type: RTY.KNOWLEDGE, quantity: 5555}]
});

researchOptions[RESEARCH_OPTIONS.THE_REDOLENCE_OF_VINES] = new ResearchOption({
  name: RESEARCH_OPTIONS.THE_REDOLENCE_OF_VINES,
  appliesTo: RESEARCHES.MYSTICISM,
  difficulty: 1,
  description: (`"The Redolance of Vines
constricts the earth, and bodies from air
are drawn beneath an immutable beat"`),
  cost: [{specificity: RSP.EXACT, type: RTY.REEDS , quantity: 7000},
    {specificity: RSP.EXACT, type: RTY.LENTIL , quantity: 5555},
    {specificity: RSP.EXACT, type: RTY.GRAIN , quantity: 4500},
    {specificity: RSP.EXACT, type: RTY.OLIVE , quantity: 1000},
    {specificity: RSP.EXACT, type: RTY.CLAY_RICH , quantity: 200}]
});

researchOptions[RESEARCH_OPTIONS.THE_SAVOR_OF_THE_VERDANT] = new ResearchOption({
  name: RESEARCH_OPTIONS.THE_SAVOR_OF_THE_VERDANT,
  appliesTo: RESEARCHES.MYSTICISM,
  difficulty: 1,
  description: (`"The Savor of the Verdant
pulls from time and tide the sun
through lands where moon is low"`),
  cost: [{specificity: RSP.EXACT, type: RTY.POTATO , quantity: 1500},
    {specificity: RSP.EXACT, type: RTY.ONION , quantity: 1500},
    {specificity: RSP.EXACT, type: RTY.BLUEBERRY , quantity: 300},
    {specificity: RSP.EXACT, type: RTY.TOMATO , quantity: 300}]
});

researchOptions[RESEARCH_OPTIONS.THE_GERMINATION_OF_PROMISE] = new ResearchOption({
  name: RESEARCH_OPTIONS.THE_GERMINATION_OF_PROMISE,
  appliesTo: RESEARCHES.MYSTICISM,
  difficulty: 1,
  description: (`"The Germination of Promise
rises from the secret heart
of the buried unborn"`),
  cost: [{specificity: RSP.EXACT, type: RTY.SEEDS_REED , quantity: 1800},
    {specificity: RSP.EXACT, type: RTY.SEEDS_LENTIL , quantity: 1400},
    {specificity: RSP.EXACT, type: RTY.SEEDS_GRAIN , quantity: 900},
    {specificity: RSP.EXACT, type: RTY.SEEDS_OLIVE , quantity: 700}]
});

researchOptions[RESEARCH_OPTIONS.THE_SCINTILLATION_OF_RINGS] = new ResearchOption({
  name: RESEARCH_OPTIONS.THE_SCINTILLATION_OF_RINGS,
  appliesTo: RESEARCHES.MYSTICISM,
  difficulty: 1,
  description: (`"The Scintillation of Rings
glitters downcast as flavor and ash
paper and acrid decay"`),
  cost: [{specificity: RSP.EXACT, type: RTY.SALT , quantity: 2800},
    {specificity: RSP.EXACT, type: RTY.CHARCOAL , quantity: 900},
    {specificity: RSP.EXACT, type: RTY.PAPYRUS , quantity: 555},
    {specificity: RSP.EXACT, type: RTY.SULFUR , quantity: 250}]
});

researchOptions[RESEARCH_OPTIONS.THE_EMINENCE_OF_SMOKE] = new ResearchOption({
  name: RESEARCH_OPTIONS.THE_EMINENCE_OF_SMOKE,
  appliesTo: RESEARCHES.MYSTICISM,
  difficulty: 1,
  description: (`"The Eminence of Smoke
demands your thought
blinded eye but opened foot"`),
  cost: [{specificity: RSP.EXACT, type: RTY.WOOD_ALDER , quantity: 1100},
    {specificity: RSP.EXACT, type: RTY.WOOD_OAK , quantity: 1100},
    {specificity: RSP.EXACT, type: RTY.WOOD_ROWAN , quantity: 1100},
    {specificity: RSP.EXACT, type: RTY.CHARCOAL , quantity: 900}]
});

researchOptions[RESEARCH_OPTIONS.THE_LEAPING_OF_THE_SILVER_CORDS] = new ResearchOption({
  name: RESEARCH_OPTIONS.THE_LEAPING_OF_THE_SILVER_CORDS,
  appliesTo: RESEARCHES.MYSTICISM,
  difficulty: 1,
  description: (`"The Leaping of the Silver Cords
through furrowed wave and seaward course
ply the way and trace the door"`),
  cost: [{specificity: RSP.EXACT, type: RTY.MINNOW , quantity: 230},
    {specificity: RSP.EXACT, type: RTY.MUSSEL , quantity: 1700},
    {specificity: RSP.EXACT, type: RTY.CARP , quantity: 700},
    {specificity: RSP.EXACT, type: RTY.WATER , quantity: 5555}]
});

researchOptions[RESEARCH_OPTIONS.THE_MURMURATION_OF_SHIFTING_DUNES] =
  new ResearchOption({
  name: RESEARCH_OPTIONS.THE_MURMURATION_OF_SHIFTING_DUNES,
  appliesTo: RESEARCHES.MYSTICISM,
  difficulty: 1,
  description: (`"The Murmuration of Shifting Dunes
purrs and sighs, highs and waves
stained with dust below our moons"`),
  cost: [{specificity: RSP.EXACT, type: RTY.SAND_YELLOW , quantity: 18000},
    {specificity: RSP.EXACT, type: RTY.SAND_OLIVINE , quantity: 14000},
    {specificity: RSP.EXACT, type: RTY.SAND_VOLCANIC , quantity: 14000},
    {specificity: RSP.EXACT, type: RTY.SAND_DUNE , quantity: 11000},
    {specificity: RSP.EXACT, type: RTY.SAND_BLACK , quantity: 555}]
});

researchOptions[RESEARCH_OPTIONS.THE_CONSEQUENCE_OF_PONDEROUS_EARTH] =
  new ResearchOption({
  name: RESEARCH_OPTIONS.THE_CONSEQUENCE_OF_PONDEROUS_EARTH,
  appliesTo: RESEARCHES.MYSTICISM,
  difficulty: 1,
  description: (`"The Consequence of Ponderous Earth
demands the flex of bended knee
for rounded spine and stifled breath"`),
  cost: [{specificity: RSP.EXACT, type: RTY.CLAY_MUDDY , quantity: 2500},
    {specificity: RSP.EXACT, type: RTY.CLAY_RED , quantity: 1600},
    {specificity: RSP.EXACT, type: RTY.CLAY_BLUE , quantity: 1200},
    {specificity: RSP.EXACT, type: RTY.CLAY_RICH , quantity: 900}]
});

researchOptions[RESEARCH_OPTIONS.THE_ABSTRACTION_OF_THE_INWARD_SPACE] =
  new ResearchOption({
  name: RESEARCH_OPTIONS.THE_ABSTRACTION_OF_THE_INWARD_SPACE,
  appliesTo: RESEARCHES.MYSTICISM,
  difficulty: 1,
  description: (`"The Abstraction of the Inward Space
removes the walls between the walls
and floors beneath its downward swirls"`),
  cost: [{specificity: RSP.EXACT, type: RTY.GLASS , quantity: 500},
    {specificity: RSP.EXACT, type: RTY.BRICKS_MUD , quantity: 1111},
    {specificity: RSP.EXACT, type: RTY.THATCH , quantity: 1400}]
});

researchOptions[RESEARCH_OPTIONS.THE_DIAPHONY_OF_THE_GOLDEN_SHEET] =
  new ResearchOption({
  name: RESEARCH_OPTIONS.THE_DIAPHONY_OF_THE_GOLDEN_SHEET,
  appliesTo: RESEARCHES.MYSTICISM,
  difficulty: 1,
  description: (`"The Diaphony of the Golden Sheet
is smooth within its floured curls
and lithely lissome opens stairs"`),
  cost: [{specificity: RSP.EXACT, type: RTY.GLASS , quantity: 500},
    {specificity: RSP.EXACT, type: RTY.BRICKS_MUD , quantity: 1111},
    {specificity: RSP.EXACT, type: RTY.THATCH , quantity: 1400}]
});

export { researchOptions };
