import Resource from './resource';
import Destination from './destination';
import ExpeditionEventHistory from './expedition_event_history';
import DromedaryType from './dromedary_type';
import ResourceType from './resource_type';
import ImplementType from './implement_type';
import Icon from './icon';
import { implementTypes } from '../instances/implement_types';
import { utils } from '../utils';
import { RESOURCE_TAGS } from '../enums/resource_tags';
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
  advice: { icon: Icon, text: string }[] = [];
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
    dromedaryTypes: { [name: string] : DromedaryType }
  }) {
    console.log(`calcSubStateAndAdvice called, this:`, this);
    const { resourceTypes, dromedaryTypes } = props;
    const bullet = new Icon({ provider: 'FontAwesome', name: 'circle', color: '#444', size: 8 });
    const warning = new Icon({ provider: 'FontAwesome', name: 'exclamation-triangle', color: '#ffc104',
      size: 14});
    const problem = new Icon({ provider: 'FontAwesome', name: 'exclamation-circle', color: '#ff2222',
      size: 14});

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
          advice: [{ icon: warning, text: `You'll need both food and drink.` }],
          subState: 2
        };
      }
      if (foodDistance === 0) {
        return {
          advice: [{ icon: warning, text: `You'll need food for the journey.` }],
          subState: 2
        };
      }
      if (foodDistance === 0) {
        return {
          advice: [{ icon: warning, text: `You'll need drink for the journey.` }],
          subState: 2
        };
      }

      const leastDistance = (foodDistance < drinkDistance)
        ? (foodDistance / 10)
        : (drinkDistance / 10);
      const tripDistance = utils.distanceBetweenPoints([0, 0], this.endCoordinates) * 2;
      const ratio = Math.round((leastDistance / tripDistance) * 100);
      let foodAndDrinkAdvice = { icon: bullet, text: `You have enough food and drink for ${utils.formatNumberShort(leastDistance)} leagues, ${ratio}% of the round trip. This is a great deal of provisions, probably more than you'll need.` };
      if (tripDistance > leastDistance) {
        foodAndDrinkAdvice = { icon: warning, text: `You only have enough food and drink for ${utils.formatNumberShort(leastDistance)} leagues, ${ratio}% of the round trip.` };
      }
      else if (ratio < 120) {
        foodAndDrinkAdvice = { icon: bullet, text: `You have enough food and drink for ${utils.formatNumberShort(leastDistance)} leagues, ${ratio}% of the round trip. This should be enough, as long as nothing goes wrong.` };
      }
      else if (ratio < 150) {
        foodAndDrinkAdvice = { icon: bullet, text: `You have enough food and drink for ${utils.formatNumberShort(leastDistance)} leagues, ${ratio}% of the round trip. This is enough to get there and back, with extra supplies in case of emergencies.` }
      }

      const implementCounts = this.getImplementCounts(implementTypes);
      const implementAdvice: { icon: Icon, text: string }[] = []; 
      if (implementCounts[RTA.ACTION_SEEK]) {
        implementAdvice.push({ icon: bullet, text: `You can light your way in dark places.`});
      }
      if (implementCounts[RTA.ACTION_BREAK]) {
        implementAdvice.push({ icon: bullet, text: `You can break through what stands in your way.`});
      }
      if (implementCounts[RTA.ACTION_TRAP]) {
        implementAdvice.push({ icon: bullet, text: `You can hinder and hamper your foes.`});
      }
      if (implementCounts[RTA.ACTION_LOOSE]) {
        implementAdvice.push({ icon: bullet, text: `You can set yourself free from traps.`});
      }
      if (implementCounts[RTA.ACTION_HEAL]) {
        implementAdvice.push({ icon: bullet, text: `You can heal wounds.`});
      }
      console.log(`implementAdvice`, implementAdvice);

      return {
        advice: [foodAndDrinkAdvice, ...implementAdvice],
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
  beganAt?: number;
  endedAt?: number;
  eventHistory: { [id: string] : ExpeditionEventHistory };
}