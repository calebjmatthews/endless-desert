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
import DropSvgComponent from './resources/drop';
import SeedsSvgComponent from './resources/seeds';
import ReedsSvgComponent from './resources/reeds';
import GrainSvgComponent from './resources/grain';
import FlourSvgComponent from './resources/flour';
import OlivesSvgComponent from './resources/olives';
import QuailSvgComponent from './resources/quail';
import EggsSvgComponent from './resources/eggs';
import FertilizerSvgComponent from './resources/fertilizer';
import OxenSvgComponent from './resources/oxen';
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
import LensesSvgComponent from './resources/lenses';
import GlazeSvgComponent from './resources/glaze';
import TerracottaSvgComponent from './resources/terracotta';
import FaienceSvgComponent from './resources/faience';
import AshwareSvgComponent from './resources/ashware';
import SoupSvgComponent from './resources/soup';
import BreadSvgComponent from './resources/bread';
import StewSvgComponent from './resources/stew';
import OmeletSvgComponent from './resources/omelet';
import PieSvgComponent from './resources/pie';
import CakeSvgComponent from './resources/cake';
import MistakeSvgComponent from './resources/mistake';
import BeerSvgComponent from './resources/beer';
import LiquorSvgComponent from './resources/liquor';

import RoughMattockSvgComponent from './equipment/rough_mattock';
import WoodenPoleSvgComponent from './equipment/wooden_pole';
import CoarseImplementsSvgComponent from './equipment/coarse_implements';
import SimpleRobeSvgComponent from './equipment/simple_robe';
import JourneymansHaversackSvgComponent from './equipment/journeymans_haversack';
import JourneymansGearbagSvgComponent from './equipment/journeymans_gearbag';
import JourneymansToolpackSvgComponent from './equipment/journeymans_toolpack';

import SkySvgComponent from './buildings/sky';
import CisternSvgComponent from './buildings/cistern';
import StudySvgComponent from './buildings/study';
import HutSvgComponent from './buildings/hut';
import LentilFieldSvgComponent from './buildings/lentil_field';
import ClayPitSvgComponent from './buildings/clay_pit';
import SandPitSvgComponent from './buildings/sand_pit';
import ReedDeltaSvgComponent from './buildings/reed_delta';
import GrainFieldSvgComponent from './buildings/grain_field';
import OliveGroveSvgComponent from './buildings/olive_grove';
import QuailPastureSvgComponent from './buildings/quail_pasture';
import OxPastureSvgComponent from './buildings/ox_pasture';
import PressSvgComponent from './buildings/press';
import GrindingMillSvgComponent from './buildings/grinding_mill';
import SpiceFieldSvgComponent from './buildings/spice_field';
import HouseSvgComponent from './buildings/house';
import WeaverySvgComponent from './buildings/weavery';
import TailorsSvgComponent from './buildings/tailors';
import OutfittersSvgComponent from './buildings/outfitters';
import FabricatorySvgComponent from './buildings/fabricatory';
import DryingYardSvgComponent from './buildings/drying_yard';
import FurnaceSvgComponent from './buildings/furnace';

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
    case SVGS.LENTILS:
    return <LentilSvgComponent icon={props.icon} />;
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
    case SVGS.OLIVES:
    return <OlivesSvgComponent icon={props.icon} />;
    case SVGS.QUAIL:
    return <QuailSvgComponent icon={props.icon} />;
    case SVGS.EGGS:
    return <EggsSvgComponent icon={props.icon} />;
    case SVGS.FERTILIZER:
    return <FertilizerSvgComponent icon={props.icon} />;
    case SVGS.OXEN:
    return <OxenSvgComponent icon={props.icon} />;
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
    case SVGS.LENSES:
    return <LensesSvgComponent icon={props.icon} />;
    case SVGS.GLAZE:
    return <GlazeSvgComponent icon={props.icon} />;
    case SVGS.TERRACOTTA:
    return <TerracottaSvgComponent icon={props.icon} />;
    case SVGS.FAIENCE:
    return <FaienceSvgComponent icon={props.icon} />;
    case SVGS.ASHWARE:
    return <AshwareSvgComponent icon={props.icon} />;
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
    case SVGS.MISTAKE:
    return <MistakeSvgComponent icon={props.icon} />;
    case SVGS.BEER:
    return <BeerSvgComponent icon={props.icon} />;
    case SVGS.LIQUOR:
    return <LiquorSvgComponent icon={props.icon} />;

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

    case SVGS.SKY:
    return <SkySvgComponent icon={props.icon} />;
    case SVGS.CISTERN:
    return <CisternSvgComponent icon={props.icon} />;
    case SVGS.STUDY:
    return <StudySvgComponent icon={props.icon} />;
    case SVGS.HUT:
    return <HutSvgComponent icon={props.icon} />;
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
    case SVGS.TAILORS:
    return <TailorsSvgComponent icon={props.icon} />;
    case SVGS.OUTFITTERS:
    return <OutfittersSvgComponent icon={props.icon} />;
    case SVGS.FABRICATORY:
    return <FabricatorySvgComponent icon={props.icon} />;
    case SVGS.DRYING_YARD:
    return <DryingYardSvgComponent icon={props.icon} />;
  }
  return null;
}
