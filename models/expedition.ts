import Resource from './resource';
import Destination from './destination';
import ExpeditionEventHistory from './expedition_event_history';
import DromedaryType from './dromedary_type';
import ResourceType from './resource_type';
import ImplementType from './implement_type';
import Icon from './icon';
import ExpeditionHistory from './expedition_history';
import Exploration from './exploration';
import ExplorationChallenge from './exploration_challenge';
import ResourceTag from './resource_tag';
import Leader from './leader';
import Rate from './rate';
import Timer from './timer';
import { utils } from '../utils';
import { dromedaryTypes } from '../instances/dromedary_types';
import { RESOURCE_TAGS } from '../enums/resource_tags';
const RTA = RESOURCE_TAGS;
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
const RSP = RESOURCE_SPECIFICITY;
import { EXPEDITION_EVENTS } from '../enums/expedition_events';

const MS_IN_MIN = 1000 * 60;

export default class Expedition {
  id: string = '';
  subTitle: string = ''; // E.g. Samannoud's Journey to the Cliffside Cartographer's Tower
  currentCoordinates: [number, number] = [0, 0];
  targetCoordinates: [number, number] = [0, 0]; // These can change
  embarkingDestinationIds: string[] = [];
  mainDestinationId?: string;
  returningDestinationIds: string[] = [];
  currentDestinationId?: string;
  customDestination?: Destination;
  leader: string = '';
  dromedaries: { [typeQuality: string] : Resource } = {};
  resources: { [typeQuality: string] : Resource } = {};
  state: 'preparing'|'embarking'|'exploring'|'returning' = 'preparing';
  subState: number = 0;
  advice: { icon: Icon, text: string, textColor?: string }[] = [];
  beganAt?: number;
  eventHistory: { [id: string] : ExpeditionEventHistory } = {};
  eating: string = '';
  drinking: string = '';
  rates: Rate = {};
  timers: { [name: string] : Timer } = {};
  storedTime: number = 0;

  constructor(expedition: ExpeditionInterface|null) {
    if (expedition) {
      Object.assign(this, expedition);
    }
  }

  beginExpedition(dromedaryTypes: { [name: string] : DromedaryType }) {
    this.state = 'embarking';

    this.calculateAndSetEatingAndTimer();
    this.calculateAndSetDrinkingAndTimer();

    this.calculateAndSetNextEventTimer(dromedaryTypes);

    this.calculateAndSetArrivalTimer(dromedaryTypes);
    console.log(`this`, this);
    return this;
  }

  calculateAndSetEatingAndTimer() {
    const fResource = this.getMostValuableResource({ specificity: RSP.TAG, kind: RTA.FOOD });
    if (fResource) {
      this.eating = `${fResource.type}|${fResource.quality}`;
      const fResourceType = utils.getResourceType(fResource);
      const fRate = (utils.arrayIncludes(fResourceType.tags, RTA.PROVISION)) ? -5 : -10;
      this.rates[`${fResource.type}|${fResource.quality}`] = fRate;
      this.timers = this.removeTimer('eating');
      const timerName = `eating-${utils.randHex(8)}`;
      this.timers[timerName] = new Timer({
        name: timerName,
        endsAt: (new Date(Date.now()).valueOf() + ((fResource.quantity / (fRate*-1)) * MS_IN_MIN)),
        eventId: EXPEDITION_EVENTS.OUT_OF_FOOD
      });
    }
  }

  calculateAndSetDrinkingAndTimer() {
    const dResource = this.getMostValuableResource({ specificity: RSP.TAG, kind: RTA.DRINK });
    if (dResource) {
      this.drinking = `${dResource.type}|${dResource.quality}`;
      const dResourceType = utils.getResourceType(dResource);
      const dRate = (utils.arrayIncludes(dResourceType.tags, RTA.PROVISION)) ? -5 : -10;
      this.rates[`${dResource.type}|${dResource.quality}`] = dRate;
      this.timers = this.removeTimer('drinking');
      const timerName = `drinking-${utils.randHex(8)}`;
      this.timers[timerName] = new Timer({
        name: timerName,
        endsAt: (new Date(Date.now()).valueOf() + ((dResource.quantity / (dRate*-1)) * MS_IN_MIN)),
        eventId: EXPEDITION_EVENTS.OUT_OF_DRINK
      });
    }
  }

  getMostValuableResource(props: { specificity: string, kind: string }): Resource|null {
    const { specificity, kind } = props;

    const matches: ResourceType[] = [];
    Object.keys(this.resources).forEach((typeQuality) => {
      const resource = this.resources[typeQuality];
      if (resource.quantity <= 0) { return null; }
      const resourceType = utils.getResourceType(resource);
      switch(specificity) {
        case RSP.CATEGORY:
        if (resourceType.category === kind) {
          matches.push(resourceType);
        } break;
        case RSP.SUBCATEGORY:
        if (resourceType.subcategory === kind) {
          matches.push(resourceType);
        } break;
        case RSP.TAG:
        if (utils.arrayIncludes(resourceType.tags, kind)) {
          matches.push(resourceType);
        } break;
        case RSP.EXACT:
        if (resourceType.name === kind) {
          matches.push(resourceType);
        } break;
      }
    });

    if (matches.length === 0) { return null; }

    matches.sort((a, b) => {
      return a.value = b.value;
    });

    const resource = this.resources[`${matches[0].name}|2`]
      || this.resources[`${matches[0].name}|1`]
      || this.resources[`${matches[0].name}|0`]
    
    return resource;
  }

  getTimerId(prefix: string): string|null {
    let match: string|null = null;
    Object.keys(this.timers).forEach((timerName) => {
      if (timerName.split('-')[0] === prefix) { match = timerName; }
    });
    return match;
  }

  removeTimer(prefix: string) {
    let match: string|null = this.getTimerId(prefix);
    if (match) { delete this.timers[match]; }
    return this.timers;
  }

  calculateAndSetNextEventTimer(dromedaryTypes: { [name: string] : DromedaryType }) {
    const thresholds = [
      { remainingDistance: 0, distanceUntilNext: 40 },
      { remainingDistance: 20, distanceUntilNext: 10 },
      { remainingDistance: 50, distanceUntilNext: 20 },
      { remainingDistance: 100, distanceUntilNext: 40 },
      { remainingDistance: 500, distanceUntilNext: 180 },
      { remainingDistance: 1000, distanceUntilNext: 300 }
    ];
    
    let highestThreshold = thresholds[0];
    thresholds.slice(1).forEach((threshold) => {
      if (threshold.remainingDistance <= remainingDistance) {
        highestThreshold = threshold;
      }
    });
    const distanceUntilNext = Math.floor(highestThreshold.distanceUntilNext
      * (utils.randomGaussian() + 0.5));
    const remainingDistance = utils.distanceBetweenPoints(this.currentCoordinates,
      this.targetCoordinates);
    if (distanceUntilNext < remainingDistance) {
      const speed = this.getSpeed(dromedaryTypes);
      const timerName = `event-${utils.randHex(8)}`;
      this.timers[timerName] = new Timer({
        name: timerName,
        endsAt: (new Date(Date.now()).valueOf() + ((distanceUntilNext / speed) * MS_IN_MIN)),
        eventCheck: true
      });
    }
  }

  calculateAndSetArrivalTimer(dromedaryTypes: { [name: string] : DromedaryType }) {
    const speed = this.getSpeed(dromedaryTypes);
    const remainingDistance = utils.distanceBetweenPoints(this.currentCoordinates,
      this.targetCoordinates);
    const timerName = `arrival-${utils.randHex(8)}`;
    this.timers[timerName] = new Timer({
      name: timerName,
      endsAt: (new Date(Date.now()).valueOf() + ((remainingDistance / speed) * MS_IN_MIN)),
      eventId: EXPEDITION_EVENTS.ARRIVAL
    });
  }

  setOrAddDestination(props: { destinations: { [name: string] : Destination }, destinationId: string, 
    position: 'embarking'|'main'|'returning' }) {
    const { destinations, destinationId, position } = props;
    let returnedObject: { expeditionId: string, embarkingDestinationIds?: string[],
      mainDestinationId?: string, returningDestinationIds?: string[], currentDestinationId?: string,
      targetCoordinates?: [number, number], customDestination?: Destination } = {
      expeditionId: this.id };
    if (position === 'embarking') {
      this.embarkingDestinationIds.unshift(destinationId);
      returnedObject.embarkingDestinationIds = this.embarkingDestinationIds;
    }
    if (position === 'main') {
      this.mainDestinationId = destinationId;
      returnedObject.mainDestinationId = this.mainDestinationId;
      this.embarkingDestinationIds = utils.removeFromArray(this.embarkingDestinationIds, destinationId);
      returnedObject.embarkingDestinationIds = this.embarkingDestinationIds;
      this.returningDestinationIds = utils.removeFromArray(this.returningDestinationIds, destinationId);
      returnedObject.returningDestinationIds = this.returningDestinationIds;
    }
    if (position === 'returning') {
      this.returningDestinationIds.push(destinationId);
      returnedObject.returningDestinationIds = this.returningDestinationIds;
    }
    if (position === 'embarking'
      || (position === 'main' && this.embarkingDestinationIds.length === 0)) {
      this.targetCoordinates = destinations[destinationId].coordinates;
      returnedObject.targetCoordinates = this.targetCoordinates;
      this.currentDestinationId = destinationId;
      returnedObject.currentDestinationId = this.currentDestinationId;
    }
    return returnedObject;
  }

  calcSubTitle(props: { leaders: { [id: string] : Leader } }) {
    const { leaders } = props;
    let subTitle = '';
    const leader = leaders[this.leader];
    if (leader) {
      subTitle = `${utils.makePossessive(leader.name)} `;
    }
    else {
      subTitle = `A `;
    }

    // Possible name nouns, in order of length: Jaunt, Trip, Road, Foray, Travels, Course, Journey, Quest, Excursion, Campaign, Endeavour, Expedition, Voyage, Pilgrimage, Odyssey, Peregrination
    let nounText = 'journey';
    if (this.targetCoordinates) {
      const nouns = [
        { threshold: [0, 40], text: 'jaunt' },
        { threshold: [0, 50], text: 'trip' },
        { threshold: [40, 200], text: 'road' },
        { threshold: [50, 300], text: 'foray' },
        { threshold: [100, 400], text: 'travels' },
        { threshold: [200, 500], text: 'course' },
        { threshold: [250, 600], text: 'journey' },
        { threshold: [300, 800], text: 'quest' }
      ];
      let matchingNouns: string[] = [];
      const distance = utils.distanceBetweenPoints([0, 0], this.targetCoordinates);
      nouns.forEach((noun) => {
        if (distance > noun.threshold[0] && distance < noun.threshold[1]) {
          matchingNouns.push(noun.text);
        }
      });
      nounText = utils.randomSelect(matchingNouns);
    }
    subTitle = `${subTitle}${nounText} to the`;
    return subTitle;
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

  getTotalResourceSpace(dromedaryTypes: { [name: string] : DromedaryType }) {
    let capacity = 0;
    Object.keys(this.dromedaries).forEach((typeQuality) => {
      const dromedaryResource = this.dromedaries[typeQuality];
      const dromedaryType = dromedaryTypes[dromedaryResource.type];
      capacity += (dromedaryType.capacity * dromedaryResource.quantity);
    });
    return capacity;
  }

  getCurrentResourceCount(exclude?: string) {
    let count = 0;
    Object.keys(this.resources).forEach((typeQuality) => {
      if (typeQuality !== exclude) {
        count += this.resources[typeQuality].quantity;
      }
    });
    return count;
  }

  getRemainingResourceSpace(dromedaryTypes: { [name: string] : DromedaryType }, exclude?: string) {
    const maximum = this.getTotalResourceSpace(dromedaryTypes);
    return maximum - this.getCurrentResourceCount(exclude);
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

  getFoodDistance(resourceTypes: { [name: string] : ResourceType }) {
    let foodDistance = 0;
    Object.keys(this.resources).forEach((typeQuality) => {
      const resource = this.resources[typeQuality];
      const resourceType = resourceTypes[resource.type];
      if (utils.arrayIncludes(resourceType.tags, RTA.FOOD)) {
        if (utils.arrayIncludes(resourceType.tags, RTA.PROVISION)) {
          foodDistance += (resource.quantity * 2);
        }
        else {
          foodDistance += resource.quantity;
        }
      }
    });
    return foodDistance;
  }

  getDrinkDistance(resourceTypes: { [name: string] : ResourceType }) {
    let drinkDistance = 0;
    Object.keys(this.resources).forEach((typeQuality) => {
      const resource = this.resources[typeQuality];
      const resourceType = resourceTypes[resource.type];
      if (utils.arrayIncludes(resourceType.tags, RTA.DRINK)) {
        drinkDistance += resource.quantity;
      }
    });
    return drinkDistance;
  }

  getImplementCounts(implementTypes: { [typeName: string] : ImplementType }) {
    const implementCounts: { [pointType: string] : number } = {};
    Object.keys(this.resources).forEach((typeQuality) => {
      const resource = this.resources[typeQuality];
      const implementType = implementTypes[resource.type];
      Object.keys(implementType?.provides || {}).forEach((pointType) => {
        const multiplier = implementType.provides[pointType];
        if (!implementCounts[pointType]) { implementCounts[pointType] = 0; }
        implementCounts[pointType] += (resource.quantity * multiplier);
      });
    });
    return implementCounts;
  }

  calcSubStateAndAdvice(props:{
    resourceTypes: { [name: string] : ResourceType },
    destinations: { [name: string] : Destination },
    explorations: { [id: string] : Exploration },
    explorationChallenges: { [name: string] : ExplorationChallenge },
    implementTypes: { [typeName: string] : ImplementType },
    resourceTags: { [name: string] : ResourceTag },
    expeditionHistory: ExpeditionHistory
  }) {
    const { resourceTypes, destinations, explorations, explorationChallenges, implementTypes,
      resourceTags, expeditionHistory } = props;
    const bullet = new Icon({ provider: 'FontAwesome', name: 'circle', color: '#444', size: 8 });
    const warning = new Icon({ provider: 'FontAwesome5', name: 'exclamation-triangle', color: '#ffc104',
      size: 12});
    const problem = new Icon({ provider: 'FontAwesome5', name: 'exclamation-circle', color: '#ff2222',
      size: 12});

    if (this.getTotalResourceSpace(dromedaryTypes) < this.getCurrentResourceCount()) {
      return {
        advice: [{ icon: problem, textColor: '#a21116', text: `You have more resources selected than your dromedaries can hold. You'll need to choose different dromedaries, or leave some supplies behind.` }],
        subState: 2
      };
    }

    if (!this.leader) {
      return {
        advice: [{ icon: bullet, text: `Begin by adding stops to your route or choosing a leader.` }],
        subState: 1
      };
    }
    if (Object.keys(this.dromedaries).length === 0) {
      return {
        advice: [{ icon: bullet, text: `You'll need dromedaries to carry your supplies.` }],
        subState: 2
      };
    }
    if (Object.keys(this.resources).length === 0) {
      return {
        advice: [{ icon: bullet, text: `Select food, drink, and implements to bring with you.` }],
        subState: 2
      };
    }
    else {
      const foodDistance = this.getFoodDistance(resourceTypes);
      const drinkDistance = this.getDrinkDistance(resourceTypes);
      if (foodDistance === 0 && drinkDistance === 0) {
        return {
          advice: [{ icon: warning, textColor: '#ac7200', text: `You'll need both food and drink.` }],
          subState: 2
        };
      }
      if (foodDistance === 0) {
        return {
          advice: [{ icon: warning, textColor: '#ac7200', text: `You'll need food for the journey.` }],
          subState: 2
        };
      }
      if (drinkDistance === 0) {
        return {
          advice: [{ icon: warning, textColor: '#ac7200', text: `You'll need drink for the journey.` }],
          subState: 2
        };
      }

      const leastDistance = (foodDistance < drinkDistance)
        ? (foodDistance / 10)
        : (drinkDistance / 10);
      const tripDistance = utils.distanceBetweenPoints([0, 0], this.targetCoordinates) * 2;
      const ratio = Math.round((leastDistance / tripDistance) * 100);
      let foodAndDrinkAdvice : { icon: Icon, text: string, textColor?: string } = { icon: bullet, text: `You have enough food and drink for ${utils.formatNumberShort(leastDistance)} leagues, ${ratio}% of the round trip. This is a great deal of provisions, probably more than you'll need.` };
      if (tripDistance > leastDistance) {
        foodAndDrinkAdvice = { icon: warning, textColor: '#ac7200', text: `You only have enough food and drink for ${utils.formatNumberShort(leastDistance)} leagues, ${ratio}% of the round trip.` };
      }
      else if (ratio < 120) {
        foodAndDrinkAdvice = { icon: bullet, text: `You have enough food and drink for ${utils.formatNumberShort(leastDistance)} leagues, ${ratio}% of the round trip. This should be enough, as long as nothing goes wrong.` };
      }
      else if (ratio < 150) {
        foodAndDrinkAdvice = { icon: bullet, text: `You have enough food and drink for ${utils.formatNumberShort(leastDistance)} leagues, ${ratio}% of the round trip. This is enough to get there and back, with extra supplies in case of emergencies.` }
      }

      const implementCounts = this.getImplementCounts(implementTypes);
      let hazardAdvice = [{ icon: warning, textColor: '#ac7200', text: `You've never been to your destination, and don't know what dangers await you.` }];
      const destination = destinations[this.mainDestinationId || ''];
      const exploration = explorations[destination?.atFinish.id || ''];
      if (expeditionHistory && destination && Object.keys(exploration?.challenges || {}).length > 0) {
        hazardAdvice = [{ icon: warning, textColor: '#ac7200', text: `You've been to ${destination.name} before, so you know:` }];
        exploration?.challenges.forEach((challenge) => {
          const challengeType = explorationChallenges[challenge.type];
          let color = '#ffc104', textColor = '#ac7200';
          let mitigated = false;
          challengeType.mitigatedBy.forEach((mitigation) => {
            if (implementCounts[mitigation]) { mitigated = true; }
          })
          if (mitigated) { color = '#444'; textColor = '#222'; }
          hazardAdvice.push({
            icon: new Icon({ ...challengeType.icon, color, size: 14 }),
            textColor,
            text: `${challengeType.precedingText} ${challengeType.getLabels(challenge)}.`
          }) ;
        });
      }
      else if (expeditionHistory && destination) {
        hazardAdvice = [{ icon: bullet, textColor: '#222', text: `You've been to ${destination.name} before, and you know it's relatively safe.` }];
      }
      
      if (Object.keys(implementCounts).length > 0) {
        hazardAdvice.push({ icon: bullet, textColor: '#222', text: `However, you'll have some tools at your disposal, meaning:` });
      }
      const implementAdvice: { icon: Icon, text: string }[] = []; 
      if (implementCounts[RTA.ACTION_SEEK]) {
        implementAdvice.push({
          icon: new Icon({ ...resourceTags[RTA.ACTION_SEEK].icon, color: '#444', size: 12 }),
          text: `You can light your way in dark places.`
        });
      }
      if (implementCounts[RTA.ACTION_BREAK]) {
        implementAdvice.push({
          icon: new Icon({ ...resourceTags[RTA.ACTION_BREAK].icon, color: '#444', size: 12 }),
          text: `You can break through what stands in your path.`
        });
      }
      if (implementCounts[RTA.ACTION_TRAP]) {
        implementAdvice.push({
          icon: new Icon({ ...resourceTags[RTA.ACTION_TRAP].icon, color: '#444', size: 12 }),
          text: `You can hinder and hamper your foes.`
        });
      }
      if (implementCounts[RTA.ACTION_LOOSE]) {
        implementAdvice.push({
          icon: new Icon({ ...resourceTags[RTA.ACTION_LOOSE].icon, color: '#444', size: 14 }),
          text: `You can set yourself free from traps.`
        });
      }
      if (implementCounts[RTA.ACTION_HEAL]) {
        implementAdvice.push({
          icon: new Icon({ ...resourceTags[RTA.ACTION_HEAL].icon, color: '#444', size: 12 }),
          text: `You can heal wounds.`
        });
      }

      return {
        advice: [foodAndDrinkAdvice, ...hazardAdvice, ...implementAdvice],
        subState: 3
      };
    }
  }

  getDestinationIdsToExclude(position: 'embarking'|'main'|'returning'): string[] {
    if (position === 'main') { return []; }
    const currentDestinationIds: string[] = [];
    if (position === 'embarking') {
      currentDestinationIds.push(...this.embarkingDestinationIds);
    }
    if (this.mainDestinationId) {
      currentDestinationIds.push(this.mainDestinationId);
    }
    if (position === 'returning') {
      currentDestinationIds.push(...this.returningDestinationIds);
    }
    return currentDestinationIds;
  }

  getExpeditionLength(props: { destinations: { [id: string] : Destination },
    newDestinationId?: string, newPosition?: 'embarking'|'returning' }) {
    const { destinations, newDestinationId, newPosition } = props;
    const coordinates: [number, number][] = [[0, 0]];
    if (newDestinationId && newPosition === 'embarking') {
      coordinates.push(destinations[newDestinationId].coordinates);
    }
    this.embarkingDestinationIds.forEach((destinationId) => {
      coordinates.push(destinations[destinationId].coordinates);
    });
    if (this.mainDestinationId) {
      coordinates.push(destinations[this.mainDestinationId].coordinates);
    }
    this.returningDestinationIds.forEach((destinationId) => {
      coordinates.push(destinations[destinationId].coordinates);
    });
    if (newDestinationId && newPosition === 'returning') {
      coordinates.push(destinations[newDestinationId].coordinates);
    }
    coordinates.push([0, 0]);
    return utils.distanceBetweenManyPoints(coordinates);
  }
}

interface ExpeditionInterface {
  id: string;
  subTitle: string;
  currentCoordinates: [number, number];
  targetCoordinates: [number, number]; // These can change
  embarkingDestinationIds: string[];
  mainDestinationId?: string;
  returningDestinationIds: string[];
  currentDestinationId?: string;
  customDestination?: Destination;
  leader: string;
  dromedaries: { [typeQuality: string] : Resource };
  resources: { [typeQuality: string] : Resource };
  state: 'preparing'|'embarking'|'exploring'|'returning';
  subState: number;
  advice: { icon: Icon, text: string, textColor?: string }[];
  beganAt?: number;
  eventHistory: { [id: string] : ExpeditionEventHistory };
  rates: Rate;
  timers: { [name: string] : Timer }
  storedTime: number;
}