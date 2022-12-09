import Resource from './resource';
import Destination from './destination';
import ExpeditionEventHistory from './expedition_event_history';
import DromedaryType from './dromedary_type';

// Possible name nouns, in order of length: Jaunt, Trip, Road, Foray, Travels, Course, Journey, Quest, Excursion, Campaign, Endeavour, Expedition, Voyage, Pilgrimage, Odyssey, Peregrination

export default class Expedition {
  id: string = '';
  name: string = ''; // E.g. Samannoud's Journey to the Cliffside Cartographer's Tower
  endCoordinates: [number, number] = [0, 0]; // These can change
  destinationId?: string;
  customDestination?: Destination;
  leader: string = '';
  dromedaries: { [typeQuality: string] : Resource } = {};
  resources: { [typeQuality: string] : Resource } = {};
  state: 'preparing'|'embarking'|'exploring'|'returning' = 'preparing';
  beganAt?: number;
  endedAt?: number;
  eventHistory: { [id: string] : ExpeditionEventHistory } = {};

  constructor(expedition: ExpeditionInterface|null) {
    if (expedition) {
      Object.assign(this, expedition);
    }
  }

  getCurrentDromedaryCount(exclude?: string) {
    let count = 0;
    Object.keys(this.dromedaries).forEach((typeQuality) => {
      if (typeQuality !== exclude) {
        count += this.dromedaries[typeQuality].quantity;
      }
    });
    return count;
  }

  getRemainingDromedarySpace(exclude?: string) {
    const maximum = 100;
    return maximum - this.getCurrentDromedaryCount(exclude);
  }

  getSpeed(dromedaryTypes: { [name: string] : DromedaryType }) {
    let totalSpeed = 0;
    let count = 0;
    Object.keys(this.dromedaries).forEach((typeQuality) => {
      const dromedaryResource = this.dromedaries[typeQuality];
      const dromedaryType = dromedaryTypes[dromedaryResource.type];
      totalSpeed += (dromedaryType.speed * dromedaryResource.quantity);
      count += dromedaryResource.quantity;
    });
    return (totalSpeed / count);
  }

  getCapacity(dromedaryTypes: { [name: string] : DromedaryType }) {
    let capacity = 0;
    Object.keys(this.dromedaries).forEach((typeQuality) => {
      const dromedaryResource = this.dromedaries[typeQuality];
      const dromedaryType = dromedaryTypes[dromedaryResource.type];
      capacity += (dromedaryType.capacity * dromedaryResource.quantity);
    });
    return capacity;
  }
}

interface ExpeditionInterface {
  id: string;
  name: string;
  endCoordinates: [number, number]; // These can change
  destinationId?: string;
  customDestination?: Destination;
  leader: string;
  dromedaries: { [typeQuality: string] : Resource };
  resources: { [typeQuality: string] : Resource };
  state: 'preparing'|'embarking'|'exploring'|'returning';
  beganAt?: number;
  endedAt?: number;
  eventHistory: { [id: string] : ExpeditionEventHistory };
}