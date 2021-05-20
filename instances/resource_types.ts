import ResourceType from '../models/resource_type';
import Icon from '../models/icon';
import { RESOURCE_TYPES } from '../enums/resource_types';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { RESOURCE_SUBCATEGORIES } from '../enums/resource_subcategories';
import { RESOURCE_CATEGORIES } from '../enums/resource_categories';
import { EQUIPMENT_TYPES } from '../enums/equipment_types';
import { EQUIPMENT_SLOTS } from '../enums/equipment_slots';
import { SVGS } from '../enums/svgs';

let resourceTypes: { [name: string] : ResourceType } = {};

resourceTypes[RESOURCE_TYPES.KNOWLEDGE] = new ResourceType({
  name: RESOURCE_TYPES.KNOWLEDGE,
  category: RESOURCE_CATEGORIES.ETHERIAL,
  tags: [RESOURCE_TAGS.MIND],
  value: 1,
  icon: new Icon({provider: 'svg', name: SVGS.KNOWLEDGE})
});

resourceTypes[RESOURCE_TYPES.WATER] = new ResourceType({
  name: RESOURCE_TYPES.WATER,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.LIQUID, RESOURCE_TAGS.DRINK, RESOURCE_TAGS.INGREDIENT],
  value: 5,
  icon: new Icon({provider: 'svg', name: SVGS.DROP, color: '#28aae1',
    shadow: '#2887c3', secondaryColor: '#aaebf0'})
});

resourceTypes[RESOURCE_TYPES.LENTILS] = new ResourceType({
  name: RESOURCE_TYPES.LENTILS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT, RESOURCE_TAGS.FOOD, RESOURCE_TAGS.INGREDIENT],
  value: 10,
  icon: new Icon({provider: 'svg', name: SVGS.LENTILS})
});

resourceTypes[RESOURCE_TYPES.SEEDS] = new ResourceType({
  name: RESOURCE_TYPES.SEEDS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT, RESOURCE_TAGS.INGREDIENT],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.SEEDS})
});

resourceTypes[RESOURCE_TYPES.REEDS] = new ResourceType({
  name: RESOURCE_TYPES.REEDS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT, RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.FUEL],
  value: 8,
  icon: new Icon({provider: 'svg', name: SVGS.REEDS})
});

resourceTypes[RESOURCE_TYPES.GRAIN] = new ResourceType({
  name: RESOURCE_TYPES.GRAIN,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT, RESOURCE_TAGS.INGREDIENT],
  value: 15,
  icon: new Icon({provider: 'svg', name: SVGS.GRAIN})
});

resourceTypes[RESOURCE_TYPES.FLOUR] = new ResourceType({
  name: RESOURCE_TYPES.FLOUR,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT, RESOURCE_TAGS.INGREDIENT],
  value: 25,
  icon: new Icon({provider: 'svg', name: SVGS.FLOUR})
});

resourceTypes[RESOURCE_TYPES.OLIVES] = new ResourceType({
  name: RESOURCE_TYPES.OLIVES,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT],
  value: 25,
  icon: new Icon({provider: 'svg', name: SVGS.OLIVES})
});

resourceTypes[RESOURCE_TYPES.QUAIL] = new ResourceType({
  name: RESOURCE_TYPES.QUAIL,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.ANIMAL, RESOURCE_TAGS.INGREDIENT],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.QUAIL})
});

resourceTypes[RESOURCE_TYPES.EGGS] = new ResourceType({
  name: RESOURCE_TYPES.EGGS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.ANIMAL_PRODUCT, RESOURCE_TAGS.INGREDIENT],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.EGGS})
});

resourceTypes[RESOURCE_TYPES.FERTILIZER] = new ResourceType({
  name: RESOURCE_TYPES.FERTILIZER,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.ANIMAL_PRODUCT],
  value: 10,
  icon: new Icon({provider: 'svg', name: SVGS.FERTILIZER})
});

resourceTypes[RESOURCE_TYPES.OXEN] = new ResourceType({
  name: RESOURCE_TYPES.OXEN,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.ANIMAL, RESOURCE_TAGS.INGREDIENT],
  value: 400,
  icon: new Icon({provider: 'svg', name: SVGS.OXEN})
});

resourceTypes[RESOURCE_TYPES.MILK] = new ResourceType({
  name: RESOURCE_TYPES.MILK,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.ANIMAL_PRODUCT, RESOURCE_TAGS.INGREDIENT],
  value: 100,
  icon: new Icon({provider: 'svg', name: SVGS.MILK})
});

resourceTypes[RESOURCE_TYPES.SILKWORM_COCOON] = new ResourceType({
  name: RESOURCE_TYPES.SILKWORM_COCOON,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.ANIMAL_PRODUCT],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.SILKWORM_COCOON})
});

resourceTypes[RESOURCE_TYPES.WOOD_OAK] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_OAK,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.BITTER],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#9b6e42',
    shadow: '#825a3a', secondaryColor: '#f3d488', secondaryShadow: '#daae90'})
});

resourceTypes[RESOURCE_TYPES.WOOD_ROWAN] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_ROWAN,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.HERBAL],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#95a53c',
    shadow: '#7c822b', secondaryColor: '#a0775b', secondaryShadow: '#5f4c42'})
});

resourceTypes[RESOURCE_TYPES.WOOD_WALNUT] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_WALNUT,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.SOUR],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#927150',
    shadow: '#c1a086', secondaryColor: '#3c2613', secondaryShadow: '#a7897a'})
});

resourceTypes[RESOURCE_TYPES.WOOD_ALDER] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_ALDER,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.SPICY],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#a5104e',
    shadow: '#800437', secondaryColor: '#d85454', secondaryShadow: '#c13636'})
});

resourceTypes[RESOURCE_TYPES.WOOD_MAPLE] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_MAPLE,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.SWEET],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#bf7229',
    shadow: '#ad6043', secondaryColor: '#ffb581', secondaryShadow: '#de805c'})
});

resourceTypes[RESOURCE_TYPES.WOOD_WILLOW] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_WILLOW,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.BRACKISH],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#e87b7b',
    shadow: '#d66464', secondaryColor: '#ffb7b7', secondaryShadow: '#ff8e8e'})
});

resourceTypes[RESOURCE_TYPES.WOOD_ASH] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_ASH,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.SAVORY],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#daa86b',
    shadow: '#865e2e', secondaryColor: '#ffcd8f', secondaryShadow: '#b58e5f'})
});

resourceTypes[RESOURCE_TYPES.WOOD_SPRUCE] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_SPRUCE,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.COOLING],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.WOOD, color: '#4a2c00',
    shadow: '#271700', secondaryColor: '#905600', secondaryShadow: '#653c00'})
});

resourceTypes[RESOURCE_TYPES.CLAY_RED] = new ResourceType({
  name: RESOURCE_TYPES.CLAY_RED,
  subcategory: RESOURCE_SUBCATEGORIES.CLAY,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 15,
  icon: new Icon({provider: 'svg', name: SVGS.CLAY, color: '#a91f1f',
    shadow: '#6f1b1b'})
});

resourceTypes[RESOURCE_TYPES.BRICKS_RED] = new ResourceType({
  name: RESOURCE_TYPES.BRICKS_RED,
  subcategory: RESOURCE_SUBCATEGORIES.BRICK,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [RESOURCE_TAGS.CONSTRUCTION],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.BRICK, color: '#a91f1f',
    shadow: '#6f1b1b', secondaryColor: '#de6363'})
});

resourceTypes[RESOURCE_TYPES.THATCH] = new ResourceType({
  name: RESOURCE_TYPES.THATCH,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [RESOURCE_TAGS.CONSTRUCTION],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.THATCH})
});

resourceTypes[RESOURCE_TYPES.SAND_YELLOW] = new ResourceType({
  name: RESOURCE_TYPES.SAND_YELLOW,
  subcategory: RESOURCE_SUBCATEGORIES.SAND,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 3,
  icon: new Icon({provider: 'svg', name: SVGS.SAND})
});

resourceTypes[RESOURCE_TYPES.CHARCOAL] = new ResourceType({
  name: RESOURCE_TYPES.CHARCOAL,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT, RESOURCE_TAGS.FUEL],
  value: 60,
  icon: new Icon({provider: 'svg', name: SVGS.CHARCOAL})
});

resourceTypes[RESOURCE_TYPES.CARBON] = new ResourceType({
  name: RESOURCE_TYPES.CARBON,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.CARBON})
});

resourceTypes[RESOURCE_TYPES.RUST_ORE] = new ResourceType({
  name: RESOURCE_TYPES.RUST_ORE,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.ORE, color: '#880000',
    shadow: '#b33c3c', secondaryColor: '#2b1010', secondaryShadow: '#564446'})
});

resourceTypes[RESOURCE_TYPES.IRON_POWDER] = new ResourceType({
  name: RESOURCE_TYPES.IRON_POWDER,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 350,
  icon: new Icon({provider: 'svg', name: SVGS.POWDER, color: '#4d4d4d',
    shadow: '#333', secondaryColor: '#666'})
});

resourceTypes[RESOURCE_TYPES.CRUDE_IRON] = new ResourceType({
  name: RESOURCE_TYPES.CRUDE_IRON,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 400,
  icon: new Icon({provider: 'svg', name: SVGS.BAR, color: '#4d4d4d',
    shadow: '#333', secondaryColor: '#666'})
});

resourceTypes[RESOURCE_TYPES.GREENISH_ORE] = new ResourceType({
  name: RESOURCE_TYPES.GREENISH_ORE,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 600,
  icon: new Icon({provider: 'svg', name: SVGS.ORE, color: '#227b67',
    shadow: '#3f948a', secondaryColor: '#ad5f27', secondaryShadow: '#b5795b'})
});

resourceTypes[RESOURCE_TYPES.COPPER_POWDER] = new ResourceType({
  name: RESOURCE_TYPES.COPPER_POWDER,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 1100,
  icon: new Icon({provider: 'svg', name: SVGS.POWDER, color: '#ff7f22',
    shadow: '#d66224', secondaryColor: '#ffa575'})
});

resourceTypes[RESOURCE_TYPES.DUSTY_ORE] = new ResourceType({
  name: RESOURCE_TYPES.DUSTY_ORE,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 400,
  icon: new Icon({provider: 'svg', name: SVGS.ORE, color: '#61676d',
    shadow: '#4b4b65', secondaryColor: '#758da2', secondaryShadow: '#94a2bd'})
});

resourceTypes[RESOURCE_TYPES.TIN_POWDER] = new ResourceType({
  name: RESOURCE_TYPES.TIN_POWDER,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 650,
  icon: new Icon({provider: 'svg', name: SVGS.POWDER, color: '#94a2bd',
    shadow: '#758da2', secondaryColor: '#b9c0ef'})
});

resourceTypes[RESOURCE_TYPES.BRONZE] = new ResourceType({
  name: RESOURCE_TYPES.BRONZE,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 800,
  icon: new Icon({provider: 'svg', name: SVGS.BAR, color: '#ce6112',
    shadow: '#a94e23', secondaryColor: '#d87444'})
});

resourceTypes[RESOURCE_TYPES.PALE_ORE] = new ResourceType({
  name: RESOURCE_TYPES.PALE_ORE,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 350,
  icon: new Icon({provider: 'svg', name: SVGS.ORE, color: '#9f9ab5',
    shadow: '#797388', secondaryColor: '#cfcfe2', secondaryShadow: '#f3f3f3'})
});

resourceTypes[RESOURCE_TYPES.ZINC_POWDER] = new ResourceType({
  name: RESOURCE_TYPES.ZINC_POWDER,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 620,
  icon: new Icon({provider: 'svg', name: SVGS.POWDER, color: '#ebe9f3',
    shadow: '#cfcfe2', secondaryColor: '#fff'})
});

resourceTypes[RESOURCE_TYPES.SULFUR] = new ResourceType({
  name: RESOURCE_TYPES.SULFUR,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.POWDER, color: '#e8f900',
    shadow: '#abb500', secondaryColor: '#faffa1'})
});

resourceTypes[RESOURCE_TYPES.BRASS] = new ResourceType({
  name: RESOURCE_TYPES.BRASS,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 740,
  icon: new Icon({provider: 'svg', name: SVGS.BAR, color: '#ff9825',
    shadow: '#e06900', secondaryColor: '#ffbc81'})
});

resourceTypes[RESOURCE_TYPES.STEEL] = new ResourceType({
  name: RESOURCE_TYPES.STEEL,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 2000,
  icon: new Icon({provider: 'svg', name: SVGS.BAR, color: '#8ea2d8',
    shadow: '#444b6b', secondaryColor: '#b1b9e4'}),
  foregroundColor: '#8ea2d8',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.SALT] = new ResourceType({
  name: RESOURCE_TYPES.SALT,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.BRACKISH, RESOURCE_TAGS.SPICE],
  value: 20,
  icon: new Icon({provider: 'svg', name: SVGS.SALT}),
});

resourceTypes[RESOURCE_TYPES.CINNAMON] = new ResourceType({
  name: RESOURCE_TYPES.CINNAMON,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.SAVORY, RESOURCE_TAGS.SPICE],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.CINNAMON})
});

resourceTypes[RESOURCE_TYPES.CAROB] = new ResourceType({
  name: RESOURCE_TYPES.CAROB,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.SWEET, RESOURCE_TAGS.SPICE],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.CAROB})
});

resourceTypes[RESOURCE_TYPES.MINT] = new ResourceType({
  name: RESOURCE_TYPES.MINT,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.COOLING, RESOURCE_TAGS.SPICE],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.MINT})
});

resourceTypes[RESOURCE_TYPES.PEPPERCORN] = new ResourceType({
  name: RESOURCE_TYPES.PEPPERCORN,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.SPICY, RESOURCE_TAGS.SPICE],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.PEPPERCORN})
});

resourceTypes[RESOURCE_TYPES.CORIANDER] = new ResourceType({
  name: RESOURCE_TYPES.CORIANDER,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.HERBAL, RESOURCE_TAGS.SPICE],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.CORIANDER})
});

resourceTypes[RESOURCE_TYPES.ANISE] = new ResourceType({
  name: RESOURCE_TYPES.ANISE,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.BITTER, RESOURCE_TAGS.SPICE],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.ANISE})
});

resourceTypes[RESOURCE_TYPES.SORREL] = new ResourceType({
  name: RESOURCE_TYPES.SORREL,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.SOUR, RESOURCE_TAGS.SPICE],
  value: 40,
  icon: new Icon({provider: 'svg', name: SVGS.SORREL}),
});

resourceTypes[RESOURCE_TYPES.GLASS] = new ResourceType({
  name: RESOURCE_TYPES.GLASS,
  subcategory: RESOURCE_SUBCATEGORIES.GLASS,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [RESOURCE_TAGS.CONSTRUCTION],
  value: 120,
  icon: new Icon({provider: 'svg', name: SVGS.GLASS}),
});

resourceTypes[RESOURCE_TYPES.OLIVE_OIL] = new ResourceType({
  name: RESOURCE_TYPES.OLIVE_OIL,
  subcategory: RESOURCE_SUBCATEGORIES.OIL,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.SPICE],
  value: 250,
  icon: new Icon({provider: 'svg', name: SVGS.OLIVE_OIL}),
});

resourceTypes[RESOURCE_TYPES.PULP] = new ResourceType({
  name: RESOURCE_TYPES.PULP,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 50,
  icon: new Icon({provider: 'svg', name: SVGS.PULP})
});

resourceTypes[RESOURCE_TYPES.PAPYRUS] = new ResourceType({
  name: RESOURCE_TYPES.PAPYRUS,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 150,
  icon: new Icon({provider: 'svg', name: SVGS.PAPYRUS})
});

resourceTypes[RESOURCE_TYPES.INK_FERROUS] = new ResourceType({
  name: RESOURCE_TYPES.INK_FERROUS,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 300,
  icon: new Icon({provider: 'svg', name: SVGS.DROP, color: '#333',
    shadow: '#000', secondaryColor: '#a2a2a2'})
});

resourceTypes[RESOURCE_TYPES.LINEN] = new ResourceType({
  name: RESOURCE_TYPES.LINEN,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.LINEN})
});

resourceTypes[RESOURCE_TYPES.SILK] = new ResourceType({
  name: RESOURCE_TYPES.SILK,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [],
  value: 2000,
  icon: new Icon({provider: 'svg', name: SVGS.SILK})
});

resourceTypes[RESOURCE_TYPES.ABRASIVE] = new ResourceType({
  name: RESOURCE_TYPES.ABRASIVE,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [RESOURCE_TAGS.EARTH],
  value: 5,
  icon: new Icon({provider: 'svg', name: SVGS.ABRASIVE})
});

resourceTypes[RESOURCE_TYPES.BEADS] = new ResourceType({
  name: RESOURCE_TYPES.BEADS,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [],
  value: 180,
  icon: new Icon({provider: 'svg', name: SVGS.BEADS})
});

resourceTypes[RESOURCE_TYPES.GLASSWARE] = new ResourceType({
  name: RESOURCE_TYPES.GLASSWARE,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [],
  value: 800,
  icon: new Icon({provider: 'svg', name: SVGS.GLASSWARE})
});

resourceTypes[RESOURCE_TYPES.LENSES] = new ResourceType({
  name: RESOURCE_TYPES.LENSES,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [],
  value: 1800,
  icon: new Icon({provider: 'svg', name: SVGS.LENSES})
});

resourceTypes[RESOURCE_TYPES.ACID] = new ResourceType({
  name: RESOURCE_TYPES.ACID,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 160,
  icon: new Icon({provider: 'svg', name: SVGS.DROP, color: '#dbea00',
    shadow: '#c6d400', secondaryColor: '#f8ff9c'})
});

resourceTypes[RESOURCE_TYPES.GLAZE_TIN] = new ResourceType({
  name: RESOURCE_TYPES.GLAZE_TIN,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 800,
  icon: new Icon({provider: 'svg', name: SVGS.GLAZE, color: '#94a2bd',
    shadow: '#758da2'})
});

resourceTypes[RESOURCE_TYPES.GLAZE_ASH] = new ResourceType({
  name: RESOURCE_TYPES.GLAZE_ASH,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 240,
  icon: new Icon({provider: 'svg', name: SVGS.GLAZE, color: '#676767',
    shadow: '#1d1d1d'})
});

resourceTypes[RESOURCE_TYPES.TERRACOTTA] = new ResourceType({
  name: RESOURCE_TYPES.TERRACOTTA,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.POTTERY],
  value: 60,
  icon: new Icon({provider: 'svg', name: SVGS.TERRACOTTA})
});

resourceTypes[RESOURCE_TYPES.FAIENCE] = new ResourceType({
  name: RESOURCE_TYPES.FAIENCE,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.POTTERY],
  value: 1200,
  icon: new Icon({provider: 'svg', name: SVGS.FAIENCE})
});

resourceTypes[RESOURCE_TYPES.ASHWARE] = new ResourceType({
  name: RESOURCE_TYPES.ASHWARE,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.POTTERY],
  value: 480,
  icon: new Icon({provider: 'svg', name: SVGS.ASHWARE})
});

resourceTypes[RESOURCE_TYPES.SOUP] = new ResourceType({
  name: RESOURCE_TYPES.SOUP,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.SOUP, color: '#F47400',
    shadow: '#f25600'})
});

resourceTypes[RESOURCE_TYPES.BREAD] = new ResourceType({
  name: RESOURCE_TYPES.BREAD,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 200,
  icon: new Icon({provider: 'svg', name: SVGS.BREAD})
});

resourceTypes[RESOURCE_TYPES.OMELET] = new ResourceType({
  name: RESOURCE_TYPES.OMELET,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.OMELET, color: '#18c08b',
    shadow: '#0caf7b'})
});

resourceTypes[RESOURCE_TYPES.STEW] = new ResourceType({
  name: RESOURCE_TYPES.STEW,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.STEW, color: '#fa690e',
    shadow: '#f94c10'})
});

resourceTypes[RESOURCE_TYPES.PIE] = new ResourceType({
  name: RESOURCE_TYPES.PIE,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.PIE, color: '#ed5565ff'})
});

resourceTypes[RESOURCE_TYPES.CAKE] = new ResourceType({
  name: RESOURCE_TYPES.CAKE,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: new Icon({provider: 'svg', name: SVGS.CAKE, color: '#fa690e',
    shadow: '#f94c10'})
});

resourceTypes[RESOURCE_TYPES.MISTAKE] = new ResourceType({
  name: RESOURCE_TYPES.MISTAKE,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 1,
  icon: new Icon({provider: 'svg', name: SVGS.MISTAKE})
});

resourceTypes[RESOURCE_TYPES.BEER] = new ResourceType({
  name: RESOURCE_TYPES.BEER,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.DRINK],
  value: 60,
  icon: new Icon({provider: 'svg', name: SVGS.BEER})
});

resourceTypes[RESOURCE_TYPES.LIQUOR] = new ResourceType({
  name: RESOURCE_TYPES.LIQUOR,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.DRINK],
  value: 180,
  icon: new Icon({provider: 'svg', name: SVGS.LIQUOR})
});

resourceTypes[(EQUIPMENT_TYPES.ROUGH_MATTOCK + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.ROUGH_MATTOCK + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 4000,
  icon: new Icon({provider: 'svg', name: SVGS.ROUGH_MATTOCK})
});

resourceTypes[(EQUIPMENT_TYPES.WOODEN_POLE + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.WOODEN_POLE + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 4000,
  icon: new Icon({provider: 'svg', name: SVGS.WOODEN_POLE})
});

resourceTypes[(EQUIPMENT_TYPES.COARSE_IMPLEMENTS + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.COARSE_IMPLEMENTS + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 4000,
  icon: new Icon({provider: 'svg', name: SVGS.COARSE_IMPLEMENTS})
});

resourceTypes[(EQUIPMENT_TYPES.SIMPLE_ROBE + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.SIMPLE_ROBE + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.CLOTHING],
  value: 2000,
  icon: new Icon({provider: 'svg', name: SVGS.SIMPLE_ROBE})
});

resourceTypes[(EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK + ' (Unmarked)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 3000,
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_HAVERSACK})
});

resourceTypes[(EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG + ' (Unmarked)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 3000,
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_GEARBAG})
});

resourceTypes[(EQUIPMENT_TYPES.JOURNEYMANS_TOOLPACK + ' (Unmarked)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.JOURNEYMANS_TOOLPACK + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 3000,
  icon: new Icon({provider: 'svg', name: SVGS.JOURNEYMANS_TOOLPACK})
});

export { resourceTypes }
