import Leader from '../models/leader';
import Equipment from '../models/equipment';

export const SET_LEADERS = 'SET_LEADERS';
export function setLeaders(leaders: { [id: string] : Leader }) {
  let newLeaders: { [id: string] : Leader } = {};
  Object.keys(leaders).map((leaderId) => {
    newLeaders[leaderId] = new Leader(leaders[leaderId]);
  });
  return {
    type: SET_LEADERS,
    leaders: newLeaders
  }
}

export const ADD_LEADER = 'ADD_LEADER';
export function addLeader(leader: Leader) {
  return {
    type: ADD_LEADER,
    leader: leader
  }
}

export const REMOVE_LEADER = 'REMOVE_LEADER';
export function removeLeader(leader: Leader) {
  return {
    type: REMOVE_LEADER,
    leader: leader
  }
}

export const SET_EATING = 'SET_EATING';
export function setEating(leader: Leader, resourceName: string) {
  return {
    type: SET_EATING,
    leader: leader,
    resourceName: resourceName
  }
}

export const SET_DRINKING = 'SET_DRINKING';
export function setDrinking(leader: Leader, resourceName: string) {
  return {
    type: SET_DRINKING,
    leader: leader,
    resourceName: resourceName
  }
}

export const ASSIGN_TO_BUILDING = 'ASSIGN_TO_BUILDING';
export function assignToBuilding(leader: Leader, assignedTo: string) {
  return {
    type: ASSIGN_TO_BUILDING,
    leader: leader,
    assignedTo: assignedTo
  }
}

export const LIVE_AT_BUILDING = 'LIVE_AT_BUILDING';
export function liveAtBuilding(leader: Leader, livingAt: string) {
  return {
    type: LIVE_AT_BUILDING,
    leader: leader,
    livingAt: livingAt
  }
}

export const DON_EQUIPMENT = 'DON_EQUIPMENT';
export function donEquipment(leader: Leader, equipment: Equipment) {
  return {
    type: DON_EQUIPMENT,
    leader: leader,
    equipment: equipment
  }
}
