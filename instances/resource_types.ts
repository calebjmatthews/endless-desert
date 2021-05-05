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
  icon: new Icon({provider: 'svg', name: SVGS.WATER})
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
  icon: new Icon({provider: 'FontAwesome5', name: 'kiwi-bird'}),
  foregroundColor: '#caa096',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.EGGS] = new ResourceType({
  name: RESOURCE_TYPES.EGGS,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.ANIMAL_PRODUCT, RESOURCE_TAGS.INGREDIENT],
  value: 80,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'egg'}),
  foregroundColor: '#000',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.FERTILIZER] = new ResourceType({
  name: RESOURCE_TYPES.FERTILIZER,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.ANIMAL_PRODUCT],
  value: 10,
  icon: new Icon({provider: 'FontAwesome5', name: 'poop'}),
  foregroundColor: '#4a0e0e',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.OXEN] = new ResourceType({
  name: RESOURCE_TYPES.OXEN,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.ANIMAL, RESOURCE_TAGS.INGREDIENT],
  value: 400,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'cow'}),
  foregroundColor: '#4a0e0e',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.MILK] = new ResourceType({
  name: RESOURCE_TYPES.MILK,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.ANIMAL_PRODUCT, RESOURCE_TAGS.INGREDIENT],
  value: 100,
  icon: new Icon({provider: 'Entypo', name: 'bucket'}),
  foregroundColor: '#000',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.SILKWORM_COCOON] = new ResourceType({
  name: RESOURCE_TYPES.SILKWORM_COCOON,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.ANIMAL_PRODUCT],
  value: 200,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'bug'}),
  foregroundColor: '#4f8000',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.WOOD_OAK] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_OAK,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.BITTER],
  value: 50,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'}),
  foregroundColor: '#790f0f',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WOOD_ROWAN] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_ROWAN,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.HERBAL],
  value: 50,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'}),
  foregroundColor: '#95a53c',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WOOD_WALNUT] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_WALNUT,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.SOUR],
  value: 50,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'}),
  foregroundColor: '#927150',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WOOD_ALDER] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_ALDER,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.SPICY],
  value: 50,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'}),
  foregroundColor: '#a5104e',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WOOD_MAPLE] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_MAPLE,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.SWEET],
  value: 50,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'}),
  foregroundColor: '#d2734f',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WOOD_WILLOW] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_WILLOW,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.BRACKISH],
  value: 50,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'}),
  foregroundColor: '#e87b7b',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WOOD_ASH] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_ASH,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.SAVORY],
  value: 50,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'}),
  foregroundColor: '#ffcd8f',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.WOOD_SPRUCE] = new ResourceType({
  name: RESOURCE_TYPES.WOOD_SPRUCE,
  subcategory: RESOURCE_SUBCATEGORIES.WOOD,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.CONSTRUCTION, RESOURCE_TAGS.COOLING],
  value: 50,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'view-dashboard-variant'}),
  foregroundColor: '#633c02',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.CLAY_RED] = new ResourceType({
  name: RESOURCE_TYPES.CLAY_RED,
  subcategory: RESOURCE_SUBCATEGORIES.CLAY,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 15,
  icon: new Icon({provider: 'FontAwesome5', name: 'splotch'}),
  foregroundColor: '#a91f1f',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.BRICKS_RED] = new ResourceType({
  name: RESOURCE_TYPES.BRICKS_RED,
  subcategory: RESOURCE_SUBCATEGORIES.BRICK,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [RESOURCE_TAGS.CONSTRUCTION],
  value: 80,
  icon: new Icon({provider: 'FontAwesome', name: 'cubes'}),
  foregroundColor: '#a91f1f',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.THATCH] = new ResourceType({
  name: RESOURCE_TYPES.THATCH,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [RESOURCE_TAGS.CONSTRUCTION],
  value: 40,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'pound-box'}),
  foregroundColor: '#ceb903',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.SAND_YELLOW] = new ResourceType({
  name: RESOURCE_TYPES.SAND_YELLOW,
  subcategory: RESOURCE_SUBCATEGORIES.SAND,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 3,
  icon: new Icon({provider: 'FontAwesome5', name: 'mountain'}),
  foregroundColor: '#f9df00',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.SLAG] = new ResourceType({
  name: RESOURCE_TYPES.SLAG,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 1,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'circle-slice-8'}),
  foregroundColor: '#000',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.CHARCOAL] = new ResourceType({
  name: RESOURCE_TYPES.CHARCOAL,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT, RESOURCE_TAGS.FUEL],
  value: 60,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'circle-slice-8'}),
  foregroundColor: '#000',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.CARBON] = new ResourceType({
  name: RESOURCE_TYPES.CARBON,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.PLANT],
  value: 80,
  icon: new Icon({provider: 'MaterialIcons', name: 'grain'}),
  foregroundColor: '#000',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.RUST_ORE] = new ResourceType({
  name: RESOURCE_TYPES.RUST_ORE,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 200,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'circle-slice-8'}),
  foregroundColor: '#a02d01',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.IRON_POWDER] = new ResourceType({
  name: RESOURCE_TYPES.IRON_POWDER,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 350,
  icon: new Icon({provider: 'MaterialIcons', name: 'grain'}),
  foregroundColor: '#a02d01',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.CRUDE_IRON] = new ResourceType({
  name: RESOURCE_TYPES.CRUDE_IRON,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 400,
  icon: new Icon({provider: 'FontAwesome5', name: 'bars'}),
  foregroundColor: '#a02d01',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.GREENISH_ORE] = new ResourceType({
  name: RESOURCE_TYPES.GREENISH_ORE,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 600,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'circle-slice-8'}),
  foregroundColor: '#00a07c',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.COPPER_POWDER] = new ResourceType({
  name: RESOURCE_TYPES.COPPER_POWDER,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 1100,
  icon: new Icon({provider: 'MaterialIcons', name: 'grain'}),
  foregroundColor: '#ff7f22',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.DUSTY_ORE] = new ResourceType({
  name: RESOURCE_TYPES.DUSTY_ORE,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 400,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'circle-slice-8'}),
  foregroundColor: '#758da2',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.TIN_POWDER] = new ResourceType({
  name: RESOURCE_TYPES.TIN_POWDER,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 650,
  icon: new Icon({provider: 'MaterialIcons', name: 'grain'}),
  foregroundColor: '#c3ced8',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.BRONZE] = new ResourceType({
  name: RESOURCE_TYPES.BRONZE,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 800,
  icon: new Icon({provider: 'FontAwesome5', name: 'bars'}),
  foregroundColor: '#ce6112',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.PALE_ORE] = new ResourceType({
  name: RESOURCE_TYPES.PALE_ORE,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 350,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'circle-slice-8'}),
  foregroundColor: '#cfcfe2',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.ZINC_POWDER] = new ResourceType({
  name: RESOURCE_TYPES.ZINC_POWDER,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 620,
  icon: new Icon({provider: 'MaterialIcons', name: 'grain'}),
  foregroundColor: '#cfcfe2',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.SULFUR] = new ResourceType({
  name: RESOURCE_TYPES.SULFUR,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.EARTH],
  value: 200,
  icon: new Icon({provider: 'MaterialIcons', name: 'grain'}),
  foregroundColor: '#e8f900',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.BRASS] = new ResourceType({
  name: RESOURCE_TYPES.BRASS,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 740,
  icon: new Icon({provider: 'FontAwesome5', name: 'bars'}),
  foregroundColor: '#f5b012',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.STEEL] = new ResourceType({
  name: RESOURCE_TYPES.STEEL,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 2000,
  icon: new Icon({provider: 'FontAwesome5', name: 'bars'}),
  foregroundColor: '#8ea2d8',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.SALT] = new ResourceType({
  name: RESOURCE_TYPES.SALT,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.BRACKISH, RESOURCE_TAGS.SPICE],
  value: 20,
  icon: new Icon({provider: 'FontAwesome5', name: 'mortar-pestle'}),
  foregroundColor: '#000',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.CINNAMON] = new ResourceType({
  name: RESOURCE_TYPES.CINNAMON,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.SAVORY, RESOURCE_TAGS.SPICE],
  value: 40,
  icon: new Icon({provider: 'FontAwesome5', name: 'mortar-pestle'}),
  foregroundColor: '#bf1414',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.CAROB] = new ResourceType({
  name: RESOURCE_TYPES.CAROB,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.SWEET, RESOURCE_TAGS.SPICE],
  value: 40,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'seed-outline'}),
  foregroundColor: '#843619',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.MINT] = new ResourceType({
  name: RESOURCE_TYPES.MINT,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.COOLING, RESOURCE_TAGS.SPICE],
  value: 80,
  icon: new Icon({provider: 'FontAwesome5', name: 'leaf'}),
  foregroundColor: '#38ca8d',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.PEPPERCORN] = new ResourceType({
  name: RESOURCE_TYPES.PEPPERCORN,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.SPICY, RESOURCE_TAGS.SPICE],
  value: 40,
  icon: new Icon({provider: 'MaterialIcons', name: 'grain'}),
  foregroundColor: '#272727',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.CORIANDER] = new ResourceType({
  name: RESOURCE_TYPES.CORIANDER,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.HERBAL, RESOURCE_TAGS.SPICE],
  value: 40,
  icon: new Icon({provider: 'FontAwesome5', name: 'leaf'}),
  foregroundColor: '#1ca921',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.ANISE] = new ResourceType({
  name: RESOURCE_TYPES.ANISE,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.BITTER, RESOURCE_TAGS.SPICE],
  value: 40,
  icon: new Icon({provider: 'FontAwesome5', name: 'star'}),
  foregroundColor: '#6b1f03',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.SORREL] = new ResourceType({
  name: RESOURCE_TYPES.SORREL,
  category: RESOURCE_CATEGORIES.MATERIAL,
  tags: [RESOURCE_TAGS.SOUR, RESOURCE_TAGS.SPICE],
  value: 40,
  icon: new Icon({provider: 'MaterialIcons', name: 'grass'}),
  foregroundColor: '#8eb530',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.GLASS] = new ResourceType({
  name: RESOURCE_TYPES.GLASS,
  subcategory: RESOURCE_SUBCATEGORIES.GLASS,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [RESOURCE_TAGS.CONSTRUCTION],
  value: 120,
  icon: new Icon({provider: 'FontAwesome5', name: 'solar-panel'}),
  foregroundColor: '#33cee2',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.OLIVE_OIL] = new ResourceType({
  name: RESOURCE_TYPES.OLIVE_OIL,
  subcategory: RESOURCE_SUBCATEGORIES.OIL,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.SPICE],
  value: 250,
  icon: new Icon({provider: 'FontAwesome5', name: 'oil-can'}),
  foregroundColor: '#97c701',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.PULP] = new ResourceType({
  name: RESOURCE_TYPES.PULP,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 50,
  icon: new Icon({provider: 'FontAwesome', name: 'certificate'}),
  foregroundColor: '#e6dab8',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.PAPYRUS] = new ResourceType({
  name: RESOURCE_TYPES.PAPYRUS,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 150,
  icon: new Icon({provider: 'FontAwesome5', name: 'newspaper'}),
  foregroundColor: '#e6dab8',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.INK_FERROUS] = new ResourceType({
  name: RESOURCE_TYPES.INK_FERROUS,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 300,
  icon: new Icon({provider: 'FontAwesome5', name: 'tint'}),
  foregroundColor: '#000',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.LINEN] = new ResourceType({
  name: RESOURCE_TYPES.LINEN,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [],
  value: 200,
  icon: new Icon({provider: 'Entypo', name: 'spreadsheet'}),
  foregroundColor: '#b7efe4',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.SILK] = new ResourceType({
  name: RESOURCE_TYPES.SILK,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [],
  value: 2000,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'lightbulb-cfl-spiral'}),
  foregroundColor: '#ffe668',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.ABRASIVE] = new ResourceType({
  name: RESOURCE_TYPES.ABRASIVE,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [RESOURCE_TAGS.EARTH],
  value: 5,
  icon: new Icon({provider: 'MaterialIcons', name: 'grain'}),
  foregroundColor: '#f9df00',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.BEADS] = new ResourceType({
  name: RESOURCE_TYPES.BEADS,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [],
  value: 180,
  icon: new Icon({provider: 'FontAwesome5', name: 'bowling-ball'}),
  foregroundColor: '#33cee2',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.GLASSWARE] = new ResourceType({
  name: RESOURCE_TYPES.GLASSWARE,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [],
  value: 800,
  icon: new Icon({provider: 'FontAwesome5', name: 'wine-glass-alt'}),
  foregroundColor: '#33cee2',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.LENSES] = new ResourceType({
  name: RESOURCE_TYPES.LENSES,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [],
  value: 1800,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'moon-waning-gibbous'}),
  foregroundColor: '#33cee2',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.ACID] = new ResourceType({
  name: RESOURCE_TYPES.ACID,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 160,
  icon: new Icon({provider: 'FontAwesome5', name: 'tint'}),
  foregroundColor: '#e8f900',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.GLAZE_TIN] = new ResourceType({
  name: RESOURCE_TYPES.GLAZE_TIN,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 800,
  icon: new Icon({provider: 'FontAwesome5', name: 'tint'}),
  foregroundColor: '#c3ced8',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.GLAZE_ASH] = new ResourceType({
  name: RESOURCE_TYPES.GLAZE_ASH,
  category: RESOURCE_CATEGORIES.MATERIAL_REFINED,
  tags: [],
  value: 240,
  icon: new Icon({provider: 'FontAwesome5', name: 'tint'}),
  foregroundColor: '#000',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.TERRACOTTA] = new ResourceType({
  name: RESOURCE_TYPES.TERRACOTTA,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.POTTERY],
  value: 60,
  icon: new Icon({provider: 'FontAwesome5', name: 'glass-whiskey'}),
  foregroundColor: '#942c14',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.FAIENCE] = new ResourceType({
  name: RESOURCE_TYPES.FAIENCE,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.POTTERY],
  value: 1200,
  icon: new Icon({provider: 'FontAwesome5', name: 'glass-whiskey'}),
  foregroundColor: '#c3ced8',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.ASHWARE] = new ResourceType({
  name: RESOURCE_TYPES.ASHWARE,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.POTTERY],
  value: 480,
  icon: new Icon({provider: 'FontAwesome5', name: 'glass-whiskey'}),
  foregroundColor: '#000',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.SOUP] = new ResourceType({
  name: RESOURCE_TYPES.SOUP,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'pot'}),
  foregroundColor: '#59a500',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.BREAD] = new ResourceType({
  name: RESOURCE_TYPES.BREAD,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.FOOD],
  value: 200,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'baguette'}),
  foregroundColor: '#790f0f',
  backgroundColor: '#fff'
});

resourceTypes[RESOURCE_TYPES.OMELET] = new ResourceType({
  name: RESOURCE_TYPES.OMELET,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'egg'}),
  foregroundColor: '#ffeb38',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.STEW] = new ResourceType({
  name: RESOURCE_TYPES.STEW,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'pot-mix'}),
  foregroundColor: '#795548',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.PIE] = new ResourceType({
  name: RESOURCE_TYPES.PIE,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: new Icon({provider: 'FontAwesome5', name: 'chart-pie'}),
  foregroundColor: '#673ab7',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.CAKE] = new ResourceType({
  name: RESOURCE_TYPES.CAKE,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 80,
  icon: new Icon({provider: 'FontAwesome5', name: 'birthday-cake'}),
  foregroundColor: '#e493a1',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.MISTAKE] = new ResourceType({
  name: RESOURCE_TYPES.MISTAKE,
  category: RESOURCE_CATEGORIES.DISH,
  tags: [RESOURCE_TAGS.FOOD],
  value: 1,
  icon: new Icon({provider: 'FontAwesome5', name: 'trash-alt'}),
  foregroundColor: '#97e600',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.BEER] = new ResourceType({
  name: RESOURCE_TYPES.BEER,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.DRINK],
  value: 60,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'glass-mug-variant'}),
  foregroundColor: '#e8cf1e',
  backgroundColor: '#fff',
});

resourceTypes[RESOURCE_TYPES.LIQUOR] = new ResourceType({
  name: RESOURCE_TYPES.LIQUOR,
  category: RESOURCE_CATEGORIES.ARTISAN_GOOD,
  tags: [RESOURCE_TAGS.DRINK],
  value: 180,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'glass-tulip'}),
  foregroundColor: '#9c521d',
  backgroundColor: '#fff',
});

resourceTypes[(EQUIPMENT_TYPES.ROUGH_MATTOCK + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.ROUGH_MATTOCK + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 4000,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'pickaxe'}),
  foregroundColor: '#6d6d6d',
  backgroundColor: '#fff'
});

resourceTypes[(EQUIPMENT_TYPES.WOODEN_POLE + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.WOODEN_POLE + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 4000,
  icon: new Icon({provider: 'FontAwesome5', name: 'slash'}),
  foregroundColor: '#795548',
  backgroundColor: '#fff'
});

resourceTypes[(EQUIPMENT_TYPES.COARSE_IMPLEMENTS + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.COARSE_IMPLEMENTS + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.TOOL],
  value: 4000,
  icon: new Icon({provider: 'FontAwesome5', name: 'tools'}),
  foregroundColor: '#6d6d6d',
  backgroundColor: '#fff'
});

resourceTypes[(EQUIPMENT_TYPES.SIMPLE_ROBE + ' (Unmarked)')] = new ResourceType({
  name: (EQUIPMENT_TYPES.SIMPLE_ROBE + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.CLOTHING],
  value: 2000,
  icon: new Icon({provider: 'FontAwesome5', name: 'tshirt'}),
  foregroundColor: '#afc1ec',
  backgroundColor: '#fff'
});

resourceTypes[(EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK + ' (Unmarked)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.JOURNEYMANS_HAVERSACK + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 3000,
  icon: new Icon({provider: 'FontAwesome5', name: 'box'}),
  foregroundColor: '#1a7b1d',
  backgroundColor: '#fff'
});

resourceTypes[(EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG + ' (Unmarked)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.JOURNEYMANS_GEARBAG + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 3000,
  icon: new Icon({provider: 'MaterialCommunityIcons', name: 'toolbox'}),
  foregroundColor: '#1a457b',
  backgroundColor: '#fff'
});

resourceTypes[(EQUIPMENT_TYPES.JOURNEYMANS_KITPACK + ' (Unmarked)')] =
new ResourceType({
  name: (EQUIPMENT_TYPES.JOURNEYMANS_KITPACK + ' (Unmarked)'),
  category: RESOURCE_CATEGORIES.EQUIPMENT,
  tags: [EQUIPMENT_SLOTS.BACK],
  value: 3000,
  icon: new Icon({provider: 'FontAwesome5', name: 'toolbox'}),
  foregroundColor: '#7a1a7b',
  backgroundColor: '#fff'
});

export { resourceTypes }
