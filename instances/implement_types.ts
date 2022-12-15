import ImplementType from "../models/implement_type";
import { RESOURCE_TYPES } from "../enums/resource_types";
const RTY = RESOURCE_TYPES;
import { RESOURCE_TAGS } from "../enums/resource_tags";
const RTA = RESOURCE_TAGS;

const implementTypes: { [typeName: string] : ImplementType } = {
  [RTY.IRON_EDGE] : new ImplementType({
    typeName: RTY.IRON_EDGE,
    provides: { [RTA.ACTION_LOOSE]: 2 }
  }),
  [RTY.HARDENED_SLAB] : new ImplementType({
    typeName: RTY.HARDENED_SLAB,
    provides: { [RTA.ACTION_BREAK]: 2 }
  }),
  [RTY.CRUDE_NEEDLE] : new ImplementType({
    typeName: RTY.CRUDE_NEEDLE,
    provides: { [RTA.ACTION_TRAP]: 1 }
  }),
  [RTY.GEARWORK] : new ImplementType({
    typeName: RTY.GEARWORK,
    provides: { [RTA.ACTION_TRAP]: 1, [RTA.ACTION_BREAK]: 1 }
  }),
  [RTY.ROUGH_ROPE] : new ImplementType({
    typeName: RTY.ROUGH_ROPE,
    provides: { [RTA.ACTION_TRAP]: 1, [RTA.ACTION_LOOSE]: 1 }
  }),
  [RTY.TORCH] : new ImplementType({
    typeName: RTY.TORCH,
    provides: { [RTA.ACTION_SEEK]: 2 }
  }),
  [RTY.BINDING] : new ImplementType({
    typeName: RTY.BINDING,
    provides: { [RTA.ACTION_HEAL]: 1 }
  }),
  [RTY.VITREOUS_EDGE] : new ImplementType({
    typeName: RTY.VITREOUS_EDGE,
    provides: { [RTA.ACTION_LOOSE]: 8 }
  }),
  [RTY.UNBREAKABLE_SLAB] : new ImplementType({
    typeName: RTY.UNBREAKABLE_SLAB,
    provides: { [RTA.ACTION_BREAK]: 8 }
  }),
  [RTY.DELICATE_NEEDLE] : new ImplementType({
    typeName: RTY.DELICATE_NEEDLE,
    provides: { [RTA.ACTION_TRAP]: 4 }
  }),
  [RTY.PRECISE_GEARWORK] : new ImplementType({
    typeName: RTY.PRECISE_GEARWORK,
    provides: { [RTA.ACTION_TRAP]: 4, [RTA.ACTION_BREAK]: 4 }
  }),
  [RTY.CERAMIC_CABLE] : new ImplementType({
    typeName: RTY.CERAMIC_CABLE,
    provides: { [RTA.ACTION_TRAP]: 3, [RTA.ACTION_LOOSE]: 3 }
  }),
  [RTY.MERCURIC_CANDLE] : new ImplementType({
    typeName: RTY.MERCURIC_CANDLE,
    provides: { [RTA.ACTION_SEEK]: 8 }
  }),
  [RTY.ECHINACEA_BINDING] : new ImplementType({
    typeName: RTY.ECHINACEA_BINDING,
    provides: { [RTA.ACTION_HEAL]: 6 }
  }),
};

export { implementTypes };