import ExpeditionStatus from '../models/expedition_status';
import Expedition from '../models/expedition';
import Destination from '../models/destination';
import Resource from '../models/resource';
import Icon from '../models/icon';
import Timer from '../models/timer';

export const SET_EXPEDITION_STATUS = "SET_EXPEDITION_STATUS";
export function setExpeditionStatus(expeditionStatus: ExpeditionStatus) {
  return {
    type: SET_EXPEDITION_STATUS,
    expeditionStatus
  }
}

export const UPSERT_EXPEDITION = "UPSERT_EXPEDITION";
export function upsertExpedition(expedition: Expedition) {
  return {
    type: UPSERT_EXPEDITION,
    expedition
  }
}

export const UPDATE_EXPEDITION_SUB_STATE = "UPDATE_EXPEDITION_SUB_STATE";
export function updateExpeditionSubState(args: { expeditionId: string, subState: number }) {
  return {
    type: UPDATE_EXPEDITION_SUB_STATE,
    expeditionId: args.expeditionId,
    subState: args.subState
  }
}

export const SET_DESTINATIONS = "SET_DESTINATIONS";
export function setDestinations(args: { expeditionId: string, embarkingDestinationIds?: string[],
  mainDestinationId?: string, returningDestinationIds?: string[], currentDestinationId?: string,
  targetCoordinates?: [number, number], customDestination?: Destination }) {
  return {
    type: SET_DESTINATIONS,
    expeditionId: args.expeditionId,
    embarkingDestinationIds: args.embarkingDestinationIds,
    mainDestinationId: args.mainDestinationId,
    returningDestinationIds: args.returningDestinationIds,
    currentDestinationId: args.currentDestinationId,
    targetCoordinates: args.targetCoordinates,
    customDestination: args.customDestination,
  }
}

export const REMOVE_DESTINATION = "REMOVE_DESTINATION";
export function removeDestination(args: {expeditionId: string,
  position: 'embarking'|'main'|'returning', destinationId: string}) {
  return {
    type: REMOVE_DESTINATION,
    expeditionId: args.expeditionId,
    position: args.position,
    destinationId: args.destinationId
  }
}

export const REMOVE_FROM_DESTINATIONS = "REMOVE_FROM_DESTINATIONS";
export function removeFromDestinations(args: {expeditionId: string, destinationId?: string}) {
  return {
    type: REMOVE_FROM_DESTINATIONS,
    expeditionId: args.expeditionId,
    destinationId: args.destinationId
  }
}

export const UPDATE_SUB_TITLE = "UPDATE_SUB_TITLE";
export function updateSubTitle(args: {expeditionId: string, subTitle: string, subTitleNoun: string}) {
  return {
    type: UPDATE_SUB_TITLE,
    expeditionId: args.expeditionId,
    subTitle: args.subTitle,
    subTitleNoun: args.subTitleNoun
  }
}

export const UPSERT_DROMEDARIES = "UPSERT_DROMEDARIES";
export function upsertDromedaries(args: {expeditionId: string, dromedaries: Resource}) {
  return {
    type: UPSERT_DROMEDARIES,
    expeditionId: args.expeditionId,
    dromedaries: args.dromedaries
  }
}

export const REMOVE_DROMEDARIES = "REMOVE_DROMEDARIES";
export function removeDromedaries(args: {expeditionId: string, dromedariesTypeQuality: string}) {
  return {
    type: REMOVE_DROMEDARIES,
    expeditionId: args.expeditionId,
    dromedariesTypeQuality: args.dromedariesTypeQuality
  }
}

export const UPSERT_RESOURCE = "UPSERT_RESOURCE";
export function upsertResource(args: {expeditionId: string, resource: Resource}) {
  return {
    type: UPSERT_RESOURCE,
    expeditionId: args.expeditionId,
    resource: args.resource
  }
}

export const REMOVE_RESOURCE = "REMOVE_RESOURCE";
export function removeResource(args: {expeditionId: string, typeQuality: string}) {
  return {
    type: REMOVE_RESOURCE,
    expeditionId: args.expeditionId,
    typeQuality: args.typeQuality
  }
}

export const UPDATE_ADVICE_AND_SUB_STATE = "UPDATE_ADVICE_AND_SUB_STATE";
export function updateAdviceAndSubState(args: {expeditionId: string, 
  advice: {icon: Icon, text: string}[], subState: number}) {
  return {
    type: UPDATE_ADVICE_AND_SUB_STATE,
    expeditionId: args.expeditionId,
    advice: args.advice,
    subState: args.subState
  }
}

export const UPDATE_EXPEDITION_TIMERS = "UPDATE_EXPEDITION_TIMERS";
export function updateExpeditionTimers(args: {expeditionId: string,
  timers: { [name: string] : Timer }}) {
  return {
    type: UPDATE_EXPEDITION_TIMERS,
    expeditionId: args.expeditionId,
    timers: args.timers
  }
}

export const ADD_STORED_TIME = "ADD_STORED_TIME";
export function addStoredTime(args: {expeditionId: string, storedTimeToAdd: number}) {
  return {
    type: ADD_STORED_TIME,
    expeditionId: args.expeditionId,
    storedTimeToAdd: args.storedTimeToAdd,

  }
}

export const SET_LAST_EXPEDITION_TIMESTAMP = "SET_LAST_EXPEDITION_TIMESTAMP";
export function setLastExpeditionTimestamp(lastTimestamp: number) {
  return {
    type: SET_LAST_EXPEDITION_TIMESTAMP,
    lastTimestamp
  }
}

export const INCREASE_EXPEDITION_RESOURCES = "INCREASE_EXPEDITION_RESOURCES";
export function increaseExpeditionResources(args: { expeditionId: string, rti: Resource[] }) {
  return {
    type: INCREASE_EXPEDITION_RESOURCES,
    expeditionId: args.expeditionId,
    rti: args.rti
  }
}

export const CONSUME_EXPEDITION_RESOURCES = "CONSUME_EXPEDITION_RESOURCES";
export function consumeExpeditionResources(args: { expeditionId: string, rtc: Resource[] }) {
  return {
    type: CONSUME_EXPEDITION_RESOURCES,
    expeditionId: args.expeditionId,
    rtc: args.rtc
  }
}

export const UPDATE_EXPEDITION_CURRENT_COORDINATES = "UPDATE_EXPEDITION_CURRENT_COORDINATES";
export function updateExpeditionCurrentCoordinates(args: { expeditionId: string,
  newCoordinates: [number, number]}) {
  return {
    type: UPDATE_EXPEDITION_CURRENT_COORDINATES,
    expeditionId: args.expeditionId,
    newCoordinates: args.newCoordinates
  }
}