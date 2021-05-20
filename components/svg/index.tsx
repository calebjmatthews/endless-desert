import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import KnowledgeSvgComponent from './knowledge';
import LentilSvgComponent from './lentil';
import DropSvgComponent from './drop';
import SeedsSvgComponent from './seeds';
import ReedsSvgComponent from './reeds';
import GrainSvgComponent from './grain';
import FlourSvgComponent from './flour';
import OlivesSvgComponent from './olives';
import QuailSvgComponent from './quail';
import EggsSvgComponent from './eggs';
import FertilizerSvgComponent from './fertilizer';
import OxenSvgComponent from './oxen';
import MilkSvgComponent from './milk';
import SilkwormCocoonSvgComponent from './silkworm_cocoon';
import WoodSvgComponent from './wood';
import ClaySvgComponent from './clay';
import BrickSvgComponent from './brick';
import ThatchSvgComponent from './thatch';
import SandSvgComponent from './sand';
import CharcoalSvgComponent from './charcoal';
import CarbonSvgComponent from './carbon';
import OreSvgComponent from './ore';
import PowderSvgComponent from './powder';
import BarSvgComponent from './bar';
import SaltSvgComponent from './salt';
import CinnamonSvgComponent from './cinnamon';
import CarobSvgComponent from './carob';
import MintSvgComponent from './mint';
import PeppercornSvgComponent from './peppercorn';
import CorianderSvgComponent from './coriander';
import AniseSvgComponent from './anise';
import SorrelSvgComponent from './sorrel';
import GlassSvgComponent from './glass';
import OliveOilSvgComponent from './olive_oil';
import PulpSvgComponent from './pulp';
import PapyrusSvgComponent from './papyrus';
import LinenSvgComponent from './linen';
import SilkSvgComponent from './silk';
import AbrasiveSvgComponent from './abrasive';
import BeadsSvgComponent from './beads';
import GlasswareSvgComponent from './glassware';
import LensesSvgComponent from './lenses';
import GlazeSvgComponent from './glaze';
import TerracottaSvgComponent from './terracotta';
import FaienceSvgComponent from './faience';
import AshwareSvgComponent from './ashware';
import SoupSvgComponent from './soup';
import BreadSvgComponent from './bread';
import StewSvgComponent from './stew';
import OmeletSvgComponent from './omelet';
import PieSvgComponent from './pie';
import CakeSvgComponent from './cake';
import MistakeSvgComponent from './mistake';
import BeerSvgComponent from './beer';
import LiquorSvgComponent from './liquor';
import RoughMattockSvgComponent from './rough_mattock';
import WoodenPoleSvgComponent from './wooden_pole';
import CoarseImplementsSvgComponent from './coarse_implements';
import SimpleRobeSvgComponent from './simple_robe';
import JourneymansHaversackSvgComponent from './journeymans_haversack';
import JourneymansGearbagSvgComponent from './journeymans_gearbag';
import JourneymansToolpackSvgComponent from './journeymans_toolpack';

import Icon from '../../models/icon';
import { SVGS } from '../../enums/svgs';

// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default function SvgComponent(props: { icon: Icon }) {
  switch (props.icon.name) {
    case SVGS.KNOWLEDGE:
    return <KnowledgeSvgComponent icon={props.icon} />;
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
  }
  return null;
}
