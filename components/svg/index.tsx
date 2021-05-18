import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import KnowledgeSvgComponent from './knowledge';
import LentilSvgComponent from './lentil';
import WaterSvgComponent from './water';
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

import PulpSvgComponent from './pulp';

import Icon from '../../models/icon';
import { SVGS } from '../../enums/svgs';

// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default function SvgComponent(props: { icon: Icon }) {
  switch (props.icon.name) {
    case SVGS.KNOWLEDGE:
    return <KnowledgeSvgComponent icon={props.icon} />;
    case SVGS.LENTILS:
    return <LentilSvgComponent icon={props.icon} />;
    case SVGS.WATER:
    return <WaterSvgComponent icon={props.icon} />;
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
    case SVGS.PULP:
    return <PulpSvgComponent icon={props.icon} />;
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
  }
  return null;
}
