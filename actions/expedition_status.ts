import ExpeditionStatus from '../models/expedition_status';
import Expedition from '../models/expedition';
import Destination from '../models/destination';
import Resource from '../models/resource';

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
export function setDestination(props: {expeditionId: string, destinationId?: string, 
  endCoordinates?: [number, number], customDestination?: Destination}) {
  return {
    type: SET_DESTINATION,
    expeditionId: props.expeditionId,
    destinationId: props.destinationId,
    endCoordinates: props.endCoordinates,
    customDestination: props.customDestination
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