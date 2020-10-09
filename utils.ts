import * as random from 'random';

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
}

export let utils = new Utils();
