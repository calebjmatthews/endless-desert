import ResourceType from '../models/resource_type';
import Icon from '../models/icon';
import { RESOURCE_TYPES } from '../enums/resource_types';
const RTY = RESOURCE_TYPES;
import { RESOURCE_TAGS } from '../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
const RSC = RESOURCE_SUBCATEGORIES;
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
const RCA = RESOURCE_CATEGORIES;
import { EQUIPMENT_TYPES } from '../enums/equipment_types';
import { EQUIPMENT_SLOTS } from '../enums/equipment_slots';
import { SVGS } from '../enums/svgs';

let resourceTypes: { [name: string] : ResourceType } = {};

resourceTypes[RTY.KNOWLEDGE] = new ResourceType({
  name: RTY.KNOWLEDGE,
  category: RCA.ETHERIAL,
  tags: [RTA.MIND],
  value: 1,
  description: `The only currency you trade in`,
  icon: new Icon({provider: 'svg', name: SVGS.KNOWLEDGE})
});

resourceTypes[RTY.GLOAMING_LIGHT] = new ResourceType({
  name: RTY.GLOAMING_LIGHT,
  category: RCA.ETHERIAL,
  tags: [],
  value: 1000,
  description: `An entrancing light somehow trapped in a thin papyrus sphere`,
  icon: new Icon({provider: 'svg', name: SVGS.GLOAMING_LIGHT})
});

resourceTypes[RTY.RUMORS_LONG_ANTIQUITY] = new ResourceType({
  name: RTY.RUMORS_LONG_ANTIQUITY,
  category: RCA.ETHERIAL,
  subcategory: RSC.RUMORS,
  tags: [RTA.TRADE_GOOD],
  value: 800,
  description: `This part of the world has a long history; layers of dead heroes and ruined civilizations piled together like a midden`,
  icon: new Icon({provider: 'svg', name: SVGS.RUMORS_LONG_ANTIQUITY})
});

resourceTypes[RTY.RUMORS_ALL_RIVER_DELTA] = new ResourceType({
  name: RTY.RUMORS_ALL_RIVER_DELTA,
  category: RCA.ETHERIAL,
  subcategory: RSC.RUMORS,
  tags: [RTA.TRADE_GOOD],
  value: 800,
  description: `The All-River winds through this dry land, seasonal flooding leaving its banks flush with life`,
  icon: new Icon({provider: 'svg', name: SVGS.RUMORS_ALL_RIVER_DELTA})
});

resourceTypes[RTY.RUMORS_LARCENOUS_ACTIVITY] = new ResourceType({
  name: RTY.RUMORS_LARCENOUS_ACTIVITY,
  category: RCA.ETHERIAL,
  subcategory: RSC.RUMORS,
  tags: [RTA.TRADE_GOOD],
  value: 800,
  description: `The caves and ravines here are studded with thieves caches made by bands that no longer exist`,
  icon: new Icon({provider: 'svg', name: SVGS.RUMORS_LARCENOUS_ACTIVITY})
});

resourceTypes[RTY.RUMORS_NEAR_DESERT] = new ResourceType({
  name: RTY.RUMORS_NEAR_DESERT,
  category: RCA.ETHERIAL,
  subcategory: RSC.RUMORS,
  tags: [RTA.TRADE_GOOD],
  value: 800,
  description: `The desert near the deltas is markedly safer than the deeper reaches; this despite the sandstorms, bandits, wolves, and sudden opening of crevices`,
  icon: new Icon({provider: 'svg', name: SVGS.RUMORS_NEAR_DESERT})
});

resourceTypes[RTY.RUMORS_TRANSLOCATED_HALL] = new ResourceType({
  name: RTY.RUMORS_TRANSLOCATED_HALL,
  category: RCA.ETHERIAL,
  subcategory: RSC.RUMORS,
  tags: [RTA.TRADE_GOOD],
  value: 800,
  description: `Have you heard of The Hall, Home to All? With doors that stand in every land, and hearth-fire forever tall?`,
  icon: new Icon({provider: 'svg', name: SVGS.RUMORS_TRANSLOCATED_HALL})
});

resourceTypes[RTY.NOTES_SKY] = new ResourceType({
  name: RTY.NOTES_SKY,
  category: RCA.FIELD_NOTES,
  tags: [RTA.MIND],
  value: 10000,
  description: `The pale blue sky stretches wide, like a dreaming cat`,
  icon: new Icon({provider: 'svg', name: SVGS.NOTES_SKY})
});

resourceTypes[RTY.NOTES_STAR] = new ResourceType({
  name: RTY.NOTES_STAR,
  category: RCA.FIELD_NOTES,
  tags: [RTA.MIND],
  value: 10000,
  description: `In the deep sands, stars are your only navigation`,
  icon: new Icon({provider: 'svg', name: SVGS.NOTES_STAR})
});

resourceTypes[RTY.NOTES_WATER] = new ResourceType({
  name: RTY.NOTES_WATER,
  category: RCA.FIELD_NOTES,
  tags: [RTA.MIND],
  value: 10000,
  description: `Countless scribblings on flow and force`,
  icon: new Icon({provider: 'svg', name: SVGS.NOTES_WATER})
});

resourceTypes[RTY.NOTES_EARTH] = new ResourceType({
  name: RTY.NOTES_EARTH,
  category: RCA.FIELD_NOTES,
  tags: [RTA.MIND],
  value: 10000,
  description: `Clay, sand, and many hands to build with`,
  icon: new Icon({provider: 'svg', name: SVGS.NOTES_EARTH})
});

resourceTypes[RTY.NOTES_HEAT] = new ResourceType({
  name: RTY.NOTES_HEAT,
  category: RCA.FIELD_NOTES,
  tags: [RTA.MIND],
  value: 10000,
  description: `Detailed notes on your most constant companion`,
  icon: new Icon({provider: 'svg', name: SVGS.NOTES_HEAT})
});

resourceTypes[RTY.NOTES_CULTIVATION] = new ResourceType({
  name: RTY.NOTES_CULTIVATION,
  category: RCA.FIELD_NOTES,
  tags: [RTA.MIND],
  value: 10000,
  description: `With care, life can be nurtured in any land`,
  icon: new Icon({provider: 'svg', name: SVGS.NOTES_CULTIVATION})
});

resourceTypes[RTY.NOTES_DIALECTIC] = new ResourceType({
  name: RTY.NOTES_DIALECTIC,
  category: RCA.FIELD_NOTES,
  tags: [RTA.MIND],
  value: 15000,
  description: `Reading it makes your head spin, and you're the one who wrote it`,
  icon: new Icon({provider: 'svg', name: SVGS.NOTES_DIALECTIC})
});

resourceTypes[RTY.WATER] = new ResourceType({
  name: RTY.WATER,
  category: RCA.MATERIAL,
  subcategory: RSC.WATER,
  tags: [RTA.DRINK, RTA.INGREDIENT],
  value: 5,
  description: `The thin liquid tether connecting you to life`,
  icon: new Icon({provider: 'svg', name: SVGS.DROP, color: '#28aae1',
    shadow: '#2887c3', secondaryColor: '#aaebf0'})
});

resourceTypes[RTY.BRINE] = new ResourceType({
  name: RTY.BRINE,
  category: RCA.MATERIAL,
  subcategory: RSC.WATER,
  tags: [RTA.TRADE_GOOD, RTA.BRACKISH],
  value: 10,
  description: `A concentrated form of salty water, pulled from the sea`,
  icon: new Icon({provider: 'svg', name: SVGS.DROP, color: '#23b39b',
    shadow: '#1b8f7c', secondaryColor: '#68ddc9'})
});

resourceTypes[RTY.ICE] = new ResourceType({
  name: RTY.ICE,
  category: RCA.MATERIAL,
  subcategory: RSC.WATER,
  tags: [RTA.TRADE_GOOD, RTA.INGREDIENT, RTA.COOLING],
  value: 400,
  description: `In the desert heat ice is an incredible luxury`,
  icon: new Icon({provider: 'svg', name: SVGS.ICE})
});

resourceTypes[RTY.LENTIL] = new ResourceType({
  name: RTY.LENTIL,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.FOOD, RTA.INGREDIENT],
  value: 6,
  description: `Dry, dull, sustaining, and unlike many crops can be eaten raw`,
  icon: new Icon({provider: 'svg', name: SVGS.LENTIL, color: '#a0ddb0',
    shadow: '#5bc980'})
});

resourceTypes[RTY.GRAPE] = new ResourceType({
  name: RTY.GRAPE,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.FRUIT, RTA.COOLING],
  value: 40,
  description: `Beloved by winemakers across the world`,
  icon: new Icon({provider: 'svg', name: SVGS.GRAPE, color: "#be4dd8",
    shadow: "#7a3db4"})
});

resourceTypes[RTY.BLUEBERRY] = new ResourceType({
  name: RTY.BLUEBERRY,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.FRUIT, RTA.COOLING],
  value: 200,
  description: `Cool and juicy`,
  icon: new Icon({provider: 'svg', name: SVGS.BLUEBERRY, color: "#888fe6",
    shadow: "#6e6ed9"})
});

resourceTypes[RTY.SQUASH] = new ResourceType({
  name: RTY.SQUASH,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.SAVORY],
  value: 40,
  description: `Hard, but hearty when cooked`,
  icon: new Icon({provider: 'svg', name: SVGS.SQUASH, color: "#F9963B",
    shadow: "#EB7330"})
});

resourceTypes[RTY.TOMATO] = new ResourceType({
  name: RTY.TOMATO,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.FRUIT, RTA.SAVORY],
  value: 200,
  description: `Red, glossy, and full of savory flavor`,
  icon: new Icon({provider: 'svg', name: SVGS.TOMATO, color: "#FF4800",
    shadow: "#C92B00"})
});

resourceTypes[RTY.KUMQUAT] = new ResourceType({
  name: RTY.KUMQUAT,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.FRUIT, RTA.SOUR],
  value: 40,
  description: `An adorable sour fruit`,
  icon: new Icon({provider: 'svg', name: SVGS.KUMQUAT, color: "#ffc34d",
    shadow: "#f93"})
});

resourceTypes[RTY.LEMON] = new ResourceType({
  name: RTY.LEMON,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.FRUIT, RTA.SOUR],
  value: 200,
  description: `A spash of lemon juice gives depth to many dishes`,
  icon: new Icon({provider: 'svg', name: SVGS.LEMON, color: "#ffd400",
    shadow: "#fdbf00"})
});

resourceTypes[RTY.SPINACH] = new ResourceType({
  name: RTY.SPINACH,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.BITTER],
  value: 40,
  description: `A nutritious leafy green with a bitter bite`,
  icon: new Icon({provider: 'svg', name: SVGS.SPINACH, color: "#73ca7a",
    shadow: "#5fa794"})
});

resourceTypes[RTY.RADISH] = new ResourceType({
  name: RTY.RADISH,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.BITTER],
  value: 200,
  description: `A powerful flavor, but wonderfully crunchy`,
  icon: new Icon({provider: 'svg', name: SVGS.RADISH, color: "#ce3858",
    shadow: "#c3d9ea"})
});

resourceTypes[RTY.ONION] = new ResourceType({
  name: RTY.ONION,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.SPICY],
  value: 40,
  description: `Simmering in oil produces a delicious aroma`,
  icon: new Icon({provider: 'svg', name: SVGS.ONION, color: "#feb9a1",
    shadow: "#f99380"})
});

resourceTypes[RTY.CHILLI_PEPPER] = new ResourceType({
  name: RTY.CHILLI_PEPPER,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.SPICY],
  value: 200,
  description: `Colorful and full of pungent heat`,
  icon: new Icon({provider: 'svg', name: SVGS.CHILLI_PEPPER, color: "#E5104D",
    shadow: "#FF475A"})
});

resourceTypes[RTY.POTATO] = new ResourceType({
  name: RTY.POTATO,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.BRACKISH],
  value: 40,
  description: `Easy to grow, starchy, and delicious when fried`,
  icon: new Icon({provider: 'svg', name: SVGS.POTATO, color: "#d19a75",
    shadow: "#b2705b"})
});

resourceTypes[RTY.LOTUS_ROOT] = new ResourceType({
  name: RTY.LOTUS_ROOT,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.BRACKISH],
  value: 200,
  description: `Despite the rumors, these induce neither deep sleep nor eternal life`,
  icon: new Icon({provider: 'svg', name: SVGS.LOTUS_ROOT, color: "#ffd2fe",
    shadow: "#ffb6fa"})
});

resourceTypes[RTY.DATE] = new ResourceType({
  name: RTY.DATE,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.FRUIT, RTA.SWEET],
  value: 40,
  description: `Heavy, rich, and sweet`,
  icon: new Icon({provider: 'svg', name: SVGS.DATE, color: "#995c5c",
    shadow: "#804040"})
});

resourceTypes[RTY.FIG] = new ResourceType({
  name: RTY.FIG,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.FRUIT, RTA.SWEET],
  value: 200,
  description: `Tangy-sweet and full of tiny, crunchy seeds`,
  icon: new Icon({provider: 'svg', name: SVGS.FIG, color: "#ff4d4d",
    shadow: "#8066ff"})
});

resourceTypes[RTY.TEA_LEAVES_CELADON] = new ResourceType({
  name: RTY.TEA_LEAVES_CELADON,
  category: RCA.MATERIAL,
  subcategory: RSC.TEA_LEAVES,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD],
  value: 20,
  description: `A commonly found tea leaf with a simple flavor`,
  icon: new Icon({provider: 'svg', name: SVGS.TEA_LEAVES, color: '#7bb344',
    shadow: '#5e932b'})
});

resourceTypes[RTY.TEA_LEAVES_VIRIDIAN] = new ResourceType({
  name: RTY.TEA_LEAVES_VIRIDIAN,
  category: RCA.MATERIAL,
  subcategory: RSC.TEA_LEAVES,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD],
  value: 56,
  description: `A deep blue-green tea leaf grown on grassy islands`,
  icon: new Icon({provider: 'svg', name: SVGS.TEA_LEAVES, color: '#10b78b',
    shadow: '#028361'})
});

resourceTypes[RTY.TEA_LEAVES_JASMINE] = new ResourceType({
  name: RTY.TEA_LEAVES_JASMINE,
  category: RCA.MATERIAL,
  subcategory: RSC.TEA_LEAVES,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD],
  value: 136,
  description: `A blush-shaded leaf with a delicious aroma`,
  icon: new Icon({provider: 'svg', name: SVGS.TEA_LEAVES, color: '#e8cad7',
    shadow: '#4caf50'})
});

resourceTypes[RTY.REEDS] = new ResourceType({
  name: RTY.REEDS,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.CONSTRUCTION, RTA.FUEL],
  value: 4,
  description: `For roofing, fabric, fuel, papyrus, etc, etc`,
  icon: new Icon({provider: 'svg', name: SVGS.REEDS})
});

resourceTypes[RTY.GRAIN] = new ResourceType({
  name: RTY.GRAIN,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP],
  value: 8,
  description: `Grind it and bake it, or wet it down and wait`,
  icon: new Icon({provider: 'svg', name: SVGS.GRAIN})
});

resourceTypes[RTY.OLIVE] = new ResourceType({
  name: RTY.OLIVE,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP],
  value: 28,
  description: `Can be pressed into a lovely rich oil`,
  icon: new Icon({provider: 'svg', name: SVGS.OLIVE})
});

resourceTypes[RTY.SEEDS_LENTIL] = new ResourceType({
  name: RTY.SEEDS_LENTIL,
  category: RCA.MATERIAL,
  subcategory: RSC.SEEDS,
  tags: [RTA.INGREDIENT, RTA.TRADE_GOOD],
  value: 40,
  description: `Lentils grow quickly and easily`,
  icon: new Icon({provider: 'svg', name: SVGS.SEEDS, color: '#a0ddb0',
    shadow: '#5bc980'})
});

resourceTypes[RTY.SEEDS_REED] = new ResourceType({
  name: RTY.SEEDS_REED,
  category: RCA.MATERIAL,
  subcategory: RSC.SEEDS,
  tags: [RTA.INGREDIENT, RTA.TRADE_GOOD],
  value: 30,
  description: `Plant them in muddy river-soil`,
  icon: new Icon({provider: 'svg', name: SVGS.SEEDS, color: '#9d4639',
    shadow: '#78281e'})
});

resourceTypes[RTY.SEEDS_OLIVE] = new ResourceType({
  name: RTY.SEEDS_OLIVE,
  category: RCA.MATERIAL,
  subcategory: RSC.SEEDS,
  tags: [RTA.INGREDIENT, RTA.TRADE_GOOD],
  value: 80,
  description: `Olive trees need constant water and gentle care`,
  icon: new Icon({provider: 'svg', name: SVGS.SEEDS, color: '#d2d02c',
    shadow: '#b5b424'})
});

resourceTypes[RTY.SEEDS_GRAIN] = new ResourceType({
  name: RTY.SEEDS_GRAIN,
  category: RCA.MATERIAL,
  subcategory: RSC.SEEDS,
  tags: [RTA.INGREDIENT, RTA.TRADE_GOOD],
  value: 60,
  description: `Grain requires significant water, but produces abundantly`,
  icon: new Icon({provider: 'svg', name: SVGS.SEEDS, color: '#fbd856',
    shadow: '#ef8246'})
});

resourceTypes[RTY.FLOUR] = new ResourceType({
  name: RTY.FLOUR,
  category: RCA.ARTISAN_GOOD,
  tags: [RTA.POWDER, RTA.INGREDIENT],
  value: 12,
  description: `A wonderfully versatile starch made from grinding grain`,
  icon: new Icon({provider: 'svg', name: SVGS.FLOUR, color: '#f4da90',
    shadow: '#e7aa60'})
});

resourceTypes[RTY.MUSSEL] = new ResourceType({
  name: RTY.MUSSEL,
  category: RCA.MATERIAL,
  subcategory: RSC.FISH,
  tags: [RTA.ANIMAL, RTA.FOOD, RTA.INGREDIENT],
  value: 12,
  description: `These mollusks should be eaten fresh, while they still taste like the distant sea`,
  icon: new Icon({provider: 'svg', name: SVGS.MUSSEL, color: '#FF5023',
    shadow: '#57565C'})
});

resourceTypes[RTY.MINNOW] = new ResourceType({
  name: RTY.MINNOW,
  category: RCA.MATERIAL,
  subcategory: RSC.FISH,
  tags: [RTA.ANIMAL, RTA.INGREDIENT],
  value: 14,
  description: `Tiny, abundant fish that glint in the sunlight`,
  icon: new Icon({provider: 'svg', name: SVGS.MINNOW, color: '#f9d43a',
    shadow: '#f9993a'})
});

resourceTypes[RTY.CARP] = new ResourceType({
  name: RTY.CARP,
  category: RCA.MATERIAL,
  subcategory: RSC.FISH,
  tags: [RTA.ANIMAL, RTA.INGREDIENT],
  value: 80,
  description: `Tough, and willing to eat almost anything`,
  icon: new Icon({provider: 'svg', name: SVGS.CARP, color: '#ff7459',
    shadow: '#d9472b'})
});

resourceTypes[RTY.BARRAMUNDI] = new ResourceType({
  name: RTY.BARRAMUNDI,
  category: RCA.MATERIAL,
  subcategory: RSC.FISH,
  tags: [RTA.ANIMAL, RTA.INGREDIENT],
  value: 100,
  description: `Enormous river fish that are a difficult catch`,
  icon: new Icon({provider: 'svg', name: SVGS.BARRAMUNDI, color: '#39a3db',
    shadow: '#4881c2'})
});

resourceTypes[RTY.QUAIL] = new ResourceType({
  name: RTY.QUAIL,
  category: RCA.MATERIAL,
  subcategory: RSC.ANIMAL,
  tags: [RTA.ANIMAL],
  value: 50,
  description: `Small docile birds that frolic in the dawn and dusk`,
  icon: new Icon({provider: 'svg', name: SVGS.QUAIL})
});

resourceTypes[RTY.QUAIL_MEAT] = new ResourceType({
  name: RTY.QUAIL_MEAT,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.ANIMAL,
  tags: [RTA.ANIMAL, RTA.INGREDIENT],
  value: 60,
  description: `Sweet, mild meat from a quail`,
  icon: new Icon({provider: 'svg', name: SVGS.QUAIL_MEAT, color: '#9a4c00',
    shadow: '#723700'})
});

resourceTypes[RTY.EGG] = new ResourceType({
  name: RTY.EGG,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.ANIMAL,
  tags: [RTA.ANIMAL, RTA.INGREDIENT],
  value: 12,
  description: `Rich yolk in a crackling shell`,
  icon: new Icon({provider: 'svg', name: SVGS.EGG, color: '#ffd200',
    shadow: '#ffd200'})
});

resourceTypes[RTY.FERTILIZER] = new ResourceType({
  name: RTY.FERTILIZER,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.ANIMAL,
  tags: [RTA.ANIMAL],
  value: 10,
  description: `An unpleasant (but useful) consequence of tending animals`,
  icon: new Icon({provider: 'svg', name: SVGS.FERTILIZER})
});

resourceTypes[RTY.AUROCH] = new ResourceType({
  name: RTY.AUROCH,
  category: RCA.MATERIAL,
  subcategory: RSC.ANIMAL,
  tags: [RTA.ANIMAL],
  value: 120,
  description: `Auroch are slow growing, but their meat and milk are prized`,
  icon: new Icon({provider: 'svg', name: SVGS.AUROCH})
});

resourceTypes[RTY.AUROCH_MEAT] = new ResourceType({
  name: RTY.AUROCH_MEAT,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.ANIMAL,
  tags: [RTA.ANIMAL, RTA.INGREDIENT],
  value: 80,
  description: `Marbled red meat from an auroch, excellent when roasted over a fire`,
  icon: new Icon({provider: 'svg', name: SVGS.AUROCH_MEAT, color: '#86000f',
    shadow: '#70000a'})
});

resourceTypes[RTY.MILK] = new ResourceType({
  name: RTY.MILK,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.ANIMAL,
  tags: [RTA.ANIMAL, RTA.INGREDIENT],
  value: 32,
  description: `Rich, creamy milk used in a variety of dishes`,
  icon: new Icon({provider: 'svg', name: SVGS.MILK, color: '#eee',
    shadow: '#bbb'})
});

resourceTypes[RTY.FLEECE] = new ResourceType({
  name: RTY.FLEECE,
  category: RCA.MATERIAL,
  subcategory: RSC.ANIMAL,
  tags: [RTA.ANIMAL, RTA.TRADE_GOOD],
  value: 400,
  description: `The fluffy, unprocessed coat of a sheep`,
  icon: new Icon({provider: 'svg', name: SVGS.FLEECE})
});

resourceTypes[RTY.SILKWORM_COCOON] = new ResourceType({
  name: RTY.SILKWORM_COCOON,
  category: RCA.MATERIAL,
  subcategory: RSC.ANIMAL,
  tags: [RTA.ANIMAL, RTA.TRADE_GOOD],
  value: 200,
  description: `Can be boiled and weaved to produce a soft, smooth fabric beyond compare`,
  icon: new Icon({provider: 'svg', name: SVGS.SILKWORM_COCOON})
});

resourceTypes[RTY.WOOD_OAK] = new ResourceType({
  name: RTY.WOOD_OAK,
  category: RCA.MATERIAL,
  subcategory: RSC.WOOD,
  tags: [RTA.CONSTRUCTION, RTA.TRADE_GOOD, RTA.BITTER],
  value: 50,
  description: `Handsome brown wood from a handsome brown tree`,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#9b6e42',
    shadow: '#825a3a', secondaryColor: '#f3d488', secondaryShadow: '#daae90'})
});

resourceTypes[RTY.WOOD_ROWAN] = new ResourceType({
  name: RTY.WOOD_ROWAN,
  category: RCA.MATERIAL,
  subcategory: RSC.WOOD,
  tags: [RTA.CONSTRUCTION, RTA.TRADE_GOOD, RTA.HERBAL],
  value: 50,
  description: `Comes from trees crowned with shining red berries`,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#95a53c',
    shadow: '#7c822b', secondaryColor: '#a0775b', secondaryShadow: '#5f4c42'})
});

resourceTypes[RTY.WOOD_WALNUT] = new ResourceType({
  name: RTY.WOOD_WALNUT,
  category: RCA.MATERIAL,
  subcategory: RSC.WOOD,
  tags: [RTA.CONSTRUCTION, RTA.TRADE_GOOD, RTA.SOUR],
  value: 50,
  description: `Dense, hard, and dark colored`,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#927150',
    shadow: '#c1a086', secondaryColor: '#3c2613', secondaryShadow: '#a7897a'})
});

resourceTypes[RTY.WOOD_ALDER] = new ResourceType({
  name: RTY.WOOD_ALDER,
  category: RCA.MATERIAL,
  subcategory: RSC.WOOD,
  tags: [RTA.CONSTRUCTION, RTA.TRADE_GOOD, RTA.SPICY],
  value: 50,
  description: `Soft and pliable, from trees found near streams`,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#a5104e',
    shadow: '#800437', secondaryColor: '#d85454', secondaryShadow: '#c13636'})
});

resourceTypes[RTY.WOOD_MAPLE] = new ResourceType({
  name: RTY.WOOD_MAPLE,
  category: RCA.MATERIAL,
  subcategory: RSC.WOOD,
  tags: [RTA.CONSTRUCTION, RTA.TRADE_GOOD, RTA.SWEET],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#bf7229',
    shadow: '#ad6043', secondaryColor: '#ffb581', secondaryShadow: '#de805c'})
});

resourceTypes[RTY.WOOD_WILLOW] = new ResourceType({
  name: RTY.WOOD_WILLOW,
  category: RCA.MATERIAL,
  subcategory: RSC.WOOD,
  tags: [RTA.CONSTRUCTION, RTA.TRADE_GOOD, RTA.BRACKISH],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#e87b7b',
    shadow: '#d66464', secondaryColor: '#ffb7b7', secondaryShadow: '#ff8e8e'})
});

resourceTypes[RTY.WOOD_ASH] = new ResourceType({
  name: RTY.WOOD_ASH,
  category: RCA.MATERIAL,
  subcategory: RSC.WOOD,
  tags: [RTA.CONSTRUCTION, RTA.TRADE_GOOD, RTA.SAVORY],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#daa86b',
    shadow: '#865e2e', secondaryColor: '#ffcd8f', secondaryShadow: '#b58e5f'})
});

resourceTypes[RTY.WOOD_SPRUCE] = new ResourceType({
  name: RTY.WOOD_SPRUCE,
  category: RCA.MATERIAL,
  subcategory: RSC.WOOD,
  tags: [RTA.CONSTRUCTION, RTA.TRADE_GOOD, RTA.COOLING],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#4a2c00',
    shadow: '#271700', secondaryColor: '#905600', secondaryShadow: '#653c00'})
});

resourceTypes[RTY.CLAY_MUDDY] = new ResourceType({
  name: RTY.CLAY_MUDDY,
  category: RCA.MATERIAL,
  subcategory: RSC.CLAY,
  tags: [RTA.EARTH],
  value: 12,
  icon: new Icon({provider: 'svg', name: SVGS.CLAY, color: '#a06363',
    shadow: '#754646'})
});

resourceTypes[RTY.CLAY_RICH] = new ResourceType({
  name: RTY.CLAY_RICH,
  category: RCA.MATERIAL,
  subcategory: RSC.CLAY,
  tags: [RTA.EARTH, RTA.TRADE_GOOD],
  value: 60,
  icon: new Icon({provider: 'svg', name: SVGS.CLAY, color: '#5d2d00',
    shadow: '#2d1600'})
});

resourceTypes[RTY.CLAY_RED] = new ResourceType({
  name: RTY.CLAY_RED,
  category: RCA.MATERIAL,
  subcategory: RSC.CLAY,
  tags: [RTA.EARTH, RTA.TRADE_GOOD],
  value: 35,
  icon: new Icon({provider: 'svg', name: SVGS.CLAY, color: '#a91f1f',
    shadow: '#6f1b1b'})
});

resourceTypes[RTY.CLAY_BLUE] = new ResourceType({
  name: RTY.CLAY_BLUE,
  category: RCA.MATERIAL,
  subcategory: RSC.CLAY,
  tags: [RTA.EARTH, RTA.TRADE_GOOD],
  value: 45,
  icon: new Icon({provider: 'svg', name: SVGS.CLAY, color: '#9cb0d2',
    shadow: '#818ea2'})
});

resourceTypes[RTY.CLAY_KAOLIN] = new ResourceType({
  name: RTY.CLAY_KAOLIN,
  category: RCA.MATERIAL,
  subcategory: RSC.CLAY,
  tags: [RTA.EARTH, RTA.TRADE_GOOD],
  value: 840,
  icon: new Icon({provider: 'svg', name: SVGS.CLAY, color: '#f7e0c5',
    shadow: '#d6bfa4'})
});

resourceTypes[RTY.BRICKS_MUD] = new ResourceType({
  name: RTY.BRICKS_MUD,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.BRICK,
  tags: [RTA.DRIED, RTA.CONSTRUCTION],
  value: 22,
  description: `Simple mud bricks, neither especially strong nor beautiful`,
  icon: new Icon({provider: 'svg', name: SVGS.BRICK, color: '#674648',
    shadow: '#50392d', secondaryColor: '#845d59'})
});

resourceTypes[RTY.BRICKS_SABLE] = new ResourceType({
  name: RTY.BRICKS_SABLE,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.BRICK,
  tags: [RTA.DRIED, RTA.CONSTRUCTION],
  value: 120,
  description: `Dark bricks that gleam with a smooth sheen`,
  icon: new Icon({provider: 'svg', name: SVGS.BRICK, color: '#422c18',
    shadow: '#16002d', secondaryColor: '#a99d8e'})
});

resourceTypes[RTY.BRICKS_RED] = new ResourceType({
  name: RTY.BRICKS_RED,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.BRICK,
  tags: [RTA.DRIED, RTA.CONSTRUCTION],
  value: 100,
  description: `Handsome, classic crimson bricks`,
  icon: new Icon({provider: 'svg', name: SVGS.BRICK, color: '#a91f1f',
    shadow: '#6f1b1b', secondaryColor: '#de6363'})
});

resourceTypes[RTY.BRICKS_SANDLIME] = new ResourceType({
  name: RTY.BRICKS_SANDLIME,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.BRICK,
  tags: [RTA.DRIED, RTA.CONSTRUCTION],
  value: 80,
  description: `Blue-grey bricks that feel cool in the sun's heat, but tend to crumble`,
  icon: new Icon({provider: 'svg', name: SVGS.BRICK, color: '#9cb0d2',
    shadow: '#818ea2', secondaryColor: '#ccd6ff'})
});

resourceTypes[RTY.BRICKS_SHINING] = new ResourceType({
  name: RTY.BRICKS_SHINING,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.BRICK,
  tags: [RTA.DRIED, RTA.CONSTRUCTION],
  value: 860,
  description: `Beautiful glimmering bricks that can be seen from a horizon away`,
  icon: new Icon({provider: 'svg', name: SVGS.BRICK, color: '#f7e0c5',
    shadow: '#d6bfa4', secondaryColor: '#fffaf7'})
});

resourceTypes[RTY.THATCH] = new ResourceType({
  name: RTY.THATCH,
  category: RCA.MATERIAL_REFINED,
  tags: [RTA.DRIED, RTA.CONSTRUCTION],
  value: 8,
  icon: new Icon({provider: 'svg', name: SVGS.THATCH})
});

resourceTypes[RTY.SAND_YELLOW] = new ResourceType({
  name: RTY.SAND_YELLOW,
  category: RCA.MATERIAL,
  subcategory: RSC.SAND,
  tags: [RTA.EARTH, RTA.SAVORY],
  value: 2,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#f3d98f',
    shadow: '#e6a960'})
});

resourceTypes[RTY.SAND_DUNE] = new ResourceType({
  name: RTY.SAND_DUNE,
  category: RCA.MATERIAL,
  subcategory: RSC.SAND,
  tags: [RTA.EARTH, RTA.SWEET, RTA.TRADE_GOOD],
  value: 5,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#f9c29e',
    shadow: '#c79573'})
});

resourceTypes[RTY.SAND_PALE] = new ResourceType({
  name: RTY.SAND_PALE,
  category: RCA.MATERIAL,
  subcategory: RSC.SAND,
  tags: [RTA.EARTH, RTA.COOLING, RTA.TRADE_GOOD],
  value: 6,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#d6d8dc',
    shadow: '#afbad0'})
});

resourceTypes[RTY.SAND_VOLCANIC] = new ResourceType({
  name: RTY.SAND_VOLCANIC,
  category: RCA.MATERIAL,
  subcategory: RSC.SAND,
  tags: [RTA.EARTH, RTA.SPICY, RTA.TRADE_GOOD],
  value: 4,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#866262',
    shadow: '#6f3a3a'})
});

resourceTypes[RTY.SAND_CORAL] = new ResourceType({
  name: RTY.SAND_CORAL,
  category: RCA.MATERIAL,
  subcategory: RSC.SAND,
  tags: [RTA.EARTH, RTA.BRACKISH, RTA.TRADE_GOOD],
  value: 5,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#e24242',
    shadow: '#bd3b3b'})
});

resourceTypes[RTY.SAND_OLIVINE] = new ResourceType({
  name: RTY.SAND_OLIVINE,
  category: RCA.MATERIAL,
  subcategory: RSC.SAND,
  tags: [RTA.EARTH, RTA.HERBAL, RTA.TRADE_GOOD],
  value: 4,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#579e0f',
    shadow: '#507926'})
});

resourceTypes[RTY.SAND_BLACK] = new ResourceType({
  name: RTY.SAND_BLACK,
  category: RCA.MATERIAL,
  subcategory: RSC.SAND,
  tags: [RTA.EARTH, RTA.BITTER],
  value: 6,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#564409',
    shadow: '#1f1801'})
});

resourceTypes[RTY.SAND_OCHRE] = new ResourceType({
  name: RTY.SAND_OCHRE,
  category: RCA.MATERIAL,
  subcategory: RSC.SAND,
  tags: [RTA.EARTH, RTA.SOUR, RTA.TRADE_GOOD],
  value: 6,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#f9873e',
    shadow: '#ce6b2d'})
});

resourceTypes[RTY.SAND_PURE] = new ResourceType({
  name: RTY.SAND_PURE,
  category: RCA.MATERIAL,
  subcategory: RSC.SAND,
  tags: [RTA.EARTH],
  value: 20,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#fff0c6',
    shadow: '#f5d698'})
});

resourceTypes[RTY.CHARCOAL] = new ResourceType({
  name: RTY.CHARCOAL,
  category: RCA.MATERIAL_REFINED,
  tags: [RTA.SMELTED, RTA.FUEL, RTA.FUEL_POTENT],
  value: 60,
  icon: new Icon({provider: 'svg', name: SVGS.CHARCOAL})
});

resourceTypes[RTY.CARBON] = new ResourceType({
  name: RTY.CARBON,
  category: RCA.MATERIAL_REFINED,
  tags: [RTA.POWDER],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.CARBON})
});

resourceTypes[RTY.RUST_ORE] = new ResourceType({
  name: RTY.RUST_ORE,
  category: RCA.MATERIAL,
  subcategory: RSC.ORE,
  tags: [RTA.TRADE_GOOD],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.ORE, color: '#880000',
    shadow: '#b33c3c', secondaryColor: '#2b1010', secondaryShadow: '#564446'})
});

resourceTypes[RTY.IRON_POWDER] = new ResourceType({
  name: RTY.IRON_POWDER,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.METAL_POWDER,
  tags: [RTA.POWDER],
  value: 350,
  icon: new Icon({provider: 'svg', name: SVGS.POWDER, color: '#4d4d4d',
    shadow: '#333', secondaryColor: '#666'})
});

resourceTypes[RTY.CRUDE_IRON] = new ResourceType({
  name: RTY.CRUDE_IRON,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.METAL_INGOT,
  tags: [RTA.SMELTED],
  value: 400,
  icon: new Icon({provider: 'svg', name: SVGS.BAR, color: '#4d4d4d',
    shadow: '#333', secondaryColor: '#666'})
});

resourceTypes[RTY.GREENISH_ORE] = new ResourceType({
  name: RTY.GREENISH_ORE,
  category: RCA.MATERIAL,
  subcategory: RSC.ORE,
  tags: [RTA.TRADE_GOOD],
  value: 600,
  icon: new Icon({provider: 'svg', name: SVGS.ORE, color: '#227b67',
    shadow: '#3f948a', secondaryColor: '#ad5f27', secondaryShadow: '#b5795b'})
});

resourceTypes[RTY.COPPER_POWDER] = new ResourceType({
  name: RTY.COPPER_POWDER,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.METAL_POWDER,
  tags: [RTA.POWDER],
  value: 1100,
  icon: new Icon({provider: 'svg', name: SVGS.POWDER, color: '#ff7f22',
    shadow: '#d66224', secondaryColor: '#ffa575'})
});

resourceTypes[RTY.DUSTY_ORE] = new ResourceType({
  name: RTY.DUSTY_ORE,
  category: RCA.MATERIAL,
  subcategory: RSC.ORE,
  tags: [RTA.TRADE_GOOD],
  value: 400,
  icon: new Icon({provider: 'svg', name: SVGS.ORE, color: '#61676d',
    shadow: '#4b4b65', secondaryColor: '#758da2', secondaryShadow: '#94a2bd'})
});

resourceTypes[RTY.TIN_POWDER] = new ResourceType({
  name: RTY.TIN_POWDER,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.METAL_POWDER,
  tags: [RTA.POWDER],
  value: 650,
  icon: new Icon({provider: 'svg', name: SVGS.POWDER, color: '#94a2bd',
    shadow: '#758da2', secondaryColor: '#b9c0ef'})
});

resourceTypes[RTY.BRONZE] = new ResourceType({
  name: RTY.BRONZE,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.METAL_INGOT,
  tags: [RTA.SMELTED],
  value: 1100,
  icon: new Icon({provider: 'svg', name: SVGS.BAR, color: '#ce6112',
    shadow: '#a94e23', secondaryColor: '#d87444'})
});

resourceTypes[RTY.PALE_ORE] = new ResourceType({
  name: RTY.PALE_ORE,
  category: RCA.MATERIAL,
  subcategory: RSC.ORE,
  tags: [RTA.TRADE_GOOD],
  value: 350,
  icon: new Icon({provider: 'svg', name: SVGS.ORE, color: '#9f9ab5',
    shadow: '#797388', secondaryColor: '#cfcfe2', secondaryShadow: '#f3f3f3'})
});

resourceTypes[RTY.ZINC_POWDER] = new ResourceType({
  name: RTY.ZINC_POWDER,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.METAL_POWDER,
  tags: [RTA.POWDER],
  value: 620,
  icon: new Icon({provider: 'svg', name: SVGS.POWDER, color: '#ebe9f3',
    shadow: '#cfcfe2', secondaryColor: '#fff'})
});

resourceTypes[RTY.SULFUR] = new ResourceType({
  name: RTY.SULFUR,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.METAL_POWDER,
  tags: [RTA.POWDER],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.POWDER, color: '#e8f900',
    shadow: '#abb500', secondaryColor: '#faffa1'})
});

resourceTypes[RTY.BRASS] = new ResourceType({
  name: RTY.BRASS,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.METAL_INGOT,
  tags: [RTA.SMELTED],
  value: 880,
  icon: new Icon({provider: 'svg', name: SVGS.BAR, color: '#ff9825',
    shadow: '#e06900', secondaryColor: '#ffbc81'})
});

resourceTypes[RTY.STEEL] = new ResourceType({
  name: RTY.STEEL,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.METAL_INGOT,
  tags: [RTA.SMELTED],
  value: 2000,
  icon: new Icon({provider: 'svg', name: SVGS.BAR, color: '#8ea2d8',
    shadow: '#444b6b', secondaryColor: '#b1b9e4'})
});

resourceTypes[RTY.CORAL_BRANCH] = new ResourceType({
  name: RTY.CORAL_BRANCH,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS],
  value: 62,
  description: `Often unintentionally pulled up by fishing nets`,
  icon: new Icon({provider: 'svg', name: SVGS.CORAL})
});

resourceTypes[RTY.IVORY_SHARD] = new ResourceType({
  name: RTY.IVORY_SHARD,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS],
  value: 250,
  description: `Fragments of animal horn are traditionally carved into jewelry or figurines`,
  icon: new Icon({provider: 'svg', name: SVGS.IVORY})
});

resourceTypes[RTY.JADE_TOKEN] = new ResourceType({
  name: RTY.JADE_TOKEN,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS],
  value: 1000,
  description: `Small jade disks exchanged for goods or services in the Spring-Autumn Kingdom`,
  icon: new Icon({provider: 'svg', name: SVGS.JADE})
});

resourceTypes[RTY.AMETHYST_DUSKY] = new ResourceType({
  name: RTY.AMETHYST_DUSKY,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.COOLING],
  value: 4000,
  description: `Seared to a smokey purple by an ancient fire`,
  icon: new Icon({provider: 'svg', name: SVGS.AMETHYST})
});

resourceTypes[RTY.TOPAZ_SLATE] = new ResourceType({
  name: RTY.TOPAZ_SLATE,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.SAVORY],
  value: 16000,
  description: `Thick slabs of topaz covered with mysterious shapes reminiscent of scorpions`,
  icon: new Icon({provider: 'svg', name: SVGS.TOPAZ})
});

resourceTypes[RTY.LAPIS_LAZULI] = new ResourceType({
  name: RTY.LAPIS_LAZULI,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.SOUR],
  value: 64000,
  description: `Can be crushed and used as a peerlessly beautify pigment`,
  icon: new Icon({provider: 'svg', name: SVGS.LAPIS_LAZULI})
});

resourceTypes[RTY.ONYX_HUSK] = new ResourceType({
  name: RTY.ONYX_HUSK,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.BITTER],
  value: 256000,
  description: `Incredibly hard but hollow; said to be the shells of insects that lives deep within the earth`,
  icon: new Icon({provider: 'svg', name: SVGS.ONYX})
});

resourceTypes[RTY.RUBY_CURSED] = new ResourceType({
  name: RTY.RUBY_CURSED,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.SPICY],
  value: 1024000,
  description: `Dismal fortune is said to befall anyone who possesses these beautiful red gems`,
  icon: new Icon({provider: 'svg', name: SVGS.RUBY})
});

resourceTypes[RTY.SAPPHIRE_FLOATING] = new ResourceType({
  name: RTY.SAPPHIRE_FLOATING,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.BRACKISH],
  value: 4096000,
  description: `While they don't literally float, these gems are somehow so light that they could be carried away by a gentle breeze`,
  icon: new Icon({provider: 'svg', name: SVGS.SAPPHIRE})
});

resourceTypes[RTY.EMERALD_REFRACTING] = new ResourceType({
  name: RTY.EMERALD_REFRACTING,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.HERBAL],
  value: 16384000,
  description: `Looking head on, any light refracting through seems to stretch into an infinite depth`,
  icon: new Icon({provider: 'svg', name: SVGS.EMERALD})
});

resourceTypes[RTY.DIAMOND_IRRADIENT] = new ResourceType({
  name: RTY.DIAMOND_IRRADIENT,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.SWEET],
  value: 65536000,
  description: `Could a gem shine brightly enough to give off its own light, dazzling even in the dark?`,
  icon: new Icon({provider: 'svg', name: SVGS.DIAMOND})
});

resourceTypes[RTY.SALT] = new ResourceType({
  name: RTY.SALT,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.SPICE,
  tags: [RTA.BRACKISH, RTA.SPICE],
  value: 20,
  icon: new Icon({provider: 'svg', name: SVGS.SALT}),
});

resourceTypes[RTY.CINNAMON] = new ResourceType({
  name: RTY.CINNAMON,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.CROP, RTA.SAVORY, RTA.SPICE, RTA.TRADE_GOOD],
  value: 240,
  icon: new Icon({provider: 'svg', name: SVGS.CINNAMON})
});

resourceTypes[RTY.CAROB] = new ResourceType({
  name: RTY.CAROB,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.CROP, RTA.SWEET, RTA.SPICE, RTA.TRADE_GOOD],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.CAROB})
});

resourceTypes[RTY.SUGAR_CANE] = new ResourceType({
  name: RTY.SUGAR_CANE,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.CROP, RTA.SWEET, RTA.SPICE, RTA.TRADE_GOOD],
  value: 120,
  icon: new Icon({provider: 'svg', name: SVGS.SUGAR_CANE})
});

resourceTypes[RTY.MINT] = new ResourceType({
  name: RTY.MINT,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.CROP, RTA.COOLING, RTA.SPICE, RTA.TRADE_GOOD],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.MINT})
});

resourceTypes[RTY.PEPPERCORN] = new ResourceType({
  name: RTY.PEPPERCORN,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.CROP, RTA.SPICY, RTA.SPICE, RTA.TRADE_GOOD],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.PEPPERCORN})
});

resourceTypes[RTY.CORIANDER] = new ResourceType({
  name: RTY.CORIANDER,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.CROP, RTA.HERBAL, RTA.SPICE, RTA.TRADE_GOOD],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.CORIANDER})
});

resourceTypes[RTY.ANISE] = new ResourceType({
  name: RTY.ANISE,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.CROP, RTA.BITTER, RTA.SPICE, RTA.TRADE_GOOD],
  value: 180,
  icon: new Icon({provider: 'svg', name: SVGS.ANISE})
});

resourceTypes[RTY.SORREL] = new ResourceType({
  name: RTY.SORREL,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.CROP, RTA.SOUR, RTA.SPICE, RTA.TRADE_GOOD],
  value: 20,
  icon: new Icon({provider: 'svg', name: SVGS.SORREL}),
});

resourceTypes[RTY.GLASS] = new ResourceType({
  name: RTY.GLASS,
  subcategory: RSC.GLASS,
  category: RCA.MATERIAL_REFINED,
  tags: [RTA.SMELTED, RTA.CONSTRUCTION],
  value: 16,
  icon: new Icon({provider: 'svg', name: SVGS.GLASS}),
});

resourceTypes[RTY.GLASS_FLOAT] = new ResourceType({
  name: RTY.GLASS_FLOAT,
  subcategory: RSC.GLASS,
  category: RCA.MATERIAL_REFINED,
  tags: [RTA.SMELTED, RTA.CONSTRUCTION],
  value: 520,
  description: `An incredibly clear and smooth material created by floating liquid glass on a pool of molten tin`,
  icon: new Icon({provider: 'svg', name: SVGS.GLASS_FLOAT}),
});

resourceTypes[RTY.OLIVE_OIL] = new ResourceType({
  name: RTY.OLIVE_OIL,
  subcategory: RSC.OIL,
  category: RCA.ARTISAN_GOOD,
  tags: [RTA.PRESSED, RTA.SPICE],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.OLIVE_OIL}),
});

resourceTypes[RTY.PULP] = new ResourceType({
  name: RTY.PULP,
  category: RCA.MATERIAL_REFINED,
  tags: [RTA.POWDER],
  value: 8,
  icon: new Icon({provider: 'svg', name: SVGS.PULP})
});

resourceTypes[RTY.PAPYRUS] = new ResourceType({
  name: RTY.PAPYRUS,
  category: RCA.ARTISAN_GOOD,
  tags: [RTA.PRESSED],
  value: 20,
  icon: new Icon({provider: 'svg', name: SVGS.PAPYRUS})
});

resourceTypes[RTY.INK_FERROUS] = new ResourceType({
  name: RTY.INK_FERROUS,
  category: RCA.MATERIAL_REFINED,
  tags: [RTA.SYNTHESIZED],
  value: 300,
  icon: new Icon({provider: 'svg', name: SVGS.DROP, color: '#333',
    shadow: '#111', secondaryColor: '#a2a2a2'})
});

resourceTypes[RTY.REEDCLOTH] = new ResourceType({
  name: RTY.REEDCLOTH,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.TEXTILE,
  tags: [RTA.TEXTILE],
  value: 60,
  icon: new Icon({provider: 'svg', name: SVGS.REEDCLOTH})
});

resourceTypes[RTY.FLAX] = new ResourceType({
  name: RTY.FLAX,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.TRADE_GOOD],
  value: 120,
  icon: new Icon({provider: 'svg', name: SVGS.FLAX})
});

resourceTypes[RTY.LINEN] = new ResourceType({
  name: RTY.LINEN,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.TEXTILE,
  tags: [RTA.TEXTILE],
  value: 800,
  icon: new Icon({provider: 'svg', name: SVGS.LINEN})
});

resourceTypes[RTY.WOOL] = new ResourceType({
  name: RTY.WOOL,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.TEXTILE,
  tags: [RTA.TEXTILE],
  value: 950,
  icon: new Icon({provider: 'svg', name: SVGS.WOOL})
});

resourceTypes[RTY.SILK] = new ResourceType({
  name: RTY.SILK,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.TEXTILE,
  tags: [RTA.TEXTILE],
  value: 2000,
  icon: new Icon({provider: 'svg', name: SVGS.SILK})
});

resourceTypes[RTY.ABRASIVE] = new ResourceType({
  name: RTY.ABRASIVE,
  category: RCA.MATERIAL_REFINED,
  tags: [RTA.POWDER],
  value: 70,
  icon: new Icon({provider: 'svg', name: SVGS.ABRASIVE})
});

resourceTypes[RTY.BEADS] = new ResourceType({
  name: RTY.BEADS,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.GLASS,
  tags: [RTA.GLASS],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.BEADS})
});

resourceTypes[RTY.GLASSWARE] = new ResourceType({
  name: RTY.GLASSWARE,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.GLASS,
  tags: [RTA.GLASS],
  value: 90,
  description: `Glass drinking vessels decorated with cloth`,
  icon: new Icon({provider: 'svg', name: SVGS.GLASSWARE})
});

resourceTypes[RTY.LENS] = new ResourceType({
  name: RTY.LENS,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.GLASS,
  tags: [RTA.GLASS],
  value: 340,
  icon: new Icon({provider: 'svg', name: SVGS.LENS})
});

resourceTypes[RTY.LENS_COMPOUND] = new ResourceType({
  name: RTY.LENS_COMPOUND,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.GLASS,
  tags: [RTA.GLASS],
  value: 16800,
  icon: new Icon({provider: 'svg', name: SVGS.LENS_COMPOUND})
});

resourceTypes[RTY.ACID] = new ResourceType({
  name: RTY.ACID,
  category: RCA.MATERIAL_REFINED,
  tags: [RTA.SYNTHESIZED],
  value: 160,
  icon: new Icon({provider: 'svg', name: SVGS.DROP, color: '#dbea00',
    shadow: '#c6d400', secondaryColor: '#f8ff9c'})
});

resourceTypes[RTY.GLAZE_ASH] = new ResourceType({
  name: RTY.GLAZE_ASH,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.GLAZE,
  tags: [RTA.SYNTHESIZED],
  value: 160,
  icon: new Icon({provider: 'svg', name: SVGS.GLAZE, color: '#676767',
    shadow: '#1d1d1d'})
});

resourceTypes[RTY.GLAZE_TIN] = new ResourceType({
  name: RTY.GLAZE_TIN,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.GLAZE,
  tags: [RTA.SYNTHESIZED],
  value: 800,
  icon: new Icon({provider: 'svg', name: SVGS.GLAZE, color: '#94a2bd',
    shadow: '#758da2'})
});

resourceTypes[RTY.GLAZE_LAPIS] = new ResourceType({
  name: RTY.GLAZE_LAPIS,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.GLAZE,
  tags: [RTA.SYNTHESIZED],
  value: 64100,
  icon: new Icon({provider: 'svg', name: SVGS.GLAZE, color: '#353cff',
    shadow: '#13177f'})
});

resourceTypes[RTY.TERRACOTTA] = new ResourceType({
  name: RTY.TERRACOTTA,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.CERAMIC,
  tags: [RTA.CERAMIC],
  value: 60,
  icon: new Icon({provider: 'svg', name: SVGS.TERRACOTTA})
});

resourceTypes[RTY.ASHWARE] = new ResourceType({
  name: RTY.ASHWARE,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.CERAMIC,
  tags: [RTA.CERAMIC],
  value: 180,
  icon: new Icon({provider: 'svg', name: SVGS.ASHWARE})
});

resourceTypes[RTY.FAIENCE] = new ResourceType({
  name: RTY.FAIENCE,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.CERAMIC,
  tags: [RTA.CERAMIC],
  value: 580,
  icon: new Icon({provider: 'svg', name: SVGS.FAIENCE})
});

resourceTypes[RTY.PORCELAIN] = new ResourceType({
  name: RTY.PORCELAIN,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.CERAMIC,
  tags: [RTA.CERAMIC],
  value: 68000,
  icon: new Icon({provider: 'svg', name: SVGS.PORCELAIN})
});

resourceTypes[RTY.GOLDEN_OIL] = new ResourceType({
  name: RTY.GOLDEN_OIL,
  category: RCA.MATERIAL,
  subcategory: RSC.IMPLEMENT_PARTS,
  tags: [RTA.TRADE_GOOD],
  value: 2300,
  description: `It's said that great machines stride somewhere in the desert, driven by internal streams of this gleaming oil`,
  icon: new Icon({provider: 'svg', name: SVGS.GOLDEN_OIL})
});

resourceTypes[RTY.ECHINACEA_BLOOM] = new ResourceType({
  name: RTY.ECHINACEA_BLOOM,
  category: RCA.MATERIAL,
  subcategory: RSC.IMPLEMENT_PARTS,
  tags: [RTA.TRADE_GOOD],
  value: 450,
  description: `Both the flower and the leaves have healing properties`,
  icon: new Icon({provider: 'svg', name: SVGS.ECHINACEA_BLOOM})
});

resourceTypes[RTY.WOLFRAM_PEBBLES] = new ResourceType({
  name: RTY.WOLFRAM_PEBBLES,
  category: RCA.MATERIAL,
  subcategory: RSC.IMPLEMENT_PARTS,
  tags: [RTA.TRADE_GOOD],
  value: 2100,
  description: `A small addition of this rare metal can create a magnificently hard alloy`,
  icon: new Icon({provider: 'svg', name: SVGS.WOLFRAM_PEBBLES})
});

resourceTypes[RTY.CASTING_PLASTER] = new ResourceType({
  name: RTY.CASTING_PLASTER,
  category: RCA.MATERIAL,
  subcategory: RSC.IMPLEMENT_PARTS,
  tags: [RTA.TRADE_GOOD],
  value: 180,
  description: `White chunks to be formed into moulds for molten metal`,
  icon: new Icon({provider: 'svg', name: SVGS.CASTING_PLASTER})
});

resourceTypes[RTY.MERCURY_DROPS] = new ResourceType({
  name: RTY.MERCURY_DROPS,
  category: RCA.MATERIAL,
  subcategory: RSC.IMPLEMENT_PARTS,
  tags: [RTA.TRADE_GOOD],
  value: 1200,
  description: `A curious silvery metal that runs like water`,
  icon: new Icon({provider: 'svg', name: SVGS.MERCURY_DROPS})
});

resourceTypes[RTY.CHITENOUS_PINS] = new ResourceType({
  name: RTY.CHITENOUS_PINS,
  category: RCA.MATERIAL,
  subcategory: RSC.IMPLEMENT_PARTS,
  tags: [RTA.TRADE_GOOD],
  value: 800,
  description: `Made in imitation of insect chitin (or out of insect chitin?)`,
  icon: new Icon({provider: 'svg', name: SVGS.CHITENOUS_PINS})
});

resourceTypes[RTY.TEA] = new ResourceType({
  name: RTY.TEA,
  category: RCA.DISH,
  tags: [RTA.DRINK],
  value: 30,
  icon: new Icon({provider: 'svg', name: SVGS.TEA, color: '#7bb344',
    shadow: '#5e932b'})
});

resourceTypes[RTY.CHILLED_WATER] = new ResourceType({
  name: RTY.CHILLED_WATER,
  category: RCA.DISH,
  tags: [RTA.DRINK],
  value: 405,
  icon: new Icon({provider: 'svg', name: SVGS.CHILLED_WATER})
});

resourceTypes[RTY.JUICE_TOMATO] = new ResourceType({
  name: RTY.JUICE_TOMATO,
  category: RCA.DISH,
  tags: [RTA.DRINK],
  value: 275,
  icon: new Icon({provider: 'svg', name: SVGS.JUICE_TOMATO})
});

resourceTypes[RTY.JUICE_BLUEBERRY] = new ResourceType({
  name: RTY.JUICE_BLUEBERRY,
  category: RCA.DISH,
  tags: [RTA.DRINK],
  value: 275,
  icon: new Icon({provider: 'svg', name: SVGS.JUICE_BLUEBERRY})
});

resourceTypes[RTY.SOUP] = new ResourceType({
  name: RTY.SOUP,
  category: RCA.DISH,
  tags: [RTA.FOOD],
  value: 30,
  icon: new Icon({provider: 'svg', name: SVGS.SOUP, color: '#F47400',
    shadow: '#f25600'})
});

resourceTypes[RTY.BREAD] = new ResourceType({
  name: RTY.BREAD,
  category: RCA.DISH,
  tags: [RTA.FOOD],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.BREAD })
});

resourceTypes[RTY.OMELET] = new ResourceType({
  name: RTY.OMELET,
  category: RCA.DISH,
  tags: [RTA.FOOD],
  value: 160,
  icon: new Icon({provider: 'svg', name: SVGS.OMELET, color: '#18c08b',
    shadow: '#0caf7b'})
});

resourceTypes[RTY.STEW] = new ResourceType({
  name: RTY.STEW,
  category: RCA.DISH,
  tags: [RTA.FOOD],
  value: 220,
  icon: new Icon({provider: 'svg', name: SVGS.STEW, color: '#fa690e',
    shadow: '#f94c10'})
});

resourceTypes[RTY.PIE] = new ResourceType({
  name: RTY.PIE,
  category: RCA.DISH,
  tags: [RTA.FOOD],
  value: 120,
  icon: new Icon({provider: 'svg', name: SVGS.PIE, color: '#c22235'})
});

resourceTypes[RTY.CAKE] = new ResourceType({
  name: RTY.CAKE,
  category: RCA.DISH,
  tags: [RTA.FOOD],
  value: 280,
  icon: new Icon({provider: 'svg', name: SVGS.CAKE, color: '#ffa6b7',
    shadow: '#d16479'})
});

resourceTypes[RTY.WAYBREAD] = new ResourceType({
  name: RTY.WAYBREAD,
  category: RCA.DISH,
  tags: [RTA.FOOD, RTA.PROVISION, RTA.BRACKISH],
  value: 60,
  icon: new Icon({provider: 'svg', name: SVGS.WAYBREAD})
});

resourceTypes[RTY.DRIED_FRUIT] = new ResourceType({
  name: RTY.DRIED_FRUIT,
  category: RCA.DISH,
  tags: [RTA.FOOD, RTA.PROVISION,  RTA.BRACKISH],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.DRIED_FRUIT})
});

resourceTypes[RTY.SALTFISH] = new ResourceType({
  name: RTY.SALTFISH,
  category: RCA.DISH,
  tags: [RTA.FOOD, RTA.PROVISION,  RTA.BRACKISH],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.SALTFISH})
});

resourceTypes[RTY.SALTED_MEAT] = new ResourceType({
  name: RTY.SALTED_MEAT,
  category: RCA.DISH,
  tags: [RTA.FOOD, RTA.PROVISION,  RTA.BRACKISH],
  value: 280,
  icon: new Icon({provider: 'svg', name: SVGS.SALTED_MEAT})
});

resourceTypes[RTY.MISTAKE] = new ResourceType({
  name: RTY.MISTAKE,
  category: RCA.DISH,
  tags: [RTA.FOOD],
  value: 1,
  icon: new Icon({provider: 'svg', name: SVGS.MISTAKE})
});

resourceTypes[RTY.BEER] = new ResourceType({
  name: RTY.BEER,
  category: RCA.ARTISAN_GOOD,
  tags: [RTA.DRINK],
  value: 60,
  icon: new Icon({provider: 'svg', name: SVGS.BEER})
});

resourceTypes[RTY.WINE] = new ResourceType({
  name: RTY.BEER,
  category: RCA.ARTISAN_GOOD,
  tags: [RTA.DRINK],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.WINE})
});

resourceTypes[RTY.LIQUOR] = new ResourceType({
  name: RTY.LIQUOR,
  category: RCA.ARTISAN_GOOD,
  tags: [RTA.DRINK],
  value: 180,
  icon: new Icon({provider: 'svg', name: SVGS.LIQUOR})
});

resourceTypes[RTY.IRON_EDGE] = new ResourceType({
  name: RTY.IRON_EDGE,
  category: RCA.IMPLEMENT,
  tags: [RTA.ACTION_LOOSE],
  value: 1800,
  description: `A sharp iron blade; useful for cutting through traps and snares`,
  icon: new Icon({provider: 'svg', name: SVGS.EDGE, color: '#f4ecec',
    shadow: '#e2dada'})
});

resourceTypes[RTY.VITREOUS_EDGE] = new ResourceType({
  name: RTY.VITREOUS_EDGE,
  category: RCA.IMPLEMENT,
  tags: [RTA.ACTION_LOOSE],
  value: 17760,
  description: `The glassy edge is devilishly sharp, and its delicacy is supported by flexible steel`,
  icon: new Icon({provider: 'svg', name: SVGS.EDGE, color: '#ebf4ff',
    shadow: '#c4e0ff'})
});

resourceTypes[RTY.HARDENED_SLAB] = new ResourceType({
  name: RTY.HARDENED_SLAB,
  category: RCA.IMPLEMENT,
  tags: [RTA.ACTION_BREAK],
  value: 2600,
  description: `A studded metal plate; useful for smashing through obstacles`,
  icon: new Icon({provider: 'svg', name: SVGS.SLAB})
});

resourceTypes[RTY.UNBREAKABLE_SLAB] = new ResourceType({
  name: RTY.UNBREAKABLE_SLAB,
  category: RCA.IMPLEMENT,
  tags: [RTA.ACTION_BREAK],
  value: 27300,
  description: `The infusion of Wolfram has made this metal plate alarmingly strong; swing it hard enough and you could break through just about anything`,
  icon: new Icon({provider: 'svg', name: SVGS.UNBREAKABLE_SLAB})
});

resourceTypes[RTY.CRUDE_NEEDLE] = new ResourceType({
  name: RTY.CRUDE_NEEDLE,
  category: RCA.IMPLEMENT,
  tags: [RTA.ACTION_TRAP],
  value: 1480,
  description: `A roughly-made needle; can be placed pointing upwards as a simple trap`,
  icon: new Icon({provider: 'svg', name: SVGS.NEEDLE, color: '#918c8c', shadow: '#666', secondaryColor: '#70bcd8', secondaryShadow: '#1ba6da'})
});

resourceTypes[RTY.DELICATE_NEEDLE] = new ResourceType({
  name: RTY.DELICATE_NEEDLE,
  category: RCA.IMPLEMENT,
  tags: [RTA.ACTION_TRAP],
  value: 14840,
  description: `Keen, light, durable, and drawing into an invisibly small point`,
  icon: new Icon({provider: 'svg', name: SVGS.NEEDLE, color: '#d5b0f0', shadow: '#c595ea', secondaryColor: '#e5bd7c', secondaryShadow: '#e3a133'})
});

resourceTypes[RTY.GEARWORK] = new ResourceType({
  name: RTY.GEARWORK,
  category: RCA.IMPLEMENT,
  tags: [RTA.ACTION_TRAP, RTA.ACTION_BREAK],
  value: 3060,
  description: `A simple gear-driven component; used in everything from dart-traps to bomb-triggers`,
  icon: new Icon({provider: 'svg', name: SVGS.GEARWORK})
});

resourceTypes[RTY.GEARWORK] = new ResourceType({
  name: RTY.GEARWORK,
  category: RCA.IMPLEMENT,
  tags: [RTA.ACTION_TRAP, RTA.ACTION_BREAK],
  value: 3060,
  description: `A simple gear-driven component; used in everything from dart-traps to bomb-triggers`,
  icon: new Icon({provider: 'svg', name: SVGS.GEARWORK})
});

resourceTypes[RTY.PRECISE_GEARWORK] = new ResourceType({
  name: RTY.PRECISE_GEARWORK,
  category: RCA.IMPLEMENT,
  tags: [RTA.ACTION_TRAP, RTA.ACTION_BREAK],
  value: 29520,
  description: `Durable metal, small-toothed clinking pieces, and subtle lubrication put this worlds above its previous model`,
  icon: new Icon({provider: 'svg', name: SVGS.PRECISE_GEARWORK})
});

resourceTypes[RTY.ROUGH_ROPE] = new ResourceType({
  name: RTY.ROUGH_ROPE,
  category: RCA.IMPLEMENT,
  tags: [RTA.ACTION_TRAP, RTA.ACTION_LOOSE],
  value: 1640,
  description: `Made from corded reed fibers; can be used to make a spring trap or to pull yourself from a hole`,
  icon: new Icon({provider: 'svg', name: SVGS.ROPE})
});

resourceTypes[RTY.CERAMIC_CABLE] = new ResourceType({
  name: RTY.CERAMIC_CABLE,
  category: RCA.IMPLEMENT,
  tags: [RTA.ACTION_TRAP, RTA.ACTION_LOOSE],
  value: 18500,
  description: `Smooth braided cord made from webbing coated in alternating multi-colored ceramics`,
  icon: new Icon({provider: 'svg', name: SVGS.CERAMIC_CABLE})
});

resourceTypes[RTY.TORCH] = new ResourceType({
  name: RTY.TORCH,
  category: RCA.IMPLEMENT,
  tags: [RTA.ACTION_SEEK],
  value: 1600,
  description: `Short-lived and smoky, but can still light your way in dark places`,
  icon: new Icon({provider: 'svg', name: SVGS.TORCH})
});

resourceTypes[RTY.MERCURIC_CANDLE] = new ResourceType({
  name: RTY.MERCURIC_CANDLE,
  category: RCA.IMPLEMENT,
  tags: [RTA.ACTION_SEEK],
  value: 19400,
  description: `The mercury salt rendered in these candles' wax burns with a bright scarlet light`,
  icon: new Icon({provider: 'svg', name: SVGS.CANDLE, color: '#c85856', shadow: '#b63331', secondaryColor: '#f9f5f6', secondaryShadow: '#d9c6c6', tertiaryShadow: '#ffbfc3'})
});

resourceTypes[RTY.BINDING] = new ResourceType({
  name: RTY.BINDING,
  category: RCA.IMPLEMENT,
  tags: [RTA.ACTION_HEAL],
  value: 1320,
  description: `Soft fibrous bands that can stop bleeding or hold things together`,
  icon: new Icon({provider: 'svg', name: SVGS.BINDING})
});

resourceTypes[RTY.ECHINACEA_BINDING] = new ResourceType({
  name: RTY.ECHINACEA_BINDING,
  category: RCA.IMPLEMENT,
  tags: [RTA.ACTION_HEAL],
  value: 21700,
  description: `Durable cloth blend impregnated with Echinacea paste`,
  icon: new Icon({provider: 'svg', name: SVGS.ECHINACEA_BINDING})
});

resourceTypes[(EQUIPMENT_TYPES.FOUR_POINT_BANGLE + ' (U)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.FOUR_POINT_BANGLE + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 800000,
  icon: new Icon({provider: 'svg', name: SVGS.COARSE_MEASURES})
});

resourceTypes[(EQUIPMENT_TYPES.ROUGH_MATTOCK + ' (U)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.ROUGH_MATTOCK + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 6200,
  icon: new Icon({provider: 'svg', name: SVGS.ROUGH_MATTOCK})
});

resourceTypes[(EQUIPMENT_TYPES.WOODEN_POLE + ' (U)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.WOODEN_POLE + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 6200,
  icon: new Icon({provider: 'svg', name: SVGS.WOODEN_POLE})
});

resourceTypes[(EQUIPMENT_TYPES.COARSE_MEASURES + ' (U)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.COARSE_MEASURES + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 6800,
  icon: new Icon({provider: 'svg', name: SVGS.COARSE_MEASURES})
});

resourceTypes[(EQUIPMENT_TYPES.POT_OF_SEALANT_PITCH + ' (U)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.POT_OF_SEALANT_PITCH + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 12800,
  icon: new Icon({provider: 'svg', name: SVGS.POT_OF_SEALANT_PITCH})
});

resourceTypes[(EQUIPMENT_TYPES.REED_MUCK_RAKE + ' (U)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.REED_MUCK_RAKE + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 12800,
  icon: new Icon({provider: 'svg', name: SVGS.REED_MUCK_RAKE})
});

resourceTypes[(EQUIPMENT_TYPES.CHAR_BELLOWS_TEMPERATE + ' (U)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.CHAR_BELLOWS_TEMPERATE + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 12600,
  icon: new Icon({provider: 'svg', name: SVGS.CHAR_BELLOWS, color: '#712d20',
    shadow: '#500d00', secondaryColor: '#efc59e', secondaryShadow: '#daa97b'})
});

resourceTypes[(EQUIPMENT_TYPES.CHAR_BELLOWS_FERVENT + ' (U)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.CHAR_BELLOWS_FERVENT + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 13000,
  icon: new Icon({provider: 'svg', name: SVGS.CHAR_BELLOWS, color: '#d83e20',
    shadow: '#c1321f', secondaryColor: '#f4e3c3', secondaryShadow: '#efc59e'})
});

resourceTypes[(EQUIPMENT_TYPES.CLAY_SPADE_BROAD + ' (U)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.CLAY_SPADE_BROAD + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 12000,
  icon: new Icon({provider: 'svg', name: SVGS.CLAY_SPADE_BROAD})
});

resourceTypes[(EQUIPMENT_TYPES.OLIVE_GRAFTING_SHEARS + ' (U)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.OLIVE_GRAFTING_SHEARS + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 12000,
  icon: new Icon({provider: 'svg', name: SVGS.OLIVE_GRAFTING_SHEARS})
});

resourceTypes[(EQUIPMENT_TYPES.RAGS_TATTERED + ' (U)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.RAGS_TATTERED + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.CLOTHING],
  value: 880,
  icon: new Icon({provider: 'svg', name: SVGS.RAGS_TATTERED})
});

resourceTypes[(EQUIPMENT_TYPES.SIMPLE_ROBE + ' (U)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.SIMPLE_ROBE + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.CLOTHING],
  value: 2860,
  icon: new Icon({provider: 'svg', name: SVGS.SIMPLE_ROBE})
});

resourceTypes[(EQUIPMENT_TYPES.STURDY_OVERALLS + ' (U)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.STURDY_OVERALLS + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.CLOTHING],
  value: 12000,
  icon: new Icon({provider: 'svg', name: SVGS.STURDY_OVERALLS})
});

resourceTypes[(EQUIPMENT_TYPES.APRON_OF_MANY_POCKETS + ' (U)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.APRON_OF_MANY_POCKETS + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.CLOTHING],
  value: 11600,
  icon: new Icon({provider: 'svg', name: SVGS.APRON_OF_MANY_POCKETS})
});

resourceTypes[(EQUIPMENT_TYPES.SHOULDER_POUCH + ' (U)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.SHOULDER_POUCH + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 660,
  icon: new Icon({provider: 'svg', name: SVGS.SHOULDER_POUCH})
});

resourceTypes[(EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK + ' (U)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 6000,
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_HAVERSACK})
});

resourceTypes[(EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG + ' (U)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 5600,
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_GEARBAG})
});

resourceTypes[(EQUIPMENT_TYPES.JOURNEYMANS_TOOLPACK + ' (U)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.JOURNEYMANS_TOOLPACK + ' (U)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 7000,
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_TOOLPACK})
});

resourceTypes[RESOURCE_TYPES.CARPET_CURLING_GREEN_MOTIF] = new ResourceType({
  name: (RESOURCE_TYPES.CARPET_CURLING_GREEN_MOTIF),
  category: RCA.TREASURE,
  tags: [RESOURCE_TAGS.CROP],
  value: 20000,
  description: `There's a repeated twining pattern on this carpet that looks incredibly familiar`,
  icon: new Icon({provider: 'svg', name: SVGS.CARPET})
});

resourceTypes[RESOURCE_TYPES.MEMORANDA_ON_A_GROWING_PANOPLY] = new ResourceType({
  name: (RESOURCE_TYPES.MEMORANDA_ON_A_GROWING_PANOPLY),
  category: RCA.TREASURE,
  tags: [RESOURCE_TAGS.MIND, RESOURCE_TAGS.ONE_OF_A_KIND],
  value: 20000,
  description: `Your set of diligently summarized yet continually increasing volume of notes`,
  icon: new Icon({provider: 'svg', name: SVGS.SCROLL, color: '#d83e20', shadow: '#c1321f',
    secondaryShadow: '#a82116'})
});

resourceTypes[RESOURCE_TYPES.SYSTEM_OF_ABBREVIATED_BRACHYGRAPHY] = new ResourceType({
  name: (RESOURCE_TYPES.SYSTEM_OF_ABBREVIATED_BRACHYGRAPHY),
  category: RCA.TREASURE,
  tags: [RESOURCE_TAGS.MIND, RESOURCE_TAGS.ONE_OF_A_KIND],
  value: 20000,
  description: `A clever method of shortening words of your own design`,
  icon: new Icon({provider: 'svg', name: SVGS.SCROLL, color: '#a6abe4', shadow: '#6b73d1',
    secondaryShadow: '#3f48b3'})
});

resourceTypes[RESOURCE_TYPES.TECHNIQUES_FOR_SWIFT_EXAMINATION] = new ResourceType({
  name: (RESOURCE_TYPES.TECHNIQUES_FOR_SWIFT_EXAMINATION),
  category: RCA.TREASURE,
  tags: [RESOURCE_TAGS.MIND, RESOURCE_TAGS.ONE_OF_A_KIND],
  value: 40000,
  description: `An excess of ink allows for layers of indexes referencing other indexes`,
  icon: new Icon({provider: 'svg', name: SVGS.OPEN_BOOK_WIND, color: '#f6e5e5', shadow: '#dbb8b8',
    secondaryColor: '#ad6767', secondaryShadow: '#954646', tertiaryColor: '#800000'})
});

resourceTypes[RESOURCE_TYPES.TECHNIQUES_FOR_MERCURIAL_EXAMINATION] = new ResourceType({
  name: (RESOURCE_TYPES.TECHNIQUES_FOR_MERCURIAL_EXAMINATION),
  category: RCA.TREASURE,
  tags: [RESOURCE_TAGS.MIND, RESOURCE_TAGS.ONE_OF_A_KIND],
  value: 80000,
  description: `Precision-ground lenses enable a kind of in-depth analysis that would take hours without`,
  icon: new Icon({provider: 'svg', name: SVGS.OPEN_BOOK_WIND, color: '#e6f7ff', shadow: '#c3dbe7',
    secondaryColor: '#69a8c7', secondaryShadow: '#3c8bb1', tertiaryColor: '#005780'})
});

resourceTypes[RESOURCE_TYPES.TECHNIQUES_FOR_ALACRITOUS_EXAMINATION] = new ResourceType({
  name: (RESOURCE_TYPES.TECHNIQUES_FOR_ALACRITOUS_EXAMINATION),
  category: RCA.TREASURE,
  tags: [RESOURCE_TAGS.MIND, RESOURCE_TAGS.ONE_OF_A_KIND],
  value: 160000,
  description: `With compound lenses, details of form and color far beyond human eyes are available to you`,
  icon: new Icon({provider: 'svg', name: SVGS.OPEN_BOOK_WIND, color: '#f6e3fa', shadow: '#ddc0e3',
    secondaryColor: '#94699d', secondaryShadow: '#82568b', tertiaryColor: '#6b3676'})
});

resourceTypes[RESOURCE_TYPES.TECHNIQUES_FOR_WEIGHTY_EXAMINATION] = new ResourceType({
  name: (RESOURCE_TYPES.TECHNIQUES_FOR_WEIGHTY_EXAMINATION),
  category: RCA.TREASURE,
  tags: [RESOURCE_TAGS.MIND, RESOURCE_TAGS.ONE_OF_A_KIND],
  value: 40000,
  description: `More writing means more knowledge, obviously`,
  icon: new Icon({provider: 'svg', name: SVGS.OPEN_BOOK_QUILL, color: '#f6e5e5', shadow: '#dbb8b8',
    secondaryColor: '#ad6767', secondaryShadow: '#954646', tertiaryColor: '#800000'})
});

resourceTypes[RESOURCE_TYPES.TECHNIQUES_FOR_POTENT_EXAMINATION] = new ResourceType({
  name: (RESOURCE_TYPES.TECHNIQUES_FOR_POTENT_EXAMINATION),
  category: RCA.TREASURE,
  tags: [RESOURCE_TAGS.MIND, RESOURCE_TAGS.ONE_OF_A_KIND],
  value: 80000,
  description: `You've invented an improvement to the abacus; it can even perform higher level arithmatic if you know which levers to depress`,
  icon: new Icon({provider: 'svg', name: SVGS.OPEN_BOOK_QUILL, color: '#e6f7ff', shadow: '#c3dbe7',
    secondaryColor: '#69a8c7', secondaryShadow: '#3c8bb1', tertiaryColor: '#005780'})
});

resourceTypes[RESOURCE_TYPES.TECHNIQUES_FOR_VISIONARY_EXAMINATION] = new ResourceType({
  name: (RESOURCE_TYPES.TECHNIQUES_FOR_VISIONARY_EXAMINATION),
  category: RCA.TREASURE,
  tags: [RESOURCE_TAGS.MIND, RESOURCE_TAGS.ONE_OF_A_KIND],
  value: 160000,
  description: `You've devised a mechanism that aids in trigonometry, keeps accurate time, and sharpens your quill to the perfect point`,
  icon: new Icon({provider: 'svg', name: SVGS.OPEN_BOOK_QUILL, color: '#f6e3fa', shadow: '#ddc0e3',
    secondaryColor: '#94699d', secondaryShadow: '#82568b', tertiaryColor: '#6b3676'})
});

resourceTypes[RESOURCE_TYPES.THRICE_LOCKED_TOME] = new ResourceType({
  name: (RESOURCE_TYPES.THRICE_LOCKED_TOME),
  category: RCA.SPECIAL,
  tags: [RESOURCE_TAGS.MIND],
  value: 33000,
  icon: new Icon({provider: 'svg', name: SVGS.TOME})
});

resourceTypes[RESOURCE_TYPES.BROKEN_RED_KEY] = new ResourceType({
  name: (RESOURCE_TYPES.BROKEN_RED_KEY),
  category: RCA.SPECIAL,
  tags: [RESOURCE_TAGS.MIND],
  value: 10000,
  icon: new Icon({provider: 'svg', name: SVGS.BROKEN_KEY})
});

resourceTypes[RESOURCE_TYPES.RED_KEY] = new ResourceType({
  name: (RESOURCE_TYPES.RED_KEY),
  category: RCA.SPECIAL,
  tags: [RESOURCE_TAGS.MIND],
  value: 13000,
  icon: new Icon({provider: 'svg', name: SVGS.KEY})
});

resourceTypes[RESOURCE_TYPES.DROMEDARY_PLAINS] = new ResourceType({
  name: (RESOURCE_TYPES.DROMEDARY_PLAINS),
  category: RCA.SPECIAL,
  subcategory: RSC.DROMEDARY,
  tags: [RESOURCE_TAGS.ANIMAL],
  value: 20000,
  description: `The "Plains" breed is a hybrid; it can both travel relatively fast and carry a respectable amount of weight`,
  icon: new Icon({provider: 'svg', name: SVGS.DROMEDARY})
});

export { resourceTypes }
