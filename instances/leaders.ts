import Leader from '../models/leader';
import LeaderType from '../models/leader_type';
import Equipment from '../models/equipment';
import { leaderTypes } from './leader_types';
import { equipmentTypes } from './equipment_types';
import { utils } from '../utils';
import { LEADER_TYPES } from '../enums/leader_types';
import { EQUIPMENT_TYPES } from '../enums/equipment_types';

let leadersStarting: { [id: string] : Leader } = {};
let equipmentStarting: { [id: string] : Equipment } = {};

const leaderCreateRes = leaderTypes[LEADER_TYPES.SAMANNOUD].createLeader();
leaderCreateRes.equipment.map((equipment) => {
  if (equipment) { equipmentStarting[equipment.id] = equipment; }
});
let leader = leaderCreateRes.leader;
leader.setPluses(equipmentStarting);
leadersStarting[leader.id] = leader;

export { leadersStarting, equipmentStarting }
