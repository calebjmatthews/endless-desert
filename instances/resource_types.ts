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
  description: 'The only currency you trade in',
  icon: new Icon({provider: 'svg', name: SVGS.KNOWLEDGE})
});

resourceTypes[RTY.NOTES_SKY] = new ResourceType({
  name: RTY.NOTES_SKY,
  category: RCA.FIELD_NOTES,
  tags: [RTA.MIND],
  value: 10000,
  description: 'The pale blue sky stretches wide, like a dreaming cat',
  icon: new Icon({provider: 'svg', name: SVGS.NOTES_SKY})
});

resourceTypes[RTY.NOTES_STAR] = new ResourceType({
  name: RTY.NOTES_STAR,
  category: RCA.FIELD_NOTES,
  tags: [RTA.MIND],
  value: 10000,
  description: 'In the deep sands, stars are the only way to navigate',
  icon: new Icon({provider: 'svg', name: SVGS.NOTES_STAR})
});

resourceTypes[RTY.NOTES_WATER] = new ResourceType({
  name: RTY.NOTES_WATER,
  category: RCA.FIELD_NOTES,
  tags: [RTA.MIND],
  value: 10000,
  description: 'Countless scribblings on flow and force',
  icon: new Icon({provider: 'svg', name: SVGS.NOTES_WATER})
});

resourceTypes[RTY.NOTES_EARTH] = new ResourceType({
  name: RTY.NOTES_EARTH,
  category: RCA.FIELD_NOTES,
  tags: [RTA.MIND],
  value: 10000,
  description: 'Clay, sand, and many hands to build with',
  icon: new Icon({provider: 'svg', name: SVGS.NOTES_EARTH})
});

resourceTypes[RTY.NOTES_HEAT] = new ResourceType({
  name: RTY.NOTES_HEAT,
  category: RCA.FIELD_NOTES,
  tags: [RTA.MIND],
  value: 10000,
  description: 'Your oldest friend',
  icon: new Icon({provider: 'svg', name: SVGS.NOTES_HEAT})
});

resourceTypes[RTY.NOTES_CULTIVATION] = new ResourceType({
  name: RTY.NOTES_CULTIVATION,
  category: RCA.FIELD_NOTES,
  tags: [RTA.MIND],
  value: 10000,
  description: 'With care, life can be nurtured in any land',
  icon: new Icon({provider: 'svg', name: SVGS.NOTES_CULTIVATION})
});

resourceTypes[RTY.WATER] = new ResourceType({
  name: RTY.WATER,
  category: RCA.MATERIAL,
  tags: [RTA.DRINK, RTA.INGREDIENT],
  value: 5,
  description: 'The tether between life and death',
  icon: new Icon({provider: 'svg', name: SVGS.DROP, color: '#28aae1',
    shadow: '#2887c3', secondaryColor: '#aaebf0'})
});

resourceTypes[RTY.LENTIL] = new ResourceType({
  name: RTY.LENTIL,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.FOOD, RTA.INGREDIENT],
  value: 10,
  description: 'Dry, dull, sustaining, and unlike many crops you can eat them raw',
  icon: new Icon({provider: 'svg', name: SVGS.LENTIL})
});

resourceTypes[RTY.GRAPE] = new ResourceType({
  name: RTY.GRAPE,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.COOLING],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.GRAPE})
});

resourceTypes[RTY.BLUEBERRY] = new ResourceType({
  name: RTY.BLUEBERRY,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.COOLING],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.BLUEBERRY})
});

resourceTypes[RTY.SQUASH] = new ResourceType({
  name: RTY.SQUASH,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.SAVORY],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.SQUASH})
});

resourceTypes[RTY.TOMATO] = new ResourceType({
  name: RTY.TOMATO,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.SAVORY],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.TOMATO})
});

resourceTypes[RTY.KUMQUAT] = new ResourceType({
  name: RTY.KUMQUAT,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.SOUR],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.KUMQUAT})
});

resourceTypes[RTY.LEMON] = new ResourceType({
  name: RTY.LEMON,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.SOUR],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.LEMON})
});

resourceTypes[RTY.SPINACH] = new ResourceType({
  name: RTY.SPINACH,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.BITTER],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.SPINACH})
});

resourceTypes[RTY.RADISH] = new ResourceType({
  name: RTY.RADISH,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.BITTER],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.RADISH})
});

resourceTypes[RTY.ONION] = new ResourceType({
  name: RTY.ONION,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.SPICY],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.ONION})
});

resourceTypes[RTY.CHILLI_PEPPER] = new ResourceType({
  name: RTY.CHILLI_PEPPER,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.SPICY],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.CHILLI_PEPPER})
});

resourceTypes[RTY.POTATO] = new ResourceType({
  name: RTY.POTATO,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.BRACKISH],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.POTATO})
});

resourceTypes[RTY.LOTUS_ROOT] = new ResourceType({
  name: RTY.LOTUS_ROOT,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.BRACKISH],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.LOTUS_ROOT})
});

resourceTypes[RTY.DATE] = new ResourceType({
  name: RTY.DATE,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.SWEET],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.DATE})
});

resourceTypes[RTY.FIG] = new ResourceType({
  name: RTY.FIG,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT, RTA.TRADE_GOOD, RTA.SWEET],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.FIG})
});


resourceTypes[RTY.REEDS] = new ResourceType({
  name: RTY.REEDS,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.CONSTRUCTION, RTA.FUEL],
  value: 8,
  description: 'For roofing, fabric, paper, papyrus, etc, etc',
  icon: new Icon({provider: 'svg', name: SVGS.REEDS})
});

resourceTypes[RTY.GRAIN] = new ResourceType({
  name: RTY.GRAIN,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP, RTA.INGREDIENT],
  value: 12,
  description: 'Grind it and bake it, or wet it down and wait',
  icon: new Icon({provider: 'svg', name: SVGS.GRAIN})
});

resourceTypes[RTY.OLIVE] = new ResourceType({
  name: RTY.OLIVE,
  category: RCA.MATERIAL,
  subcategory: RSC.CROP,
  tags: [RTA.CROP],
  value: 60,
  icon: new Icon({provider: 'svg', name: SVGS.OLIVE})
});

resourceTypes[RTY.SEEDS_LENTIL] = new ResourceType({
  name: RTY.SEEDS_LENTIL,
  category: RCA.MATERIAL,
  subcategory: RSC.SEEDS,
  tags: [RTA.INGREDIENT, RTA.TRADE_GOOD],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.SEEDS, color: '#a0ddb0',
    shadow: '#5bc980'})
});

resourceTypes[RTY.SEEDS_REED] = new ResourceType({
  name: RTY.SEEDS_REED,
  category: RCA.MATERIAL,
  subcategory: RSC.SEEDS,
  tags: [RTA.INGREDIENT, RTA.TRADE_GOOD],
  value: 30,
  icon: new Icon({provider: 'svg', name: SVGS.SEEDS, color: '#78281e',
    shadow: '#14aa6b'})
});

resourceTypes[RTY.SEEDS_OLIVE] = new ResourceType({
  name: RTY.SEEDS_OLIVE,
  category: RCA.MATERIAL,
  subcategory: RSC.SEEDS,
  tags: [RTA.INGREDIENT, RTA.TRADE_GOOD],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.SEEDS, color: '#d2d02c',
    shadow: '#b5b424'})
});

resourceTypes[RTY.SEEDS_GRAIN] = new ResourceType({
  name: RTY.SEEDS_GRAIN,
  category: RCA.MATERIAL,
  subcategory: RSC.SEEDS,
  tags: [RTA.INGREDIENT, RTA.TRADE_GOOD],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.SEEDS, color: '#ffbe00',
    shadow: '#ffb655'})
});

resourceTypes[RTY.FLOUR] = new ResourceType({
  name: RTY.FLOUR,
  category: RCA.MATERIAL_REFINED,
  tags: [RTA.POWDER, RTA.INGREDIENT],
  value: 20,
  icon: new Icon({provider: 'svg', name: SVGS.FLOUR})
});

resourceTypes[RTY.QUAIL] = new ResourceType({
  name: RTY.QUAIL,
  category: RCA.MATERIAL,
  subcategory: RSC.ANIMAL,
  tags: [RTA.ANIMAL, RTA.INGREDIENT],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.QUAIL})
});

resourceTypes[RTY.EGG] = new ResourceType({
  name: RTY.EGG,
  category: RCA.MATERIAL,
  subcategory: RSC.ANIMAL,
  tags: [RTA.ANIMAL, RTA.INGREDIENT],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.EGG})
});

resourceTypes[RTY.FERTILIZER] = new ResourceType({
  name: RTY.FERTILIZER,
  category: RCA.MATERIAL,
  subcategory: RSC.ANIMAL,
  tags: [RTA.ANIMAL],
  value: 10,
  icon: new Icon({provider: 'svg', name: SVGS.FERTILIZER})
});

resourceTypes[RTY.OX] = new ResourceType({
  name: RTY.OX,
  category: RCA.MATERIAL,
  subcategory: RSC.ANIMAL,
  tags: [RTA.ANIMAL, RTA.INGREDIENT],
  value: 400,
  icon: new Icon({provider: 'svg', name: SVGS.OX})
});

resourceTypes[RTY.MILK] = new ResourceType({
  name: RTY.MILK,
  category: RCA.MATERIAL,
  subcategory: RSC.ANIMAL,
  tags: [RTA.ANIMAL, RTA.INGREDIENT],
  value: 100,
  icon: new Icon({provider: 'svg', name: SVGS.MILK})
});

resourceTypes[RTY.SILKWORM_COCOON] = new ResourceType({
  name: RTY.SILKWORM_COCOON,
  category: RCA.MATERIAL,
  subcategory: RSC.ANIMAL,
  tags: [RTA.ANIMAL],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.SILKWORM_COCOON})
});

resourceTypes[RTY.WOOD_OAK] = new ResourceType({
  name: RTY.WOOD_OAK,
  category: RCA.MATERIAL,
  subcategory: RSC.WOOD,
  tags: [RTA.CONSTRUCTION, RTA.TRADE_GOOD, RTA.BITTER],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#9b6e42',
    shadow: '#825a3a', secondaryColor: '#f3d488', secondaryShadow: '#daae90'})
});

resourceTypes[RTY.WOOD_ROWAN] = new ResourceType({
  name: RTY.WOOD_ROWAN,
  category: RCA.MATERIAL,
  subcategory: RSC.WOOD,
  tags: [RTA.CONSTRUCTION, RTA.TRADE_GOOD, RTA.HERBAL],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#95a53c',
    shadow: '#7c822b', secondaryColor: '#a0775b', secondaryShadow: '#5f4c42'})
});

resourceTypes[RTY.WOOD_WALNUT] = new ResourceType({
  name: RTY.WOOD_WALNUT,
  category: RCA.MATERIAL,
  subcategory: RSC.WOOD,
  tags: [RTA.CONSTRUCTION, RTA.TRADE_GOOD, RTA.SOUR],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#927150',
    shadow: '#c1a086', secondaryColor: '#3c2613', secondaryShadow: '#a7897a'})
});

resourceTypes[RTY.WOOD_ALDER] = new ResourceType({
  name: RTY.WOOD_ALDER,
  category: RCA.MATERIAL,
  subcategory: RSC.WOOD,
  tags: [RTA.CONSTRUCTION, RTA.TRADE_GOOD, RTA.SPICY],
  value: 50,
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
  value: 25,
  icon: new Icon({provider: 'svg', name: SVGS.CLAY, color: '#a06363',
    shadow: '#754646'})
});

resourceTypes[RTY.CLAY_RICH] = new ResourceType({
  name: RTY.CLAY_RICH,
  category: RCA.MATERIAL,
  subcategory: RSC.CLAY,
  tags: [RTA.EARTH],
  value: 60,
  icon: new Icon({provider: 'svg', name: SVGS.CLAY, color: '#5d2d00',
    shadow: '#2d1600'})
});

resourceTypes[RTY.CLAY_RED] = new ResourceType({
  name: RTY.CLAY_RED,
  category: RCA.MATERIAL,
  subcategory: RSC.CLAY,
  tags: [RTA.EARTH],
  value: 35,
  icon: new Icon({provider: 'svg', name: SVGS.CLAY, color: '#a91f1f',
    shadow: '#6f1b1b'})
});

resourceTypes[RTY.CLAY_BLUE] = new ResourceType({
  name: RTY.CLAY_BLUE,
  category: RCA.MATERIAL,
  subcategory: RSC.CLAY,
  tags: [RTA.EARTH],
  value: 45,
  icon: new Icon({provider: 'svg', name: SVGS.CLAY, color: '#9cb0d2',
    shadow: '#818ea2'})
});

resourceTypes[RTY.CLAY_KAOLIN] = new ResourceType({
  name: RTY.CLAY_KAOLIN,
  category: RCA.MATERIAL,
  subcategory: RSC.CLAY,
  tags: [RTA.EARTH],
  value: 840,
  icon: new Icon({provider: 'svg', name: SVGS.CLAY, color: '#f7e0c5',
    shadow: '#d6bfa4'})
});

resourceTypes[RTY.BRICKS_MUD] = new ResourceType({
  name: RTY.BRICKS_MUD,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.BRICK,
  tags: [RTA.DRIED, RTA.CONSTRUCTION],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.BRICK, color: '#674648',
    shadow: '#50392d', secondaryColor: '#845d59'})
});

resourceTypes[RTY.BRICKS_BROWNSTONE] = new ResourceType({
  name: RTY.BRICKS_BROWNSTONE,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.BRICK,
  tags: [RTA.DRIED, RTA.CONSTRUCTION],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.BRICK, color: '#5d2d00',
    shadow: '#2d1600', secondaryColor: '#9a5d24'})
});

resourceTypes[RTY.BRICKS_RED] = new ResourceType({
  name: RTY.BRICKS_RED,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.BRICK,
  tags: [RTA.DRIED, RTA.CONSTRUCTION],
  value: 100,
  icon: new Icon({provider: 'svg', name: SVGS.BRICK, color: '#a91f1f',
    shadow: '#6f1b1b', secondaryColor: '#de6363'})
});

resourceTypes[RTY.BRICKS_SANDLIME] = new ResourceType({
  name: RTY.BRICKS_SANDLIME,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.BRICK,
  tags: [RTA.DRIED, RTA.CONSTRUCTION],
  value: 110,
  icon: new Icon({provider: 'svg', name: SVGS.BRICK, color: '#9cb0d2',
    shadow: '#818ea2', secondaryColor: '#ccd6ff'})
});

resourceTypes[RTY.BRICKS_SHINING] = new ResourceType({
  name: RTY.BRICKS_SHINING,
  category: RCA.MATERIAL_REFINED,
  subcategory: RSC.BRICK,
  tags: [RTA.DRIED, RTA.CONSTRUCTION],
  value: 860,
  icon: new Icon({provider: 'svg', name: SVGS.BRICK, color: '#f7e0c5',
    shadow: '#d6bfa4', secondaryColor: '#fffaf7'})
});

resourceTypes[RTY.THATCH] = new ResourceType({
  name: RTY.THATCH,
  category: RCA.MATERIAL_REFINED,
  tags: [RTA.DRIED, RTA.CONSTRUCTION],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.THATCH})
});

resourceTypes[RTY.SAND_YELLOW] = new ResourceType({
  name: RTY.SAND_YELLOW,
  category: RCA.MATERIAL,
  subcategory: RSC.SAND,
  tags: [RTA.EARTH, RTA.SAVORY],
  value: 3,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#f3d98f',
    shadow: '#e6a960'})
});

resourceTypes[RTY.SAND_DUNE] = new ResourceType({
  name: RTY.SAND_DUNE,
  category: RCA.MATERIAL,
  subcategory: RSC.SAND,
  tags: [RTA.EARTH, RTA.SWEET],
  value: 5,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#f9c29e',
    shadow: '#c79573'})
});

resourceTypes[RTY.SAND_PALE] = new ResourceType({
  name: RTY.SAND_PALE,
  category: RCA.MATERIAL,
  subcategory: RSC.SAND,
  tags: [RTA.EARTH, RTA.COOLING],
  value: 6,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#d6d8dc',
    shadow: '#afbad0'})
});

resourceTypes[RTY.SAND_VOLCANIC] = new ResourceType({
  name: RTY.SAND_VOLCANIC,
  category: RCA.MATERIAL,
  subcategory: RSC.SAND,
  tags: [RTA.EARTH, RTA.SPICY],
  value: 4,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#866262',
    shadow: '#6f3a3a'})
});

resourceTypes[RTY.SAND_CORAL] = new ResourceType({
  name: RTY.SAND_CORAL,
  category: RCA.MATERIAL,
  subcategory: RSC.SAND,
  tags: [RTA.EARTH, RTA.BRACKISH],
  value: 5,
  icon: new Icon({provider: 'svg', name: SVGS.SAND, color: '#e24242',
    shadow: '#bd3b3b'})
});

resourceTypes[RTY.SAND_OLIVINE] = new ResourceType({
  name: RTY.SAND_OLIVINE,
  category: RCA.MATERIAL,
  subcategory: RSC.SAND,
  tags: [RTA.EARTH, RTA.HERBAL],
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
  tags: [RTA.EARTH, RTA.SOUR],
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
  category: RCA.MATERIAL,
  tags: [RTA.SMELTED, RTA.FUEL],
  value: 60,
  icon: new Icon({provider: 'svg', name: SVGS.CHARCOAL})
});

resourceTypes[RTY.CARBON] = new ResourceType({
  name: RTY.CARBON,
  category: RCA.MATERIAL,
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
  value: 800,
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
  value: 740,
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

resourceTypes[RTY.JADE] = new ResourceType({
  name: RTY.JADE,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS],
  value: 1000,
  icon: new Icon({provider: 'svg', name: SVGS.JADE})
});

resourceTypes[RTY.AMETHYST] = new ResourceType({
  name: RTY.AMETHYST,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.COOLING],
  value: 2000,
  icon: new Icon({provider: 'svg', name: SVGS.AMETHYST})
});

resourceTypes[RTY.TOPAZ] = new ResourceType({
  name: RTY.TOPAZ,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.SAVORY],
  value: 3000,
  icon: new Icon({provider: 'svg', name: SVGS.TOPAZ})
});

resourceTypes[RTY.LAPIS_LAZULI] = new ResourceType({
  name: RTY.LAPIS_LAZULI,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.SOUR],
  value: 5000,
  icon: new Icon({provider: 'svg', name: SVGS.LAPIS_LAZULI})
});

resourceTypes[RTY.ONYX] = new ResourceType({
  name: RTY.ONYX,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.BITTER],
  value: 8000,
  icon: new Icon({provider: 'svg', name: SVGS.ONYX})
});

resourceTypes[RTY.RUBY] = new ResourceType({
  name: RTY.RUBY,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.SPICY],
  value: 13000,
  icon: new Icon({provider: 'svg', name: SVGS.RUBY})
});

resourceTypes[RTY.SAPPHIRE] = new ResourceType({
  name: RTY.SAPPHIRE,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.BRACKISH],
  value: 21000,
  icon: new Icon({provider: 'svg', name: SVGS.SAPPHIRE})
});

resourceTypes[RTY.EMERALD] = new ResourceType({
  name: RTY.EMERALD,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.HERBAL],
  value: 34000,
  icon: new Icon({provider: 'svg', name: SVGS.EMERALD})
});

resourceTypes[RTY.DIAMOND] = new ResourceType({
  name: RTY.DIAMOND,
  category: RCA.MATERIAL,
  subcategory: RSC.GEM,
  tags: [RTA.TRADE_GOOD, RTA.PRECIOUS, RTA.SWEET],
  value: 55000,
  icon: new Icon({provider: 'svg', name: SVGS.DIAMOND})
});

resourceTypes[RTY.SALT] = new ResourceType({
  name: RTY.SALT,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.TRADE_GOOD, RTA.BRACKISH, RTA.SPICE],
  value: 20,
  icon: new Icon({provider: 'svg', name: SVGS.SALT}),
});

resourceTypes[RTY.CINNAMON] = new ResourceType({
  name: RTY.CINNAMON,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.CROP, RTA.SAVORY, RTA.SPICE],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.CINNAMON})
});

resourceTypes[RTY.CAROB] = new ResourceType({
  name: RTY.CAROB,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.CROP, RTA.SWEET, RTA.SPICE],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.CAROB})
});

resourceTypes[RTY.MINT] = new ResourceType({
  name: RTY.MINT,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.CROP, RTA.COOLING, RTA.SPICE],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.MINT})
});

resourceTypes[RTY.PEPPERCORN] = new ResourceType({
  name: RTY.PEPPERCORN,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.CROP, RTA.SPICY, RTA.SPICE],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.PEPPERCORN})
});

resourceTypes[RTY.CORIANDER] = new ResourceType({
  name: RTY.CORIANDER,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.CROP, RTA.HERBAL, RTA.SPICE],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.CORIANDER})
});

resourceTypes[RTY.ANISE] = new ResourceType({
  name: RTY.ANISE,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.CROP, RTA.BITTER, RTA.SPICE],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.ANISE})
});

resourceTypes[RTY.SORREL] = new ResourceType({
  name: RTY.SORREL,
  category: RCA.MATERIAL,
  subcategory: RSC.SPICE,
  tags: [RTA.CROP, RTA.SOUR, RTA.SPICE],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.SORREL}),
});

resourceTypes[RTY.GLASS] = new ResourceType({
  name: RTY.GLASS,
  subcategory: RSC.GLASS,
  category: RCA.MATERIAL_REFINED,
  tags: [RTA.SMELTED, RTA.CONSTRUCTION],
  value: 120,
  icon: new Icon({provider: 'svg', name: SVGS.GLASS}),
});

resourceTypes[RTY.OLIVE_OIL] = new ResourceType({
  name: RTY.OLIVE_OIL,
  subcategory: RSC.OIL,
  category: RCA.ARTISAN_GOOD,
  tags: [RTA.PRESSED, RTA.SPICE],
  value: 250,
  icon: new Icon({provider: 'svg', name: SVGS.OLIVE_OIL}),
});

resourceTypes[RTY.PULP] = new ResourceType({
  name: RTY.PULP,
  category: RCA.MATERIAL_REFINED,
  tags: [RTA.POWDER],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.PULP})
});

resourceTypes[RTY.PAPYRUS] = new ResourceType({
  name: RTY.PAPYRUS,
  category: RCA.MATERIAL_REFINED,
  tags: [RTA.PRESSED],
  value: 150,
  icon: new Icon({provider: 'svg', name: SVGS.PAPYRUS})
});

resourceTypes[RTY.INK_FERROUS] = new ResourceType({
  name: RTY.INK_FERROUS,
  category: RCA.MATERIAL_REFINED,
  tags: [RTA.SYNTHESIZED],
  value: 300,
  icon: new Icon({provider: 'svg', name: SVGS.DROP, color: '#333',
    shadow: '#000', secondaryColor: '#a2a2a2'})
});

resourceTypes[RTY.LINEN] = new ResourceType({
  name: RTY.LINEN,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.TEXTILE,
  tags: [RTA.TEXTILE],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.LINEN})
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
  value: 5,
  icon: new Icon({provider: 'svg', name: SVGS.ABRASIVE})
});

resourceTypes[RTY.BEADS] = new ResourceType({
  name: RTY.BEADS,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.GLASS,
  tags: [RTA.GLASS],
  value: 180,
  icon: new Icon({provider: 'svg', name: SVGS.BEADS})
});

resourceTypes[RTY.GLASSWARE] = new ResourceType({
  name: RTY.GLASSWARE,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.GLASS,
  tags: [RTA.GLASS],
  value: 800,
  icon: new Icon({provider: 'svg', name: SVGS.GLASSWARE})
});

resourceTypes[RTY.LENS] = new ResourceType({
  name: RTY.LENS,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.GLASS,
  tags: [RTA.GLASS],
  value: 1800,
  icon: new Icon({provider: 'svg', name: SVGS.LENS})
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
  value: 240,
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
  value: 5500,
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
  value: 480,
  icon: new Icon({provider: 'svg', name: SVGS.ASHWARE})
});

resourceTypes[RTY.FAIENCE] = new ResourceType({
  name: RTY.FAIENCE,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.CERAMIC,
  tags: [RTA.CERAMIC],
  value: 1200,
  icon: new Icon({provider: 'svg', name: SVGS.FAIENCE})
});

resourceTypes[RTY.PORCELAIN] = new ResourceType({
  name: RTY.PORCELAIN,
  category: RCA.ARTISAN_GOOD,
  subcategory: RSC.CERAMIC,
  tags: [RTA.CERAMIC],
  value: 7800,
  icon: new Icon({provider: 'svg', name: SVGS.PORCELAIN})
});

resourceTypes[RTY.SOUP] = new ResourceType({
  name: RTY.SOUP,
  category: RCA.DISH,
  tags: [RTA.FOOD],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.SOUP, color: '#F47400',
    shadow: '#f25600'})
});

resourceTypes[RTY.BREAD] = new ResourceType({
  name: RTY.BREAD,
  category: RCA.DISH,
  tags: [RTA.FOOD],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.BREAD})
});

resourceTypes[RTY.OMELET] = new ResourceType({
  name: RTY.OMELET,
  category: RCA.DISH,
  tags: [RTA.FOOD],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.OMELET, color: '#18c08b',
    shadow: '#0caf7b'})
});

resourceTypes[RTY.STEW] = new ResourceType({
  name: RTY.STEW,
  category: RCA.DISH,
  tags: [RTA.FOOD],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.STEW, color: '#fa690e',
    shadow: '#f94c10'})
});

resourceTypes[RTY.PIE] = new ResourceType({
  name: RTY.PIE,
  category: RCA.DISH,
  tags: [RTA.FOOD],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.PIE, color: '#ed5565ff'})
});

resourceTypes[RTY.CAKE] = new ResourceType({
  name: RTY.CAKE,
  category: RCA.DISH,
  tags: [RTA.FOOD],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.CAKE, color: '#fa690e',
    shadow: '#f94c10'})
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

resourceTypes[RTY.LIQUOR] = new ResourceType({
  name: RTY.LIQUOR,
  category: RCA.ARTISAN_GOOD,
  tags: [RTA.DRINK],
  value: 180,
  icon: new Icon({provider: 'svg', name: SVGS.LIQUOR})
});

resourceTypes[(EQUIPMENT_TYPES.ROUGH_MATTOCK + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.ROUGH_MATTOCK + ' (Unmarked)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 4000,
  icon: new Icon({provider: 'svg', name: SVGS.ROUGH_MATTOCK})
});

resourceTypes[(EQUIPMENT_TYPES.WOODEN_POLE + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.WOODEN_POLE + ' (Unmarked)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 4000,
  icon: new Icon({provider: 'svg', name: SVGS.WOODEN_POLE})
});

resourceTypes[(EQUIPMENT_TYPES.COARSE_IMPLEMENTS + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.COARSE_IMPLEMENTS + ' (Unmarked)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 4000,
  icon: new Icon({provider: 'svg', name: SVGS.COARSE_IMPLEMENTS})
});

resourceTypes[(EQUIPMENT_TYPES.SIMPLE_ROBE + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.SIMPLE_ROBE + ' (Unmarked)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.CLOTHING],
  value: 2000,
  icon: new Icon({provider: 'svg', name: SVGS.SIMPLE_ROBE})
});

resourceTypes[(EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK + ' (Unmarked)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK + ' (Unmarked)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 3000,
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_HAVERSACK})
});

resourceTypes[(EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG + ' (Unmarked)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG + ' (Unmarked)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 3000,
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_GEARBAG})
});

resourceTypes[(EQUIPMENT_TYPES.JOURNEYMANS_TOOLPACK + ' (Unmarked)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.JOURNEYMANS_TOOLPACK + ' (Unmarked)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 3000,
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_TOOLPACK})
});

resourceTypes[(EQUIPMENT_TYPES.SHOULDER_POUCH + ' (Unmarked)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.SHOULDER_POUCH + ' (Unmarked)'),
  category: RCA.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 3000,
  icon: new Icon({provider: 'svg', name: SVGS.SHOULDER_POUCH})
});

export { resourceTypes }
