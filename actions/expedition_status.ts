import ExpeditionStatus from '../models/expedition_status';
import Expedition from '../models/expedition';
import Destination from '../models/destination';
import Resource from '../models/resource';
import Icon from '../models/icon';

export const SET_EXPEDITION_STATUS = 'SET_EXPEDITION_STATUS';
export function setExpeditionStatus(expeditionStatus: ExpeditionStatus) {
  return {
    type: SET_EXPEDITION_STATUS,
    expeditionStatus
  }
}

export const UPSERT_EXPEDITION = 'UPSERT_EXPEDITION';
export function upsertExpedition(expedition: Expedition) {
  return {
    type: UPSERT_EXPEDITION,
    expedition
  }
}

export const SET_DESTINATION = 'SET_DESTINATION';
export function setDestination(props: {expeditionId: string, position: 'embarking'|'main'|'returning',
  destinationId?: string, targetCoordinates?: [number, number], customDestination?: Destination}) {
  return {
    type: SET_DESTINATION,
    expeditionId: props.expeditionId,
    position: props.position,
    destinationId: props.destinationId,
    targetCoordinates: props.targetCoordinates,
    customDestination: props.customDestination
  }
}

export const REMOVE_DESTINATION = 'REMOVE_DESTINATION';
export function removeDestination(props: {expeditionId: string,
  position: 'embarking'|'main'|'returning', destinationId: string}) {
  return {
    type: REMOVE_DESTINATION,
    expeditionId: props.expeditionId,
    position: props.position,
    destinationId: props.destinationId
  }
}

export const REMOVE_FROM_DESTINATIONS = 'REMOVE_FROM_DESTINATIONS';
export function removeFromDestinations(props: {expeditionId: string, destinationId?: string}) {
  return {
    type: REMOVE_FROM_DESTINATIONS,
    expeditionId: props.expeditionId,
    destinationId: props.destinationId
  }
}

export const UPDATE_SUB_TITLE = 'UPDATE_SUB_TITLE';
export function updateSubTitle(props: {expeditionId: string, subTitle: string}) {
  return {
    type: UPDATE_SUB_TITLE,
    expeditionId: props.expeditionId,
    subTitle: props.subTitle
  }
}

export const UPSERT_DROMEDARIES = 'UPSERT_DROMEDARIES';
export function upsertDromedaries(props: {expeditionId: string, dromedaries: Resource}) {
  return {
    type: UPSERT_DROMEDARIES,
    expeditionId: props.expeditionId,
    dromedaries: props.dromedaries
  }
}

export const REMOVE_DROMEDARIES = 'REMOVE_DROMEDARIES';
export function removeDromedaries(props: {expeditionId: string, dromedariesTypeQuality: string}) {
  return {
    type: REMOVE_DROMEDARIES,
    expeditionId: props.expeditionId,
    dromedariesTypeQuality: props.dromedariesTypeQuality
  }
}

export const UPSERT_RESOURCE = 'UPSERT_RESOURCE';
export function upsertResource(props: {expeditionId: string, resource: Resource}) {
  return {
    type: UPSERT_RESOURCE,
    expeditionId: props.expeditionId,
    resource: props.resource
  }
}

export const REMOVE_RESOURCE = 'REMOVE_RESOURCE';
export function removeResource(props: {expeditionId: string, typeQuality: string}) {
  return {
    type: REMOVE_RESOURCE,
    expeditionId: props.expeditionId,
    typeQuality: props.typeQuality
  }
}

export const UPDATE_ADVICE_AND_SUB_STATE = 'UPDATE_ADVICE_AND_SUB_STATE';
export function updateAdviceAndSubState(props: {expeditionId: string, 
  advice: {icon: Icon, text: string}[], subState: number}) {
  return {
    type: UPDATE_ADVICE_AND_SUB_STATE,
    expeditionId: props.expeditionId,
    advice: props.advice,
    subState: props.subState
  }
}