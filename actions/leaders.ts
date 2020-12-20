import Leader from '../models/leader';

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

export const ASSIGN_TO_BUILDING = 'ASSIGN_TO_BUILDING';
export function assignToBuilding(leader: Leader, assignTo: string) {
  return {
    type: ASSIGN_TO_BUILDING,
    leader: leader,
    assignTo: assignTo
  }
}
