import Resource from './resource';
import Destination from './destination';
import ExpeditionEventHistory from './expedition_event_history';
import CamelType from './camel_type';

// Possible name nouns, in order of length: Jaunt, Trip, Road, Foray, Travels, Course, Journey, Quest, Excursion, Campaign, Endeavour, Expedition, Voyage, Pilgrimage, Odyssey, Peregrination

export default class Expedition {
  id: string = '';
  name: string = ''; // E.g. Samannoud's Journey to the Cliffside Cartographer's Tower
  endCoordinates: [number, number] = [0, 0]; // These can change
  customDestination?: Destination;
  leader: string = '';
  camels: { [typeQuality: string] : Resource } = {};
  resources: { [typeQuality: string] : Resource } = {};
  state: 'preparing'|'embarking'|'exploring'|'returning' = 'preparing';
  beganAt?: number;
  endedAt?: number;
  eventHistory: { [id: string] : ExpeditionEventHistory } = {};

  constructor(expedition: ExpeditionInterface) {
    Object.assign(this, expedition);
  }

  getSpeed(camelTypes: { [name: string] : CamelType }) {
    let totalSpeed = 0;
    let count = 0;
    Object.keys(this.camels).forEach((typeQuality) => {
      const camelResource = this.camels[typeQuality];
      const camelType = camelTypes[camelResource.type];
      totalSpeed += (camelType.speed * camelResource.quantity);
      count += camelResource.quantity;
    });
    return (totalSpeed / count);
  }

  getCapacity(camelTypes: { [name: string] : CamelType }) {
    let capacity = 0;
    Object.keys(this.camels).forEach((typeQuality) => {
      const camelResource = this.camels[typeQuality];
      const camelType = camelTypes[camelResource.type];
      capacity += (camelType.capacity * camelResource.quantity);
    });
    return capacity;
  }
}

interface ExpeditionInterface {
  id: string;
  name: string;
  endCoordinates: [number, number]; // These can change
  customDestination?: Destination;
  leader: string;
  camels: { [typeQuality: string] : Resource };
  resources: { [typeQuality: string] : Resource };
  state: 'preparing'|'embarking'|'exploring'|'returning';
  beganAt?: number;
  endedAt?: number;
  eventHistory: { [id: string] : ExpeditionEventHistory };
}