import Timer from '../models/timer';

export const SET_TIMERS = 'SET_TIMERS';
export function setTimers(timers: { [name: string] : Timer }) {
  let newTimers: { [name: string] : Timer } = {};
  Object.keys(timers).map((name) => {
    newTimers[name] = new Timer(timers[name]);
  });
  return {
    type: SET_TIMERS,
    timers: newTimers
  }
}

export const ADD_TIMER = 'ADD_TIMER';
export function addTimer(timer: Timer) {
  return {
    type: ADD_TIMER,
    timer: timer
  }
}

export const REMOVE_TIMER = 'REMOVE_TIMER';
export function removeTimer(timer: Timer) {
  return {
    type: REMOVE_TIMER,
    timer: timer
  }
}

export const UPDATE_TIMERS = 'UPDATE_TIMERS';
export function updateTimers(timers: { [name: string] : Timer }) {
  return {
    type: UPDATE_TIMERS,
    timers: timers
  }
}
