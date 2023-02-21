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

export const SET_DESTINATIONS = "SET_DESTINATIONS";
export function setDestinations(props: { expeditionId: string, embarkingDestinationIds?: string[],
  mainDestinationId?: string, returningDestinationIds?: string[], currentDestinationId?: string,
  targetCoordinates?: [number, number], customDestination?: Destination }) {
  return {
    type: SET_DESTINATIONS,
    expeditionId: props.expeditionId,
    embarkingDestinationIds: props.embarkingDestinationIds,
    mainDestinationId: props.mainDestinationId,
    returningDestinationIds: props.returningDestinationIds,
    currentDestinationId: props.currentDestinationId,
    targetCoordinates: props.targetCoordinates,
    customDestination: props.customDestination,
  }
}

export const REMOVE_DESTINATION = "REMOVE_DESTINATION";
export function removeDestination(props: {expeditionId: string,
  position: 'embarking'|'main'|'returning', destinationId: string}) {
  return {
    type: REMOVE_DESTINATION,
    expeditionId: props.expeditionId,
    position: props.position,
    destinationId: props.destinationId
  }
}

export const REMOVE_FROM_DESTINATIONS = "REMOVE_FROM_DESTINATIONS";
export function removeFromDestinations(props: {expeditionId: string, destinationId?: string}) {
  return {
    type: REMOVE_FROM_DESTINATIONS,
    expeditionId: props.expeditionId,
    destinationId: props.destinationId
  }
}

export const UPDATE_SUB_TITLE = "UPDATE_SUB_TITLE";
export function updateSubTitle(props: {expeditionId: string, subTitle: string, subTitleNoun: string}) {
  return {
    type: UPDATE_SUB_TITLE,
    expeditionId: props.expeditionId,
    subTitle: props.subTitle,
    subTitleNoun: props.subTitleNoun
  }
}

export const UPSERT_DROMEDARIES = "UPSERT_DROMEDARIES";
export function upsertDromedaries(props: {expeditionId: string, dromedaries: Resource}) {
  return {
    type: UPSERT_DROMEDARIES,
    expeditionId: props.expeditionId,
    dromedaries: props.dromedaries
  }
}

export const REMOVE_DROMEDARIES = "REMOVE_DROMEDARIES";
export function removeDromedaries(props: {expeditionId: string, dromedariesTypeQuality: string}) {
  return {
    type: REMOVE_DROMEDARIES,
    expeditionId: props.expeditionId,
    dromedariesTypeQuality: props.dromedariesTypeQuality
  }
}

export const UPSERT_RESOURCE = "UPSERT_RESOURCE";
export function upsertResource(props: {expeditionId: string, resource: Resource}) {
  return {
    type: UPSERT_RESOURCE,
    expeditionId: props.expeditionId,
    resource: props.resource
  }
}

export const REMOVE_RESOURCE = "REMOVE_RESOURCE";
export function removeResource(props: {expeditionId: string, typeQuality: string}) {
  return {
    type: REMOVE_RESOURCE,
    expeditionId: props.expeditionId,
    typeQuality: props.typeQuality
  }
}

export const UPDATE_ADVICE_AND_SUB_STATE = "UPDATE_ADVICE_AND_SUB_STATE";
export function updateAdviceAndSubState(props: {expeditionId: string, 
  advice: {icon: Icon, text: string}[], subState: number}) {
  return {
    type: UPDATE_ADVICE_AND_SUB_STATE,
    expeditionId: props.expeditionId,
    advice: props.advice,
    subState: props.subState
  }
}

export const UPDATE_EXPEDITION_TIMERS = "UPDATE_EXPEDITION_TIMERS";
export function updateExpeditionTimers(props: {expeditionId: string,
  timers: { [name: string] : Timer }}) {
  return {
    type: UPDATE_EXPEDITION_TIMERS,
    expeditionId: props.expeditionId,
    timers: props.timers
  }
}

export const ADD_STORED_TIME = "ADD_STORED_TIME";
export function addStoredTime(props: {expeditionId: string, storedTimeToAdd: number}) {
  return {
    type: ADD_STORED_TIME,
    expeditionId: props.expeditionId,
    storedTimeToAdd: props.storedTimeToAdd
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
export function increaseExpeditionResources(props: { expeditionId: string, rti: Resource[] }) {
  return {
    type: INCREASE_EXPEDITION_RESOURCES,
    expeditionId: props.expeditionId,
    rti: props.rti
  }
}

export const CONSUME_EXPEDITION_RESOURCES = "CONSUME_EXPEDITION_RESOURCES";
export function consumeExpeditionResources(props: { expeditionId: string, rtc: Resource[] }) {
  return {
    type: CONSUME_EXPEDITION_RESOURCES,
    expeditionId: props.expeditionId,
    rtc: props.rtc
  }
}

export const UPDATE_EXPEDITION_CURRENT_COORDINATES = "UPDATE_EXPEDITION_CURRENT_COORDINATES";
export function updateExpeditionCurrentCoordinates(props: { expeditionId: string,
  newCoordinates: [number, number]}) {
  return {
    type: UPDATE_EXPEDITION_CURRENT_COORDINATES,
    expeditionId: props.expeditionId,
    newCoordinates: props.newCoordinates
  }
}