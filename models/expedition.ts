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
import { utils } from '../utils';
import { RESOURCE_TAGS } from '../enums/resource_tags';
import { dromedaryTypes } from '../instances/dromedary_types';
const RTA = RESOURCE_TAGS;

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
  subState: number = 0;
  advice: { icon: Icon, text: string, textColor?: string }[] = [];
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
        advice: [{ icon: bullet, text: `Begin by choosing a leader.` }],
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
        advice: [{ icon: bullet, text: `Now, select supplies to bring with you.` }],
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
      const tripDistance = utils.distanceBetweenPoints([0, 0], this.endCoordinates) * 2;
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
      let hazardAdvice = [{ icon: warning, textColor: '#ac7200', text: `You've never been to your destination and unknown dangers await you.` }];
      const destination = destinations[this.destinationId || ''];
      const exploration = explorations["Cascade of Prismatic Sand"];
      // const exploration = explorations[destination?.atFinish.id || ''];
      // if (expeditionHistory && destination && Object.keys(exploration?.challenges || {}).length > 0) {
      if (destination && Object.keys(exploration?.challenges || {}).length > 0) {
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
      console.log(`implementAdvice`, implementAdvice);

      return {
        advice: [foodAndDrinkAdvice, ...hazardAdvice, ...implementAdvice],
        subState: 3
      };
    }
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
  subState: number;
  advice: { icon: Icon, text: string, textColor?: string }[];
  beganAt?: number;
  endedAt?: number;
  eventHistory: { [id: string] : ExpeditionEventHistory };
}