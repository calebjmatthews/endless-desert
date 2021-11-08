import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import KnowledgeSvgComponent from './resources/knowledge';
import NotesSkySvgComponent from './resources/notes_sky';
import NotesStarSvgComponent from './resources/notes_star';
import NotesWaterSvgComponent from './resources/notes_water';
import NotesEarthSvgComponent from './resources/notes_earth';
import NotesHeatSvgComponent from './resources/notes_heat';
import NotesCultivationSvgComponent from './resources/notes_cultivation';
import LentilSvgComponent from './resources/lentil';
import BlueberrySvgComponent from './resources/blueberry';
import GrapeSvgComponent from './resources/grape';
import SquashSvgComponent from './resources/squash';
import TomatoSvgComponent from './resources/tomato';
import KumquatSvgComponent from './resources/kumquat';
import LemonSvgComponent from './resources/lemon';
import SpinachSvgComponent from './resources/spinach';
import RadishSvgComponent from './resources/radish';
import OnionSvgComponent from './resources/onion';
import ChilliPepperSvgComponent from './resources/chilli_pepper';
import PotatoSvgComponent from './resources/potato';
import LotusRootSvgComponent from './resources/lotus_root';
import DateSvgComponent from './resources/date';
import FigSvgComponent from './resources/fig';
import DropSvgComponent from './resources/drop';
import SeedsSvgComponent from './resources/seeds';
import ReedsSvgComponent from './resources/reeds';
import GrainSvgComponent from './resources/grain';
import FlourSvgComponent from './resources/flour';
import OliveSvgComponent from './resources/olive';
import CarpSvgComponent from './resources/carp';
import MinnowSvgComponent from './resources/minnow';
import BarramundiSvgComponent from './resources/barramundi';
import QuailSvgComponent from './resources/quail';
import QuailMeatSvgComponent from './resources/quail_meat';
import EggSvgComponent from './resources/egg';
import FertilizerSvgComponent from './resources/fertilizer';
import OxSvgComponent from './resources/ox';
import OxMeatSvgComponent from './resources/ox_meat';
import MilkSvgComponent from './resources/milk';
import SilkwormCocoonSvgComponent from './resources/silkworm_cocoon';
import WoodSvgComponent from './resources/wood';
import ClaySvgComponent from './resources/clay';
import BrickSvgComponent from './resources/brick';
import ThatchSvgComponent from './resources/thatch';
import SandSvgComponent from './resources/sand';
import CharcoalSvgComponent from './resources/charcoal';
import CarbonSvgComponent from './resources/carbon';
import OreSvgComponent from './resources/ore';
import PowderSvgComponent from './resources/powder';
import BarSvgComponent from './resources/bar';
import JadeSvgComponent from './resources/jade';
import AmethystSvgComponent from './resources/amethyst';
import TopazSvgComponent from './resources/topaz';
import LapisLazuliSvgComponent from './resources/lapis_lazuli';
import OnyxSvgComponent from './resources/onyx';
import RubySvgComponent from './resources/ruby';
import SapphireSvgComponent from './resources/sapphire';
import EmeraldSvgComponent from './resources/emerald';
import DiamondSvgComponent from './resources/diamond';
import SaltSvgComponent from './resources/salt';
import CinnamonSvgComponent from './resources/cinnamon';
import CarobSvgComponent from './resources/carob';
import MintSvgComponent from './resources/mint';
import PeppercornSvgComponent from './resources/peppercorn';
import CorianderSvgComponent from './resources/coriander';
import AniseSvgComponent from './resources/anise';
import SorrelSvgComponent from './resources/sorrel';
import GlassSvgComponent from './resources/glass';
import OliveOilSvgComponent from './resources/olive_oil';
import PulpSvgComponent from './resources/pulp';
import PapyrusSvgComponent from './resources/papyrus';
import LinenSvgComponent from './resources/linen';
import SilkSvgComponent from './resources/silk';
import AbrasiveSvgComponent from './resources/abrasive';
import BeadsSvgComponent from './resources/beads';
import GlasswareSvgComponent from './resources/glassware';
import LensSvgComponent from './resources/lens';
import GlazeSvgComponent from './resources/glaze';
import TerracottaSvgComponent from './resources/terracotta';
import FaienceSvgComponent from './resources/faience';
import AshwareSvgComponent from './resources/ashware';
import PorcelainSvgComponent from './resources/porcelain';
import SoupSvgComponent from './resources/soup';
import BreadSvgComponent from './resources/bread';
import StewSvgComponent from './resources/stew';
import OmeletSvgComponent from './resources/omelet';
import PieSvgComponent from './resources/pie';
import CakeSvgComponent from './resources/cake';
import WaybreadSvgComponent from './resources/waybread';
import DriedFruitSvgComponent from './resources/dried_fruit';
import SaltedMeatSvgComponent from './resources/salted_meat';
import MistakeSvgComponent from './resources/mistake';
import BeerSvgComponent from './resources/beer';
import LiquorSvgComponent from './resources/liquor';
import TomeSvgComponent from './resources/tome';
import KeyComponent from './resources/key';

import RoughMattockSvgComponent from './equipment/rough_mattock';
import WoodenPoleSvgComponent from './equipment/wooden_pole';
import CoarseImplementsSvgComponent from './equipment/coarse_implements';
import SimpleRobeSvgComponent from './equipment/simple_robe';
import JourneymansHaversackSvgComponent from './equipment/journeymans_haversack';
import JourneymansGearbagSvgComponent from './equipment/journeymans_gearbag';
import JourneymansToolpackSvgComponent from './equipment/journeymans_toolpack';
import ShoulderPouchSvgComponent from './equipment/shoulder_pouch';

import SkySvgComponent from './buildings/sky';
import BrokenCisternSvgComponent from './buildings/broken_cistern';
import CisternSvgComponent from './buildings/cistern';
import DecayingStudySvgComponent from './buildings/decaying_study';
import StudySvgComponent from './buildings/study';
import AbandonedMarketSvgComponent from './buildings/abandoned_market';
import MarketSvgComponent from './buildings/market';
import ShatteredDomeSvgComponent from './buildings/shattered_dome';
import ObservatorySvgComponent from './buildings/observatory';
import GateSvgComponent from './buildings/gate';
import WatchtowerSvgComponent from './buildings/watchtower';
import RuinedHutsSvgComponent from './buildings/ruined_huts';
import HutSvgComponent from './buildings/hut';
import CottagesSvgComponent from './buildings/cottages';
import FallowFieldSvgComponent from './buildings/fallow_field';
import LentilFieldSvgComponent from './buildings/lentil_field';
import ClayPitSvgComponent from './buildings/clay_pit';
import SandPitSvgComponent from './buildings/sand_pit';
import ReedDeltaSvgComponent from './buildings/reed_delta';
import GrainFieldSvgComponent from './buildings/grain_field';
import OliveGroveSvgComponent from './buildings/olive_grove';
import FishingPondSvgComponent from './buildings/fishing_pond';
import QuailPastureSvgComponent from './buildings/quail_pasture';
import OxPastureSvgComponent from './buildings/ox_pasture';
import PressSvgComponent from './buildings/press';
import GrindingMillSvgComponent from './buildings/grinding_mill';
import SpiceFieldSvgComponent from './buildings/spice_field';
import HouseSvgComponent from './buildings/house';
import WeaverySvgComponent from './buildings/weavery';
import SandCascadeSvgComponent from './buildings/sand_cascade';
import TailorsSvgComponent from './buildings/tailors';
import OutfittersSvgComponent from './buildings/outfitters';
import FabricatorySvgComponent from './buildings/fabricatory';
import DryingYardSvgComponent from './buildings/drying_yard';
import FurnaceSvgComponent from './buildings/furnace';
import KitchenSvgComponent from './buildings/kitchen';
import GlassworksSvgComponent from './buildings/glassworks';
import LaboratorySvgComponent from './buildings/laboratory';
import PotteryKilnSvgComponent from './buildings/pottery_kiln';
import BrewerySvgComponent from './buildings/brewery';

import SamannoudSvgComponent from './people/samannoud';
import ShudderingRefugeSvgComponent from './people/shuddering_refuge';
import FoxfireHereticSvgComponent from './people/foxfire_heretic';
import TrefoilSowerSvgComponent from './people/trefoil_sower';
import ScarredScholarSvgComponent from './people/scarred_scholar';
import AuspiciousWaifSvgComponent from './people/auspicious_waif';
import YouSvgComponent from './people/you';

import RedCrowTradersSvgComponent from './symbols/red_crow_traders';
import FoxfireAsceticsSvgComponent from './symbols/foxfire_ascetics';
import TrefoilKingdomSvgComponent from './symbols/trefoil_kingdom';
import TourmalineJewelersSvgComponent from './symbols/tourmaline_jewelers';
import SpringAutumnKingdomSvgComponent from './symbols/spring_autumn_kingdom';

import HappinessSvgComponent from './symbols/happiness';
import RoadSignSvgComponent from './symbols/road_sign';

import Icon from '../../models/icon';
import { SVGS } from '../../enums/svgs';

export default function SvgComponent(props: { icon: Icon }) {
  switch (props.icon.name) {
    case SVGS.KNOWLEDGE:
    return <KnowledgeSvgComponent icon={props.icon} />;
    case SVGS.NOTES_SKY:
    return <NotesSkySvgComponent icon={props.icon} />;
    case SVGS.NOTES_STAR:
    return <NotesStarSvgComponent icon={props.icon} />;
    case SVGS.NOTES_WATER:
    return <NotesWaterSvgComponent icon={props.icon} />;
    case SVGS.NOTES_EARTH:
    return <NotesEarthSvgComponent icon={props.icon} />;
    case SVGS.NOTES_HEAT:
    return <NotesHeatSvgComponent icon={props.icon} />;
    case SVGS.NOTES_CULTIVATION:
    return <NotesCultivationSvgComponent icon={props.icon} />;
    case SVGS.LENTIL:
    return <LentilSvgComponent icon={props.icon} />;
    case SVGS.BLUEBERRY:
    return <BlueberrySvgComponent icon={props.icon} />;
    case SVGS.GRAPE:
    return <GrapeSvgComponent icon={props.icon} />;
    case SVGS.SQUASH:
    return <SquashSvgComponent icon={props.icon} />;
    case SVGS.TOMATO:
    return <TomatoSvgComponent icon={props.icon} />;
    case SVGS.KUMQUAT:
    return <KumquatSvgComponent icon={props.icon} />;
    case SVGS.LEMON:
    return <LemonSvgComponent icon={props.icon} />;
    case SVGS.SPINACH:
    return <SpinachSvgComponent icon={props.icon} />;
    case SVGS.RADISH:
    return <RadishSvgComponent icon={props.icon} />;
    case SVGS.ONION:
    return <OnionSvgComponent icon={props.icon} />;
    case SVGS.CHILLI_PEPPER:
    return <ChilliPepperSvgComponent icon={props.icon} />;
    case SVGS.POTATO:
    return <PotatoSvgComponent icon={props.icon} />;
    case SVGS.LOTUS_ROOT:
    return <LotusRootSvgComponent icon={props.icon} />;
    case SVGS.DATE:
    return <DateSvgComponent icon={props.icon} />;
    case SVGS.FIG:
    return <FigSvgComponent icon={props.icon} />;
    case SVGS.DROP:
    return <DropSvgComponent icon={props.icon} />;
    case SVGS.SEEDS:
    return <SeedsSvgComponent icon={props.icon} />;
    case SVGS.REEDS:
    return <ReedsSvgComponent icon={props.icon} />;
    case SVGS.GRAIN:
    return <GrainSvgComponent icon={props.icon} />;
    case SVGS.FLOUR:
    return <FlourSvgComponent icon={props.icon} />;
    case SVGS.OLIVE:
    return <OliveSvgComponent icon={props.icon} />;
    case SVGS.MINNOW:
    return <MinnowSvgComponent icon={props.icon} />;
    case SVGS.CARP:
    return <CarpSvgComponent icon={props.icon} />;
    case SVGS.BARRAMUNDI:
    return <BarramundiSvgComponent icon={props.icon} />;
    case SVGS.QUAIL:
    return <QuailSvgComponent icon={props.icon} />;
    case SVGS.QUAIL_MEAT:
    return <QuailMeatSvgComponent icon={props.icon} />;
    case SVGS.EGG:
    return <EggSvgComponent icon={props.icon} />;
    case SVGS.FERTILIZER:
    return <FertilizerSvgComponent icon={props.icon} />;
    case SVGS.OX:
    return <OxSvgComponent icon={props.icon} />;
    case SVGS.OX_MEAT:
    return <OxMeatSvgComponent icon={props.icon} />;
    case SVGS.MILK:
    return <MilkSvgComponent icon={props.icon} />;
    case SVGS.SILKWORM_COCOON:
    return <SilkwormCocoonSvgComponent icon={props.icon} />;
    case SVGS.WOOD:
    return <WoodSvgComponent icon={props.icon} />;
    case SVGS.CLAY:
    return <ClaySvgComponent icon={props.icon} />;
    case SVGS.BRICK:
    return <BrickSvgComponent icon={props.icon} />;
    case SVGS.THATCH:
    return <ThatchSvgComponent icon={props.icon} />;
    case SVGS.SAND:
    return <SandSvgComponent icon={props.icon} />;
    case SVGS.CHARCOAL:
    return <CharcoalSvgComponent icon={props.icon} />;
    case SVGS.CARBON:
    return <CarbonSvgComponent icon={props.icon} />;
    case SVGS.ORE:
    return <OreSvgComponent icon={props.icon} />;
    case SVGS.POWDER:
    return <PowderSvgComponent icon={props.icon} />;
    case SVGS.BAR:
    return <BarSvgComponent icon={props.icon} />;
    case SVGS.JADE:
    return <JadeSvgComponent icon={props.icon} />;
    case SVGS.AMETHYST:
    return <AmethystSvgComponent icon={props.icon} />;
    case SVGS.TOPAZ:
    return <TopazSvgComponent icon={props.icon} />;
    case SVGS.LAPIS_LAZULI:
    return <LapisLazuliSvgComponent icon={props.icon} />;
    case SVGS.ONYX:
    return <OnyxSvgComponent icon={props.icon} />;
    case SVGS.RUBY:
    return <RubySvgComponent icon={props.icon} />;
    case SVGS.SAPPHIRE:
    return <SapphireSvgComponent icon={props.icon} />;
    case SVGS.EMERALD:
    return <EmeraldSvgComponent icon={props.icon} />;
    case SVGS.DIAMOND:
    return <DiamondSvgComponent icon={props.icon} />;
    case SVGS.SALT:
    return <SaltSvgComponent icon={props.icon} />;
    case SVGS.CINNAMON:
    return <CinnamonSvgComponent icon={props.icon} />;
    case SVGS.CAROB:
    return <CarobSvgComponent icon={props.icon} />;
    case SVGS.MINT:
    return <MintSvgComponent icon={props.icon} />;
    case SVGS.PEPPERCORN:
    return <PeppercornSvgComponent icon={props.icon} />;
    case SVGS.CORIANDER:
    return <CorianderSvgComponent icon={props.icon} />;
    case SVGS.ANISE:
    return <AniseSvgComponent icon={props.icon} />;
    case SVGS.SORREL:
    return <SorrelSvgComponent icon={props.icon} />;
    case SVGS.GLASS:
    return <GlassSvgComponent icon={props.icon} />;
    case SVGS.OLIVE_OIL:
    return <OliveOilSvgComponent icon={props.icon} />;
    case SVGS.PULP:
    return <PulpSvgComponent icon={props.icon} />;
    case SVGS.PAPYRUS:
    return <PapyrusSvgComponent icon={props.icon} />;
    case SVGS.LINEN:
    return <LinenSvgComponent icon={props.icon} />;
    case SVGS.SILK:
    return <SilkSvgComponent icon={props.icon} />;
    case SVGS.ABRASIVE:
    return <AbrasiveSvgComponent icon={props.icon} />;
    case SVGS.BEADS:
    return <BeadsSvgComponent icon={props.icon} />;
    case SVGS.GLASSWARE:
    return <GlasswareSvgComponent icon={props.icon} />;
    case SVGS.LENS:
    return <LensSvgComponent icon={props.icon} />;
    case SVGS.GLAZE:
    return <GlazeSvgComponent icon={props.icon} />;
    case SVGS.TERRACOTTA:
    return <TerracottaSvgComponent icon={props.icon} />;
    case SVGS.FAIENCE:
    return <FaienceSvgComponent icon={props.icon} />;
    case SVGS.ASHWARE:
    return <AshwareSvgComponent icon={props.icon} />;
    case SVGS.PORCELAIN:
    return <PorcelainSvgComponent icon={props.icon} />;

    case SVGS.SOUP:
    return <SoupSvgComponent icon={props.icon} />;
    case SVGS.BREAD:
    return <BreadSvgComponent icon={props.icon} />;
    case SVGS.OMELET:
    return <OmeletSvgComponent icon={props.icon} />;
    case SVGS.STEW:
    return <StewSvgComponent icon={props.icon} />;
    case SVGS.PIE:
    return <PieSvgComponent icon={props.icon} />;
    case SVGS.CAKE:
    return <CakeSvgComponent icon={props.icon} />;
    case SVGS.WAYBREAD:
    return <WaybreadSvgComponent icon={props.icon} />;
    case SVGS.DRIED_FRUIT:
    return <DriedFruitSvgComponent icon={props.icon} />;
    case SVGS.SALTED_MEAT:
    return <SaltedMeatSvgComponent icon={props.icon} />;
    case SVGS.MISTAKE:
    return <MistakeSvgComponent icon={props.icon} />;
    case SVGS.BEER:
    return <BeerSvgComponent icon={props.icon} />;
    case SVGS.LIQUOR:
    return <LiquorSvgComponent icon={props.icon} />;
    case SVGS.TOME:
    return <TomeSvgComponent icon={props.icon} />;
    case SVGS.KEY:
    return <KeyComponent icon={props.icon} />;

    case SVGS.ROUGH_MATTOCK:
    return <RoughMattockSvgComponent icon={props.icon} />;
    case SVGS.WOODEN_POLE:
    return <WoodenPoleSvgComponent icon={props.icon} />;
    case SVGS.COARSE_IMPLEMENTS:
    return <CoarseImplementsSvgComponent icon={props.icon} />;
    case SVGS.SIMPLE_ROBE:
    return <SimpleRobeSvgComponent icon={props.icon} />;
    case SVGS.JOURNEYMANS_HAVERSACK:
    return <JourneymansHaversackSvgComponent icon={props.icon} />;
    case SVGS.JOURNEYMANS_GEARBAG:
    return <JourneymansGearbagSvgComponent icon={props.icon} />;
    case SVGS.JOURNEYMANS_TOOLPACK:
    return <JourneymansToolpackSvgComponent icon={props.icon} />;
    case SVGS.SHOULDER_POUCH:
    return <ShoulderPouchSvgComponent icon={props.icon} />;

    case SVGS.SKY:
    return <SkySvgComponent icon={props.icon} />;
    case SVGS.BROKEN_CISTERN:
    return <BrokenCisternSvgComponent icon={props.icon} />;
    case SVGS.CISTERN:
    return <CisternSvgComponent icon={props.icon} />;
    case SVGS.STUDY:
    return <StudySvgComponent icon={props.icon} />;
    case SVGS.DECAYING_STUDY:
    return <DecayingStudySvgComponent icon={props.icon} />;
    case SVGS.ABANDONED_MARKET:
    return <AbandonedMarketSvgComponent icon={props.icon} />;
    case SVGS.MARKET:
    return <MarketSvgComponent icon={props.icon} />;
    case SVGS.SHATTERED_DOME:
    return <ShatteredDomeSvgComponent icon={props.icon} />;
    case SVGS.OBSERVATORY:
    return <ObservatorySvgComponent icon={props.icon} />;
    case SVGS.GATE:
    return <GateSvgComponent icon={props.icon} />;
    case SVGS.WATCHTOWER:
    return <WatchtowerSvgComponent icon={props.icon} />;
    case SVGS.RUINED_HUTS:
    return <RuinedHutsSvgComponent icon={props.icon} />;
    case SVGS.HUTS:
    return <HutSvgComponent icon={props.icon} />;
    case SVGS.COTTAGES:
    return <CottagesSvgComponent icon={props.icon} />;
    case SVGS.FALLOW_FIELD:
    return <FallowFieldSvgComponent icon={props.icon} />;
    case SVGS.LENTIL_FIELD:
    return <LentilFieldSvgComponent icon={props.icon} />;
    case SVGS.CLAY_PIT:
    return <ClayPitSvgComponent icon={props.icon} />;
    case SVGS.SAND_PIT:
    return <SandPitSvgComponent icon={props.icon} />;
    case SVGS.REED_DELTA:
    return <ReedDeltaSvgComponent icon={props.icon} />;
    case SVGS.GRAIN_FIELD:
    return <GrainFieldSvgComponent icon={props.icon} />;
    case SVGS.OLIVE_GROVE:
    return <OliveGroveSvgComponent icon={props.icon} />;
    case SVGS.FISHING_POND:
    return <FishingPondSvgComponent icon={props.icon} />;
    case SVGS.QUAIL_PASTURE:
    return <QuailPastureSvgComponent icon={props.icon} />;
    case SVGS.OX_PASTURE:
    return <OxPastureSvgComponent icon={props.icon} />;
    case SVGS.PRESS:
    return <PressSvgComponent icon={props.icon} />;
    case SVGS.GRINDING_MILL:
    return <GrindingMillSvgComponent icon={props.icon} />;
    case SVGS.SPICE_FIELD:
    return <SpiceFieldSvgComponent icon={props.icon} />;
    case SVGS.HOUSE:
    return <HouseSvgComponent icon={props.icon} />;
    case SVGS.WEAVERY:
    return <WeaverySvgComponent icon={props.icon} />;
    case SVGS.SAND_CASCADE:
    return <SandCascadeSvgComponent icon={props.icon} />;
    case SVGS.TAILORS:
    return <TailorsSvgComponent icon={props.icon} />;
    case SVGS.OUTFITTERS:
    return <OutfittersSvgComponent icon={props.icon} />;
    case SVGS.FABRICATORY:
    return <FabricatorySvgComponent icon={props.icon} />;
    case SVGS.DRYING_YARD:
    return <DryingYardSvgComponent icon={props.icon} />;
    case SVGS.FURNACE:
    return <FurnaceSvgComponent icon={props.icon} />;
    case SVGS.KITCHEN:
    return <KitchenSvgComponent icon={props.icon} />;
    case SVGS.GLASSWORKS:
    return <GlassworksSvgComponent icon={props.icon} />;
    case SVGS.LABORATORY:
    return <LaboratorySvgComponent icon={props.icon} />;
    case SVGS.POTTERY_KILN:
    return <PotteryKilnSvgComponent icon={props.icon} />;
    case SVGS.BREWERY:
    return <BrewerySvgComponent icon={props.icon} />;

    case SVGS.SAMANNOUD:
    return <SamannoudSvgComponent icon={props.icon} />;
    case SVGS.SHUDDERING_REFUGE:
    return <ShudderingRefugeSvgComponent icon={props.icon} />;
    case SVGS.FOXFIRE_HERETIC:
    return <FoxfireHereticSvgComponent icon={props.icon} />;
    case SVGS.TREFOIL_SOWER:
    return <TrefoilSowerSvgComponent icon={props.icon} />;
    case SVGS.SCARRED_NAVIGATOR:
    return <ScarredScholarSvgComponent icon={props.icon} />;
    case SVGS.AUSPICIOUS_WAIF:
    return <AuspiciousWaifSvgComponent icon={props.icon} />;
    case SVGS.YOU:
    return <YouSvgComponent icon={props.icon} />;

    case SVGS.RED_CROW_TRADERS:
    return <RedCrowTradersSvgComponent icon={props.icon} />;
    case SVGS.FOXFIRE_ASCETICS:
    return <FoxfireAsceticsSvgComponent icon={props.icon} />;
    case SVGS.TREFOIL_KINGDOM:
    return <TrefoilKingdomSvgComponent icon={props.icon} />;
    case SVGS.TOURMALINE_JEWELERS:
    return <TourmalineJewelersSvgComponent icon={props.icon} />;
    case SVGS.SPRING_AUTUMN_KINGDOM:
    return <SpringAutumnKingdomSvgComponent icon={props.icon} />;

    case SVGS.HAPPINESS:
    return <HappinessSvgComponent icon={props.icon} />;
    case SVGS.ROAD_SIGN:
    return <RoadSignSvgComponent icon={props.icon} />;
  }
  return null;
}
