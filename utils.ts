import ResourceType from './models/resource_type';
import ResourceTag from './models/resource_tag';
import ResourceSubcategory from './models/resource_subcategory';
import ResourceCategory from './models/resource_category';
import Resource from './models/resource';
import Vault from './models/vault';
import { resourceTypes } from './instances/resource_types';
import { resourceTags } from './instances/resource_tags';
import { resourceSubcategories } from './instances/resource_subcategories';
import { resourceCategories } from './instances/resource_categories';
import { RESOURCE_SPECIFICITY } from './enums/resource_specificity';
import { MILESTONES } from './enums/milestones';

class Utils {
  constructor() {
    let seedFunction = this.hash(new Date(Date.now()).valueOf().toString());
    this.random = this.mulberry32(seedFunction());
  }

  random: Function;

  hash(seed: string) {
    for(var i = 0, h = 1779033703 ^ seed.length; i < seed.length; i++)
        h = Math.imul(h ^ seed.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
  }

  mulberry32(a: number) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
  }

  randHex(len: number) {
    let maxlen = 8;
    let min = Math.pow(16,Math.min(len,maxlen)-1);
    let max = Math.pow(16,Math.min(len,maxlen)) - 1;
    let n = Math.floor( this.random() * (max-min+1) ) + min;
    let r = n.toString(16);
    while (r.length < len) {
      r = r + this.randHex( len - maxlen );
    }
    return r;
  }

  randomGaussian() {
    const a = this.random();
    const b = this.random();
    return (Math.abs(a - 0.5) < Math.abs(b - 0.5)) ? a : b;
  }

  randomSelect(anArray: any[]) {
    return anArray[Math.floor(this.random() * anArray.length)];
  }

  randomWeightedSelect(anArray: any[], weightName: string = 'weight') {
    if (anArray.length == 0) { return null; }

    let weightSum = 0;
    let buckets: number[] = [];
    anArray.map((aMember, index) => {
      weightSum += aMember[weightName];
      buckets.push(weightSum);
    });
    let roll = this.random() * weightSum;
    for (let index = 0; index < anArray.length; index++) {
      if (roll < buckets[index]) {
        return anArray[index];
      }
    }
    return anArray[0];
  }

  shuffle(anArray: any[]) {
    return anArray
      .map((a: any) => ({ sort: Math.random(), value: a }))
      .sort((a: any, b: any) => a.sort - b.sort)
      .map((a: any) => a.value);
  }

  getDatetimeString(date: Date) {
    return `${this.getDateString(date)} ${this.getTimeString(date)}`;
  }

  getDateString(date: Date) {
    let dateString = '';
    dateString += date.getFullYear() + '-';
    if (date.getMonth()+1 >= 10) {
      dateString += (date.getMonth()+1);
    }
    else {
      dateString += ('0' + (date.getMonth()+1));
    }
    dateString += '-';
    if (date.getDate() >= 10) {
      dateString += date.getDate();
    }
    else {
      dateString += ('0' + date.getDate());
    }
    return dateString;
  }

  getTimeString(date: Date) {
    let timeString = '';
    let ampm = 'am';
    if (date.getHours() > 12) {
      ampm = 'pm';
      timeString += (date.getHours() - 12) + ':';
    }
    else {
      timeString += date.getHours() + ':';
    }

    if (date.getMinutes() >= 10) {
      timeString += date.getMinutes();
    }
    else {
      timeString += ('0' + date.getMinutes());
    }
    timeString += ampm;
    return timeString;
  }

  isEmpty(aValue: any) {
    if (aValue == 0) { return false; }
    if (aValue) {
      if (typeof aValue == 'string') {
        if (aValue.length > 0) {
          return false;
        }
        return true;
      }
      else {
        return false;
      }
    }
    return true;
  }

  arrayIncludes(anArray: any[], anItem: any, anId: any = null) {
    let included = false;
    if (anId != null) {
      anArray.map((aMember) => {
        if (aMember[anId] == anItem[anId]) {
          included = true;
        }
      });
    }
    else {
      anArray.map((aMember) => {
        if (aMember == anItem) {
          included = true;
        }
      });
    }
    return included;
  }

  arrayGaussianTruncate(anArray: any[], min?: number, max?: number) {
    let initialLength = (max && anArray.length > max) ? max : anArray.length;
    let newLength = Math.ceil(this.randomGaussian() * initialLength);
    if (max && newLength > max) { newLength = max; }
    if (min && newLength < min) { newLength = min; }
    return anArray.slice(0, newLength);
  }

  arraySum(anArray: number[]) {
    let sum = 0;
    anArray.forEach((member) => { sum += member; });
    return sum;
  }

  // Take in a string of various format and output an internationally formatted string
  phoneNumberIn(rawNum: string) {
    if (!rawNum) { return null; }
    if (rawNum.slice(0,1) == '+') {
      return rawNum;
    }
    // ex: John Doe (303) 555-5309 -> 3035555309
    let formatNum = new String(rawNum).replace(/\D/g,'');
    // ex: 3035555309 -> +13035555309
    if (formatNum.length == 10) {
      return '+1' + formatNum.valueOf();
    }
    else if ((formatNum.length == 11) && (formatNum.slice(0,1) == '1')) {
      return '+' + formatNum.valueOf();
    }
    else { return null; }
  }

  // Take an internationally formatted phone number string and output a human-friendly
  // ex: +13038675309 -> (303) 867-5309
  phoneNumberOut(rawNum: string) {
    let formatNum = this.phoneNumberIn(rawNum);
    if (formatNum == null) { return ''; }
    if (formatNum.length == 0) { return ''; }
    if (formatNum.length == 12) {
      return '(' + formatNum.slice(2,5) + ') ' + formatNum.slice(5,8)
        + '-' + formatNum.slice(8,12);
    }
    else {
      return rawNum;
    }
  }

  upperCaseFirst(aString: string) {
    if (aString) {
      return aString.slice(0, 1).toUpperCase() + aString.slice(1);
    }
    return null;
  }

  // Returns a maximum of two units of time, e.g. '1d 4h ' or '3m 45s ', with
  //  seconds being the smallest unit
  formatDuration(milliseconds: number, units: number = 0, long: boolean = false):
    string {
    if (units < 2) {
      if (milliseconds >= (1000 * 60 * 60 * 24)) {
        let days: number = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
        units++;
        return ((days + (long ? ' days, ' : 'd ') +
          this.formatDuration(milliseconds % (1000 * 60 * 60 * 24), units, long)));
      }
      if (milliseconds >= (1000 * 60 * 60)) {
        let days: number  = Math.floor(milliseconds / (1000 * 60 * 60));
        units++;
        return ((days + (long ? ' hours, ' : 'h ') +
          this.formatDuration(milliseconds % (1000 * 60 * 60), units, long)));
      }
      if (milliseconds >= (1000 * 60)) {
        let days: number  = Math.floor(milliseconds / (1000 * 60));
        units++;
        return ((days + (long ? ' minutes, ' : 'm ') +
          this.formatDuration(milliseconds % (1000 * 60), units, long)));
      }
      else if (milliseconds >= (1000)) {
        let days: number  = Math.floor(milliseconds / (1000));
        units++;
        return ((days + (long ? ' seconds, ' : 's ') +
          this.formatDuration(milliseconds % (1000), units, long)));
      }
      if (units == 0) {
        return (long ? '0 seconds, ' : '0s ');
      }
    }
    return '';
  }

  // 1234567890 -> 1,234,567,890
  formatNumberLong(number: number): string {
    let strNumber = Math.round(number).toString();
    let commaNumber = '';
    let digitCount = 0;
    for (let iii = (strNumber.length-1); iii >= 0; iii--) {
      digitCount++;
      if (digitCount % 3 == 0) {
        commaNumber = (',' + strNumber[iii] + commaNumber);
      }
      else {
        commaNumber = (strNumber[iii] + commaNumber);
      }
    }
    if (commaNumber.slice(0, 1) == ',') {
      return commaNumber.slice(1);
    }
    return commaNumber;
  }

  // 1234567890 -> 1.23B
  formatNumberShort(number: number): string {
    const exponents: {[power: number] : string} = {
      3: 'K',
      6: 'M',
      9: 'B',
      12: 'T',
      15: 'Qa',
      18: 'Qi',
      21: 'Sx',
      23: 'Sp',
      25: 'Oc',
      28: 'No',
      30: 'De'
    };
    if (number == 0) {
      return number.toString();
    }
    if (Math.abs(number) < 1) {
      return number.toFixed(2);
    }
    if (number < 1000) {
      return Math.round(number).toString();
    }
    let powers = Object.keys(exponents);
    let strNumber = '';
    for (let iii = 0; iii < (powers.length-2); iii++) {
      let power = parseInt(powers[iii]);
      if (number >= Math.pow(10, power)) {
        let fNumber = number / Math.pow(10, power);
        let dPlace = 2;
        if (fNumber >= 100) { dPlace = 0; }
        else if (fNumber >= 10) { dPlace = 1; }
        strNumber = fNumber.toFixed(dPlace);
        if (strNumber.slice(-2) == '.0') {
          strNumber = strNumber.slice(0, -2);
        }
        if (strNumber.slice(-3) == '.00') {
          strNumber = strNumber.slice(0, -3);
        }
        strNumber += exponents[power];
      }
    }
    return strNumber;
  }

  numberToRoman(num: number): string {
    let roman: { [roman: string] : number } = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
    let str = '';

    for (var i of Object.keys(roman)) {
      var q = Math.floor(num / roman[i]);
      num -= q * roman[i];
      str += i.repeat(q);
    }

    return str;
  }

  romanToNumber (romanNumeral: string): number|null {
    var DIGIT_VALUES: { [roman: string] : number } = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000
    };

    let result = 0;
    let input = romanNumeral.split('');

    for (var i = 0; i < input.length; i++) {
      var currentLetter = DIGIT_VALUES[input[i]];
      var nextLetter = DIGIT_VALUES[input[i + 1]];
      if (currentLetter === undefined) {
        return null;
      }
      else {
        if (currentLetter < nextLetter) {
          result += nextLetter - currentLetter;
          i++;
        } else {
          result += currentLetter;
        }
      }
    };

    return result;
  }

  range(min: number, max: number) {
    let aRange: number[] = [];
    for (let index = min; index <= max; index++) {
      aRange.push(index);
    }
    return aRange;
  }

  getMatchingResourceKind(specificity: string, type: string):
    ResourceType|ResourceTag|ResourceSubcategory|ResourceCategory {
    switch(specificity) {
      case RESOURCE_SPECIFICITY.EXACT:
      if (type.includes('-')) {
        return resourceTypes[type.split('-')[0]];
      }
      return resourceTypes[type];

      case RESOURCE_SPECIFICITY.TAG:
      return resourceTags[type];

      case RESOURCE_SPECIFICITY.SUBCATEGORY:
      return resourceSubcategories[type];

      case RESOURCE_SPECIFICITY.CATEGORY:
      return resourceCategories[type];

      default:
      return resourceTypes[type];
    }
  }

  getMatchingResourceKindQuantity(specificity: string, type: string, vault: Vault):
    number {
    let quantity = 0;
    switch(specificity) {
      case RESOURCE_SPECIFICITY.EXACT:
      quantity += vault.resources[type + '|0']?.quantity;
      quantity += vault.resources[type + '|1']?.quantity;
      quantity += vault.resources[type + '|2']?.quantity;
      return quantity;

      case RESOURCE_SPECIFICITY.TAG:
      Object.keys(vault.resources).map((typeQuality) => {
        let resourceType = resourceTypes[typeQuality.split('|')[0].split('-')[0]];
        if (this.arrayIncludes(resourceType.tags, type)) {
          quantity += vault.resources[typeQuality].quantity;
        }
      });
      return quantity;

      case RESOURCE_SPECIFICITY.SUBCATEGORY:
      Object.keys(vault.resources).map((typeQuality) => {
        let resourceType = resourceTypes[typeQuality.split('|')[0].split('-')[0]];
        if (!resourceType) { console.log('typeQuality'); console.log(typeQuality); console.log('vault'); console.log(vault); }
        if (resourceType.subcategory == type) {
          quantity += vault.resources[typeQuality].quantity;
        }
      });
      return quantity;

      case RESOURCE_SPECIFICITY.CATEGORY:
      Object.keys(vault.resources).map((typeQuality) => {
        let resourceType = resourceTypes[typeQuality.split('|')[0].split('-')[0]];
        if (resourceType.category == type) {
          quantity += vault.resources[typeQuality].quantity;
        }
      });
      return quantity;

      default:
      return quantity;
    }
  }

  getMatchingResourceQuantity(resReq: {specificity: string, type: string,
    value: number}, forbiddenRT: string[] = []) {
    let resourcePool: ResourceType[] = [];
    if (resReq.specificity == RESOURCE_SPECIFICITY.EXACT) {
      resourcePool = [resourceTypes[resReq.type]];
    }
    else {
      Object.keys(resourceTypes).map((resourceTypeName) => {
        const rt = resourceTypes[resourceTypeName];
        if (rt.value) {
          switch(resReq.specificity) {
            case RESOURCE_SPECIFICITY.TAG:
            if (utils.arrayIncludes(rt.tags, resReq.type)
              && rt.value <= (resReq.value * 2)
              && !utils.arrayIncludes(forbiddenRT, rt.name)) {
              resourcePool.push(rt);
            }
            break;

            case RESOURCE_SPECIFICITY.SUBCATEGORY:
            if (rt.subcategory == resReq.type
              && rt.value <= (resReq.value * 2)
              && !utils.arrayIncludes(forbiddenRT, rt.name)) {
              resourcePool.push(rt);
            }
            break;

            case RESOURCE_SPECIFICITY.SUBCATEGORY:
            if (rt.category == resReq.type
              && rt.value <= (resReq.value * 2)
              && !utils.arrayIncludes(forbiddenRT, rt.name)) {
              resourcePool.push(rt);
            }
            break;
          }
        }
      });
    }

    const rtSel = resourcePool[Math.floor(utils.random() * (resourcePool.length-1))];
    let quantity = 1;
    if (rtSel.value) {
      quantity = Math.ceil(resReq.value / rtSel.value);
    }
    return { type: rtSel.name, quality: 0, quantity: quantity };
  }

  typeQualityName(typeQuality: string|null) {
    if (typeQuality) {
      let tqSplit = typeQuality.split('|');
      if (tqSplit[1] == '1') {
        return (tqSplit[0] + ' (Fine)');
      }
      else if (tqSplit[1] == '2') {
        return (tqSplit[0] + ' (Exquisite)');
      }
      else {
        return tqSplit[0];
      }
    }
    return '';
  }

  getResourceName(resource: Resource|null) {
    let name = '';
    let suffix = '';
    if (resource) {
      if (resource.name) { name = resource.name; }
      else { name = resource.type; }
      if (resource.quality == 1) {
        suffix = ' (Fine)';
      }
      else if (resource.quality == 2) {
        suffix = ' (Exquisite)';
      }
    }
    return (name + suffix);
  }

  mapAdd(map: any, property: string, quantity: number) {
    if (map != undefined) {
      if (map[property] == undefined) {
        map[property] = 0;
      }
      map[property] += quantity;
    }
  }

  mapsCombine(mapA: any, mapB: any) {
    let combinedMap = Object.assign({}, mapA);
    Object.keys(mapB).map((key) => {
      if (!combinedMap[key]) { combinedMap[key] = 0; }
      combinedMap[key] += mapB[key];
    });
    return combinedMap;
  }

  arraysCombine(arrayA: any[], arrayB: any[]) {
    let combinedArray = [...arrayA];
    arrayB.forEach((member) => {
      if (!this.arrayIncludes(arrayA, member)) {
        combinedArray.push(member);
      }
    });
    return combinedArray;
  }

  sumToResources(vault: Vault, aSum: { [typeQuality: string] : number }) {
    let resources: Resource[] = [];
    Object.keys(aSum).map((typeQuality) => {
      const quantity = aSum[typeQuality];
      const tqSplit = typeQuality.split('|');
      let nResource = new Resource(vault.resources[typeQuality]
        || { type: tqSplit[0], quality: parseInt(tqSplit[1]), quantity: 0 })
        .getResourceWithoutQuantity();
      nResource.quantity = quantity;
      resources.push(nResource);
    });
    return resources;
  }

  getResourceType(resource: Resource) {
    if (resource.name && resource.category && resource.tags && resource.value
      && resource.icon) {
      return new Resource(resource).toResourceType(resourceTypes);
    }
    return resourceTypes[resource.type];
  }

  resourcesSort(resourcesArray: Resource[]) {
    resourcesArray.sort((a, b) => {
      const rta = utils.getResourceType(a);
      if (!rta) { console.log('a'); console.log(a);  }
      const rcoa = resourceCategories[rta.category].order;
      const rtb = utils.getResourceType(b);
      if (!rtb) { console.log('b'); console.log(b);  }
      const rcob = resourceCategories[rtb.category].order;
      if (rcoa != rcob) {
        return rcoa - rcob;
      }
      // const rateA = rates.netRates[a.type + '|' + a.quality];
      // const rateB = rates.netRates[b.type + '|' + b.quality];
      // if (rateA && !rateB) { return -1; }
      // if (!rateA && rateB) { return 1; }
      let rsoa = 99;
      if (rta.subcategory) { rsoa = resourceSubcategories[rta.subcategory].order; }
      let rsob = 99;
      if (rtb.subcategory) { rsob = resourceSubcategories[rtb.subcategory].order; }
      if (rsoa != rsob) {
        return rsoa - rsob;
      }
      if (rta.value != rtb.value) { return rta.value - rtb.value; }

      return (rta.name < rtb.name) ? -1 : 1;

    });
    return resourcesArray;
  }

  isForbidden(resourceType: ResourceType, forbiddenRT: string[] = [],
    forbiddenRS: string[] = [], forbiddenRC: string[] = []) {
    let forbidden = false;
    forbiddenRT.forEach((frt) => {
      if (utils.arrayIncludes(resourceType.tags, frt)) { forbidden = true; }
    });
    forbiddenRS.forEach((frs) => {
      if (resourceType.subcategory == frs) { forbidden = true; }
    });
    forbiddenRC.forEach((frc) => {
      if (resourceType.category == frc) { forbidden = true; }
    });
    return forbidden;
  }

  addCommaAnd(words: string[]) {
    if (words.length === 0) { return ''; }
    if (words.length === 1) { return words[0]; }
    if (words.length === 2) { return `${words[0]} and ${words[1]}`; }
    let combined = '';
    words.forEach((word, index) => {
      if (index <= words.length - 3) { combined += `${word}, `; }
      else if (index == words.length - 2) { combined += `${word}, and `; }
      else { combined += word; }
    });
    return combined;
  }

  getTextDelay(text: string, fadeCharDelay: number) {
    let delay = 0;
    for (let index = 0; index < text.length; index++) {
      delay += this.getCharDelay(text[index], fadeCharDelay);
    }
    return delay;
  }

  getCharDelay(char: string, fadeCharDelay: number, platform: string = 'default') {
    const getPlatformMultiplier = () => {
      switch(platform) {
        case 'android': return 0.3;
        default: return 1;
      }
    }
    const pMult = getPlatformMultiplier();

    if (char.includes(',')) { return fadeCharDelay * 6 * pMult; }
    if (char.includes('.') || char.includes('!') || char.includes('?')) { return fadeCharDelay * 12 * pMult; }
    return (fadeCharDelay * pMult);
  }

  getResearchOptionSlots(milestones: { [name: string] : boolean }) {
    if (milestones[MILESTONES.RESEARCH_OPTION_SLOTS_2]) {
      return 2;
    }
    return 1;
  }
}

export let utils = new Utils();
